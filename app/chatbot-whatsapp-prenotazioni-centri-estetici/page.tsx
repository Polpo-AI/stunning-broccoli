import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-centri-estetici';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Centri Estetici e Saloni di Bellezza',
  description:
    'Chatbot WhatsApp per centri estetici: fissa appuntamenti in automatico anche di notte, riduce i no-show con promemoria automatici e libera le tue mani dal telefono.',
  keywords: [
    'chatbot whatsapp centri estetici',
    'prenotazioni estetista automatiche',
    'whatsapp salone bellezza',
    'agenda automatica estetista',
    'promemoria appuntamenti whatsapp',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chatbot WhatsApp per Centri Estetici | PolpoAI',
    description: 'Appuntamenti fissati mentre dormi. Niente più no-show grazie ai promemoria automatici.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Centri Estetici' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chatbot WhatsApp per Centri Estetici | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: "Posso far scegliere l'operatore alla cliente?",        a: "Assolutamente sì. Il bot può mostrare le disponibilità in base all'operatore desiderato." },
  { q: "Manda il messaggio per ricordare l'appuntamento?",      a: 'Sì, impostiamo un broadcast automatico su WhatsApp il giorno prima del trattamento.' },
  { q: 'Come gestisco le cancellazioni?',                       a: "La cliente può premere il bottone 'Cancella/Sposta' in chat, e il bot libererà lo slot in agenda per un'altra prenotazione." },
];

export default function CentriEsteticiPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Centri Estetici',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Beauty Salon Booking Automation',
    description: 'Automazione prenotazioni saloni di bellezza via WhatsApp.',
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
        settore="Centri Estetici"
        keyword="chatbot whatsapp prenotazioni centri estetici"
        slug="/chatbot-whatsapp-prenotazioni-centri-estetici"
        emoji="✨"
        problemi={[
          'Agenda vuota al mattino e telefono muto',
          'Interrompere i trattamenti per rispondere al telefono',
          "Clienti che non si presentano all'appuntamento (No-Show)",
        ]}
        vantaggi={[
          'Appuntamenti fissati letteralmente mentre dormi',
          'Promemoria automatici 24h prima per azzerare i No-Show',
          'Menu dei trattamenti e prezzi sempre disponibili in chat',
        ]}
        faq={faqItems}
      />
    </>
  );
}
