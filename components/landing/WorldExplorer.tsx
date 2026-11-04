'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import PolpoIcon from './PolpoIcon';

const worlds = [
  { id: 'sport', name: 'Sport e circoli', icon: 'sport', color: '#56efe2', light: '86,239,226', title: 'Il ritmo del tuo circolo.', copy: 'Richieste dei giocatori, campi, appuntamenti. Colleghiamo le conversazioni all’organizzazione del circolo, a partire dalle sue regole.', details: ['Richieste giocatori', 'Campi', 'Appuntamenti'], href: '/chatbot-whatsapp-prenotazioni-padel', link: 'Esplora le soluzioni per i circoli', note: 'DAL GIOCATORE. AL CAMPO.' },
  { id: 'beauty', name: 'Beauty', icon: 'beauty', color: '#ff99db', light: '255,153,219', title: 'Più spazio per chi si affida a te.', copy: 'Agenda, appuntamenti, richieste clienti. Progettiamo un percorso che tenga insieme conversazioni e disponibilità, senza interrompere il tuo lavoro.', details: ['Agenda', 'Appuntamenti', 'Richieste clienti'], href: '/chatbot-whatsapp-prenotazioni-centri-estetici', link: 'Esplora le soluzioni per il beauty', note: 'IL TEMPO. DALLA TUA PARTE.' },
  { id: 'restaurant', name: 'Ristorazione', icon: 'restaurant', color: '#ffc48c', light: '255,196,140', title: 'Il servizio continua. Anche in chat.', copy: 'Prenotazioni, richieste, servizio. Diamo continuità alle conversazioni con i tuoi ospiti, rispettando i tempi e le esigenze del locale.', details: ['Prenotazioni', 'Richieste', 'Servizio'], href: '/chatbot-whatsapp-prenotazioni-ristoranti', link: 'Esplora le soluzioni per la ristorazione', note: 'DALLA RICHIESTA. AL TAVOLO.' },
  { id: 'studio', name: 'Studi professionali', icon: 'studio', color: '#baabff', light: '186,171,255', title: 'Il filo tra un passaggio e l’altro.', copy: 'Documenti, email, passaggi ripetitivi. Valutiamo cosa collegare e quali controlli mantenere, per dare ordine al lavoro quotidiano dello studio.', details: ['Documenti', 'Email', 'Passaggi ripetitivi'], href: '/agenti-ai', link: 'Esplora le automazioni per lo studio', note: 'MENO FRAMMENTI. PIÙ CONTINUITÀ.' },
  { id: 'hospitality', name: 'Hospitality', icon: 'hospitality', color: '#88d4ff', light: '136,212,255', title: 'L’accoglienza comincia prima dell’arrivo.', copy: 'Ospiti, richieste, soggiorno. Colleghiamo informazioni e conversazioni, per accompagnare le persone prima e durante la loro esperienza.', details: ['Ospiti', 'Richieste', 'Soggiorno'], href: '/chatbot-whatsapp-prenotazioni-hotel-bb', link: 'Esplora le soluzioni per l’hospitality', note: 'DALLA PRIMA DOMANDA. AL SOGGIORNO.' },
] as const;

