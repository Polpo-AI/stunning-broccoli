'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from 'react';

/* ─── MagneticButton ──────────────────────────────────────────────────────
   Bottone con effetto "magnetico": al passaggio del mouse il button viene
   tirato leggermente verso il cursore con uno spring.
   - GPU only (translate3d via framer-motion)
   - Disattivato su touch device + prefers-reduced-motion
   - Genera un anchor `<a>` per i mailto: e i fragment links */

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  strength?: number;       // 0..1 — quanto forte è la tirata. Default 0.28
  stiffness?: number;      // Spring stiffness. Default 200
  damping?: number;        // Spring damping. Default 18
  target?: '_blank' | '_self';
  rel?: string;
  ariaLabel?: string;
};

export default function MagneticButton({
  href,
  children,
  className,
  style,
  strength = 0.28,
  stiffness = 200,
  damping = 18,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsTouchDevice(
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass: 0.4 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.4 });

  const enabled = !isTouchDevice && !reduced;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        x: enabled ? springX : 0,
        y: enabled ? springY : 0,
        willChange: enabled ? 'transform' : 'auto',
      }}
    >
      {children}
    </motion.a>
  );
}
