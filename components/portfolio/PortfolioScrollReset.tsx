'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll-to-top automatico per le pagine /portfolio/*.
 *
 * Il problema:
 * Quando l'utente è scrollato sul sito polpo (es. metà di /creazione-siti-web)
 * e clicca una card della PortfolioShowcase, la navigazione client-side
 * di Next.js NON resetta sempre lo scroll correttamente — perché:
 *  1) Lenis (usato sul sito polpo) tiene il proprio internal scroll state
 *  2) Il PageChrome smonta SmoothScroll quando entra in /portfolio
 *  3) Il browser non rifa scroll a 0 perché è una transizione client-side
 *
 * Soluzione: questo componente, montato dentro app/portfolio/layout.tsx,
 * forza scrollTo(0,0) ad ogni cambio di pathname (e al mount iniziale).
 * Salta se l'URL ha un hash (deep-link a una sezione).
 */
export default function PortfolioScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
