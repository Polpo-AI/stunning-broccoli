export const RESEARCH_VERSION = 'padel-surveys-v2';
export const RESEARCH_PRIVACY_VERSION = 'padel-research-privacy-v1';
export const RESEARCH_PRIVACY_STATUS: 'draft' | 'approved' = 'draft';
const SITE_PROJECT = 'llbqoyucmvuijfobzryj';

export type ResearchConfig = {
  enabled: boolean;
  databaseUrl: string;
  databaseKey: string;
  projectRef: string;
  hmacKey: string;
  origins: string[];
};

export function readResearchConfig(env: Record<string, string | undefined> = process.env): ResearchConfig {
  const databaseUrl = env.RESEARCH_SUPABASE_URL || '';
  const databaseKey = env.RESEARCH_SUPABASE_SERVICE_ROLE_KEY || '';
  const projectRef = env.RESEARCH_SUPABASE_PROJECT_REF || '';
  const hmacKey = env.RESEARCH_HMAC_KEY || '';
  const simulatedApproval = env.NODE_ENV === 'development' && !env.VERCEL_ENV && env.RESEARCH_LOCAL_ACTIVE_PREVIEW === '1';
  let endpointMatches = false;
  try {
    const url = new URL(databaseUrl);
    endpointMatches = url.protocol === 'https:' && url.hostname === `${SITE_PROJECT}.supabase.co` && url.pathname === '/';
  } catch {}
  const origins = (env.RESEARCH_ALLOWED_ORIGINS || (simulatedApproval
    ? 'http://127.0.0.1:3192,http://localhost:3192'
    : 'https://polpo-ai.com,https://www.polpo-ai.com'))
    .split(',').map(value => value.trim()).filter(value => {
      try {
        const url = new URL(value);
        if (simulatedApproval) return url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname) && url.origin === value;
        return url.protocol === 'https:' && url.origin === value;
      } catch { return false; }
    });
  if (env.VERCEL_ENV === 'preview' && env.VERCEL_URL) origins.push(`https://${env.VERCEL_URL}`);
  const privacyApproved = env.RESEARCH_PRIVACY_APPROVED_VERSION === RESEARCH_PRIVACY_VERSION &&
    (RESEARCH_PRIVACY_STATUS === 'approved' || simulatedApproval);
  const enabled =
    env.RESEARCH_COLLECTION_ENABLED === 'true' &&
    env.RESEARCH_PUBLIC_ENABLED === 'true' &&
    privacyApproved &&
    env.RESEARCH_RETENTION_JOB_VERIFIED === 'true' &&
    projectRef === SITE_PROJECT &&
    env.POLPO_PADEL_PROJECT_REF !== projectRef &&
    endpointMatches &&
    databaseKey.length >= 20 &&
    hmacKey.length >= 32 &&
    origins.length > 0;
  return { enabled, databaseUrl, databaseKey, projectRef, hmacKey, origins: Array.from(new Set(origins)) };
}

export function researchPublicEnabled(env: Record<string, string | undefined> = process.env) {
  if (env.VERCEL_ENV === 'production') return readResearchConfig(env).enabled;
  if (env.VERCEL_ENV === 'preview') return true;
  return env.NODE_ENV === 'development' || env.RESEARCH_LOCAL_PREVIEW === '1';
}
