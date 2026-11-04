import Image from 'next/image';
import Link from 'next/link';

const contact = 'mailto:info@polpo-ai.com?subject=Analisi%20gratuita%20Polpo%20AI';
const sectors = [
  ['Sport e circoli', '/chatbot-whatsapp-prenotazioni-padel', 'Richieste dei giocatori, campi, appuntamenti.'],
  ['Beauty', '/chatbot-whatsapp-prenotazioni-centri-estetici', 'Conversazioni e agenda, senza perdere il filo.'],
  ['Ristorazione', '/chatbot-whatsapp-prenotazioni-ristoranti', 'Informazioni e prenotazioni, anche durante il servizio.'],
  ['Studi professionali', '/agenti-ai', 'Documenti, email e passaggi ripetitivi.'],
  ['Hospitality', '/chatbot-whatsapp-prenotazioni-hotel-bb', 'Domande degli ospiti e richieste di soggiorno.'],
];

export default function Home() {
  return (
    <div className="universe">
      <section className="a-hero" aria-labelledby="hero-title">
        <div className="a-hero-art" aria-hidden="true"><Image src="/immersive-a-hero.webp" alt="" fill priority sizes="100vw" quality={85} /></div>
        <div className="a-hero-shade" aria-hidden="true" />
        <div className="a-hero-copy">
          <p className="a-eyebrow"><span /> AUTOMAZIONI AI PER LE PMI</p>
          <h1 id="hero-title">La tua attività ha <strong>mille cose</strong> da fare.{' '}<span className="a-answer">Noi le facciamo{' '}<br /><em>lavorare insieme.</em></span></h1>
          <p className="a-lead">Messaggi, appuntamenti, processi.{' '}<br />Un unico modo di farli dialogare.{' '}<br />Progettato intorno al tuo lavoro.</p>
          <a className="a-button" href={contact}>Richiedi la tua analisi gratuita <span aria-hidden="true">↗</span></a>
          <a className="a-text-link" href="#soluzioni">Entra nell’universo Polpo <span aria-hidden="true">↓</span></a>
        </div>
        <div className="a-hero-caption"><span>INTELLIGENZA CHE CONNETTE.</span><span>PERSONE AL CENTRO.</span></div>
      </section>

      <section id="soluzioni" className="a-solutions" aria-labelledby="solutions-title">
        <div className="a-section-heading"><p className="a-eyebrow">IL LAVORO, CONNESSO</p><h2 id="solutions-title">Ogni richiesta.{' '}<br /><em>Una nuova possibilità.</em></h2><p>Polpo AI progetta assistenti e automazioni che collegano le conversazioni alle azioni. Partiamo dagli strumenti che usi e verifichiamo insieme cosa può funzionare.</p></div>
        <div className="a-workflow-art"><Image src="/immersive-a-workflow.webp" alt="Un tentacolo collega un telefono, un calendario e ingranaggi: una rappresentazione dei flussi di lavoro connessi." width={1672} height={941} sizes="100vw" quality={80} /></div>
        <div className="a-solution-story">
          <article><span className="a-index">01 / CONVERSAZIONI</span><h3>Una risposta.{' '}<br /><em>Il prossimo passo.</em></h3><p>Assistenti AI per raccogliere richieste, dare informazioni e accompagnare le persone verso la risposta giusta.</p><Link href="/chatbot-whatsapp-prenotazioni">Esplora gli assistenti WhatsApp <span aria-hidden="true">↗</span></Link></article>
          <article><span className="a-index">02 / APPUNTAMENTI</span><h3>Dalla chat{' '}<br /><em>alla tua agenda.</em></h3><p>Progettiamo il percorso dalla richiesta alla prenotazione, verificando disponibilità, regole e strumenti da collegare.</p><Link href="/chatbot-whatsapp-prenotazioni-padel">Un’applicazione per i circoli <span aria-hidden="true">↗</span></Link></article>
          <article><span className="a-index">03 / PROCESSI</span><h3>Meno passaggi.{' '}<br /><em>Più continuità.</em></h3><p>Email, documenti e dati: colleghiamo le attività ripetitive con regole chiare e punti di controllo umani.</p><Link href="/agenti-ai">Esplora le automazioni AI <span aria-hidden="true">↗</span></Link></article>
        </div>
        <p className="a-art-note">La scena illustra possibili flussi: ogni integrazione viene valutata nel tuo progetto.</p>
      </section>

      <div className="a-deep-world"><div className="a-deep-art" aria-hidden="true"><Image src="/immersive-a-depth.webp" alt="" fill sizes="100vw" quality={80} /></div>
      <section id="settori" className="a-sectors" aria-labelledby="sectors-title">
        <div className="a-sector-intro"><p className="a-eyebrow">IL TUO MONDO, PRIMA DI TUTTO</p><h2 id="sectors-title">La tecnologia{' '}<br />si adatta.{' '}<br /><em>A te.</em></h2><p>Ogni attività ha il suo ritmo. Cerchiamo il punto in cui l’AI può togliere attrito al lavoro, senza aggiungere complicazioni.</p></div>
        <div className="a-sector-list">{sectors.map(([name, href, description]) => <Link href={href} key={name}><span>{name}<small>{description}</small></span><span aria-hidden="true">↗</span></Link>)}</div>
      </section>

      <section id="metodo" className="a-method" aria-labelledby="method-title"><p className="a-eyebrow">DAL TUO LAVORO. AL TUO SISTEMA.</p><h2 id="method-title">Prima ascoltiamo.{' '}<br /><em>Poi connettiamo.</em></h2><div className="a-method-path"><p><b>Ci racconti il tuo lavoro.</b> Individuiamo richieste, strumenti e passaggi che oggi richiedono attenzione.</p><span aria-hidden="true">↝</span><p><b>Costruiamo una prima soluzione.</b> Definiamo cosa automatizzare, cosa verificare e quando coinvolgere una persona.</p><span aria-hidden="true">↝</span><p><b>La mettiamo alla prova.</b> Valutiamo il flusso insieme prima di estenderlo ad altre attività.</p></div></section>

      <section id="contatti" className="a-contact" aria-labelledby="contact-title"><div className="a-orbit" aria-hidden="true" /><p className="a-eyebrow">COMINCIAMO DA UNA CONVERSAZIONE</p><h2 id="contact-title">Mille cose da fare.{' '}<br /><em>Un punto da cui partire.</em></h2><p>Raccontaci la tua attività. Individuiamo insieme{' '}<br />dove un’automazione AI può esserti utile.</p><a className="a-button" href={contact}>Richiedi la tua analisi gratuita <span aria-hidden="true">↗</span></a><small>Si apre la tua email, indirizzata a info@polpo-ai.com.</small></section>
      </div>
    </div>
  );
}
