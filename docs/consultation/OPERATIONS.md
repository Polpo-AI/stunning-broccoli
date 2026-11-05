# Configurazione e attivazione — mini-consulenza

## Stato iniziale della PR #18 (storico)

Anteprima funzionante, invio **disabilitato**. Nessuna migrazione remota, nessuna credenziale aggiunta, nessun contatto HubSpot reale creato, nessuna notifica reale inviata. I test PostgreSQL locali dimostrano il comportamento del codice SQL, non l'esistenza di una coda operativa nel progetto Supabase del sito.

La pagina pubblica `/contatti` conserva il comportamento precedente quando la feature è spenta. Il wizard e `/privacy` in bozza sono visibili in sviluppo/preview; `/privacy` risponde 404 in produzione finché il documento definitivo non viene implementato e revisionato. La bozza ha `noindex`; non è inserita nella sitemap. Nessuna nuova pagina commerciale interna viene introdotta.

## Variabili e segreti

Elenco completo: [`.env.consultation.example`](../../.env.consultation.example). Nessun valore `NEXT_PUBLIC_*`: chiavi Supabase service role, HubSpot, Resend, HMAC e worker restano solo sul server. Configurare attraverso il secret manager/Vercel, separando Preview e Production, senza incollare credenziali in chat o nei log.

| Configurazione | Verifica necessaria |
| --- | --- |
| `POLPO_LEADS_SUPABASE_URL`, `PROJECT_REF`, `SERVICE_ROLE_KEY` | Progetto **già esistente del sito Polpo AI**, separato da Polpo Padel; URL e ref devono coincidere. Non riutilizzare le vecchie variabili generiche. Conferma con `POLPO_LEADS_SITE_PROJECT_CONFIRMED` dopo verifica nel dashboard. |
| `POLPO_PADEL_PROJECT_REF` | Facoltativo, solo ref non segreto, permette anche un rifiuto esplicito della coincidenza. Non è un'autorizzazione a connettersi a Padel. |
| `POLPO_CONSULTATION_HMAC_KEY` | Segreto casuale stabile di almeno 32 caratteri. La rotazione modifica chiavi di deduplica e identità telefoniche: richiede migrazione controllata. |
| `POLPO_LEADS_RETENTION_DAYS` | Nessun default. Durata 7–730 giorni da validare nella privacy; non rappresenta una raccomandazione legale. |
| `POLPO_HUBSPOT_ACCESS_TOKEN`, `PORTAL_ID` | Private app limitata al portale corretto. Scope contatti lettura/scrittura, aziende lettura; schema contatti in lettura per il preflight. Nessuno scope deal o aziende scrittura è necessario al worker. Verificare scope effettivi della API datata e piano nel portale. |
| `POLPO_HUBSPOT_COMPANY_DOMAIN_ALLOWLIST` | Vuota di default: associazioni nuove tutte manuali. Inserire solo domini aziendali verificati dal titolare; il worker cerca una singola azienda già esistente, esclude provider personali e conserva associazioni esistenti. Non crea aziende. |
| `POLPO_RESEND_API_KEY`, `POLPO_RESEND_FROM` | Dominio mittente verificato, indirizzo semplice. Destinatario server fisso `info@polpo-ai.com`. La mail contiene riferimento, settore e data, senza recapiti o testo libero. |
| `POLPO_CONSULTATION_WORKER_SECRET` | Segreto casuale almeno 32 caratteri, header `Authorization: Bearer …`, mai query string. |
| `POLPO_CONSULTATION_ALLOWED_ORIGINS` | Origin HTTPS esatte separate da virgola; la deployment URL Vercel preview viene aggiunta solo in Preview. Non usare wildcard. |

I flag `*_VERIFIED`, `*_REVIEWED`, `*_APPROVED` sono attestazioni **successive alle prove**, non scorciatoie per attivare il form. Anche impostandoli tutti, la privacy `draft` nel codice impedisce l'invio. Servono revisione del documento/versione nel codice, pagina definitiva e `POLPO_PRIVACY_VERIFIED_VERSION` corrispondente. `POLPO_CONSULTATION_ENABLED=false` mantiene il blocco; gli eventi applicativi richiedono anche `POLPO_CONSULTATION_ANALYTICS_ENABLED=true` e tutti i gate.

## Migrazione e worker

