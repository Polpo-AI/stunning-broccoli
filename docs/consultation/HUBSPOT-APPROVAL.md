# Schema HubSpot da approvare

Account: 149703632. Le cinque proprietà commerciali esistenti vengono riutilizzate. Unica estensione proposta alle loro opzioni: aggiunta di `telefono` a `polpo_strumenti`, preservando tutte le opzioni attuali. Nessuna nuova pipeline, azienda, trattativa o iscrizione marketing. Le classificazioni commerciali già compilate dagli operatori non vengono sovrascritte.

## Campi aggiuntivi proposti

| Nome interno | Etichetta | Tipo | Vincoli |
| --- | --- | --- | --- |
| `polpo_contact_key` | Polpo — chiave identità | Testo | Univoco, necessario per contatti solo telefono |
| `polpo_problems` | Polpo — problemi operativi | Scelta multipla | Prenotazioni, Messaggi, Promemoria e cancellazioni, Operazioni manuali, Integrazioni |
| `polpo_management_software` | Polpo — gestionale | Testo |  |
| `polpo_operational_context` | Polpo — contesto operativo | Testo |  |
| `polpo_request_id` | Polpo — ultima richiesta | Testo |  |
| `polpo_received_at` | Polpo — acquisizione richiesta | Data e ora |  |
| `polpo_business_name` | Polpo — attività dichiarata | Testo |  |
| `polpo_full_name` | Polpo — nome dichiarato | Testo |  |
| `polpo_contact_preference` | Polpo — preferenza contatto | Scelta | Non indicata, Email, Telefono |
| `polpo_source` | Polpo — provenienza | Testo |  |
| `polpo_privacy_version` | Polpo — versione informativa | Testo |  |
| `polpo_privacy_ack_at` | Polpo — presa visione | Data e ora |  |
| `polpo_request_marketing_opt_in` | Polpo — opt-in email in questa richiesta | Sì/no |  |
| `polpo_marketing_consent_at` | Polpo — ultimo opt-in email esplicito | Data e ora |  |
| `polpo_marketing_consent_version` | Polpo — testo ultimo opt-in email | Testo |  |
| `polpo_company_match_status` | Polpo — associazione azienda | Scelta | Dominio aziendale esistente, Da verificare manualmente, Associazione esistente conservata |

I campi di evidenza marketing sono compatibilità tecnica dormiente: il modulo non raccoglie opt-in e il server rifiuta marketing=true. Nessuna attivazione newsletter. Le risposte complete restano comunque nell’archivio richieste.

Lo script `node scripts/consultation-hubspot-schema.cjs --check` controlla in sola lettura account/schema. `--apply-schema` richiede prima approvazione esplicita di questo schema e `POLPO_SCHEMA_APPLY_APPROVED=true`; non eseguire senza approvazione. Le proprietà già esistenti vengono conservate, gli errori di tipo/unicità fermano l’operazione; l’unica modifica alle opzioni consentita è telefono. Non si aggiungono segreti al repository.
