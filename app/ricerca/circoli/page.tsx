import Survey from '@/components/research/Survey';
import { readResearchConfig } from '@/lib/research/server-config';
export const dynamic = 'force-dynamic';
export default function ClubsSurvey() { return <Survey audience="circoli" collectionEnabled={readResearchConfig().enabled} />; }
