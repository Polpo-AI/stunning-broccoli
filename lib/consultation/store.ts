import type { Consultation, ConsultationEvent } from './domain';
import type { ServerConfig } from './server-config';
export type Job={id:string;payload:Consultation;privacy_version:string;marketing_version:string;acquired_at:string;contact_key:string;lease_token:string;crm_due:boolean;notification_due:boolean;crm_attempts:number;notification_attempts:number;notification_first_attempt_at:string;crm_contact_id:string|null};
export class DeliveryError extends Error{
 constructor(public code:string,public retryable:boolean,public retryAfter=60){super(code);this.name='DeliveryError';}
}
export class LeadStore{
 constructor(private config:Pick<ServerConfig,'databaseUrl'|'databaseKey'>,private fetcher:typeof fetch=fetch){}
 async rpc<T>(name:string,body:Record<string,unknown>):Promise<T>{
  try{
   const res=await this.fetcher(`${this.config.databaseUrl.replace(/\/$/,'')}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:this.config.databaseKey,Authorization:`Bearer ${this.config.databaseKey}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(5000),cache:'no-store'});
   if(!res.ok)throw new DeliveryError('STORAGE_UNAVAILABLE',true);
   return await res.json() as T;
  }catch{throw new DeliveryError('STORAGE_UNAVAILABLE',true);}
 }
 acquire(input:Consultation,fingerprint:string,contactKey:string,ipKey:string,privacyVersion:string,marketingVersion:string){return this.rpc<{code:'accepted'|'conflict'|'rate_limited';request_id?:string}>('polpo_consultation_acquire',{p_key:input.submissionId,p_fingerprint:fingerprint,p_contact_key:contactKey,p_ip_key:ipKey,p_payload:input,p_privacy_version:privacyVersion,p_marketing_version:marketingVersion});}
 claim(){return this.rpc<Job|null>('polpo_consultation_claim',{});}
 checkpoint(job:Job,channel:'crm'|'notification',status:'synced'|'sent'|'pending'|'failed',externalId:string|null,error:string|null,retrySeconds=60,companyId:string|null=null){return this.rpc<boolean>('polpo_consultation_checkpoint',{p_id:job.id,p_lease:job.lease_token,p_channel:channel,p_status:status,p_external_id:externalId,p_company_id:companyId,p_error:error,p_retry_seconds:retrySeconds});}
 release(job:Job){return this.rpc<boolean>('polpo_consultation_release',{p_id:job.id,p_lease:job.lease_token});}
 event(event:ConsultationEvent,ipKey:string){return this.rpc<boolean>('polpo_consultation_event',{p_journey:event.journeyId,p_event:event.event,p_step:event.step,p_ip_key:ipKey});}
 maintenance(days:number){return this.rpc<null>('polpo_consultation_maintenance',{p_retention_days:days});}
}
