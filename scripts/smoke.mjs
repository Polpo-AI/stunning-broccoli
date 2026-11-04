import assert from 'node:assert/strict';
import test from 'node:test';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const get = (path, options) => fetch(new URL(path, base), options);

test('homepage renders approved content, accessible landmarks and metadata', async () => {
  const response = await get('/');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="it"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  for (const content of ['La tua attività ha', 'mille cose', 'Richiedi la tua analisi gratuita', 'mailto:info@polpo-ai.com']) assert.ok(html.includes(content), content);
  for (const id of ['main-content','approccio','soluzioni','settori','metodo','contatti']) assert.ok(html.includes('id="'+id+'"'), id);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/); assert.ok(canonical); assert.equal(new URL(canonical[1]).href, 'https://polpo-ai.com/');
  assert.doesNotMatch(html, /creazione-siti-web|Siti Web Vetrina|20\+ ore/);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)];
  assert.ok(jsonLd.length);
  for (const [,value] of jsonLd) assert.ok(JSON.parse(value)['@context']);
});

test('retired website offer and portfolio permanently redirect', async () => {
  for (const path of ['/creazione-siti-web','/portfolio/smash-burger','/portfolio/fotografo-eventi','/portfolio/libero-professionista']) {
    const response = await get(path, {redirect:'manual'});
    assert.equal(response.status, 308, path);
    assert.equal(response.headers.get('location'), '/#soluzioni', path);
  }
});

test('metadata endpoints, linked solutions and mascot are available', async () => {
  const sitemap = await (await get('/sitemap.xml')).text();
  assert.doesNotMatch(sitemap, /creazione-siti-web|portfolio/);
  const manifest = await (await get('/manifest.webmanifest')).json();
  assert.match(manifest.name, /Automazioni/);
  for (const path of ['/polpo-3d.webp','/agenti-ai','/chatbot-whatsapp-prenotazioni']) assert.equal((await get(path)).status, 200, path);
  const og = await get('/opengraph-image');
  assert.equal(og.status, 200);
  assert.ok(og.headers.get('content-type').includes('image/png'));
});

test('robots policy follows the deployment environment', async () => {
  const robots = await (await get('/robots.txt')).text();
  assert.ok(robots.includes(process.env.EXPECT_PREVIEW === '1' ? 'Disallow: /' : 'Sitemap: https://polpo-ai.com/sitemap.xml'));
});
