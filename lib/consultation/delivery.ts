import type { ServerConfig } from './server-config';
import { DeliveryError, type Job, type LeadStore } from './store';
import type { HubSpotClient } from './hubspot';
export function retryDelay(attempt:number,retryAfter=0){return Math.min(86400,Math.max(retryAfter,60*2**Math.min(attempt-1,10)));}
export class TeamNotifier{
 constructor(private config:Pick<ServerConfig,'resendKey'|'resendFrom'>,private fetcher:typeof fetch=fetch){}
 async send(job:Job):Promise<string>{
  // A timeout after the provider accepted a message is ambiguous. After its
  // idempotency window, require operator review rather than risking duplicates.
  if(job.notification_attempts>1&&Date.now()-Date.parse(job.notification_first_attempt_at)>23*60*60*1000)throw new DeliveryError('NOTIFICATION_REVIEW_REQUIRED',false);
  let res:Response;
  try{res=await this.fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${this.config.resendKey}`,'Content-Type':'application/json','Idempotency-Key':`polpo-consultation-${job.id}`},body:JSON.stringify({from:this.config.resendFrom,to:['info@polpo-ai.com'],subject:`Nuova richiesta Polpo AI · ${job.id.slice(0,8)}`,text:`Una richiesta è stata acquisita in modo durevole.\n\nRiferimento: ${job.id}\nSettore: ${job.payload.sector}\nAcquisita: ${job.acquired_at}\n\nLa sincronizzazione HubSpot è gestita separatamente. Consulta l’archivio lead riservato al team se il contatto non è ancora nel CRM.\n\nQuesta notifica non contiene i dati personali o il testo libero della richiesta.`}),signal:AbortSignal.timeout(4500),cache:'no-store'});}catch{throw new DeliveryError('NOTIFICATION_TIMEOUT',true);}
  if(!res.ok)throw new DeliveryError(`NOTIFICATION_HTTP_${res.status}`,res.status===429||res.status>=500,Number(res.headers.get('retry-after'))||60);
  const body=await res.json().catch(()=>null);if(!body?.id||typeof body.id!=='string')throw new DeliveryError('NOTIFICATION_INVALID_RESPONSE',true);return body.id;
 }
}
export async function deliverOne(job:Job,store:Pick<LeadStore,'checkpoint'|'release'>,crm:Pick<HubSpotClient,'sync'>,notifier:Pick<TeamNotifier,'send'>){
 let completed=0,failed=0;
 async function channel(name:'crm'|'notification',action:()=>Promise<{id:string;companyId?:string|null}>){
  const attempts=name==='crm'?job.crm_attempts:job.notification_attempts;
  try{const result=await action();if(!await store.checkpoint(job,name,name==='crm'?'synced':'sent',result.id,null,60,result.companyId||null))throw new DeliveryError('LEASE_LOST',true);completed++;}
  catch(error){const safe=error instanceof DeliveryError?error:new DeliveryError('DELIVERY_UNAVAILABLE',true);if(safe.code==='LEASE_LOST')throw safe;const permanent=!safe.retryable||attempts>=8;const saved=await store.checkpoint(job,name,permanent?'failed':'pending',null,safe.code,retryDelay(attempts,safe.retryAfter));if(!saved)throw new DeliveryError('LEASE_LOST',true);failed++;}
 }
 try{
  if(job.crm_due)await channel('crm',async()=>{const result=await crm.sync(job);return {id:result.contactId,companyId:result.companyId};});
  if(job.notification_due)await channel('notification',async()=>({id:await notifier.send(job)}));
 }finally{await store.release(job);}
 return {completed,failed};
}
