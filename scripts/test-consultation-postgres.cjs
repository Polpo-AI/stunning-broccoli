// Destructive test setup: ONLY a new, empty, disposable LOCAL database.
const fs=require('node:fs'),assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
const {Client}=require(process.env.POLPO_TEST_PG_MODULE||'pg');
async function run(){
 const url=new URL(process.env.POLPO_TEST_DATABASE_URL||'');
 if(!['127.0.0.1','localhost'].includes(url.hostname)||process.env.POLPO_TEST_ISOLATED!=='true')throw Error('ISOLATED_LOCAL_DATABASE_REQUIRED');
 const db=new Client({connectionString:url.href});await db.connect();
 const count=await db.query("select count(*) from information_schema.tables where table_schema='public'");assert.equal(Number(count.rows[0].count),0,'database must be empty');
 await db.query('create role anon; create role authenticated; create role service_role bypassrls');
 await db.query(fs.readFileSync('supabase/migrations/20261104_polpo_consultation.sql','utf8'));
 const rpc=async(name,args=[])=> (await db.query(`select public.${name}(${args.map((_,i)=>'$'+(i+1)).join(',')}) as value`,args)).rows[0].value;
 const acquire=(key=randomUUID(),fingerprint=randomUUID(),contact=randomUUID(),ip=randomUUID())=>rpc('polpo_consultation_acquire',[key,fingerprint,contact,ip,JSON.stringify({synthetic:true}),'test-only','test-email-only']);
 let checks=0;
 try{
  const key=randomUUID(),fingerprint=randomUUID();const copies=await Promise.all(Array.from({length:8},async()=>{const parallel=new Client({connectionString:url.href});await parallel.connect();try{return (await parallel.query('select public.polpo_consultation_acquire($1,$2,$3,$4,$5,$6,$7) as value',[key,fingerprint,randomUUID(),randomUUID(),JSON.stringify({synthetic:true}),'test-only','test-only'])).rows[0].value;}finally{await parallel.end();}}));assert.equal(new Set(copies.map(r=>r.request_id)).size,1);checks++;
  assert.equal((await acquire(key,'changed')).code,'conflict');checks++;
  assert.equal((await acquire(randomUUID(),fingerprint)).request_id,copies[0].request_id);checks++;
  const contact=randomUUID();for(let i=0;i<3;i++)assert.equal((await acquire(randomUUID(),randomUUID(),contact)).code,'accepted');assert.equal((await acquire(randomUUID(),randomUUID(),contact)).code,'rate_limited');checks++;
  await db.query('set role anon');await assert.rejects(()=>db.query('select * from public.polpo_consultation_requests'),/permission denied/);await assert.rejects(()=>rpc('polpo_consultation_claim'),/permission denied/);await db.query('reset role');checks++;
  // Clear synthetic requests to isolate lease/order tests.
  await db.query('truncate public.polpo_consultation_requests cascade');
  const same=randomUUID(),first=await acquire(randomUUID(),randomUUID(),same),second=await acquire(randomUUID(),randomUUID(),same);
  const job=await rpc('polpo_consultation_claim');assert.equal(job.id,first.request_id);assert.equal(job.crm_due,true);checks++;
  const concurrent=await rpc('polpo_consultation_claim');assert.equal(concurrent.id,second.request_id);assert.equal(concurrent.crm_due,false);assert.equal(concurrent.notification_due,true);checks++;
  assert.equal(await rpc('polpo_consultation_checkpoint',[job.id,randomUUID(),'crm','synced',null,null,null,60]),false);checks++;
  assert.equal(await rpc('polpo_consultation_checkpoint',[job.id,job.lease_token,'crm','pending',null,null,'HUBSPOT_TIMEOUT',60]),true);
  await rpc('polpo_consultation_checkpoint',[job.id,job.lease_token,'notification','sent','synthetic-email',null,null,60]);await rpc('polpo_consultation_release',[job.id,job.lease_token]);
  await rpc('polpo_consultation_checkpoint',[concurrent.id,concurrent.lease_token,'notification','sent','synthetic-email-2',null,null,60]);await rpc('polpo_consultation_release',[concurrent.id,concurrent.lease_token]);
  assert.equal(await rpc('polpo_consultation_claim'),null,'newer CRM must wait for earlier retry');checks++;
  await db.query("update public.polpo_consultation_requests set crm_next_at=now()-interval '1 second' where id=$1",[job.id]);
  const retry=await rpc('polpo_consultation_claim');assert.equal(retry.id,job.id);assert.equal(retry.notification_due,false);assert.equal(retry.crm_attempts,2);checks++;
  await rpc('polpo_consultation_checkpoint',[retry.id,retry.lease_token,'crm','synced','synthetic-contact',null,null,60]);await rpc('polpo_consultation_release',[retry.id,retry.lease_token]);
  const next=await rpc('polpo_consultation_claim');assert.equal(next.id,second.request_id);assert.equal(next.crm_due,true);checks++;
  await db.query("update public.polpo_consultation_requests set locked_until=now()-interval '1 second' where id=$1",[next.id]);
  assert.equal(await rpc('polpo_consultation_checkpoint',[next.id,next.lease_token,'crm','synced',null,null,null,60]),false);const reclaimed=await rpc('polpo_consultation_claim');assert.notEqual(reclaimed.lease_token,next.lease_token);checks++;
  await rpc('polpo_consultation_checkpoint',[reclaimed.id,reclaimed.lease_token,'crm','failed',null,null,'HUBSPOT_HTTP_403',60]);await rpc('polpo_consultation_release',[reclaimed.id,reclaimed.lease_token]);
  await rpc('polpo_consultation_redrive',[reclaimed.id]);const redrive=await rpc('polpo_consultation_claim');assert.equal(redrive.notification_due,false);assert.equal(redrive.crm_attempts,1);checks++;
  await rpc('polpo_consultation_release',[redrive.id,redrive.lease_token]);
  const journey=randomUUID();await rpc('polpo_consultation_event',[journey,'start',1,'test-ip']);await rpc('polpo_consultation_event',[journey,'start',1,'test-ip']);assert.equal(Number((await db.query('select count(*) from public.polpo_consultation_events')).rows[0].count),1);checks++;
  await db.query("update public.polpo_consultation_requests set acquired_at=now()-interval '365 days'");await rpc('polpo_consultation_maintenance',[30]);assert.equal(Number((await db.query('select count(*) from public.polpo_consultation_requests')).rows[0].count),1,'unresolved request retained, completed removed');checks++;
  console.log(JSON.stringify({postgresChecks:checks,status:'passed',remoteServicesTested:false}));
 }finally{await db.end();}
}
run().catch(e=>{console.error(e.message);process.exitCode=1;});
