import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, AudioLines, CalendarDays, Workflow } from 'lucide-react';

const solutions = [
  { n: '01', title: 'Assistenti AI', line: 'La risposta giusta. Anche quando hai altro da fare.', text: 'Progettiamo assistenti che aiutano i clienti a trovare informazioni, raccolgono richieste e passano la conversazione a una persona quando serve.', icon: AudioLines, href: '/agenti-ai', tag: 'CONVERSAZIONI → OPPORTUNITÀ' },
  { n: '02', title: 'Prenotazioni', line: 'Meno incastri. Più spazio per il tuo lavoro.', text: 'Disegniamo percorsi per raccogliere una richiesta, verificare le disponibilità e gestire conferme e promemoria, in base agli strumenti della tua attività.', icon: CalendarDays, href: '/chatbot-whatsapp-prenotazioni', tag: 'RICHIESTE → APPUNTAMENTI' },
  { n: '03', title: 'Processi connessi', line: 'Basta fare da ponte tra un software e l’altro.', text: 'Individuiamo i passaggi ripetitivi tra email, documenti e gestionali. Poi progettiamo automazioni con regole chiare e controllo umano.', icon: Workflow, href: '/agenti-ai', tag: 'PASSAGGI MANUALI → FLUSSI' },
];
const sectors = [
  { n: '01', name: 'Sport', type: 'PADEL / TENNIS / CALCETTO', text: 'Richieste per i campi, disponibilità e organizzazione delle attività: partiamo dal lavoro della segreteria.' },
  { n: '02', name: 'Beauty', type: 'SALONI / CENTRI ESTETICI', text: 'Informazioni sui trattamenti, richieste di appuntamento e promemoria: un percorso pensato intorno alla tua agenda.' },
  { n: '03', name: 'Ristorazione', type: 'RISTORANTI / LOCALI', text: 'Domande ricorrenti, richieste per i tavoli e comunicazioni con gli ospiti, senza perdere il filo durante il servizio.' },
  { n: '04', name: 'Studi professionali', type: 'PERSONE / DOCUMENTI / SCADENZE', text: 'Raccolta delle richieste, organizzazione dei documenti e passaggi amministrativi, con attenzione ai dati e alle responsabilità.' },
  { n: '05', name: 'Hospitality', type: 'HOTEL / B&B / STRUTTURE RICETTIVE', text: 'Informazioni prima dell’arrivo e richieste degli ospiti: valutiamo cosa automatizzare e cosa affidare alla tua accoglienza.' },
];

