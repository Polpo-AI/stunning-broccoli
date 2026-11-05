# Mini-consulenza — stato operativo del 5 novembre 2026

**Invio pubblico disabilitato. Privacy ancora draft.** Il titolare ha rimandato la scelta del piano hosting al lancio. Non aprire il modulo finché i prerequisiti finali non sono completati.

## Configurato e verificato

- Supabase sito `llbqoyucmvuijfobzryj`, eu-west-1; nessun utilizzo del progetto Padel. Migrazioni originali `20261105003702`, `20261105004824` e operativa `20261105084525` applicate. RLS e funzioni riservate al server; gli INFO RLS senza policy sono intenzionali per impedire accesso client.
- HubSpot account `149703632`, schema di 21 proprietà verificato, chiave identità univoca e opzione telefono configurate. Il titolare ha verificato automazioni disattivate. Setup schema ora disabilitato.
- Scheduler Supabase autorizzato ogni minuto. Heartbeat e risposte HTTP 200 effettive osservati. La health ora distingue esito HTTP/timeout da semplice heartbeat.
- Email sintetica ricevuta a info@polpo-ai.com, un solo invio. La ripresa del CRM non ha reinviato la notifica.
- Invio HTTP pubblico 503; worker senza credenziale 401. Nessuna modifica ai gate per forzare l'apertura.

## Causa CRM individuata e prova riuscita

Il payload conteneva già email e nome. Il connettore HubSpot ha identificato una regola aggiuntiva di creazione: **hs_legal_basis obbligatoria**. Non era visibile nel controllo del modulo e la risposta runtime restituiva soltanto VALIDATION_ERROR. Nessuna impostazione del portale è stata rimossa per aggirarla.

Con autorizzazione alle prove sul solo contatto sintetico, il connettore ha creato il contatto con base `Legitimate interest - other`, per il test interno senza dati cliente reali. Il worker ha poi sincronizzato la richiesta originale sul contatto esistente:

- Richiesta `0fa68b8d-397c-4770-bda1-941274000cf4`: CRM synced, errore nullo, notification sent, un tentativo email; nessuna azienda associata dal worker.
- [Contatto sintetico](https://app.hubspot.com/contacts/149703632/record/0-1/913479597264?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=fetch): settore sport, prodotto automazioni_ai, problema principale messaggi, problemi messages, strumento whatsapp, origine analisi_gratuita, opt-in richiesta false, associazione manual_review, versione privacy esplicitamente sintetica.
- Ricerca sul solo recapito sintetico: zero risultati per marketing=true e zero per trattative associate >0. I valori vuoti non sono dichiarati come false numerico.
- Idempotenza RPC: accepted, duplicate=true, stesso riferimento. Nessuna seconda richiesta creata.

**Limite della prova:** la creazione minima è avvenuta tramite connettore, l'aggiornamento completo tramite worker reale. Non è ancora una prova browser → nuova creazione CRM tramite worker. Non impostare E2E_VERIFIED sulla sola base di questa prova.

## Correzione della creazione nel sito

L'adapter legge hs_legal_basis insieme al contatto e conserva qualunque valore già presente. Se manca, deve ricevere una configurazione esplicita supportata; in caso contrario si ferma prima della scrittura. Non presume consenso, non usa Not applicable e non cambia subscription marketing.

La variabile server `POLPO_HUBSPOT_CONTACT_LEGAL_BASIS` resta da scegliere al lancio dopo la revisione del titolare. Sono supportati gli esatti valori portale `Legitimate interest – prospect/lead` e `Performance of a contract`, secondo la situazione effettiva. Non sono scelte giuridiche automatiche. L'assenza di configurazione impedisce l'invio pubblico. Il worker può completare una richiesta riferita a un contatto che abbia già una base valida registrata, conservandola.

49 test applicativi e build con lint/typecheck passati, inclusi nuova creazione con base configurata, preservazione del valore dell'operatore e blocco senza configurazione o con esenzione/consenso presunto.

## Monitor e conservazione

Workflow GitHub attivo e variabile abilitata. Test manuale di errore verificato (run 41998403107); prova di recupero avviata dopo la sincronizzazione. Prima del lancio verificare anche esecuzione automatica effettiva e ricezione degli avvisi: nell'inventario precedente non erano presenti run con evento schedule. Il servizio non ha un SLA.

Avviso di revisione da 335 giorni; scadenza ordinaria 365 giorni. La cancellazione dall'archivio completato richiede la conferma della gestione del dato nel CRM tramite RPC operatore `polpo_consultation_retention_resolve`. Una scadenza mancata resta un allarme da risolvere, non una conservazione indefinita autorizzata. Il titolare ha confermato che gestirà richieste, avvisi, diritti e scadenze.

Prima di eliminare un contatto esistente, verificare eventuali rapporti distinti e associazioni; documentare nel registro riservato l'eventuale conservazione per diversa finalità, senza dati personali nel repository. I ripristini devono riapplicare le cancellazioni. Backup e ciclo log effettivi del piano devono essere verificati prima dell'apertura.

## Prerequisiti finali

1. Piano Vercel adatto e accordo dati applicabile: team verificato Hobby; scelta rimandata dal titolare al lancio. Nessun acquisto effettuato.
2. Revisione del titolare della base giuridica CRM e dell'informativa; versione documento e codice allineati. Testo ancora draft.
3. Configurazione esplicita del valore legale verificato nel portale; preflight deve confermare l'opzione.
4. Ricezione avvisi ed esecuzione automatica del monitor, prova completa di nuova acquisizione/creazione tramite il sito, inclusi recuperi e duplicati.
5. Solo dopo evidenze complete: aggiornare le attestazioni e aprire l'invio con verifica immediata. Nessun marketing al primo avvio.

Fonti: [HubSpot basi giuridiche](https://knowledge.hubspot.com/contacts/how-can-i-track-lawful-basis-of-processing-in-hubspot), [EDPB trattamento lecito](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel DPA](https://vercel.com/legal/dpa).
