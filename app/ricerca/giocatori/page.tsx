import { notFound } from 'next/navigation';
import Survey from '@/components/research/Survey';
import { researchPublicEnabled } from '@/lib/research/availability';
import { readResearchConfig } from '@/lib/research/server-config';
export const dynamic = 'force-dynamic';
export default function PlayersSurvey() { if (!researchPublicEnabled()) notFound(); return <Survey audience="giocatori" collectionEnabled={readResearchConfig().enabled} />; }
