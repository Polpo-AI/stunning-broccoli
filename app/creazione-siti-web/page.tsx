import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import SitiHero from '@/components/pages/SitiHero';
import SitiFeatures from '@/components/pages/SitiFeatures';

export const metadata: Metadata = {
  title: 'Creazione Siti Web Professionali | PolpoAI',
  description: 'Progettiamo siti web veloci, ottimizzati per smartphone e pensati per convertire visitatori in clienti.',
  alternates: {
    canonical: 'https://polpo-ai.com/creazione-siti-web',
  },
};

const faqItems = [
  { q: 'In quanto tempo sarà pronto il mio sito?', a: 'I nostri siti vetrina richiedono in media dai 15 ai 30 giorni lavorativi, a seconda della complessità.' },
  { q: 'Puntate anche alla SEO?', a: 'Assolutamente sì. Tutti i nostri siti nascono con una SEO tecnica di base ottimizzata.' },
  { q: 'Posso aggiornare il sito da solo?', a: 'Sì, ti forniremo gli accessi a un CMS semplice e intuitivo.' }
];

export default function CreazioneSitiWebPage() {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Creazione Siti Web' }]} />
      </div>
      <SitiHero />
      <SitiFeatures />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Domande Comuni</h2>
        <FAQAccordion items={faqItems} />
      </section>
      <SectionCTA
        title="Pronto a rinnovare la tua immagine online?"
        subtitle="Prenota una consulenza gratuita di 30 minuti per capire come possiamo aiutarti."
        primaryLabel="Prenota la consulenza"
        primaryHref="/#contatti"
      />
    </div>
  );
}
