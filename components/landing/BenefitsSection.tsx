'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Costruito per te',
    desc: 'Niente modelli già pronti. Partiamo dal tuo lavoro, dai tuoi processi, dal tuo modo di fare le cose: costruiamo attorno a quello.',
  },
  {
    title: 'Insieme o separati',
    desc: 'Sito, assistente WhatsApp e automazioni sono tre cose indipendenti. Le prendi solo dove ti servono, oppure tutte: le facciamo parlare tra loro.',
  },
  {
    title: 'Si parte in fretta',
    desc: 'Primi risultati visibili in 7-30 giorni, a seconda del servizio. Procediamo a tappe: vedi i progressi reali ogni settimana, non a fine progetto.',
  },
  {
    title: 'Restiamo dopo il lancio',
    desc: 'Non scompariamo dopo la fattura. Siamo a disposizione per aggiornamenti, modifiche e miglioramenti: il tuo strumento cresce con te.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const } },
};

export default function BenefitsSection() {
  return (
    <section id="vantaggi" className="relative py-28 md:py-36 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky editorial anchor */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="h2-editorial mb-6">
              Cosa cambia <em>davvero</em>.
            </h2>
            <p className="text-base text-slate-300/65 leading-relaxed max-w-[280px]">
              Quattro cose concrete che senti già dalla prima settimana di lavoro insieme.
            </p>
          </motion.div>

          {/* Right — numbered list, no cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col divide-y divide-white/[0.07]"
          >
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                variants={itemVariants}
                className="flex items-start gap-6 py-8 group"
              >
                <span
                  className="shrink-0 text-[2.25rem] font-extrabold leading-none tabular-nums select-none mt-0.5"
                  style={{
                    color: 'rgba(255,255,255,0.10)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="pt-1">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                    {b.title}
                  </h3>
                  <p className="text-slate-300/75 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
