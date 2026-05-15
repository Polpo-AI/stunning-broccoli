'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Risparmi tempo',
    desc: 'Le attività ripetitive diventano automatiche. Hai più ore libere ogni giorno per ciò che conta davvero.',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/18',
    iconBorder: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
    cardHover: 'hover:border-cyan-500/25',
  },
  {
    icon: Sparkles,
    title: 'Non perdi contatti',
    desc: 'Ogni richiesta riceve una risposta immediata, anche fuori orario e nei weekend. Zero contatti persi.',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/18',
    iconBorder: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    titleHover: 'group-hover:text-violet-300',
    cardHover: 'hover:border-violet-500/25',
  },
  {
    icon: TrendingUp,
    title: 'Processi più ordinati',
    desc: 'Il tuo lavoro diventa strutturato. Meno caos, meno errori, meno stress — più chiarezza.',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/18',
    iconBorder: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
    cardHover: 'hover:border-emerald-500/25',
  },
  {
    icon: Zap,
    title: 'Focus sulla crescita',
    desc: 'Smetti di rincorrere le cose. Inizia a costruire il business che vuoi davvero.',
    iconBg: 'bg-sky-500/10 group-hover:bg-sky-500/18',
    iconBorder: 'border-sky-500/20',
    iconColor: 'text-sky-400',
    titleHover: 'group-hover:text-sky-300',
    cardHover: 'hover:border-sky-500/25',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const } },
};

export default function BenefitsSection() {
  return (
    <section id="vantaggi" className="relative py-28 md:py-36 overflow-hidden">
      {/* No section-local orbs — bg unico dal layout */}

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="section-label">Vantaggi concreti</span>
          <h2 className="section-title">
            Cosa cambia davvero.
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                variants={itemVariants}
                className={[
                  'relative p-7 rounded-2xl border border-white/[0.10] group overflow-hidden',
                  'transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  b.cardHover,
                  'hover:-translate-y-1.5',
                ].join(' ')}
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  boxShadow:
                    '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset, 0 -1px 24px rgba(0,0,0,0.4) inset',
                }}
              >
                {/* Highlight 3D superiore */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)' }}
                />

                <div
                  className={[
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300',
                    b.iconBg, b.iconBorder, 'group-hover:scale-110',
                  ].join(' ')}
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  <Icon className={`w-5 h-5 ${b.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className={`text-lg font-bold text-white mb-2.5 transition-colors duration-200 ${b.titleHover}`}>
                  {b.title}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
