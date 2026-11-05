# Sistema minimo di raccolta survey

## Stato

- **TESTATO LOCALMENTE:** suite ricerca 16 test; suite mini-consulenza 46 test; typecheck, lint e build. Browser Chromium headless: 17 layout sui due percorsi a 320/390/768/1440 px, flussi tastiera/reduced-motion e regressione home/contatti; test attivo con API simulate per retry, risposte mantenute dopo 503, invio senza email, contatto separato e finalità indipendenti.
- **TESTATO LOCALMENTE:** migrazione applicata in un contenitore PostgreSQL 15 usa-e-getta. Verificati RLS/grant anon, accepted/duplicate/conflict, rate limit risposte e contatti, due POST concorrenti con stesso idempotency key (un record, esiti accepted e duplicate).
- **NON VERIFICATO:** test WCAG/screen reader e dispositivi fisici; test con partecipanti; retention scheduler effettivo; nessun dato reale o fornitore esterno coinvolto nella prova E2E attiva.
- **IMPLEMENTATO:** POST server-side separati per risposte e recapiti; validazione server delle sette domande padel-surveys-v2, dei rami, delle selezioni esclusive, dei campi e dei limiti; tabelle private, RLS, RPC limitate al service role, idempotenza, HMAC anti-abuso, viste aggregate con celle inferiori a 5 escluse.
- **IMPLEMENTATO:** le risposte non richiedono email. survey_contacts non ha foreign key, ID survey o hash condiviso con survey_responses; marketing e ricontatto ricerca hanno flag separati. Nessun adapter HubSpot o invio campagne.
- **IMPLEMENTATO:** i form mantengono le risposte dopo errori e mostrano la conferma solo dopo il salvataggio confermato.
- **IMPLEMENTATO:** pagina/endpoint di produzione chiusi per default. Servono contemporaneamente gate pubblico e raccolta, versione privacy approvata, progetto Supabase atteso e configurazione di conservazione verificata. Preview/dev continua a mostrare la prova senza acquisire dati se il gate è spento.
- **IN ATTESA DI APPROVAZIONE:** informativa dedicata in PRIVACY-DRAFT.md; identità del titolare, contatti, basi giuridiche, fornitori/trasferimenti, minori e tempi effettivi da verificare. L’email dei recapiti non viene collegata alle risposte.
- **NON IMPLEMENTATO:** sincronizzazione CRM, campagne, dashboard, telemetria di avvio/abbandono, gestione pubblica dei diritti, retention scheduler e flusso di cancellazione individuale basato su identità. La cancellazione automatica è prevista nella migrazione ma deve essere schedulata e verificata.
- **NON VERIFICATO SU SERVIZI REMOTI:** la migrazione non è stata applicata. Il progetto remoto Sito Polpo AI è stato soltanto ispezionato in lettura. Nessun invio reale, deploy o test su Supabase remoto.

## Architettura

POST /api/research/responses accetta solo audience, versione, risposte, dettaglio circoli facoltativo, chiave idempotenza e honeypot. Rifiuta campi extra, risposte incompatibili, chiavi/opzioni ignote, testo oltre 300 caratteri e body oltre 16 KiB. Il server chiama una RPC atomica protetta con service role; lo stesso key/payload restituisce la ricevuta già creata, lo stesso key con payload diverso dà 409.

POST /api/research/contacts è separato, richiede email e almeno una scelta volontaria. La chiave idempotenza e il record sono distinti dalla survey. Il limite è 4 KiB. Gli endpoint controllano Origin, JSON, honeypot e rate limit per finestre di 15 minuti (massimo 8 risposte o 5 recapiti per chiave rete HMAC). Le chiavi scadono entro 24 ore. Non vengono registrati IP raw, user agent, risposte o email nei log applicativi. L’edge/hosting può mantenere i propri log tecnici.

Le tabelle sono nello schema research_private, non esposto al Data API: survey_responses scade dopo 365 giorni; survey_contacts dopo 180; survey_rate_limits entro 24 ore. RLS è attiva e non ci sono policy per anon o authenticated. Accesso alle tabelle, alle RPC e alla vista aggregata concesso a service_role soltanto. La vista response_distribution omette testo libero, contatti, identificativi e conteggi inferiori a cinque. L’analista dovrà comunque evitare di dedurre dati individuali dai gruppi.

