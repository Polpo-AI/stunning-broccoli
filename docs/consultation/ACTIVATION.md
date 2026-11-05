# Attivazione mini-consulenza — stato verificato il 5 novembre 2026

## Stato attuale

**Invio pubblico disabilitato. Servizio completo non ancora verificato.** Lo scheduler è attivo, ma il test CRM ha fallito. La correzione è nella [PR #23](https://github.com/Polpo-AI/stunning-broccoli/pull/23), in attesa della recensione obbligatoria: il titolare ha scelto di attenderla. Non usare merge amministratore né pubblicare questa correzione prima della recensione.

| Componente | Evidenza e limite |
| --- | --- |
| Supabase sito | llbqoyucmvuijfobzryj, eu-west-1; URL configurato verificato; nessun collegamento al progetto Padel. |
| Archivio e accessi | Migrazioni 20261105003702 e 20261105004824 applicate; RLS e RPC riservate al server. Prova atomica acquire/idempotenza/claim/checkpoint/release riuscita con rollback. |
| Credenziali runtime | Chiavi server inserite dal titolare come Sensitive in Preview e Production; non esportate. Accesso database, account HubSpot e dominio email verificati dal server. |
| HubSpot | Account 149703632 verificato; 21 proprietà compatibili, inclusi polpo_contact_key unico e telefono in polpo_strumenti. Setup POST disabilitato dopo provisioning. |
| Automazioni CRM | Il titolare ha disattivato l'associazione/creazione automatica aziende e confermato nessun workflow attivo. Il codice non crea aziende, trattative o iscrizioni marketing. |
| Scheduler | Supabase pg_cron ogni minuto, pg_net e segreto Vault. enabled=true dopo approvazione esplicita “test e poi servizio operativo”. Heartbeat e chiamata HTTP osservati. Le chiamate recenti rispondono 503: non attestare SCHEDULER_VERIFIED. |
| Email | Resend ha accettato una sola notifica; ricezione a info@polpo-ai.com confermata dal titolare. Nessuna notifica al recapito del contatto sintetico. |
| Modulo pubblico | HTTP 503; privacy ancora draft, rilascio ed ENABLED false; analytics del percorso disabilitati. Preview non consegna al CRM. |
| Monitor esterno | GitHub Actions, segreto dedicato in sola lettura, cadenza circa cinque minuti; esecuzione sana 41953522351 riuscita e allarme reale 41954821821 con DELIVERY_FAILED verificato. Non è un SLA. Ricezione delle notifiche GitHub e recupero ancora da attestare. |

## Prova sintetica e problema da risolvere

Richiesta `0fa68b8d-397c-4770-bda1-941274000cf4`, acquisita il 5 novembre 2026 alle 03:13:56 Europe/Rome. Esiste una sola richiesta con il marcatore di test. Il vero scheduler ha avviato la consegna:

- CRM: failed, un tentativo, codice HUBSPOT_HTTP_400, nessun contact ID registrato. Causa specifica ancora da determinare; non assumere che dipenda dal dominio email sintetico.
- Email: sent, un tentativo, ricezione confermata. Il recupero deve preservare questo esito senza reinviare.
- Controllo worker: successive esecuzioni 503 worker_unavailable anche senza nuove richieste. La PR #23 gestisce le risposte vuote di successo PostgREST e aggiunge esclusivamente codici HubSpot di validazione riconosciuti, senza dati personali.

PR #23: 42 test passati, build di produzione con lint/typecheck passata, Vercel Preview riuscita. Merge e pubblicazione sospesi per recensione richiesta. Nessuna modifica delle regole GitHub.

Il test remoto copre acquisizione RPC → scheduler reale → worker → provider. Non è una prova completa di invio dal browser; il blocco HTTP pubblico è verificato separatamente. Prima di dichiarare E2E riuscito servono readback del contatto, assenza effetti indesiderati, prova duplicati e recupero.

## Azioni dopo la recensione

1. Pubblicare la correzione approvata, verificare commit effettivamente in produzione e HTTP 200 dello scheduler a coda vuota.
2. Riprendere solo il canale CRM della richiesta sintetica con la RPC redrive autorizzata; conservare l'email già inviata. Leggere il codice di validazione e correggere la causa accertata. Se occorre cambiare la fixture, registrare la modifica esplicita e mantenerla soltanto sintetica.
3. Leggere il contatto HubSpot: cinque classificazioni italiane, tutte le risposte, problema principale, ID richiesta, evidenza privacy marcata sintetica, marketing false. Verificare associazioni e nessuna nuova trattativa/azienda. Rilevazione del 5 novembre dopo il tentativo fallito: zero trattative e una sola azienda preesistente, [HubSpot](https://app.hubspot.com/contacts/149703632/record/0-2/461593454818?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), creata il 4 novembre. Questa rilevazione non sostituisce la verifica dopo una consegna riuscita.
4. L’allarme reale è verificato nella [run 41954821821](https://github.com/Polpo-AI/stunning-broccoli/actions/runs/41954821821); verificare ora recupero, ricezione notifica GitHub e destinatario responsabile. Il monitor attuale rileva heartbeat, failed, backlog, lease e retention; non distingue ancora heartbeat recente da HTTP worker 503 con archivio senza errori. Colmare o coprire questa lacuna prima di MONITORING_VERIFIED.
5. Approvare informativa e procedura privacy descritte sotto; eseguire le prove ancora mancanti. Soltanto dopo aggiornare le attestazioni supportate da evidenze e valutare il rilascio pubblico.

## Privacy e gestione operativa

Dati confermati: Polpo AI, via Madrid 38, Aprilia (LT), info@polpo-ai.com; durata ordinaria 365 giorni; sola consulenza, nessun marketing. Testo pronto per revisione in [PRIVACY-REVIEW.md](PRIVACY-REVIEW.md), non ancora approvato/pubblicato.

Restano da verificare contratti e trasferimenti dei fornitori, durata effettiva log/backup, procedura diritti e cancellazione coordinata Supabase/HubSpot. La maintenance elimina dal database le richieste completate oltre la retention; non elimina automaticamente contatti HubSpot. Le irrisolte scadute richiedono revisione e chiusura, senza rinnovo indefinito. Definire un responsabile e controlli periodici anche per il CRM. Prima della pubblicazione allineare versione del documento e attestazione ambiente. Non sostituire questi controlli con flag true.

## Sicurezza e manutenzione

Next 15.5.29, font inclusi nel progetto, vecchio endpoint email pubblico ritirato con 410. Audit registrato: zero vulnerabilità critiche/alte e otto moderate nella catena strumenti; pianificare gli aggiornamenti senza audit fix --force. Aggiornare Next prima del termine della Maintenance LTS indicato dalle fonti già verificate, 31 gennaio 2027.

Le chiavi schema di scrittura erano necessarie solo al provisioning: rimuovere lo scope non più necessario dopo aver verificato che lettura schema/identità e scrittura contatti restino funzionanti. Conservare separati segreti worker e monitor; non stamparli nei log.

## Pulizia separata

Un tentativo CLI precedente ha creato per errore il progetto Vercel separato consultation-resend-check. È stato sospeso, il sito principale non è stato modificato da quel tentativo. La cancellazione richiede conferma del titolare nel [pannello Vercel](https://vercel.com/polpo-ai-projects/consultation-resend-check/settings/general#delete-project). Non riattivarlo.
