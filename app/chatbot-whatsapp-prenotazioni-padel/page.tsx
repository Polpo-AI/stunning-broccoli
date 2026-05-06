import VerticalChatbotPageV2 from '@/components/pages/v2/VerticalChatbotPageV2';

export const metadata = {
  title: 'Chatbot WhatsApp per centri padel · PolpoAI',
  description: 'Prenotazioni, slot liberi, recall. Su WhatsApp. 24 ore su 24.',
};

export default function PadelPage() {
  return (
    <VerticalChatbotPageV2
      industryEmoji="🎾"
      industryLabel="Soluzione per Padel"
      heroTitle={<>Mai più <em className="italic text-magenta">campo vuoto</em><br/>il giovedì sera.</>}
      heroBody="Prenotazioni in chat, slot liberi pubblicati in automatico, recall ai clienti silenti. Lui lavora, tu servi i caffè."
      quote={<>«Abbiamo riempito i mercoledì pomeriggio in tre settimane. <em className="italic text-magenta-soft font-light">Ho ricominciato a vedere mio figlio.</em>»</>}
      authorInitial="M"
      authorName="Marco Bianchi"
      authorRole="Padel Roma · 6 campi"
    />
  );
}
