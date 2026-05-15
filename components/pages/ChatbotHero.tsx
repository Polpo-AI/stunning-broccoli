'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';
import CountUp from '@/components/shared/CountUp';

export default function ChatbotHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 50% at 88% 75%, rgba(20,184,166,0.10) 0%, transparent 55%),' +
              'radial-gradient(ellipse 40% 40% at 12% 80%, rgba(6,182,212,0.08) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute opacity-[0.025]"
          style={{
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        className="absolute bottom-4 right-2 md:bottom-10 md:right-16 pointer-events-none select-none z-0 opacity-40 md:opacity-60"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden
      >
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, 1, -1, 0],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            filter: 'drop-shadow(0 0 32px rgba(16,185,129,0.50)) drop-shadow(0 0 12px rgba(20,184,166,0.25))',
            willChange: 'transform',
          }}
          className="relative w-24 h-24 md:w-[140px] md:h-[140px]"
        >
          <Image src="/polpo.png" alt="" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/8 text-emerald-300 text-sm font-semibold mb-7 backdrop-blur-sm"
          >
            <motion.div animate={{ scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}>
              <MessageSquare className="w-3.5 h-3.5" />
            </motion.div>
            <span className="tracking-wide">WhatsApp Automation</span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-[clamp(2.25rem,5vw,4rem)] font-extrabold mb-6 tracking-[-0.025em] leading-[1.06]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Il tuo{' '}
            <span className="gradient-text-chatbot">Chatbot WhatsApp</span>{' '}
            per la<br className="hidden sm:block" />
            gestione delle prenotazioni.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Trasforma WhatsApp nel tuo miglior venditore. Un assistente virtuale operativo al 100%
            che fissa appuntamenti, risponde ai clienti e lavora 24 ore su 24.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-2"
          >
            {[
              { value: '24/7', label: 'sempre operativo',  delay: 0 },
              { value: '< 3s', label: 'tempo di risposta', delay: 150 },
              { value: '0',    label: 'chiamate perse',    delay: 300 },
            ].map(({ value, label, delay }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold gradient-text-chatbot" style={{ fontFamily: 'var(--font-display)' }}>
                  <CountUp delay={delay}>{value}</CountUp>
                </div>
                <div className="text-xs text-slate-500 mt-1 tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
