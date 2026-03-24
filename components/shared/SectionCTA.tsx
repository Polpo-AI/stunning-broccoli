'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SectionCTAProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'default' | 'subtle';
}

export default function SectionCTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'default',
}: SectionCTAProps) {
  return (
    <section className={`relative py-24 overflow-hidden ${variant === 'default' ? '' : 'border-t border-white/5'}`}>
      {variant === 'default' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Inizia oggi gratuitamente
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 text-[#070B14] font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:bg-cyan-400 transition-all duration-300 whitespace-nowrap"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {secondaryLabel && secondaryHref && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-slate-300 font-medium text-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 whitespace-nowrap"
                >
                  {secondaryLabel}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
