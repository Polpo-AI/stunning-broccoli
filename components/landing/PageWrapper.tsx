'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * Depth-based page transition.
 * Exit:  scale 1→0.985, opacity 1→0.6, y 0→-20px, blur 0→4px
 * Enter: scale 1.02→1, opacity 0→1, y 30px→0, blur 8px→0
 * Mobile: simpler/faster, minimal scale, no blur to ensure performance.
 */
export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  // If not mounted, default to faster transition to be safe
  const duration = (!mounted || isMobile || reduced) ? 0.25 : 0.42;

  // Mobile/reduced variants (fast, minimal)
  const simpleVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  // Desktop cinematic depth variants
  const depthVariants = {
    initial: { opacity: 0, y: 30, scale: 1.02, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  };

  const variants = isMobile || reduced ? simpleVariants : depthVariants;

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration, ease }}
      style={{ transformOrigin: 'top center', willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}
