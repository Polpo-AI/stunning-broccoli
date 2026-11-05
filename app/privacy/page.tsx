import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { previewAvailable } from '@/lib/consultation/server-config';
import { privacyDocument,marketingText } from '@/lib/consultation/privacy';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Bozza informativa privacy — in revisione',robots:{index:false,follow:false},alternates:{canonical:'https://polpo-ai.com/privacy'}};
export default function PrivacyPage(){
 if(!previewAvailable())notFound();
 return <div className="privacy-draft"><Link href="/contatti">Torna al percorso</Link><p className="a-eyebrow">DOCUMENTO IN REVISIONE · {privacyDocument.version}</p><h1>Bozza di informativa.<br/><em>Da validare prima dell’invio.</em></h1><p className="privacy-status">Questa bozza non è un’informativa approvata. L’invio pubblico della mini-consulenza resta disabilitato. Non sono stati inventati dati legali o societari.</p>
 <section><h2>Identità del titolare</h2><p>Da completare e validare: denominazione legale del titolare, sede, recapiti privacy ed eventuali ulteriori contatti pertinenti. Il nome commerciale Polpo AI non sostituisce questi dati.</p></section>
 <section><h2>Dati previsti nel percorso</h2><p>Settore, problemi operativi, strumenti e gestionale facoltativo; contesto libero facoltativo; nome, attività, email oppure telefono e preferenza di contatto. Presa visione e scelta marketing vengono registrate separatamente con versione e data.</p><p>Non inserire dati di pazienti, informazioni sanitarie, credenziali, documenti o altre informazioni sensibili.</p></section>
 <section><h2>Finalità e basi da validare</h2><p>Gestione della richiesta di analisi gratuita e relativo contatto. L’eventuale marketing via email è una scelta distinta e facoltativa. Basi giuridiche, testi e modalità di esercizio dei diritti devono essere revisionati dal titolare e dai suoi consulenti.</p><p>Testo marketing proposto: «{marketingText}»</p></section>
 <section><h2>Fornitori e flusso proposto</h2><p>Il progetto prevede Vercel per il sito, un progetto Supabase separato per l’acquisizione durevole, HubSpot per il CRM e Resend per la notifica al team. Entità contrattuali, ruoli, regioni, trasferimenti e accordi devono essere verificati sul servizio effettivamente configurato.</p></section>
 <section><h2>Conservazione e sicurezza</h2><p>Durate di conservazione da approvare e configurare. Le richieste non consegnate restano in revisione operativa; cancellazione ed eventuale conservazione della prova dei consensi richiedono una procedura validata. Nessun testo libero o recapito viene inviato agli analytics o inserito nei log applicativi del nuovo percorso.</p></section>
 <section><h2>Diritti e contatti</h2><p>Da completare con modalità e recapiti reali per esercitare i diritti, revocare eventuali consensi e presentare reclami. Il testo definitivo deve spiegare anche natura obbligatoria/facoltativa dei campi e conseguenze delle scelte.</p></section>
 <section><h2>Misurazione del percorso</h2><p>Sono previsti eventi limitati ad avvio, fase, uscita e risultato tecnico dell’invio, senza nome, email, telefono o testo libero. Anche questa misurazione deve essere inclusa nella valutazione privacy prima dell’attivazione.</p></section>
 <p className="privacy-status">Da approvare: titolare, fornitori, basi, conservazione, diritti, testo marketing e versione definitiva. La sola presenza di questa pagina non abilita l’invio.</p></div>;
}
