'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import CountUp from '@/components/shared/CountUp';

export default function CleanHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  // Nessun fade-out: le scritte restano visibili finché la sezione è in viewport

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

      {/* Main content — layout editoriale */}
      <motion.div
        className="relative z-10 px-6 max-w-6xl mx-auto w-full pt-10 pb-24 md:pb-12"
        style={{ y: yText }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-center">
          {/* LEFT — testo editoriale */}
          <div className="text-center lg:text-left">
            {/* H1 editoriale con em gradient */}
            <motion.h1
              className="h1-editorial mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Il lavoro ripetitivo<br />
              <em>non è il tuo lavoro.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-slate-300/85 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Tre strumenti per smettere di perdere tempo in attività che possono farsi da sole:{' '}
              <strong className="text-white font-medium">sito web vetrina</strong>,{' '}
              <strong className="text-white font-medium">assistente WhatsApp con dashboard</strong> per le prenotazioni e{' '}
              <strong className="text-white font-medium">automazioni intelligenti</strong> per le attività di tutti i giorni.
              Costruiti su misura, si prendono insieme o separatamente.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/#contatti" className="btn-magenta">
                Prenotiamo una call
                <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
              </Link>
              <Link
                href="#servizi"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-300 underline underline-offset-[6px] decoration-white/20 hover:text-white hover:decoration-white/40 transition-colors duration-200"
              >
                Scopri i servizi
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — mascotte con orbit decorations */}
          <motion.div
            className="relative h-[280px] sm:h-[380px] lg:h-[440px] flex items-center justify-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Cerchio orbit interno — solo decorativo, contiene meglio lo spazio */}
            <div
              className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(255,61,138,0.10) 50%, transparent 70%)',
                filter: 'blur(18px)',
              }}
              aria-hidden
            />
            {/* Cerchio orbit esterno con 3 pallini = 3 servizi.
               Posizionati matematicamente sul perimetro a 0°/120°/240°.
               Ogni pallino è centrato sulla circonferenza via translate(-50%,-50%). */}
            <motion.div
              className="absolute w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] lg:w-[380px] lg:h-[380px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'transparent',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            >
              {/* Pallino 1 — sky-blue (Siti Web) — 0° = top
                 x = 50%, y = 0% (centro sulla circonferenza top) */}
              <div
                className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, #7dd3fc 0%, #38bdf8 70%)',
                  boxShadow:
                    '0 0 12px rgba(56,189,248,0.9), 0 0 24px rgba(56,189,248,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              />
              {/* Pallino 2 — emerald — 120° = bottom-right.
                 sin(120°) ≈ 0.866 → x = 50% + 50%*0.866 ≈ 93.30%
                 -cos(120°) = 0.5 → y = 50% + 50%*0.5 = 75% */}
              <div
                className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{
                  top: '75%',
                  left: '93.30%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, #6ee7b7 0%, #10b981 70%)',
                  boxShadow:
                    '0 0 12px rgba(16,185,129,0.9), 0 0 24px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              />
              {/* Pallino 3 — violet — 240° = bottom-left.
                 sin(240°) ≈ -0.866 → x = 50% - 50%*0.866 ≈ 6.70%
                 -cos(240°) = 0.5 → y = 75% */}
              <div
                className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                style={{
                  top: '75%',
                  left: '6.70%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, #c4b5fd 0%, #8b5cf6 70%)',
                  boxShadow:
                    '0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              />
            </motion.div>

            {/* Mascotte */}
            <div
              className="animate-mascot relative z-10"
              style={{
                filter:
                  'drop-shadow(0 0 36px rgba(6,182,212,0.5)) drop-shadow(0 0 14px rgba(139,92,246,0.3)) drop-shadow(0 0 10px rgba(16,185,129,0.25))',
              }}
            >
              <Image
                src="/polpo.png"
                alt="PolpoAI mascotte"
                width={300}
                height={300}
                priority
                className="select-none w-[180px] sm:w-[240px] lg:w-[300px] h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats — Fraunces light italic con colori (senza striscia) */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { num: '30', suffix: ' gg',  label: 'tempo medio dal primo incontro al lancio',  color: 'text-cyan-400' },
            { num: '3',  suffix: '',     label: 'servizi indipendenti o combinati tra loro', color: 'text-magenta' },
            { num: '100', suffix: '%',   label: 'costruito su misura, niente modelli standard', color: 'text-cyan-400' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 14, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col gap-2 text-center sm:text-left"
            >
              <div
                className="font-editorial leading-[0.92] tracking-[-0.04em] text-white text-5xl sm:text-6xl md:text-7xl"
              >
                <em className={`italic font-normal not-italic-no ${s.color}`} style={{ fontStyle: 'italic' }}>{s.num}</em>
                <span className="text-2xl sm:text-3xl align-super opacity-60 font-normal font-sans">{s.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[240px] mx-auto sm:mx-0">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
