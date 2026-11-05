import { marketingAvailable } from './privacy';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import { parseConsultation, parseEvent } from './domain';
import type { ServerConfig } from './server-config';
import type { LeadStore } from './store';

export const hash=(secret:string,value:string)=>createHmac('sha256',secret).update(value).digest('hex');
const headers={'Cache-Control':'no-store','Content-Type':'application/json','X-Content-Type-Options':'nosniff'};
const reply=(status:number,body:object,extra:Record<string,string>={})=>new Response(JSON.stringify(body),{status,headers:{...headers,...extra}});
export function authenticated(request:Request,secret:string){const supplied=request.headers.get('authorization')||'';const expected=Buffer.from(`Bearer ${secret}`);const actual=Buffer.from(supplied);return secret.length>=32&&actual.length===expected.length&&timingSafeEqual(actual,expected);}
async function limitedBody(request:Request){
 const limit=12*1024;if(Number(request.headers.get('content-length')||0)>limit)throw new Error('BODY_LIMIT');
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))throw new Error('CONTENT_TYPE');
 const reader=request.body?.getReader();if(!reader)throw new Error('INVALID_JSON');
 const chunks:Uint8Array[]=[];let length=0;
 while(true){const {value,done}=await reader.read();if(done)break;length+=value.length;if(length>limit){await reader.cancel();throw new Error('BODY_LIMIT');}chunks.push(value);}
 return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}
function ipKey(request:Request,config:ServerConfig){
 // Vercel owns x-forwarded-for at the deployed edge; no arbitrary forwarded header fallback.
 const candidate=(request.headers.get('x-forwarded-for')||'').split(',')[0].trim();
 const ip=isIP(candidate)?candidate:'unknown';
 return hash(config.hmacKey,`${new Date().toISOString().slice(0,10)}:${ip}`);
}
export async function intake(request:Request,config:ServerConfig,store:Pick<LeadStore,'acquire'>):Promise<Response>{
 if(!config.enabled)return reply(503,{code:'not_available',message:'L’invio non è ancora disponibile.'});
 if(!config.origins.includes(request.headers.get('origin')||''))return reply(403,{code:'origin_not_allowed'});
 let body:unknown;try{body=await limitedBody(request);}catch(error){const code=error instanceof Error?error.message:'';return reply(code==='BODY_LIMIT'?413:400,{code:'invalid_request'});}
 const parsed=parseConsultation(body);if(!parsed.ok)return reply(422,{code:'invalid_fields',errors:parsed.errors});
 const input=parsed.value;
 if(input.marketingOptIn&&!marketingAvailable)return reply(422,{code:'invalid_fields',errors:{marketingOptIn:'Gli aggiornamenti email non sono attivi.'}});
 const identity=input.contact.email?`email:${input.contact.email}`:`phone:${input.contact.phone}|${input.contact.name.toLocaleLowerCase('it')}|${input.contact.businessName.toLocaleLowerCase('it')}`;
 const contactKey=hash(config.hmacKey,identity);
 const {submissionId:_,journeyId:__,...answers}=input;
 const fingerprint=hash(config.hmacKey,JSON.stringify({answers,privacy:config.privacyVersion,marketing:config.marketingVersion}));
 try{
  const saved=await store.acquire(input,fingerprint,contactKey,ipKey(request,config),config.privacyVersion,config.marketingVersion);
  if(saved.code==='conflict')return reply(409,{code:'idempotency_conflict',message:'La richiesta è cambiata. Riprova con un nuovo invio.'});
  if(saved.code==='rate_limited')return reply(429,{code:'rate_limited',message:'Hai effettuato diversi tentativi. Riprova più tardi.'},{'Retry-After':'900'});
  if(saved.code!=='accepted'||!saved.request_id)throw new Error('INVALID_RECEIPT');
  return reply(202,{status:'acquired',reference:saved.request_id,message:'La tua richiesta è stata acquisita. La consegna al team viene gestita separatamente.'});
 }catch{return reply(503,{code:'storage_unavailable',message:'Non possiamo confermare l’acquisizione. I dati sono ancora qui: riprova tra poco.'},{'Retry-After':'30'});}
}
export async function recordEvent(request:Request,config:ServerConfig,store:Pick<LeadStore,'event'>){
 if(!config.analytics)return reply(503,{code:'not_available'});
 if(!config.origins.includes(request.headers.get('origin')||''))return reply(403,{code:'origin_not_allowed'});
 try{const event=parseEvent(await limitedBody(request));if(!event)return reply(422,{code:'invalid_event'});const stored=await store.event(event,ipKey(request,config));return stored?new Response(null,{status:204,headers}):reply(429,{code:'rate_limited'});}catch{return reply(503,{code:'not_available'});}
}
