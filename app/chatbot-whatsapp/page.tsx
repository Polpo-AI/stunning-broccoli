import ChatbotHeroV2 from '@/components/pages/v2/ChatbotHeroV2';
import CTAFinalV2 from '@/components/landing/v2/CTAFinalV2';

export const metadata = { title: 'Chatbot WhatsApp · PolpoAI' };

export default function ChatbotPage() {
  return (
    <>
      <ChatbotHeroV2
        title={<>Risponde lui.<br/>Tu <em className="italic text-magenta">cucini.</em></>}
        body="Un assistente WhatsApp che gestisce prenotazioni, FAQ e nuovi contatti. 24 ore su 24, in italiano, con il tono che scegli tu."
      />
      <CTAFinalV2 heading={<>Lo <em className="italic text-magenta">proviamo</em> sul tuo numero.</>} />
    </>
  );
}
