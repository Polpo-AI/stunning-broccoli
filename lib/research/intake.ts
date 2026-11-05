import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { validAnswerSet, type Answers, type Audience } from './questions';
import { RESEARCH_PRIVACY_VERSION, RESEARCH_VERSION, type ResearchConfig } from './server-config';

type Receipt = { code: 'accepted' | 'duplicate' | 'conflict' | 'rate_limited'; response_id?: string };
type ContactReceipt = { code: 'accepted' | 'duplicate' | 'conflict' | 'rate_limited'; contact_id?: string };
export type ResearchStore = {
  response(input: { audience: Audience; survey_version: string; answers: Answers; priority_detail: string | null; idempotency_hash: string; payload_hash: string; ip_hash: string }): Promise<Receipt>;
  contact(input: { email: string; research_contact: boolean; marketing_opt_in: boolean; privacy_version: string; idempotency_hash: string; payload_hash: string; ip_hash: string }): Promise<ContactReceipt>;
};

const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' };
const reply = (status: number, body: object, extra: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
const hash = (secret: string, value: string) => createHmac('sha256', secret).update(value).digest('hex');
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readJson(request: Request, maxBytes: number): Promise<unknown> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('content_type');
  const stated = Number(request.headers.get('content-length') || 0);
  if (stated > maxBytes) throw new Error('too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid_body');
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > maxBytes) { await reader.cancel(); throw new Error('too_large'); }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown; } catch { throw new Error('invalid_json'); }
}

function allowedOrigin(request: Request, config: ResearchConfig) {
  const origin = request.headers.get('origin');
  return !!origin && config.origins.includes(origin);
}

function ipHash(request: Request, config: ResearchConfig, purpose: string) {
  // Vercel overwrites x-forwarded-for at the trusted edge. Only the HMAC enters the abuse table.
  const candidate = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const ip = isIP(candidate) ? candidate : 'unknown';
  const window = Math.floor(Date.now() / (15 * 60 * 1000));
  return hash(config.hmacKey, `${purpose}:${window}:${ip}`);
}

function validObject(value: unknown, keys: string[], required: string[] = keys): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value) &&
    Object.keys(value).every(key => keys.includes(key)) && required.every(key => Object.hasOwn(value, key));
}

