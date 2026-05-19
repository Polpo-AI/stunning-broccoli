import type { Metadata } from 'next';
import PadelChatbotPage from '@/components/pages/PadelChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-padel';

export const metadata: Metadata = {
  title: 'Assistente WhatsApp per Circoli Padel — Gestione Partite Automatica',
  description:
    'Assistente WhatsApp per circoli padel: invita giocatori compatibili, gestisce conferme e liste d\'attesa quando manca il quarto. Demo gratuita.',
  keywords: [
    'chatbot padel',
    'chatbot whatsapp padel',
    'assistente whatsapp circolo padel',
    'gestione partite padel',
    'organizzare partite padel whatsapp',
    'software per circoli padel',
    'automazione segreteria padel',
    'matchmaking padel automatico',
    'lista attesa padel',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Assistente WhatsApp per Circoli Padel | PolpoAI',
    description:
      'Quando manca un giocatore, il bot fa il giro di messaggi al posto della segreteria. Tutto sul WhatsApp Business del circolo, senza app da scaricare.',
    url: URL,
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Padel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assistente WhatsApp per Circoli Padel | PolpoAI',
    description: 'Risponde ai giocatori, invita profili compatibili, gestisce conferme e liste d\'attesa.',
    images: ['/polpo.png'],
  },
};

const faqItems = [
  { q: 'Il bot sostituisce la segreteria?', a: 'No. Il bot automatizza le attività ripetitive: raccoglie richieste, invita giocatori compatibili e gestisce conferme. La segreteria mantiene sempre il controllo tramite dashboard.' },
  { q: 'Il giocatore deve scaricare un\'app?', a: 'No. Il giocatore usa WhatsApp, scrivendo al numero WhatsApp Business del circolo.' },
  { q: 'Il sistema può creare nuove partite?', a: 'Sì. Il sistema può supportare la creazione di partite e aiutare a completarle invitando giocatori compatibili.' },
  { q: 'Come vengono scelti i giocatori da invitare?', a: 'Il sistema considera livello, disponibilità, preferenze e regole definite dal circolo.' },
  { q: 'Cosa succede se non ci sono partite disponibili?', a: 'Il giocatore può essere inserito in lista d\'attesa e ricontattato quando si libera un posto o viene creata una partita compatibile.' },
  { q: 'Il circolo può intervenire manualmente?', a: 'Sì. La dashboard permette alla segreteria di creare, modificare e supervisionare partite, richieste e giocatori.' },
  { q: 'Si integra con gestionali esistenti?', a: 'Il servizio nasce per funzionare anche senza integrazioni con gestionali esterni. Eventuali integrazioni possono essere valutate in base alle esigenze del circolo.' },
  { q: 'Il bot usa il WhatsApp del circolo?', a: 'Sì. Il servizio è pensato per lavorare con il WhatsApp Business del circolo, così il giocatore continua a comunicare con il numero ufficiale della struttura.' },
  { q: 'È adatto anche a piccoli circoli?', a: 'Sì. È pensato soprattutto per circoli che vogliono organizzare meglio le partite senza adottare un gestionale complesso.' },
];

export default function PadelPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Assistente WhatsApp per Circoli Padel',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Padel Club Booking & Matchmaking Automation',
    description:
      'Assistente WhatsApp Business per circoli padel: risponde ai giocatori, invita profili compatibili, organizza richieste, conferme e liste d\'attesa. Dashboard operativa per la segreteria.',
    areaServed: { '@type': 'Country', name: 'Italy' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Circoli e centri padel italiani' },
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
      { '@type': 'ListItem', position: 2, name: 'Chatbot WhatsApp', item: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni' },
      { '@type': 'ListItem', position: 3, name: 'Padel', item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PadelChatbotPage />
    </>
  );
}
