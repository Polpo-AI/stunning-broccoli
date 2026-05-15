'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function CleanHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg     = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText   = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-[72px]"
    >
      {/* Background hero — solo grid sottile, i colori arrivano dal layout persistente */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden
        style={{ y: yBg }}
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, black, transparent 80%)',
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full pt-8 pb-32 md:pb-20"
        style={{ y: yText, opacity }}
      >
        {/* Mascotte — floating organico CSS-driven (più leggero di JS animation infinita) */}
        <motion.div
          className="mb-7 flex justify-center"
          initial={{ opacity: 0, scale: 0.85, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="animate-mascot relative"
            style={{
              filter:
                'drop-shadow(0 0 42px rgba(6,182,212,0.5)) drop-shadow(0 0 14px rgba(139,92,246,0.3)) drop-shadow(0 0 8px rgba(244,63,94,0.18))',
            }}
          >
            <Image
              src="/polpo.png"
              alt="PolpoAI mascotte"
              width={130}
              height={130}
              priority
              className="select-none"
            />
          </div>
        </motion.div>

        {/* Eyebrow pill con sparkle */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7
                     border border-cyan-500/25 bg-cyan-500/8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold tracking-[0.14em] uppercase bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #67e8f9, #a78bfa)' }}>
            Intelligenza Artificiale su misura
          </span>
        </motion.div>

        {/* Hero title */}
        <motion.h1
          className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.03em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Il tuo business,<br className="sm:hidden" />{' '}
          <span className="gradient-text animate-gradient">più semplice.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Siti web, chatbot WhatsApp e agenti AI su misura che lavorano al posto tuo —
          24 ore su 24. <span className="text-white font-medium">Più contatti, meno lavoro manuale.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/#contatti" className="btn-primary group">
            Prenota una demo gratuita
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link href="#servizi" className="btn-outline">
            Scopri i servizi
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ opacity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
