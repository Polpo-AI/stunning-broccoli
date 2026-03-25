'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, MessageSquare, Bot, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const SERVICE_LINKS = [
  { label: 'Siti Web', href: '/creazione-siti-web', icon: Globe },
  { label: 'Chatbot', href: '/chatbot-whatsapp-prenotazioni', icon: MessageSquare },
  { label: 'Agenti AI', href: '/agenti-ai', icon: Bot },
];

export default function CleanHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax effect on hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Background moves slightly down as you scroll down
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Text content fades out and moves down slightly
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[var(--bg-base)] pt-[72px]"
    >
      {/* ── Background (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0" 
        aria-hidden
        style={{ y: yBg }}
      >
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
          animate={{ y: [0, -8, 0], x: [0, 4, 0], transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 220, height: 220, top: '60%', right: '8%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(35px)' }}
          animate={{ y: [0, 6, 0], x: [0, -3, 0], transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 160, height: 160, bottom: '20%', left: '30%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(28px)' }}
          animate={{ y: [0, -4, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
        />
      </motion.div>

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #070B14)' }}
        aria-hidden
      />

      {/* ── Main Content ── */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pt-12"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, 0.5, -0.5, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
            style={{
              filter: 'drop-shadow(0 0 32px rgba(6,182,212,0.4)) drop-shadow(0 0 10px rgba(6,182,212,0.2))',
              willChange: 'transform',
            }}
          >
            <Image
              src="/polpo.png"
              alt="PolpoAI"
              width={120}
              height={120}
              priority
              className="select-none"
            />
          </motion.div>
        </motion.div>

        <motion.span 
          className="section-label mb-5 inline-block"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Intelligenza Artificiale su misura
        </motion.span>

        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Il tuo business,<br className="sm:hidden" />{' '}
          <span className="gradient-text">più semplice.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Siti web, chatbot e agenti AI su misura che lavorano al posto tuo — 24 ore su 24. Aumenta i contatti, riduci il lavoro manuale.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/#contatti" className="btn-primary">
            Prenota una demo gratuita
          </Link>
          <Link href="#servizi" className="btn-outline">
            Scopri i servizi
          </Link>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {SERVICE_LINKS.map(({ label, href, icon: Icon }, i) => (
            <motion.div 
              key={href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + (i * 0.1), duration: 0.5 }}
            >
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                {label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint - Parallaxed down faster so it disappears properly */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 7, 0], transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ opacity: opacityText }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-500/50 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
