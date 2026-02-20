'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function LiquidBackground() {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 8, damping: 25 });
  const smoothY = useSpring(rawY, { stiffness: 8, damping: 25 });

  const blob1X = useTransform(smoothX, [0, 1], [-120, 120]);
  const blob1Y = useTransform(smoothY, [0, 1], [-80, 80]);
  const blob2X = useTransform(smoothX, [0, 1], [80, -80]);
  const blob2Y = useTransform(smoothY, [0, 1], [60, -60]);
  const blob3X = useTransform(smoothX, [0, 1], [-60, 60]);
  const blob3Y = useTransform(smoothY, [0, 1], [-40, 40]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#000b1e]" />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          left: '25%',
          top: '15%',
          translateX: '-50%',
          translateY: '-50%',
          x: blob1X,
          y: blob1Y,
          background:
            'radial-gradient(circle, rgba(188,19,254,0.13) 0%, rgba(188,19,254,0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 550,
          height: 550,
          right: '20%',
          bottom: '20%',
          translateX: '50%',
          translateY: '50%',
          x: blob2X,
          y: blob2Y,
          background:
            'radial-gradient(circle, rgba(0,212,170,0.09) 0%, rgba(0,212,170,0.03) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          left: '60%',
          top: '40%',
          translateX: '-50%',
          translateY: '-50%',
          x: blob3X,
          y: blob3Y,
          background:
            'radial-gradient(circle, rgba(0,168,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(188,19,254,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(188,19,254,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
