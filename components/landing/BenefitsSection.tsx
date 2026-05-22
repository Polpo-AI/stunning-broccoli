'use client';

import { motion } from 'framer-motion';
import { Wrench, Layers, Clock, HeartHandshake } from 'lucide-react';

const benefits = [
  {
    icon: Wrench,
    title: 'Costruito per te',
    desc: 'Niente modelli già pronti. Partiamo dal tuo lavoro, dai tuoi processi, dal tuo modo di fare le cose — e costruiamo attorno a quello.',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/18',
    iconBorder: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
    cardHover: 'hover:border-cyan-500/25',
  },
  {
    icon: Layers,
    title: 'Insieme o separati',
    desc: 'Sito, assistente WhatsApp e automazioni sono tre cose indipendenti. Le prendi solo dove ti servono — oppure tutte, e le facciamo parlare tra loro.',
    iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/18',
    iconBorder: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    titleHover: 'group-hover:text-violet-300',
    cardHover: 'hover:border-violet-500/25',
  },
  {
    icon: Clock,
    title: 'Si parte in fretta',
    desc: 'Primi risultati visibili in 7-30 giorni, a seconda del servizio. Procediamo a tappe: vedi i progressi reali ogni settimana, non a fine progetto.',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/18',
    iconBorder: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
    cardHover: 'hover:border-emerald-500/25',
  },
  {
    icon: HeartHandshake,
    title: 'Restiamo dopo il lancio',
    desc: 'Non scompariamo dopo la fattura. Siamo a disposizione per aggiornamenti, modifiche e miglioramenti — il tuo strumento cresce con te.',
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
          <h2 className="h2-editorial">
            Cosa cambia <em>davvero</em>.
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
                  background: 'linear-gradient(160deg, var(--bg-raised) 0%, var(--bg-surface) 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
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
