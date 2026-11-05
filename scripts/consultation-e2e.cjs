// Explicit synthetic integration test, server CLI only. Never enables public HTTP intake.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),ts=require('typescript'),assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
(async()=>{
 if(!process.argv.includes('--write-synthetic')||process.env.POLPO_SYNTHETIC_E2E_ALLOWED!=='true')throw Error('SYNTHETIC_WRITES_NOT_AUTHORIZED');
 const base=new URL(process.env.POLPO_E2E_BASE_URL||'');
 if(base.protocol!=='https:'||base.hostname==='polpo-ai.com'||base.hostname==='www.polpo-ai.com')throw Error('PROTECTED_PREVIEW_REQUIRED');
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'polpo-e2e-'));
 for(const file of fs.readdirSync('lib/consultation').filter(f=>f.endsWith('.ts')))fs.writeFileSync(path.join(dir,file.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/consultation/'+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
 const {readConfig}=require(path.join(dir,'server-config.js')),{LeadStore}=require(path.join(dir,'store.js')),{intake}=require(path.join(dir,'intake.js'));
 const config=readConfig();if(!config.workerEnabled)throw Error('DELIVERY_CONFIGURATION_NOT_READY');
 const {HubSpotClient}=require(path.join(dir,'hubspot.js'));
 await new HubSpotClient(config).verifyPortal();
 const probe=await fetch(new URL('/api/consultation',base),{method:'POST',headers:{'Content-Type':'application/json',...(process.env.POLPO_E2E_PREVIEW_ACCESS_HEADER?{'x-vercel-trusted-oidc-idp-token':process.env.POLPO_E2E_PREVIEW_ACCESS_HEADER}:{})},body:'{}',signal:AbortSignal.timeout(10000)});
 assert.equal(probe.status,503,'Protected preview must be accessible and public intake must stay disabled');
 assert.equal((await probe.json()).code,'not_available');
 // No credential or fixture is exposed through a public bypass route.
 if(process.env.POLPO_E2E_EXPECTED_PORTAL_ID!==config.hubspotPortalId)throw Error('PORTAL_NOT_CONFIRMED');
 const payload={schemaVersion:1,submissionId:randomUUID(),journeyId:randomUUID(),sector:'sport',problems:['messages'],tools:['whatsapp'],managementSoftware:'',details:'SYNTHETIC INTEGRATION TEST — no real customer data',contact:{name:'POLPO SYNTHETIC TEST',businessName:'SYNTHETIC TEST ONLY',email:`polpo-synthetic-${randomUUID()}@example.test`,phone:'',preference:'email'},privacyAccepted:true,marketingOptIn:false,website:''};
 const storage=new LeadStore(config),origin=config.origins[0];
 const makeRequest=()=>new Request(origin+'/api/consultation',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(payload)});
 // Explicit local override only for this synthetic fixture; public route remains gated.
 const accepted=await intake(makeRequest(),{...config,enabled:true,privacyVersion:'synthetic-test-not-a-legal-acknowledgment',marketingVersion:'synthetic-no-marketing'},storage);
 assert.equal(accepted.status,202);const receipt=await accepted.json();
 const duplicate=await intake(makeRequest(),{...config,enabled:true,privacyVersion:'synthetic-test-not-a-legal-acknowledgment',marketingVersion:'synthetic-no-marketing'},storage);
 assert.equal((await duplicate.json()).reference,receipt.reference);
 console.log(JSON.stringify({reference:receipt.reference,acquired:true,awaitingActualScheduler:true}));
 // No direct worker invocation: success here must include an actual scheduled delivery.
 let record;
 for(let i=0;i<100;i++){
  const response=await fetch(`${config.databaseUrl.replace(/\/$/,'')}/rest/v1/polpo_consultation_requests?id=eq.${receipt.reference}&select=crm_status,notification_status,crm_contact_id,crm_company_id`,{headers:{apikey:config.databaseKey,Authorization:`Bearer ${config.databaseKey}`},signal:AbortSignal.timeout(5000)});
  if(!response.ok)throw Error('E2E_STORAGE_READBACK_FAILED');record=(await response.json())[0];
  if(record?.crm_status==='synced'&&record.notification_status==='sent')break;
  if(record?.crm_status==='failed'||record?.notification_status==='failed')throw Error('E2E_DELIVERY_FAILED_REQUEST_RETAINED');
  await new Promise(resolve=>setTimeout(resolve,3000));
 }
 if(record?.crm_status!=='synced'||record?.notification_status!=='sent')throw Error('E2E_SCHEDULER_OR_DELIVERY_NOT_VERIFIED_REQUEST_RETAINED');
 assert.equal(record.crm_company_id,null);
 const crm=await fetch(`https://api.hubapi.com/crm/objects/2026-09/contacts/${encodeURIComponent(record.crm_contact_id)}?properties=polpo_request_id,polpo_request_marketing_opt_in,polpo_company_match_status,polpo_settore,polpo_prodotto,polpo_origine_richiesta,polpo_strumenti`,{headers:{Authorization:`Bearer ${config.hubspotToken}`},signal:AbortSignal.timeout(5000)});
 if(!crm.ok)throw Error('E2E_CRM_READBACK_FAILED');const contact=await crm.json();
 assert.equal(contact.properties.polpo_request_id,receipt.reference);assert.equal(String(contact.properties.polpo_request_marketing_opt_in),'false');assert.equal(contact.properties.polpo_company_match_status,'manual_review');
 assert.equal(contact.properties.polpo_settore,'sport');assert.equal(contact.properties.polpo_prodotto,'automazioni_ai');assert.equal(contact.properties.polpo_origine_richiesta,'analisi_gratuita');assert.equal(contact.properties.polpo_strumenti,'whatsapp');
 const health=await storage.rpc('polpo_consultation_health',{});assert.equal(health.scheduler_enabled,true);assert.ok(health.scheduler_last_request_id,'Actual database scheduler request must exist');
 console.log(JSON.stringify({reference:receipt.reference,publicHttpIntakeBlocked:true,crmReadback:true,notificationProviderAccepted:true,schedulerDeliveryObserved:true,mailboxReceiptStillRequiresHumanCheck:true,syntheticRecordsRetainedForReview:true}));
})().catch(()=>{console.error('E2E_NOT_VERIFIED — check configuration and synthetic request in the restricted dashboard; no public gate changed');process.exitCode=1;});
