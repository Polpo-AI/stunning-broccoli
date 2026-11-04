# Mini-consulenza Polpo — proposta prima dell’implementazione

Branch dedicato: `feat/polpo-consultation-hubspot`, base main7034f5b. Nessun merge o pubblicazione autorizzati da questo lavoro. Il percorso pubblico attuale resta disponibile finché non sono soddisfatti i prerequisiti di attivazione.

## Audit attuale

- `/contatti`: HTML server con scene A e link mailto; nessun wizard o acquisizione confermata.
- `/api/contact`: vecchio handler Supabase/Resend, input non tipizzato, senza limiti/idempotenza/rate limit applicativi, HTML email non escapato, successo possibile anche con notifiche fallite. Non viene riusato per il nuovo percorso.
- `/privacy`, `/privacy-policy`, `/cookie-policy`:404 alla verifica del4 novembre2026. Non è disponibile un URL privacy da dichiarare verificato.
- Next13.5.1 è fuori supporto; il precedente audit dipendenze segnala vulnerabilità. Aggiornamento e regressione di sicurezza restano un prerequisito di produzione, senza nascondere la questione dietro il nuovo modulo.
- HubSpot: portale dichiarato creato dall’utente; token, proprietà, subscription marketing e accessi non configurati/verificati. Nessun token sarà richiesto in chat o salvato nel repository.

## Architettura proposta

1. Wizard custom accessibile di cinque fasi su `/contatti`; art direction A, scena centrale e oggetti/materiali che reagiscono ai passaggi. Nessun embed HubSpot e nessuna simulazione di diagnosi AI.
2. Nuovo `POST /api/consultation`: controllo origine, body limitato, validazione/normalizzazione, honeypot, rate limit distribuito e acquisizione atomica.
3. Supabase/Postgres come archivio durevole più outbox transazionale. Una risposta202 significa che la richiesta è stata acquisita nel database, non che il CRM o una mail abbiano già risposto. Se il database non conferma il salvataggio non viene restituito successo.
4. Worker autenticato, richiamato da scheduler verificato: consegne HubSpot e notifica separate, checkpoint persistenti, lease, retry/backoff, gestione429/timeout/5xx, errori permanenti visibili agli operatori. Nessun fire-and-forget nella funzione serverless.
5. HubSpot contatti e associazioni ad aziende esistenti dove il collegamento è non ambiguo; nessuna trattativa automatica. Un nome attività da solo non è una chiave aziendale affidabile.
6. Notifica Resend verso info@polpo-ai.com, con riferimento richiesta e testo minimizzato. Fallire la notifica non perde il lead né lo duplica; viene ritentata separatamente.

Confermato: persistenza nel progetto Supabase già esistente del sito Polpo AI, separato da Polpo Padel. Nessun nuovo progetto Padel e nessun riuso delle sue credenziali. Non verranno applicate migrazioni remote o usati account reali finché la configurazione non sarà concordata. Una coda in memoria o su filesystem Vercel non è un’alternativa affidabile.

## Dati della richiesta

| Gruppo | Campi |
| --- | --- |
| Selettori | sector; problems[]; tools[]; managementSoftware facoltativo |
| Contesto | details facoltativo, massimo1000 caratteri; nessun dato di pazienti/sensibile richiesto |
| Contatto | name e businessName obbligatori; email o phone almeno uno; contactPreference facoltativa |
| Privacy | presa visione obbligatoria; URL/versione dal server; timestamp di acquisizione server |
| Marketing | opt-in distinto, falso di default; versione del testo; canale email proposto, mai dedotto dalla richiesta di consulenza |
| Provenienza | valori consentiti dal server: polpo-ai.com, /contatti, mini_consultation, schemaVersion |
| Affidabilità | requestId, idempotencyKey, fingerprint HMAC, stato consegne e tentativi |

Normalizzazione conservativa: trim, limiti, eliminazione controlli/HTML dai campi testuali, email minuscola, telefono internazionale normalizzato; enum chiusi e array senza duplicati. Il testo libero resta testo, non una risposta/valutazione AI.