## Variabili d’ambiente

Solo server-side, mai NEXT_PUBLIC_*:

- RESEARCH_SUPABASE_URL (solo https://llbqoyucmvuijfobzryj.supabase.co)
- RESEARCH_SUPABASE_PROJECT_REF (solo llbqoyucmvuijfobzryj)
- RESEARCH_SUPABASE_SERVICE_ROLE_KEY
- RESEARCH_HMAC_KEY (segreto casuale di almeno 32 caratteri)
- RESEARCH_ALLOWED_ORIGINS (origini HTTPS esatte separate da virgola)
- RESEARCH_PUBLIC_ENABLED=true
- RESEARCH_COLLECTION_ENABLED=true
- RESEARCH_PRIVACY_APPROVED_VERSION=padel-research-privacy-v1
- RESEARCH_RETENTION_JOB_VERIFIED=true

I flag devono restare non configurati o false fino all’autorizzazione del titolare. In questo branch il codice marca la privacy come DRAFT e il gate di produzione resta chiuso anche se le variabili vengono impostate. Dopo l’approvazione occorre aggiornare esplicitamente lo stato/versione del documento nel codice e la pagina informativa. RESEARCH_LOCAL_ACTIVE_PREVIEW=1 simula il solo rendering del flusso attivo in NODE_ENV=development e senza Vercel, limitando gli Origin a localhost e 127.0.0.1, per test browser con POST intercettati; non è accettato in produzione e non va usato in hosting. Una variabile d’ambiente non sostituisce la revisione privacy o l’approvazione organizzativa. Non sono presenti valori segreti nel repository.

## Migrazione, collaudo e rollback

La migrazione supabase/migrations/20261105113000_create_padel_research_collection.sql è versionata e destinata esclusivamente al progetto del sito. Non è stata eseguita sul remoto. Prima di applicarla: revisione SQL indipendente, branch Supabase isolato o stack locale, verifica advisory/RLS, test sintetici concorrenti, e approvazione esplicita del titolare. Non applicare mai al database prodotto Polpo Padel.

Rollback: disabilitare prima RESEARCH_PUBLIC_ENABLED e RESEARCH_COLLECTION_ENABLED; verificare che i percorsi di produzione tornino 404 e i POST 503; esportare solo eventuali dati da conservare secondo decisione del titolare; quindi una migrazione di rollback approvata può rimuovere viste, funzioni, tabelle e schema. Non cancellare dati del progetto operativo o della mini-consulenza.

Prima del merge integrare questo branch in main aggiornato; la PR di raccolta dipende dalla UI in PR #24. Raccomandazione: mantenere #24 draft e privato, verificare la sua base aggiornata, integrare prima questa implementazione oppure fare merge ordinato in base a decisione del proprietario, poi lasciare tutte le route chiuse finché le verifiche non sono complete. Nessun merge è stato eseguito.

## Checklist prima dell’attivazione pubblica

1. Review indipendente codice, migration, policy RLS, API e query aggregate.
2. Test SQL su ambiente isolato e controllo permessi anon/authenticated/service_role.
3. Informativa compilata e approvata; finalità, basi giuridiche, minori, fornitori, trasferimenti e diritti verificati.
4. Retention scheduler configurato e cancellazione osservata in ambiente isolato.
5. WAF/firewall e rate limit verificati su deploy protetto; verifica body/errori/log senza payload.
6. Test E2E con dati sintetici: tutte le diramazioni v2, no email, email con finalità distinte, retry/concorrenza, timeout, RLS/readback e cancellazione.
7. Prova browser responsive, tastiera, reduced-motion, screen reader e regressione homepage/contatti.
8. Controllo che solo le origini approvate siano accettate e che Supabase sia il progetto sito.
9. Autorizzazione esplicita del titolare ai due flag e verifica browser remoto autenticato/anonimo.

Nessuna singola build o test locale rende la raccolta pronta o autorizzata.