export default function Home() {
  return (
    <div className="immersive">
      <section className="p-hero" aria-labelledby="hero-title">
        <div className="hero-coordinate" aria-hidden="true">POLPO AI — CONNESSIONI INTELLIGENTI / VOL. 01</div>
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-intro"><span className="status-dot" /> AUTOMAZIONI AI PER LE PMI</div>
        <h1 id="hero-title">
          <span className="hero-opening">La tua attività ha</span>
          <span className="hero-thousand">mille cose</span>
          <span className="hero-do">da fare.</span>
          <span className="hero-together">Noi le facciamo<br />lavorare <em>insieme.</em></span>
        </h1>
        <div className="hero-mascot">
          <Image src="/polpo-3d.webp" alt="Il polpo di Polpo AI, una mascotte 3D navy e cyan con tentacoli che si aprono per connettere le attività." width={1536} height={1024} sizes="(max-width: 700px) 100vw, 60vw" priority />
        </div>
        <span className="orbit-label label-one" aria-hidden="true"><i /> UNA RICHIESTA</span>
        <span className="orbit-label label-two" aria-hidden="true"><i /> UN APPUNTAMENTO</span>
        <span className="orbit-label label-three" aria-hidden="true"><i /> UN PROCESSO</span>
        <div className="hero-caption"><span aria-hidden="true">↳</span> Tante cose da gestire.<br />Un modo nuovo di collegarle.</div>
        <div className="hero-bottom">
          <p>Assistenti intelligenti e automazioni su misura.<br />Per far dialogare clienti, persone e strumenti.</p>
          <a className="p-cta" href="#contatti">Richiedi la tua analisi gratuita <ArrowUpRight size={21} aria-hidden="true" /></a>
        </div>
        <a className="hero-explore" href="#approccio"><ArrowDown size={15} aria-hidden="true" /> SCOPRI IL FILO</a>
      </section>

      <div className="connection-strip" aria-hidden="true"><span>MENO PASSAGGI A VUOTO</span><i>✳</i><span>PIÙ COSE CHE SI PARLANO</span><i>✳</i><span>IL TUO LAVORO, CONNESSO</span><i>✳</i></div>

      <section id="approccio" className="p-section manifesto" aria-labelledby="approccio-title">
        <div className="section-label"><span>01 / IL PUNTO DI PARTENZA</span><span>DAL CAOS AL SISTEMA</span></div>
        <div className="manifesto-grid">
          <h2 id="approccio-title">Il problema non è<br />fare <em>tante cose.</em><br /><span>È farle tutte<br />a mano.</span></h2>
          <div className="manifesto-aside">
            <p className="large-copy">Una chat. Un’agenda.<br />Un foglio da aggiornare.<br />E tu, sempre nel mezzo.</p>
            <p>Polpo AI è specialista di automazioni AI per le piccole e medie imprese. Studiamo come lavori e colleghiamo i passaggi che oggi richiedono la tua attenzione, uno alla volta.</p>
            <a href="#soluzioni" className="text-link">Troviamo il tuo filo <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="flow-study">
          <figcaption><span>ANATOMIA DI UN FLUSSO</span><span>SCHEMA ILLUSTRATIVO, NON UN’INTEGRAZIONE ATTIVA</span></figcaption>
          <ol className="flow-nodes">
            <li><small>INPUT</small><strong>Arriva una richiesta</strong><span>Il cliente ti scrive</span></li>
            <li className="flow-core"><small>POLPO AI</small><strong>Le informazioni si collegano</strong><span>Regole e strumenti da definire insieme</span></li>
            <li><small>OUTPUT</small><strong>Il lavoro prosegue</strong><span>Il team mantiene il controllo</span></li>
          </ol>
        </figure>
      </section>

      <section id="soluzioni" className="p-section solutions" aria-labelledby="soluzioni-title">
        <div className="section-label"><span>02 / COSA POSSIAMO AUTOMATIZZARE</span><span>SU MISURA. SUL SERIO.</span></div>
        <div className="solutions-heading"><h2 id="soluzioni-title">Un’intelligenza.<br /><em>Più tentacoli.</em></h2><p>Non partiamo da un software da venderti.<br />Partiamo da quello che ti rallenta.</p></div>
        <div className="solution-list">{solutions.map(({ n, title, line, text, icon: Icon, href, tag }) => (
          <article className="solution-row" key={n}>
            <span className="solution-number">{n}</span>
            <div className="solution-name"><Icon size={32} strokeWidth={1.2} aria-hidden="true" /><h3>{title}</h3><small>{tag}</small></div>
            <div className="solution-detail"><h4>{line}</h4><p>{text}</p><Link href={href} className="text-link">Esplora la soluzione <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          </article>
        ))}</div>
        <p className="solution-note">Ogni collegamento parte da una verifica: strumenti disponibili, accessi, fattibilità e protezione dei dati.</p>
      </section>

      <section id="settori" className="p-section sectors" aria-labelledby="settori-title">
        <div className="section-label"><span>03 / DENTRO IL TUO MONDO</span><span>LA TECNOLOGIA SI ADATTA A TE</span></div>
        <div className="sectors-grid">
          <div className="sectors-intro"><span className="asterisk" aria-hidden="true">✳</span><h2 id="settori-title">Il tuo settore.<br />Le tue regole.<br /><em>Il nostro metodo.</em></h2><p>Ogni attività ha il suo ritmo. Questi sono alcuni contesti da cui possiamo partire.</p></div>
          <div className="sector-list">{sectors.map(({n, name, type, text}) => (
            <details key={n} className="sector-item"><summary><span className="sector-number">{n}</span><span>{name}<small>{type}</small></span><span className="sector-toggle" aria-hidden="true">+</span></summary><p>{text}</p></details>
          ))}</div>
        </div>
      </section>

      <section id="metodo" className="p-section method" aria-labelledby="metodo-title">
        <div className="section-label"><span>04 / COME LAVORIAMO</span><span>PRIMA CAPIRE. POI CONNETTERE.</span></div>
        <h2 id="metodo-title">Niente bacchette magiche.<br /><em>Un metodo, sì.</em></h2>
        <ol className="method-steps">
          <li><span>01 — ASCOLTIAMO</span><h3>Ci racconti il lavoro.</h3><p>Mappiamo richieste, strumenti e passaggi ripetitivi. Ci interessa capire dove si interrompe il flusso.</p></li>
          <li><span>02 — PROGETTIAMO</span><h3>Troviamo le connessioni.</h3><p>Definiamo un primo flusso, le integrazioni da verificare e i punti in cui serve una persona.</p></li>
          <li><span>03 — VERIFICHIAMO</span><h3>Lo mettiamo alla prova.</h3><p>Testiamo casi reali con il tuo team prima dell’attivazione. Poi osserviamo cosa migliorare.</p></li>
        </ol>
      </section>

      <section id="contatti" className="p-section contact" aria-labelledby="contatti-title">
        <div className="section-label"><span>05 / IL PROSSIMO COLLEGAMENTO</span><span>INIZIA CON UNA CONVERSAZIONE</span></div>
        <div className="contact-grid"><div><p className="contact-kicker">COSA TI PORTA VIA TEMPO?</p><h2 id="contatti-title">Partiamo<br />da <em>lì.</em><span aria-hidden="true">↗</span></h2></div><div className="contact-copy"><p>Raccontaci come funziona la tua attività e quale passaggio vorresti semplificare. L’analisi iniziale è gratuita: capiamo insieme se e dove l’automazione può esserti utile.</p><a className="p-cta" href="mailto:info@polpo-ai.com?subject=Analisi%20gratuita%20automazioni%20AI">Richiedi la tua analisi gratuita <ArrowUpRight size={20} aria-hidden="true" /></a><p className="contact-hint">Si apre il tuo programma email.<br />Preferisci copiare l’indirizzo? <a href="mailto:info@polpo-ai.com">info@polpo-ai.com</a></p></div></div>
      </section>
    </div>
  );
}
