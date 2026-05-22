'use client';

import { motion } from 'framer-motion';
import { MessageCircle, FileText, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';

const steps = [
  {
    n: '01',
    icon: MessageCircle,
    title: 'Prima chiamata',
    duration: '15-30 min',
    desc: 'Una chiacchierata gratuita per capire il tuo lavoro, le difficoltà di ogni giorno e cosa vorresti migliorare. Senza impegno, senza vendita aggressiva.',
    iconColor: 'text-cyan-400',
    borderHover: 'group-hover:border-cyan-500/40',
    bgHover: 'group-hover:bg-cyan-500/5',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
  },
  {
    n: '02',
    icon: FileText,
    title: 'Proposta scritta',
    duration: '3-5 giorni',
    desc: 'Ti mandiamo un piano chiaro: cosa costruiamo, in quanto tempo, a quanto costa. Niente sorprese, niente lettere piccole.',
    iconColor: 'text-violet-400',
    borderHover: 'group-hover:border-violet-500/40',
    bgHover: 'group-hover:bg-violet-500/5',
    badgeBorder: 'border-violet-500/40',
    badgeText: 'text-violet-400',
    titleHover: 'group-hover:text-violet-300',
  },
  {
    n: '03',
    icon: Wrench,
    title: 'Costruzione',
    duration: '1-4 settimane',
    desc: 'Costruiamo, proviamo, ti facciamo vedere in anteprima. Procediamo a tappe: vedi i progressi reali ogni settimana, non al buio.',
    iconColor: 'text-emerald-400',
    borderHover: 'group-hover:border-emerald-500/40',
    bgHover: 'group-hover:bg-emerald-500/5',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
  },
  {
    n: '04',
    icon: Rocket,
    title: 'Lancio + supporto',
    duration: 'continuativo',
    desc: 'Si parte. Restiamo a disposizione per aggiornamenti, modifiche e miglioramenti — non scompariamo dopo la fattura.',
    iconColor: 'text-sky-400',
    borderHover: 'group-hover:border-sky-500/40',
    bgHover: 'group-hover:bg-sky-500/5',
    badgeBorder: 'border-sky-500/40',
    badgeText: 'text-sky-400',
    titleHover: 'group-hover:text-sky-300',
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
          <motion.h2 variants={fadeUpVariants} className="h2-editorial mb-5">
            Dal primo <em>incontro</em><br />al lancio.
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-base md:text-[17px] text-slate-300/85 leading-relaxed max-w-md mx-auto">
            Quattro passi semplici. Di solito si parte in meno di 30 giorni.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Multi-color connector (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            aria-hidden
            style={{
              background:
                'linear-gradient(to right, rgba(6,182,212,0.35) 0%, rgba(139,92,246,0.35) 33%, rgba(16,185,129,0.35) 66%, rgba(56,189,248,0.35) 100%)',
            }}
          />

          {steps.map(({ n, icon: Icon, title, duration, desc, iconColor, borderHover, bgHover, badgeBorder, badgeText, titleHover }, idx) => (
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
                    background: 'var(--bg-raised)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
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

              <h3 className={`text-lg font-bold text-white mb-1 transition-colors duration-200 ${titleHover}`}>
                {title}
              </h3>
              <span className={`text-xs ${badgeText} mb-3 uppercase tracking-wider font-semibold opacity-80`}>
                {duration}
              </span>
              <p className="text-slate-300/80 text-sm leading-relaxed max-w-[240px] mx-auto mt-1">
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
