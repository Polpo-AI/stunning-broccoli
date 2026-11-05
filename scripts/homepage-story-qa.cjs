const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
// Optional browser tooling supplied by the operator; no project dependency added.
const { chromium } = require(process.env.POLPO_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.POLPO_HOME_QA_URL || 'http://127.0.0.1:3137';
const out = path.resolve('docs/homepage-story/qa');
const ids = ['general','sport','beauty','restaurant','studio','hospitality'];
let browser;
(async () => {
 fs.mkdirSync(out,{recursive:true});
 browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({reducedMotion:'reduce'});
 const report={base,layouts:[],keyboard:[],touch:[],routes:[],errors:[]};
 page.on('pageerror',e=>report.errors.push(e.message));
 // Comparison is read-only against the existing public homepage.
 for(const width of process.env.POLPO_HOME_QA_SKIP_BASELINE==='true'?[]:[390,1440]){
  await page.setViewportSize({width,height:width===390?844:1000});
  await page.goto('https://polpo-ai.com',{waitUntil:'networkidle'});
  await page.screenshot({path:path.join(out,`before-${width}.jpg`),fullPage:true,type:'jpeg',quality:70});
 }
 await page.goto(base,{waitUntil:'networkidle'});
 await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').getAttribute('class'),'a-skip');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
 for(const width of [320,390,700,768,1024,1440,1920]){
  await page.setViewportSize({width,height:width<761?844:1000});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('[role=tab]').count(),6);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  assert.equal(overflow,false,`overflow at ${width}`);
  for(const id of ids){
   await page.locator(`#demo-tab-${id}`).click();
   assert.equal(await page.locator('[role=tabpanel]:visible').count(),1);
   for(let step=0;step<3;step++){
    await page.getByRole('button',{name:`Passaggio ${step+1}:`,exact:false}).click();
    assert.equal(await page.locator('.demo-stage').getAttribute('data-step'),String(step));
    assert.equal(await page.locator('.demo-panel:visible .demo-moment:visible').count(),1);
    const clipped=await page.locator('.demo-panel:visible').evaluate(el=>{const stage=document.querySelector('.demo-stage').getBoundingClientRect();const r=el.getBoundingClientRect();return r.bottom>stage.bottom+1||r.right>innerWidth+1;});
    assert.equal(clipped,false,`clipped demo ${width}/${id}/${step}`);
   }
  }
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  const hero=await page.locator('#hero-title').boundingBox();
  const lead=await page.locator('.a-hero .a-lead').boundingBox();
  if(width<761){assert.ok(hero.y>=90);assert.ok(hero.height<230);assert.ok(lead.y+lead.height<650,`mobile value too low ${width}`);}
  await page.locator('#demo-tab-general').click();await page.getByRole('button',{name:'Passaggio 2: Polpo al lavoro',exact:true}).click();
  if([320,390,768,1440].includes(width)){
   await page.screenshot({path:path.join(out,`after-${width}.jpg`),fullPage:true,type:'jpeg',quality:75});
   await page.locator('.action-explorer').screenshot({path:path.join(out,`demo-${width}.jpg`),type:'jpeg',quality:80});
  }
  report.layouts.push({width,scenarios:6,stepsPerScenario:3,overflow:false,heroBottom:Math.round(hero.y+hero.height),leadBottom:Math.round(lead.y+lead.height)});
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('#demo-tab-general').focus();await page.keyboard.press('End');assert.equal(await page.locator(':focus').getAttribute('id'),'demo-tab-hospitality');await page.keyboard.press('ArrowRight');assert.equal(await page.locator(':focus').getAttribute('id'),'demo-tab-general');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator(':focus').getAttribute('id'),'demo-tab-hospitality');await page.keyboard.press('Home');assert.equal(await page.locator(':focus').getAttribute('id'),'demo-tab-general');report.keyboard.push('End/Home/arrow wrap and focus pass');
 await page.locator('.demo-stage').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:280,clientY:220}]});await page.locator('.demo-stage').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:70,clientY:225}]});assert.equal(await page.locator('.demo-stage').getAttribute('data-world'),'sport');report.touch.push('horizontal swipe changes scenario');
 await page.locator('.demo-stage').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:200,clientY:100}]});await page.locator('.demo-stage').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:180,clientY:350}]});assert.equal(await page.locator('.demo-stage').getAttribute('data-world'),'sport');report.touch.push('vertical scroll does not change scenario');
 await page.getByRole('button',{name:'Passaggio 3: Azione e risultato',exact:true}).click();await page.locator('#demo-tab-beauty').click();assert.equal(await page.locator('.demo-stage').getAttribute('data-step'),'0');
 assert.ok((await page.locator('.a-button').evaluateAll(es=>es.map(e=>e.getAttribute('href')))).every(href=>href==='/contatti'));
 for(const route of ['/soluzioni','/settori','/metodo','/contatti','/agenti-ai','/chatbot-whatsapp-prenotazioni','/chatbot-whatsapp-prenotazioni-padel','/chatbot-whatsapp-prenotazioni-centri-estetici','/chatbot-whatsapp-prenotazioni-ristoranti','/chatbot-whatsapp-prenotazioni-hotel-bb']){const r=await page.goto(base+route);assert.equal(r.status(),200);report.routes.push({route,status:r.status()});}
 await page.goto(base+'/settori');assert.equal(await page.locator('[role=tab]').count(),5);assert.equal(await page.locator('.demo-stage').count(),0);
 await page.goto(base);await page.locator('.a-text-link').click();assert.equal(new URL(page.url()).hash,'#soluzioni');await page.locator('.solution-example').first().locator('summary').click();assert.ok(await page.locator('.solution-example').first().getAttribute('open')!==null);
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(base);assert.equal(await np.locator('.demo-panel:visible').count(),6);assert.equal(await np.locator('.demo-moment:visible').count(),18);assert.ok(await np.locator('h1').isVisible());await np.screenshot({path:path.join(out,'no-js-390.jpg'),fullPage:true,type:'jpeg',quality:70});await nojs.close();
 const reduced=await page.locator('.a-hero-art img').evaluate(el=>getComputedStyle(el).animationName);assert.equal(reduced,'none');
 assert.deepEqual(report.errors,[]);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({...report,noJavaScript:'6 scenarios, 18 moments visible',reducedMotion:'none',oldSectorExplorer:'5 tabs preserved'},null,2));await browser.close();console.log(JSON.stringify({layouts:report.layouts.length,scenarioSteps:126,routes:report.routes.length,errors:report.errors}));
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1;});
