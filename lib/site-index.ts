import { detailPages, type DetailPage } from '@/components/inner/content';

export const siteUrl = 'https://polpo-ai.com';

/* Date dell'ultima modifica reale dei contenuti (non del build): Google ignora
   lastmod se cambia a ogni deploy. Aggiornare la data quando cambia il testo
   della pagina. */
const DETAIL_PAGES_UPDATED = '2026-11-19';
export const hubPages = [
  { path: '', title: 'Polpo AI', description: 'Assistenti AI, automazioni operative e integrazioni per le imprese.', updated: '2026-11-05' },
  { path: '/soluzioni', title: 'Soluzioni', description: 'Assistenti WhatsApp e automazione dei processi: i due percorsi Polpo AI.', updated: '2026-11-19' },
  { path: '/settori', title: 'Settori', description: 'Sport e circoli, beauty, ristorazione, studi professionali e hospitality.', updated: '2026-11-19' },
  { path: '/metodo', title: 'Metodo', description: 'Ascolto, verifica, progetto e prova: come nasce un’automazione.', updated: '2026-11-19' },
  { path: '/contatti', title: 'Contatti', description: 'Richiesta di analisi gratuita in cinque passaggi.', updated: '2026-11-06' },
] as const;

const isSolution = (page: DetailPage) => page.eyebrow.startsWith('SOLUZIONI');
export const solutionPages = Object.values(detailPages).filter(isSolution);
export const sectorPages = Object.values(detailPages).filter(page => !isSolution(page));

export function sitemapEntries() {
  return [
    ...hubPages.map(page => ({ path: page.path, updated: page.updated })),
    ...[...solutionPages, ...sectorPages].map(page => ({ path: `/${page.slug}`, updated: DETAIL_PAGES_UPDATED })),
  ];
}

const disclaimer = 'Ogni progetto richiede una verifica di fattibilità, degli accessi e delle integrazioni disponibili. Gli schemi mostrati nel sito sono illustrativi e non rappresentano integrazioni attive o risultati di clienti.';
const link = (page: DetailPage) => `- [${page.title}](${siteUrl}/${page.slug}): ${page.description}`;

/* /llms.txt — indice per i motori di risposta AI (formato llmstxt.org),
   generato dagli stessi contenuti delle pagine: non può divergere dal sito. */
export function llmsIndex() {
  return [
    '# Polpo AI',
    '',
    '> Polpo AI progetta automazioni AI su misura per le piccole e medie imprese italiane: assistenti WhatsApp per richieste e prenotazioni, automazione di documenti ed email, integrazioni tra gli strumenti già in uso.',
    '',
    disclaimer,
    '',
    '## Soluzioni',
    ...solutionPages.map(link),
    '',
    '## Settori',
    ...sectorPages.map(link),
    '',
    '## Azienda',
    ...hubPages.filter(page => page.path).map(page => `- [${page.title}](${siteUrl}${page.path}): ${page.description}`),
    '- Email: info@polpo-ai.com',
    '',
    '## Optional',
    `- [Testo completo delle pagine](${siteUrl}/llms-full.txt): descrizioni, percorsi e domande frequenti di ogni soluzione e settore.`,
    '',
  ].join('\n');
}

/* /llms-full.txt — il testo delle pagine di soluzione e settore, FAQ comprese. */
export function llmsFull() {
  const section = (page: DetailPage) => [
    `## ${page.title}`,
    `${siteUrl}/${page.slug}`,
    '',
    page.description,
    '',
    page.intro,
    '',
    ...page.chapters.map(chapter => `- ${chapter.title} ${chapter.text}`),
    '',
    '### Domande frequenti',
    ...page.faq.flatMap(item => ['', `**${item.q}**`, item.a]),
    '',
  ].join('\n');
  return ['# Polpo AI — testo completo', '', `> ${disclaimer}`, '', ...[...solutionPages, ...sectorPages].map(section), `Contatti: ${siteUrl}/contatti · info@polpo-ai.com`, ''].join('\n');
}