## Duplicazioni e HubSpot

- Stesso idempotency key/stesso payload: stessa acquisizione; payload diverso con lo stesso key:409.
- Stesso contenuto ripetuto in una finestra breve: una sola richiesta e un solo job.
- Contatti con email: identificazione email e upsert; i retry non creano nuovi contatti.
- Solo telefono: chiave unica custom derivata da HMAC di telefono+nome+attività, per non fondere persone diverse che usano un centralino condiviso. Nessuna email finta.
- Proprietà `polpo_*` per settore, problemi, strumenti, gestionale, richiesta, provenienza, presa visione e opt-in; proprietà unica per l’identità telefonica. Schema da configurare e verificare prima dell’attivazione.
- Azienda: conservare associazioni esistenti; possibile associazione a un’unica azienda esistente con dominio corrispondente, solo se verificato nella allowlist del titolare ed escludendo provider personali; allowlist vuota significa revisione manuale. Nessuna creazione/associazione solo dal nome; casi ambigui da revisione umana.
- Opt-in non selezionato non revoca preferenze preesistenti. Nella prima versione si registra solo evidenza dell’opt-in email esplicito: nessuna iscrizione automatica a subscription né trasformazione automatica in contatto marketing. L’analisi funziona senza opt-in.

## Privacy e sicurezza

Token solo server, segreti in variabili d’ambiente. RLS e RPC riservate al server; nessun accesso client alle richieste. IP non salvati in chiaro: HMAC per rate limiting con scadenza. Nessun payload, email, telefono, testo libero o risposta esterna integrale nei log. Errori con soli codici e riferimento casuale.

Stato wizard in memoria durante il percorso; nessun dato personale negli URL o nell’analytics. Identificatori casuali e deduplica eventi possono essere conservati nella sessione senza i dati del form. Avviso esplicito contro dati di pazienti o altre informazioni sensibili; nessuna promessa che un filtro automatico possa riconoscerli tutti.

## Eventi

Avvio, fase completata, uscita/abbandono per fase, invio acquisito ed errore invio. Allowlist di nomi e interi di fase; nessun campo utente o URL arbitrario. Deduplica per percorso/evento/fase, così indietro/avanti non gonfia gli eventi. L’abbandono browser è una stima: chiusure/crash non garantiscono un evento e un ritorno può correggere la lettura del funnel.

## Dipendenze e decisioni mancanti

1. Informativa reale: URL, versione/data, testi e titolare validati; termini marketing distinti.
2. Supabase e progetto sito separato confermati; restano regione, configurazione server, retention e migrazione da verificare.
3. HubSpot private app o token server, portale, scope, proprietà custom, subscription marketing e piano effettivo. Non incollare segreti in chat.
4. Regole confermate: email-only marketing facoltativo; nessuna associazione da nome/provider personali; nessuna azienda nuova creata dal worker; ambigui manuali.
5. Scheduler disponibile, retry/monitoraggio, Resend e dominio mittente verificati. Senza worker verificato la feature non si attiva.
6. Verifica reale end-to-end con dati sintetici, readback CRM, timeout/retry e notifica autorizzata. Mock e test locali non sostituiscono questa prova.
7. Aggiornamento/validazione della piattaforma fuori supporto prima della pubblicazione del form.

## Gate di rilascio

Default OFF. Una preview privata può mostrare il percorso con invio disabilitato e indicazione chiara di anteprima. In produzione il nuovo percorso resta spento se mancano privacy verificata, acquisizione durevole, CRM/proprietà, scheduler, notifica, E2E e approvazione. Nessuna conferma fittizia e nessuna credenziale placeholder utilizzata come reale.

Fonti primarie: HubSpot API2026-09 https://developers.hubspot.com/docs/llms.txt; versioning https://developers.hubspot.com/docs/guides/api/overview; Supabase durable queue https://supabase.com/docs/guides/queues. Adapter datati implementati usando le guide ufficiali; compatibilità reale del portale ancora da verificare. Vedi OPERATIONS.md per configurazione finale e stato delle verifiche.
