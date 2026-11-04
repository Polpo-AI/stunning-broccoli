import { privacyDocument, marketingTextVersion } from './privacy';

export type ServerConfig={
 enabled:boolean;workerEnabled:boolean;analytics:boolean;reasons:string[];origins:string[];privacyVersion:string;marketingVersion:string;
 databaseUrl:string;databaseKey:string;hmacKey:string;hubspotToken:string;hubspotPortalId:string;
 resendKey:string;resendFrom:string;workerSecret:string;retentionDays:number;companyDomains:string[];
};
export function readConfig(env:Record<string,string|undefined>=process.env):ServerConfig{
 const reasons:string[]=[];const need=(name:string,min=1)=>{const value=env[name]||'';if(value.length<min)reasons.push(name);return value;};
 const databaseUrl=need('POLPO_LEADS_SUPABASE_URL');const databaseKey=need('POLPO_LEADS_SUPABASE_SERVICE_ROLE_KEY',20);
 const ref=need('POLPO_LEADS_SUPABASE_PROJECT_REF');
 try{const url=new URL(databaseUrl);if(url.protocol!=='https:'||url.hostname!==`${ref}.supabase.co`||url.pathname!=='/')reasons.push('LEADS_PROJECT_MISMATCH');}catch{reasons.push('LEADS_PROJECT_URL');}
 if(env.POLPO_PADEL_PROJECT_REF&&ref===env.POLPO_PADEL_PROJECT_REF)reasons.push('PADEL_PROJECT_FORBIDDEN');
 if(env.POLPO_LEADS_SITE_PROJECT_CONFIRMED!=='true')reasons.push('SITE_PROJECT_NOT_CONFIRMED');
 const hmacKey=need('POLPO_CONSULTATION_HMAC_KEY',32),hubspotToken=need('POLPO_HUBSPOT_ACCESS_TOKEN',20),hubspotPortalId=need('POLPO_HUBSPOT_PORTAL_ID');
 if(!/^\d+$/.test(hubspotPortalId))reasons.push('HUBSPOT_PORTAL_ID');
 const resendKey=need('POLPO_RESEND_API_KEY',12),resendFrom=need('POLPO_RESEND_FROM');
 if(!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(resendFrom))reasons.push('RESEND_FROM');
 const workerSecret=need('POLPO_CONSULTATION_WORKER_SECRET',32);
 const origins=(env.POLPO_CONSULTATION_ALLOWED_ORIGINS||'https://polpo-ai.com').split(',').map(s=>s.trim()).filter(Boolean);
 if(env.VERCEL_ENV==='preview'&&env.VERCEL_URL)origins.push(`https://${env.VERCEL_URL}`);
 for(const origin of origins){try{const u=new URL(origin);if(u.origin!==origin||u.protocol!=='https:')reasons.push('INVALID_ORIGIN');}catch{reasons.push('INVALID_ORIGIN');}}
 const retentionDays=Number(env.POLPO_LEADS_RETENTION_DAYS);
 if(!Number.isInteger(retentionDays)||retentionDays<7||retentionDays>730)reasons.push('RETENTION_NOT_CONFIGURED');
 const coreReady=reasons.length===0;
 const workerEnabled=coreReady&&env.POLPO_CONSULTATION_DELIVERY_ENABLED==='true'&&env.POLPO_HUBSPOT_SCHEMA_VERIFIED==='true'&&env.POLPO_HUBSPOT_AUTOMATIONS_REVIEWED==='true'&&env.POLPO_PLATFORM_SECURITY_REVIEWED==='true';
 if(!workerEnabled)reasons.push('DELIVERY_NOT_ENABLED');
 for(const flag of ['POLPO_HUBSPOT_SCHEMA_VERIFIED','POLPO_HUBSPOT_AUTOMATIONS_REVIEWED','POLPO_CONSULTATION_SCHEDULER_VERIFIED','POLPO_CONSULTATION_MONITORING_VERIFIED','POLPO_CONSULTATION_NOTIFICATION_VERIFIED','POLPO_CONSULTATION_E2E_VERIFIED','POLPO_CONSULTATION_RELEASE_APPROVED','POLPO_PLATFORM_SECURITY_REVIEWED'])if(env[flag]!=='true')reasons.push(flag);
 if(privacyDocument.status!=='approved'||env.POLPO_PRIVACY_VERIFIED_VERSION!==privacyDocument.version)reasons.push('PRIVACY_DRAFT');
 if(env.POLPO_CONSULTATION_ENABLED!=='true')reasons.push('FEATURE_DISABLED');
 const companyDomains=(env.POLPO_HUBSPOT_COMPANY_DOMAIN_ALLOWLIST||'').split(',').map(x=>x.trim().toLowerCase()).filter(x=>/^[a-z0-9.-]+\.[a-z]{2,}$/.test(x));
 return {enabled:reasons.length===0,workerEnabled,analytics:reasons.length===0&&env.POLPO_CONSULTATION_ANALYTICS_ENABLED==='true',reasons,origins:Array.from(new Set(origins)),privacyVersion:privacyDocument.version,marketingVersion:marketingTextVersion,databaseUrl,databaseKey,hmacKey,hubspotToken,hubspotPortalId,resendKey,resendFrom,workerSecret,retentionDays,companyDomains};
}
export function previewAvailable(env:Record<string,string|undefined>=process.env){return env.VERCEL_ENV==='preview'||env.NODE_ENV==='development';}
