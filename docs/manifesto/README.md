# Alternative B — Digital Manifesto

Independent branch from `origin/main` at `8930d8bfa79941af5c87c4281c2476e79e9de0d6`.

A single cinematic, full-bleed sculpture scene. Large editorial typography moves from a stacked opening on the left to the cyan response across the sculpture. The only primary action opens the visitor's email application, prefilled to the existing published `info@polpo-ai.com` address. It does not submit or send a message automatically. A native HTML disclosure contains concise service context and real solution/sector links.

The user's OCTO black/magenta reference informs scale, material and asymmetry; their Polpo concept informs navy/cyan/violet identity. The reference's website service and unverified metrics are deliberately excluded. The final artwork is original, generated with the built-in Imagegen tool, rather than a screenshot of either reference. No WebGL or continuous JavaScript animation is loaded. The brief image arrival animation respects reduced motion.

## Asset

`public/manifesto-scene.webp`: 1586 × 992, 228,246 bytes. Built-in Imagegen output optimized to WebP quality 86 with Sharp. The opaque original remains outside the project; only the optimized local production asset is used. `next/image` supplies responsive output, image priority and known full-scene geometry. Headline and CTA are selectable server-rendered HTML.

Final built-in generation prompt:

> Use case: stylized-concept. Asset type: full-bleed cinematic 3D key visual for Polpo AI radical editorial website. Original artwork inspired by the attached two reference moods (not copying their layouts or text): luxurious dark sculptural octopus campaign, sophistication and cinematic scale of the black/magenta octopus reference, with Polpo's navy/cyan/violet brand. Make a single exquisite monumental octopus sculpture with eight sinuous textured tentacles spreading organically across the whole lower half and curling into foreground. Dark navy obsidian body with pearlescent violet fine granular skin, black glass face and two subtle cyan luminous intelligent eyes, magenta underside suckers, highly realistic tactile material, dramatic cyan top rim light and hot magenta side light, mist and deep shadows. Central head positioned around 65% horizontal / 38% vertical. The leftmost 40% is very dark clean negative space for overlaid white editorial text. Rich specular highlights, extraordinary sense of volume, depth of field. Black/navy gallery void backdrop, low glossy rippled ground, a few sweeping violet light reflections. Cinematic widescreen landscape 16:10. Main octopus fully recognizable yet tentacles dramatically cropped at edges. This is a final art asset, NOT a website mockup. No text, letters, numbers, UI, devices, buttons, people, logos, watermark, cards or frame. Professional premium Octane/Cinema4D render, magnificent sculptural composition, one clear focal point.

## Search architecture

The homepage describes AI automation for small and medium enterprises. It links to the existing assistant and process pages and real sector URLs; medical practices are labeled accurately. Future pages should represent distinct search intentions with useful original content (for example a process or industry whose requirements are documented), rather than duplicating text to increase the URL count. Do not publish placeholder pages or sitemap URLs before real pages exist.

Global title/description, Open Graph, Twitter, manifest, JSON-LD and `llms.txt` consistently describe automation. Canonicals point to the existing production domain. Unsupported inherited claims were removed from global schema and the linked assistant/agent pages, including guaranteed savings and zero errors. Retired website service and portfolio routes permanently redirect to `/#soluzioni`. The sitemap excludes retired routes. Vercel preview builds receive noindex/nofollow metadata and `robots.txt` disallows crawling; production remains indexable when that build is authorized later.

## Checks and limits

Run `npm ci`, `npm run lint`, `npm run typecheck`, and `VERCEL_ENV=preview npm run build` (PowerShell: set the environment variable first). Start with `npm run start -- --hostname 127.0.0.1 --port 3112`, then `npm test`.

Screenshots and browser QA are in `docs/comparison/`. Local checks do not prove email delivery or production conversion rates. No Lighthouse or field-performance score is claimed. Existing vertical pages retain their previous visual system. This draft does not merge or deploy to production.

Local results: npm ci, lint, typecheck and preview production build pass. Four HTTP smoke tests pass (server-rendered copy/contact/schema, real solution routes and sitemap, retired308 redirects, preview noindex/robots and local image). Next reports91.3kB homepage first-load JavaScript and185B route payload; these are build figures, not field measurements. Build notices concern inherited Browserslist data, one unused legacy easing class and edge image routes.

Final browser QA (Edge):320,390,768,1024,1440,1920px; no horizontal overflow, clipped heading/CTA, broken images or page errors. Keyboard skip link focuses MAIN; native disclosure opens with Enter; all real internal links return200; reduced motion disables animation. Desktop/mobile screenshots were inspected after the final mobile positioning fix.
