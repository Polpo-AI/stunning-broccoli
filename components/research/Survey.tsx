'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { type Answers, type Audience, type Field, questions, toggle, updateAnswer, validQuestion } from '@/lib/research/questions';

type Screen = 'intro' | 'questions' | 'review' | 'contact' | 'done';
function Choices({ field, values, onChange }: { field: Field; values: string[]; onChange: (values: string[]) => void }) {
  const limitReached = !!field.max && values.length >= field.max;
  return <fieldset className={field.scale ? 'research-field research-scale' : 'research-field'}>
    <legend>{field.label}</legend>
    {field.scale && <p className="research-scale-ends"><span>{field.options[0].label}</span><span>{field.options[4].label}</span></p>}{field.multi && <p className="research-selection" aria-live="polite">{values.length}{field.max ? ` di ${field.max}` : ''} selezioni{field.max ? ' · Puoi deselezionare per cambiare.' : ''}</p>}
    <div className="research-options">{field.options.map(option => {
      const checked = values.includes(option.value);
      const disabled = limitReached && !checked && !field.exclusive?.includes(option.value);
      return <label key={option.value} className={`research-option${checked ? ' is-selected' : ''}${disabled ? ' is-unavailable' : ''}`}>
        <input type={field.multi ? 'checkbox' : 'radio'} name={field.id} value={option.value} aria-label={option.label} checked={checked} disabled={disabled} onChange={() => onChange(toggle(field, values, option.value))} />
        <span>{field.scale && /^[1-5]$/.test(option.value) ? option.value : option.label}</span><span className="research-mark" aria-hidden="true">{checked ? '✓' : '+'}</span>
      </label>;
    })}</div>
  </fieldset>;
}

