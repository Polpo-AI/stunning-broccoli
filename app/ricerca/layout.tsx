import type { Metadata } from 'next';
import './research.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Ricerca padel · Polpo AI',
  description: 'Questionari di ricerca Polpo AI per chi gioca a padel e per chi gestisce un circolo.',
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
  referrer: 'no-referrer',
};
export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
