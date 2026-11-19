# AGENTS.md — istruzioni per Codex / ChatGPT

Sito pubblico di Polpo AI (polpo-ai.com): Next.js App Router, deploy Vercel dal branch `main`. Il codice lo scrive Claude Code, la review la fa Codex, come in Polpo-AI/padel-activity.

## Code Review Rules

- Rispondi in italiano, breve. Ogni rilievo: P0/P1/P2/P3, stato (Da verificare / Confermato), file, riga e scenario riproducibile. Una possibilità teorica non è un bug confermato. Indica lo SHA esaminato.
- Priorità:
  1. **Privacy e consenso**: nessun tracker di terze parti (GA4, Clarity, pixel, embed) prima del consenso; "Accetta" e "Rifiuta" di pari peso; consenso revocabile dal footer (linee guida cookie del Garante, 10/06/2021). Logica unica in `lib/analytics.ts`, banner in `components/analytics/`.
  2. **Nessun dato personale negli eventi**: niente email, telefoni, nomi, testo libero dei moduli o identificativi di richiesta in GA4, Clarity, Vercel Analytics o negli URL.
  3. **Percorsi riservati** (`/ricerca`, `/contatti/prova`): niente tracker, CSP restrittiva in `middleware.ts`.
  4. **Flusso consulenza** (`/contatti` → `/api/consultation` → coda Supabase → HubSpot/Resend): idempotenza, nessun "inviato" senza acquisizione confermata, nessun segreto lato client (`NEXT_PUBLIC_*` solo per valori pubblici).
  5. SEO: un solo `metadataBase`/canonical coerente, niente `noindex` accidentale in produzione, sitemap e robots allineati alle pagine reali.
  6. Segreti nei commit, dipendenze nuove non necessarie, servizi a pagamento introdotti senza dirlo.
- Per PR di sola documentazione segnala solo contraddizioni con il codice, non lo stile.
- Non scrivere codice applicativo, non aprire PR e non approvare merge o deploy: decide il proprietario del sito.
- Consegna i rilievi di un giro tutti insieme. Nel giro successivo verifica solo le correzioni e le regressioni: non riproporre rilievi risolti o respinti con motivazione.

## Controlli

La CI (`.github/workflows/ci.yml`) esegue `npm run typecheck`, `npm run lint`, i test `node --test` (`test:analytics`, `test:consultation`, `test:research`) e `npm run build`. Una PR che aggiunge logica senza test in `scripts/test-*.cjs` va segnalata come P3.
