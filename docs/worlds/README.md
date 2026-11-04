# Polpo worlds — interactive sector explorer

## Design decision — 4 November 2026

Homepage A is the selected direction. Sectors are one coherent branded scene with a central octopus, not five repeated link rows and not five separate scenes. Sector selection changes sculptural foreground objects, illumination, orbital geometry, entrance motion and live HTML copy. Desktop uses a broad scene with the text beside the octopus. Mobile uses its own vertical scene composition, one active sector, a horizontal tap selector and horizontal scene swipe. Vertical page scrolling does not change the sector. There is no automatic rotation.

Priority after this delivery remains homepage A, sector interaction, coherent controls and mobile verification. The inherited service page designs have not been redesigned.

## Content and accessibility

All five descriptions and destination links are present in the initial prerendered HTML. With JavaScript enabled, only the chosen panel is visible; tabs use the ARIA tab/tablist/tabpanel pattern, roving focus and ArrowLeft/ArrowRight/Home/End keys. Tab moves to the active panel. Selection has a text/underline indicator as well as a color change. A polite status announces the selected world for swipe and previous/next controls. Controls are at least 44px high. Without JavaScript the selector is removed and all five descriptions/links are visible through a noscript fallback. Reduced motion disables transitions and decorative animations. No WebGL, new dependency or continuous JavaScript render loop is used.

### Controls audit

| Previous element | Updated language |
| --- | --- |
| Unicode diagonal arrows on CTAs, solution links, header and footer | Thin custom SVG outward stroke |
| Unicode downward arrow on hero secondary link | Custom SVG scroll cue |
| Repeated sector rows/dividers/arrows | Five-tab explorer with a single active destination link |
| Curved text arrows in the method | Continuous fine line with small connection nodes; vertical line on mobile |
| Text asterisk used as brand symbol | Custom octopus SVG mark |
| Text + on mobile menu | Custom SVG menu/close states; Escape closes and restores focus |

No floating utility control was added. Shared navigation/footer use the same custom icon set. Legacy page content itself remains outside the visual refactor scope.

## Assets

Created with built-in Imagegen using the existing A hero as character/material reference. Generated a reusable central stage and one transparent 3×2 object atlas; five equal 512×512 cells were sliced and encoded to WebP using Sharp. The empty sixth cell is not shipped. Alpha is preserved. No text is baked into imagery.

| Repository path | Dimensions | Bytes |
| --- | --- | --- |
| public/worlds-stage.webp | 1536×1024 | 159390 |
| public/worlds-sport.webp | 512×512 | 65830 |
| public/worlds-beauty.webp | 512×512 | 61936 |
| public/worlds-restaurant.webp | 512×512 | 45664 |
| public/worlds-studio.webp | 512×512 | 36224 |
| public/worlds-hospitality.webp | 512×512 | 52686 |

Only the selected foreground is mounted. New scene assets lazy-load; the hero loading strategy is unchanged. The full set is 421730 bytes before responsive Next image delivery. Next reports homepage first-load JavaScript 95.5 KB versus the initial A build's 91.3 KB, route 3.74 KB. These are build figures, not field measurements or Lighthouse scores.

## Final prompts

### Shared stage

Use case: stylized-concept. Asset: central background for a premium interactive sector explorer on Polpo AI website. Reference image is the existing Polpo hero: preserve the friendly purple-blue octopus mascot, satin textured skin, magenta suction cups, black glass visor with two smiling cyan eyes and round headphones. Create ONE cinematic underwater stage, landscape 3:2. Entire octopus centered, friendly head slightly above center, eight sweeping curled tentacles fanning out across the bottom. Its entire body should fit comfortably in the central 60% with roomy dark navy negative space at left and right for separately composited floating industry objects. Beautiful organic navy waves and rocks along lower edge, very restrained bubbles, cyan volumetric light and magenta rims, rich physical material, depth of field, exquisite Octane-quality lighting. Background fades nearly black navy at all edges. No phone, gears, calendars, clocks, furniture or sector-specific objects anywhere: this is a neutral reusable stage. No text, numbers, UI, watermarks or typography. Same character and coherent environment as reference, new centered composition.

### Transparent object atlas

Use case: stylized-concept. Asset: precision 3D object sprite atlas for Polpo AI interactive scene. Create a transparent-background image with an EXACTLY 3-column by 2-row regular grid of six equally sized square cells. Every cell has generous padding, objects fully isolated and never crossing cell boundaries. Five separate object clusters, all with same premium physical 3D rendering, dark navy and violet satin metal, glass, electric cyan and magenta edge lighting, camera three quarter angle. TOP LEFT cell: padel racket diagonally behind a luminous cyan tennis ball. TOP MIDDLE cell: a beauty salon oval tabletop mirror beside a small purple appointment diary with cyan blank abstract squares. TOP RIGHT cell: a polished violet restaurant cloche above a cyan ceramic plate, small reservation slip with abstract lines. BOTTOM LEFT cell: an upright translucent violet document folder holding a few white pages, floating cyan envelope beside it. BOTTOM MIDDLE cell: a violet hotel key with cyan ring beside a polished reception service bell. BOTTOM RIGHT cell: EMPTY TRANSPARENT. No background, no floor, no frames, no labels, no words, no numbers, no watermark. High quality tactile materials, specular highlights, realistic 3D volume, product sculptural objects not flat icons. Cohesive navy cyan purple magenta palette with the supplied Polpo visual style reference.

## Validation

- Production build with VERCEL_ENV=preview passes compilation, lint and typecheck.
- `node --test scripts/worlds-smoke.mjs`: 2/2 pass, covering all five descriptions in initial HTML, tab/panel associations, no-JS fallback, preview indexing policy, destination routes and six WebP assets.
- Browser QA: 35 sector/viewport combinations (five worlds × 320, 390, 700, 768, 1024, 1440, 1920px). One visible panel, no horizontal page overflow or clipped content links/headings/controls. Every sector has the correct asset/color. No page errors.
- Keyboard: automatic tab selection, wrap, Home/End, active-panel focus; previous/next wrap; mobile menu Escape; skip link focus.
- Real emulated mobile touch events: horizontal left/right change world, vertical swipe scrolls without changing world.
- JavaScript disabled: all five descriptions and links visible. Reduced motion: no explorer animation.
- Mobile stage height stays 800px for all five sectors at 390px viewport width.
- Homepage-wide regression checks pass on six widths; links return 200; existing preview noindex/canonical policies remain intact.

Results: [QA JSON](qa.json). Screenshots: [sport desktop](sport-desktop.png), [beauty desktop](beauty-desktop.png), [restaurant desktop](restaurant-desktop.png), [studio desktop](studio-desktop.png), [hospitality desktop](hospitality-desktop.png), with corresponding *-mobile.png files. Whole homepage screenshots refreshed in ../comparison.

Source browser QA was performed on the local production build. Anonymous Vercel preview access may require login; deployment status is verified separately. Main, production, alternative B and service-page designs are unchanged.

