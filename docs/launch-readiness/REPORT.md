# Polpo AI — messa online, 6 novembre 2026

Repository: Polpo-AI/stunning-broccoli. Dominio: https://polpo-ai.com. Supabase del sito: llbqoyucmvuijfobzryj. Team Vercel Polpo AI, piano Hobby; nessun acquisto o modifica del piano.

## Ambito e approvazioni

Il titolare ha richiesto modifiche, test sintetici, migrazioni, PR e deploy. Ha già approvato consenso esplicito survey e ricontatto separato, fasce 14–17 e 18+, risposte/recapiti per 90 giorni, prove minime del consenso fino a 24 mesi dall’acquisizione e nessun marketing. Il 6 novembre ha autorizzato esplicitamente anche lo spostamento di una sola esecuzione del job retention esistente, con ripristino immediato del suo orario.

Il commit d40035a e il branch chore/launch-readiness-privacy non erano nel repository remoto o nel checkout disponibile. Le modifiche sono ricostruite dalla main 9ddfbfe, che integra già PR #31. Nessun lavoro precedente è stato sovrascritto. L’ambiente iniziale contiene anche il diverso repository padel-activity, non modificato.

## Implementazione

- Consenso esplicito e versione informativa richiesti lato server prima di ogni scrittura survey; età ammessa 14–17 o 18+. Nessun valore predefinito di consenso o età.
- Prova minima di consenso separata da risposte e recapiti: finalità, HMAC del codice, versione, fascia d’età, acquisizione/scadenza e revoca. Nessuna email, risposta o IP in questa tabella.
- Risposte e recapiti scadono dopo 90 giorni; prove dopo 24 mesi. La revoca non proroga la durata. Pulizia giornaliera tramite job già esistente.
- Revoca in `/ricerca/revoca`, codici distinti e non presenti negli URL o nello storage browser. La cancellazione è idempotente; i retry successivi con lo stesso codice sono rifiutati. Lock transazionale per serializzare invio e revoca dello stesso codice. Nessun collegamento tra recapito e risposte.
- Stesso progetto Supabase del sito, con fallback alle credenziali server già configurate. La chiave HMAC della ricerca è derivata con un contesto distinto, senza recuperare o copiare segreti. Nessuna service role nel client.
- `/contatti` usa sempre il wizard, anche se l’acquisizione dovesse essere temporaneamente disabilitata. Il vecchio endpoint `/api/contact` resta ritirato (410).
- Risultati consultabili dal dashboard Supabase autorizzato, schema `research_private`; istruzioni e query in [RESULTS.md](../research/RESULTS.md). Distribuzioni con soglia di cinque; nessuna esposizione pubblica.

## Verifiche locali

Browser locale attivo: retry 503 con risposte conservate, idempotenza frontend, invio senza recapito, recapito separato e nessun overflow a 320/390/768/1440 px.

18 test survey e 54 test mini-consulenza passati; lint, typecheck e build passati. Nessuna dipendenza applicativa aggiunta. Restano avvisi build preesistenti: utility easing Tailwind ambigua e route Edge non prerenderizzabile.

PostgreSQL 15 isolato: migrazione applicata; test SQL con rollback verifica acquisizione, retry, fasce di età nelle prove, scadenze a 90 giorni/24 mesi, revoca di risposte e contatti, prova minima conservata, blocco reinvio dopo revoca, pulizia prove scadute e accesso anonimo negato.

## Verifiche remote

Migrazione `research_consent_retention` applicata al solo Supabase del sito. Advisor sicurezza: nessun finding WARN/ERROR; INFO RLS senza policy previste per tabelle server-only che devono negare accesso a anon/authenticated.

Pulizia remota eseguita in transazione annullata con risposte, recapito e prova di consenso sintetici scaduti: tutti e tre assenti dopo `research_delete_expired()`. Nessun fixture persistente né modifica ai dati reali.

Il job retention esistente ha eseguito con `succeeded` il 2026-11-05 alle 23:49:00 UTC (6 novembre, 00:49 Europe/Rome). L’orario `17 3 * * *` è stato ripristinato e riletto; nessun secondo job creato.

I timestamp dei file migrazione sono allineati alle versioni già applicate: `20261105141357` per la raccolta iniziale e `20261105234410` per consenso e retention. Non si riapplica la migrazione iniziale.

Il worker mini-consulenza è attivo tramite Supabase cron; health prima del nuovo collaudo: HTTP 200, zero timeout, zero pendenti/falliti. Questo controllo da solo non prova la consegna di una nuova richiesta.

## Evidenze finali

Esito: **collaudo operativo completato**, 6 novembre 2026, circa 01:03 Europe/Rome.

