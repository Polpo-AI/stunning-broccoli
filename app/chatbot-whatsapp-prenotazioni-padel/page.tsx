import type { Metadata } from 'next';
import PadelChatbotPage from '@/components/pages/PadelChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-padel';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Circoli Padel — Prenotazioni e Matchmaking',
  description:
    'Chatbot WhatsApp per circoli padel: prenotazione campi in 30 secondi, matchmaking automatico, gestione disdette e promemoria. Senza scaricare app.',
  keywords: [
    'chatbot whatsapp padel',
    'prenotazioni campi padel',
    'matchmaking padel automatico',
    'gestione circolo padel',
    'whatsapp padel club',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chatbot WhatsApp per Circoli Padel | PolpoAI',
    description: 'Campo prenotato in 30 secondi, 4 giocatori trovati in automatico. Solo su WhatsApp.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Padel' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chatbot WhatsApp per Circoli Padel | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: 'Come funziona il matchmaking?',         a: 'I giocatori si registrano una volta indicando livello e disponibilità. Il bot poi crea match equilibrati e completa i 4 giocatori in automatico.' },
  { q: 'Posso vedere chi ha prenotato?',         a: 'Sì, hai una dashboard web sempre aggiornata con calendario campi, prenotazioni e statistiche.' },
  { q: 'Gestisce le disdette e i pagamenti?',    a: 'Sì, il bot applica le tue policy di cancellazione e può integrare pagamenti via Stripe o link diretti.' },
];

export default function PadelPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Circoli Padel',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Padel Club Booking & Matchmaking',
    description: 'Automazione prenotazioni campi e matchmaking giocatori via WhatsApp per circoli padel.',
    areaServed: { '@type': 'Country', name: 'Italy' },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PadelChatbotPage />
    </>
  );
}
