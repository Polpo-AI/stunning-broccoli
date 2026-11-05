> Documento storico del 5 novembre. Per lo stato corrente vedere `docs/launch-readiness/REPORT.md`, l’informativa `/ricerca/informativa` e [consultazione risultati](RESULTS.md). Le approvazioni privacy successive sono registrate nel report.

# Survey padel — v2

Due percorsi indipendenti: `/ricerca/giocatori` e `/ricerca/circoli`. Sette domande per percorso, riepilogo modificabile e schermata contatto fuori dalle sette domande. Nessun link aggiunto a homepage, navigazione o sitemap. PR #18–23 e #25 sono già integrate nella base `main` aggiornata (bc7a39b al controllo iniziale). La mini-consulenza e la homepage non sono state modificate.

## Prova e confini

- In locale e in preview i percorsi mostrano la prova quando i gate di raccolta sono spenti. In produzione le pagine richiedono gate pubblico e raccolta attivi, progetto autorizzato, versione privacy approvata e retention verificata; per default rispondono 404.
- Con i gate spenti non partono richieste di acquisizione, le risposte restano nella memoria React e il contatto è disabilitato. Ricaricare o chiudere la pagina elimina la prova.
- Con i gate attivi, un invio esplicito dopo il riepilogo salva le risposte senza richiedere un recapito. L’email resta facoltativa ed è acquisita tramite endpoint e tabella distinti con finalità separate.
- Le risposte e i recapiti sono inviati solo ai rispettivi endpoint same-origin quando la raccolta è attiva. Nessuna email o risposta viene conservata in cookie/local/session storage. Nessun link a homepage, navigazione o sitemap.
- `noindex/nofollow/noarchive`, header no-store, referrer disabilitato, CSP con form-action none e connessioni same-origin. Noindex non è controllo accessi: la riservatezza remota dipende dalla protezione dell’hosting.
- Analytics e Speed Insights esclusi per il prefisso `/ricerca`, inclusi eventi tardivi dopo navigazione interna. Dati tecnici e log della piattaforma di hosting/autenticazione restano possibili: non promettiamo anonimato assoluto.

## Decisioni sul questionario

Testi operativi completi in `lib/research/questions.ts`, identificativi stabili e versione `padel-surveys-v2`. Non assegnare valori di default alle scale. “Non so”, “non applicabile”, “nessun problema” e rifiuto di rispondere sono distinti dallo zero.

| Percorso | Domande / logica |
| --- | --- |
| Giocatori | Frequenza negli ultimi 3 mesi; gruppo abituale; canale principale dell’ultima partita; facilità 1–5; occasioni saltate nelle ultime 4 settimane; ostacolo principale; azioni AI accettabili. |
| Gruppo fisso | Ostacoli su coordinamento, campo e sostituzioni, senza presumere desiderio di incontrare nuovi giocatori. Suggerimento AI sul coordinamento degli amici. |
| Gruppo aperto / altro | Include disponibilità dei giocatori e compatibilità; suggerimenti su partite e persone. Nessuna equivalenza presunta tra scale di livello. |
| Playtomic | Approfondimento dentro domanda 3: solo prenotazione, ricerca giocatori / partite aperte, entrambe, non ricordo / rifiuto. Non si deduce matchmaking dal solo uso dell’app. |
| Nessuna partita | Facilità non applicabile, senza richiedere il ricordo di una partita inesistente; percorso resta di 7 passaggi. |
| AI | Distinti suggerimenti, bozza inviata personalmente, prenotazione con conferma, inviti con conferma, prenotazione automatica entro limiti autorizzati, inviti automatici entro limiti autorizzati. Nessuna azione attivata. Nessuna/non so/rifiuto escludono altre scelte. |
| Circoli | Ruolo e fascia campi; strumenti; massimo due problemi nelle ultime 4 settimane; attività di riferimento e ore attive settimanali; soddisfazione 1–5; prima priorità con unico testo libero facoltativo (300 caratteri); interesse a valutare una soluzione integrativa. |
| Ore attive | Si sceglie la più impegnativa tra le attività problematiche indicate; in assenza si può riferire la stima a un’attività o scegliere non applicabile. Somma del lavoro delle persone, esclusi attesa e durata del turno; fasce non sovrapposte. |

