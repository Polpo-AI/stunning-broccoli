# Survey padel private — v1

Due percorsi indipendenti: `/ricerca/giocatori` e `/ricerca/circoli`. Sette domande per percorso, riepilogo modificabile e schermata contatto fuori dalle sette domande. Nessun link aggiunto a homepage, navigazione o sitemap. Base `origin/main` a `baf5f4b`; PR #18 già integrata prima di questo lavoro. Nessuna modifica al dominio mini-consulenza, al suo backend o al refactor homepage parallelo.

## Prova e confini

- `npm ci`, `npm run dev`: percorsi disponibili soltanto in sviluppo. Per provare una build locale: impostare `RESEARCH_LOCAL_PREVIEW=1`, poi `npm run build` e `npm start -- --hostname 127.0.0.1 --port 3190`.
- Vercel Preview: disponibili con `VERCEL_ENV=preview`; mantenere la protezione Vercel Authentication. `VERCEL_ENV=production` prevale su ogni override e restituisce 404. Senza Vercel, una build produzione è chiusa salvo override locale esplicito: non configurarlo su hosting pubblico.
- Nessun endpoint di acquisizione, SDK database, credenziale, local/session storage, cookie, beacon, evento analytics o salvataggio. Stato React in memoria, cancellato a fine prova, al reset o ricaricando. Nessun messaggio di “risposte ricevute”. Usare esclusivamente dati fittizi.
- Email e due consensi separati visibili ma disabilitati; nessun nome, telefono, circolo, indirizzo o ruolo aggiuntivo nel contatto. Non è possibile trasformare il form in raccolta attiva cambiando una variabile.
- `noindex/nofollow/noarchive`, header no-store, referrer disabilitato, CSP con form-action none e connessioni same-origin. Noindex non è controllo accessi: la riservatezza remota dipende dalla protezione dell’hosting.
- Analytics e Speed Insights esclusi per il prefisso `/ricerca`, inclusi eventi tardivi dopo navigazione interna. Dati tecnici e log della piattaforma di hosting/autenticazione restano possibili: non promettiamo anonimato assoluto.

## Decisioni sul questionario

Testi operativi completi in `lib/research/questions.ts`, identificativi stabili e versione `padel-surveys-v1`. Non assegnare valori di default alle scale. “Non so”, “non applicabile”, “nessun problema” e rifiuto di rispondere sono distinti dallo zero.

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

Dipendenze ancora aperte, nessuna risolta da questa preview:

1. Informativa di ricerca approvata: titolare e contatto reali, finalità, basi giuridiche, destinatari/fornitori, eventuali trasferimenti, tempi di conservazione, cancellazione e diritti. Stabilire anche destinatari ammessi ed eventuale gestione dei minori. Non riutilizzare la bozza della mini-consulenza.
2. Backend dedicato, validazione server dello schema e dei branch, limiti body/testo/richieste, idempotenza e anti-abuso. Salvataggio atomico prima di confermare ricezione; gestione errori/retry senza duplicati. Nessuna chiave privilegiata nel browser.
3. Separazione tecnica e accessi minimi per risposte e recapiti; verifica permessi, conservazione e cancellazione su dati sintetici. Evitare collegamento tra risposta e contatto salvo necessità esplicita documentata; con contatto collegato non parlare di anonimato.
4. Consenso al ricontatto di ricerca distinto da marketing, entrambi facoltativi e non preselezionati; registrare versione del testo e data solo quando la raccolta è attiva. Partecipazione senza recapito e senza marketing. Rifiuto marketing non blocca il ricontatto di ricerca. Non iscrivere automaticamente a newsletter/CRM.
5. Verifica del trattamento dei dati tecnici da hosting, autenticazione e log; nessun testo libero o recapito in log, URL o analytics. Revisione di sicurezza e test del flusso di acquisizione reale separati da quelli di questa preview.

### Contratto dati proposto per una fase successiva

Nessun record viene creato ora. Proposta da implementare e validare sul server prima dell’attivazione:

