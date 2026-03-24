import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp Prenotazioni per Ristoranti | PolpoAI',
  description: 'Automatizza le prenotazioni dei tavoli. Rispondi H24 su orari, menù e parcheggio. Libera il personale di sala con il nostro Chatbot WhatsApp per ristoranti.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-ristoranti',
  },
};

export default function RistorantiPage() {
  return (
    <VerticalChatbotPage
      settore="Ristoranti"
      keyword="chatbot whatsapp prenotazioni ristoranti"
      slug="/chatbot-whatsapp-prenotazioni-ristoranti"
      emoji="🍽️"
      problemi={[
        "Telefono che squilla continuamente durante il servizio serale",
        "Errori nella trascrizione delle prenotazioni a penna",
        "Clienti che chiedono se ci sono opzioni senza glutine o orari"
      ]}
      vantaggi={[
        "Prenotazioni dei tavoli automatiche H24",
        "Invio in chat del menù digitale (PDF o link)",
        "Zero errori e agenda sempre sincronizzata"
      ]}
      faq={[
        { q: "Il bot capisce quante persone e a che ora?", a: "Sì, il bot segue un flusso conversazionale guidato per raccogliere nome, data, orario e numero di persone." },
        { q: "Si collega al mio gestionale?", a: "Sì, possiamo integrarlo con sistemi come TheFork, Quandoo o Google Calendar via API." },
        { q: "Cosa succede se il cliente fa richieste strane?", a: "In caso di domande complesse, il bot avvisa che un responsabile umano risponderà al più presto." }
      ]}
    />
  );
}
