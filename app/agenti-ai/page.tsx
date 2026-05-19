import type { Metadata } from 'next';
import { FileText, Mail, Workflow, BarChart3 } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion from '@/components/shared/FAQAccordion';
import AgentiHero from '@/components/pages/AgentiHero';
import AgentiFeatures from '@/components/pages/AgentiFeatures';
import WhoIsItFor from '@/components/shared/WhoIsItFor';

export const metadata: Metadata = {
  title: 'Agenti AI e Automazione Aziendale per PMI',
  description:
    'Agenti AI autonomi che automatizzano data-entry, email, report e workflow ripetitivi. Risparmia 20+ ore a settimana senza assumere personale extra.',
  keywords: [
    'agenti ai',
    'automazione aziendale ai',
    'ai per pmi',
    'automazione data entry',
    'agenti autonomi intelligenza artificiale',
    'rpa italia',
    'automazione email',
    'workflow automation ai',
  ],
  alternates: { canonical: 'https://polpo-ai.com/agenti-ai' },
  openGraph: {
    title: 'Agenti AI e Automazione Aziendale | PolpoAI',
    description:
      'Agenti AI su misura che eliminano data-entry, gestiscono email e automatizzano flussi complessi. Operativi 24/7, zero errori umani.',
    url: 'https://polpo-ai.com/agenti-ai',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Agenti AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenti AI e Automazione | PolpoAI',
    description: 'Automatizza il tuo business con agenti AI su misura. 24/7, zero errori, ROI immediato.',
    images: ['/polpo.png'],
  },
};

const faqItems = [
  { q: 'Cosa fa esattamente un Agente AI?', a: 'Un agente prende decisioni basate su dati e regole predefinite, completando azioni come l\'invio di email, l\'aggiornamento di CRM, e l\'analisi di PDF, in totale autonomia.' },
  { q: 'È sicuro affidare dati a un AI?', a: 'Utilizziamo i più alti standard di sicurezza e crittografia. Non addestriamo modelli pubblici sui tuoi dati proprietari.' },
  { q: 'Qual è il ROI previsto?', a: 'In media i nostri clienti vedono un risparmio di oltre 20 ore a settimana in attività manuali, scalabili senza aumentare l\'organico.' },
];

export default function AgentiAIPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Agenti AI e Automazione Aziendale',
    provider: { '@type': 'Organization', name: 'PolpoAI', url: 'https://polpo-ai.com' },
    serviceType: 'AI Automation',
    description:
      'Sviluppo di agenti AI autonomi per automatizzare processi aziendali ripetitivi: data-entry, gestione email, report, integrazione con CRM e altri tool.',
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
      { '@type': 'ListItem', position: 2, name: 'Agenti AI', item: 'https://polpo-ai.com/agenti-ai' },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Agenti AI' }]} />
      </div>
      <AgentiHero />
      <WhoIsItFor
        variant="agenti"
        title={<>Per chi sono <em>le automazioni</em>?</>}
        subtitle="Per chi passa tempo su attività ripetitive al computer. Definiamo insieme cosa ha più senso automatizzare nel tuo caso — senza forzare la tecnologia dove non serve."
        items={[
          {
            icon: <FileText className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Chi gestisce molte fatture e preventivi',
            desc: 'Generazione automatica, invio, archiviazione — partendo dai dati che già hai nel gestionale o nel foglio Excel.',
            example: 'Studio di consulenza che genera 50+ fatture al mese a clienti ricorrenti.',
          },
          {
            icon: <Mail className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Chi smaltisce tante email',
            desc: 'Smistamento automatico, risposte standard, riassunti giornalieri — più tempo per le email che contano davvero.',
            example: 'E-commerce che riceve 100+ richieste/giorno e vuole rispondere alle FAQ in automatico.',
          },
          {
            icon: <Workflow className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Chi usa più programmi che non parlano tra loro',
            desc: 'Trasferimento automatico di dati tra gestionale, CRM, foglio Excel — niente più copia-incolla a mano.',
            example: 'Azienda con ordini su Shopify che devono finire nel gestionale fatture e nel magazzino.',
          },
          {
            icon: <BarChart3 className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.6} />,
            title: 'Chi prepara report ripetitivi',
            desc: 'Estrazione dati, aggregazione, formattazione — un report che prima richiedeva ore, pronto in pochi minuti.',
            example: 'Manager che ogni lunedì raccoglie i dati di vendita da 3 fonti diverse per il report settimanale.',
          },
        ]}
        footnote="Il servizio è in continua evoluzione: capiamo insieme se la tua attività ripetitiva è automatizzabile in modo sensato."
      />
      <AgentiFeatures />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Domande Frequenti
        </h2>
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
