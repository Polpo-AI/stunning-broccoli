import {supportedContactLegalBasis} from './legal-basis';
import {sectorValues,problemValues,toolValues,commercialProperties} from './crm-mapping';
import type { ServerConfig } from './server-config';
import { DeliveryError, type Job } from './store';

type CRMRecord={id:string;properties:Record<string,string|null>;associations?:{companies?:{results:{id:string}[]}}};
const personalDomains=new Set(['gmail.com','googlemail.com','outlook.com','hotmail.com','hotmail.it','live.com','live.it','msn.com','yahoo.com','yahoo.it','icloud.com','me.com','mac.com','libero.it','virgilio.it','alice.it','tin.it','tiscali.it','aol.com','proton.me','protonmail.com','gmx.com','mail.com']);
export class HubSpotClient{
 constructor(private config:Pick<ServerConfig,'hubspotToken'|'hubspotPortalId'|'companyDomains'|'hubspotLegalBasis'>,private fetcher:typeof fetch=fetch){}
 async call<T>(path:string,method='GET',body?:unknown):Promise<T>{
  let res:Response;
  try{res=await this.fetcher(`https://api.hubapi.com${path}`,{method,headers:{Authorization:`Bearer ${this.config.hubspotToken}`,'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:AbortSignal.timeout(4500),cache:'no-store'});}catch{throw new DeliveryError('HUBSPOT_TIMEOUT',true);}
  if(!res.ok){if(path.startsWith('/crm/properties/')){const details=await res.json().catch(()=>null);const category=String(details?.category||'ERROR').toUpperCase().replace(/[^A-Z0-9_]/g,'').slice(0,24);const diagnostic=String(details?.message||'')+' '+String(details?.errors?.[0]?.message||'');const knownReason=/display.?order/i.test(diagnostic)?'DISPLAY_ORDER':/read.?only/i.test(diagnostic)?'READ_ONLY':/option/i.test(diagnostic)?'OPTION_VALIDATION':/group/i.test(diagnostic)?'PROPERTY_GROUP':'';const reason=String(details?.errors?.[0]?.code||knownReason).toUpperCase().replace(/[^A-Z0-9_]/g,'').slice(0,15);throw new DeliveryError(('HUBSPOT_SCHEMA_'+res.status+'_'+category+(reason?'_'+reason:'')).slice(0,64),res.status===429||res.status>=500);}if(res.status===400){const details=await res.json().catch(()=>null);const diagnostic=JSON.stringify(details);const tokens=diagnostic.split(/[^A-Z_]+/);const reason=['INVALID_EMAIL','INVALID_OPTION','INVALID_INTEGER','PROPERTY_DOESNT_EXIST','READ_ONLY_VALUE','INVALID_DATE','INVALID_LONG','INVALID_DATETIME','MISSING_REQUIRED_PROPERTY','MISSING_CONDITIONAL_REQUIRED_PROPERTY','MISSING_REQUIRED_ASSOCIATION','INVALID_JSON','INVALID_PROPERTY','INVALID_TYPE','INVALID_BOOLEAN','INVALID_NUMBER','INVALID_STRING','PROPERTY_VALIDATION_ERROR','VALIDATION_RULE_ERROR','VALUE_NOT_UNIQUE','PROPERTY_VALUE_ALREADY_EXISTS','INVALID_UNIQUE_IDENTIFIER','MAX_LENGTH_EXCEEDED'].find(code=>tokens.includes(code));if(reason)throw new DeliveryError('HUBSPOT_VALIDATION_'+reason,false);const stage=path.endsWith('/search')?'SEARCH':method==='POST'?'CREATE':method==='PATCH'?'UPDATE':'READ';const structured=(Array.isArray(details?.errors)?details.errors:[]).flatMap((e:{code?:unknown;error?:unknown})=>[e.code,e.error]);const providerCode=structured.find((code:unknown)=>typeof code==='string'&&/^(INVALID|MISSING|PROPERTY|VALIDATION|REQUIRED|READ_ONLY|CONFLICT|VALUE|MAX|MIN|NOT)_[A-Z_]{1,36}$/.test(code));if(providerCode)throw new DeliveryError(('HUBSPOT_'+stage+'_'+providerCode).slice(0,64),false);const fields=[...commercialProperties,'email','firstname','company','polpo_received_at','polpo_privacy_ack_at','polpo_request_marketing_opt_in','polpo_contact_key','polpo_problems','polpo_contact_preference'];const context=details?.errors?.[0]?.context?.propertyName;const field=fields.find(f=>(Array.isArray(context)?context:[context,details?.errors?.[0]?.name]).includes(f))||fields.filter(f=>f.startsWith('polpo_')).sort((a,b)=>b.length-a.length).find(f=>diagnostic.includes(f));if(field)throw new DeliveryError(('HUBSPOT_'+stage+'_FIELD_'+field.toUpperCase()).slice(0,64),false);const category=['VALIDATION_ERROR','BAD_REQUEST','INVALID_INPUT','CONFLICT'].includes(details?.category)?details.category:'UNCLASSIFIED';throw new DeliveryError('HUBSPOT_400_'+stage+'_'+category,false);}const value=res.headers.get('retry-after');const seconds=value?Number(value):60;throw new DeliveryError(`HUBSPOT_HTTP_${res.status}`,res.status===429||res.status>=500||res.status===409,Number.isFinite(seconds)?Math.max(1,Math.min(86400,seconds)):60);}
  if(res.status===204)return undefined as T;
  try{return await res.json() as T;}catch{throw new DeliveryError('HUBSPOT_INVALID_RESPONSE',true);}
 }
 async verifyPortal():Promise<void>{
  const account=await this.call<{portalId?:number;hubId?:number}>('/integrations/v1/me');
  const actual=String(account.portalId??account.hubId??'');
  if(!actual||actual!==this.config.hubspotPortalId)throw new DeliveryError('HUBSPOT_PORTAL_MISMATCH',false);
 }
 async sync(job:Job):Promise<{contactId:string;companyId:string|null}>{
  const {contact}=job.payload;const base='/crm/objects/2026-09';
  let existing:CRMRecord|undefined;
  {
   const found=await this.call<{results:CRMRecord[]}>(`${base}/contacts/search`,'POST',{filterGroups:[{filters:[{propertyName:contact.email?'email':'polpo_contact_key',operator:'EQ',value:contact.email||job.contact_key}]}],properties:['firstname','phone','company','hs_legal_basis','polpo_received_at','polpo_request_id',...commercialProperties],limit:2});
   if(!Array.isArray(found.results))throw new DeliveryError('HUBSPOT_INVALID_RESPONSE',true);
   if(found.results.length>1)throw new DeliveryError('CONTACT_AMBIGUOUS',false);
   existing=found.results[0];
  }
  const received=String(Date.parse(job.acquired_at));
  const props:Record<string,string>={polpo_contact_key:job.contact_key,polpo_settore:sectorValues[job.payload.sector],polpo_prodotto:'automazioni_ai',polpo_origine_richiesta:'analisi_gratuita',polpo_problems:job.payload.problems.join(';'),polpo_strumenti:job.payload.tools.map(t=>toolValues[t]).join(';'),polpo_management_software:job.payload.managementSoftware,polpo_operational_context:job.payload.details,polpo_request_id:job.id,polpo_received_at:received,polpo_business_name:contact.businessName,polpo_full_name:contact.name,polpo_contact_preference:contact.preference||'unspecified',polpo_source:'polpo-ai.com/contatti/mini-consultation',polpo_privacy_version:job.privacy_version,polpo_privacy_ack_at:received,polpo_request_marketing_opt_in:String(job.payload.marketingOptIn)};
  if(job.payload.primaryProblem)props.polpo_problema_principale=problemValues[job.payload.primaryProblem];
  // Existing operator-managed commercial classifications are preserved. Full
  // answers remain in the request archive and latest-request technical fields.
  for(const key of commercialProperties)if(existing?.properties[key])delete props[key];
  // An unchecked box is not a withdrawal of pre-existing marketing preferences.
  // These are consent evidence properties, not enrollment in a subscription or a Deal.
  if(job.payload.marketingOptIn){props.polpo_marketing_consent_at=received;props.polpo_marketing_consent_version=job.marketing_version;}
  if(!existing?.properties.firstname)props.firstname=contact.name;
  if(!existing?.properties.company)props.company=contact.businessName;
  if(contact.email&&!existing)props.email=contact.email;
  if(contact.phone&&!existing?.properties.phone)props.phone=contact.phone;
  let id=existing?.id;
  const previous=existing?.properties.polpo_received_at||'';const previousTime=Number(previous)||Date.parse(previous);
  if(existing&&(previousTime>Number(received)||(previousTime===Number(received)&&(existing.properties.polpo_request_id||'')>job.id)))return {contactId:existing.id,companyId:null};
  if(!existing?.properties.hs_legal_basis){if(!supportedContactLegalBasis(this.config.hubspotLegalBasis))throw new DeliveryError('HUBSPOT_LEGAL_BASIS_UNCONFIGURED',false);props.hs_legal_basis=this.config.hubspotLegalBasis;}
  if(id){await this.call(`${base}/contacts/${encodeURIComponent(id)}`,'PATCH',{properties:props});}
  else if(contact.email){
   // A create conflict is retried after search catches up. Unlike an email
   // upsert, a stale search cannot overwrite an existing contact's context.
   const created=await this.call<CRMRecord>(`${base}/contacts`,'POST',{properties:props});
   id=created.id;if(!id)throw new DeliveryError('HUBSPOT_INVALID_RESPONSE',true);
  }else{
   const result=await this.call<{results:CRMRecord[]}>(`${base}/contacts/batch/upsert`,'POST',{inputs:[{id:contact.email||job.contact_key,idProperty:contact.email?'email':'polpo_contact_key',properties:props}]});
   id=result.results?.[0]?.id;if(!id)throw new DeliveryError('HUBSPOT_INVALID_RESPONSE',true);
  }
  if(!/^[a-zA-Z0-9_-]{1,80}$/.test(id))throw new DeliveryError('HUBSPOT_INVALID_ID',false);
  const record=await this.call<CRMRecord>(`${base}/contacts/${id}?associations=companies`);
  const associated=record.associations?.companies?.results||[];
  let companyId:string|null=null;let status='manual_review';
  if(associated.length){companyId=associated.length===1?associated[0].id:null;status='existing_kept';}
  else{
   const domain=contact.email.split('@')[1];
   if(domain&&!personalDomains.has(domain)&&this.config.companyDomains.includes(domain)){
    const companies=await this.call<{results:CRMRecord[]}>(`${base}/companies/search`,'POST',{filterGroups:[{filters:[{propertyName:'domain',operator:'EQ',value:domain}]}],properties:['domain'],limit:2});
    if(!Array.isArray(companies.results))throw new DeliveryError('HUBSPOT_INVALID_RESPONSE',true);
    if(companies.results.length===1&&companies.results[0].properties.domain?.toLowerCase()===domain&&/^[a-zA-Z0-9_-]{1,80}$/.test(companies.results[0].id)){
     companyId=companies.results[0].id;
     await this.call(`${base}/contacts/${id}/associations/default/companies/${companyId}`,'PUT');status='matched_existing_domain';
    }
   }
  }
  await this.call(`${base}/contacts/${id}`,'PATCH',{properties:{polpo_company_match_status:status}});
  return {contactId:id,companyId};
 }
}
