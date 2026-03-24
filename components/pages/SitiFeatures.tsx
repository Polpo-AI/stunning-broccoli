'use client';

import { motion } from 'framer-motion';
import { Zap, Smartphone, CheckCircle2 } from 'lucide-react';
import { FadeUp, fadeUpVariants } from '@/components/shared/animations';

const features = [
  {
    icon: Zap,
    title: 'Velocità Estrema',
    desc: 'Caricamenti fulminei che piacciono sia ai tuoi utenti che a Google. Ogni secondo conta per le conversioni.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    desc: "Disegnato prima di tutto per smartphone, dove vive l'80% del traffico web moderno.",
  },
  {
    icon: CheckCircle2,
    title: 'Focus Conversione',
    desc: 'Call to action chiare, chat WhatsApp integrata e form contatti ottimizzati per convertire.',
  },
];

export default function SitiFeatures() {
  return (
    <section className="py-24 bg-[#0A0F1C] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="section-label">Perché sceglierci</span>
          <h2 className="section-title">Tre vantaggi che fanno la differenza.</h2>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              whileHover={{ y: -6, borderColor: 'rgba(6,182,212,0.35)' }}
              className="group p-8 rounded-2xl bg-[#070B14] border border-white/6 transition-all duration-350"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300"
              >
                <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-200">{title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
