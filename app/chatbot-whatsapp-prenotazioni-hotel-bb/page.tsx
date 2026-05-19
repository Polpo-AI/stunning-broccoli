import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-hotel-bb';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Hotel, B&B e Strutture Ricettive',
  description:
    'Chatbot WhatsApp per hotel e B&B: prenotazioni dirette, concierge multilingua 24/7, self check-in. Riduci le commissioni Booking e Airbnb.',
  keywords: [
    'chatbot whatsapp hotel',
    'chatbot bnb',
    'prenotazioni dirette hotel',
    'whatsapp concierge',
    'riduzione commissioni booking',
    'self check-in whatsapp',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chatbot WhatsApp per Hotel e B&B | PolpoAI',
    description: 'Prenotazioni dirette, concierge virtuale H24, self check-in. Tutto su WhatsApp.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Hotel B&B' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chatbot WhatsApp per Hotel e B&B | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: 'Si collega al mio Channel Manager?', a: 'Sì, se il tuo Channel Manager dispone di API pubbliche, il bot può leggere le disponibilità in tempo reale.' },
  { q: 'Il bot capisce lingue diverse?',     a: 'Assolutamente. Il nostro AI agent può tradurre e conversare nella lingua dell\'utente (Inglese, Tedesco, Spagnolo, etc.).' },
  { q: 'Posso gestire il Self Check-in?',    a: 'Sì, possiamo configurare il bot per inviare i codici della struttura dopo la ricezione dei documenti.' },
];

export default function HotelBBPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Hotel e B&B',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Hospitality Automation',
    description: 'Automazione prenotazioni dirette e concierge virtuale via WhatsApp per hotel e B&B.',
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
        settore="Hotel & B&B"
        keyword="chatbot whatsapp prenotazioni hotel bb"
        slug="/chatbot-whatsapp-prenotazioni-hotel-bb"
        emoji="🏨"
        problemi={[
          'Troppe commissioni pagate a Booking e Airbnb',
          "Ospiti che chiedono di continuo la password del Wi-Fi o l'orario colazione",
          'Fatigue da reception nel rispondere sempre alle stesse email',
        ]}
        vantaggi={[
          'Incremento strutturale delle prenotazioni dirette',
          'Assistente virtuale concierge H24 per gli ospiti già in struttura',
          'Invio di link per upselling (es. Spa, transfer) in automatico',
        ]}
        faq={faqItems}
      />
    </>
  );
}
