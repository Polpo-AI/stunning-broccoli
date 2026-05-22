'use client';

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

const COLOR_MAP: Record<
  string,
  {
    icon: string;
    iconBg: string;
    iconBgHover: string;
    border: string;
    glow: string;
    topBar: string;
    cta: string;
    shadow: string;
  }
> = {
  cyan: {
    icon: 'text-sky-400',
    iconBg: 'bg-sky-400/15',
    iconBgHover: 'group-hover:bg-sky-400/25',
    border: 'group-hover:border-sky-400/55',
    glow: 'rgba(56,189,248,0.20)',
    topBar: 'from-sky-400 via-cyan-400 to-blue-400',
    cta: 'text-sky-300',
    shadow: '0 20px 60px -16px rgba(56,189,248,0.40)',
  },
  green: {
    icon: 'text-emerald-400',
    iconBg: 'bg-emerald-400/15',
    iconBgHover: 'group-hover:bg-emerald-400/25',
    border: 'group-hover:border-emerald-400/55',
    glow: 'rgba(16,185,129,0.20)',
    topBar: 'from-emerald-400 via-teal-400 to-cyan-400',
    cta: 'text-emerald-300',
    shadow: '0 20px 60px -16px rgba(16,185,129,0.40)',
  },
  purple: {
    icon: 'text-violet-400',
    iconBg: 'bg-violet-500/15',
    iconBgHover: 'group-hover:bg-violet-500/25',
    border: 'group-hover:border-violet-400/55',
    glow: 'rgba(139,92,246,0.22)',
    topBar: 'from-violet-400 via-purple-400 to-indigo-400',
    cta: 'text-violet-300',
    shadow: '0 20px 60px -16px rgba(139,92,246,0.40)',
  },
};

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
  const [hover, setHover] = useState(false);
  const c = COLOR_MAP[accentColor] ?? COLOR_MAP.cyan;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);
    setTimeout(() => router.push(href), 380);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        className={`group relative flex flex-col h-full min-h-[300px] p-7 rounded-2xl cursor-pointer
                    border border-white/[0.10] ${c.border}
                    overflow-hidden`}
        style={{
          background: 'linear-gradient(160deg, var(--bg-raised) 0%, var(--bg-surface) 100%)',
          boxShadow: hover
            ? `${c.shadow}, 0 12px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)`
            : '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: 'box-shadow 0.32s var(--ease-premium)',
        }}
      >
        {/* Highlight superiore — bordo luminoso 1px tipo "vetro 3D" */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)' }}
        />

        {/* Top accent gradient bar */}
        <div
          className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${c.topBar}`}
          style={{ opacity: hover ? 1 : 0.6, transition: 'opacity 0.32s' }}
        />

        {/* Hover halo */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${c.glow}, transparent 65%)`,
          }}
        />

        {/* Number label */}
        {numberLabel && (
          <span className="absolute top-6 right-7 text-[11px] font-bold tracking-widest text-white/20 select-none">
            {numberLabel}
          </span>
        )}

        {/* Icon container 3D */}
        <div
          className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-6
                      border border-white/[0.10] transition-all duration-300
                      ${c.iconBg} ${c.iconBgHover}
                      group-hover:scale-105 group-hover:-rotate-3`}
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <span className={c.icon}>{icon}</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-white mb-2.5 leading-snug tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300/85 text-sm leading-relaxed flex-grow mb-6">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`text-sm font-semibold ${c.cta} transition-colors duration-200`}>
            Scopri di più
          </span>
          <ArrowUpRight
            className={`w-4 h-4 ${c.cta} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          />
        </div>
      </motion.div>

      {/* Expanding overlay on click */}
      {isExpanding && (
        <motion.div
          className="fixed inset-0 z-[110] bg-[var(--bg-base)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </motion.div>
  );
}
