'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';

export default function ChatbotHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_85%_70%,rgba(6,182,212,0.06),transparent)] pointer-events-none" />

      {/* Mascotte — in basso a destra, integrata nella section */}
      <motion.div
        className="absolute bottom-4 right-2 md:bottom-8 md:right-16 pointer-events-none select-none z-0 opacity-40 md:opacity-60"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [0, 1, -1, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] } }}
          style={{
            filter: 'drop-shadow(0 0 28px rgba(20,184,166,0.45)) drop-shadow(0 0 10px rgba(6,182,212,0.2))',
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-sm font-medium mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <MessageSquare className="w-4 h-4" />
            </motion.div>
            WhatsApp Automation
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Il tuo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Chatbot WhatsApp
            </span>{' '}
            per la<br />gestione delle prenotazioni.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Trasforma WhatsApp nel tuo miglior venditore. Un assistente virtuale operativo al 100%
            che fissa appuntamenti, risponde ai clienti e lavora 24 ore su 24.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-8 mt-2"
          >
            {[
              { value: '24/7', label: 'sempre operativo' },
              { value: '< 3s', label: 'tempo di risposta' },
              { value: '0', label: 'chiamate perse' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-teal-400">{value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
