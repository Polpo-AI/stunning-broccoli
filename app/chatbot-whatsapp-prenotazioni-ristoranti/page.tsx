import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-ristoranti';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp Prenotazioni per Ristoranti',
  description:
    'Chatbot WhatsApp per ristoranti: gestisce prenotazioni tavoli 24/7, invia menù digitale e risponde a clienti senza interrompere il servizio in sala.',
  keywords: [
    'chatbot whatsapp ristoranti',
    'prenotazioni tavoli automatiche',
    'whatsapp ristorante',
    'gestione prenotazioni ristorante',
    'menù digitale whatsapp',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chatbot WhatsApp per Ristoranti | PolpoAI',
    description: 'Prenotazioni tavoli automatiche su WhatsApp. Niente più telefono che squilla durante il servizio.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Ristoranti' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chatbot WhatsApp per Ristoranti | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: 'Il bot capisce quante persone e a che ora?', a: 'Sì, il bot segue un flusso conversazionale guidato per raccogliere nome, data, orario e numero di persone.' },
  { q: 'Si collega al mio gestionale?',               a: 'Sì, possiamo integrarlo con sistemi come TheFork, Quandoo o Google Calendar via API.' },
  { q: 'Cosa succede se il cliente fa richieste strane?', a: 'In caso di domande complesse, il bot avvisa che un responsabile umano risponderà al più presto.' },
];

export default function RistorantiPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Ristoranti',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Restaurant Booking Automation',
    description: 'Automazione prenotazioni tavoli via WhatsApp per ristoranti italiani.',
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
      <VerticalChatbotPage
        settore="Ristoranti"
        keyword="chatbot whatsapp prenotazioni ristoranti"
        slug="/chatbot-whatsapp-prenotazioni-ristoranti"
        emoji="🍽️"
        problemi={[
          'Telefono che squilla continuamente durante il servizio serale',
          'Errori nella trascrizione delle prenotazioni a penna',
          'Clienti che chiedono se ci sono opzioni senza glutine o orari',
        ]}
        vantaggi={[
          'Prenotazioni dei tavoli automatiche H24',
          'Invio in chat del menù digitale (PDF o link)',
          'Zero errori e agenda sempre sincronizzata',
        ]}
        faq={faqItems}
      />
    </>
  );
}
