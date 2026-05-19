import type { Metadata } from 'next';
import { Briefcase, Store, Palette, Building2 } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import SitiHero from '@/components/pages/SitiHero';
import SitiFeatures from '@/components/pages/SitiFeatures';
import WhoIsItFor from '@/components/shared/WhoIsItFor';

export const metadata: Metadata = {
  title: 'Creazione Siti Web Professionali per PMI',
  description:
    'Siti web vetrina veloci, mobile-first e ottimizzati SEO per PMI italiane. Pensati per convertire visitatori in clienti reali, non per vincere premi di design.',
  keywords: [
    'creazione siti web',
    'sito web vetrina',
    'sito web pmi',
    'sito web mobile friendly',
    'sito web seo',
    'sito web professionale italia',
    'sviluppo web nextjs',
    'sito web veloce',
  ],
  alternates: { canonical: 'https://polpo-ai.com/creazione-siti-web' },
  openGraph: {
    title: 'Creazione Siti Web Professionali | PolpoAI',
    description:
      'Siti web veloci, perfetti su mobile e ottimizzati SEO. Pronti a trasformare visitatori in clienti reali.',
    url: 'https://polpo-ai.com/creazione-siti-web',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Creazione Siti Web' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creazione Siti Web Professionali | PolpoAI',
    description: 'Siti web vetrina veloci, mobile-first e SEO-ready per PMI italiane.',
    images: ['/polpo.png'],
  },
};

const faqItems = [
  { q: 'In quanto tempo sarà pronto il mio sito?', a: 'I nostri siti vetrina richiedono in media dai 15 ai 30 giorni lavorativi, a seconda della complessità.' },
  { q: 'Puntate anche alla SEO?', a: 'Assolutamente sì. Tutti i nostri siti nascono con una SEO tecnica di base ottimizzata.' },
  { q: 'Posso aggiornare il sito da solo?', a: 'Sì, ti forniremo gli accessi a un CMS semplice e intuitivo.' },
];

export default function CreazioneSitiWebPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Creazione Siti Web Professionali',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'Web Development',
    description:
      'Sviluppo di siti web vetrina su misura per PMI italiane, ottimizzati per mobile, performance e SEO.',
    areaServed: { '@type': 'Country', name: 'Italy' },
    audience: { '@type': 'BusinessAudience', audienceType: 'PMI italiane' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://polpo-ai.com' },
      { '@type': 'ListItem', position: 2, name: 'Creazione Siti Web', item: 'https://polpo-ai.com/creazione-siti-web' },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Creazione Siti Web' }]} />
      </div>
      <SitiHero />
      <WhoIsItFor
        variant="siti"
        title={<>Per chi è <em>questo servizio</em>?</>}
        subtitle="Un sito vetrina è la base per chiunque voglia presentarsi online in modo serio. Ecco alcuni esempi tipici — ma vale anche se non ti riconosci esattamente in nessuno."
        items={[
          {
            icon: <Briefcase className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Liberi professionisti',
            desc: 'Avvocati, commercialisti, consulenti, architetti — chi ha bisogno di una vetrina credibile dove farsi trovare.',
            example: 'Avvocato civilista che vuole essere trovato su Google con le keyword giuste.',
          },
          {
            icon: <Store className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Piccole attività locali',
            desc: 'Negozi, botteghe, studi, locali — chi vuole essere trovato online da chi cerca nei dintorni.',
            example: 'Pasticceria di quartiere che vuole farsi trovare cercando "pasticceria + città".',
          },
          {
            icon: <Palette className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Freelance e creativi',
            desc: 'Fotografi, designer, artigiani, formatori — chi ha un portfolio o servizi da mostrare in modo ordinato.',
            example: 'Fotografo di matrimonio che vuole un portfolio veloce e mobile-friendly.',
          },
          {
            icon: <Building2 className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Piccole aziende',
            desc: 'Chi ha un sito vecchio, fatto male o nessun sito — e vuole presentarsi al mercato con una vetrina moderna.',
            example: 'Azienda di import-export che ha un sito del 2010 e vuole rinnovarlo.',
          },
        ]}
        footnote="Se la tua attività non rientra in questi profili, parliamone lo stesso — un sito vetrina è utile a chiunque debba essere trovato su Google."
      />
      <SitiFeatures />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Domande Comuni
        </h2>
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
