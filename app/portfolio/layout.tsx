import type { Metadata } from 'next';
import PortfolioBackButton from '@/components/portfolio/PortfolioBackButton';
import PortfolioScrollReset from '@/components/portfolio/PortfolioScrollReset';
import PortfolioProgressBar from '@/components/portfolio/PortfolioProgressBar';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Layout per i siti esempio del portfolio.
 * Niente chrome polpo (navbar/footer/etc) — viene tutto bypassato dal PageChrome.
 * Solo un pulsante back floating "← PolpoAI" sempre visibile + progress bar premium.
 */
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate portfolio-scope">
      <PortfolioScrollReset />
      <PortfolioProgressBar />
      {children}
      <PortfolioBackButton />
    </div>
  );
}
