import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Segretaria Virtuale e Chatbot per Studi Medici | PolpoAI',
  description: 'Gestisci le visite dei pazienti in automatico su WhatsApp. Pre-qualifica i sintomi, rispondi alle FAQ e sincronizza rubrica e calendario.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-studi-medici',
  },
};

export default function StudiMediciPage() {
  return (
    <VerticalChatbotPage
      settore="Studi Medici"
      keyword="chatbot whatsapp prenotazioni studi medici"
      slug="/chatbot-whatsapp-prenotazioni-studi-medici"
      emoji="🩺"
      problemi={[
        "Segreteria intasata da chiamate per info banali",
        "Pazienti che arrivano senza aver fatto visite preliminari",
        "Gestione ingestibile dei richiami per visite di controllo"
      ]}
      vantaggi={[
        "Automazione delle prenotazioni per controllo o prima visita",
        "Pre-qualifica automatica del paziente (es. hai la ricetta? età?)",
        "Invio raccomandazioni pre-visita via PDF automatico in chat"
      ]}
      faq={[
        { q: "È conforme alla normativa sulla Privacy/GDPR?", a: "Sì, il bot richiede il consenso esplicito per raccogliere e trattare i dati sensibili prima di procedere." },
        { q: "Può il medico intervenire nella chat?", a: "Certamente. Da desktop o smarphone puoi mettere in pausa il bot e rispondere personalmente nei casi urgenti." },
        { q: "Cosa succede se c'è un'urgenza medica?", a: "Il bot ha un pulsante 'Urgenza' che fornisce immediatamente i numeri di emergenza." }
      ]}
    />
  );
}
