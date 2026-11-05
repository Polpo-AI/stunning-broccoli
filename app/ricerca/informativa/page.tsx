import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default function ResearchPrivacyDraft() {
  return <main className="research research-policy">
    <div className="research-shell">
      <p className="research-eyebrow">POLPO AI · RICERCA PADEL</p>
      <h1>Informativa sulla ricerca</h1>
      <p className="research-error" role="status">Bozza non approvata. Non avviare la raccolta sulla base di questo testo.</p>
      <p>Questa pagina è un segnaposto per la bozza dedicata all’informativa. Prima di raccogliere risposte reali il titolare deve completare e approvare il documento, inclusi identità e contatti, basi giuridiche, fornitori e trasferimenti, conservazione, diritti e gestione dei minori.</p>
      <p>La bozza completa e la lista delle verifiche sono disponibili nel repository, in docs/research/PRIVACY-DRAFT.md. Non si usa l’informativa della mini-consulenza.</p>
      <Link className="research-secondary" href="/ricerca/giocatori">Torna alla survey</Link>
    </div>
  </main>;
}
