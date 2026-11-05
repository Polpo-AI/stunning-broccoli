import {readConfig} from '@/lib/consultation/server-config';
import {authenticated} from '@/lib/consultation/intake';
import {LeadStore} from '@/lib/consultation/store';
export const dynamic='force-dynamic';export const runtime='nodejs';
export async function GET(request:Request){const c=readConfig(),headers={'Cache-Control':'no-store'};if(!authenticated(request,c.workerSecret))return Response.json({code:'unauthorized'},{status:401,headers});if(!c.databaseUrl||!c.databaseKey)return Response.json({code:'storage_unavailable'},{status:503,headers});try{return Response.json(await new LeadStore(c).rpc('polpo_consultation_health',{}),{headers});}catch{return Response.json({code:'storage_unavailable'},{status:503,headers});}}
