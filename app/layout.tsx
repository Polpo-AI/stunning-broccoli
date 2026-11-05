import './globals.css';
import './immersive.css';
import './world-explorer.css';
import './inner.css';
import './consultation.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import SiteTelemetry from '@/components/research/SiteTelemetry';

import Navbar from '@/components/landing/Navbar';
import PageChrome from '@/components/landing/PageChrome';

const inter = localFont({ src: './fonts/Inter.woff2', display: 'swap', variable: '--font-inter', weight: '100 900' });
const jakarta = localFont({ src: './fonts/PlusJakartaSans.woff2', display: 'swap', variable: '--font-jakarta', weight: '200 800' });
const fraunces = localFont({ src: [{path:'./fonts/Fraunces.woff2',style:'normal',weight:'100 900'},{path:'./fonts/Fraunces-Italic.woff2',style:'italic',weight:'100 900'}], display: 'swap', variable: '--font-fraunces' });
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
};

export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#080e23'};

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
        <SiteTelemetry />
      </body>
    </html>
  );
}
