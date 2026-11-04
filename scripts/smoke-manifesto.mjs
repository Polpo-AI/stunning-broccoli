import test from 'node:test';
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3112';
const get = async (path) => { const response = await fetch(base + path); assert.equal(response.status, 200, path); return response.text(); };
test('homepage exposes real text, one primary h1, contact and valid structured data without JS', async () => {
  const html = await get('/');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const headline = html.match(/<h1[^>]*>(.*?)<\/h1>/)[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(headline, 'La tua attività ha mille cose da fare. Noi le facciamo lavorare insieme.');
  for (const text of ['La tua attività ha', 'mille cose', 'da fare.', 'Noi le facciamo', 'lavorare insieme.', 'Richiedi la tua', 'analisi gratuita']) assert.ok(html.includes(text), text);
  assert.ok(html.includes('mailto:info@polpo-ai.com?subject='));
  assert.ok(html.includes('https://polpo-ai.com'));
  assert.ok(html.includes('<details>'));
  assert.ok(!html.includes('/creazione-siti-web'));
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) assert.ok(JSON.parse(match[1])['@context']);
});
test('every linked solution is reachable and sitemap omits retired offers', async () => {
  for (const path of ['/agenti-ai', '/chatbot-whatsapp-prenotazioni', '/chatbot-whatsapp-prenotazioni-padel', '/chatbot-whatsapp-prenotazioni-centri-estetici', '/chatbot-whatsapp-prenotazioni-ristoranti', '/chatbot-whatsapp-prenotazioni-studi-medici', '/chatbot-whatsapp-prenotazioni-hotel-bb']) await get(path);
  const sitemap = await get('/sitemap.xml');
  assert.ok(!sitemap.includes('creazione-siti-web'));
  assert.ok(!sitemap.includes('/portfolio/'));
  assert.ok(sitemap.includes('/agenti-ai'));
});
test('retired website routes permanently redirect to the real solutions anchor', async () => {
  for (const path of ['/creazione-siti-web', '/portfolio/smash-burger']) {
    const response = await fetch(base + path, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), '/#soluzioni');
  }
});
test('preview crawlers are excluded and local scene asset is served', async () => {
  const html = await get('/');
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  const robots = await get('/robots.txt');
  assert.ok(robots.includes('Disallow: /'));
  const image = await fetch(base + '/manifesto-scene.webp');
  assert.equal(image.status, 200);
  assert.ok(image.headers.get('content-type').includes('image/webp'));
});
