# Polpo AI — internal visual refactor

Branch `feat/polpo-internal-worlds`, based on production merge `61b208d3950afe4ed2a606a28402150075be03b7` after homepage A PR #16. Alternative B remains separate and unchanged.

## Scope

Four editorial hubs: `/soluzioni`, `/settori`, `/metodo`, `/contatti`. Eight existing indexed service/sector URLs keep their paths and receive the same immersive art direction: WhatsApp, agents, padel, beauty, restaurants, hospitality, medical administration and fitness. No website-development offer, invented customer/results or guaranteed integrations. Metadata and JSON-LD match the rendered content.

Shared header/footer now link to the actual hubs. The homepage sector explorer is reused on `/settori` with a page-level H1; the homepage retains its H2. The initial HTML contains all sector descriptions and links. Native details elements replace the old animated FAQ components. The CTA opens the user's mail application; no email was sent and backend delivery was not tested.

Existing Polpo 3D artwork and custom SVGs are reused; no new bitmap generation, dependency, WebGL runtime or scroll interception. Scenes, continuous chapter threads, typographic hierarchy and mobile compositions replace the old card-based service pages.

## Validation

- Build, lint and typecheck pass in Preview configuration.
- `node --test scripts/inner-smoke.mjs scripts/worlds-smoke.mjs`: 4/4 pass (12 page HTML responses, unique H1, canonical preservation, noindex policy, real CTA, navigation, sitemap, sector content, assets and destinations).
- Edge browser: 12 pages × 320/390/768/1024/1440px = 60 layout combinations; no horizontal overflow, clipped heading/link or page error. Native FAQ keyboard interaction, mobile route navigation, sector selection and reduced motion pass. Results in `qa.json`.
- Screenshots include desktop/mobile versions of Soluzioni, Settori, Metodo, Contatti and Padel, captured after lazy assets loaded.
- Next build figures: informational pages 91.3 KB first-load JS (previously approximately139–145 KB for service/sector routes); home and sector explorer 95.8 KB. No field score or Lighthouse measurement claimed.

## Release and audit boundary

Homepage A was published via PR #16 and verified at polpo-ai.com before this branch. The user subsequently authorized completing and merging the nearly finished graphical refactor before the information-architecture audit. No further pages or functions are added beyond the scope above. The following audit will distinguish this released AS-IS state from unimplemented recommendations, including conversion/backend and page-consolidation decisions requiring approval.
