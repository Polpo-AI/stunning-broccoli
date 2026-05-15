'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="relative border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors duration-300"
      style={{
        background:
          'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
        boxShadow:
          '0 8px 24px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,0.05) inset',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 50%, transparent)' }}
      />
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-cyan-300 transition-colors duration-200">
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/15 transition-all duration-200"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          >
            <p className="px-5 sm:px-6 pb-5 text-slate-300/85 leading-relaxed text-sm">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <FAQRow key={index} item={item} index={index} />
        ))}
      </div>
    </>
  );
}
