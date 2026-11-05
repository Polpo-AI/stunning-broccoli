import { createResearchIntake, ResearchStoreClient } from '@/lib/research/intake';
import { readResearchConfig } from '@/lib/research/server-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  const config = readResearchConfig();
  return createResearchIntake(config, new ResearchStoreClient(config)).response(request);
}
