// Unit test della logica pura di lib/analytics.ts (consenso, ID, parametri senza dati personali).
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),ts=require('typescript');
const test=require('node:test'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'polpo-analytics-tests-'));
fs.writeFileSync(path.join(dir,'analytics.js'),ts.transpileModule(fs.readFileSync('lib/analytics.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const a=require(path.join(dir,'analytics.js'));
const now=Date.UTC(2026,10,19);
const stored=(over={})=>JSON.stringify({v:a.CONSENT_VERSION,analytics:'granted',at:now-1000,...over});

test('consenso valido letto, scelte malformate o di altre versioni ignorate',()=>{
  assert.deepEqual(a.parseConsent(stored(),now),{v:a.CONSENT_VERSION,analytics:'granted',at:now-1000});
  assert.equal(a.parseConsent(stored({analytics:'denied'}),now).analytics,'denied');
  for(const raw of [null,'','{',stored({v:a.CONSENT_VERSION+1}),stored({analytics:'yes'}),stored({at:'ieri'}),stored({at:now+86400000})])assert.equal(a.parseConsent(raw,now),null,raw);
});
test('il banner torna dopo 6 mesi',()=>{
  assert.notEqual(a.parseConsent(stored({at:now-a.CONSENT_MAX_AGE_MS+60000}),now),null);
  assert.equal(a.parseConsent(stored({at:now-a.CONSENT_MAX_AGE_MS-1}),now),null);
});
test('ID dei tracker validati: un valore sbagliato spegne il tracker invece di caricare script strani',()=>{
  assert.equal(a.gaMeasurementId(' G-PCBG858X6H '),'G-PCBG858X6H');
  assert.equal(a.clarityProjectId('zfwo22z9op'),'zfwo22z9op');
  for(const v of [undefined,'','UA-123','G-<script>','G-PCBG858X6H"'])assert.equal(a.gaMeasurementId(v),null,v);
  for(const v of [undefined,'','zfw','zfwo22z9op/../x','ZFWO22Z9OP'])assert.equal(a.clarityProjectId(v),null,v);
});
test('percorsi riservati senza tracker',()=>{
  for(const p of ['/ricerca','/ricerca/giocatori','/contatti/prova','/contatti/prova/abc'])assert.equal(a.isPrivatePath(p),true,p);
  for(const p of ['/','/contatti','/ricercatore','/soluzioni'])assert.equal(a.isPrivatePath(p),false,p);
});
test('parametri degli eventi: niente email, telefoni, chiavi strane o testi lunghi',()=>{
  const clean=a.sanitizeParams({cta_text:'  Richiedi   la tua analisi ',email_text:'scrivi a mario@example.com',phone:'+39 333 123 4567',step:3,ok:true,'Bad-Key':'x',long:'x'.repeat(300),nan:NaN,skip:undefined});
  assert.deepEqual(clean,{cta_text:'Richiedi la tua analisi',step:3,ok:true,long:'x'.repeat(100)});
});
test('soglie di scroll inviate una volta sola',()=>{
  assert.deepEqual(a.crossedScrollThresholds(60,new Set()),[25,50]);
  assert.deepEqual(a.crossedScrollThresholds(95,new Set([25,50])),[75,90]);
  assert.deepEqual(a.crossedScrollThresholds(10,new Set()),[]);
});
test('trackEvent non invia niente senza consenso',()=>{
  const calls=[];global.window={location:{pathname:'/'},gtag:(...x)=>calls.push(x),__polpoAnalytics:{ga:'G-PCBG858X6H',granted:false}};
  a.trackEvent('cta_click',{cta_text:'x'});assert.equal(calls.length,0);
  window.__polpoAnalytics.granted=true;a.trackEvent('cta_click',{cta_text:'x'});assert.deepEqual(calls,[['event','cta_click',{cta_text:'x'}]]);
  window.location.pathname='/ricerca/giocatori';a.trackEvent('cta_click');assert.equal(calls.length,1);
  delete global.window;
});
