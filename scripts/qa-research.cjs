const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3190';
const out = path.resolve('docs/research/qa');
const report = { layouts: [], flows: [], errors: [], writes: [], telemetry: [] };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}), headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) report.writes.push({ method: request.method(), url: request.url() });
    if (/analytics|insights|vitals|\/api\//.test(request.url())) report.telemetry.push(request.url());
  });
  const click = async name => { if (name === 'Prova la survey') await page.getByLabel('Confermo di avere almeno 14 anni.').check(); return page.getByRole('button', { name, exact: true }).click(); };
  const choose = async (name, value) => { await page.locator(`input[name="${name}"][value="${value}"]`).check(); };
  async function start(audience) {
    const response = await page.goto(`${base}/ricerca/${audience}`);
    assert.equal(response.status(), 200);
    assert.match(response.headers()['x-robots-tag'], /noindex/);
    assert.match(response.headers()['cache-control'], /no-store/);
    assert.match(response.headers()['content-security-policy'], /form-action 'none'/);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow, noarchive');
    await click('Prova la survey');
    assert.equal(await page.locator('input[name=frequency]:checked').count(), 0);
  }
  async function assertLayout(label) {
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const state = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, headings: document.querySelectorAll('h1').length, focused: document.activeElement.tagName }));
    assert.ok(state.scroll <= state.width, `${label}: horizontal overflow ${JSON.stringify(state)}`);
    assert.equal(state.headings, 1);
    report.layouts.push({ label, ...state });
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const audience of ['giocatori', 'circoli']) {
      await page.goto(`${base}/ricerca/${audience}`);
      await assertLayout(`${audience} intro ${width}`);
      if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(out, `${audience}-${width}-intro.png`), fullPage: true });
      await click('Prova la survey');
      await assertLayout(`${audience} question ${width}`);
      if ([320, 1440].includes(width)) await page.screenshot({ path: path.join(out, `${audience}-${width}-question.png`), fullPage: true });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await start('giocatori');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('input[name=frequency]').first().evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Space');
  assert.equal(await page.locator('input[name=frequency]').first().isChecked(), true);
  await page.reload(); await click('Prova la survey');
  await click('Continua');
  assert.ok(await page.locator('.research-error[role=alert]').isVisible());
  await page.keyboard.press('Tab');
  await choose('frequency', 'weekly'); await click('Continua');
  assert.equal(await page.locator('h1').evaluate(el => el === document.activeElement), true);
  await choose('group', 'friends'); await click('Continua');
  await choose('channel', 'playtomic');
  await click('Continua'); assert.ok(await page.locator('.research-error[role=alert]').isVisible());
  await choose('playtomicUse', 'booking'); await choose('bookingChannel', 'playtomic'); await click('Continua');
  await page.setViewportSize({ width: 320, height: 900 });
  await assertLayout('Scale at 320');
  await page.screenshot({ path: path.join(out, 'giocatori-320-scale.png'), fullPage: true });
  assert.equal(await page.locator('.research-primary').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await choose('ease', '5'); await click('Continua');
  await choose('failures', '0'); await click('Continua');
  assert.equal(await page.locator('input[value="compatibility"]').count(), 0);
  await choose('obstacle', 'none'); await click('Continua');
  await choose('aiActions', 'suggest'); await choose('aiActions', 'auto_booking');
  await choose('aiActions', 'none'); assert.equal(await page.locator('input:checked').count(), 1);
  await choose('aiActions', 'draft'); assert.equal(await page.locator('input[value="none"]').isChecked(), false);
  await click('Rivedi la prova');
  await page.getByRole('button', { name: 'Modifica domanda 2', exact: true }).click();
  await choose('group', 'open'); await click('Continua');
  await click('Continua'); await choose('ease', '3'); await click('Continua'); await click('Continua');
  assert.equal(await page.locator('input[name="obstacle"]:checked').count(), 0);
  await choose('obstacle', 'compatibility'); await click('Continua');
  await choose('aiActions', 'confirm_invite'); await click('Rivedi la prova');
  await click('Prosegui senza invio →');
  assert.equal(await page.locator('input[type=email]:disabled').count(), 1);
  assert.equal(await page.locator('input[type=checkbox]:disabled').count(), 2);
  await click('Termina la prova');
  assert.ok(await page.getByRole('heading', { name: /Grazie per la prova/ }).isVisible());
  report.flows.push('Players: friends-only, Playtomic booking, exclusive AI choices, change to open group, review, disabled separate contact, finish');
  await start('circoli');
  await choose('role', 'reception'); await choose('courts', '3_5'); await click('Continua');
  await choose('tools', 'playtomic'); await choose('tools', 'whatsapp'); await click('Continua');
  await choose('problems', 'messages'); await choose('problems', 'admin');
  assert.equal(await page.locator('input[name=problems][value=players]').isDisabled(), true);
  await choose('problems', 'none'); assert.equal(await page.locator('input:checked').count(), 1);
  await choose('problems', 'messages'); await choose('problems', 'admin'); await click('Continua');
  await choose('mainActivity', 'admin'); await choose('activeHours', '1_3'); await choose('incidents', 'zero'); await click('Continua');
  await choose('satisfaction', '4'); await click('Continua');
  await choose('priority', 'admin'); await page.locator('textarea').fill('Esempio sintetico: mantenere il calendario attuale.'); await click('Continua');
  await choose('interest', 'no'); await click('Rivedi la prova'); await click('Prosegui senza invio →');
  await page.screenshot({ path: path.join(out, 'circoli-390-contact.png'), fullPage: true });
  await click('Termina la prova');
  report.flows.push('Clubs: two fields, multi tools, max two, no-problem exclusion, attributed active hours, scale, optional detail, no interest, contact, finish');
  // Refresh wipes in-memory choices; no browser storage or contact data is used.
  await page.reload(); await click('Prova la survey');
  assert.equal(await page.locator('input:checked').count(), 0);
  const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }));
  assert.deepEqual(storage, { local: 0, session: 0, cookies: '' });
  assert.equal((await context.cookies()).length, 0);
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  assert.equal(report.writes.length, 0, JSON.stringify(report.writes));
  assert.equal(report.telemetry.length, 0, JSON.stringify(report.telemetry));
  // Production has no survey, even when the local-only override is present.
  for (const audience of ['giocatori', 'circoli']) {
    const response = await fetch(`http://127.0.0.1:3191/ricerca/${audience}`);
    assert.equal(response.status, 404);
    assert.ok(!(await response.text()).includes('Prova la survey'));
  }
  for (const route of ['/', '/contatti', '/soluzioni']) assert.equal((await fetch(`http://127.0.0.1:3191${route}`)).status, 200);
  report.flows.push('Reload clears answers; storage/cookies empty; zero mutations/API/telemetry; production 404; existing routes 200');
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
