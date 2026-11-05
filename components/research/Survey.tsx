'use client';

import Image from 'next/image';
import { RESEARCH_PRIVACY_VERSION } from '@/lib/research/privacy';
import { useEffect, useRef, useState } from 'react';
import { type Answers, type Audience, type Field, questions, toggle, updateAnswer, validQuestion, VERSION } from '@/lib/research/questions';

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

export default function Survey({ audience, collectionEnabled = false }: { audience: Audience; collectionEnabled?: boolean }) {
  const [screen, setScreen] = useState<Screen>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [detail, setDetail] = useState('');
  const [ageBand, setAgeBand] = useState('');
  const ageConfirmed = ['14_17', '18_plus'].includes(ageBand);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [receipts, setReceipts] = useState<{purpose: string; code: string}[]>([]);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [responseSaved, setResponseSaved] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [researchContact, setResearchContact] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [submissionKey, setSubmissionKey] = useState('');
  const [contactKey, setContactKey] = useState('');
  const title = useRef<HTMLHeadingElement>(null);
  const isPlayer = audience === 'giocatori';
  const allQuestions = questions(audience, answers);
  const question = allQuestions[step];
  useEffect(() => {
    if (screen !== 'intro') title.current?.focus();
  }, [screen, step]);
  function navigate(next: Screen) { setError(''); setScreen(next); }
  function reset() { setReceipts([]); setAnswers({}); setDetail(''); setAgeBand(''); setConsentAccepted(false); setStep(0); setResponseSaved(false); setContactEmail(''); setResearchContact(false); setContactSaved(false); setSubmissionKey(''); setContactKey(''); navigate('intro'); }
  function finish() { setAnswers({}); setDetail(''); setAgeBand(''); setConsentAccepted(false); setContactEmail(''); setResearchContact(false); setContactKey(''); navigate('done'); }
  function next() {
    if (!validQuestion(question, answers)) { setError('Scegli una risposta per ogni gruppo. Puoi usare “Preferisco non rispondere” dove presente.'); return; }
    setError('');
    if (step === 6) navigate('review'); else setStep(step + 1);
  }
  async function saveResponse() {
    if (!collectionEnabled || !consentAccepted || sending || responseSaved) return;
    setSending(true); setError('');
    const key = submissionKey || crypto.randomUUID();
    setSubmissionKey(key);
    try {
      const payload = { audience, surveyVersion: VERSION, answers, ageConfirmed, ageBand, consentAccepted, privacyVersion: RESEARCH_PRIVACY_VERSION, ...(isPlayer ? {} : { detail }), idempotencyKey: key, website: '' };
      const result = await fetch('/api/research/responses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), cache: 'no-store' });
      const receipt = await result.json().catch(() => null);
      if (!result.ok || receipt?.status !== 'saved') throw new Error(receipt?.message || 'Non possiamo confermare il salvataggio. Riprova.');
      setResponseSaved(true);
      setReceipts(previous => [...previous, {purpose: 'response', code: key}]);
      navigate('contact');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Non possiamo confermare il salvataggio. Le risposte sono ancora disponibili: riprova.');
    } finally { setSending(false); }
  }
  async function saveContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!collectionEnabled || contactSending || contactSaved) return;
    setContactSending(true); setError('');
    const key = contactKey || crypto.randomUUID();
    setContactKey(key);
    try {
      const result = await fetch('/api/research/contacts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contactEmail.trim(), researchContact, marketingOptIn: false, ageConfirmed, ageBand, consentAccepted: researchContact, privacyVersion: RESEARCH_PRIVACY_VERSION, idempotencyKey: key, website: '' }), cache: 'no-store',
      });
      const receipt = await result.json().catch(() => null);
      if (!result.ok || receipt?.status !== 'saved') throw new Error(receipt?.message || 'Non possiamo confermare il salvataggio del recapito. Riprova.');
      setContactSaved(true);
      setReceipts(previous => [...previous, {purpose: 'contact', code: key}]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Non possiamo confermare il salvataggio del recapito. Riprova.');
    } finally { setContactSending(false); }
  }
  return <section className="research" aria-label={`Ricerca padel: ${audience}`}>
    <div className="research-orbit" aria-hidden="true" />
    <div className="research-shell">
      <div className="research-topline"><span>POLPO AI <span aria-hidden="true">/</span> RICERCA PADEL</span><span className="research-badge">{collectionEnabled ? 'Ricerca · risposte salvate separatamente' : 'Anteprima · nessun invio'}</span></div>
      {screen === 'intro' ? <div className="research-intro">
        <div className="research-intro-copy"><p className="research-eyebrow">{isPlayer ? 'IL PUNTO DI VISTA DI CHI GIOCA' : 'IL PUNTO DI VISTA DI CHI GESTISCE'}</p>
          <h1 ref={title} tabIndex={-1}>{isPlayer ? <>La tua prossima partita.<br /><em>Come ci arrivi?</em></> : <>La vita del circolo.<br /><em>Vista da dentro.</em></>}</h1>
          <p className="research-lead">{isPlayer ? 'Raccontaci come organizzi le partite, cosa funziona e cosa cambieresti. Anche se giochi sempre con gli stessi amici.' : 'Raccontaci come gestite prenotazioni, comunicazioni e attività quotidiane. Ci interessa anche ciò che funziona già bene.'}</p>
          <p className="research-meta">7 domande · {isPlayer ? 'circa 3' : 'circa 4'} minuti da verificare · contatto facoltativo separato</p>
          <label className="research-age-check">La tua fascia di età <select aria-label="Fascia di età" value={ageBand} onChange={event => setAgeBand(event.target.value)}><option value="">Scegli</option><option value="under_14">Meno di 14 anni</option><option value="14_17">14–17 anni</option><option value="18_plus">18 anni o più</option></select></label>
          {ageBand === 'under_14' && <p role="alert">Per questa ricerca devi avere almeno 14 anni. Non inviare dati.</p>}
          <p className="research-age-note">La fascia di età è conservata solo nella prova del consenso. Per partecipare devi avere almeno 14 anni.</p>
          <button className="research-primary" disabled={!ageConfirmed} onClick={() => navigate('questions')}>{collectionEnabled ? 'Inizia la ricerca' : 'Prova la survey'} <span aria-hidden="true">↗</span></button>
          <p className="research-fine">{collectionEnabled ? 'La partecipazione non richiede un recapito. Le risposte vengono inviate solo dopo il riepilogo e un tuo invio esplicito.' : 'Questa è una prova privata. Usa risposte fittizie: rimangono nella memoria di questa pagina, senza invio o salvataggio. Ricaricando o uscendo dalla pagina le perdi.'}</p>
          {collectionEnabled && <p className="research-fine"><a href="/ricerca/informativa">Leggi l’informativa prima di iniziare</a>.</p>}
        </div>
        <div className="research-art" aria-hidden="true"><Image src="/immersive-a-hero.webp" alt="" fill sizes="(max-width: 700px) 100vw, 45vw" priority /><span>OTTO BRACCIA.<br />UN PO’ DI ASCOLTO.</span></div>
      </div> : <div className="research-workspace">
        <aside className="research-aside"><p className="research-eyebrow">{isPlayer ? 'GIOCATORI' : 'CIRCOLI'}</p><p className="research-aside-title">Prima ascoltare.<br /><em>Poi immaginare.</em></p><p>Non ci sono risposte giuste. Anche “nessun problema” ci aiuta a capire.</p><button className="research-text-button" onClick={reset}>Ricomincia la compilazione</button></aside>
        <div className="research-panel">
          {screen === 'questions' && <>
            <div className="research-progress-label"><span>Domanda {step + 1} di 7</span><span>{Math.round(step / 7 * 100)}% del percorso</span></div>
            <progress value={step} max={7} aria-label="Domande completate" />
            <h1 ref={title} tabIndex={-1}>{question.title}</h1><p className="research-hint" id="question-hint">{question.hint}</p>
            <form onSubmit={event => { event.preventDefault(); next(); }} aria-describedby="question-hint">
              {question.fields.map(field => <Choices key={field.id} field={field} values={answers[field.id] ?? []} onChange={values => { setError(''); setSubmissionKey(''); setAnswers(previous => updateAnswer(previous, field.id, values)); }} />)}
              {question.detail && <label className="research-detail">Dettaglio facoltativo <span>(massimo 300 caratteri)</span><textarea maxLength={300} rows={3} value={detail} onChange={event => { setDetail(event.target.value); setSubmissionKey(''); }} placeholder="Cosa miglioreresti o manterresti? Senza nomi, recapiti o dati di altre persone." /><small>{detail.length}/300 · Evita nomi e informazioni identificative.</small></label>}
              {error && <p role="alert" className="research-error">{error}</p>}
              <div className="research-actions"><button type="button" className="research-secondary" onClick={() => { setError(''); step === 0 ? navigate('intro') : setStep(step - 1); }}>Indietro</button><button className="research-primary" type="submit">{step === 6 ? 'Rivedi la prova' : 'Continua'} <span aria-hidden="true">→</span></button></div>
            </form>
          </>}
          {screen === 'review' && <>
            <p className="research-eyebrow">7 DI 7 · RIEPILOGO LOCALE</p><h1 ref={title} tabIndex={-1}>Tutto come volevi?</h1><p className="research-hint">Puoi correggere le scelte. Nessuna risposta è stata inviata.</p>
            <ol className="research-review">{allQuestions.map((item, index) => <li key={item.title}><div><h2>{index + 1}. {item.title}</h2>{item.fields.map(field => <p key={field.id}><strong>{field.label}: </strong>{(answers[field.id] ?? []).map(value => field.options.find(option => option.value === value)?.label).filter(Boolean).join('; ') || 'Da completare'}</p>)}{item.detail && detail && <p>{detail}</p>}</div><button aria-label={`Modifica domanda ${index + 1}`} onClick={() => { setStep(index); navigate('questions'); }}>Modifica</button></li>)}</ol>
            {collectionEnabled && <label className="research-age-check"><input type="checkbox" checked={consentAccepted} onChange={event => setConsentAccepted(event.target.checked)} /><span>Ho letto l’<a href="/ricerca/informativa">informativa</a> e acconsento al trattamento delle risposte per questa ricerca. Posso revocare il consenso con il codice ricevuto. Nessun marketing.</span></label>}
            {error && <p role="alert" className="research-error">{error}</p>}
            <div className="research-actions"><button className="research-secondary" onClick={() => { setStep(6); navigate('questions'); }}>Indietro</button><button className="research-primary" disabled={sending || (collectionEnabled && !consentAccepted)} onClick={() => { const missing = allQuestions.findIndex(item => !validQuestion(item, answers)); if (missing >= 0) { setStep(missing); navigate('questions'); setError('Completa questa domanda dopo la modifica del percorso.'); } else if (collectionEnabled) void saveResponse(); else navigate('contact'); }}>{sending ? 'Salvataggio…' : collectionEnabled ? 'Invia le risposte' : 'Prosegui senza invio'} →</button></div>
          </>}
          {screen === 'contact' && <>
            <p className="research-eyebrow">FUORI DALLE 7 DOMANDE · FACOLTATIVO</p><h1 ref={title} tabIndex={-1}>Restare in contatto?<br /><em>Sceglierai tu.</em></h1>
            <p className="research-hint">{collectionEnabled && responseSaved ? 'Le risposte sono state salvate. Se vuoi essere ricontattato per questa ricerca, puoi lasciare un’email facoltativa, archiviata separatamente.' : 'Puoi terminare senza recapiti oppure lasciare un’email per chiedere un ricontatto sulla ricerca.'}</p>
            {collectionEnabled ? <form onSubmit={saveContact}><fieldset className="research-contact"><legend>Contatto facoltativo, separato dalla survey</legend>
              <label>Email facoltativa<input type="email" disabled={contactSaved || contactSending} required={researchContact} maxLength={254} autoComplete="email" value={contactEmail} onChange={event => { setContactEmail(event.target.value); setContactKey(''); }} /></label>
              <label><input type="checkbox" disabled={contactSaved || contactSending} checked={researchContact} onChange={event => { setResearchContact(event.target.checked); setContactKey(''); }} /> Acconsento al trattamento della mia email per essere ricontattato su questa ricerca. Posso revocare il consenso in qualsiasi momento.</label>
              <p className="research-fine">Lasciare l’email è facoltativo e non è necessario per partecipare. La scelta riguarda solo un ricontatto sulla ricerca; non attiva comunicazioni promozionali. Email e risposte restano separate. <a href="/ricerca/informativa">Leggi l’informativa dedicata</a>.</p>
              {error && <p role="alert" className="research-error">{error}</p>}
              {contactSaved && <p role="status">Il recapito è stato salvato separatamente.</p>}
              <div className="research-actions"><button type="button" className="research-secondary" onClick={finish}>{contactSaved ? 'Termina' : 'Termina senza lasciare recapiti'}</button><button className="research-primary" disabled={contactSending || contactSaved || !researchContact}>{contactSending ? 'Salvataggio…' : contactSaved ? 'Salvato' : 'Salva il recapito'}</button></div>
            </fieldset></form> : <>
              <fieldset disabled className="research-contact"><legend>Contatto non disponibile nella preview</legend><label>Email facoltativa<input type="email" placeholder="Campo disattivato" autoComplete="off" /></label><label><input type="checkbox" /> Acconsento al trattamento della mia email per essere ricontattato su questa ricerca. Posso revocare il consenso in qualsiasi momento.</label></fieldset>
              <p className="research-fine">Qui non raccogliamo email né richieste di ricontatto. L’informativa e il sistema di raccolta devono essere completati prima dell’attivazione.</p>
              <div className="research-actions"><button className="research-secondary" onClick={() => navigate('review')}>Rivedi risposte</button><button className="research-primary" onClick={finish}>Termina la prova</button></div>
            </>}
          </>}
          {screen === 'done' && <><p className="research-eyebrow">{responseSaved ? 'RICERCA COMPLETATA' : 'PROVA COMPLETATA'}</p><h1 ref={title} tabIndex={-1}>{responseSaved ? <>Grazie.<br /><em>La tua voce conta.</em></> : <>Grazie per la prova.<br /><em>Qui ci fermiamo.</em></>}</h1><p className="research-lead">{responseSaved ? 'Le risposte sono state salvate. Il recapito è stato gestito separatamente solo se lo hai richiesto.' : 'Nessun dato è stato inviato. Le risposte della prova sono state cancellate dalla memoria della pagina.'}</p><button className="research-primary" onClick={reset}>{responseSaved ? 'Chiudi' : 'Prova di nuovo ↗'}</button></>}
        </div>
      </div>}
      {receipts.length > 0 && <aside className="research-privacy" aria-label="Codici di revoca"><h2>Conserva i tuoi codici di revoca</h2><p>Copiali prima di chiudere o ricominciare: non li salviamo nel browser. Chi li possiede può cancellare i dati corrispondenti.</p>{receipts.map(receipt => <p key={receipt.purpose}>{receipt.purpose === 'response' ? 'Risposte' : 'Recapito'}: <code>{receipt.code}</code></p>)}<a href="/ricerca/revoca">Revoca il consenso e cancella i dati</a></aside>}
      <details className="research-privacy"><summary>Informazioni sulla ricerca e sui dati</summary>{collectionEnabled ? <><p>Le risposte vengono inviate ai server di Polpo AI dopo il tuo invio esplicito. Non includono IP, user agent, email o identificativi pubblicitari nel dataset di ricerca. I recapiti, se forniti, sono acquisiti separatamente e non collegati alle risposte. <a href="/ricerca/informativa">Leggi l’informativa dedicata</a>.</p><p>Hosting, protezione anti-abuso e registri tecnici possono trattare dati tecnici di navigazione. Le risposte sono conservate per il periodo indicato nell’informativa.</p></> : <><p>Le risposte restano nella memoria della pagina e non vengono trasmesse, registrate nei log applicativi o conservate in cookie e storage del browser. Non inserire dati reali o informazioni su altre persone. I campi contatto e consenso sono disabilitati. I servizi di analytics dell’app non vengono montati su queste pagine.</p><p>Il servizio di hosting e la protezione di accesso possono trattare dati tecnici di navigazione: questa prova non promette anonimato assoluto. Prima della raccolta serviranno un’informativa approvata con titolare, finalità, basi giuridiche, conservazione, destinatari e diritti, più un backend verificato. Non usiamo la bozza privacy della mini-consulenza come informativa per la ricerca.</p></>}<p>La ricerca esplora comportamenti e intenzioni dichiarate. Non misura disponibilità a pagare, compatibilità tecnica con gestionali o risultati economici. Nessuna funzione AI è attivata.</p></details>
    </div>
    <noscript><p className="research-fine">La prova interattiva richiede JavaScript. Nessuna risposta può essere inviata da questa pagina.</p></noscript>
  </section>;
}
