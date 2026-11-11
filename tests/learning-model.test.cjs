'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const M = require('../aprende-model.js');
function finish(state, lesson, plan = 0, date = new Date(2026, 10, 11, 12)) {
  const session = M.start(state, lesson.id);
  if (session.phase === 'intro') M.advance(state, lesson.id);
  while (session.phase === 'question') {
    const q = lesson.questions.find(q => q.id === session.queue[0]);
    if (!session.feedback) assert.equal(M.submit(state, lesson.id, q.answer).correct, true);
    M.advance(state, lesson.id);
  }
  return M.complete(state, lesson.id, plan, date);
}
test('all six lessons have unique valid exercises and three actionable habits', () => {
  assert.equal(new Set(M.lessons.map(l => l.id)).size, 6);
  for (const l of M.lessons) {
    assert.equal(l.questions.length, 4); assert.equal(l.plans.length, 3);
    assert.equal(new Set(l.questions.map(q => q.id)).size, 4);
    for (const q of l.questions) {
      assert.ok(M.equalAnswer(q, q.answer));
      for (const n of [].concat(q.answer)) assert.ok(n >= 0 && n < (q.options || q.items).length);
      if (q.type === 'order') assert.equal(new Set(q.answer).size, q.items.length);
    }
  }
});
test('lessons unlock in order, give 50 points once, and retain the chosen habit', () => {
  const s = M.blank();
  assert.equal(M.start(s, 'refugio'), null); assert.equal(M.start(s, 'missing'), null);
  for (const lesson of M.lessons) {
    assert.ok(M.unlocked(s, lesson.id));
    const result = finish(s, lesson, 2);
    assert.equal(result.xp, 50); assert.equal(s.plans[lesson.id], 2);
    assert.equal(s.sessions[lesson.id], undefined);
  }
  assert.equal(s.completed.length * 50, 300);
  assert.equal(s.days.length, 1);
  const review = finish(s, M.lessons[0], 1);
  assert.equal(review.xp, 0); assert.equal(s.completed.length, 6); assert.equal(s.plans.reloj, 1);
});
test('incorrect answers return at the end and must be understood before finishing', () => {
  const s = M.blank(), id = 'reloj', session = M.start(s, id);
  M.advance(s, id);
  const q = M.lessons[0].questions[0];
  assert.equal(M.submit(s, id, 1).correct, false);
  assert.equal(session.queue.at(-1), q.id);
  assert.equal(M.submit(s, id, 1), null, 'double-click cannot append a second retry');
  assert.equal(session.queue.length, 5);
  assert.equal(M.complete(s, id, 0), null);
  M.advance(s, id);
  for (let i = 0; i < 3; i++) {
    const current = M.lessons[0].questions.find(q => q.id === session.queue[0]);
    M.submit(s, id, current.answer); M.advance(s, id);
  }
  assert.equal(session.phase, 'question'); assert.deepEqual(session.queue, [q.id]);
  assert.equal(M.submit(s, id, q.answer).correct, true); M.advance(s, id);
  assert.equal(session.phase, 'practice'); assert.equal(M.complete(s, id, 0).xp, 50);
});
test('radio, multiple selection and ordering validate meaningful answers', () => {
  const multi = M.lessons[1].questions[0], order = M.lessons[0].questions[2];
  assert.ok(M.equalAnswer(multi, [2, 0])); assert.ok(!M.equalAnswer(multi, [0, 0]));
  assert.ok(!M.equalAnswer(multi, [0])); assert.ok(!M.equalAnswer(multi, [0, 1, 2]));
  assert.ok(!M.equalAnswer(order, [0, 1, 2])); assert.ok(M.equalAnswer(order, [1, 2, 0]));
  const s = M.blank(), session = M.start(s, 'reloj'); M.advance(s, 'reloj');
  for (const invalid of [null, '0', -1, 8, [0]]) assert.equal(M.submit(s, 'reloj', invalid), null);
  assert.equal(session.queue.length, 4);
});
test('reload preserves feedback and the retry queue, so a learner can resume safely', () => {
  const s = M.blank(); M.start(s, 'reloj'); M.advance(s, 'reloj'); M.submit(s, 'reloj', 1);
  const restored = M.normalize(JSON.parse(JSON.stringify(s)));
  assert.deepEqual(restored, s);
  assert.equal(M.submit(restored, 'reloj', 0), null);
  assert.ok(M.advance(restored, 'reloj'));
  assert.equal(restored.sessions.reloj.queue.length, 4);
  assert.equal(M.nextLesson(restored).id, 'reloj');
});
test('normalization recovers from corrupt or unsupported storage without exceptions', () => {
  for (const input of [null, {}, [], {version: 8}, 'text']) assert.deepEqual(M.normalize(input), M.blank());
  const malformed = {version: 2, completed: ['refugio', 'unknown'], days: [null, '2026-02-30', '2026-11-11', '2026-11-11'], plans: {reloj: 999}, sessions: {reloj: {phase: 'question', queue: ['nonexistent']}}};
  const clean = M.normalize(malformed);
  assert.deepEqual(clean.completed, []); assert.deepEqual(clean.days, ['2026-11-11']); assert.deepEqual(clean.sessions, {});
  assert.ok(M.start(clean, 'reloj'));
});
test('streak uses local calendar days, keeps yesterday alive, and counts one day once', () => {
  const s = M.blank(); s.days = ['2026-10-31', '2026-11-01', '2026-11-02'];
  assert.equal(M.streak(s, new Date(2026, 10, 2, 23, 59)), 3);
  assert.equal(M.streak(s, new Date(2026, 10, 3, 6)), 3);
  assert.equal(M.streak(s, new Date(2026, 10, 4, 6)), 0);
  assert.equal(M.dayKey(new Date(2026, 0, 1, 0, 1)), '2026-01-01');
  assert.ok(M.validDay('2024-02-29')); assert.ok(!M.validDay('2026-02-29'));
});
test('independent review sessions do not discard an unfinished lesson', () => {
  const s = M.blank(); finish(s, M.lessons[0]);
  M.start(s, 'refugio'); M.advance(s, 'refugio');
  M.start(s, 'reloj');
  assert.equal(s.sessions.refugio.phase, 'question');
  assert.equal(M.nextLesson(s).id, 'refugio');
  assert.deepEqual(M.normalize(JSON.parse(JSON.stringify(s))), s);
});

