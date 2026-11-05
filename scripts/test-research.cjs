const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
function load(file, env = process.env) {
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', 'process', js)(module, module.exports, { env });
  return module.exports;
}
const q = load('lib/research/questions.ts');
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
  assert.equal(question.fields.length, 2);
  assert.equal(q.validQuestion(question, { channel: ['playtomic'] }), false);
  for (const purpose of ['booking', 'matching', 'both']) assert.ok(q.validQuestion(question, { channel: ['playtomic'], playtomicUse: [purpose] }));
  assert.equal(q.questions('giocatori', { channel: ['whatsapp'] })[2].fields.length, 1);
  assert.equal(q.updateAnswer({ playtomicUse: ['matching'] }, 'channel', ['whatsapp']).playtomicUse, undefined);
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
});
test('production routes remain unavailable even with local override', () => {
  for (const env of [
    { NODE_ENV: 'production', VERCEL_ENV: 'production', RESEARCH_LOCAL_PREVIEW: '1' },
    { NODE_ENV: 'development', VERCEL_ENV: 'production' }, { NODE_ENV: 'production' },
  ]) assert.equal(load('lib/research/availability.ts', env).researchPreviewAvailable(), false);
  for (const env of [{ NODE_ENV: 'development' }, { VERCEL_ENV: 'preview' }, { NODE_ENV: 'production', RESEARCH_LOCAL_PREVIEW: '1' }]) assert.equal(load('lib/research/availability.ts', env).researchPreviewAvailable(), true);
});
