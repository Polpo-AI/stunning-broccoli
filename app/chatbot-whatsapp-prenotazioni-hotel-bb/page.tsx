import type { Metadata } from 'next';
import VerticalChatbotPage from '@/components/pages/VerticalChatbotPage';

export const metadata: Metadata = {
  title: 'Automazione Prenotazioni Hotel e B&B su WhatsApp | PolpoAI',
  description: 'Aumenta le prenotazioni dirette e riduci le commissioni delle OTA. Il nostro Chatbot WhatsApp per Hotel risponde alle richieste e mostra le camere libere.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni-hotel-bb',
  },
};

export default function HotelBBPage() {
  return (
    <VerticalChatbotPage
      settore="Hotel & B&B"
      keyword="chatbot whatsapp prenotazioni hotel bb"
      slug="/chatbot-whatsapp-prenotazioni-hotel-bb"
      emoji="🏨"
      problemi={[
        "Troppe commissioni pagate a Booking e Airbnb",
        "Ospiti che chiedono di continuo la password del Wi-Fi o l'orario colazione",
        "Fatigue da reception nel rispondere sempre alle stesse email"
      ]}
      vantaggi={[
        "Incremento strutturale delle prenotazioni dirette",
        "Assistente virtuale concierge H24 per gli ospiti già in struttura",
        "Invio di link per upselling (es. Spa, transfer) in automatico"
      ]}
      faq={[
        { q: "Si collega al mio Channel Manager?", a: "Sì, se il tuo Channel Manager dispone di API pubbliche, il bot può leggere le disponibilità in tempo reale." },
        { q: "Il bot capisce lingue diverse?", a: "Assolutamente. Il nostro AI agent può tradurre e conversare nella lingua dell'utente (Inglese, Tedesco, Spagnolo, etc.)." },
        { q: "Posso gestire il Self Check-in?", a: "Sì, possiamo configurare il bot per inviare i codici della struttura dopo la ricezione dei documenti." }
      ]}
    />
  );
}