export default function Survey({ audience }: { audience: Audience }) {
  const [screen, setScreen] = useState<Screen>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const title = useRef<HTMLHeadingElement>(null);
  const isPlayer = audience === 'giocatori';
  const allQuestions = questions(audience, answers);
  const question = allQuestions[step];
  useEffect(() => {
    if (screen !== 'intro') title.current?.focus();
  }, [screen, step]);
  function navigate(next: Screen) { setError(''); setScreen(next); }
  function reset() { setAnswers({}); setDetail(''); setStep(0); navigate('intro'); }
  function finish() { setAnswers({}); setDetail(''); navigate('done'); }
  function next() {
    if (!validQuestion(question, answers)) { setError('Scegli una risposta per ogni gruppo. Puoi usare “Preferisco non rispondere” dove presente.'); return; }
    setError('');
    if (step === 6) navigate('review'); else setStep(step + 1);
  }
  return <section className="research" aria-label={`Ricerca padel: ${audience}`}>
    <div className="research-orbit" aria-hidden="true" />
    <div className="research-shell">
      <div className="research-topline"><span>POLPO AI <span aria-hidden="true">/</span> RICERCA PADEL</span><span className="research-badge">Anteprima · nessun invio</span></div>
      {screen === 'intro' ? <div className="research-intro">
        <div className="research-intro-copy"><p className="research-eyebrow">{isPlayer ? 'IL PUNTO DI VISTA DI CHI GIOCA' : 'IL PUNTO DI VISTA DI CHI GESTISCE'}</p>
          <h1 ref={title} tabIndex={-1}>{isPlayer ? <>La tua prossima partita.<br /><em>Come ci arrivi?</em></> : <>La vita del circolo.<br /><em>Vista da dentro.</em></>}</h1>
          <p className="research-lead">{isPlayer ? 'Raccontaci come organizzi le partite, cosa funziona e cosa cambieresti. Anche se giochi sempre con gli stessi amici.' : 'Raccontaci come gestite prenotazioni, comunicazioni e attività quotidiane. Ci interessa anche ciò che funziona già bene.'}</p>
          <p className="research-meta">7 domande · {isPlayer ? 'circa 3' : 'circa 4'} minuti da verificare · contatto facoltativo separato</p>
          <button className="research-primary" onClick={() => navigate('questions')}>Prova la survey <span aria-hidden="true">↗</span></button>
          <p className="research-fine">Questa è una prova privata. Usa risposte fittizie: rimangono nella memoria di questa pagina, senza invio o salvataggio. Ricaricando o uscendo dalla pagina le perdi.</p>
        </div>
        <div className="research-art" aria-hidden="true"><Image src="/immersive-a-hero.webp" alt="" fill sizes="(max-width: 700px) 100vw, 45vw" priority /><span>OTTO BRACCIA.<br />UN PO’ DI ASCOLTO.</span></div>
      </div> : <div className="research-workspace">
        <aside className="research-aside"><p className="research-eyebrow">{isPlayer ? 'GIOCATORI' : 'CIRCOLI'}</p><p className="research-aside-title">Prima ascoltare.<br /><em>Poi immaginare.</em></p><p>Non ci sono risposte giuste. Anche “nessun problema” ci aiuta a capire.</p><button className="research-text-button" onClick={reset}>Ricomincia e cancella la prova</button></aside>
        <div className="research-panel">
          {screen === 'questions' && <>
            <div className="research-progress-label"><span>Domanda {step + 1} di 7</span><span>{Math.round(step / 7 * 100)}% del percorso</span></div>
            <progress value={step} max={7} aria-label="Domande completate" />
            <h1 ref={title} tabIndex={-1}>{question.title}</h1><p className="research-hint" id="question-hint">{question.hint}</p>
            <form onSubmit={event => { event.preventDefault(); next(); }} aria-describedby="question-hint">
              {question.fields.map(field => <Choices key={field.id} field={field} values={answers[field.id] ?? []} onChange={values => { setError(''); setAnswers(previous => updateAnswer(previous, field.id, values)); }} />)}
              {question.detail && <label className="research-detail">Dettaglio facoltativo <span>(massimo 300 caratteri)</span><textarea maxLength={300} rows={3} value={detail} onChange={event => setDetail(event.target.value)} placeholder="Cosa miglioreresti o manterresti? Senza nomi, recapiti o dati di altre persone." /><small>{detail.length}/300 · Usa solo un esempio fittizio in questa prova.</small></label>}
              {error && <p role="alert" className="research-error">{error}</p>}
              <div className="research-actions"><button type="button" className="research-secondary" onClick={() => { setError(''); step === 0 ? navigate('intro') : setStep(step - 1); }}>Indietro</button><button className="research-primary" type="submit">{step === 6 ? 'Rivedi la prova' : 'Continua'} <span aria-hidden="true">→</span></button></div>
            </form>
          </>}
          {screen === 'review' && <>
            <p className="research-eyebrow">7 DI 7 · RIEPILOGO LOCALE</p><h1 ref={title} tabIndex={-1}>Tutto come volevi?</h1><p className="research-hint">Puoi correggere le scelte. Nessuna risposta è stata inviata.</p>
            <ol className="research-review">{allQuestions.map((item, index) => <li key={item.title}><div><h2>{index + 1}. {item.title}</h2>{item.fields.map(field => <p key={field.id}><strong>{field.label}: </strong>{(answers[field.id] ?? []).map(value => field.options.find(option => option.value === value)?.label).filter(Boolean).join('; ') || 'Da completare'}</p>)}{item.detail && detail && <p>{detail}</p>}</div><button aria-label={`Modifica domanda ${index + 1}`} onClick={() => { setStep(index); navigate('questions'); }}>Modifica</button></li>)}</ol>
            <div className="research-actions"><button className="research-secondary" onClick={() => { setStep(6); navigate('questions'); }}>Indietro</button><button className="research-primary" onClick={() => { const missing = allQuestions.findIndex(item => !validQuestion(item, answers)); if (missing >= 0) { setStep(missing); navigate('questions'); setError('Completa questa domanda dopo la modifica del percorso.'); } else navigate('contact'); }}>Prosegui senza invio →</button></div>
          </>}
          {screen === 'contact' && <>
            <p className="research-eyebrow">FUORI DALLE 7 DOMANDE · FACOLTATIVO</p><h1 ref={title} tabIndex={-1}>Restare in contatto?<br /><em>Sceglierai tu.</em></h1>
            <p className="research-hint">Nella versione attiva potrai terminare senza recapiti oppure lasciare soltanto un’email per i risultati o un approfondimento.</p>
            <fieldset disabled className="research-contact"><legend>Contatto non disponibile nella preview</legend><label>Email facoltativa<input type="email" placeholder="Campo disattivato" autoComplete="off" /></label><label><input type="checkbox" /> Desidero essere ricontattato per questa ricerca e riceverne i risultati.</label><label><input type="checkbox" /> Desidero ricevere via email novità e comunicazioni promozionali di Polpo AI.</label></fieldset>
            <p className="research-fine">Le due scelte saranno separate e non preselezionate. Il ricontatto per ricerca non richiederà il consenso marketing. Qui non raccogliamo email né consensi: l’informativa e il sistema di raccolta devono essere completati prima dell’attivazione.</p>
            <div className="research-actions"><button className="research-secondary" onClick={() => navigate('review')}>Rivedi risposte</button><button className="research-primary" onClick={finish}>Termina la prova</button></div>
          </>}
          {screen === 'done' && <><p className="research-eyebrow">PROVA COMPLETATA</p><h1 ref={title} tabIndex={-1}>Grazie per la prova.<br /><em>Qui ci fermiamo.</em></h1><p className="research-lead">Nessun dato è stato inviato. Le risposte della prova sono state cancellate dalla memoria della pagina.</p><button className="research-primary" onClick={reset}>Prova di nuovo ↗</button></>}
        </div>
      </div>}
      <details className="research-privacy"><summary>Privacy di questa anteprima e limiti della ricerca</summary><p>Le risposte restano nella memoria della pagina e non vengono trasmesse, registrate nei log applicativi o conservate in cookie e storage del browser. Non inserire dati reali o informazioni su altre persone. I campi contatto e consenso sono disabilitati. I servizi di analytics dell’app non vengono montati su queste pagine.</p><p>Il servizio di hosting e la protezione di accesso possono trattare dati tecnici di navigazione: questa prova non promette anonimato assoluto. Prima della raccolta serviranno un’informativa approvata con titolare, finalità, basi giuridiche, conservazione, destinatari e diritti, più un backend verificato. Non usiamo la bozza privacy della mini-consulenza come informativa per la ricerca.</p><p>La ricerca esplora comportamenti e intenzioni dichiarate. Non misura disponibilità a pagare, compatibilità tecnica con gestionali o risultati economici. Nessuna funzione AI è attivata.</p></details>
    </div>
    <noscript><p className="research-fine">La prova interattiva richiede JavaScript. Nessuna risposta può essere inviata da questa pagina.</p></noscript>
  </section>;
}
