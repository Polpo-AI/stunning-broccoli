// Browser -> real intake validation -> isolated in-memory store. No hosted writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  try { return resolve.call(this, request, parent, isMain, options); }
  catch (error) {
    if (request.startsWith('.') && parent?.filename && !path.extname(request)) {
      const file = path.resolve(path.dirname(parent.filename), request + '.ts');
      if (fs.existsSync(file)) return file;
    }
    throw error;
  }
};
require.extensions['.ts'] = (mod, file) => mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
const { createResearchIntake } = require('../lib/research/intake.ts');
const { questions, VERSION } = require('../lib/research/questions.ts');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3194';
const out = path.resolve(process.env.QA_OUTPUT || '../survey-submission-qa');
const fixtures = {
  giocatori: {frequency:['weekly'], group:['club'], channel:['friends'], ease:['5'], failures:['1'], obstacle:['courts'], aiActions:['draft','confirm_booking']},
  circoli: {role:['manager'], courts:['3_5'], tools:['whatsapp'], problems:['messages'], mainActivity:['messages'], activeHours:['1_3'], incidents:['one'], satisfaction:['3'], priority:['messages'], interest:['demo']},
};
(async () => {
  fs.mkdirSync(out, {recursive:true});
  const browser = await chromium.launch({channel:'msedge', headless:true});
  try {
    const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const saved=[], errors=[], statuses=[];
    const intake=createResearchIntake({enabled:true,hmacKey:'synthetic-hmac-key-at-least-thirty-two-bytes',origins:[new URL(base).origin]}, {
      response:async record => {saved.push(record);return {code:'accepted',response_id:'11111111-1111-4111-8111-111111111111'};},
      contact:async()=>{throw Error('unexpected contact write');},
    });
    await context.route('**/api/research/**', async route => {
      assert.equal(new URL(route.request().url()).pathname,'/api/research/responses');
      const response=await intake.response(new Request(route.request().url(),{method:'POST',headers:{Origin:new URL(base).origin,'Content-Type':'application/json'},body:route.request().postData()}));
      statuses.push(response.status);
      await route.fulfill({status:response.status,headers:Object.fromEntries(response.headers),body:await response.text()});
    });
    const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
    for (const audience of ['giocatori','circoli']) {
      await page.goto(`${base}/ricerca/${audience}`,{waitUntil:'networkidle'});
      await page.getByLabel('Fascia di età').selectOption('18_plus');
      await page.getByRole('button',{name:'Inizia la ricerca',exact:true}).click();
      const answers=fixtures[audience];
      for (const question of questions(audience,answers)) {
        for (const field of question.fields) {
          for (const value of answers[field.id]) await page.locator(`input[name="${field.id}"][value="${value}"]`).check();
        }
        if (question.fields.some(field=>field.multi)) await page.locator('.research-actions button[type=submit]').click();
      }
      const submit=page.getByRole('button',{name:/Invia le risposte/});
      await submit.waitFor();assert.equal(await submit.isDisabled(),true);
      await page.getByRole('checkbox',{name:/Ho letto/}).check();
      await page.screenshot({path:path.join(out,`${audience}-review.png`),fullPage:true});
      await submit.click();
      await page.getByRole('heading',{name:/Restare in contatto/}).waitFor();
      assert.deepEqual(saved.at(-1).answers,answers);
      assert.equal(saved.at(-1).survey_version,VERSION);
      await page.screenshot({path:path.join(out,`${audience}-accepted.png`),fullPage:true});
    }
    assert.deepEqual(statuses,[202,202]);assert.deepEqual(errors,[]);
    const report={base,version:VERSION,statuses,errors,hostedWrites:0,validatedAudiences:['giocatori','circoli']};
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
