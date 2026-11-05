import {readConfig} from '@/lib/consultation/server-config';
import {intake} from '@/lib/consultation/intake';
import {LeadStore} from '@/lib/consultation/store';
import {privacyDocument} from '@/lib/consultation/privacy';
import {supportedContactLegalBasis} from '@/lib/consultation/legal-basis';
import {productionTestConfig,productionTestAuthenticated,productionTestDenied,syntheticProductionInput,productionTestHeaders} from '@/lib/consultation/production-test';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function POST(request:Request){
 const test=productionTestConfig();if(!productionTestAuthenticated(request.headers.get('authorization'),test))return productionTestDenied(test);
 const c=readConfig();if(!c.workerEnabled||!supportedContactLegalBasis(c.hubspotLegalBasis)||privacyDocument.status!=='approved')return Response.json({code:'not_available',message:'La prova non è ancora pronta.'},{status:503,headers:productionTestHeaders});
 const response=await intake(request,{...c,enabled:true,analytics:false,privacyVersion:'synthetic-production-'+c.privacyVersion},new LeadStore(c),syntheticProductionInput);
 for(const [key,value]of Object.entries(productionTestHeaders))response.headers.set(key,value);return response;
}
