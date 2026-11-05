import { researchPublicEnabled } from './server-config';

/** Server-only preview availability. Production wins over every local override. */
export function researchPreviewAvailable() {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'preview';
  return process.env.NODE_ENV === 'development' || process.env.RESEARCH_LOCAL_PREVIEW === '1';
}
export { researchPublicEnabled };
