import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

const URL = 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-studi-medici';

export const metadata: Metadata = {
  title: 'Segretaria Virtuale e Chatbot WhatsApp per Studi Medici',
  description:
    'Chatbot WhatsApp per studi medici: pre-qualifica i pazienti, gestisce appuntamenti, risponde alle FAQ e libera la segreteria. Conforme GDPR.',
  keywords: [
    'chatbot whatsapp studi medici',
    'segretaria virtuale medico',
    'prenotazione visite mediche whatsapp',
    'chatbot dottore',
    'gdpr chatbot sanità',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Segretaria Virtuale per Studi Medici | PolpoAI',
    description: 'Pazienti pre-qualificati, FAQ automatizzate, appuntamenti gestiti su WhatsApp.',
    url: URL, siteName: 'PolpoAI', locale: 'it_IT', type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Chatbot Studi Medici' }],
  },
  twitter: { card: 'summary_large_image', title: 'Segretaria Virtuale per Studi Medici | PolpoAI', images: ['/polpo.png'] },
};

const faqItems = [
  { q: 'È conforme alla normativa sulla Privacy/GDPR?', a: 'Sì, il bot richiede il consenso esplicito per raccogliere e trattare i dati sensibili prima di procedere.' },
  { q: 'Può il medico intervenire nella chat?',          a: 'Certamente. Da desktop o smartphone puoi mettere in pausa il bot e rispondere personalmente nei casi urgenti.' },
  { q: "Cosa succede se c'è un'urgenza medica?",          a: "Il bot ha un pulsante 'Urgenza' che fornisce immediatamente i numeri di emergenza." },
];

export default function StudiMediciPage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Chatbot WhatsApp per Studi Medici',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Medical Practice Automation',
    description: 'Automazione prenotazioni e pre-qualifica pazienti via WhatsApp per studi medici.',
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
        settore="Studi Medici"
        keyword="chatbot whatsapp prenotazioni studi medici"
        slug="/chatbot-whatsapp-prenotazioni-studi-medici"
        emoji="🩺"
        problemi={[
          'Segreteria intasata da chiamate per info banali',
          'Pazienti che arrivano senza aver fatto visite preliminari',
          'Gestione ingestibile dei richiami per visite di controllo',
        ]}
        vantaggi={[
          'Automazione delle prenotazioni per controllo o prima visita',
          'Pre-qualifica automatica del paziente (es. hai la ricetta? età?)',
          'Invio raccomandazioni pre-visita via PDF automatico in chat',
        ]}
        faq={faqItems}
      />
    </>
  );
}
