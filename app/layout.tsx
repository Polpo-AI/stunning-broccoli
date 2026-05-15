import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://polpo-ai.com'),
  title: {
    default: 'PolpoAI — Siti Web, Chatbot WhatsApp e Agenti AI per PMI italiane',
    template: '%s | PolpoAI',
  },
  description:
    'PolpoAI crea siti web vetrina, chatbot WhatsApp per prenotazioni e agenti AI su misura per ristoranti, centri estetici, studi medici, palestre e hotel. Automatizza il tuo business con l\'intelligenza artificiale.',
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
  authors: [{ name: 'PolpoAI', url: 'https://polpo-ai.com' }],
  creator: 'PolpoAI',
  publisher: 'PolpoAI',
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
    <html lang="it" className={`${inter.variable} ${jakarta.variable}`}>
      <body className={inter.className}>
        <Script
          id="ld-graph"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Sfondo persistente — gradient multi-strato premium 4K con rossi accentuati */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              /* riga 1 — alto */
              'radial-gradient(ellipse 100% 65% at 50% -8%, rgba(34,211,238,0.20) 0%, transparent 55%),' +
              'radial-gradient(ellipse 70% 55% at 95% 18%, rgba(167,139,250,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 60% 50% at 5% 22%, rgba(96,165,250,0.16) 0%, transparent 55%),' +
              /* riga 2 — quarto superiore: rosso + coral più evidenti */
              'radial-gradient(ellipse 55% 45% at 82% 32%, rgba(244,63,94,0.22) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 45% at 15% 45%, rgba(251,113,133,0.20) 0%, transparent 55%),' +
              'radial-gradient(ellipse 45% 40% at 65% 50%, rgba(251,146,60,0.16) 0%, transparent 55%),' +
              /* riga 3 — metà: amber + rose + violet */
              'radial-gradient(ellipse 50% 45% at 92% 60%, rgba(251,191,36,0.14) 0%, transparent 55%),' +
              'radial-gradient(ellipse 55% 50% at 25% 65%, rgba(244,114,182,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 65% 50% at 60% 72%, rgba(139,92,246,0.14) 0%, transparent 55%),' +
              /* riga 4 — basso: red più caldo + emerald + cyan */
              'radial-gradient(ellipse 60% 50% at 8% 82%, rgba(239,68,68,0.16) 0%, transparent 55%),' +
              'radial-gradient(ellipse 55% 50% at 78% 88%, rgba(52,211,153,0.14) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 45% at 45% 95%, rgba(34,211,238,0.13) 0%, transparent 55%),' +
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
      </body>
    </html>
  );
}
