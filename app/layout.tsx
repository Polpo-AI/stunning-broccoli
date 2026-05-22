import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/landing/Navbar';
import BottomNav from '@/components/landing/BottomNav';
import GlobalParallaxBackground from '@/components/shared/GlobalParallaxBackground';
import PersistentBackground from '@/components/shared/PersistentBackground';
import PageChrome from '@/components/landing/PageChrome';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://polpo-ai.com'),
  title: {
    default: 'PolpoAI — Siti Vetrina, Assistente WhatsApp e Automazioni AI su Misura',
    template: '%s | PolpoAI',
  },
  description:
    'Costruiamo siti vetrina, assistenti WhatsApp con dashboard e automazioni AI per ristoranti, centri estetici, studi medici, palestre, hotel, padel e PMI. Più contatti, meno telefono. Demo gratuita.',
  keywords: [
    // brand
    'polpo ai', 'polpoai',
    // servizi
    'siti web vetrina',
    'creazione siti web pmi',
    'assistente whatsapp',
    'chatbot whatsapp prenotazioni',
    'chatbot whatsapp business',
    'automazioni ai',
    'agenti ai italia',
    'automazione fatture',
    'automazione email',
    // verticali
    'chatbot ristorante',
    'chatbot centro estetico',
    'chatbot studio medico',
    'chatbot palestra',
    'chatbot hotel bnb',
    'chatbot padel circolo',
    // intent
    'intelligenza artificiale pmi italia',
    'automazione business piccole medie imprese',
    'gestione prenotazioni automatica',
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
  // Google Search Console verification.
  // 1) Vai su https://search.google.com/search-console
  // 2) Aggiungi la proprietà polpo-ai.com → metodo "Tag HTML"
  // 3) Sostituisci la stringa qui sotto col valore del meta content="..." che Google ti dà
  // 4) Pushare → tornare in Search Console → "Verifica"
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
  },
  // Icone dinamiche generate via @vercel/og — vedi app/icon.tsx + app/apple-icon.tsx
  // Polpo su sfondo dark con cerchio: si distingue chiaramente sulla SERP bianca Google.
  icons: {
    icon: [{ url: '/icon', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: '/icon',
  },
  openGraph: {
    title: 'PolpoAI — Siti, Assistenti WhatsApp e Automazioni AI su Misura',
    description:
      'Tre servizi che lavorano per te: siti vetrina online in 15-30 giorni, assistenti WhatsApp che gestiscono prenotazioni 24/7, automazioni AI per attività ripetitive. Costruiti su misura per il tuo settore.',
    url: 'https://polpo-ai.com',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/polpo.png',
        width: 1200,
        height: 630,
        alt: 'PolpoAI — Siti web, assistenti WhatsApp e automazioni AI per PMI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolpoAI — Siti, Assistenti WhatsApp e Automazioni AI',
    description:
      'Siti vetrina, assistenti WhatsApp con dashboard e automazioni AI su misura. Per ristoranti, estetici, medici, palestre, hotel, padel e PMI italiane.',
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
        alternateName: ['Polpo AI', 'Polpo'],
        url: 'https://polpo-ai.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://polpo-ai.com/logo a.jpg',
          width: 512,
          height: 512,
        },
        image: 'https://polpo-ai.com/polpo.png',
        description:
          'PolpoAI è un\'agenzia italiana che progetta siti web vetrina, assistenti WhatsApp con dashboard e automazioni AI su misura per piccole e medie imprese italiane. Niente template, niente WordPress: codice scritto a mano in Next.js con performance Lighthouse 95+.',
        foundingDate: '2024',
        areaServed: { '@type': 'Country', name: 'Italy' },
        knowsAbout: [
          'Sviluppo siti web Next.js',
          'Siti web vetrina mobile-first',
          'SEO tecnica',
          'Chatbot WhatsApp Business',
          'Assistenti AI per prenotazioni',
          'Agenti AI autonomi',
          'Automazione fatturazione',
          'Automazione email triage',
          'Workflow automation',
          'Integrazione CRM',
          'Performance web optimization',
          'Conversational AI in italiano',
        ],
        knowsLanguage: ['Italian'],
        slogan: 'Il tuo business, più semplice.',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: 'info@polpo-ai.com',
            contactType: 'customer service',
            availableLanguage: ['Italian'],
            areaServed: 'IT',
          },
          {
            '@type': 'ContactPoint',
            email: 'info@polpo-ai.com',
            contactType: 'sales',
            availableLanguage: ['Italian'],
            areaServed: 'IT',
          },
        ],
        founder: {
          '@type': 'Person',
          '@id': 'https://polpo-ai.com/#founder',
          name: 'Team PolpoAI',
          jobTitle: 'Founder & Lead Developer',
          worksFor: { '@id': 'https://polpo-ai.com/#organization' },
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://polpo-ai.com/#website',
        url: 'https://polpo-ai.com',
        name: 'PolpoAI',
        description:
          'Siti web vetrina, assistenti WhatsApp con dashboard e automazioni AI su misura per PMI italiane.',
        publisher: { '@id': 'https://polpo-ai.com/#organization' },
        inLanguage: 'it-IT',
        copyrightYear: 2024,
        copyrightHolder: { '@id': 'https://polpo-ai.com/#organization' },
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
        description:
          'Tre servizi distinti che lavorano insieme: siti vetrina online in 15-30 giorni, assistenti WhatsApp con dashboard che gestiscono prenotazioni 24/7, automazioni AI per task ripetitivi (fatture, email, lead).',
        provider: { '@id': 'https://polpo-ai.com/#organization' },
        serviceType: ['Web Development', 'AI Chatbot Development', 'Workflow Automation', 'Conversational AI'],
        areaServed: { '@type': 'Country', name: 'Italy' },
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Piccole e medie imprese italiane',
          geographicArea: { '@type': 'Country', name: 'Italy' },
        },
        availableLanguage: 'Italian',
        priceRange: '€€',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi PolpoAI',
          itemListElement: [
            {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'EUR',
              itemOffered: {
                '@type': 'Service',
                name: 'Creazione Siti Web Vetrina',
                description:
                  'Siti web vetrina su misura in Next.js 13.5, mobile-first, performance Lighthouse 95+, SEO tecnica inclusa. Tempi 15-30 giorni lavorativi.',
                url: 'https://polpo-ai.com/creazione-siti-web',
                serviceType: 'Web Development',
                provider: { '@id': 'https://polpo-ai.com/#organization' },
                areaServed: { '@type': 'Country', name: 'Italy' },
              },
            },
            {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'EUR',
              itemOffered: {
                '@type': 'Service',
                name: 'Assistente WhatsApp per Prenotazioni',
                description:
                  'Chatbot WhatsApp Business con dashboard di gestione. Risponde 24/7, prende prenotazioni, integra calendar esistenti, riduce le telefonate del 60-80%.',
                url: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni',
                serviceType: 'AI Chatbot',
                provider: { '@id': 'https://polpo-ai.com/#organization' },
                areaServed: { '@type': 'Country', name: 'Italy' },
              },
            },
            {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'EUR',
              itemOffered: {
                '@type': 'Service',
                name: 'Agenti AI e Automazioni',
                description:
                  'Workflow custom per task ripetitivi: fatture automatiche, email triage, classificazione lead, scraping dati, integrazione CRM. Costruiti su misura per il flusso del cliente.',
                url: 'https://polpo-ai.com/agenti-ai',
                serviceType: 'Workflow Automation',
                provider: { '@id': 'https://polpo-ai.com/#organization' },
                areaServed: { '@type': 'Country', name: 'Italy' },
              },
            },
          ],
        },
      },
      // ── Speakable schema per voice search & AI assistants ────────────────
      {
        '@type': 'SpeakableSpecification',
        '@id': 'https://polpo-ai.com/#speakable',
        cssSelector: ['h1', '.h1-editorial', '.lead', '.body-lg'],
        xpath: ['/html/head/title', '/html/head/meta[@name="description"]/@content'],
      },
    ],
  };

  return (
    <html lang="it" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className={figtree.className}>
        <Script
          id="ld-graph"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Sfondo persistente polpo — automaticamente nascosto su /portfolio/* */}
        <PersistentBackground />
        <GlobalParallaxBackground />
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          {/* PageChrome decide se applicare il chrome polpo (main padding + footer + smoothscroll)
              o renderizzare il children come standalone (su /portfolio/*) */}
          <PageChrome>{children}</PageChrome>
        </div>
        <BottomNav />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
