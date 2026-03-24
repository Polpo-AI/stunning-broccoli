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
          <span className="section-label">Soluzioni verticali</span>
          <h2 className="section-title mb-4">Soluzioni per ogni business.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Scegli il tuo settore per scoprire come il nostro chatbot può essere personalizzato per le tue esigenze specifiche.
          </p>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left"
        >
          {sectors.map((s) => (
            <motion.div
              key={s.href}
              variants={fadeUpVariants}
            >
              <Link
                href={s.href}
                className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-teal-500/30 hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-white group-hover:text-teal-300 transition-colors duration-200">
                      {s.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
