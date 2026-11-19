import type { Metadata } from 'next';
import Link from 'next/link';
import CookiePreferencesButton from '@/components/analytics/CookiePreferencesButton';

export const metadata: Metadata = {
  title: 'Cookie policy',
  description: 'Quali cookie e strumenti di misurazione usa il sito di Polpo AI, per quali finalità e come cambiare la tua scelta.',
  alternates: { canonical: 'https://polpo-ai.com/cookie' },
};

const tools: { name: string; provider: string; purpose: string; cookies: string; duration: string; consent: string }[] = [
  { name: 'Preferenza cookie', provider: 'Polpo AI', purpose: 'Ricordare la tua scelta su questo banner.', cookies: 'polpo-cookie-consent (memoria locale del browser)', duration: '6 mesi, poi la scelta ti viene richiesta di nuovo', consent: 'No, tecnico' },
  { name: 'Vercel Web Analytics e Speed Insights', provider: 'Vercel Inc.', purpose: 'Conteggio aggregato delle visite e misura delle prestazioni delle pagine.', cookies: 'Nessun cookie', duration: '—', consent: 'No, nessun cookie né identificativo persistente' },
  { name: 'Google Analytics 4', provider: 'Google Ireland Ltd.', purpose: 'Statistiche sull’uso del sito: pagine viste, provenienza, clic sui pulsanti, richieste di analisi inviate, prestazioni. Google Signals e personalizzazione degli annunci sono disattivati e la condivisione dei dati con Google è spenta.', cookies: '_ga, _ga_<ID>', duration: 'fino a 14 mesi', consent: 'Sì' },
  { name: 'Microsoft Clarity', provider: 'Microsoft Ireland Operations Ltd.', purpose: 'Mappe di calore e registrazioni anonime della navigazione per capire dove il sito è poco chiaro. I campi dei moduli sono mascherati.', cookies: '_clck, _clsk', duration: 'fino a 1 anno (_clck), 1 giorno (_clsk)', consent: 'Sì' },
];

export default function CookiePolicyPage() {
  return <div className="privacy-draft">
    <Link href="/">Torna alla home</Link>
    <p className="a-eyebrow">POLPO AI · COOKIE</p>
    <h1>Cookie policy.<br /><em>Solo quello che serve.</em></h1>
    <section>
      <h2>In breve</h2>
      <p>Il sito usa solo cookie tecnici finché non scegli diversamente. Gli strumenti di statistica di terze parti (Google Analytics e Microsoft Clarity) partono solo se premi &ldquo;Accetta&rdquo; nel banner. Con &ldquo;Rifiuta&rdquo; o chiudendo il banner non vengono caricati. Non usiamo cookie pubblicitari né di profilazione.</p>
      <p><CookiePreferencesButton className="cookie-preferences" /> · puoi cambiare o revocare la scelta in qualsiasi momento, anche dal fondo di ogni pagina.</p>
    </section>
    <section>
      <h2>Strumenti usati</h2>
      {tools.map(tool => <div key={tool.name} className="cookie-tool">
        <p><strong>{tool.name}</strong> · {tool.provider}</p>
        <p>{tool.purpose}</p>
        <p>Cookie: {tool.cookies} · Durata: {tool.duration} · Serve il consenso: {tool.consent}</p>
      </div>)}
    </section>
    <section>
      <h2>Trasferimenti fuori dall’Unione europea</h2>
      <p>Google e Microsoft possono trattare i dati anche negli Stati Uniti. Entrambe aderiscono all’EU-U.S. Data Privacy Framework e applicano le clausole contrattuali standard. L’indirizzo IP è usato da Google Analytics 4 solo per ricavare la posizione approssimativa e non viene registrato.</p>
    </section>
    <section>
      <h2>Base giuridica e diritti</h2>
      <p>I cookie tecnici non richiedono consenso. Gli strumenti di statistica di terze parti si basano sul tuo consenso, che puoi revocare in ogni momento senza conseguenze sulla navigazione. Puoi anche cancellare i cookie dalle impostazioni del browser. Per il resto del trattamento dei dati e per esercitare i tuoi diritti: <Link href="/privacy">informativa privacy</Link> o <a href="mailto:info@polpo-ai.com">info@polpo-ai.com</a>.</p>
    </section>
    <section>
      <h2>Aggiornamenti</h2>
      <p>Versione del 19 novembre 2026. Se cambiano strumenti o finalità aggiorniamo questa pagina e ti chiediamo di nuovo il consenso.</p>
    </section>
  </div>;
}
