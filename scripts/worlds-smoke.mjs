import test from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3111';
test('all five sector descriptions and links are in the initial HTML', async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const id of ['sport', 'beauty', 'restaurant', 'studio', 'hospitality']) {
    assert.ok(html.includes(`id="world-tab-${id}"`));
    assert.ok(html.includes(`id="world-panel-${id}"`));
  }
  for (const copy of ['Richieste dei giocatori, campi, appuntamenti.', 'Agenda, appuntamenti, richieste clienti.', 'Prenotazioni, richieste, servizio.', 'Documenti, email, passaggi ripetitivi.', 'Ospiti, richieste, soggiorno.']) assert.ok(html.includes(copy), copy);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 5);
  assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
  assert.ok(html.includes('<noscript>'));
  assert.ok(html.includes('noindex, nofollow'));
  assert.ok(!/[↗↝↓↑✳]/u.test(html.replace(/<script[\s\S]*?<\/script>/g, '')));
});

test('sector destination routes and all scene assets exist', async () => {
  for (const route of ['/chatbot-whatsapp-prenotazioni-padel', '/chatbot-whatsapp-prenotazioni-centri-estetici', '/chatbot-whatsapp-prenotazioni-ristoranti', '/agenti-ai', '/chatbot-whatsapp-prenotazioni-hotel-bb', ...['stage', 'sport', 'beauty', 'restaurant', 'studio', 'hospitality'].map(id => `/worlds-${id}.webp`)]) {
    assert.equal((await fetch(base + route)).status, 200, route);
  }
});
