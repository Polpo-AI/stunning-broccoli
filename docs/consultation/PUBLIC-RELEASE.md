# Verifica e apertura pubblica — 5 novembre 2026

Il titolare ha approvato il testo privacy e ha chiesto esplicitamente di aprire il modulo ai contatti pubblici. È stato informato del limite del piano Vercel Hobby per uso commerciale e dell'applicabilità del DPA ai piani Pro/Enterprise; nessun abbonamento è stato acquistato. Tale punto non viene dichiarato risolto o conforme da un flag tecnico.

## Cambiamenti

- Testo privacy allineato alla gestione del ricontatto CRM, alla conservazione coordinata e ai destinatari della corrispondenza; nessuna promessa che tutti gli accordi siano già verificati. Versione 2026-11-05-v1 approvata come testo dal titolare.
- Valore runtime hs_legal_basis configurato a Legitimate interest – prospect/lead per la gestione della consulenza spontaneamente richiesta; nessun consenso newsletter né iscrizione marketing.
- Prova end-to-end temporanea su /contatti/prova, con accesso HTTP Basic dedicato ad alta entropia, sola produzione, massimo 24 ore. Credenziale separata da tutte le chiavi di servizio. Verifica ripetuta anche nella pagina e nella route, non soltanto nel middleware.
- La prova usa lo stesso wizard, intake atomico, Supabase, worker, HubSpot ed email. Il server accetta soltanto identità e testo sintetici prefissati; campi fissi in sola lettura. La privacy_version viene marcata synthetic-production. Nessun valore privato in URL, log o analytics; CSP connect-src self e metriche escluse dal percorso riservato.
- La route pubblica non riceve alcun bypass: resta legata alle attestazioni. La prova temporanea verrà disabilitata dopo il collaudo, prima del rilascio pubblico. Le notifiche sintetiche hanno prefisso [TEST].

## Verifiche completate prima del deploy

54 test applicativi e build con lint/typecheck passati. Browser locale Edge: 320/390/768/1440, percorso in cinque fasi e multiselezione con principale esplicito, acquisizione 202 simulata, ricevuta, nessun errore JS; accesso anonimo 401, dati reali sulla prova 422, Origin esterno 403, endpoint pubblico ancora 503. Tutte le credenziali locali sono sintetiche e un blocco fetch impedisce chiamate server fuori da localhost. La prova locale usa un adapter HTTP fittizio; non è una prova di consegna reale.

## Passi successivi

1. Deploy con solo test riservato attivo; la raccolta pubblica resta OFF.
2. Browser in produzione: nuova richiesta sintetica → commit DB → worker effettivo → nuovo contatto HubSpot → notifica team. Readback e duplicati; controlli marketing e associazioni. Aggiornare le attestazioni soltanto dopo l'evidenza.
3. Disabilitare il test temporaneo e abilitare il pubblico su richiesta esplicita del titolare. Controllare form, privacy e rifiuto di input invalidi/Origin estranei, senza creare richieste cliente fittizie non dichiarate.
4. Mantenere distinta la riuscita tecnica dalle verifiche contrattuali del piano, dai backup e dalla ricezione degli avvisi. Non dichiarare un SLA di GitHub Actions. Il referente delle richieste e delle scadenze è il titolare, come confermato.
