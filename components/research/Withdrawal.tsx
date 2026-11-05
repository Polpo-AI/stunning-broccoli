'use client';
import { useState } from 'react';
export default function Withdrawal() {
  const [code, setCode] = useState('');
  const [purpose, setPurpose] = useState('response');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSending(true); setMessage('');
    try {
      const response = await fetch('/api/research/withdraw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ purpose, code: code.trim() }), cache: 'no-store' });
      if (!response.ok) throw new Error('Non possiamo confermare la revoca. Controlla il codice o riprova più tardi.');
      setCode(''); setMessage('Revoca elaborata. Gli eventuali dati associati al codice sono stati cancellati; conserviamo solo la prova minima del consenso e della revoca per un massimo di 24 mesi dall’acquisizione.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Riprova più tardi.'); }
    finally { setSending(false); }
  }
  return <main className="research research-policy"><div className="research-shell"><h1>Revoca il consenso</h1><p>Usa il codice ricevuto dopo l’invio. Risposte e recapito hanno codici diversi e si cancellano separatamente. Il codice non va inserito nell’indirizzo della pagina.</p><form onSubmit={submit} className="research-contact"><label>Dati da cancellare<select value={purpose} onChange={event => setPurpose(event.target.value)}><option value="response">Risposte alla survey</option><option value="contact">Recapito per la ricerca</option></select></label><label>Codice di revoca<input required value={code} maxLength={36} autoComplete="off" onChange={event => setCode(event.target.value)} /></label><button className="research-primary" disabled={sending}>{sending ? 'Elaborazione…' : 'Revoca e cancella'}</button></form><p role="status">{message}</p><p>Per tutelare la riservatezza non indichiamo se un codice aveva dati associati. Se non hai il codice, per il recapito scrivi a <a href="mailto:info@polpo-ai.com">info@polpo-ai.com</a> dall’email fornita. Senza codice potremmo non poter individuare le risposte, che non sono collegate al recapito.</p><a href="/ricerca/informativa">Informativa privacy</a></div></main>;
}
