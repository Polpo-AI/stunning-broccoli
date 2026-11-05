// Synthetic browser acceptance test. Run acquisition, inspect DB/CRM, then --withdraw.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
const base=process.env.POLPO_LAUNCH_BASE_URL||'https://polpo-ai.com';
const live=base==='https://polpo-ai.com',withdraw=process.argv.includes('--withdraw');
if(!live&&!/^http:\/\/127\.0\.0\.1:3193$/.test(base))throw Error('UNAPPROVED_HOST');
if(live&&!process.argv.includes('--write-synthetic'))throw Error('SYNTHETIC_WRITE_FLAG_REQUIRED');
const file=process.env.POLPO_LAUNCH_FIXTURE_FILE||'/tmp/polpo-launch-fixtures.json';
const out=process.env.POLPO_LAUNCH_EVIDENCE||'/tmp/polpo-launch-evidence';
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||'/usr/bin/chromium',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();page.setDefaultTimeout(15000);
const report={base,live,errors:[],layouts:[],surveys:[],telemetry:[]};page.on('pageerror',e=>report.errors.push(e.message));
page.on('request',r=>{if(page.url().includes('/ricerca')&&/analytics|insights|vitals/.test(r.url()))report.telemetry.push(r.url());});
const choose=async (field,value)=>page.locator(`input[name="${field}"][value="${value}"]`).check();
const next=async()=>page.getByRole('button',{name:'Continua',exact:true}).click();
async function layout(label){await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));const x=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(x.scroll<=x.width+1,`${label} overflow ${JSON.stringify(x)}`);report.layouts.push({label,...x});}
try{
if(withdraw){const fixture=JSON.parse(fs.readFileSync(file));await page.goto(base+'/ricerca/revoca');for(const item of fixture.surveys){await page.getByLabel('Dati da cancellare').selectOption('response');await page.getByLabel('Codice di revoca').fill(item.body.idempotencyKey);await page.getByRole('button',{name:'Revoca e cancella',exact:true}).click();await page.getByRole('status').filter({hasText:'Revoca elaborata'}).waitFor();const retry=await context.request.post(base+'/api/research/responses',{data:item.body,headers:{Origin:base}});assert.equal(retry.status(),409);}
if(fixture.contact){const r=await context.request.post(base+'/api/research/withdraw',{data:{purpose:'contact',code:fixture.contact.idempotencyKey},headers:{Origin:base}});assert.equal(r.status(),200);}
report.withdrawal=true;fs.writeFileSync(out+'/withdrawal.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));return;}
const fixture={surveys:[]};
for(const audience of ['giocatori','circoli']){
 const response=await page.goto(base+'/ricerca/'+audience);assert.equal(response.status(),200);assert.match(response.headers()['x-robots-tag'],/noindex/);assert.match(response.headers()['cache-control'],/no-store/);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});await layout(`${audience}-intro`);}
 await page.setViewportSize({width:390,height:844});await page.getByLabel('Fascia di età').selectOption('under_14');assert.equal(await page.getByRole('button',{name:/Inizia la ricerca/}).isDisabled(),true);
 await page.getByLabel('Fascia di età').selectOption(audience==='giocatori'?'14_17':'18_plus');await page.getByRole('button',{name:/Inizia la ricerca/}).click();
 if(audience==='giocatori'){
 await choose('frequency','monthly');await next();await choose('group','friends');await next();await choose('channel','never');await choose('bookingChannel','never');await next();await choose('ease','na');await next();await choose('failures','no_intent');await next();await choose('obstacle','no_intent');await next();await choose('aiActions','none');
 }else{
 await choose('role','manager');await choose('courts','3_5');await next();await choose('tools','none');await next();await choose('problems','none');await next();await choose('mainActivity','na');await choose('activeHours','na');await choose('incidents','na');await next();await choose('satisfaction','na');await next();await choose('priority','none');await page.locator('textarea').fill('POLPO_SYNTHETIC_PRODUCTION_TEST');await next();await choose('interest','no');
 }
 await page.getByRole('button',{name:/Rivedi la prova/}).click();assert.equal(await page.getByRole('button',{name:/Invia le risposte/}).isDisabled(),true);await page.getByRole('checkbox',{name:/Ho letto/}).check();
 const wait=page.waitForResponse(r=>r.url().endsWith('/api/research/responses')&&r.request().method()==='POST');await page.getByRole('button',{name:/Invia le risposte/}).click();const sent=await wait;assert.equal(sent.status(),202,await sent.text());const receipt=await sent.json();const body=sent.request().postDataJSON();fixture.surveys.push({audience,body,receipt});report.surveys.push({audience,receipt:receipt.receipt,ageBand:body.ageBand,status:202});
 const duplicate=await context.request.post(base+'/api/research/responses',{data:body,headers:{Origin:base}});assert.equal(duplicate.status(),202);assert.equal((await duplicate.json()).duplicate,true);
 const invalid=await context.request.post(base+'/api/research/responses',{data:{...body,consentAccepted:false},headers:{Origin:base}});assert.equal(invalid.status(),422);
 await page.getByRole('heading',{name:/Restare in contatto/}).waitFor();await layout(`${audience}-contact`);await page.screenshot({path:`${out}/${audience}-receipt.png`,fullPage:true,mask:[page.locator('code')]});
 if(audience==='circoli'){
 await page.getByLabel('Email facoltativa').fill('polpo-research-synthetic@example.test');await page.getByRole('checkbox',{name:/Acconsento al trattamento della mia email/}).check();const waitContact=page.waitForResponse(r=>r.url().endsWith('/api/research/contacts')&&r.request().method()==='POST');await page.getByRole('button',{name:/Salva il recapito/}).click();const contact=await waitContact;assert.equal(contact.status(),202,await contact.text());fixture.contact=contact.request().postDataJSON();assert.equal(fixture.contact.marketingOptIn,false);assert.notEqual(fixture.contact.idempotencyKey,body.idempotencyKey);
 }
 const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));assert.deepEqual(storage,{local:0,session:0});
}
fs.writeFileSync(file,JSON.stringify(fixture,null,2),{mode:0o600});
await page.goto(base+'/');assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('#hero-title').innerText(),'Otto braccia. Una sola missione: liberare le tue.');
for(const width of [390,1440]){await page.setViewportSize({width,height:900});await layout('homepage');assert.equal(await page.locator('#hero-title').evaluate(e=>getComputedStyle(e).opacity),'1');await page.screenshot({path:`${out}/home-${width}.png`});}
if(live){
 await page.goto(base+'/contatti');await page.setViewportSize({width:390,height:844});await page.locator('.cw-sector:has(input[value=sport])').click();await next();await page.locator('.cw-problem').nth(1).click();await next();await page.locator('.cw-tool').first().click();await next();await page.locator('textarea').fill('POLPO_SYNTHETIC_PRODUCTION_TEST');await next();
 const id=randomUUID(),email=`info+polpo-test-${id}@polpo-ai.com`;await page.locator('input[name=name]').fill('POLPO TEST');await page.locator('input[name=businessName]').fill('TEST TECNICO POLPO');await page.locator('input[name=email]').fill(email);await page.locator('.cw-consent').click();assert.equal(await page.locator('.cw-consent').count(),1);
 const wait=page.waitForResponse(r=>r.url().endsWith('/api/consultation')&&r.request().method()==='POST');await page.getByRole('button',{name:'Invia la richiesta di analisi',exact:true}).click();const sent=await wait;assert.equal(sent.status(),202,await sent.text());const receipt=await sent.json();fixture.consultation={reference:receipt.reference,email,body:sent.request().postDataJSON()};assert.equal(fixture.consultation.body.marketingOptIn,false);await page.locator('.cw-receipt').waitFor();await page.screenshot({path:out+'/consultation-receipt.png',fullPage:true});report.consultation={reference:receipt.reference,status:202};
 const retry=await context.request.post(base+'/api/consultation',{data:fixture.consultation.body,headers:{Origin:base}});assert.equal(retry.status(),202);assert.equal((await retry.json()).reference,receipt.reference);
 assert.equal((await context.request.post(base+'/api/contact',{data:{}})).status(),410);
 assert.equal((await context.request.get(base+'/api/internal/consultation-delivery-evidence')).status(),401);
 assert.equal((await context.request.get(base+'/contatti/prova')).status(),404);
 fs.writeFileSync(file,JSON.stringify(fixture,null,2),{mode:0o600});
}
assert.deepEqual(report.errors,[]);assert.deepEqual(report.telemetry,[]);fs.writeFileSync(out+'/acquisition.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
