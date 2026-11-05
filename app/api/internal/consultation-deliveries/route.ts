import { readConfig } from '@/lib/consultation/server-config';
import { LeadStore } from '@/lib/consultation/store';
import { authenticated } from '@/lib/consultation/intake';
import { HubSpotClient } from '@/lib/consultation/hubspot';
import { deliverOne, TeamNotifier } from '@/lib/consultation/delivery';
export const runtime='nodejs';export const dynamic='force-dynamic';export const maxDuration=120;
async function run(request:Request){
 const config=readConfig();const headers={'Cache-Control':'no-store'};
 if(!authenticated(request,config.workerSecret))return Response.json({code:'unauthorized'},{status:401,headers});
 if(!config.workerEnabled)return Response.json({code:'not_available'},{status:503,headers});
 const store=new LeadStore(config),crm=new HubSpotClient(config),notifier=new TeamNotifier(config);
 let jobs=0,completed=0,failed=0;const started=Date.now();
 try{
  await crm.verifyPortal();
  while(jobs<3&&Date.now()-started<20000){const job=await store.claim();if(!job)break;const result=await deliverOne(job,store,crm,notifier);jobs++;completed+=result.completed;failed+=result.failed;}
  await store.maintenance(config.retentionDays);
  return Response.json({jobs,completed,failed},{headers});
 }catch{return Response.json({code:'worker_unavailable',jobs,completed,failed},{status:503,headers});}
}
// GET supports authenticated scheduler delivery; no public data/status endpoint.
export const GET=run;export const POST=run;