export function createResearchIntake(config: ResearchConfig, store: ResearchStore) {
  return {
    async response(request: Request) {
      if (!config.enabled) return reply(503, { code: 'not_available', message: 'La raccolta non è disponibile.' });
      if (!allowedOrigin(request, config)) return reply(403, { code: 'origin_not_allowed' });
      let body: unknown;
      try { body = await readJson(request, 16 * 1024); } catch (error) {
        const reason = (error as Error).message;
        return reply(reason === 'too_large' ? 413 : 400, { code: 'invalid_request' });
      }
      const keys = ['audience', 'surveyVersion', 'answers', 'ageConfirmed', 'detail', 'idempotencyKey', 'website'];
      if (!validObject(body, keys, keys.filter(key => key !== 'detail')) || (body.audience !== 'giocatori' && body.audience !== 'circoli') ||
          body.surveyVersion !== RESEARCH_VERSION || typeof body.idempotencyKey !== 'string' || !UUID.test(body.idempotencyKey) ||
          body.ageConfirmed !== true || body.website !== '' || (body.detail !== undefined && typeof body.detail !== 'string') ||
          !validAnswerSet(body.audience as Audience, body.answers, body.detail)) {
        return reply(422, { code: 'invalid_fields', message: 'Conferma di avere almeno 14 anni e controlla le risposte.' });
      }
      const detail = typeof body.detail === 'string' && body.detail.trim() ? body.detail.trim() : null;
      const record = {
        audience: body.audience as Audience,
        survey_version: RESEARCH_VERSION,
        answers: body.answers as Answers,
        priority_detail: detail,
        idempotency_hash: hash(config.hmacKey, `response:${body.idempotencyKey}`),
        payload_hash: hash(config.hmacKey, JSON.stringify({ audience: body.audience, version: RESEARCH_VERSION, answers: body.answers, detail })),
        ip_hash: ipHash(request, config, 'response'),
      };
      try {
        const saved = await store.response(record);
        if (saved.code === 'rate_limited') return reply(429, { code: 'rate_limited', message: 'Hai effettuato diversi tentativi. Riprova più tardi.' }, { 'Retry-After': '900' });
        if (saved.code === 'conflict') return reply(409, { code: 'idempotency_conflict', message: 'La risposta è cambiata. Riprova l’invio.' });
        if (!['accepted', 'duplicate'].includes(saved.code) || !saved.response_id) throw new Error('storage');
        return reply(202, { status: 'saved', receipt: saved.response_id, duplicate: saved.code === 'duplicate' });
      } catch { return reply(503, { code: 'storage_unavailable', message: 'Non possiamo confermare il salvataggio. Le risposte sono ancora disponibili: riprova.' }, { 'Retry-After': '30' }); }
    },
    async contact(request: Request) {
      if (!config.enabled) return reply(503, { code: 'not_available', message: 'La raccolta non è disponibile.' });
      if (!allowedOrigin(request, config)) return reply(403, { code: 'origin_not_allowed' });
      let body: unknown;
      try { body = await readJson(request, 4 * 1024); } catch (error) {
        const reason = (error as Error).message;
        return reply(reason === 'too_large' ? 413 : 400, { code: 'invalid_request' });
      }
      const keys = ['email', 'researchContact', 'marketingOptIn', 'ageConfirmed', 'idempotencyKey', 'website'];
      if (!validObject(body, keys) || typeof body.email !== 'string' || body.email.length > 254 ||
          !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(body.email) ||
          body.researchContact !== true || body.marketingOptIn !== false || body.ageConfirmed !== true || typeof body.idempotencyKey !== 'string' ||
          !UUID.test(body.idempotencyKey) || body.website !== '') {
        return reply(422, { code: 'invalid_fields', message: 'Conferma di avere almeno 14 anni e scegli il ricontatto sulla ricerca.' });
      }
      const normalizedEmail = body.email.trim().toLowerCase();
      const contact = {
        email: normalizedEmail,
        research_contact: body.researchContact,
        marketing_opt_in: body.marketingOptIn,
        privacy_version: RESEARCH_PRIVACY_VERSION,
        idempotency_hash: hash(config.hmacKey, `contact:${body.idempotencyKey}`),
        payload_hash: hash(config.hmacKey, JSON.stringify({ email: normalizedEmail, researchContact: body.researchContact, marketingOptIn: body.marketingOptIn, privacyVersion: RESEARCH_PRIVACY_VERSION })),
        ip_hash: ipHash(request, config, 'contact'),
      };
      try {
        const saved = await store.contact(contact);
        if (saved.code === 'rate_limited') return reply(429, { code: 'rate_limited', message: 'Hai effettuato diversi tentativi. Riprova più tardi.' }, { 'Retry-After': '900' });
        if (saved.code === 'conflict') return reply(409, { code: 'idempotency_conflict', message: 'La richiesta è cambiata. Riprova.' });
        if (!['accepted', 'duplicate'].includes(saved.code) || !saved.contact_id) throw new Error('storage');
        return reply(202, { status: 'saved', duplicate: saved.code === 'duplicate' });
      } catch { return reply(503, { code: 'storage_unavailable', message: 'Non possiamo confermare il salvataggio del recapito. Riprova.' }, { 'Retry-After': '30' }); }
    },
  };
}

export class ResearchStoreClient implements ResearchStore {
  constructor(private readonly config: ResearchConfig, private readonly fetcher: typeof fetch = fetch) {}
  private async rpc<T>(name: string, body: object): Promise<T> {
    const response = await this.fetcher(`${this.config.databaseUrl.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers: { apikey: this.config.databaseKey, Authorization: `Bearer ${this.config.databaseKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('storage');
    const result = await response.json() as T[] | T;
    return Array.isArray(result) ? result[0] : result;
  }
  response(input: Parameters<ResearchStore['response']>[0]) {
    return this.rpc<Receipt>('research_submit_response', {
      p_audience: input.audience, p_survey_version: input.survey_version, p_answers: input.answers,
      p_priority_detail: input.priority_detail, p_idempotency_hash: input.idempotency_hash,
      p_payload_hash: input.payload_hash, p_ip_hash: input.ip_hash,
    });
  }
  contact(input: Parameters<ResearchStore['contact']>[0]) {
    return this.rpc<ContactReceipt>('research_submit_contact', {
      p_email: input.email, p_research_contact: input.research_contact, p_marketing_opt_in: input.marketing_opt_in,
      p_privacy_version: input.privacy_version, p_idempotency_hash: input.idempotency_hash,
      p_payload_hash: input.payload_hash, p_ip_hash: input.ip_hash,
    });
  }
}