- Risposta: `survey_version`, `audience`, `answers` con chiavi e valori enumerati del modulo domande; `priority_detail` facoltativo, massimo 300 caratteri; timestamp server e ID casuale soltanto se necessari. Niente IP/user-agent, identificatori pubblicitari o tracking tra siti nel dataset di ricerca.
- Contatto separato: email, finalità scelte, versione informativa/testi consenso, timestamp server. Nessun identificatore condiviso con le risposte per default. La finalità marketing non si ricava dall’interesse all’AI o all’integrazione.
- Distinguere mancata risposta, rifiuto, non applicabile e zero. Registrare il ramo effettivo; eliminare campi non pertinenti. Non salvare un punteggio unico bisogno/interesse/acquisto.

## Misure di completamento e ricerca

Questa preview non trasmette metriche, né persistenti né aggregate. Non sono ancora stati eseguiti test con partecipanti e non si dichiarano tassi o durate misurati. I tempi in ingresso sono ipotesi da verificare.

Prima di Ads/rilascio, prova osservata con circa 5 persone per percorso, includendo amici fissi, partite aperte, prenotazione Playtomic senza matchmaking e circoli soddisfatti. Con autorizzazione appropriata annotare manualmente: avvii, arrivi al riepilogo, percorso e domanda d’interruzione, durata attiva, errori/aiuti necessari e formulazioni non comprese. Nessun appunto identificativo o screenshot con risposte reali.

Per la successiva raccolta, definire prima: avvio = prima interazione di risposta; completamento = acquisizione server confermata delle 7 domande; tasso = acquisizioni/avvii nello stesso periodo e versione; abbandono per ultimo passaggio con denominatore degli arrivi; durata mediana e percentile 90 escludendo inattività secondo una soglia dichiarata. Schermata contatto e opt-in marketing hanno denominatori separati e non cambiano il completamento della survey. Non attivare questa telemetria finché privacy e sistema di raccolta non sono approvati.

## Verifica riproducibile

- `npm run test:research`: branch, validazione, limiti, esclusività, invalidazione e gate produzione.
- `npm run typecheck`, `npm run lint`, `npm run build`.
- `scripts/qa-research.cjs`: richiede Playwright già disponibile (`PLAYWRIGHT_MODULE` opzionale) e Edge; build servita in loopback su 3190 con override locale e su 3191 con `VERCEL_ENV=production`. Flussi completi, 320/390/768/1440 px, focus, campi disabilitati, zero richieste mutative/API/telemetria, storage/cookie vuoti, produzione 404, pagine esistenti 200.
- Evidenze sintetiche in `qa/`. La verifica browser usa la build locale. La protezione e lo stato della preview remota sono verificati separatamente e documentati nella Draft PR.

Limiti: non è un audit WCAG completo né una prova su dispositivi fisici/screen reader; la ricerca breve non sostituisce interviste operative, verifica commerciale o tecnica. Nessuna raccolta reale, nessun merge, nessuna pubblicazione in produzione.

### Esito locale del 5 novembre 2026

7/7 test survey e 40/40 test applicativi mini-consulenza passati (questi ultimi usano adapter fittizi, nessuna consegna reale). Typecheck, lint e build completati. Browser Edge headless sulla build: 17 verifiche layout senza overflow, percorsi completi e modifica branch, selezione da tastiera, focus al titolo e reduced motion verificati. Zero errori pagina, richieste mutative/API/telemetria, cookie e storage. Entrambi i percorsi 404 in ambiente produzione simulato anche con override locale; homepage, contatti e soluzioni 200. Screenshot desktop/mobile ispezionati, compresa scala a 320 px e contatto disabilitato.

Avvisi ereditati non bloccanti della build: utility easing Tailwind ambigua e generazione statica disabilitata per una route edge. Primo caricamento survey circa 116 kB secondo Next. Nessuna dipendenza nuova. Nessun punteggio Lighthouse dichiarato.

Limite di misura: la domanda sul canale rileva il canale principale dell’ultimo episodio. Non selezionare Playtomic non dimostra che non sia stato usato per una prenotazione secondaria o in altre occasioni.
