# Consultare i risultati delle survey

L’accesso è riservato al titolare e agli operatori autorizzati del progetto **Sito Polpo AI**:
https://supabase.com/dashboard/project/llbqoyucmvuijfobzryj/editor

Nel Table Editor selezionare lo schema `research_private`:

- `survey_responses`: risposte giocatori/circoli, senza email, con scadenza a 90 giorni.
- `survey_contacts`: richieste di ricontatto separate, senza collegamento alle risposte; nessun marketing.
- `response_distribution`: distribuzione per domanda e risposta. Le celle sotto cinque partecipanti sono soppresse: una vista vuota con poche risposte è prevista.
- `consent_evidence`: solo prova del consenso, fascia d’età e revoca; massimo 24 mesi dall’acquisizione. Non esportare insieme a risposte e recapiti.

In SQL Editor (https://supabase.com/dashboard/project/llbqoyucmvuijfobzryj/sql/new):

```sql
-- Partecipazione: include anche i gruppi piccoli nell’area riservata del titolare.
select survey_type, survey_version, count(*) as risposte
from research_private.survey_responses
where status='active' and expires_at > now()
group by survey_type, survey_version;

-- Distribuzioni, senza testo libero né identificatori e con soglia di cinque.
select * from research_private.response_distribution
order by survey_type, question_id, response_count desc;

-- Analisi interna delle risposte, senza codici tecnici o prove di consenso.
select survey_type, survey_version, answers, priority_detail, acquired_at, expires_at
from research_private.survey_responses
where status='active' and expires_at > now()
order by acquired_at desc;
```

Non c’è una dashboard pubblica delle risposte: `anon` e `authenticated` non hanno accesso allo schema, alle tabelle, alla vista o agli RPC. Non inserire la service role nel browser. L’accesso dal dashboard richiede l’account Supabase autorizzato.

## Revoca e richieste individuali

Dopo l’invio il partecipante riceve due codici distinti, uno per le risposte e uno per il recapito se fornito. La pagina `/ricerca/revoca` li invia nel corpo della richiesta, mai nell’URL. Conservare i codici prima di chiudere o ricominciare. Il server conserva solo un HMAC; non può recuperare il codice in chiaro.

La revoca cancella immediatamente il relativo record e annota la data nella prova del consenso. La durata massima della prova resta 24 mesi dall’acquisizione, senza proroga alla revoca. Un retry con lo stesso codice non ricrea dati revocati.

Chi ha perso il codice può chiedere la cancellazione del recapito scrivendo a info@polpo-ai.com dall’indirizzo fornito: il titolare verifica la richiesta e cancella tutti i record di `survey_contacts` corrispondenti, annotando la revoca nelle rispettive prove usando `idempotency_hash`. Non tentare di collegare il recapito alle risposte. Se non è possibile individuare una risposta senza codice, comunicarlo all’interessato. Nessun invio marketing o sincronizzazione HubSpot per le survey.

Il job giornaliero `padel-research-retention` esegue `public.research_delete_expired()` alle 03:17 UTC. I termini sono scadenze per la cancellazione giornaliera, non promesse relative ai backup infrastrutturali. Gli snapshot e i log seguono i cicli dei fornitori.
