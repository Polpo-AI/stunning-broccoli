'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Risparmi tempo',
    desc: 'Le attività ripetitive diventano automatiche. Hai più ore libere ogni giorno per ciò che conta davvero.',
  },
  {
    icon: Sparkles,
    title: 'Non perdi contatti',
    desc: 'Ogni richiesta riceve una risposta immediata, anche fuori orario e nei weekend. Zero contatti persi.',
  },
  {
    icon: TrendingUp,
    title: 'Processi più ordinati',
    desc: 'Il tuo lavoro diventa strutturato. Meno caos, meno errori, meno stress — più chiarezza.',
  },
  {
    icon: Zap,
    title: 'Focus sulla crescita',
    desc: 'Smetti di rincorrere le cose. Inizia a costruire il business che vuoi davvero.',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function BenefitsSection() {
  return (
    <section id="vantaggi" className="relative py-28 md:py-36 bg-[var(--bg-base)]">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(6,182,212,0.025) 0%, transparent 60%)',
        }}
      />

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
                  'p-7 rounded-2xl border border-white/6 bg-white/[0.022]',
                  'backdrop-blur-sm group',
                  'transition-all duration-350 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  'hover:border-cyan-500/25 hover:bg-white/[0.04] hover:-translate-y-1',
                ].join(' ')}
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:bg-cyan-500/18 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors duration-200">
                  {b.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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
