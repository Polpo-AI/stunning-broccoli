const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
function load(file, env = process.env) {
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', 'process', 'require', js)(module, module.exports, { env }, Module.createRequire(path.resolve(file)));
  return module.exports;
}
const q = load('lib/research/questions.ts');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  try { return originalResolve.call(this, request, parent, isMain, options); }
  catch (error) {
    if (typeof request === 'string' && !path.extname(request) && parent?.filename) {
      const candidate = path.resolve(path.dirname(parent.filename), request + '.ts');
      if (fs.existsSync(candidate)) return candidate;
    }
    throw error;
  }
};
require.extensions['.ts'] = (mod, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  mod._compile(js, filename);
};
const intake = require('../lib/research/intake.ts');
const serverConfig = require('../lib/research/server-config.ts');

function validPlayerAnswers() {
  return { frequency: ['monthly'], group: ['friends'], channel: ['never'], bookingChannel: ['never'], ease: ['na'], failures: ['no_intent'], obstacle: ['no_intent'], aiActions: ['none'] };
}
function validClubAnswers() {
  return { role: ['manager'], courts: ['3_5'], tools: ['none'], problems: ['none'], mainActivity: ['na'], activeHours: ['na'], incidents: ['na'], satisfaction: ['na'], priority: ['none'], interest: ['no'] };
}
const fakeConfig = {
  enabled: true, databaseUrl: 'https://llbqoyucmvuijfobzryj.supabase.co', databaseKey: 'synthetic-service-key-for-tests',
  projectRef: 'llbqoyucmvuijfobzryj', hmacKey: 'synthetic-test-hmac-key-at-least-thirty-two-bytes',
  origins: ['https://polpo-ai.com'],
};
function request(url, body, options = {}) {
  const bytes = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request(url || 'https://polpo-ai.com/api/research/test', { method: 'POST', headers: { Origin: 'https://polpo-ai.com', 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.20', ...options.headers }, body: bytes });
}
function idempotencyKey() { return 'b8e6e450-7278-4a3e-95b0-8d2a4047623b'; }
test('both audiences have seven questions and every offered choice validates', () => {
  for (const audience of ['giocatori', 'circoli']) {
    const questions = q.questions(audience, {});
    assert.equal(questions.length, 7);
    for (const question of questions) {
      const answers = Object.fromEntries(question.fields.map(f => [f.id, [f.options[0].value]]));
      assert.ok(q.validQuestion(question, answers));
      for (const field of question.fields) {
        for (const option of field.options) assert.ok(q.validQuestion(question, { ...answers, [field.id]: [option.value] }));
        assert.equal(q.validQuestion(question, { ...answers, [field.id]: [] }), false);
        assert.equal(q.validQuestion(question, { ...answers, [field.id]: ['invented'] }), false);
      }
    }
  }
});
test('friends-only excludes matchmaking obstacles and uses coordination suggestion', () => {
  const friend = q.questions('giocatori', { group: ['friends'] });
  const open = q.questions('giocatori', { group: ['open'] });
  assert.ok(!friend[5].fields[0].options.some(o => o.value === 'compatibility'));
  assert.ok(open[5].fields[0].options.some(o => o.value === 'compatibility'));
  assert.ok(friend[6].fields[0].options.some(o => o.value === 'coordinate'));
  const updated = q.updateAnswer({ obstacle: ['compatibility'], aiActions: ['suggest_players'] }, 'group', ['friends']);
  assert.equal(updated.obstacle, undefined); assert.equal(updated.aiActions, undefined);
});
test('Playtomic purpose is required only when selected and cleared after change', () => {
  const question = q.questions('giocatori', { channel: ['playtomic'] })[2];
  assert.equal(question.fields.length, 3);
  assert.equal(q.validQuestion(question, { channel: ['playtomic'] }), false);
  for (const purpose of ['booking', 'matching', 'both']) assert.ok(q.validQuestion(question, { channel: ['playtomic'], playtomicUse: [purpose], bookingChannel: ['playtomic'] }));
  assert.equal(q.questions('giocatori', { channel: ['whatsapp'] })[2].fields.length, 2);
  assert.ok(q.validQuestion(q.questions('giocatori', { channel: ['whatsapp'] })[2], { channel: ['whatsapp'], bookingChannel: ['playtomic'] }));
  assert.equal(q.updateAnswer({ playtomicUse: ['matching'], bookingChannel: ['playtomic'] }, 'channel', ['whatsapp']).playtomicUse, undefined);
  assert.equal(q.updateAnswer({ bookingChannel: ['playtomic'] }, 'channel', ['other_app']).bookingChannel, undefined);
});
test('first-time player can complete without inventing an ease rating', () => {
  const question = q.questions('giocatori', { channel: ['never'] })[3];
  assert.ok(q.validQuestion(question, { ease: ['na'] }));
  assert.equal(q.validQuestion(question, { ease: ['5'] }), false);
});
test('max two problems, exclusive no-problem and reversible choices', () => {
  const field = q.questions('circoli', {})[2].fields[0];
  let values = q.toggle(field, [], 'messages');
  values = q.toggle(field, values, 'booking');
  assert.equal(q.toggle(field, values, 'players').length, 2);
  assert.deepEqual(q.toggle(field, values, 'none'), ['none']);
  assert.deepEqual(q.toggle(field, ['none'], 'messages'), ['messages']);
  assert.deepEqual(q.toggle(field, ['messages'], 'messages'), []);
  assert.equal(q.validQuestion({ fields: [field] }, { problems: ['none', 'booking'] }), false);
});
test('weekly work is attributed to a selected activity; editing clears dependent answers', () => {
  const question = q.questions('circoli', { problems: ['messages', 'admin'] })[3];
  assert.deepEqual(question.fields[0].options.map(o => o.value), ['messages', 'admin']);
  assert.equal(q.validQuestion(question, { mainActivity: ['players'], activeHours: ['1_3'] }), false);
  const changed = q.updateAnswer({ mainActivity: ['messages'], activeHours: ['8_plus'] }, 'problems', ['admin']);
  assert.equal(changed.mainActivity, undefined); assert.equal(changed.activeHours, undefined);
  assert.ok(question.fields.some(f => f.id === 'incidents'));
  assert.ok(question.fields.find(f => f.id === 'incidents').options.some(o => o.value === 'zero'));
  assert.ok(q.questions('circoli', {})[6].fields[0].options.some(o => o.value === 'offer'));
  assert.ok(q.questions('giocatori', {})[5].fields[0].options.some(o => o.value === 'no_intent'));
  assert.equal(q.updateAnswer({ incidents: ['4_plus'] }, 'mainActivity', ['admin']).incidents, undefined);
});
test('production routes remain unavailable even with local override', () => {
  for (const env of [
    { NODE_ENV: 'production', VERCEL_ENV: 'production', RESEARCH_LOCAL_PREVIEW: '1' },
    { NODE_ENV: 'development', VERCEL_ENV: 'production' }, { NODE_ENV: 'production' },
  ]) assert.equal(load('lib/research/availability.ts', env).researchPreviewAvailable(), false);
  for (const env of [{ NODE_ENV: 'development' }, { VERCEL_ENV: 'preview' }, { NODE_ENV: 'production', RESEARCH_LOCAL_PREVIEW: '1' }]) assert.equal(load('lib/research/availability.ts', env).researchPreviewAvailable(), true);
});

test('server schema accepts exact v2 branches and rejects unknown, missing, and incompatible data', () => {
  assert.equal(q.validAnswerSet('giocatori', validPlayerAnswers()), true);
  assert.equal(q.validAnswerSet('circoli', validClubAnswers(), ''), true);
  assert.equal(q.validAnswerSet('giocatori', { ...validPlayerAnswers(), playtomicUse: ['matching'] }), false);
  assert.equal(q.validAnswerSet('giocatori', { ...validPlayerAnswers(), ease: ['5'] }), false);
  assert.equal(q.validAnswerSet('giocatori', { ...validPlayerAnswers(), bookingChannel: ['playtomic'] }), false);
  assert.equal(q.validAnswerSet('giocatori', { ...validPlayerAnswers(), obstacle: ['players'] }), false);
  assert.equal(q.validAnswerSet('circoli', { ...validClubAnswers(), tools: ['none', 'whatsapp'] }), false);
  assert.equal(q.validAnswerSet('circoli', validClubAnswers(), 'x'.repeat(301)), false);
  assert.equal(q.validAnswerSet('circoli', validClubAnswers(), { text: 'no' }), false);
});

test('production collection gate requires project, secrets, privacy and retention flags', () => {
  assert.equal(serverConfig.readResearchConfig({}).enabled, false);
  const approved = {
    RESEARCH_SUPABASE_URL: 'https://llbqoyucmvuijfobzryj.supabase.co', RESEARCH_SUPABASE_PROJECT_REF: 'llbqoyucmvuijfobzryj',
    RESEARCH_SUPABASE_SERVICE_ROLE_KEY: 'synthetic-service-role-key-at-least-twenty',
    RESEARCH_HMAC_KEY: 'synthetic-hmac-key-at-least-thirty-two-characters',
    RESEARCH_COLLECTION_ENABLED: 'true', RESEARCH_PUBLIC_ENABLED: 'true',
    RESEARCH_PRIVACY_APPROVED_VERSION: 'padel-research-privacy-v1', RESEARCH_RETENTION_JOB_VERIFIED: 'true',
  };
  assert.equal(serverConfig.readResearchConfig(approved).enabled, false);
  assert.equal(serverConfig.readResearchConfig({ ...approved, RESEARCH_LOCAL_ACTIVE_PREVIEW: '1', NODE_ENV: 'development' }).enabled, true);
  assert.equal(serverConfig.readResearchConfig({ ...approved, RESEARCH_LOCAL_ACTIVE_PREVIEW: '1', NODE_ENV: 'production' }).enabled, false);
  assert.equal(serverConfig.readResearchConfig({ ...approved, RESEARCH_LOCAL_ACTIVE_PREVIEW: '1', NODE_ENV: 'development', RESEARCH_ALLOWED_ORIGINS: 'https://polpo-ai.com' }).enabled, false);
  assert.equal(serverConfig.readResearchConfig({ ...approved, RESEARCH_SUPABASE_PROJECT_REF: 'polpo-padel-operational' }).enabled, false);
  assert.equal(serverConfig.readResearchConfig({ ...approved, RESEARCH_LOCAL_ACTIVE_PREVIEW: '1', POLPO_PADEL_PROJECT_REF: 'llbqoyucmvuijfobzryj' }).enabled, false);
  assert.equal(serverConfig.researchPublicEnabled({ NODE_ENV: 'production', VERCEL_ENV: 'production', RESEARCH_LOCAL_PREVIEW: '1' }), false);
});

test('response API stores seven answers without contact and confirms only after persistence', async () => {
  const saved = [];
  const service = intake.createResearchIntake(fakeConfig, {
    response: async payload => { saved.push(payload); return { code: 'accepted', response_id: '11111111-1111-4111-8111-111111111111' }; },
    contact: async () => { throw new Error('unexpected contact write'); },
  });
  const body = { audience: 'giocatori', surveyVersion: q.VERSION, answers: validPlayerAnswers(), idempotencyKey: idempotencyKey(), website: '' };
  const response = await service.response(request('https://polpo-ai.com/api/research/responses', body));
  assert.equal(response.status, 202);
  assert.equal((await response.json()).status, 'saved');
  assert.equal(saved.length, 1);
  assert.equal(saved[0].priority_detail, null);
  assert.equal(JSON.stringify(saved[0]).includes('email'), false);
  assert.match(saved[0].idempotency_hash, /^[0-9a-f]{64}$/);
});

test('response API rejects origin, body, version, extra fields, incomplete and invalid branches', async () => {
  let calls = 0;
  const service = intake.createResearchIntake(fakeConfig, { response: async () => { calls++; return {}; }, contact: async () => ({}) });
  const base = { audience: 'giocatori', surveyVersion: q.VERSION, answers: validPlayerAnswers(), idempotencyKey: idempotencyKey(), website: '' };
  assert.equal((await service.response(request('', base, { headers: { Origin: 'https://evil.example' } }))).status, 403);
  assert.equal((await service.response(request('', { ...base, extra: 1 }))).status, 422);
  assert.equal((await service.response(request('', { ...base, surveyVersion: 'padel-surveys-v1' }))).status, 422);
  assert.equal((await service.response(request('', { ...base, answers: { ...base.answers, playtomicUse: ['matching'] } }))).status, 422);
  const incomplete = { ...base.answers }; delete incomplete.obstacle;
  assert.equal((await service.response(request('', { ...base, answers: incomplete }))).status, 422);
  assert.equal((await service.response(request('', 'x'.repeat(17 * 1024)))).status, 413);
  assert.equal((await service.response(new Request('https://polpo-ai.com/api/research/test', { method: 'POST', headers: { Origin: 'https://polpo-ai.com', 'Content-Type': 'text/plain' }, body: 'x' }))).status, 400);
  assert.equal(calls, 0);
});

test('disabled backend never calls storage; storage errors do not report success or echo data', async () => {
  let calls = 0;
  const disabled = intake.createResearchIntake({ ...fakeConfig, enabled: false }, { response: async () => { calls++; return {}; }, contact: async () => ({}) });
  assert.equal((await disabled.response(request('', {}))).status, 503);
  const broken = intake.createResearchIntake(fakeConfig, { response: async () => { throw new Error('synthetic db failure with private payload'); }, contact: async () => ({}) });
  const body = { audience: 'giocatori', surveyVersion: q.VERSION, answers: validPlayerAnswers(), idempotencyKey: idempotencyKey(), website: '' };
  const result = await broken.response(request('', body));
  assert.equal(result.status, 503);
  assert.equal((await result.text()).includes('synthetic db failure'), false);
  assert.equal(calls, 0);
});

test('duplicate retry is safe and changed payload with the same key is rejected', async () => {
  let firstHash;
  const service = intake.createResearchIntake(fakeConfig, {
    response: async input => {
      if (!firstHash) { firstHash = input.payload_hash; return { code: 'accepted', response_id: '22222222-2222-4222-8222-222222222222' }; }
      return input.payload_hash === firstHash ? { code: 'duplicate', response_id: '22222222-2222-4222-8222-222222222222' } : { code: 'conflict' };
    },
    contact: async () => ({}),
  });
  const body = { audience: 'giocatori', surveyVersion: q.VERSION, answers: validPlayerAnswers(), idempotencyKey: idempotencyKey(), website: '' };
  const a = await service.response(request('', body));
  assert.equal(a.status, 202);
  const changed = { ...body, answers: { ...body.answers, group: ['open'] } };
  // The fake store models the database conflict branch; input changes produce a different digest.
  const result = await service.response(request('', changed));
  assert.equal(result.status, 409);
});

test('rate-limit responses are explicit and do not claim a saved receipt', async () => {
  const service = intake.createResearchIntake(fakeConfig, {
    response: async () => ({ code: 'rate_limited' }),
    contact: async () => ({ code: 'rate_limited' }),
  });
  const responseBody = { audience: 'giocatori', surveyVersion: q.VERSION, answers: validPlayerAnswers(), idempotencyKey: idempotencyKey(), website: '' };
  const limited = await service.response(request('', responseBody));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '900');
  assert.equal((await limited.json()).status, undefined);
  const contactBody = { email: 'synthetic@example.test', researchContact: true, marketingOptIn: false, idempotencyKey: idempotencyKey(), website: '' };
  assert.equal((await service.contact(request('', contactBody))).status, 429);
});

test('contact API requires a valid email and explicit independent purpose, and is isolated from response writes', async () => {
  let contactWrites = 0, responseWrites = 0;
  const purposes = [];
  const service = intake.createResearchIntake(fakeConfig, {
    response: async () => { responseWrites++; return {}; },
    contact: async value => { contactWrites++; purposes.push([value.research_contact, value.marketing_opt_in]); assert.equal(value.privacy_version, 'padel-research-privacy-v1'); return { code: 'accepted', contact_id: '33333333-3333-4333-8333-333333333333' }; },
  });
  const base = { email: 'research@example.test', researchContact: true, marketingOptIn: false, idempotencyKey: idempotencyKey(), website: '' };
  assert.equal((await service.contact(request('', { ...base, email: 'bad' }))).status, 422);
  assert.equal((await service.contact(request('', { ...base, researchContact: false }))).status, 422);
  assert.equal((await service.contact(request('', base))).status, 202);
  const marketingOnly = { ...base, researchContact: false, marketingOptIn: true, idempotencyKey: 'f5a6a394-6232-46a4-84dd-a112e851f167' };
  assert.equal((await service.contact(request('', marketingOnly))).status, 202);
  assert.equal(contactWrites, 2);
  assert.deepEqual(purposes, [[true, false], [false, true]]);
  assert.equal(responseWrites, 0);
});

test('SQL migration isolates tables, enables RLS, limits grants, retains data, and suppresses small aggregate cells', () => {
  const sql = fs.readFileSync('supabase/migrations/20261105113000_create_padel_research_collection.sql', 'utf8');
  assert.match(sql, /create schema if not exists research_private/);
  assert.match(sql, /alter table research_private\.survey_responses enable row level security/i);
  assert.match(sql, /alter table research_private\.survey_contacts enable row level security/i);
  assert.match(sql, /revoke all on function public\.research_submit_response[\s\S]*from public, anon, authenticated/i);
  assert.match(sql, /interval '365 days'/);
  assert.match(sql, /interval '180 days'/);
  assert.match(sql, /having count\(distinct r\.id\) >= 5/i);
  const contactTable = sql.match(/create table research_private\.survey_contacts \(([\s\S]*?)\n\);/i)?.[1] || '';
  assert.ok(contactTable);
  assert.doesNotMatch(contactTable, /foreign key|response_id|survey_response/i);
});
