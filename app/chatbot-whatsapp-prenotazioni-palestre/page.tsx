import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-palestre';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Palestre e Centri Fitness',
  description:
    'Chatbot WhatsApp per palestre: gestisce prove gratuite, vende abbonamenti, manda promemoria di rinnovo e risponde su orari e corsi 24/7.',
  keywords: [
    'chatbot whatsapp palestre',
    'gestione abbonamenti palestra',
    'whatsapp centro fitness',
    'prova gratuita palestra automatica',
    'rinnovo abbonamento whatsapp',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chatbot WhatsApp per Palestre | PolpoAI',
    description: 'Automatizza prove gratuite, abbonamenti e rinnovi. WhatsApp lavora per la tua palestra.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Palestre' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chatbot WhatsApp per Palestre | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: 'Può vendere direttamente in chat?',                  a: 'Sì, possiamo integrare link di pagamento (es. Stripe) direttamente nel flusso di conversazione.' },
  { q: 'Se i giorni e gli orari cambiano?',                  a: 'Ti basterà aggiornare il foglio Google o il gestionale collegato, e il bot avrà i dati sempre aggiornati.' },
  { q: 'Posso mandare messaggi motivazionali agli iscritti?', a: 'Certamente, puoi usare il bot per inviare broadcast con promozioni, eventi speciali o messaggi motivazionali ai tuoi iscritti.' },
];

export default function PalestrePage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Palestre',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Gym Membership Automation',
    description: 'Automazione gestione abbonamenti e prove gratuite via WhatsApp per palestre e centri fitness.',
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
        settore="Palestre"
        keyword="chatbot whatsapp prenotazioni palestre"
        slug="/chatbot-whatsapp-prenotazioni-palestre"
        emoji="🏋️‍♀️"
        problemi={[
          "Receptionisti che passano ore al telefono per spiegare l'orario corsi",
          'Lead persi sui social perché contattati troppo tardi',
          'Difficoltà a incentivare i rinnovi degli abbonamenti scaduti',
        ]}
        vantaggi={[
          'Onboarding automatico per prove gratuite via WhatsApp',
          'PDF orari e info pricing istantaneo a chi lo richiede',
          'Broadcast automatico agli iscritti con abbonamento in scadenza',
        ]}
        faq={faqItems}
      />
    </>
  );
}
