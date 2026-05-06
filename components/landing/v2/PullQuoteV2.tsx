'use client';

import { motion } from 'framer-motion';

interface Props {
  quote: React.ReactNode;
  authorInitial: string;
  authorName: string;
  authorRole: string;
  chapter?: string;
}

export default function PullQuoteV2({ quote, authorInitial, authorName, authorRole, chapter = '— Cap. 02 / Voci' }: Props) {
  return (
    <section id="casi" className="relative z-10 px-8 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <span className="section-num-editorial block mb-8">{chapter}</span>
        <p className="font-display font-light leading-[1.1] tracking-[-0.02em] text-white text-balance"
           style={{ fontSize: 'clamp(36px, 4.5vw, 68px)' }}>
          {quote}
        </p>
        <div className="flex items-center gap-3.5 mt-10">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base"
               style={{ background: 'linear-gradient(135deg, #ff3d8a, #ffb547)' }}>
            {authorInitial}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{authorName}</div>
            <div className="text-[13px] text-slate-500">{authorRole}</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
