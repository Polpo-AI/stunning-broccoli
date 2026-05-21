'use client';

import { usePathname } from 'next/navigation';

/**
 * Background persistente del sito polpo (gradient multi-strato).
 * NON viene renderizzato sulle pagine /portfolio/* perché i siti esempio
 * hanno il loro background standalone (per dare un'esperienza realistica
 * del sito che potremmo realizzare).
 */
export default function PersistentBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith('/portfolio')) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          /* riga 1 — alto */
          'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(34,211,238,0.22) 0%, transparent 55%),' +
          'radial-gradient(ellipse 70% 55% at 95% 16%, rgba(167,139,250,0.20) 0%, transparent 55%),' +
          'radial-gradient(ellipse 55% 50% at 8% 22%, rgba(96,165,250,0.18) 0%, transparent 55%),' +
          'radial-gradient(ellipse 45% 40% at 70% 28%, rgba(255,61,138,0.18) 0%, transparent 55%),' +
          /* riga 2 — quarto superiore */
          'radial-gradient(ellipse 55% 45% at 82% 38%, rgba(244,63,94,0.20) 0%, transparent 55%),' +
          'radial-gradient(ellipse 50% 45% at 12% 45%, rgba(255,122,176,0.18) 0%, transparent 55%),' +
          'radial-gradient(ellipse 45% 40% at 65% 50%, rgba(251,146,60,0.16) 0%, transparent 55%),' +
          /* riga 3 — metà */
          'radial-gradient(ellipse 50% 45% at 92% 58%, rgba(255,181,71,0.14) 0%, transparent 55%),' +
          'radial-gradient(ellipse 55% 50% at 25% 62%, rgba(255,61,138,0.18) 0%, transparent 55%),' +
          'radial-gradient(ellipse 65% 50% at 60% 70%, rgba(139,92,246,0.16) 0%, transparent 55%),' +
          /* riga 4 — basso */
          'radial-gradient(ellipse 60% 50% at 8% 80%, rgba(239,68,68,0.16) 0%, transparent 55%),' +
          'radial-gradient(ellipse 55% 50% at 78% 86%, rgba(52,211,153,0.16) 0%, transparent 55%),' +
          'radial-gradient(ellipse 50% 45% at 45% 95%, rgba(34,211,238,0.14) 0%, transparent 55%),' +
          'radial-gradient(ellipse 40% 35% at 22% 92%, rgba(255,122,176,0.14) 0%, transparent 55%),' +
          /* base */
          'linear-gradient(180deg, #0B1228 0%, #0C1530 25%, #0A1228 50%, #0D1532 75%, #0B142E 100%)',
      }}
    />
  );
}