Cambiare gruppo/canale/attività invalida le risposte dipendenti. Il riepilogo ricontrolla tutto prima di accedere alla schermata contatto. Nessun interesse è interpretato come disponibilità a pagare, integrazione verificata o consenso marketing.

## Fonti e limiti delle fonti

Letta la conversazione “Analisi integrazione WhatsApp” nei turni disponibili. I sei allegati non sono esposti da `read_thread` (attachments vuoto). Lette sei schede DOCX locali pertinenti: Primo contatto, Gestore, Segreteria, Maestro, Giocatori del set completo e Follow-up/Demo del set refactor. Non è verificabile che siano esattamente le sei versioni caricate nella chat. Consultate anche le revisioni Markdown del 4 novembre e il registro comparativo locale: un solo circolo, nessuna inferenza di diffusione di mercato. Non copiamo interviste, dati personali, trascrizioni o prezzi storici nel repository.

## Prima di raccogliere risposte reali

Prima della raccolta pubblica restano aperti:

1. Informativa di ricerca approvata: titolare e contatto reali, finalità, basi giuridiche, destinatari/fornitori, eventuali trasferimenti, tempi di conservazione, cancellazione e diritti. Stabilire anche destinatari ammessi ed eventuale gestione dei minori. Non riutilizzare la bozza della mini-consulenza.
2. Review indipendente di migrazione, RLS, endpoint, rate limit, gestione errori e viste aggregate; collaudo sul database isolato/branch.
3. Il job `padel-research-retention` è installato e attivo nel progetto del sito; il purge di record sintetici scaduti è stato verificato in PostgreSQL locale. Prima dell’attivazione controllare la prima esecuzione remota in `cron.job_run_details` e definire la procedura per richieste individuali.
4. Verifica dei log tecnici di Vercel e Supabase, WAF, retention dei log e accessi ai risultati. Le chiavi anti-abuso HMAC sono separate dalle risposte e scadono entro 24 ore.
5. Test E2E su deploy protetto con dati sintetici, responsive e accessibilità; autorizzazione esplicita del titolare prima di configurare i gate.

### Contratto dati implementato

La migrazione dedicata è `supabase/migrations/20261105141357_create_padel_research_collection.sql`. Il server valida lo schema prima della scrittura:

- Risposta: `survey_version`, `audience`, `answers` con chiavi e valori enumerati del modulo domande; `priority_detail` facoltativo, massimo 300 caratteri; timestamp server e ID casuale soltanto se necessari. Niente IP/user-agent, identificatori pubblicitari o tracking tra siti nel dataset di ricerca.
- Contatto separato: email e richiesta esplicita di ricontatto sulla ricerca, versione informativa e timestamp server. Nessun identificatore condiviso con le risposte. Il marketing non è raccolto da questa survey.
- Distinguere mancata risposta, rifiuto, non applicabile e zero. Registrare il ramo effettivo; eliminare campi non pertinenti. Non salvare un punteggio unico bisogno/interesse/acquisto.

## Misure di completamento e ricerca

Questa preview non trasmette metriche, né persistenti né aggregate. Non sono ancora stati eseguiti test con partecipanti e non si dichiarano tassi o durate misurati. I tempi in ingresso sono ipotesi da verificare.

Prima di Ads/rilascio, prova osservata con circa 5 persone per percorso, includendo amici fissi, partite aperte, prenotazione Playtomic senza matchmaking e circoli soddisfatti. Con autorizzazione appropriata annotare manualmente: avvii, arrivi al riepilogo, percorso e domanda d’interruzione, durata attiva, errori/aiuti necessari e formulazioni non comprese. Nessun appunto identificativo o screenshot con risposte reali.

Per la successiva raccolta, definire prima: avvio = prima interazione di risposta dopo la conferma di età; completamento = acquisizione server confermata delle 7 domande; tasso = acquisizioni/avvii nello stesso periodo e versione; abbandono per ultimo passaggio con denominatore degli arrivi; durata mediana e percentile 90 escludendo inattività secondo una soglia dichiarata. La schermata facoltativa di ricontatto non cambia il completamento della survey. Non attivare questa telemetria finché privacy e sistema di raccolta non sono approvati.

