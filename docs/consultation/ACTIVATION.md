# Attivazione mini-consulenza — stato del 5 novembre 2026

## Completato

- Progetto Supabase del sito confermato confrontando il suo ref con l’URL effettivamente configurato su Vercel: llbqoyucmvuijfobzryj. Nessun accesso a Padel.
- Migrazione archivio/coda applicata e registrata come 20261105003702; migrazione operativa come 20261105004824. I nomi dei file locali coincidono con la cronologia remota.
- Permessi verificati: quattro tabelle con RLS, nessun SELECT anon/authenticated; sette RPC originali riservate a service_role. La funzione health è anch’essa riservata al server. Gli avvisi informativi RLS senza policy sono intenzionali: questi dati non sono destinati al client.
- Prova remota acquire/idempotenza/claim/checkpoint/release in transazione con rollback riuscita; archivio ancora vuoto.
- pg_cron e pg_net configurati; job ogni minuto con heartbeat osservato. Lo switch di consegna in polpo_ops.consultation_scheduler resta false: nessuna richiesta HTTP viene avviata. Il segreto corrispondente al worker Vercel è conservato in Vault; non è nei file.
- Variabili Vercel impostate per Preview/Production: ref/URL sito, retention 365, portale 149703632, mittente info, origini esatte, chiavi HMAC/worker generate. Form, worker, analytics e attestazioni ancora false.
- Mapping delle cinque proprietà italiane, scelta esplicita del problema principale, marketing disabilitato UI/server, conservazione delle classificazioni CRM esistenti.
- Next aggiornato da 13.5.1 a 15.5.29, ancora in Maintenance LTS al momento della verifica. Pianificare il successivo aggiornamento prima del 31 gennaio 2027. React 18 conservato secondo peerDependencies della versione installata. PostCSS 8.5.32 applicato anche a Next con override; librerie email/OG non più necessarie rimosse, uso next/og. Vecchio endpoint /api/contact ritirato con 410; contatto mailto preservato.
- Audit: 0 critiche, 0 alte, 8 moderate nella catena strumenti glob/minimatch/TypeScript ESLint/sucrase. Non applicato audit fix --force.

## Credenziali che richiedono l’account del titolare

Aprire [variabili Vercel](https://vercel.com/polpo-ai-projects/stunning-broccoli/settings/environment-variables). Inserire come Sensitive, per Preview e Production:

| Variabile | Dove recuperarla/configurarla |
| --- | --- |
| POLPO_LEADS_SUPABASE_SERVICE_ROLE_KEY | Progetto Sito Polpo AI, Settings → API Keys, chiave server service_role compatibile con l’adapter REST. Non usare publishable/anon o le credenziali di Padel. |
| POLPO_HUBSPOT_ACCESS_TOKEN | Account HubSpot 149703632, Settings → Integrations → Service Keys. Scope minimi da verificare per contatti lettura/scrittura, aziende lettura, schema contatti lettura e lettura identità account. Per il solo provisioning schema, abilitare temporaneamente schema contatti scrittura, poi rimuoverlo. |

Non incollare chiavi in chat. Esiste già RESEND_API_KEY sul progetto: la configurazione la riutilizza soltanto se POLPO_RESEND_API_KEY manca. Non è stata esportata né testata contro Resend. Mittente verificato e ricezione info restano da provare.

La creazione di legacy private app non è più il percorso corrente: usare Service Keys. Il connettore HubSpot della chat non è la credenziale runtime del sito.

## Approvazioni e verifiche rimanenti

1. Lo schema preciso in HUBSPOT-APPROVAL.md è stato approvato. Il connettore non espone hasUniqueValue: il campo identità univoco richiede dashboard o provisioning autorizzato con credenziale server. Schema approvato dal titolare; 15 proprietà tecniche aggiunte con successo. Restano il campo polpo_contact_key univoco e l’opzione telefono, non esposti dal connettore.
2. Verificare compatibilità della lettura account /integrations/v1/me con la Service Key; deve restituire l’account corretto prima di claim o scritture. Se non supportata, adattare al metodo account-info documentato della versione corrente prima delle consegne.
3. Verificare automazioni HubSpot: nessuna azienda/deal creata da nuove richieste e nessuna iscrizione marketing. Schema/readback devono passare, non basta il connettore.
4. Revisionare il testo PRIVACY-REVIEW.md predisposto con i dati confermati; accordi fornitori, trasferimenti, ciclo backup/log e cancellazione coordinata CRM/archivio restano da verificare. privacy.ts resta draft fino a verifica e approvazione.
5. Predisporre un osservatore esterno con responsabile per heartbeat >3 minuti, pending >10 minuti, failed>0 e retention_review_due>0. La route autenticata /api/internal/consultation-health fornisce aggregati senza payload. L’heartbeat interno non rileva da solo l’indisponibilità completa del database.
6. Dopo credenziali/schema/automazioni/sicurezza verificate, abilitare il solo worker Vercel; poi impostare enabled=true nella tabella privata scheduler. Il form resta OFF. Una modifica di variabili Vercel richiede nuovo deployment.
7. Eseguire E2E sintetico da ambiente server riservato: la preview deve essere accessibile con autenticazione valida, l’intake HTTP deve restare 503, lo script usa esclusivamente fixture in processo, lo scheduler effettivo deve consegnare. Verificare proprietà CRM, ricezione email, duplicati e guasti. Lo script non dimostra da solo assenza di effetti delle automazioni; controllarli nel portale.
8. Solo dopo evidenze complete aggiornare le attestazioni, versione privacy approvata e rilascio esplicito dell’invio pubblico. Non sostituire mai le prove con flag true.

## Conservazione e operatori

365 giorni confermati dal titolare. L’eliminazione automatica riguarda richieste completate; le irrisolte scadute sono conteggiate da retention_review_due e richiedono chiusura/cancellazione motivata. Non lasciare casi irrisolti indefinitamente. Coordinare cancellazione HubSpot e backup; un ripristino deve riapplicare le cancellazioni. Non salvare payload o credenziali negli allarmi.

## Limiti della sessione

La UI del browser non si è avviata: non è stato possibile configurare credenziali tramite pannelli. Un tentativo CLI env run ha creato il progetto separato consultation-resend-check invece di eseguire il controllo; è stato immediatamente sospeso. Il progetto principale è rimasto sul deployment 3f420f9 durante l’incidente. La cancellazione del progetto di prova richiede conferma nel pannello Vercel. Nessuna ricezione email è dichiarata verificata.

Fonti: [Supabase scheduling](https://supabase.com/docs/guides/functions/schedule-functions), [Service Keys HubSpot](https://developers.hubspot.com/changelog/legacy-private-app-creation-sunset), [Next support](https://nextjs.org/support-policy).


## Verifica server con chiavi Sensitive

Le chiavi Supabase e HubSpot sono state inserite dal titolare per Preview e Production; non sono state lette né esportate. Il controllo health live ha confermato accesso al database con la chiave server. La route riservata consultation-preflight verifica account/schema, storage e dominio Resend senza esporre chiavi o dati cliente. Il POST configura esclusivamente il manifest approvato: autenticazione worker, due attestazioni dedicate e scadenza entro due ore sono obbligatorie. Nessun payload arbitrario o scrittura contatti. Disabilitare il setup e ridistribuire dopo il provisioning.
