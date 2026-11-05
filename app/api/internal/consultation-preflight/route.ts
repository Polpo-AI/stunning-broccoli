import {readConfig} from '@/lib/consultation/server-config';
import {authenticated} from '@/lib/consultation/intake';
import {HubSpotClient} from '@/lib/consultation/hubspot';
import {DeliveryError} from '@/lib/consultation/store';
import {runPreflight,applyApprovedSchema,setupAllowed} from '@/lib/consultation/preflight';
export const runtime='nodejs';export const dynamic='force-dynamic';export const maxDuration=120;
const headers={'Cache-Control':'no-store'};
export async function GET(request:Request){const c=readConfig();if(!authenticated(request,c.workerSecret))return Response.json({code:'unauthorized'},{status:401,headers});return Response.json(await runPreflight(c),{headers});}
// Narrow, expiring operator action: only the approved versioned schema, no record writes.
export async function POST(request:Request){const c=readConfig();if(!authenticated(request,c.workerSecret))return Response.json({code:'unauthorized'},{status:401,headers});if(!setupAllowed())return Response.json({code:'setup_disabled'},{status:404,headers});try{return Response.json(await applyApprovedSchema(new HubSpotClient(c)),{headers});}catch(e){return Response.json({code:e instanceof DeliveryError?e.code:'SCHEMA_SETUP_UNAVAILABLE'},{status:503,headers});}}
