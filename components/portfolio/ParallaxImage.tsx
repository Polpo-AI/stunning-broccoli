'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ─── ParallaxImage ───────────────────────────────────────────────────────
   Wrapper su <Image> di next/image che applica un parallax verticale GPU-only
   al passaggio dello scroll. Usa transform: translate3d via framer-motion,
   in modo che il browser composite layer non re-paint mai.

   - `strength` 0..1: forza del parallax. 0.2 default (subtle premium feel).
   - Si disattiva automaticamente con prefers-reduced-motion.
   - Estende il container del 30% in altezza per evitare bande bianche durante
     lo scorrimento (l'immagine deve sempre coprire). */

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Forza del parallax. 0 = nessun parallax. 0.2 = subtle. 0.5 = strong. */
  strength?: number;
  /** Direzione parallax. 'up' (default) muove l'immagine in su mentre scrolli */
  direction?: 'up' | 'down';
  /** Overlay opzionale renderizzato sopra l'immagine (gradient ecc.) */
  overlay?: React.ReactNode;
  /** Container className aggiuntivo */
  containerClassName?: string;
};

export default function ParallaxImage({
  src,
  alt,
  priority,
  sizes,
  className,
  strength = 0.2,
  direction = 'up',
  overlay,
  containerClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Evita hydration mismatch: SSR e prima frame client renderizzano IDENTICI
  // (transform: none), poi al post-mount attiviamo il parallax framer-motion.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Range parallax: 100*strength% del viewport
  const distance = `${Math.round(100 * strength)}%`;
  const from = direction === 'up' ? distance : `-${distance}`;
  const to = direction === 'up' ? `-${distance}` : distance;

  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  // Parallax attivo SOLO dopo mount + se non c'è reduced-motion preference
  const parallaxActive = mounted && !reduced;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${containerClassName ?? ''}`}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${Math.round(15 * strength)}%`,
          bottom: `-${Math.round(15 * strength)}%`,
          y: parallaxActive ? y : 0,
          willChange: parallaxActive ? 'transform' : 'auto',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? '100vw'}
          className={`object-cover ${className ?? ''}`}
        />
      </motion.div>
      {overlay}
    </div>
  );
}
