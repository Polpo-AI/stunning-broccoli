'use client';

import { motion } from 'framer-motion';
import { Binary, Cpu, Workflow } from 'lucide-react';
import { FadeUp, staggerContainer, fadeUpVariants } from '@/components/shared/animations';

const features = [
  {
    icon: Binary,
    color: 'violet',
    title: 'Gestione Dati',
    desc: 'Lettura fatture, inserimento in gestionale, riepiloghi automatici di PDF lunghi.',
  },
  {
    icon: Workflow,
    color: 'violet',
    title: 'Operazioni',
    desc: 'Smistamento email, customer care livello 2, prenotazioni avanzate, alerting.',
  },
  {
    icon: Cpu,
    color: 'violet',
    title: 'Integrazioni',
    desc: "L'agente si connette via API ai tool che usi già (HubSpot, Stripe, Gmail, Google Sheets).",
  },
];

export default function AgentiFeatures() {
  return (
    <section className="py-24 bg-[#0A0F1C] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="section-label">Cosa automatizza</span>
          <h2 className="section-title">Tre aree di impatto principale.</h2>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.35)' }}
              className="group p-8 rounded-2xl bg-[#070B14] border border-white/6 transition-all duration-350 cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors duration-300"
              >
                <Icon className="w-6 h-6 text-violet-400" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-violet-300 transition-colors duration-200">{title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
