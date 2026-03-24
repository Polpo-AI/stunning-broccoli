import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import AgentiHero from '@/components/pages/AgentiHero';
import AgentiFeatures from '@/components/pages/AgentiFeatures';

export const metadata: Metadata = {
  title: 'Agenti AI e Automazione Aziendale | PolpoAI',
  description: 'Sviluppiamo agenti autonomi basati su intelligenza artificiale per automatizzare lavori ripetitivi e processi aziendali complessi.',
  alternates: {
    canonical: 'https://polpo-ai.com/agenti-ai',
  },
};

const faqItems = [
  { q: 'Cosa fa esattamente un Agente AI?', a: 'Un agente prende decisioni basate su dati e regole predefinite, completando azioni come l\'invio di email, l\'aggiornamento di CRM, e l\'analisi di PDF, in totale autonomia.' },
  { q: 'È sicuro affidare dati a un AI?', a: 'Utilizziamo i più alti standard di sicurezza e crittografia. Non addestriamo modelli pubblici sui tuoi dati proprietari.' },
  { q: 'Qual è il ROI previsto?', a: 'In media i nostri clienti vedono un risparmio di oltre 20 ore a settimana in attività manuali, scalabili senza aumentare l\'organico.' }
];

export default function AgentiAIPage() {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Agenti AI' }]} />
      </div>
      <AgentiHero />
      <AgentiFeatures />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Domande Frequenti</h2>
        <FAQAccordion items={faqItems} />
      </section>
      <SectionCTA
        title="Automatizza il tuo lavoro ora."
        subtitle="Scopri quale processo aziendale potresti automatizzare."
        primaryLabel="Parla con un esperto"
        primaryHref="/#contatti"
        variant="subtle"
      />
    </div>
  );
}
