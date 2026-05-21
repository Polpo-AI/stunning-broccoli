'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Pulsante back floating "← PolpoAI" sempre visibile sui siti esempio.
 * Posizionato top-left, glass effect, contrast alto per essere leggibile su qualsiasi sfondo.
 */
export default function PortfolioBackButton() {
  return (
    <Link
      href="/creazione-siti-web"
      className="fixed top-4 left-4 z-[9999] inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 group"
      style={{
        background: 'rgba(11,18,40,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
      }}
    >
      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.2} />
      <span className="hidden sm:inline">Torna a</span>
      <span
        className="bg-clip-text text-transparent font-extrabold"
        style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a78bfa)' }}
      >
        PolpoAI
      </span>
      <span className="hidden md:inline text-white/50 font-normal text-xs ml-1">
        · esempio sito
      </span>
    </Link>
  );
}