## Verifica riproducibile

- `npm run test:research`: branch, validazione, limiti, esclusività, invalidazione e gate produzione.
- `npm run typecheck`, `npm run lint`, `npm run build`.
- `scripts/qa-research.cjs`: prova preview con Playwright (Chromium predefinito; `PLAYWRIGHT_CHANNEL` opzionale), build su 3190 e produzione simulata su 3191. Flussi completi, 320/390/768/1440 px, focus, reduced motion, zero richieste mutative/API/telemetria, storage/cookie vuoti, produzione 404, pagine esistenti 200.
- `npm run qa:research:active`: server locale su 3192 con chiavi sintetiche e gate espliciti; Playwright intercetta ogni POST e risponde con esiti sintetici, senza chiamare il database. Verifica retry, risposte mantenute dopo 503, idempotenza frontend, invio senza email, recapito separato e responsive.
- Evidenze sintetiche in `qa/`. La verifica browser usa la build locale. La protezione e lo stato della preview remota sono verificati separatamente e documentati nella Draft PR.

Limiti: non è un audit WCAG completo né una prova su dispositivi fisici/screen reader; la ricerca breve non sostituisce interviste operative, verifica commerciale o tecnica. Nessuna raccolta reale, nessun merge, nessuna pubblicazione in produzione.

### Esito della preview in PR #24 — 5 novembre 2026

7/7 test survey e 40/40 test applicativi mini-consulenza passati (questi ultimi usano adapter fittizi, nessuna consegna reale). Typecheck, lint e build completati. Browser Edge headless sulla build: 17 verifiche layout senza overflow, percorsi completi e modifica branch, selezione da tastiera, focus al titolo e reduced motion verificati. Zero errori pagina, richieste mutative/API/telemetria, cookie e storage. Entrambi i percorsi 404 in ambiente produzione simulato anche con override locale; homepage, contatti e soluzioni 200. Screenshot desktop/mobile ispezionati, compresa scala a 320 px e contatto disabilitato.

Avvisi ereditati non bloccanti della build: utility easing Tailwind ambigua e generazione statica disabilitata per una route edge. Primo caricamento survey circa 116 kB secondo Next. Nessuna dipendenza nuova. Nessun punteggio Lighthouse dichiarato.

Limite di misura: la domanda sul canale rileva il canale principale dell’ultimo episodio. Non selezionare Playtomic non dimostra che non sia stato usato per una prenotazione secondaria o in altre occasioni.

### Esito locale del backend — 5 novembre 2026

16/16 test survey e 46/46 test mini-consulenza; typecheck, lint e build completati prima delle modifiche a età e contatto. Browser Chromium headless: 17 stati layout senza overflow a 320/390/768/1440 px, riduzione motion, preview senza richieste di rete mutative, API o telemetria; flusso active simulato ha verificato retry 503, risposte mantenute, ricontatto ricerca, invio senza email e nessun collegamento tra richieste. SQL della migrazione applicato in PostgreSQL 15 locale usa-e-getta; idempotenza accepted/duplicate/conflict, rate limits e accesso anonimo negato verificati. Due richieste concorrenti con stessa chiave hanno prodotto una sola riga e ricevute accepted/duplicate. **Queste verifiche precedono il gate di età 14+ e l’aggiornamento del contatto; vanno ripetute prima dell’attivazione.**

Nessuna migrazione o scrittura al Supabase remoto; solo lettura metadati/schema. Nessun test con dati reali, CRM, invio email o deploy remoto.

## Raccolta server-side

L’implementazione successiva vive nel branch dedicato e mantiene spente raccolta e visibilità pubblica per default. Vedere [IMPLEMENTATION.md](IMPLEMENTATION.md) per schema, gate, migrazione, test e checklist; [PRIVACY-DRAFT.md](PRIVACY-DRAFT.md) è un’informativa separata ancora in bozza e non approvata. Nessuna raccolta reale è autorizzata da questo documento.
