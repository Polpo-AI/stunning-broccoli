import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import ChatbotHero from '@/components/pages/ChatbotHero';
import ChatbotVantaggi from '@/components/pages/ChatbotVantaggi';
import ChatbotSettori from '@/components/pages/ChatbotSettori';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Prenotazioni Automatiche',
  description:
    'Chatbot WhatsApp intelligenti per ristoranti, centri estetici, studi medici, palestre, hotel e padel. Risponde 24/7, qualifica i contatti e fissa appuntamenti in automatico.',
  keywords: [
    'chatbot whatsapp',
    'chatbot prenotazioni',
    'whatsapp business automation',
    'chatbot ristorante',
    'chatbot estetista',
    'chatbot medico',
    'chatbot palestra',
    'chatbot hotel',
    'chatbot padel',
    'whatsapp api italia',
  ],
  alternates: { canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni' },
  openGraph: {
    title: 'Chatbot WhatsApp per Prenotazioni | PolpoAI',
    description:
      'Trasforma WhatsApp nel tuo miglior venditore. Chatbot intelligenti che gestiscono prenotazioni 24/7.',
    url: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot WhatsApp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatbot WhatsApp per Prenotazioni | PolpoAI',
    description: 'Automatizza le prenotazioni su WhatsApp. Operativo 24/7, zero chiamate perse.',
    images: ['/polpo.png'],
  },
};

const faqItems = [
  { q: 'Serve avere WhatsApp Business?', a: 'Sì, integriamo il chatbot tramite le API ufficiali di WhatsApp Business per garantirne stabilità e sicurezza.' },
  { q: 'Quanto ci vuole per configurarlo?', a: 'Di solito in 7-10 giorni il tuo chatbot è pronto, testato e attivo sul tuo numero.' },
  { q: 'Può rispondere anche sul mio sito?', a: 'Assolutamente sì. Forniamo un widget per il sito che porta gli utenti direttamente nella chat WhatsApp col tuo bot.' },
];

const sectors = [
  { title: 'Padel',           desc: 'Automatizza le prenotazioni dei campi e rispondi ai giocatori 24/7 su WhatsApp.',                          href: '/chatbot-whatsapp-prenotazioni-padel',         emoji: '🎾' },
  { title: 'Ristoranti',      desc: 'Gestisci le prenotazioni dei tavoli e rispondi a domande sul menù senza interrompere il servizio in sala.', href: '/chatbot-whatsapp-prenotazioni-ristoranti', emoji: '🍽️' },
  { title: 'Centri Estetici', desc: 'Riempi la tua agenda con gli appuntamenti presi in automatico via WhatsApp, anche di notte.',                href: '/chatbot-whatsapp-prenotazioni-centri-estetici', emoji: '✨' },
  { title: 'Studi Medici',    desc: 'Pre-qualifica i pazienti, rispondi alle FAQ e gestisci gli appuntamenti per le visite specialistiche.',     href: '/chatbot-whatsapp-prenotazioni-studi-medici', emoji: '🩺' },
  { title: 'Palestre',        desc: 'Acquisisci nuovi iscritti, gestisci abbonamenti e dai info sui corsi direttamente su WhatsApp.',           href: '/chatbot-whatsapp-prenotazioni-palestre',     emoji: '🏋️‍♀️' },
  { title: 'Hotel & B&B',     desc: 'Ricevi contatti diretti per le camere, rispondi sulle disponibilità e risparmia sulle commissioni OTA.',    href: '/chatbot-whatsapp-prenotazioni-hotel-bb',     emoji: '🏨' },
];

export default function ChatbotHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Chatbot WhatsApp per Prenotazioni',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Conversational AI / WhatsApp Automation',
    description:
      'Chatbot WhatsApp intelligenti per ristoranti, centri estetici, studi medici, palestre, hotel e padel. Automazione prenotazioni 24/7.',
    areaServed: { '@type': 'Country', name: 'Italy' },
    audience: { '@type': 'BusinessAudience', audienceType: 'PMI italiane' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://polpo-ai.com' },
      { '@type': 'ListItem', position: 2, name: 'Chatbot WhatsApp Prenotazioni', item: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni' },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Chatbot WhatsApp Prenotazioni' }]} />
      </div>
      <ChatbotHero />
      <ChatbotVantaggi />
      <ChatbotSettori sectors={sectors} />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Domande Comuni
        </h2>
        <FAQAccordion items={faqItems} />
      </section>
      <SectionCTA
        title="Attiva il tuo assistente WhatsApp."
        subtitle="Mettilo alla prova. Raddoppia i contatti, dimezza le rotture di scatole."
        primaryLabel="Prenota la demo"
        primaryHref="/#contatti"
        variant="subtle"
      />
    </div>
  );
}
