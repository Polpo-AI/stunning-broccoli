import type { Metadata } from 'next';
import PadelChatbotPage from '@/components/pages/PadelChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Circoli Padel | Prenotazioni e Matchmaking Automatici | PolpoAI',
  description: 'Il bot WhatsApp per il tuo circolo padel: prenotazione campi in 30 secondi, matchmaking automatico per trovare i 4 giocatori, gestione disdette e promemoria. Nessuna app da scaricare.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-padel',
  },
};

export default function PadelPage() {
  return <PadelChatbotPage />;
}