test('after finishing the path, the daily action resumes an unfinished review', () => {
  const s = M.blank();
  for (const lesson of M.lessons) finish(s, lesson);
  M.start(s, 'mitos'); M.advance(s, 'mitos');
  assert.equal(M.nextLesson(s).id, 'mitos');
});

test('all 18 theory ideas have examples, takeaways and existing health references', () => {
  assert.equal(M.topics.length, 18);
  assert.equal(new Set(M.topics.map(topic => topic.id)).size, 18);
  assert.equal(M.glossary.length, 8);
  for (const lesson of M.lessons) {
    assert.equal(lesson.theory.length, 3);
    for (const topic of lesson.theory) {
      assert.ok(topic.paragraphs.length >= 2); assert.ok(topic.example.length > 30); assert.ok(topic.remember.length > 15);
      for (const id of topic.sources) assert.match(M.sources[id].url, /^https:\/\//);
    }
  }
});
test('reading and saving ideas are idempotent and never award points or unlock quizzes', () => {
  const s = M.blank();
  assert.ok(M.readTopic(s, 'fases')); assert.ok(M.readTopic(s, 'fases'));
  assert.deepEqual(s.readTheory, ['fases']);
  assert.ok(M.bookmark(s, 'fases')); assert.deepEqual(s.bookmarks, ['fases']);
  assert.ok(M.bookmark(s, 'fases')); assert.deepEqual(s.bookmarks, []);
  assert.equal(M.bookmark(s, 'unknown'), false); assert.equal(M.readTopic(s, 'unknown'), false);
  assert.equal(s.completed.length, 0); assert.equal(s.days.length, 0); assert.equal(M.unlocked(s, 'mitos'), false);
});
test('the upgrade preserves v2 completions, pending answers and habits without forcing theory', () => {
  const s = M.blank(); finish(s, M.lessons[0]); M.start(s, 'refugio'); M.advance(s, 'refugio');
  M.submit(s, 'refugio', [0, 1]);
  const legacy = JSON.parse(JSON.stringify(s)); delete legacy.readTheory; delete legacy.bookmarks;
  delete legacy.sessions.refugio.theoryIndex;
  const restored = M.normalize(legacy);
  assert.deepEqual(restored.completed, ['reloj']); assert.equal(restored.plans.reloj, 0);
  assert.equal(restored.sessions.refugio.phase, 'question'); assert.equal(restored.sessions.refugio.feedback.correct, false);
  assert.equal(restored.sessions.refugio.theoryIndex, 0); assert.deepEqual(restored.readTheory, []);
});
test('reading state is normalized, preserving a valid page and discarding unknown IDs', () => {
  const s = M.blank(); M.start(s, 'reloj'); s.sessions.reloj.theoryIndex = 2;
  s.readTheory = ['fases', 'fases', 'wrong']; s.bookmarks = ['entorno', null];
  const restored = M.normalize(s);
  assert.deepEqual(restored.readTheory, ['fases']); assert.deepEqual(restored.bookmarks, ['entorno']);
  assert.equal(restored.sessions.reloj.theoryIndex, 2);
  s.sessions.reloj.theoryIndex = -1; assert.equal(M.normalize(s).sessions.reloj.theoryIndex, 0);
});
