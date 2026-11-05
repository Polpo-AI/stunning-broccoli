import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PolpoIcon from '@/components/landing/PolpoIcon';
import PolpoInAction from '@/components/landing/PolpoInAction';
import './homepage-story.css';

const description = 'Assistenti AI, automazioni operative e integrazioni intelligenti per liberarti dal lavoro ripetitivo e far funzionare meglio la tua attività.';
export const metadata: Metadata = {
  title: { absolute: 'Polpo AI — Automazioni AI su misura per le imprese' }, description,
  openGraph: { title: 'Otto braccia. Una sola missione: liberare le tue.', description, url: 'https://polpo-ai.com' },
  twitter: { card: 'summary_large_image', title: 'Otto braccia. Una sola missione: liberare le tue.', description },
};
const solutions = [
  { name: 'Assistenti AI', title: 'I clienti scrivono. Tu non devi rincorrerli.', copy: 'Realizziamo assistenti AI per WhatsApp e altri canali, capaci di rispondere alle domande, raccogliere richieste e avviare operazioni nei sistemi collegati.', example: 'Un cliente chiede un appuntamento. L’assistente raccoglie le informazioni necessarie e avvia il processo di prenotazione.', href: '/chatbot-whatsapp-prenotazioni', link: 'Esplora gli assistenti AI' },
  { name: 'Automazioni operative', title: 'Le attività si ripetono. Tu no.', copy: 'Dalla gestione delle email all’elaborazione dei documenti, automatizziamo operazioni ricorrenti con regole definite e controlli umani quando necessari.', example: 'Arriva un documento via email. Il sistema estrae le informazioni utili e prepara i dati da verificare prima dell’inserimento nel gestionale.', href: '/agenti-ai', link: 'Esplora le automazioni AI' },
  { name: 'Integrazioni intelligenti', title: 'I tuoi strumenti non si parlano? Ci pensiamo noi.', copy: 'Colleghiamo CRM, calendari, email, fogli di calcolo e gestionali compatibili per far circolare le informazioni, ridurre i copia-incolla e semplificare i processi.', example: 'Una richiesta ricevuta viene registrata nel CRM e genera un’attività di ricontatto.', href: '/soluzioni', link: 'Esplora le soluzioni' },
];
const method = [
  ['Ci racconti cosa ti rallenta.', 'Analizziamo le attività ripetitive, i passaggi manuali e gli strumenti coinvolti.'],
  ['Troviamo dove intervenire.', 'Valutiamo fattibilità, integrazioni e opportunità di automazione, definendo una soluzione adatta alla tua attività.'],
  ['Mettiamo Polpo al lavoro.', 'Realizziamo e integriamo la soluzione concordata, rispettando le regole operative e i punti di controllo necessari.'],
  ['Verifichiamo che funzioni.', 'Testiamo il flusso insieme e definiamo eventuali miglioramenti, manutenzione e supporto.'],
];
export default function Home() {
  return <div className="universe homepage-story">
    <section className="a-hero" aria-labelledby="hero-title">
      <div className="a-hero-art" aria-hidden="true"><Image src="/immersive-a-hero.webp" alt="" fill priority sizes="100vw" quality={85} /></div>
      <div className="a-hero-shade" aria-hidden="true" />
      <div className="hero-wake" aria-hidden="true" />
      <div className="a-hero-copy">
        <p className="a-eyebrow"><span />AUTOMAZIONI AI SU MISURA PER LE IMPRESE</p>
        <h1 id="hero-title">Otto braccia. Una sola missione: <em>liberare le tue.</em></h1>
        <p className="a-lead">{description}</p>
        <Link className="a-button" href="/contatti">Richiedi la tua analisi gratuita <PolpoIcon name="outward" /></Link>
        <a className="a-text-link" href="#soluzioni">Scopri cosa possiamo automatizzare <PolpoIcon name="down" /></a>
      </div>
      <div className="a-hero-caption"><span>INTELLIGENZA CHE CONNETTE.</span><span>PERSONE AL CENTRO.</span></div>
    </section>
    <section id="soluzioni" className="a-solutions" aria-labelledby="solutions-title">
      <div className="a-section-heading"><p className="a-eyebrow">COSA PUÒ FARE POLPO PER TE?</p><h2 id="solutions-title">Se puoi immaginarlo, <em>possiamo automatizzarlo.</em></h2><p>Ogni attività ha i suoi processi, strumenti ed esigenze. Partiamo dal tuo modo di lavorare per individuare le opportunità di automazione e progettare soluzioni compatibili con la tua organizzazione.</p></div>
      <div className="a-workflow-art"><Image src="/immersive-a-workflow.webp" alt="Un tentacolo collega un telefono, un calendario e ingranaggi: una rappresentazione dei flussi di lavoro connessi." width={1672} height={941} sizes="100vw" quality={80} /><div className="workflow-current" aria-hidden="true" /></div>
      <div className="a-solution-story">{solutions.map((solution, index) => <article key={solution.name}><h3 className="solution-category"><span aria-hidden="true">0{index + 1} / </span>{solution.name}</h3><p className="solution-promise">{solution.title}</p><p>{solution.copy}</p><details className="solution-example"><summary>Un esempio illustrativo <PolpoIcon name="down" /></summary><p>{solution.example}</p></details><Link href={solution.href}>{solution.link} <PolpoIcon name="outward" /></Link></article>)}</div>
      <p className="a-art-note">La scena illustra possibili flussi: ogni integrazione viene valutata nel tuo progetto.</p>
    </section>
    <PolpoInAction />
    <div className="a-deep-world"><div className="a-deep-art" aria-hidden="true"><Image src="/immersive-a-depth.webp" alt="" fill sizes="100vw" quality={80} /></div>
      <section id="metodo" className="a-method" aria-labelledby="method-title"><p className="a-eyebrow">COME LAVORIAMO</p><h2 id="method-title">Non cambiare il tuo lavoro. <em>Cambia quello che lo rallenta.</em></h2><p className="method-intro">Ogni attività ha il suo modo di funzionare. Partiamo dai tuoi processi, individuiamo cosa può essere migliorato e realizziamo automazioni intelligenti che si integrano, dove possibile, con gli strumenti che già utilizzi.</p><ol className="method-journey">{method.map(([title, copy], index) => <li key={title}><span className="method-number" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></section>
      <section id="contatti" className="a-contact" aria-labelledby="contact-title"><div className="a-orbit" aria-hidden="true" /><p className="a-eyebrow">IL PRIMO PASSO È GRATUITO</p><h2 id="contact-title">Quel lavoro che odi fare? <em>Potrebbe piacere a Polpo.</em></h2><p>Dicci cosa ti fa perdere tempo. Con la nostra analisi gratuita esploriamo insieme cosa potresti automatizzare nella tua attività.</p><Link className="a-button" href="/contatti">Richiedi la tua analisi gratuita <PolpoIcon name="outward" /></Link></section>
    </div>
  </div>;
}
