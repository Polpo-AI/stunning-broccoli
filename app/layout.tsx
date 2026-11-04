import './globals.css';
import './immersive.css';
import './world-explorer.css';
import './inner.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/landing/Navbar';
import PageChrome from '@/components/landing/PageChrome';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta', weight: ['400', '500', '600', '700', '800'] });
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-fraunces', weight: ['300', '400', '600'], style: ['normal', 'italic'] });
const description = 'Polpo AI, specialista di automazioni AI per le PMI. Assistenti intelligenti, prenotazioni e processi connessi, progettati intorno al tuo lavoro. Richiedi la tua analisi gratuita.';
const isPreview = process.env.VERCEL_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL('https://polpo-ai.com'),
  title: { default: 'Polpo AI — Automazioni intelligenti per le PMI', template: '%s | Polpo AI' },
  description,
  applicationName: 'Polpo AI',
  category: 'business',
  manifest: '/manifest.webmanifest',
  robots: { index: !isPreview, follow: !isPreview },
  alternates: { canonical: 'https://polpo-ai.com' },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
  icons: {
    icon: [{ url: '/icon', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'La tua attività ha mille cose da fare. Noi le facciamo lavorare insieme.',
    description, url: 'https://polpo-ai.com', siteName: 'Polpo AI', locale: 'it_IT', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Polpo AI — Automazioni intelligenti per le PMI', description },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#080e23',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://polpo-ai.com/#organization', name: 'Polpo AI', url: 'https://polpo-ai.com', logo: 'https://polpo-ai.com/polpo-icon.jpg', description, email: 'info@polpo-ai.com', knowsAbout: ['Assistenti AI', 'Automazione delle prenotazioni', 'Automazione dei processi aziendali'] },
      { '@type': 'WebSite', '@id': 'https://polpo-ai.com/#website', name: 'Polpo AI', url: 'https://polpo-ai.com', inLanguage: 'it-IT', publisher: { '@id': 'https://polpo-ai.com/#organization' } },
    ],
  };
  return (
    <html lang="it" className={`${inter.variable} ${jakarta.variable} ${fraunces.variable}`}>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <PageChrome>{children}</PageChrome>
        <Analytics /><SpeedInsights />
      </body>
    </html>
  );
}
