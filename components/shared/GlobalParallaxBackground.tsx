'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlobalParallaxBackground() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // default true for safety

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // run once
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Global scroll progress
  const { scrollYProgress } = useScroll();

  // Slow movement for the left floating shape (moves down up to 10%)
  const leftY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Faster movement for the right floating shape (moves up up to -8%)
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  if (isMobile || reduced) {
    return null; // Don't render complex global parallax on mobile/reduced motion
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Left subtle tentacle hint */}
      <motion.div
        className="absolute w-[300px] h-[500px]"
        style={{
          top: '20%',
          left: '-100px',
          y: leftY,
          opacity: 0.05,
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.8) 0%, transparent 70%)',
          filter: 'blur(30px)',
          borderRadius: '50% 20% 50% 40% / 40% 60% 40% 60%',
          transform: 'rotate(-15deg)',
        }}
      />
      
      {/* Right subtle tentacle hint */}
      <motion.div
        className="absolute w-[400px] h-[600px]"
        style={{
          bottom: '-10%',
          right: '-150px',
          y: rightY,
          opacity: 0.03,
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.8) 0%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          transform: 'rotate(25deg)',
        }}
      />
    </div>
  );
}
