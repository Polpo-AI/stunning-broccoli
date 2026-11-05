# Avvio mini-consulenza — interventi del 5 novembre 2026

Il pubblico resta spento durante queste modifiche. La prova CRM è ancora in corso: il dominio sintetico .test era rifiutato con INVALID_EMAIL; corretto il solo recapito della fixture con un alias di polpo-ai.com, è emerso un ulteriore HTTP 400. Nessuna email del team è stata reinviata (canale sent preservato).

Questa modifica aggiunge diagnostica CRM basata solo su motivi tecnici in allowlist, anche annidati nei messaggi provider, senza riportare valori o messaggi integrali.

Il monitor ora verifica risposta HTTP e timeout del worker oltre al solo heartbeat. La migrazione memorizza esclusivamente stato numerico, data e timeout della risposta precedente, senza header, corpi o segreti. Un avvio fallito del worker non può risultare sano soltanto perché cron continua a girare.

Conservazione coordinata: avviso da 335 giorni, scadenza a 365. La maintenance non elimina una richiesta completata prima della verifica CRM dell'operatore. Dopo aver cancellato i dati di consulenza dal CRM (o documentato una finalità distinta e giustificata), l'operatore conferma con la RPC server-only polpo_consultation_retention_resolve. Le richieste irrisolte e quelle oltre scadenza generano un allarme: sono incidenti da chiudere, non un rinnovo automatico del termine. Non cancellare contatti esistenti che servono per rapporti distinti senza controllare finalità e associazioni. Nessuna cancellazione reale eseguita in questa sessione.

Test: 44 applicativi, build con lint/typecheck; PostgreSQL locale usa migrazioni reali e stub di net/Vault per verificare risposta worker, avvisi, mancata cancellazione prematura, conferma operatore e permessi. Nessuna connessione del test SQL a servizi reali.

La privacy resta draft fino alla versione finale e alla conferma del titolare delle responsabilità operative. Le informative pubbliche dei fornitori non dimostrano da sole tutte le impostazioni o gli accordi dello specifico account. Nessuna attivazione pubblica implicita da questo documento.
