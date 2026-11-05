import { readConfig } from '@/lib/consultation/server-config';
import { LeadStore } from '@/lib/consultation/store';
import { intake } from '@/lib/consultation/intake';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function POST(request:Request){const config=readConfig();return intake(request,config,new LeadStore(config));}
