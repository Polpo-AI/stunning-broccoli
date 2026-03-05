'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import Particles from './Particles';

export default function TentacleCurtainHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // overlap centrale per chiudere perfettamente il sipario
  const overlapPx = 120;

  // animazione apertura sipario
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.35],
    [`${overlapPx}px`, '-120%']
  );

  const rightX = useTransform(
    scrollYProgress,
    [0, 0.35],
    [`-${overlapPx}px`, '120%']
  );

  const leftRot = useTransform(scrollYProgress, [0, 0.35], [0, -18]);
  const rightRot = useTransform(scrollYProgress, [0, 0.35], [0, 18]);

  const leftScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const rightScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);

  const curtainOpacity = useTransform(scrollYProgress, [0.25, 0.38], [1, 0]);

  // parallax layers
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const tentacleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '8%']);
  const mascotY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-22px']);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070B14]"
    >
      {/* BACKGROUND PARALLAX */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={shouldAnimate ? { y: bgParallax } : {}}
      >
        <Particles />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(6,182,212,0.05) 0%, transparent 60%)',
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* BACKING LAYER (nasconde contenuto dietro il sipario) */}
      {mounted && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: '#070B14' }}
        />
      )}

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        <motion.div
          className="mb-8 flex justify-center"
          style={shouldAnimate ? { y: mascotY } : {}}
        >
          <div
            style={{
              animation: 'float 4s ease-in-out infinite',
              filter:
                'drop-shadow(0 0 36px rgba(6,182,212,0.5)) drop-shadow(0 0 10px rgba(6,182,212,0.3))',
            }}
          >
            <Image
              src="/polpo.png"
              alt="PolpoAI mascot"
              width={220}
              height={220}
              priority
              className="object-contain select-none"
            />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Il tuo business{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0ea5e9 100%)',
            }}
          >
            più semplice
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Siti web, chatbot e assistenti AI su misura che lavorano al posto tuo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('#contatti')}
            className="px-8 py-4 rounded-full text-base font-semibold bg-cyan-500 hover:bg-cyan-400 text-[#070B14] transition-all duration-200 shadow-xl shadow-cyan-500/30"
          >
            Prenota una demo
          </button>

          <button
            onClick={() => scrollTo('#esempio')}
            className="px-8 py-4 rounded-full text-base font-semibold text-cyan-400 border border-cyan-500/40 hover:border-cyan-400/70"
          >
            Vedi come funziona
          </button>
        </div>
      </div>

      {/* LEFT CURTAIN */}
      {mounted && (
        <motion.div
          className="absolute left-1/2 top-0 h-full z-30 pointer-events-none overflow-hidden"
          style={
            shouldAnimate
              ? {
                  x: leftX,
                  rotate: leftRot,
                  scale: leftScale,
                  opacity: curtainOpacity,
                  width: 'clamp(360px, 55vw, 760px)',
                  transformOrigin: '0% 90%',
                  translateX: '-100%',
                }
              : {
                  width: 'clamp(360px, 55vw, 760px)',
                  translateX: '-100%',
                }
          }
        >
          <motion.img
            src="/tentacles.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full"
            animate={shouldAnimate ? { y: [0, -10, 0] } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              objectFit: 'contain',
              transform: 'scale(1.1)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}

      {/* RIGHT CURTAIN */}
      {mounted && (
        <motion.div
          className="absolute left-1/2 top-0 h-full z-30 pointer-events-none overflow-hidden"
          style={
            shouldAnimate
              ? {
                  x: rightX,
                  rotate: rightRot,
                  scale: rightScale,
                  opacity: curtainOpacity,
                  width: 'clamp(360px, 55vw, 760px)',
                  transformOrigin: '100% 90%',
                }
              : { width: 'clamp(360px, 55vw, 760px)' }
          }
        >
          <motion.img
            src="/tentacles.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full"
            animate={shouldAnimate ? { y: [0, -12, 0] } : {}}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              objectFit: 'contain',
              transform: 'scaleX(-1) scale(1.1)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}

      {/* bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, #070B14)',
        }}
      />
    </section>
  );
}