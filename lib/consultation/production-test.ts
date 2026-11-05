import {timingSafeEqual} from 'node:crypto';
import type {Consultation} from './domain';
import {isUUID} from './domain';
import {testName,testBusiness,testDetails,testManagement} from './test-fixture';
export const productionTestUser='polpo-test';
export function productionTestConfig(env:Record<string,string|undefined>=process.env,now=Date.now()){
 const secret=env.POLPO_CONSULTATION_TEST_SECRET||'',expires=Date.parse(env.POLPO_CONSULTATION_TEST_EXPIRES_AT||'');
 return {secret,enabled:env.POLPO_CONSULTATION_TEST_ENABLED==='true'&&secret.length>=32&&Number.isFinite(expires)&&expires>now&&expires-now<=86400000,expires};
}
export function productionTestAuthenticated(authorization:string|null,config:ReturnType<typeof productionTestConfig>){
 if(!config.enabled||!authorization||authorization.length>1024||!authorization.startsWith('Basic '))return false;
 try{const actual=Buffer.from(authorization.slice(6),'base64'),expected=Buffer.from(productionTestUser+':'+config.secret);return actual.length===expected.length&&timingSafeEqual(actual,expected);}catch{return false;}
}
export function syntheticProductionInput(input:Consultation){
 const match=/^info\+polpo-test-([a-f0-9-]+)@polpo-ai\.com$/.exec(input.contact.email);
 return !!match&&isUUID(match[1])&&input.contact.name===testName&&input.contact.businessName===testBusiness&&input.contact.phone===''&&input.contact.preference==='email'&&input.details===testDetails&&['',testManagement].includes(input.managementSoftware)&&!input.marketingOptIn;
}
export const productionTestHeaders={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'};
export function productionTestDenied(config:ReturnType<typeof productionTestConfig>){return new Response('Prova riservata. Accesso non disponibile.',{status:config.enabled?401:404,headers:{...productionTestHeaders,...(config.enabled?{'WWW-Authenticate':'Basic realm="Polpo - prova riservata", charset="UTF-8"'}:{})}});}