1. Verificare progetto sito, regione, contratto, accessi e backup; applicare `supabase/migrations/20261105003702_polpo_consultation.sql` solo a quel progetto dopo revisione. RLS e RPC non accessibili ad `anon`/`authenticated`; la service role resta server-only. Non utilizzare il database di Padel per prove.
2. Verificare acquisizione atomica e permessi con dati sintetici. Transazione unica per richiesta + idempotenza. Il browser riceve 202 `acquired` solo dopo la ricevuta del database; non significa `synced`.
3. Configurare uno scheduler affidabile per `POST /api/internal/consultation-deliveries` (o GET autenticato). Il worker ha un gate separato `POLPO_CONSULTATION_DELIVERY_ENABLED` (false di default): può essere abilitato per consegnare richieste sintetiche quando storage, credenziali, schema, automazioni del portale e sicurezza sono verificati, anche con invio pubblico OFF e privacy draft. Non abilita il form né l’endpoint pubblico. Nessun cron è stato aggiunto automaticamente: disponibilità, piano, frequenza e segreto vanno verificati. Suggerita cadenza iniziale 1 minuto solo se supportata dal piano; dimensionare throughput e timeout prima di attestare la verifica. Ogni invocazione processa al massimo tre job e avvia nuovi job per al massimo 20 secondi; configurazione funzione 60 secondi. Controllare il limite effettivo del piano.
4. Lease di due minuti, `SKIP LOCKED`, checkpoint per canale. Consegne esterne entro timeout di 4,5 secondi per chiamata, storage entro 5 secondi. Le richieste dello stesso contatto vengono ordinate per il CRM; una richiesta più nuova non supera una precedente ancora pending. Le notifiche restano indipendenti. Esecuzioni duplicate non devono creare due job attivi per la stessa richiesta.
5. Backoff esponenziale da 60 secondi a massimo 24 ore, rispetto di `Retry-After`, massimo otto tentativi per canale. Errori permanenti restano `failed`; non vengono scartati. Nessuna promessa di exactly-once esterno: idempotenza, identità CRM, checkpoint e revisione gestiscono le risposte ambigue.

## HubSpot

`node scripts/consultation-hubspot-schema.cjs` esporta il gruppo e le 18 proprietà proposte, inclusa `polpo_contact_key` unica. Non scrive nel CRM. Configurare lo schema nel portale corretto; `node scripts/consultation-hubspot-schema.cjs --check` esegue solo lettura e segnala proprietà mancanti/tipi/enum/unicità. Non verifica da solo identità del portale, workflow o consegna.

Verificare e disabilitare automazioni del portale che creano automaticamente aziende/deal o iscrivono ogni contatto al marketing. L'adapter non crea trattative né aziende, e non modifica subscription marketing. L'opt-in registra **evidenza** del consenso email, non iscrizione automatica: l'uso marketing richiede una procedura del titolare e configurazione delle subscription verificata. Checkbox non selezionata non revoca un consenso precedente. Le richieste storiche restano nel database durante la retention; le proprietà CRM rappresentano l'ultima richiesta.

Il matching senza email usa HMAC di telefono + nome + attività per non fondere persone che condividono un centralino. Cambi di recapito o passaggi telefono→email richiedono revisione manuale: nessun merge automatico tra identità diverse.

## Monitoraggio, recupero e conservazione

Prima di attivare, configurare allarmi e un responsabile per: scheduler senza heartbeat, oldest pending superiore a 10 minuti, `failed` > 0, worker 401/503, provider 429 ripetuti, lease scadute ricorrenti. Soglie operative iniziali da confermare. Non includere payload o risposte provider negli allarmi. La PR non provisiona un servizio di monitoraggio: finché assente, flag monitoraggio falso.

Query riservata aggregata, senza dati personali:

```sql
select crm_status, notification_status, count(*) as requests,
       min(acquired_at) as oldest_acquired_at
from public.polpo_consultation_requests
group by crm_status, notification_status;
```

Correggere la causa prima di `select public.polpo_consultation_redrive('<request UUID>');` con ruolo operatore autorizzato. La funzione conserva consegne già riuscite. Le notifiche ambigue oltre 23 ore dal primo tentativo richiedono controllo manuale nel provider, perché la sua idempotenza dura 24 ore; redrive da solo non supera questo blocco. Non azzerare alla cieca il timestamp per reinviare una mail già accettata.

La maintenance elimina limiti dopo circa due giorni, eventi dopo 30 giorni e richieste **completate** oltre la retention configurata. Le irrisolte restano da revisionare, con procedura di cancellazione/escalation e scadenza da validare: non una conservazione indefinita autorizzata. Validare separatamente conservazione delle prove consenso, cancellazione in CRM/backup e richieste di esercizio dei diritti. Proteggere l'accesso operatori all'archivio.

## Antiabuso e misurazione

Body massimo 12 KiB, enum chiusi, limiti testo, honeypot, controllo Origin e rate limit DB: cinque nuovi tentativi/IP/15 minuti e tre/identità/15 minuti. Retry dello stesso key/payload restituisce la stessa ricevuta. Fingerprint identico con key diversi si accorpa per 15 minuti. IP HMAC con finestra giornaliera, mai IP in chiaro nel nuovo database. I limiti applicativi non sostituiscono il firewall: configurare WAF Vercel per endpoint, traffico invalidato prima del DB e protezione bot; verificare false positive su reti condivise.

