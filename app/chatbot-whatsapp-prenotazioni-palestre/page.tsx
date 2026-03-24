import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Palestre e Centri Fitness | PolpoAI',
  description: 'Automatizza la generazione di abbonamenti. Un Chatbot WhatsApp per la tua palestra che fissa prove gratuite, vende abbonamenti e dà info sui corsi H24.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-palestre',
  },
};

export default function PalestrePage() {
  return (
    <VerticalChatbotPage
      settore="Palestre"
      keyword="chatbot whatsapp prenotazioni palestre"
      slug="/chatbot-whatsapp-prenotazioni-palestre"
      emoji="🏋️‍♀️"
      problemi={[
        "Receptionisti che passano ore al telefono per spiegare l'orario corsi",
        "Lead persi sui social perché contattati troppo tardi",
        "Difficoltà a incentivare i rinnovi degli abbonamenti scaduti"
      ]}
      vantaggi={[
        "Onboarding automatico per prove gratuite via WhatsApp",
        "PDF orari e info pricing istantaneo a chi lo richiede",
        "Broadcast automatico agli iscritti con abbonamento in scadenza"
      ]}
      faq={[
        { q: "Può vendere direttamente in chat?", a: "Sì, possiamo integrare link di pagamento (es. Stripe) direttamente nel flusso di conversazione." },
        { q: "Se i giorni e gli orari cambiano?", a: "Ti basterà aggiornare il foglio Google o il gestionale collegato, e il bot avrà i dati sempre aggiornati." },
        { q: "Posso mandare messaggi motivazionali agli iscritti?", a: "Certamente, puoi usare il bot per inviare broadcast con promozioni, eventi speciali o messaggi motivazionali ai tuoi iscritti." }
      ]}
    />
  );
}
