'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {JSDOM, VirtualConsole} = require('jsdom');
const M = require('../aprende-model.js');
const read = path => readFileSync(join(__dirname, '..', path), 'utf8');
function boot({saved, blocked = false, hash = '#aprende'} = {}) {
  const errors = [], virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => errors.push(e));
  const dom = new JSDOM(read('index.html'), {url: `https://loak.test/${hash}`, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole});
  const w = dom.window;
  w.matchMedia = () => ({matches: true, addEventListener() {}, removeEventListener() {}});
  w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {}; w.HTMLElement.prototype.scrollTo = () => {};
  if (saved !== undefined) w.localStorage.setItem(M.KEY, typeof saved === 'string' ? saved : JSON.stringify(saved));
  if (blocked) Object.defineProperty(w, 'localStorage', {get() {throw new w.DOMException('Storage blocked', 'SecurityError');}});
  for (const script of w.document.querySelectorAll('script:not([src])')) w.eval(script.textContent);
  w.eval(read('aprende-model.js')); w.eval(read('aprende.js'));
  const $ = selector => w.document.querySelector(selector);
  const click = selector => {const target = $(selector); assert.ok(target, `Missing control: ${selector}`); assert.equal(target.disabled, false, `Disabled control: ${selector}`); target.click();};
  const select = (name, value) => click(`input[name="${name}"][value="${value}"]`);
  return {dom, w, $, click, select, errors};
}
function doLesson(app, id, {wrongFirst = false} = {}) {
  const {w, $, click, select} = app;
  click(`[data-start="${id}"]`);
  if ($('[data-action="advance"]')) click('[data-action="advance"]');
  let madeMistake = false;
  for (let guard = 0; guard < 20 && !$('input[name="learn-plan"]'); guard++) {
    const saved = JSON.parse(w.localStorage.getItem(M.KEY)), session = saved.sessions[id];
    const lesson = M.lessons.find(l => l.id === id), q = lesson.questions.find(q => q.id === session.queue[0]);
    if (!session.feedback) {
      if (q.type === 'order') {
        for (let position = 0; position < q.answer.length; position++) {
          const item = q.answer[position];
          while ([...w.document.querySelectorAll('.learn-order li')].findIndex(li => li.querySelector(`[data-item="${item}"]`)) > position) click(`[data-item="${item}"][data-move="up"]`);
        }
      } else if (q.type === 'multi') {
        q.answer.forEach(i => select('learn-answer', i));
      } else {
        const value = wrongFirst && !madeMistake ? (q.answer + 1) % q.options.length : q.answer;
        madeMistake ||= value !== q.answer;
        select('learn-answer', value);
      }
      click('[data-action="check"]');
      assert.ok($('#learn-feedback-title'));
    }
    click('[data-action="advance"]');
  }
  assert.ok($('input[name="learn-plan"]'), 'practice step reached after all required answers');
  select('learn-plan', 0); click('[data-action="complete"]');
  assert.match($('#learn-title').textContent, /Un pequeño paso/);
}
test('direct #aprende entry integrates with the original router and unlocks only lesson one', t => {
  const a = boot(); t.after(() => a.dom.window.close());
  assert.equal(a.$('#v-aprende').hidden, false); assert.equal(a.$('#v-inicio').hidden, true);
  assert.equal(a.$('html').classList.contains('locked'), false);
  assert.equal(a.$('[data-start="refugio"]').disabled, true);
  assert.match(a.$('#learn-stats').textContent, /0/);
  assert.deepEqual(a.errors, []);
});
test('full 24-exercise journey, mistakes, ordering, multiple choice, plans and review work together', t => {
  const a = boot(); t.after(() => a.dom.window.close());
  for (const [index, lesson] of M.lessons.entries()) {
    doLesson(a, lesson.id, {wrongFirst: index === 0});
    a.click('[data-action="exit"]');
    assert.equal(a.$('#learn-player').hidden, true);
    assert.equal(a.w.document.querySelectorAll('#learn-plans li').length, index + 1);
  }
  const saved = JSON.parse(a.w.localStorage.getItem(M.KEY));
  assert.equal(saved.completed.length, 6); assert.equal(saved.days.length, 1);
  assert.match(a.$('#learn-stats').textContent, /300/);
  doLesson(a, 'reloj');
  assert.match(a.$('.learn-reward').textContent, /Sin puntos duplicados/);
  assert.equal(JSON.parse(a.w.localStorage.getItem(M.KEY)).completed.length, 6);
  assert.deepEqual(a.errors, []);
});
test('save and exit restores answered feedback after a reload', t => {
  const a = boot(); t.after(() => a.dom.window.close());
  a.click('[data-start="reloj"]'); a.click('[data-action="advance"]');
  assert.equal(a.$('[data-action="check"]').disabled, true);
  a.select('learn-answer', 1); a.click('[data-action="check"]');
  a.click('[data-action="exit"]'); assert.match(a.$('#learn-daily').textContent, /Continuar mi lección/);
  const b = boot({saved: JSON.parse(a.w.localStorage.getItem(M.KEY))}); t.after(() => b.dom.window.close());
  b.click('[data-start="reloj"]');
  assert.match(b.$('#learn-feedback-title').textContent, /Vamos a entenderlo/);
  assert.equal(b.$('input[name="learn-answer"]').disabled, true);
  b.click('[data-action="advance"]'); assert.match(b.$('#learn-title').textContent, /Levantarse/);
});
test('blocked storage and corrupt JSON do not break the exercises', t => {
  for (const options of [{blocked: true}, {saved: '{broken'}]) {
    const a = boot(options); t.after(() => a.dom.window.close());
    assert.equal(a.$('#learn-storage').hidden, false);
    a.click('[data-start="reloj"]'); a.click('[data-action="advance"]');
    a.select('learn-answer', 0); a.click('[data-action="check"]');
    assert.match(a.$('#learn-feedback-title').textContent, /Una idea más/);
    assert.deepEqual(a.errors, []);
  }
});
test('progress reset requires a concrete confirmation and does not erase unrelated data', t => {
  const a = boot(); t.after(() => a.dom.window.close());
  doLesson(a, 'reloj'); a.click('[data-action="exit"]');
  a.w.localStorage.setItem('another-app', 'keep');
  a.click('#learn-reset'); assert.equal(a.$('#learn-reset-confirm').hidden, false);
  a.click('#learn-reset-cancel'); assert.equal(JSON.parse(a.w.localStorage.getItem(M.KEY)).completed.length, 1);
  a.click('#learn-reset'); a.click('#learn-reset-yes');
  assert.equal(JSON.parse(a.w.localStorage.getItem(M.KEY)).completed.length, 0);
  assert.equal(a.w.localStorage.getItem('another-app'), 'keep');
});
test('breathing pause starts, pauses, resets and stops when navigating away', async t => {
  const a = boot(); t.after(() => a.dom.window.close());
  a.click('#learn-breathe-open'); assert.equal(a.$('#learn-breathe-open').getAttribute('aria-expanded'), 'true');
  a.click('#learn-breath-toggle'); assert.equal(a.$('#learn-breath-toggle').textContent, 'Pausar');
  a.click('#learn-breath-toggle'); assert.equal(a.$('#learn-breath-toggle').textContent, 'Continuar');
  a.click('#learn-breath-reset'); assert.equal(a.$('#learn-breath-time').textContent, '60');
  a.click('#learn-breath-toggle');
  a.w.location.hash = '#servicios'; await new Promise(resolve => a.w.setTimeout(resolve, 20));
  assert.equal(a.$('#learn-breath-toggle').textContent, 'Continuar'); assert.equal(a.$('#v-servicios').hidden, false);
  a.w.location.hash = '#aprende'; await new Promise(resolve => a.w.setTimeout(resolve, 20));
  assert.equal(a.$('#v-aprende').hidden, false); assert.deepEqual(a.errors, []);
});
