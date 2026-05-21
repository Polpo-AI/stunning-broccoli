'use client';

import { usePathname } from 'next/navigation';
import SmoothScroll from '@/components/landing/SmoothScroll';
import Footer from '@/components/landing/Footer';
import { PageWrapper } from '@/components/landing/PageWrapper';

/**
 * Wrapper "chrome" del sito polpo (main padding, smooth scroll, page transition, footer).
 * Sulle pagine /portfolio/* viene bypassato: il sito esempio si renderizza standalone.
 */
export default function PageChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith('/portfolio');

  if (isPortfolio) {
    // Sito esempio standalone — no chrome polpo, no padding, no smooth scroll, no footer polpo
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <main
        className="flex-1 pt-[72px] relative z-10"
        style={{ paddingBottom: 'max(6rem, calc(5rem + env(safe-area-inset-bottom)))' }}
      >
        <PageWrapper>{children}</PageWrapper>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
