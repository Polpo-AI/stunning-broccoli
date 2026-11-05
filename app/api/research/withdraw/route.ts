import { readResearchConfig } from '@/lib/research/server-config';
import { ResearchStoreClient, withdrawResearch } from '@/lib/research/intake';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  const config = readResearchConfig();
  return withdrawResearch(request, config, new ResearchStoreClient(config));
}