Il codice presume l'edge Vercel che riscrive `x-forwarded-for`. Se si introduce un proxy diverso, verificare la catena fidata prima dell'attivazione. Nessun dato personale nei parametri URL, eventi o log del nuovo percorso. Verificare anche log infrastrutturali/retention, session replay ed eventuali futuri tag esterni. Analytics globali preesistenti non ricevono campi del form dal nuovo codice.

Eventi solo allowlist nome+fase+identificatore casuale, deduplicati client e DB. Session storage contiene solo ID casuale, data e chiavi evento, non risposte. L'uscita è una stima via `pagehide`/beacon, non una misura certa di abbandono. Non alimenta GA4 o Meta Pixel. Valutare anche lo storage di sessione nella privacy.

## Checklist E2E reale — ancora da eseguire

- Privacy/controller/vendors approvati; piattaforma Next fuori supporto revisionata e vulnerabilità risolte prima del rilascio. Non basta un flag.
- Progetto sito e portale verificati, schema applicato, scheduler/monitoraggio configurati; test in ambiente protetto, senza invio pubblico.
- Avviare `node scripts/consultation-e2e.cjs --write-synthetic` da ambiente server autorizzato, con `POLPO_SYNTHETIC_E2E_ALLOWED=true` e `POLPO_E2E_BASE_URL` della preview protetta. Il comando esercita l’intake in processo con dati sintetici e lascia che sia il vero scheduler a consegnare; non modifica il gate HTTP pubblico. Nessun bypass segreto viene esposto nel sito. Payload sintetico email con marketing false: 202 solo dopo commit, una richiesta DB, un contatto CRM leggibile con proprietà attese; nessuna azienda/deal nuova né iscrizione marketing.
- Solo telefono; opt-in email true separato; Gmail/Outlook e dominio ambiguo → manual review; dominio verificato con unica azienda esistente → associazione; nessuna azienda duplicata.
- Stesso invio ripetuto, timeout ambiguo, CRM down/429/403, email down, worker interrotto e lease scaduta: richiesta sempre recuperabile, canali indipendenti, retry senza duplicati. Verificare notifica ricevuta a info e stati separati.
- Verificare riavvio/scheduler e readback remoto. Registrare solo riferimenti sintetici, timestamp, esiti e prove di monitoraggio, senza token o dati personali nei report. Rimuovere i record sintetici secondo procedura concordata.
- Solo dopo: attestazioni dei gate, approvazione del titolare e rilascio esplicito. Questa PR resta draft fino ad allora.

Fonti primarie: [HubSpot contatti](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/contacts/guide), [proprietà](https://developers.hubspot.com/docs/api-reference/latest/crm/properties/guide), [associazioni](https://developers.hubspot.com/docs/api-reference/latest/crm/associations/associate-records/guide), [header Vercel](https://vercel.com/docs/headers/request-headers), [idempotenza Resend](https://resend.com/docs/dashboard/emails/idempotency-keys). API HubSpot fissate alla versione `2026-09`; compatibilità effettiva del portale da verificare nell'E2E.


## Stato corrente — 5 novembre 2026

Lo stato verificato è in [ACTIVATION.md](ACTIVATION.md). Il rifiuto CRM è stato ricondotto alla proprietà nativa hs_legal_basis obbligatoria nel portale. La creazione minima con il connettore e la successiva sincronizzazione con il worker sono riuscite sul contatto sintetico; email ricevuta una sola volta, idempotenza verificata e monitor manuale recuperato.

La correzione richiede una base giuridica runtime esplicita quando il contatto non ne ha già una. Proposta e limiti in [LEGAL-BASIS-REVIEW.md](LEGAL-BASIS-REVIEW.md); nessuna scelta automatica per i contatti reali. Il piano hosting è rimandato dal titolare al lancio, la privacy resta draft e il pubblico resta spento. La prova browser → nuova creazione tramite worker, gli avvisi automatici, l'approvazione privacy e gli accordi/piano applicabili restano prerequisiti finali.

Le indicazioni originarie sopra su assenza di migrazioni/credenziali, manifest di 18 proprietà e private app sono storiche. Il manifest attuale riusa cinque proprietà italiane e contiene 21 proprietà totali; usa una Service Key. Il worker ha maxDuration 120 secondi e avvia nuovi job per massimo 20 secondi. La conservazione coordinata richiede revisione da 335 giorni e conferma CRM prima della cancellazione dall'archivio. Nessun marketing al primo avvio.
