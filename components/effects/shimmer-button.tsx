'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  shimmerColor?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function ShimmerButton({
  children,
  href,
  onClick,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.15)',
  type = 'button',
  disabled = false,
}: Props) {
  const inner = (
    <span className="relative block overflow-hidden rounded-[inherit]">
      {children}
      <motion.span
        className="absolute inset-0 -skew-x-[20deg] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
        }}
        animate={{ x: ['-150%', '250%'] }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`relative inline-flex items-center justify-center transition-all duration-300 ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
    >
      {inner}
    </button>
  );
}
