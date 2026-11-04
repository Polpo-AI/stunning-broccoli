import Image from 'next/image';
import Link from 'next/link';
const analysis = 'mailto:info@polpo-ai.com?subject=Analisi%20gratuita%20Polpo%20AI&body=Ciao%20Polpo%2C%20vorrei%20capire%20cosa%20possiamo%20automatizzare%20nella%20mia%20attivit%C3%A0.%0A%0AAttivit%C3%A0%3A%0AProcesso%20da%20semplificare%3A%0ARecapito%3A';
export default function Home() {
  return <main id="main-content" tabIndex={-1} className="manifesto">
    <section className="manifesto-poster" aria-labelledby="manifesto-title">
      <div className="manifesto-art" aria-hidden="true"><Image src="/manifesto-scene.webp" alt="" fill priority sizes="100vw" quality={85} /></div>
      <div className="manifesto-shade" aria-hidden="true" />
      <header className="manifesto-header">
        <Link href="/" className="manifesto-brand" aria-label="Polpo AI, homepage">polpo<span>AI</span><span className="brand-orbit" aria-hidden="true">✳</span></Link>
        <p className="manifesto-position">AUTOMAZIONI AI<br />PER LE PMI</p>
        <a className="manifesto-contact" href="#contatti">Parliamone <span aria-hidden="true">↗</span></a>
      </header>
      <div className="manifesto-intro"><span className="manifesto-index"><span className="manifesto-index-desktop">MENO FRAMMENTI. PIÙ CONNESSIONI.</span><span className="manifesto-index-mobile">AUTOMAZIONI AI PER LE PMI</span></span>
        <h1 id="manifesto-title"><span className="manifesto-setup">La tua attività ha</span>{' '}<span className="manifesto-huge">mille cose{' '}<br />da fare.</span>{' '}<span className="manifesto-response">Noi le facciamo{' '}<br /><em>lavorare insieme.</em></span></h1>
      </div>
      <div className="manifesto-action" id="contatti"><p>Richieste. Prenotazioni. Processi.<br />Un unico modo di farli dialogare.</p><a href={analysis} className="manifesto-cta"><span>Richiedi la tua<br className="cta-break" /> analisi gratuita</span><span className="manifesto-arrow" aria-hidden="true">↗</span></a><span className="manifesto-mail-hint">Si apre la tua app email.</span></div>
      <div className="manifesto-caption" aria-hidden="true"><span>INTELLIGENZA CHE CONNETTE.</span><span>POLPO AI / ITALIA</span></div>
    </section>
    <section className="manifesto-notes" id="soluzioni" aria-label="Soluzioni e approfondimenti">
      <p>Partiamo dal tuo lavoro.<br /><span>Colleghiamo ciò che oggi gestisci a mano.</span></p>
      <details><summary>Dentro Polpo <span aria-hidden="true">+</span></summary><div className="manifesto-detail"><p>Progettiamo automazioni AI per le piccole e medie imprese: assistenti WhatsApp, gestione delle richieste e dei processi. L’analisi gratuita serve a capire cosa ha senso automatizzare e quali integrazioni verificare, prima di costruire.</p><nav aria-label="Soluzioni Polpo AI"><Link href="/chatbot-whatsapp-prenotazioni">Assistenti WhatsApp ↗</Link><Link href="/agenti-ai">Automazione dei processi ↗</Link></nav><nav aria-label="Applicazioni per settore"><Link href="/chatbot-whatsapp-prenotazioni-padel">Sport e circoli</Link><Link href="/chatbot-whatsapp-prenotazioni-centri-estetici">Beauty</Link><Link href="/chatbot-whatsapp-prenotazioni-ristoranti">Ristorazione</Link><Link href="/chatbot-whatsapp-prenotazioni-studi-medici">Studi medici</Link><Link href="/chatbot-whatsapp-prenotazioni-hotel-bb">Hospitality</Link></nav></div></details>
      <footer><span>© Polpo AI</span><a href="mailto:info@polpo-ai.com">info@polpo-ai.com ↗</a></footer>
    </section>
  </main>;
}
