import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp Appuntamenti Centri Estetici | PolpoAI',
  description: 'Riempi l\'agenda del tuo salone di bellezza. Fissa appuntamenti in automatico su WhatsApp, riduci i no-show e migliora l\'esperienza delle clienti.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-centri-estetici',
  },
};

export default function CentriEsteticiPage() {
  return (
    <VerticalChatbotPage
      settore="Centri Estetici"
      keyword="chatbot whatsapp prenotazioni centri estetici"
      slug="/chatbot-whatsapp-prenotazioni-centri-estetici"
      emoji="✨"
      problemi={[
        "Agenda vuota al mattino e telefono muto",
        "Interrompere i trattamenti per rispondere al telefono",
        "Clienti che non si presentano all'appuntamento (No-Show)"
      ]}
      vantaggi={[
        "Appuntamenti fissati letteralmente mentre dormi",
        "Promemoria automatici 24h prima per azzerare i No-Show",
        "Menu dei trattamenti e prezzi sempre disponibili in chat"
      ]}
      faq={[
        { q: "Posso far scegliere l'operatore alla cliente?", a: "Assolutamente sì. Il bot può mostrare le disponibilità in base all'operatore desiderato." },
        { q: "Manda il messaggio per ricordare l'appuntamento?", a: "Sì, impostiamo un broadcast automatico su WhatsApp il giorno prima del trattamento." },
        { q: "Come gestisco le cancellazioni?", a: "La cliente può premere il bottone 'Cancella/Sposta' in chat, e il bot libererà lo slot in agenda per un'altra prenotazione." }
      ]}
    />
  );
}
