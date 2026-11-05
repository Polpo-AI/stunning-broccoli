const {chromium}=require(process.env.POLPO_TEST_PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const base=process.env.POLPO_TEST_BASE_URL||'http://localhost:3107';
 const browser=await chromium.launch({channel:'msedge',headless:true}),report={base,checks:[],errors:[],requests:[]};
 const out=process.env.POLPO_TEST_QA_DIR||'docs/consultation/qa';fs.mkdirSync(out,{recursive:true});
 try{
  for(const width of [320,390,768,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage();
   page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')report.requests.push({url:r.url(),method:r.method()});});
   await page.goto(base+'/contatti');await page.locator('.cw-sector').first().waitFor();
   assert.ok(await page.locator('.cw-preview').isVisible());
   assert.ok(await page.locator('meta[name="robots"]').getAttribute('content').then(s=>s.includes('noindex')));
   const overflow=()=>page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(await overflow(),false,'overflow at '+width);
   await page.locator('.cw-navigation button').click();await page.getByText('Scegli un settore per continuare.').waitFor();
   await page.locator('input[value="sport"]').locator('..').click();await page.getByRole('button',{name:'Continua',exact:true}).click();
   await page.getByRole('checkbox',{name:'Messaggi',exact:false}).locator('..').click();await page.getByRole('checkbox',{name:'Prenotazioni',exact:false}).locator('..').click();
   await page.getByRole('button',{name:'Continua',exact:true}).click();
   await page.getByRole('checkbox',{name:'WhatsApp',exact:true}).locator('..').click();await page.getByRole('checkbox',{name:'Gestionali',exact:true}).locator('..').click();
   await page.getByPlaceholder('Per esempio, Playtomic').fill('Playtomic test');assert.ok(await page.getByText('Usi Playtomic?',{exact:false}).isVisible());
   await page.getByRole('button',{name:'Continua',exact:true}).click();await page.locator('textarea').fill('Solo dati sintetici di prova.');
   await page.getByRole('button',{name:'Continua',exact:true}).click();
   await page.locator('input[name="name"]').fill('Persona test');await page.locator('input[name="businessName"]').fill('Attività test');await page.locator('input[name="phone"]').fill('+393331234567');
   assert.equal(await page.getByRole('checkbox',{name:/aggiornamenti/i}).count(),0);
   const primary=page.getByLabel('Qual è il passaggio principale?');await primary.selectOption('messages');assert.equal(await primary.inputValue(),'messages');
   await page.locator('input[name="email"]').fill('persona@example.test');
   assert.equal(await page.getByRole('button',{name:'Invio non ancora attivo'}).isDisabled(),true);
   assert.equal(await page.getByRole('checkbox',{name:/Ho preso visione/}).isDisabled(),true);
   assert.equal(await page.getByRole('link',{name:/informativa privacy/}).getAttribute('href'),'/privacy');
   await page.getByRole('button',{name:'Modifica strumenti'}).click();assert.equal(await page.getByPlaceholder('Per esempio, Playtomic').inputValue(),'Playtomic test');
   await page.getByRole('button',{name:'Continua',exact:true}).click();assert.equal(await page.locator('textarea').inputValue(),'Solo dati sintetici di prova.');
   await page.getByRole('button',{name:'Continua',exact:true}).click();assert.equal(await page.locator('input[name="name"]').inputValue(),'Persona test');
   assert.equal(await overflow(),false,'final overflow at '+width);
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${out}/contact-${width}-summary.png`,fullPage:true});
   await page.getByRole('button',{name:'Modifica settore'}).click();
   for(const sector of ['beauty','restaurant','professional','hospitality','other','sport']){await page.locator(`input[value="${sector}"]`).locator('..').click();assert.equal(await page.locator('.cw-scene').getAttribute('data-sector'),sector);}
   await page.getByRole('button',{name:'Disattiva le animazioni'}).click();assert.equal(await page.locator('.consultation-page').getAttribute('data-quiet'),'true');
   assert.equal(await page.locator('.cw-scene-object img').evaluate(e=>getComputedStyle(e).animationName),'none');
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${out}/contact-${width}-start.png`,fullPage:true});
   const stored=await page.evaluate(()=>JSON.stringify({...sessionStorage,...localStorage}));assert.ok(!/Persona test|persona@example|3331234567|Solo dati/.test(stored));
   await page.locator('input[value="sport"]').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('input[value="beauty"]').isChecked(),true);
   report.checks.push({width,forwardBackRetainsData:true,disabledIntake:true,allSectors:true,noOverflow:true,keyboardRadio:true,reducedMotion:true,noPersonalStorage:true});
   await page.goto(base+'/privacy');assert.ok(await page.getByRole('heading',{name:'Titolare e contatti'}).isVisible());assert.ok(await page.locator('meta[name="robots"]').getAttribute('content').then(s=>s.includes('noindex')));
   const intake=await context.request.post(base+'/api/consultation',{data:{synthetic:true}});assert.equal(intake.status(),503);
   const worker=await context.request.get(base+'/api/internal/consultation-deliveries');assert.equal(worker.status(),401);
   await context.close();
  }
  assert.deepEqual(report.errors,[]);assert.equal(report.requests.filter(r=>r.url.includes('/api/consultation')).length,0);
  fs.writeFileSync(out+'/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({responsiveWidths:report.checks.length,errors:report.errors.length,status:'passed',remoteDeliveryTested:false}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
