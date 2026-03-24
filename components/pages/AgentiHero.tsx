'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bot } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';

export default function AgentiHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(6,182,212,0.06),transparent)] pointer-events-none" />

      {/* Mascotte integrata — assoluta nella sezione, lato destro */}
      <motion.div
        className="absolute bottom-4 right-2 md:bottom-0 md:right-16 pointer-events-none select-none z-0 opacity-40 md:opacity-65"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: '', y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] }}
          style={{
            filter: 'drop-shadow(0 0 28px rgba(139,92,246,0.45)) drop-shadow(0 0 10px rgba(6,182,212,0.2))',
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-400 text-sm font-medium mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bot className="w-4 h-4" />
            </motion.div>
            AI Automation
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Lavora meglio,<br />
            grazie agli{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Agenti Autonomi
            </span>.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Elimina il data-entry, automatizza compiti noiosi e gestisci flussi complessi.
            L'Intelligenza Artificiale che lavora per te come un dipendente instancabile.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-8 mt-4"
          >
            {[
              { value: '20h+', label: 'risparmiate / settimana' },
              { value: '24/7', label: 'operativo senza sosta' },
              { value: '0', label: 'errori umani' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-violet-400">{value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
