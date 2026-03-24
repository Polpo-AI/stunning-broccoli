'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface VerticalCardProps {
  title: string;
  description: string;
  href: string;
  emoji: string;
  index: number;
}

export default function VerticalCard({ title, description, href, emoji, index }: VerticalCardProps) {
  return (
    <Link href={href} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="h-full flex flex-col p-6 rounded-2xl border border-white/10 bg-[#0A0F1C] hover:bg-[#0D1425] hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
      >
        <div className="text-4xl mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 origin-center">
          {emoji}
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-500 mt-auto">
          <span>Vedi soluzione</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </motion.div>
    </Link>
  );
}
