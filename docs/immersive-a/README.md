# A — Polpo immersive universe

Update, 4 November 2026: A is the selected homepage direction. The sector list has been replaced by a single interactive world explorer and the homepage/shared chrome controls now use custom SVGs. Current design decision, final image prompts, asset sizes and validation are in [../worlds/README.md](../worlds/README.md). The updated homepage first-load JavaScript is 95.5 KB; earlier figures below describe the initial A delivery.

Independent alternative created directly from main `8930d8bfa79941af5c87c4281c2476e79e9de0d6`, branch `feat/polpo-immersive-a`. This branch does not descend from alternative B or the previous immersive redesign.

## Art direction

The user supplied two references: a Polpo AI underwater 3D world and an OCTO campaign composition. A takes the rich underwater world as its primary reference: visor-eyed friendly octopus, cyan / navy / magenta / violet, tactile materials, meaningful sculptural objects, and a continuous environment through the lower page. The header, headline, explanations, links and CTA are live semantic HTML. These are prerendered 3D artworks, not a WebGL model. A slow CSS camera drift respects reduced motion; no animation library, scroll interception or render loop is loaded on the homepage.

No website-development service is offered. Old service/portfolio URLs redirect permanently to the real solutions section. Existing WhatsApp/automation vertical URLs and their canonical tags are preserved. The CTA opens the user's mail client at the existing published info@polpo-ai.com address; no email was sent, and backend delivery has not been tested.

## Assets

Built-in Imagegen generated three original artworks from the supplied references. Files are saved in the repository, optimized with Sharp, with no baked-in headings or UI copy:

| Asset | Dimensions | Bytes |
| --- | --- | --- |
| public/immersive-a-hero.webp | 1672 × 941 | 254976 |
| public/immersive-a-workflow.webp | 1672 × 941 | 134262 |
| public/immersive-a-depth.webp | 1086 × 1448 | 143518 |

Hero generation prompt: Create an original premium 3D scene for Italian AI automation studio Polpo AI. Enormous friendly intelligent purple-blue octopus with black glass visor and two gently smiling electric cyan eyes, magenta suction cups, detailed tactile satin skin, cyan rim lighting; hero occupies right 65%, spacious dark navy left for live HTML. Eight sweeping tentacles curl through layered organic waves. Floating smartphone with green chat icon, cyan calendar and violet gears. Rocks, translucent bubbles, light beams and fluid ribbons. Strong diagonal composition and dramatic Cinema4D Octane campaign lighting. No typography, numbers, card grids, UI or watermarks. Fundamental character/material/palette reference: supplied Polpo image; supporting depth reference: supplied magenta OCTO composition.

Workflow generation prompt: Wide cinematic 3D illustrated strip, no typography. A thick purple octopus tentacle with luminous pink suction cups sweeps in an S curve, linking a tilted black glass smartphone with green chat bubble, cyan frosted-glass calendar with abstract squares and two interlocking purple/pink gears above a cyan lightning sculpture. Physical materials, atmospheric depth, illuminated navy waves, bubbles. Smooth dark bottom for live text. Fundamental style reference: supplied Polpo image. No websites, laptops, flat icons, cards, text, logos or watermarks.

Lower environment generation prompt: Tall 3:4 cinematic underwater environment with curving tactile purple tentacles, luminous magenta suction cups along the margins and lower foreground; cyan bioluminescent waves, glossy teal/violet ribbons, dark rocks, pink coral, glass bubbles, soft volumetric cyan shafts. Center 65% quiet navy for live HTML. No head, phone, gears, text, UI, numbers, logos or watermarks. Same supplied Polpo image as fundamental reference.

## SEO and future information architecture

HTML is prerendered; metadata, Organization/WebSite JSON-LD, social preview, manifest and llms.txt describe AI automation for SMEs. Preview builds explicitly noindex/nofollow and block robots; production canonical URLs remain polpo-ai.com. The sitemap lists actual existing routes and excludes retired URLs. Homepage solutions and sector links lead to real service/vertical pages.

Future architecture can expand /agenti-ai and /chatbot-whatsapp-prenotazioni as solution hubs with genuinely useful industry pages. Existing sport, beauty, restaurant, hospitality and medical pages retain their routes. A future general professional-practices page should have original process-specific content; the current homepage links that sector to /agenti-ai. No empty future pages or doorway duplicates were created. More pages alone do not guarantee improved search visibility.

## Validation and boundaries

Run npm ci, npm run typecheck, npm run lint, npm run build. Build output reports homepage first-load JavaScript 91.3 kB, not a Lighthouse or field performance measurement. Original full-size source PNGs remain outside the repo; only optimized WebP assets are shipped. The hero uses responsive Next Image priority loading; lower images lazy-load. All three image files together are approximately 520 KiB before responsive delivery.

Browser verification and screenshots are coordinated separately and recorded under docs/comparison. The inherited service pages keep their existing visual design. Any social/email delivery or integration capability must be verified per client; the homepage scene is illustrative. No invented customers, metrics, testimonials or service guarantees were added. Old unsupported homepage metadata promises and selected inherited service claims were removed.

No merge, production deployment, fork or force push is authorized or performed. This branch is for a draft PR and Vercel Preview only.

Final validation: npm run lint and npm run typecheck pass without warnings/errors. The final production build with VERCEL_ENV=preview passes. HTTP checks confirm prerendered copy/CTA, noindex/nofollow, robots disallow, canonical URL, actual sitemap entries, retired service/portfolio 308 redirects, all homepage-linked service/sector routes and all three artwork files return 200. Metadata on /agenti-ai no longer promises zero errors or immediate ROI.

Local Edge browser QA covers 320, 390, 768, 1024, 1440 and 1920 px: no horizontal overflow, clipped headings/buttons or broken images; no page errors. Keyboard skip link focuses main; mobile menu opens with keyboard and closes after navigation. Reduced-motion mode disables the CSS artwork animation. The page and CTA remain visible with JavaScript disabled. Full-page screenshots were taken after scrolling to load lazy artworks. These checks describe the local production build, not a field performance score or production deployment.
