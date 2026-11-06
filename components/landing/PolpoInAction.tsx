'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import PolpoIcon from './PolpoIcon';
import { scenarios, demoSteps } from './homepage-scenarios';

export default function PolpoInAction() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const world = scenarios[active];
  function select(index: number, focus = false) {
    const next = (index + scenarios.length) % scenarios.length;
    setActive(next); setStep(0);
    const button = buttons.current[next];
    if (focus) button?.focus({ preventScroll: true });
    const rail = button?.parentElement;
    if (button && rail) {
      if (button.offsetLeft < rail.scrollLeft) rail.scrollLeft = button.offsetLeft;
      else if (button.offsetLeft + button.offsetWidth > rail.scrollLeft + rail.clientWidth) rail.scrollLeft = button.offsetLeft + button.offsetWidth - rail.clientWidth;
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? scenarios.length - 1 : null;
    if (next !== null) { event.preventDefault(); select(next, true); }
  }
  function swipeStart(event: TouchEvent) { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }
  function swipeEnd(event: TouchEvent) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x, dy = touch.clientY - touchStart.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  }
  return <section id="settori" className="world-explorer action-explorer" aria-labelledby="action-title" style={{ '--world-color': world.color, '--world-light': world.light } as CSSProperties}>
    <div className="world-heading"><div><p className="a-eyebrow">POLPO IN AZIONE</p><h2 id="action-title">La bacchetta la costruiamo noi. <em>La magia la fai tu.</em></h2></div><p>Dietro ogni automazione c’è un processo progettato per il tuo lavoro. Esplora come Polpo può trasformare richieste, informazioni e attività ripetitive in azioni concrete.</p></div>
    <p className="demo-disclaimer">Simulazioni illustrative, senza connessioni a sistemi reali. La fattibilità viene verificata caso per caso.</p>
    <div className="world-tabs" role="tablist" aria-label="Scegli uno scenario">{scenarios.map((item, index) => <button key={item.id} ref={element => { buttons.current[index] = element; }} type="button" id={`demo-tab-${item.id}`} role="tab" aria-selected={index === active} aria-controls={`demo-panel-${item.id}`} tabIndex={index === active ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}><PolpoIcon name={item.icon} /><span>{item.name}</span><i aria-hidden="true" /></button>)}</div>
    <div className="world-stage demo-stage" data-world={world.id} data-step={step} onTouchStart={swipeStart} onTouchEnd={swipeEnd} onTouchCancel={() => { touchStart.current = null; }}>
      <div className="world-art" aria-hidden="true"><Image src="/worlds-stage.webp" alt="" fill sizes="(max-width:760px) 150vw, 100vw" quality={85} /></div>
      <div className="world-light" aria-hidden="true" />
      <div key={`${world.id}-${step}`} className="spell-scene" aria-hidden="true"><svg className="world-orbits" viewBox="0 0 1200 700" fill="none"><ellipse cx="540" cy="420" rx="390" ry="145" transform="rotate(-16 540 420)" /><path className="spell-path" d="M150 240Q300 500 510 350Q670 200 760 260M510 350Q680 480 760 530" /></svg><span className="spell-ring" /><span className="spell-spark" /></div>
      {world.prop ? <div key={world.id} className="world-props" aria-hidden="true"><Image src={`/worlds-${world.prop}.webp`} alt="" width={520} height={520} sizes="(max-width:760px) 150px, 260px" quality={85} /></div> : null}
      <div className="demo-nodes" aria-hidden="true">{world.nodes.map((node, index) => <span key={node} className={`demo-node demo-node-${index}`} data-lit={step >= (index === 0 ? 0 : index === 1 ? 1 : 2)}><i />{node}</span>)}</div>
      <div className="world-panels">{scenarios.map((item, index) => <article key={item.id} id={`demo-panel-${item.id}`} role="tabpanel" aria-labelledby={`demo-tab-${item.id}`} tabIndex={0} hidden={index !== active} className="world-panel demo-panel"><span className="world-number">SIMULAZIONE / 0{index + 1}</span><h3>{item.name}</h3><div className="demo-narrative" aria-live={index === active ? 'polite' : 'off'} aria-atomic="true"><p className="demo-step-label">0{step + 1} / {demoSteps[step]}</p><p hidden={step !== 0} className="demo-moment">{item.request}</p><p hidden={step !== 1} className="demo-moment">{item.work}</p><div hidden={step !== 2} className="demo-moment"><p>{item.action}</p><p className="demo-result"><b>Risultato</b>{item.result}</p></div></div><Link href={item.href} className="world-link">{item.link}<PolpoIcon name="outward" /></Link></article>)}</div>
    </div>
    <div className="demo-controls" aria-label="Passaggi della simulazione"><ol>{demoSteps.map((label, index) => <li key={label}><button type="button" aria-current={step === index ? 'step' : undefined} onClick={() => setStep(index)} aria-label={`Passaggio ${index + 1}: ${label}`}><span aria-hidden="true">0{index + 1}</span>{label}</button></li>)}</ol><div className="demo-step-arrows"><button type="button" disabled={step === 0} aria-label="Passaggio precedente" onClick={() => setStep(step - 1)}><PolpoIcon name="previous" /></button><button type="button" disabled={step === 2} aria-label="Passaggio successivo" onClick={() => setStep(step + 1)}><PolpoIcon name="next" /></button></div></div>
    <div className="world-navigation"><p><span aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}</span><span>Cinque mondi. Un unico Polpo.</span><span className="sr-only" role="status">Scenario selezionato: {world.name}</span></p><div><button type="button" aria-label="Scenario precedente" onClick={() => select(active - 1)}><PolpoIcon name="previous" /></button><button type="button" aria-label="Scenario successivo" onClick={() => select(active + 1)}><PolpoIcon name="next" /></button></div></div>
    <p className="world-disclaimer">Scegli un mondo o scorri la scena di lato. Controlla i passaggi al tuo ritmo: nessuna riproduzione automatica.</p>
    <noscript><style>{`.action-explorer .world-tabs,.action-explorer .world-navigation,.demo-controls,.action-explorer .world-props,.demo-nodes,.spell-scene{display:none!important}.action-explorer .world-panels{position:relative!important;inset:auto!important;padding:32px 6vw!important}.action-explorer .world-panel[hidden]{display:block!important;margin-top:40px}.action-explorer .demo-moment[hidden]{display:block!important}.action-explorer .demo-step-label{display:none}.action-explorer .world-stage{height:auto!important;min-height:0!important;padding:0!important}.action-explorer .world-art{opacity:.12!important}`}</style></noscript>
  </section>;
}
