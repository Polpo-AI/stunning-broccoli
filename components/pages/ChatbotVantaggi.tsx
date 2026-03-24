'use client';

import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { FadeUp, fadeUpVariants } from '@/components/shared/animations';

const vantaggi = [
  { icon: Clock, title: 'Risposte H24', desc: 'Non limitarti agli orari d\'ufficio. Ricevi e gestisci richieste anche quando dormi.' },
  { icon: Users, title: 'Zero Attese', desc: 'Niente più clienti in coda o in attesa al telefono. Tutti ottengono una risposta immediata.' },
  { icon: TrendingUp, title: 'Più Conversioni', desc: 'Diminuisci il carico sul tuo staff e aumenta le vendite senza assumere altro personale.' },
];

export default function ChatbotVantaggi() {
  return (
    <section className="py-24 bg-[#0A0F1C] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="section-label">I vantaggi</span>
          <h2 className="section-title">Perché usare un chatbot WhatsApp?</h2>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {vantaggi.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              whileHover={{ y: -6, borderColor: 'rgba(20,184,166,0.35)' }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-[#070B14] border border-white/6 transition-all duration-350"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-14 h-14 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors duration-300"
              >
                <Icon className="w-7 h-7 text-teal-400" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-teal-300 transition-colors duration-200">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
