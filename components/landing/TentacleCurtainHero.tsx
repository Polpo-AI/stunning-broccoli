'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import Particles from './Particles';

export default function TentacleCurtainHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── 1. SCROLL TRACKING ───────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start opening as soon as the top of the container hits the top of viewport
    // End when the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"]
  });

  // ── 2. SMOOTHING (SPRING PHYSICS) ────────────────────────────────────────────
  // Unovershootato, smorzato, ma reattivo per un feeling super premium
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.5,
    restDelta: 0.0001
  });

  // ── 3. CURTAIN ANIMATION (0 -> 0.45 dello scroll) ────────────────────────────
  // Usiamo un easing non lineare nativo maping progress -> transform
  const openT = [0, 0.45];

  // Easing organico che rallenta alla fine
  const easingOut = (t: number) => 1 - Math.pow(1 - t, 3); // Cubic easeOut

  // Applichiamo l'easingOut custom al progress per le trasformazioni
  const easedProgress = useTransform(smoothProgress, (p) => {
    // normalizziamo p nell'intervallo openT
    const normalized = Math.min(Math.max((p - openT[0]) / (openT[1] - openT[0]), 0), 1);
    return easingOut(normalized);
  });

  // Le tende si spostano oltre il 100% per sparire del tutto, e ruotano leggermente
  const leftX = useTransform(easedProgress, [0, 1], ['0%', '-115%']);
  const leftRot = useTransform(easedProgress, [0, 1], [0, -8]);
  const leftScale = useTransform(easedProgress, [0, 1], [1, 0.95]);

  const rightX = useTransform(easedProgress, [0, 1], ['0%', '115%']);
  const rightRot = useTransform(easedProgress, [0, 1], [0, 8]);
  const rightScale = useTransform(easedProgress, [0, 1], [1, 0.95]);

  // Scomparsa pannelli (inizia quando sono già quasi fuori, per evitare pop-in)
  const panelsOpacity = useTransform(smoothProgress, [0.35, 0.5], [1, 0]);

  // Seam cover sparisce subitissimo al primo frame di scroll
  const seamOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  // ── 4. HERO REVEAL (0.1 -> 0.5 dello scroll) ─────────────────────────────────
  const heroRevealT = [0.1, 0.5];
  const heroOpacity = useTransform(smoothProgress, heroRevealT, [0, 1]);
  const heroScale = useTransform(smoothProgress, heroRevealT, [0.97, 1]);
  const heroY = useTransform(smoothProgress, heroRevealT, [40, 0]);

  // Parallasse di sfondo (movimento lento continuo)
  const bgTranslation = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      // h-[200vh] ci dà 100vh extra di "scroll track" per l'animazione
      className="relative h-[200dvh] bg-[#070B14]"
      id="hero"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* =====================================================================
            LAYER 0: BACKGROUND & PARTICLES
            Nessun overlay nero qui. Solo gradienti cyan leggerissimi e particelle
            ===================================================================== */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: bgTranslation, willChange: 'transform' }}
        >
          <Particles />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 70%), ' +
                'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)',
            }}
          />
        </motion.div>

        {/* =====================================================================
            LAYER 10: BOTTOM FADE
            Risoluzione Bug: lo spostiamo SOTTO i contenuti Hero (z-10 < z-20)
            Così sfuma lo sfondo ma non scurisce i testi/bottoni.
            ===================================================================== */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #070B14)' }}
        />

        {/* =====================================================================
            LAYER 20: HERO CONTENT
            Il posizionamento z-20 assicura che sia LUMINOSO, sopra al bottom fade 
            e ai radial gradients, ma SOTTO le tende (z-60).
            ===================================================================== */}
        <motion.div
          className="relative z-20 h-full flex items-center justify-center pt-20 pointer-events-auto"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            willChange: 'opacity, transform'
          }}
        >
          <div className="text-center px-6 max-w-5xl mx-auto">
            {/* Mascot */}
            <div className="mb-8 flex justify-center">
              <div
                style={{
                  animation: 'float 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 32px rgba(6,182,212,0.4)) drop-shadow(0 0 10px rgba(6,182,212,0.2))',
                }}
              >
                <Image src="/polpo.png" alt="PolpoAI" width={180} height={180} priority className="select-none" />
              </div>
            </div>

            {/* Headlines */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase opacity-90 mb-4 drop-shadow-md">
                Intelligenza Artificiale su misura
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                Il tuo business, <span className="text-cyan-400">più semplice.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 drop-shadow-md">
                Siti web, chatbot e assistenti AI su misura che lavorano al posto tuo.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollTo('#contatti')}
                  className="px-8 py-4 rounded-full font-bold bg-cyan-500 text-[#070B14] hover:bg-cyan-400 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-cyan-500/30 active:scale-95 pointer-events-auto"
                >
                  Prenota una demo
                </button>
                <button
                  onClick={() => scrollTo('#esempio')}
                  className="px-8 py-4 rounded-full font-bold text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 hover:-translate-y-1 transition-all duration-300 active:scale-95 pointer-events-auto"
                >
                  Vedi come funziona
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================================
            LAYER 60: CURTAIN PANELS & SEAM COVER
            Sopra tutto il resto. Specchiati, ottimizzati per le performance
            ===================================================================== */}
        {mounted && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[60]"
            style={{
              opacity: panelsOpacity,
              willChange: 'opacity'
            }}
          >
            {/* ── Pannello Sinistro ── */}
            <motion.div
              className="absolute left-0 top-0 h-full w-[50.2vw] overflow-hidden"
              style={{
                x: leftX,
                rotate: leftRot,
                scale: leftScale,
                transformOrigin: 'left center',
                willChange: 'transform'
              }}
            >
              <img
                src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
                alt=""
                className="w-full h-full object-cover object-left"
                style={{
                  filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                  mixBlendMode: 'screen',
                  transform: 'translateZ(0)' // Forze hardware acceleration GPU
                }}
              />
            </motion.div>

            {/* ── Pannello Destro ── */}
            <motion.div
              className="absolute right-0 top-0 h-full w-[50.2vw] overflow-hidden"
              style={{
                x: rightX,
                rotate: rightRot,
                scale: rightScale,
                transformOrigin: 'right center',
                willChange: 'transform'
              }}
            >
              {/* objectPosition: 'left' assicura lo stesso ritaglio speculare */}
              <img
                src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
                alt=""
                className="w-full h-full object-cover object-left"
                style={{
                  filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                  mixBlendMode: 'screen',
                  transform: 'scaleX(-1) translateZ(0)' // Flip + Hardware Accel
                }}
              />
            </motion.div>

            {/* ── Seam Cover (z-61) ──
                Svanisce appena inizia lo scroll per non creare artefatti */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[4px] bg-[#070B14] z-[61]"
              style={{ opacity: seamOpacity, willChange: 'opacity' }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}