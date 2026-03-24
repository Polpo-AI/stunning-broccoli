import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import ChatbotHero from '@/components/pages/ChatbotHero';
import ChatbotVantaggi from '@/components/pages/ChatbotVantaggi';
import ChatbotSettori from '@/components/pages/ChatbotSettori';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp per Prenotazioni | PolpoAI',
  description: 'Automatizza le prenotazioni del tuo business con un Chatbot WhatsApp intelligente. Risponde H24, qualifica i contatti e fissa appuntamenti in automatico.',
  alternates: {
    canonical: 'https://polpo-ai.com/chatbot-whatsapp-prenotazioni',
  },
};

const faqItems = [
  { q: 'Serve avere WhatsApp Business?', a: 'Sì, integriamo il chatbot tramite le API ufficiali di WhatsApp Business per garantirne stabilità e sicurezza.' },
  { q: 'Quanto ci vuole per configurarlo?', a: 'Di solito in 7-10 giorni il tuo chatbot è pronto, testato e attivo sul tuo numero.' },
  { q: 'Può rispondere anche sul mio sito?', a: 'Assolutamente sì. Forniamo un widget per il sito che porta gli utenti direttamente nella chat WhatsApp col tuo bot.' }
];

const sectors = [
  { title: 'Ristoranti', desc: 'Gestisci le prenotazioni dei tavoli e rispondi a domande sul menù senza interrompere il servizio in sala.', href: '/chatbot-whatsapp-prenotazioni-ristoranti', emoji: '🍽️' },
  { title: 'Centri Estetici', desc: 'Riempi la tua agenda con gli appuntamenti presi in automatico via WhatsApp, anche di notte.', href: '/chatbot-whatsapp-prenotazioni-centri-estetici', emoji: '✨' },
  { title: 'Studi Medici', desc: 'Pre-qualifica i pazienti, rispondi alle FAQ e gestisci gli appuntamenti per le visite specialistiche.', href: '/chatbot-whatsapp-prenotazioni-studi-medici', emoji: '🩺' },
  { title: 'Palestre', desc: 'Acquisisci nuovi iscritti, gestisci abbonamenti e dai info sui corsi direttamente su WhatsApp.', href: '/chatbot-whatsapp-prenotazioni-palestre', emoji: '🏋️‍♀️' },
  { title: 'Hotel & B&B', desc: 'Ricevi contatti diretti per le camere, rispondi sulle disponibilità e risparmia sulle commissioni OTA.', href: '/chatbot-whatsapp-prenotazioni-hotel-bb', emoji: '🏨' },
  { title: 'Padel', desc: 'Automatizza le prenotazioni dei campi e rispondi ai giocatori 24/7 su WhatsApp.', href: '/chatbot-whatsapp-prenotazioni-padel', emoji: '🎾' },
];

export default function ChatbotHubPage() {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Chatbot WhatsApp Prenotazioni' }]} />
      </div>
      <ChatbotHero />
      <ChatbotVantaggi />
      <ChatbotSettori sectors={sectors} />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Domande Comuni</h2>
        <FAQAccordion items={faqItems} />
      </section>
      <SectionCTA
        title="Attiva il tuo assistente WhatsApp."
        subtitle="Mettilo alla prova. Raddoppia i contatti, dimezza le rotture di scatole."
        primaryLabel="Prenota la demo"
        primaryHref="/#contatti"
        variant="subtle"
      />
    </div>
  );
}
