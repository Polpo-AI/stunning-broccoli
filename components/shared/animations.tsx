'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Shared animation variants ────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

// ─── FadeUp wrapper component ─────────────────────────────────────────────────

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({ children, delay = 0, className = '', once = true }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section header component ─────────────────────────────────────────────────

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ label, title, subtitle, centered = true, className = '' }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={staggerContainer}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <motion.span variants={fadeUpVariants} className="section-label">
          {label}
        </motion.span>
      )}
      <motion.h2 variants={fadeUpVariants} className="section-title">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUpVariants} className="section-subtitle mt-4 max-w-xl mx-auto">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
