'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

/* ─── Mappa brand-color per ogni sito esempio ──────────────────────────── */
const BRAND_BY_PATH: Record<string, { from: string; to: string }> = {
  '/portfolio/smash-burger': { from: '#FF6B35', to: '#FFB400' },
  '/portfolio/fotografo-eventi': { from: '#8B7355', to: '#D4B896' },
  '/portfolio/libero-professionista': { from: '#047857', to: '#34D399' },
};

/**
 * Scroll progress bar premium — barra sottile (3px) in cima alla pagina che
 * cresce mentre l'utente scorre. Usa `transform: scaleX` (GPU layer singolo)
 * con un useSpring per dare la sensazione di "peso fluido" senza scatti.
 * Cambia colore in base al brand del sito esempio corrente.
 */
export default function PortfolioProgressBar() {
  const pathname = usePathname() ?? '';

  const gradient = useMemo(() => {
    const brand = BRAND_BY_PATH[pathname] ?? { from: '#22d3ee', to: '#a78bfa' };
    return `linear-gradient(90deg, ${brand.from} 0%, ${brand.to} 100%)`;
  }, [pathname]);

  const glow = useMemo(() => {
    const brand = BRAND_BY_PATH[pathname] ?? { from: '#22d3ee', to: '#a78bfa' };
    return `0 0 10px ${brand.from}88, 0 0 24px ${brand.to}55`;
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  // Spring per addolcire i micro-scatti dello scroll nativo
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: 'left center',
        background: gradient,
        boxShadow: glow,
        willChange: 'transform',
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[10000] pointer-events-none"
    />
  );
}
