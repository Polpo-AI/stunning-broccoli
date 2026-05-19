import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SmoothScroll from '@/components/landing/SmoothScroll';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BottomNav from '@/components/landing/BottomNav';
import { PageWrapper } from '@/components/landing/PageWrapper';
import GlobalParallaxBackground from '@/components/shared/GlobalParallaxBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://polpo-ai.com'),
  title: {
    default: 'PolpoAI — Siti Web, Chatbot WhatsApp e Agenti AI per PMI italiane',
    template: '%s | PolpoAI',
  },
  description:
    'Siti web, chatbot WhatsApp e agenti AI su misura per PMI italiane. Automatizza prenotazioni, riduci il lavoro manuale, converti più contatti — 24 ore su 24.',
  keywords: [
    'chatbot whatsapp prenotazioni',
    'agenti ai italia',
    'siti web vetrina',
    'automazione business ai',
    'chatbot ristorante',
    'chatbot centro estetico',
    'chatbot studio medico',
    'chatbot palestra',
    'chatbot hotel',
    'intelligenza artificiale pmi',
    'polpo ai',
    'polpoai',
  ],
  applicationName: 'PolpoAI',
  category: 'business',
  authors: [{ name: 'PolpoAI', url: 'https://polpo-ai.com' }],
  creator: 'PolpoAI',
  publisher: 'PolpoAI',
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://polpo-ai.com',
  },
  icons: {
    icon: [
      { url: '/polpo-icon.jpg', type: 'image/jpeg' },
      { url: '/icon.jpg', type: 'image/jpeg', sizes: '570x570' },
    ],
    apple: [{ url: '/apple-icon.jpg', sizes: '570x570', type: 'image/jpeg' }],
    shortcut: '/polpo-icon.jpg',
  },
  openGraph: {
    title: 'PolpoAI — Siti Web, Chatbot WhatsApp e Agenti AI per PMI italiane',
    description:
      'Automatizza prenotazioni e customer care con chatbot WhatsApp e agenti AI su misura. Siti web vetrina professionali per la tua attività.',
    url: 'https://polpo-ai.com',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/polpo.png',
        width: 1200,
        height: 630,
        alt: 'PolpoAI — Intelligenza Artificiale per il tuo business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolpoAI — Siti Web, Chatbot e Agenti AI su misura',
    description:
      'Automatizza prenotazioni e customer care con chatbot WhatsApp e agenti AI. Siti web vetrina per PMI italiane.',
    images: ['/polpo.png'],
  },
  // Next.js 13.5 supporta viewport e themeColor direttamente sul metadata
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#0B1228',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://polpo-ai.com/#organization',
        name: 'PolpoAI',
        url: 'https://polpo-ai.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://polpo-ai.com/logo a.jpg',
          width: 512,
          height: 512,
        },
        image: 'https://polpo-ai.com/polpo.png',
        description:
          'PolpoAI crea siti web, chatbot WhatsApp e agenti AI su misura per PMI italiane.',
        foundingDate: '2024',
        areaServed: { '@type': 'Country', name: 'Italy' },
        knowsAbout: [
          'Intelligenza Artificiale',
          'Chatbot WhatsApp',
          'Agenti AI autonomi',
          'Automazione aziendale',
          'Siti web vetrina',
          'Customer care automation',
        ],
        slogan: 'Il tuo business, più semplice.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Italian'],
          areaServed: 'IT',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://polpo-ai.com/#website',
        url: 'https://polpo-ai.com',
        name: 'PolpoAI',
        description: 'Siti web, chatbot WhatsApp e agenti AI su misura per PMI italiane',
        publisher: { '@id': 'https://polpo-ai.com/#organization' },
        inLanguage: 'it-IT',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://polpo-ai.com/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://polpo-ai.com/#service',
        name: 'PolpoAI — Agenzia AI per PMI',
        description: 'Siti web vetrina, chatbot WhatsApp per prenotazioni e agenti AI autonomi.',
        provider: { '@id': 'https://polpo-ai.com/#organization' },
        serviceType: ['Web Development', 'AI Chatbot', 'Workflow Automation'],
        areaServed: { '@type': 'Country', name: 'Italy' },
        audience: { '@type': 'BusinessAudience', audienceType: 'Piccole e medie imprese italiane' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi PolpoAI',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Creazione Siti Web Vetrina',
                url: 'https://polpo-ai.com/creazione-siti-web',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Chatbot WhatsApp per Prenotazioni',
                url: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Agenti AI Autonomi',
                url: 'https://polpo-ai.com/agenti-ai',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="it" className={`${inter.variable} ${jakarta.variable} ${fraunces.variable}`}>
      <body className={inter.className}>
        <Script
          id="ld-graph"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Sfondo persistente — gradient multi-strato premium 4K con magenta editoriale */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              /* riga 1 — alto: cyan + violet + sky + magenta */
              'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(34,211,238,0.22) 0%, transparent 55%),' +
              'radial-gradient(ellipse 70% 55% at 95% 16%, rgba(167,139,250,0.20) 0%, transparent 55%),' +
              'radial-gradient(ellipse 55% 50% at 8% 22%, rgba(96,165,250,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 45% 40% at 70% 28%, rgba(255,61,138,0.18) 0%, transparent 55%),' +
              /* riga 2 — quarto superiore: rosso + coral + magenta */
              'radial-gradient(ellipse 55% 45% at 82% 38%, rgba(244,63,94,0.20) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 45% at 12% 45%, rgba(255,122,176,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 45% 40% at 65% 50%, rgba(251,146,60,0.16) 0%, transparent 55%),' +
              /* riga 3 — metà: amber + magenta + violet */
              'radial-gradient(ellipse 50% 45% at 92% 58%, rgba(255,181,71,0.14) 0%, transparent 55%),' +
              'radial-gradient(ellipse 55% 50% at 25% 62%, rgba(255,61,138,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 65% 50% at 60% 70%, rgba(139,92,246,0.16) 0%, transparent 55%),' +
              /* riga 4 — basso: red + emerald + cyan + pink */
              'radial-gradient(ellipse 60% 50% at 8% 80%, rgba(239,68,68,0.16) 0%, transparent 55%),' +
              'radial-gradient(ellipse 55% 50% at 78% 86%, rgba(52,211,153,0.16) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 45% at 45% 95%, rgba(34,211,238,0.14) 0%, transparent 55%),' +
              'radial-gradient(ellipse 40% 35% at 22% 92%, rgba(255,122,176,0.14) 0%, transparent 55%),' +
              /* base */
              'linear-gradient(180deg, #0B1228 0%, #0C1530 25%, #0A1228 50%, #0D1532 75%, #0B142E 100%)',
          }}
        />
        <GlobalParallaxBackground />
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <SmoothScroll>
            <main
              className="flex-1 pt-[72px] relative z-10"
              style={{ paddingBottom: 'max(6rem, calc(5rem + env(safe-area-inset-bottom)))' }}
            >
              <PageWrapper>{children}</PageWrapper>
            </main>
            <Footer />
          </SmoothScroll>
        </div>
        <BottomNav />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
