import { readConfig } from '@/lib/consultation/server-config';
import { LeadStore } from '@/lib/consultation/store';
import { recordEvent } from '@/lib/consultation/intake';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function POST(request:Request){const config=readConfig();return recordEvent(request,config,new LeadStore(config));}
