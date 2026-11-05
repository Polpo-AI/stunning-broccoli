# Verifica del 4 novembre 2026

## Superato localmente

- `npm run build`, `npm run typecheck`, `npm run lint`.
- `npm run test:consultation`: 29 test. Validazione, telefono senza email, analisi senza marketing, body limit, Origin, conferma dopo storage, errori sicuri, idempotenza, retry per canale, lease persa, no aziende/deal nuove, associazioni ambigue/manuali, rispetto preferenze CRM, timestamp ISO, gate worker separato dall'invio pubblico.
- PostgreSQL 18 isolato, database nuovo e vuoto, nessun accesso a Supabase o Padel: 15 verifiche SQL. Migrazione reale, otto connessioni concorrenti sullo stesso key, deduplica, conflitto, rate limit, permessi anon negati, lease e recupero, ordinamento richieste CRM dello stesso contatto, consegne indipendenti, redrive, eventi deduplicati e retention. Riavvio del processo PostgreSQL con conservazione della richiesta irrisolta verificato.
- Browser Edge/Playwright: 320, 390, 768, 1440 px. Cinque fasi, tutti i settori, multiselezione, suggerimento Playtomic, indietro/modifica senza perdita dati, controlli privacy/marketing separati, invio disabilitato, nessuno sbordo orizzontale, scelta radio da tastiera, reduced motion e pulsante animazioni OFF, assenza dati del form negli storage browser. Nessun errore JS; nessun POST del wizard nel percorso disabilitato.
- Modalità produzione locale con feature OFF: pagina contatti precedente, `/privacy` 404, API acquisizione 503. API worker non autenticata 401. Preview: documento privacy noindex e invio inattivo.
- Bundle build `/contatti`: 8,07 kB pagina, circa 99,1 kB first-load JS. Nessuna nuova dipendenza di runtime. Riutilizzo immagini responsive e sistema visivo A. Nessuna misura Lighthouse/Core Web Vitals reale dichiarata.

Gli screenshot e `qa/browser-report.json` documentano la resa locale. Le verifiche da tastiera/markup/motion non equivalgono a una certificazione completa WCAG o a una prova con tutte le tecnologie assistive.

## Non ancora verificato

Progetto Supabase remoto, migrazione remota, scheduler e allarmi reali, identità/configurazione portale HubSpot, proprietà effettive e policy del portale, consegna CRM/readback, notifica accettata dal provider e ricevuta nella casella info. Nessuna credenziale dedicata è configurata in questo checkout. I mock provider nei test non sono una prova di consegna reale.

`scripts/consultation-e2e.cjs` è predisposto per una prova sintetica esplicita dal server, senza aprire l'endpoint pubblico, e con attesa della consegna da worker/scheduler reali. Non è stato eseguito contro servizi reali. Richiede le configurazioni descritte in OPERATIONS.md e non sostituisce le ulteriori prove di errore/recupero e verifica della casella.

Privacy ancora draft; invio OFF. Next 13.5.1 e la revisione delle vulnerabilità preesistenti restano un prerequisito del rilascio. Nessun merge o deploy in produzione effettuato.


## Aggiornamento 5 novembre 2026 — readiness

35 test applicativi passati, typecheck, build Next 15.5.29 e lint passati. Browser locale preview su Edge: 320/390/768/1440, scelta esplicita problema principale, nessun marketing, navigazione e modifica senza perdita dati, invio OFF, privacy noindex, nessuno sbordo/errore JS. Evidenze in qa-operational. API vecchia 410 e health senza credenziale 401. Audit dipendenze: 0 critiche/alte, 8 moderate nei tool di build/lint. Migrazioni remote applicate al progetto del sito e permessi controllati; prova acquire/idempotenza/claim/checkpoint/release con rollback riuscita. Job pg_cron ogni minuto con esecuzioni riuscite e heartbeat; delivery switch false, nessuna consegna HTTP. 15 proprietà CRM approvate e create, readback di schema da completare con campo univoco/opzione telefono e token server. E2E CRM/email ancora NON eseguito. Privacy predisposta ma non approvata; invio pubblico OFF.
