'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, fadeUpVariants } from '@/components/shared/animations';

interface Sector {
  title: string;
  desc: string;
  href: string;
  emoji: string;
}

export default function ChatbotSettori({ sectors }: { sectors: Sector[] }) {
  return (
    <section className="py-24 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="eyebrow-chatbot mb-5">Scegli il tuo settore</span>
          <h2 className="h2-editorial is-chatbot mt-4 mb-5">
            Una soluzione, <em>tanti settori</em>.
          </h2>
          <p className="text-base md:text-[17px] text-slate-300/85 leading-relaxed max-w-2xl mx-auto">
            Clicca sul tuo settore per vedere come funziona nel concreto, con esempi reali.
            <strong className="text-white font-medium"> Se il tuo lavoro non è in lista</strong>, parliamone lo stesso:
            l&apos;assistente si adatta a qualsiasi attività che riceve prenotazioni.
          </p>
        </FadeUp>

        {/* MOBILE: scroll-snap carousel orizzontale */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="sm:hidden -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2"
          style={{
            scrollPaddingLeft: '1.5rem',
            scrollPaddingRight: '1.5rem',
          }}
        >
          {sectors.map((s) => (
            <motion.div
              key={s.href}
              variants={fadeUpVariants}
              className="snap-start shrink-0 w-[80%]"
            >
              <Link
                href={s.href}
                className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/[0.10] hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 h-full text-left"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                  boxShadow:
                    '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset',
                }}
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-white group-hover:text-teal-300 transition-colors duration-200">
                      {s.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                  <p className="text-slate-300/80 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
          {/* Trailing spacer per "respiro" finale */}
          <div className="shrink-0 w-2" />
        </motion.div>

        {/* DESKTOP: grid 3 colonne */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5 text-left"
        >
          {sectors.map((s) => (
            <motion.div key={s.href} variants={fadeUpVariants}>
              <Link
                href={s.href}
                className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/[0.10] hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 h-full"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                  boxShadow:
                    '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset',
                }}
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-white group-hover:text-teal-300 transition-colors duration-200">
                      {s.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                  <p className="text-slate-300/80 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
