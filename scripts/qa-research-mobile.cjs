const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3192';
const out = path.resolve(process.env.QA_OUTPUT || '../survey-mobile-qa');
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [], results = [], writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.url().includes('/api/research/') && request.method() !== 'GET') writes.push(request.url()); });
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const homeIcon = await page.locator('.a-button > svg').first().evaluate(el => ({ html: el.innerHTML, stroke: el.getAttribute('stroke-width'), width: getComputedStyle(el).width, height: getComputedStyle(el).height }));
    for (const width of [320, 375, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 701 ? 844 : 1000 });
      for (const audience of ['giocatori', 'circoli']) {
        const response = await page.goto(`${base}/ricerca/${audience}`, { waitUntil: 'domcontentloaded' });
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        const select = page.getByLabel('Fascia di età');
        const button = page.locator('.research-start');
        await assertDisabled(true);
        await select.selectOption('under_14');
        await assertDisabled(true);
        assert.ok(await page.locator('.research-intro [role=alert]').isVisible());
        for (const age of ['14_17', '18_plus']) {
          await select.selectOption(age);
          await assertDisabled(false);
        }
        const icon = await button.locator('svg').evaluate(el => ({ html: el.innerHTML, stroke: el.getAttribute('stroke-width'), width: getComputedStyle(el).width, height: getComputedStyle(el).height }));
        assert.deepEqual(icon, homeIcon, 'CTA must reuse homepage icon and dimensions');
        const metrics = await page.evaluate(() => {
          const rect = sel => { const r = document.querySelector(sel).getBoundingClientRect(); return { x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height }; };
          return { viewport: innerWidth, scroll: document.documentElement.scrollWidth, select:rect('.research-age-check select'), label:rect('.research-age-check'), note:rect('.research-age-note'), button:rect('.research-start'), copy:rect('.research-intro-copy') };
        });
        assert.ok(metrics.scroll <= width, `overflow ${audience}/${width}`);
        assert.ok(metrics.button.y >= metrics.note.bottom, 'button below age explanation');
        if (width <= 390) {
          for (const key of ['select', 'note', 'button']) {
            assert.ok(Math.abs(metrics[key].x - metrics.copy.x) < 1, `${key} left aligned`);
            assert.ok(metrics[key].right <= width - 15, `${key} within viewport`);
          }
          assert.ok(Math.abs(metrics.select.width - metrics.button.width) < 1, 'full-width controls');
          assert.ok(metrics.select.height >= 44 && metrics.button.height >= 44, 'touch targets');
        }
        await page.locator('.research-art img').evaluate(img => img.decode());
        await page.screenshot({ path: path.join(out, `${audience}-${width}-intro.png`), fullPage: true });
        await button.click();
        assert.match(await page.locator('.research-progress-label').innerText(), /Domanda 1 di 7/);
        assert.equal(await page.locator('h1').evaluate(el => el === document.activeElement), true);
        await page.getByRole('button', { name: 'Indietro', exact: true }).click();
        assert.equal(await select.inputValue(), '18_plus');
        results.push({ audience, width, ...metrics });
        async function assertDisabled(value) { assert.equal(await button.isDisabled(), value); }
      }
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(writes, []);
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ base, results, errors, writes }, null, 2));
    console.log(JSON.stringify({ base, layouts: results.length, errors, writes, out }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });


