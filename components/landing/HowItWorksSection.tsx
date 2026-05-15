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
    iconColor: 'text-cyan-400',
    borderHover: 'group-hover:border-cyan-500/40',
    bgHover: 'group-hover:bg-cyan-500/5',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
  },
  {
    n: '02',
    icon: Wrench,
    title: 'Costruiamo la soluzione',
    desc: 'Progettiamo e sviluppiamo tutto su misura: niente template, niente soluzioni preconfezionate.',
    iconColor: 'text-violet-400',
    borderHover: 'group-hover:border-violet-500/40',
    bgHover: 'group-hover:bg-violet-500/5',
    badgeBorder: 'border-violet-500/40',
    badgeText: 'text-violet-400',
    titleHover: 'group-hover:text-violet-300',
  },
  {
    n: '03',
    icon: Rocket,
    title: 'Vai live. Cresci.',
    desc: 'In pochi giorni sei operativo. Siamo con te anche dopo il lancio per ogni aggiornamento.',
    iconColor: 'text-emerald-400',
    borderHover: 'group-hover:border-emerald-500/40',
    bgHover: 'group-hover:bg-emerald-500/5',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* No section-local orbs — bg unico dal layout */}
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
          {/* Multi-color connector (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none"
            aria-hidden
            style={{
              background:
                'linear-gradient(to right, rgba(6,182,212,0.35) 0%, rgba(139,92,246,0.35) 50%, rgba(16,185,129,0.35) 100%)',
            }}
          />

          {steps.map(({ n, icon: Icon, title, desc, iconColor, borderHover, bgHover, badgeBorder, badgeText, titleHover }, idx) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step icon container 3D */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div
                  className={[
                    'relative w-24 h-24 rounded-2xl border border-white/[0.10] flex items-center justify-center overflow-hidden',
                    'transition-all duration-400',
                    borderHover, bgHover,
                  ].join(' ')}
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                    boxShadow:
                      '0 10px 28px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.06) inset, 0 -1px 18px rgba(0,0,0,0.4) inset',
                  }}
                >
                  {/* Top highlight 3D */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20) 50%, transparent)' }}
                  />
                  <Icon className={`relative w-9 h-9 ${iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                </div>
                {/* Number badge */}
                <motion.span
                  className={`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full border ${badgeBorder} text-[11px] font-bold ${badgeText} flex items-center justify-center backdrop-blur-md`}
                  style={{
                    background: 'rgba(11,17,40,0.95)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
                  }}
                  animate={{ scale: [1, 1.1, 1], transition: { duration: 2, delay: idx * 0.4, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  {idx + 1}
                </motion.span>
              </motion.div>

              <h3 className={`text-lg font-bold text-white mb-3 transition-colors duration-200 ${titleHover}`}>
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
