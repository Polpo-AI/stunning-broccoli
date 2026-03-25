'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FloatingMascotProps {
  /** Preset position */
  position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  /** Image size in px — default 130 (hero-sized) */
  size?: number;
  /** Base opacity 0-1 */
  opacity?: number;
  /** Extra tailwind/css class override */
  className?: string;
}

const POSITION_CLASSES: Record<string, string> = {
  'bottom-right': 'bottom-28 right-6 md:bottom-32 md:right-10',
  'top-right':    'top-28 right-6 md:top-32 md:right-10',
  'bottom-left':  'bottom-28 left-6 md:bottom-32 md:left-10',
  'top-left':     'top-28 left-6 md:top-32 md:left-10',
};

export default function FloatingMascot({
  position = 'bottom-right',
  size = 130,
  opacity = 0.7,
  className = '',
}: FloatingMascotProps) {
  const posClass = POSITION_CLASSES[position] ?? POSITION_CLASSES['bottom-right'];

  return (
    <motion.div
      className={`fixed z-40 pointer-events-none select-none ${posClass} ${className}`}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      aria-hidden
    >
      <motion.div
        animate={{
          y:      [0, -12, 0],
          rotate: [0, 3, -3, 0],
          transition: {
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.4, 0.7, 1],
          }
        }}
        style={{
          filter:      'drop-shadow(0 0 28px rgba(6,182,212,0.45)) drop-shadow(0 0 8px rgba(6,182,212,0.2))',
          willChange:  'transform',
        }}
      >
        <Image
          src="/polpo.png"
          alt="PolpoAI mascotte"
          width={size}
          height={size}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