- PR #36: https://github.com/Polpo-AI/stunning-broccoli/pull/36, integrata con autorizzazione esplicita al merge amministrativo. Le due osservazioni della review automatica sono corrette: informativa in nuova scheda senza perdita delle risposte e codici UUID normalizzati, incluso il caso maiuscolo.
- Produzione: commit `4df5593dc28084fcbc267b59c22bae3e49fac894`, deployment `dpl_JAJmP2Kmsft2NgynTkUv42SSap8e`, **READY**, Next.js, build remota circa 45 secondi. Alias `polpo-ai.com` e `www.polpo-ai.com` assegnati. Vercel Hobby confermato, nessun acquisto.
- Browser su dominio pubblico: HTTP 200 per entrambe le survey, informativa, revoca e contatti; HTTP 202 per due risposte sintetiche e il recapito separato, retry con stessa chiave senza duplicati, invio senza consenso rifiutato 422, under 14 bloccato prima delle domande. Nessuna telemetria survey, storage locale/sessione vuoto, zero errori JavaScript.
- Responsive: survey a 320/390/768/1440 px e homepage a 390/1440 px, senza overflow. Un solo h1 con «Otto braccia. Una sola missione: liberare le tue.». Screenshot ispezionati. Preferenza di movimento ridotto attiva.
- Readback Supabase: risposte di entrambi i percorsi e un recapito separato, tre prove del consenso; fasce 14–17 e 18+, scadenze a 90 giorni e 24 mesi confermate. Cella statistica sotto cinque soppressa, soglia cinque verificata in PostgreSQL isolato; query dei risultati remoti eseguita con accesso riservato.
- Revoca sul dominio pubblico, con codici anche in maiuscolo: HTTP 200; risposte sintetiche e recapito assenti al readback. Reinvio dopo revoca rifiutato 409. Le tre prove minime sono annotate come revocate; la scadenza resta 24 mesi dall’acquisizione. Nessun fixture survey attivo residuo.
- Mini-consulenza: richiesta sintetica `0bd4c7e6-2ad2-453f-92c0-3fcd1c0a66ce` acquisita dal browser in produzione e confermata in Supabase. Retry restituisce lo stesso riferimento. Il cron effettivo ha portato CRM a `synced` e notifica a `sent`, senza errori.
- HubSpot: contatto sintetico `914179186934`, readback del riferimento, sport, automazioni_ai, analisi_gratuita, WhatsApp e problema messaggi, marketing `false`, azienda in revisione manuale. Nessuna trattativa né iscrizione marketing richiesta dal codice. Il record sintetico resta riconoscibile come POLPO TEST per l’audit: non rappresenta una richiesta cliente.
- Email: Resend ha restituito `lastEvent: delivered`, `providerAccepted: true`, `deliveryVerified: true` attraverso il controllo server riservato ai fixture sintetici. È prova di consegna del provider, non di lettura umana.
- `/api/contact`: 410. `/contatti/prova`: 404. Endpoint di evidenza senza autenticazione: 401. Il vecchio componente contatti è eliminato.
- Health finale: zero richieste CRM/notifiche pendenti, zero fallite, worker HTTP 200 senza timeout. Scansione Vercel del nuovo deployment: nessun log `error`/`fatal` nella finestra di 15 minuti. Nessuna affermazione su errori fuori dalla finestra o non registrati.

Nel cloud, Chromium non utilizzava correttamente la CA del proxy gestito. Il runner inoltra ogni richiesta browser reale tramite il trasporto Playwright API configurato con lo stesso proxy e con verifica TLS attiva e CA dell’ambiente. Nessuna API, risposta o dato di produzione è simulato. Questo dettaglio è registrato in `acquisition.json` e `withdrawal.json`. Il runner `scripts/qa-launch-production.cjs` include il supporto al trasporto del cloud con `POLPO_CLOUD_PROXY_TRANSPORT=true`; da un normale ambiente può usare direttamente la rete del browser.

Questo documento e la descrizione aggiornata della PR #36 riportano gli esiti finali. Le prove del consenso sintetiche seguono la normale retention; non vengono eliminate per occultare il test.

## Consultare i risultati

Aprire https://supabase.com/dashboard/project/llbqoyucmvuijfobzryj/editor con l’account autorizzato e selezionare lo schema `research_private`: `survey_responses` per risposte, `survey_contacts` per i recapiti separati, `response_distribution` per le statistiche con soglia di cinque. Le query e la procedura per i diritti sono in `docs/research/RESULTS.md` nel repository. Non esiste una dashboard pubblica delle risposte.

## Limiti

Il collaudo tecnico non certifica contratti/DPA dei fornitori, trasferimenti, backup, titolarità o conformità legale. La retention descritta riguarda il database applicativo attivo, con cancellazione giornaliera dei record scaduti. La policy della mini-consulenza resta distinta da quella delle survey; i 90 giorni approvati qui riguardano risposte e recapiti survey. Nessun marketing o campagna pubblicitaria avviata. Nessuna prova con partecipanti reali, screen reader o dispositivi fisici.
