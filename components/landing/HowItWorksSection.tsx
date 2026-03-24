'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';

const steps = [
  {
    n: '01',
    icon: MessageCircle,
    title: 'Parliamo del tuo business',
    desc: 'Capiamo i tuoi obiettivi, il tuo settore e le attività che ti rubano tempo ogni giorno.',
    color: 'cyan',
  },
  {
    n: '02',
    icon: Wrench,
    title: 'Costruiamo la soluzione',
    desc: 'Progettiamo e sviluppiamo tutto su misura: niente template, niente soluzioni preconfezionate.',
    color: 'cyan',
  },
  {
    n: '03',
    icon: Rocket,
    title: 'Vai live. Cresci.',
    desc: 'In pochi giorni sei operativo. Siamo con te anche dopo il lancio per ogni aggiornamento.',
    color: 'cyan',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[var(--bg-surface)] border-y border-white/5 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.span variants={fadeUpVariants} className="section-label">
            Come funziona
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="section-title mb-4">
            Dal primo incontro al go-live.
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="section-subtitle max-w-md mx-auto">
            Un processo snello, trasparente e veloce. Di solito si va live in meno di 30 giorni.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none"
            aria-hidden
            style={{
              background: 'linear-gradient(to right, transparent 0%, rgba(6,182,212,0.3) 30%, rgba(6,182,212,0.3) 70%, transparent 100%)',
            }}
          />

          {steps.map(({ n, icon: Icon, title, desc }, idx) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step icon container */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5 transition-all duration-400">
                  <Icon className="w-9 h-9 text-cyan-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                {/* Number badge */}
                <motion.span
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-cyan-500/40 text-[10px] font-bold text-cyan-400 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {idx + 1}
                </motion.span>
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[220px] mx-auto">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA inline */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <a
            href="/#contatti"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group"
          >
            Iniziamo a parlare
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
