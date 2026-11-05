import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { researchPreviewAvailable } from '@/lib/research/availability';
import './research.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Ricerca padel · Anteprima privata',
  description: 'Prova privata delle survey Polpo AI. Raccolta delle risposte disattivata.',
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
  referrer: 'no-referrer',
};
export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  if (!researchPreviewAvailable()) notFound();
  return children;
}
