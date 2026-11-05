# Homepage — storia e interazioni

## Perimetro

Branch `feat/homepage-editorial-story`, basato su `main` (`baf5f4b`). Solo homepage, nuova demo dedicata, metadati della homepage e immagine Open Graph condivisa. Nessuna nuova dipendenza o risorsa illustrativa. La PR #18 è già merged; il modulo pubblico è ancora disabilitato e questa modifica non ne altera configurazione, backend, privacy o gate. La PR #23 rimane separata. Nessun lavoro sulle survey Polpo Padel.

## Cosa cambia

- Copy approvato nei cinque blocchi: hero, soluzioni, Polpo in azione, metodo, analisi gratuita.
- Hero in due tempi: ingresso conservativo dell'illustrazione, «Otto braccia.», poi completamento della missione. Su mobile la promessa è tutta nello stesso flusso di lettura, immediatamente visibile. I contenuti sono HTML renderizzato dal server; nessuna attesa JavaScript per leggerli.
- Soluzioni: illustrazione originale dei tentacoli, tre categorie distinte, esempi illustrativi espandibili con elementi HTML details/summary.
- Un'unica scena dimostrativa in homepage: sei scenari e tre momenti manuali, «Richiesta», «Polpo al lavoro», «Azione e risultato». Nessun autoplay. Cambio scenario con tab, frecce, Home/End o swipe orizzontale; lo scroll verticale non cambia scenario. Il cambio scenario riparte dal primo momento.
- Luci, tracce e variazione dello stato dei nodi rendono visibile l'attivazione dei collegamenti. La dicitura di simulazione è visibile prima dell'interazione. Nessuna API CRM/WhatsApp/gestionale viene invocata dalla demo.
- Metodo: quattro tappe numerate lungo un percorso sfalsato, senza griglia di card.
- CTA analisi gratuite verso `/contatti`; secondaria hero verso `#soluzioni`. Navigazione esistente verso `/soluzioni`, `/settori`, `/metodo` mantenuta e verificata.

## Architettura e limiti degli asset

Gli asset esistenti sono WebP con resa tridimensionale, non modelli GLB/GLTF con scheletro o tentacoli articolabili. Non è quindi possibile aprire i singoli tentacoli senza ricostruire o sostituire gli asset. La versione conservativa preserva le immagini: ingresso della scena, lieve gesto dell'intera illustrazione e accensione delle connessioni in risposta al passaggio manuale. Nessuna nuova libreria 3D, immagine AI o deformazione dei tentacoli.

`PolpoInAction` deriva dal linguaggio della scena esistente, ma è dedicato alla homepage. `WorldExplorer` originale e i suoi cinque settori su `/settori` sono invariati; non vengono montate due scene sulla homepage. Le classi della nuova presentazione sono limitate a `.homepage-story` e `.action-explorer`. Dati statici in `homepage-scenarios.ts`, stato locale senza timer o richieste remote.

Due piccoli aggiornamenti condivisi: l'immagine Open Graph allinea la promessa della homepage; il link «Salta al contenuto» usa anche clip-path quando non ha focus, per evitare che appaia fuori posizione nelle catture estese. Resta raggiungibile da tastiera e visibile al focus.

## Accessibilità e fallback

Un solo h1; titoli semantici per sezioni e categorie. Tab con roving tabindex e relazione al pannello, focus visibile, controlli con nomi espliciti e frecce disabilitate alle estremità. Aggiornamento testuale annunciato in una regione live educata. Gli elementi grafici ridondanti sono decorativi.

Con `prefers-reduced-motion` non ci sono animazioni o transizioni nella homepage. Il cambio di stato rimane leggibile. Senza JavaScript i sei scenari e tutti i loro momenti diventano contenuto statico; controlli non funzionanti rimossi, esempi details e collegamenti ancora disponibili. L'immagine hero resta decorativa: copy, navigazione e racconto non dipendono dal caricamento delle immagini.

## Verifica

La storia verificata è: promessa e categorie → scelta scenario → avanzamento manuale → risultato illustrativo → approfondimento o `/contatti`. Non richiede un backend e non certifica l'operatività della mini-consulenza.

Report riproducibile in `qa/report.json`; screenshot prima/dopo e demo nella cartella `qa`. Le immagini «before» sono catture in sola lettura della homepage pubblica originale il 5 novembre 2026; le immagini «after» vengono dalla build locale. Nessun deploy in produzione.

Comandi: `npm run lint`, `npm run typecheck`, `npm run test:consultation`, `npm run build`. Il browser harness si esegue con `POLPO_PLAYWRIGHT_MODULE` che punta a un'installazione disponibile di Playwright, `POLPO_HOME_QA_URL` facoltativo per il server locale e `node scripts/homepage-story-qa.cjs`. Non installa Playwright nel progetto. `POLPO_HOME_QA_SKIP_BASELINE=true` evita di ripetere la cattura del sito pubblico.

Controlli browser: sette larghezze (320, 390, 700, 768, 1024, 1440, 1920), sei scenari × tre momenti per larghezza, assenza di overflow e pannelli tagliati, promessa mobile sopra la piega, tastiera e focus, swipe orizzontale/scroll verticale, reset al cambio scenario, esempi espandibili, CTA e ancora, dieci pagine esistenti, explorer originale con cinque tab, fallback senza JavaScript e reduced motion. Nessun errore JavaScript della pagina rilevato.

Avvisi build preesistenti: utility Tailwind ease ambigua e route OG edge non statica; next lint deprecato per il futuro Next 16. Nessuna modifica delle dipendenze per questi avvisi.

Controllo aggiuntivo: animazioni normali hero-emerge/hero-line, avanzamento con Enter/Spazio, disabilitazione del passo successivo finale, risorse applicative senza errori e immagine OG HTTP 200 verificati. I due script analytics Vercel globali rispondono 404 sul server Next locale perché sono forniti dalla piattaforma; non è un guasto delle risorse della homepage. Evidenza separata in `qa/motion-and-assets.json`.
