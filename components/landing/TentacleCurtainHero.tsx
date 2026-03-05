'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Particles from './Particles';

// ✅ IMPORTANT: cambia questo con il nome ESATTO del tuo png in /public
// Esempio: "/997e3798-42a4-43af-bdb7-f71e4739b374.png"
const TENTACLES_SRC = '/997e3798-42a4-43af-bdb7-f71e4739b374.png';

export default function TentacleCurtainHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const shouldAnimate = mounted && !prefersReducedMotion;

  // Overlap centrale per chiudere la fessura al 0%
  const overlapPx = 140;

  // Apertura sipario (scroll 0 -> 0.35)
  const leftX = useTransform(scrollYProgress, [0, 0.35], [`${overlapPx}px`, '-120%']);
  const rightX = useTransform(scrollYProgress, [0, 0.35], [`-${overlapPx}px`, '120%']);

  const leftRot = useTransform(scrollYProgress, [0, 0.35], [0, -16]);
  const rightRot = useTransform(scrollYProgress, [0, 0.35], [0, 16]);

  const leftScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const rightScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);

  // Tende visibili finché non hanno quasi finito di aprirsi
  const curtainOpacity = useTransform(scrollYProgress, [0.28, 0.4], [1, 0]);

  // Parallax
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const tentacleParallaxY = useTransform(scrollYProgress, [0, 0.5], ['0%', '8%']);
  const mascotY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-22px']);

  // Reveal cinematico del contenuto (non deve intravedersi a 0%)
  const contentOpacity = useTransform(scrollYProgress, [0.0, 0.12, 0.35], [0, 0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.0, 0.12, 0.35], [0.985, 0.985, 1]);

  // Ombra “cinematografica” tra tende e contenuto (per profondità)
  const curtainShadowOpacity = useTransform(scrollYProgress, [0.1, 0.22, 0.35], [0, 1, 0]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const curtainWidth = 'clamp(360px, 58vw, 820px)';

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070B14]"
    >
      {/* BG PARALLAX (z-0) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
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
            background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* BACKING LAYER (z-10): copre tutto ciò che sta dietro alle tende, evita “intravedere” */}
      {mounted && <div className="absolute inset-0 z-10 pointer-events-none bg-[#070B14]" />}

      {/* HERO CONTENT (z-20): reveal progressivo */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-24"
        style={shouldAnimate ? { opacity: contentOpacity, scale: contentScale } : {}}
      >
        <motion.div className="mb-8 flex justify-center" style={shouldAnimate ? { y: mascotY } : {}}>
          <div
            style={{
              animation: shouldAnimate ? 'float 4s ease-in-out infinite' : undefined,
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

        <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase opacity-80">
          Intelligenza Artificiale su misura
        </span>

        <h1 className="mt-3 text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Il tuo business,{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0ea5e9 100%)',
            }}
          >
            più semplice.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Siti web, chatbot e assistenti AI su misura che lavorano al posto tuo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('#contatti')}
            className="px-8 py-4 rounded-full text-base font-semibold bg-cyan-500 hover:bg-cyan-400 text-[#070B14] transition-all duration-200 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:-translate-y-1"
          >
            Prenota una demo
          </button>
          <button
            onClick={() => scrollTo('#esempio')}
            className="px-8 py-4 rounded-full text-base font-semibold text-cyan-400 border border-cyan-500/40 hover:border-cyan-400/70 hover:bg-cyan-500/5 transition-all duration-200 hover:-translate-y-1"
          >
            Vedi come funziona
          </button>
        </div>
      </motion.div>

      {/* SHADOW LAYER (z-25): ombra tra tende e contenuto */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-25 pointer-events-none"
          style={
            shouldAnimate
              ? {
                  opacity: curtainShadowOpacity,
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 70%)',
                }
              : {}
          }
        />
      )}

      {/* TENTACLES (z-30): due pannelli ancorati al centro */}
      {mounted && (
        <>
          {/* LEFT panel */}
          <motion.div
            className="absolute left-1/2 top-0 h-full z-30 pointer-events-none overflow-hidden"
            style={
              shouldAnimate
                ? {
                    x: leftX,
                    rotate: leftRot,
                    scale: leftScale,
                    opacity: curtainOpacity,
                    width: curtainWidth,
                    translateX: '-100%', // pannello sinistro parte dal centro verso sinistra
                    transformOrigin: '0% 90%',
                  }
                : {
                    width: curtainWidth,
                    translateX: '-100%',
                  }
            }
          >
            <motion.img
              src={TENTACLES_SRC}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: 'contain',
                transform: 'scale(1.1)',
                pointerEvents: 'none',
                userSelect: 'none',
                // se vuoi mantenere l'effetto "glow screen" puoi riattivare:
                // mixBlendMode: 'screen',
              }}
              animate={
                shouldAnimate
                  ? {
                      y: [0, -10, 0], // motion organico
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* parallax verticale leggero */}
            {shouldAnimate && (
              <motion.div className="absolute inset-0" style={{ y: tentacleParallaxY }} />
            )}
          </motion.div>

          {/* RIGHT panel */}
          <motion.div
            className="absolute left-1/2 top-0 h-full z-30 pointer-events-none overflow-hidden"
            style={
              shouldAnimate
                ? {
                    x: rightX,
                    rotate: rightRot,
                    scale: rightScale,
                    opacity: curtainOpacity,
                    width: curtainWidth,
                    transformOrigin: '100% 90%',
                  }
                : { width: curtainWidth }
            }
          >
            <motion.img
              src={TENTACLES_SRC}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: 'contain',
                transform: 'scaleX(-1) scale(1.1)', // speculare perfetto
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              animate={
                shouldAnimate
                  ? {
                      y: [0, -12, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.25,
              }}
            />
          </motion.div>
        </>
      )}

      {/* bottom fade (z-40 sopra tutto) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #070B14)' }}
      />
    </section>
  );
}