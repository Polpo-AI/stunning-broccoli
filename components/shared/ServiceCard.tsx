'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

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
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);
    // Wait for the expansion animation (0.5s) before actually routing
    setTimeout(() => {
      router.push(href);
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <motion.div
        className={[
          'group relative flex flex-col h-full min-h-[280px] p-8 rounded-2xl',
          'border border-white/8 bg-white/[0.022] backdrop-blur-sm cursor-pointer',
          'transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]',
          c.border,
          'hover:bg-white/[0.05]',
          'hover:shadow-lg',
        ].join(' ')}
        style={{ '--glow': c.glow } as React.CSSProperties}
        onClick={handleClick}
        whileHover={{ scale: 1.02, y: -6 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Number */}
        {numberLabel && (
          <span className="absolute top-6 right-7 text-[11px] font-bold tracking-widest text-white/15 select-none transition-opacity duration-300">
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
        <motion.div
          className={[
            'relative w-13 h-13 rounded-xl flex items-center justify-center mb-6',
            'border border-white/10',
            'transition-all duration-300',
            c.bg,
          ].join(' ')}
          style={{ width: '52px', height: '52px' }}
        >
          <span className={c.text}>{icon}</span>
        </motion.div>

        {/* Text */}
        <motion.h3 
          className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200 leading-snug"
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-slate-400 text-sm leading-relaxed flex-grow mb-7"
        >
          {description}
        </motion.p>

        {/* CTA Row */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`text-sm font-semibold ${c.text} transition-colors duration-200`}>
            Scopri di più
          </span>
          <ArrowUpRight
            className={`w-4 h-4 ${c.text} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          />
        </div>
      </motion.div>

      {/* Expanding Overlay on Click */}
      {isExpanding && (
        <motion.div
          className="fixed inset-0 z-[110] bg-[#070B14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </motion.div>
  );
}
