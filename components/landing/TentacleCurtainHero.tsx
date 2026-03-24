'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, MessageSquare, Bot, ArrowRight } from 'lucide-react';

const SERVICE_LINKS = [
  { label: 'Siti Web', href: '/creazione-siti-web', icon: Globe },
  { label: 'Chatbot', href: '/chatbot-whatsapp-prenotazioni', icon: MessageSquare },
  { label: 'Agenti AI', href: '/agenti-ai', icon: Bot },
];

/*
 * SCROLL BUDGET: how many pixels of scroll open the curtain.
 * During these pixels, the hero section is sticky (pinned).
 * After SCROLL_RANGE px, the hero unsticks and normal scroll resumes.
 */
const SCROLL_RANGE = 400; // Aumentato per un'apertura più fluida e profonda

export default function HomeHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Raw progress: 0 = curtain closed, 1 = curtain fully open
  const progress = useMotionValue(0);

  /*
   * CURTAIN TRANSLATION
   * Using raw scroll progress directly guarantees NO jitter, NO springs fighting
   * with smooth-scroll (Lenis), and perfect strict 1:1 bidirectional movement.
   * We use ±101% to ensure sub-pixels are cleared off screen without excess.
   */
  const leftX = useTransform(progress, [0, 1], ['0%', '-101%']);
  const rightX = useTransform(progress, [0, 1], ['0%', '101%']);

  /*
   * CONTENT TIMING
   * Delayed reveal. Content starts fading in ONLY at 60% of the curtain opening,
   * reaching full visibility at 95%. This guarantees the text is not awkwardly
   * sliced while the curtains are still mostly closed.
   */
  const contentOpacity = useTransform(progress, [0.6, 0.95], [0, 1]);
  const contentY = useTransform(progress, [0.6, 0.95], [20, 0]);
  const contentScale = useTransform(progress, [0.6, 0.95], [0.95, 1]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!wrapperRef.current) return;
          // How far the wrapper's top edge has scrolled above viewport top
          const scrolledPx = Math.max(0, -wrapperRef.current.getBoundingClientRect().top);
          // Calculate strict 0 to 1 progress based on exact pixels scrolled
          progress.set(Math.min(scrolledPx / SCROLL_RANGE, 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // initial sync
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  return (
    /*
     * Tall outer wrapper gives the sticky inner section its scroll budget.
     * layout.tsx applies pt-[72px] to main; we use -mt-[72px] on the page wrapper
     * (app/page.tsx) so the hero starts behind the transparent navbar.
     */
    <div
      ref={wrapperRef}
      style={{ height: `calc(100dvh + ${SCROLL_RANGE}px)` }}
      className="relative"
    >
      {/* ── Sticky section ── */}
      <section
        id="hero"
        className="sticky top-0 h-dvh bg-[var(--bg-base)] overflow-hidden flex items-center justify-center pt-[72px]"
      >
        {/* ── Background (always rendered, revealed as curtains open) ── */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.11) 0%, transparent 70%), ' +
                'radial-gradient(ellipse 60% 40% at 15% 85%, rgba(6,182,212,0.07) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          {/* Floating orbs */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 320, height: 320, top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', filter: 'blur(45px)' }}
            animate={{ y: [0, -28, 0], x: [0, 14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 220, height: 220, top: '60%', right: '8%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(35px)' }}
            animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 160, height: 160, bottom: '20%', left: '30%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(28px)' }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>

        {/* ── Bottom fade to next section ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #070B14)' }}
          aria-hidden
        />

        {/* ── Hero content (delayed reveal) ── */}
        <motion.div
          className="relative z-20 text-center px-6 max-w-4xl mx-auto w-full"
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        >
          {/* Spazio superiore: la mascotte deve stare ben sotto la navbar (72px) + blur (~20px) */}
          <div className="pt-12 mb-5 flex justify-center">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                filter: 'drop-shadow(0 0 32px rgba(6,182,212,0.5)) drop-shadow(0 0 10px rgba(6,182,212,0.25))',
                willChange: 'transform',
              }}
            >
              <Image
                src="/polpo.png"
                alt="PolpoAI"
                width={140}
                height={140}
                priority
                className="select-none"
              />
            </motion.div>
          </div>

          <span className="section-label mb-4">Intelligenza Artificiale su misura</span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5">
            Il tuo business,{' '}
            <span className="gradient-text">più semplice.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Siti web, chatbot e agenti AI su misura che lavorano al posto tuo — 24 ore su 24.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/#contatti" className="btn-primary">
              Prenota una demo gratuita
            </Link>
            <Link href="#servizi" className="btn-outline">
              Scopri i servizi
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                {label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-slate-600/50 mx-auto" />
          </motion.div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────
            CURTAIN SYSTEM
            Pure scroll-mapped translation with requestAnimationFrame.
            Zero springs, perfect 1:1 bidirectional sync.
        ──────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-[60] flex" aria-hidden>
          {/* Left panel */}
          <motion.div
            className="w-[50%] h-full overflow-hidden flex-shrink-0"
            style={{ x: leftX }}
          >
            <img
              src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
              alt=""
              className="w-full h-full object-cover object-[35%_center] md:object-left"
              style={{
                filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                mixBlendMode: 'screen',
                transform: 'translateZ(0)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="w-[50%] h-full overflow-hidden flex-shrink-0"
            style={{ x: rightX }}
          >
            <img
              src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
              alt=""
              className="w-full h-full object-cover object-[35%_center] md:object-right"
              style={{
                filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                mixBlendMode: 'screen',
                transform: 'scaleX(-1) translateZ(0)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}