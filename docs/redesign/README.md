# Polpo AI immersive redesign

First implementation on `feat/polpo-immersive-redesign`, based on `main` at `8930d8b`.

## Direction and scope

Editorial typography, asymmetrical composition, navy/cyan/magenta/violet, and a bespoke 3D interpretation of the existing octopus. The homepage is server rendered. The mascot floats using a CSS transform; no WebGL, scroll interception, animation framework, or continuous JavaScript loop is loaded by the homepage.

The approved headline and CTA are preserved. Solutions cover AI assistants, bookings and process automation. Sector disclosures cover sport (padel/tennis/calcetto), beauty, restaurants, professional practices and hospitality. The flow diagram is explicitly illustrative.

Website creation is retired. Its former URL and portfolio example URLs permanently redirect to the solutions section. Public portfolio examples, website service components and unused demo animation components have been removed. Global navigation, metadata, structured data, manifest, social image, sitemap and llms.txt reflect the new positioning. Preview deployments are excluded from indexing through metadata and robots.txt.

The CTA opens an email request to the existing published contact address. It does not submit to Supabase or Resend. The existing contact API remains available, but its live credentials and delivery have not been exercised by this change. No messages have been sent during validation.

Some inherited integration and ROI promises in linked service pages were replaced with feasibility language. Existing vertical pages retain their prior design; a full visual redesign of those pages is outside this first homepage delivery.

## Validation

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`.
For HTTP smoke tests, start `npm run start -- --hostname 127.0.0.1 --port 3100`, then `npm test`. Override `TEST_BASE_URL` for another origin; set `EXPECT_PREVIEW=1` for preview robots checks.

Screenshots in this directory show desktop (1440px) and mobile (390px). Browser checks cover responsive overflow, mobile navigation, sector disclosures, keyboard skip link, reduced motion and runtime errors. Screenshots use disabled animation for repeatability.

No application test suite existed before this change. The included Node smoke suite covers server rendered content, canonical/JSON-LD metadata, routes, retired redirects, mascot, social image, manifest and robots policy.

## Asset

`public/polpo-3d.webp`: 1400 × 933, approximately 303 KB, alpha preserved. Created with the built-in Imagegen tool using `public/polpo.png` as the character reference. Original brand assets are preserved. The hero uses next/image, explicit dimensions, priority loading and responsive sizes.

Final generation prompt:

> Use case: stylized-concept. Create a premium 3D octopus mascot asset for the Italian automation studio Polpo AI. Reference image is the existing mascot: preserve the cyan glowing eyes, deep navy body, luminous cyan circuit brain motif and recognizable intelligent friendly face. Transform illustration into exquisite physically rendered 3D sculpture, smooth dark navy glass and satin metallic violet, electric cyan emissive details, magenta rim lighting. Eight distinct graceful tentacles reaching outward and curling in different directions, dynamic three-quarter pose, sculptural elegant shape, friendly confident expression. Entire octopus visible, centered with little empty padding, isolated on transparent background. Studio Octane/Cinema4D quality, beautiful specular reflections, real volume and depth. No text, no logos, no environment, no floor, no extra objects. This is an image reference for character identity, create a new 3D asset.

## Deployment boundaries

GitHub deployment history confirms a Vercel connection, with Preview environments on feature branches and Production on main. No new hosting project or production configuration is introduced. Only the feature branch is pushed and the PR stays draft. Production deployment and merge require separate authorization.

Final local results: lint and typecheck pass; production build passes; 4/4 HTTP smoke tests pass. Browser validation passes at 320, 390, 700, 768, 1024, 1440 and 1920px with no horizontal overflow or clipped section headings/CTAs. Mobile menu closure, sector disclosures, keyboard skip link and reduced-motion behavior pass; no page errors recorded.

Next reports 91.3 KB first-load JavaScript for the homepage (185 B route payload). This is a build figure, not a field performance or Lighthouse score. Remaining non-blocking build notices concern inherited Browserslist data, an unused legacy easing utility and edge image routes. No Lighthouse score or live conversion performance is claimed.
