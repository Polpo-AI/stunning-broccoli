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
}: SectionCTAProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Inizia oggi gratuitamente
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>

          {subtitle && (
            <p className="text-slate-300/85 text-base sm:text-lg leading-relaxed mb-10">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} className="btn-outline">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
