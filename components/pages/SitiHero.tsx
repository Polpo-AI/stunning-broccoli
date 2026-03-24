'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';

export default function SitiHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(56,189,248,0.06),transparent)] pointer-events-none" />

      {/* Mascotte — in basso a sinistra, integrata nella section */}
      <motion.div
        className="absolute bottom-4 left-2 md:bottom-0 md:left-16 pointer-events-none select-none z-0 opacity-40 md:opacity-60"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: '', y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] }}
          style={{
            filter: 'drop-shadow(0 0 28px rgba(6,182,212,0.45)) drop-shadow(0 0 10px rgba(56,189,248,0.2))',
            willChange: 'transform',
          }}
          className="relative w-24 h-24 md:w-[130px] md:h-[130px]"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-sm font-medium mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Globe className="w-4 h-4" />
            </motion.div>
            Digital Presence
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Il tuo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              sito web
            </span>{' '}
            pronto<br />
            per attrarre nuovi clienti.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Non una semplice vetrina, ma una macchina per generare contatti.
            Veloce, bellissimo su mobile e ottimizzato per farti trovare su Google.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-8 mt-4"
          >
            {[
              { value: '< 3s', label: 'tempo di caricamento' },
              { value: '100%', label: 'mobile friendly' },
              { value: 'Top 10', label: 'Google con SEO' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