export default function WorldExplorer() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const start = useRef<{ x: number; y: number } | null>(null);
  const world = worlds[active];

  function select(index: number, focus = false) {
    const next = (index + worlds.length) % worlds.length;
    setActive(next);
    if (focus) buttons.current[next]?.focus({ preventScroll: true });
    const button = buttons.current[next];
    const rail = button?.parentElement;
    if (button && rail) {
      if (button.offsetLeft < rail.scrollLeft) rail.scrollLeft = button.offsetLeft;
      else if (button.offsetLeft + button.offsetWidth > rail.scrollLeft + rail.clientWidth) rail.scrollLeft = button.offsetLeft + button.offsetWidth - rail.clientWidth;
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? worlds.length - 1 : null;
    if (next !== null) { event.preventDefault(); select(next, true); }
  }
  function swipeStart(event: TouchEvent) { const touch = event.touches[0]; start.current = { x: touch.clientX, y: touch.clientY }; }
  function swipeEnd(event: TouchEvent) {
    if (!start.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.current.x, dy = touch.clientY - start.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
    start.current = null;
  }

  return <section id="settori" className="world-explorer" aria-labelledby="worlds-title" style={{ '--world-color': world.color, '--world-light': world.light } as CSSProperties}>
    <div className="world-heading"><div><p className="a-eyebrow">ESPLORA I MONDI POLPO</p><h2 id="worlds-title">Il tuo mondo.<br /><em>La nostra connessione.</em></h2></div><p>La stessa intelligenza, un ritmo diverso.<br />Scegli la tua attività e guarda cosa cambia.</p></div>
    <div className="world-tabs" role="tablist" aria-label="Scegli il tuo settore">{worlds.map((item, index) => <button key={item.id} ref={element => { buttons.current[index] = element; }} type="button" id={`world-tab-${item.id}`} role="tab" aria-selected={index === active} aria-controls={`world-panel-${item.id}`} tabIndex={index === active ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}><PolpoIcon name={item.icon} /><span>{item.name}</span><i aria-hidden="true" /></button>)}</div>
    <div className="world-stage" data-world={world.id} onTouchStart={swipeStart} onTouchEnd={swipeEnd} onTouchCancel={() => { start.current = null; }}>
      <div className="world-art" aria-hidden="true"><Image src="/worlds-stage.webp" alt="" fill sizes="(max-width:760px) 150vw, 100vw" quality={85} /></div>
      <div className="world-light" aria-hidden="true" />
      <svg className="world-orbits" viewBox="0 0 1200 700" fill="none" aria-hidden="true"><ellipse cx="580" cy="420" rx="420" ry="145" transform="rotate(-16 580 420)" /><ellipse cx="580" cy="420" rx="355" ry="220" transform="rotate(28 580 420)" /><path className="world-trace" d="M185 405C300 560 650 600 995 350" /></svg>
      <div key={world.id} className="world-props" aria-hidden="true"><Image src={`/worlds-${world.id}.webp`} alt="" width={520} height={520} sizes="(max-width:760px) 180px, 340px" quality={85} /></div>
      <span className="world-scene-note" aria-hidden="true">{world.note}</span>
      <div className="world-panels">{worlds.map((item, index) => <article key={item.id} id={`world-panel-${item.id}`} role="tabpanel" aria-labelledby={`world-tab-${item.id}`} tabIndex={0} hidden={index !== active} className="world-panel"><span className="world-number" aria-hidden="true">0{index + 1} / 05</span><h3>{item.title}</h3><p>{item.copy}</p><ul aria-label={`Flussi per ${item.name}`}>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul><Link href={item.href} className="world-link">{item.link}<PolpoIcon name="outward" /></Link></article>)}</div>
    </div>
    <div className="world-navigation"><p><span aria-hidden="true">{String(active + 1).padStart(2, '0')} / 05</span><span className="world-swipe-hint">Tocca un mondo o scorri di lato.</span><span className="world-desktop-hint">Cinque mondi. Un unico Polpo.</span><span className="sr-only" role="status">Mondo selezionato: {world.name}</span></p><div><button type="button" aria-label="Settore precedente" onClick={() => select(active - 1)}><PolpoIcon name="previous" /></button><button type="button" aria-label="Settore successivo" onClick={() => select(active + 1)}><PolpoIcon name="next" /></button></div></div>
    <p className="world-disclaimer">Ogni mondo illustra possibili flussi. Strumenti e integrazioni si valutano insieme, nella tua analisi.</p>
    <noscript><style>{`.world-tabs,.world-navigation,.world-props{display:none!important}.world-panels{position:relative!important;inset:auto!important;max-width:none!important;padding:35px!important}.world-panel[hidden]{display:block!important;margin-top:35px}.world-stage{height:auto!important;min-height:600px}.world-art{opacity:.2!important}.world-panel{max-width:650px}.world-orbits{display:none}`}</style></noscript>
  </section>;
}
