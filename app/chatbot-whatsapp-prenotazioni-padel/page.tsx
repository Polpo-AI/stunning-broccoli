import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp Prenotazioni Campi Padel | PolpoAI',
  description: 'Automatizza la prenotazione dei tuoi campi da Padel e organizza i match mancanti su WhatsApp. Libera il desk del tuo circolo e mantieni i campi pieni.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-padel',
  },
};

export default function PadelPage() {
  return (
    <VerticalChatbotPage
      settore="Padel"
      keyword="chatbot whatsapp prenotazioni padel"
      slug="/chatbot-whatsapp-prenotazioni-padel"
      emoji="🎾"
      problemi={[
        "Gruppi WhatsApp ingestibili per trovare il 'quarto' giocatore",
        "Campi vuoti negli orari buchi perché nessuno risponde al desk",
        "Difficoltà a comunicare in modo rapido tornei e lezioni"
      ]}
      vantaggi={[
        "Prenotazione campo immediata passando dal bot",
        "Gestione automatica messaggi 'Manca un giocatore, chi viene?'",
        "Elimina le distrazioni continue al circolo sportivo"
      ]}
      faq={[
        { q: "L'app Sportclubby/Playtomic è integrabile?", a: "Dipende dalle API, ma spesso inseriamo direttamente il deep link al tuo campo nel messaggio di risposta automatica, triplicando le conversioni." },
        { q: "Posso gestire chat multiple in contemporanea?", a: "Sì, il bot gestisce infinite conversazioni simultanee, garantendo a tutti una risposta istantanea." },
        { q: "Può gestire richieste per i maestri?", a: "Sì, può profilare il giocatore (livello, disponibilità oraria) prima di passarlo al maestro incaricato." }
      ]}
    />
  );
}
