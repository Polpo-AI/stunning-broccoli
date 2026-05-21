'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalParallaxBackground() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  const leftY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const midY   = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  // Render nulla su SSR e prima dell'hydration per evitare mismatch.
  if (!mounted || reduced) return null;

  // Nasconde gli orbs polpo sui siti esempio del portfolio
  if (pathname?.startsWith('/portfolio')) return null;

  // Mobile: orbs statici CSS-animated, più luminosi
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute animate-orb-a"
          style={{
            top: '12%',
            left: '-100px',
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.32) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
        <div
          className="absolute animate-orb-b"
          style={{
            top: '50%',
            right: '-120px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute animate-orb-a"
          style={{
            bottom: '8%',
            left: '20%',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.20) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationDelay: '-7s',
          }}
        />
      </div>
    );
  }

  // Desktop: parallax + 4 orbs luminosi multi-colore
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute"
        style={{
          top: '6%',
          left: '-140px',
          y: leftY,
          width: '480px',
          height: '660px',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.38) 0%, transparent 68%)',
          filter: 'blur(55px)',
          borderRadius: '50% 30% 50% 40% / 40% 60% 40% 60%',
          willChange: 'transform',
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: '30%',
          right: '-160px',
          y: rightY,
          width: '520px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.32) 0%, transparent 68%)',
          filter: 'blur(60px)',
          borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%',
          willChange: 'transform',
        }}
      />
      <motion.div
        className="absolute"
        style={{
          bottom: '-8%',
          left: '38%',
          y: midY,
          width: '440px',
          height: '440px',
          background: 'radial-gradient(circle at center, rgba(52,211,153,0.24) 0%, transparent 70%)',
          filter: 'blur(55px)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: '55%',
          left: '8%',
          y: leftY,
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle at center, rgba(96,165,250,0.22) 0%, transparent 70%)',
          filter: 'blur(45px)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
