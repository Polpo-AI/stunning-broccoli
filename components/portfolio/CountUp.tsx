'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

/* ─── CountUp ─────────────────────────────────────────────────────────────
   Numero che si anima da 0 al valore target quando entra nel viewport.
   Usa framer-motion useSpring → niente requestAnimationFrame manuale,
   resta sincronizzato con il refresh rate del display.

   - Animazione parte SOLO quando il componente è in vista (intersection)
   - Si disattiva con prefers-reduced-motion (mostra subito il valore finale)
   - Supporta prefix/suffix (es. "+15", "92%") */

type Props = {
  to: number;
  duration?: number;
  /** Cifre decimali. Default 0. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Ritardo (in secondi) prima di iniziare a contare. Utile per stagger. */
  delay?: number;
};

export default function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  style,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const value = useMotionValue(0);
  const spring = useSpring(value, {
    // Convertiamo la "duration" desiderata in stiffness/damping plausibili
    stiffness: Math.max(40, 220 / Math.max(duration, 0.1)),
    damping: 26,
    mass: 0.6,
  });

  const display = useTransform(spring, (latest) => {
    const n = Number.isFinite(latest) ? latest : 0;
    return `${prefix}${n.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      value.set(to);
      return;
    }
    const t = window.setTimeout(() => value.set(to), Math.max(0, delay) * 1000);
    return () => window.clearTimeout(t);
  }, [inView, to, value, reduced, delay]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {display}
    </motion.span>
  );
}
