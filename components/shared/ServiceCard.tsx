'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  index: number;
  accentColor?: string;
  numberLabel?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon,
  index,
  accentColor = 'cyan',
  numberLabel,
}: ServiceCardProps) {
  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    cyan: {
      border: 'hover:border-cyan-500/40',
      bg:     'bg-cyan-500/10 group-hover:bg-cyan-500/20',
      text:   'text-cyan-400',
      glow:   'rgba(6,182,212,0.12)',
    },
    green: {
      border: 'hover:border-emerald-500/40',
      bg:     'bg-emerald-500/10 group-hover:bg-emerald-500/20',
      text:   'text-emerald-400',
      glow:   'rgba(16,185,129,0.12)',
    },
    purple: {
      border: 'hover:border-violet-500/40',
      bg:     'bg-violet-500/10 group-hover:bg-violet-500/20',
      text:   'text-violet-400',
      glow:   'rgba(139,92,246,0.12)',
    },
  };

  const c = colorMap[accentColor] ?? colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <Link
        href={href}
        className={[
          'group relative flex flex-col h-full min-h-[280px] p-8 rounded-2xl',
          'border border-white/8 bg-white/[0.022] backdrop-blur-sm',
          'transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]',
          c.border,
          'hover:bg-white/[0.05] hover:-translate-y-1.5',
          'hover:shadow-lg',
        ].join(' ')}
        style={{ '--glow': c.glow } as React.CSSProperties}
      >
        {/* Number */}
        {numberLabel && (
          <span className="absolute top-6 right-7 text-[11px] font-bold tracking-widest text-white/15 select-none">
            {numberLabel}
          </span>
        )}

        {/* Subtle glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, var(--glow, rgba(6,182,212,0.12)), transparent)`,
          }}
        />

        {/* Icon */}
        <div
          className={[
            'relative w-13 h-13 rounded-xl flex items-center justify-center mb-6',
            'border border-white/10',
            'transition-all duration-300',
            c.bg,
          ].join(' ')}
          style={{ width: '52px', height: '52px' }}
        >
          <span className={c.text}>{icon}</span>
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200 leading-snug">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-7">
          {description}
        </p>

        {/* CTA Row */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`text-sm font-semibold ${c.text} transition-colors duration-200`}>
            Scopri di più
          </span>
          <ArrowUpRight
            className={`w-4 h-4 ${c.text} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          />
        </div>
      </Link>
    </motion.div>
  );
}
