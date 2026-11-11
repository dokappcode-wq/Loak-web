/* Interfaz de la escuela de descanso. El estado se guarda únicamente en el navegador. */
(() => {
  'use strict';
  const M = window.LoakLearning;
  const $ = id => document.getElementById(id);
  if (!M || !$('v-aprende')) return;
  const icons = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon: '<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>',
    leaf: '<path d="M20 3C7 1 1 10 6 17s16 1 14-14Z M6 19 16 9 M10 15v-5m0 5h5"/>',
    wind: '<path d="M3 8h13a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h6a3 3 0 1 1-3 3"/>',
    spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
    flag: '<path d="M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
    book: '<path d="M12 5v16M3 3c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 3-3-3-5-4-9-3V3Z"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name] || icons.moon}</svg>`;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  let state = M.blank(), storageAvailable = true, activeId = null, selection = null, celebration = null;
  try {
    const raw = localStorage.getItem(M.KEY);
    if (raw) state = M.normalize(JSON.parse(raw));
  } catch (error) {
    if (error instanceof SyntaxError) showStorage('No hemos podido recuperar el progreso guardado. Puedes empezar un nuevo recorrido.');
    else storageAvailable = false;
  }
  function showStorage(message) { $('learn-storage').hidden = false; $('learn-storage').textContent = message; }
  function save() {
    try { localStorage.setItem(M.KEY, JSON.stringify(state)); storageAvailable = true; $('learn-storage').hidden = true; }
    catch { storageAvailable = false; showStorage('Este navegador no permite guardar el progreso. Puedes hacer los ejercicios, pero se perderá al cerrar o recargar la página.'); }
  }
  const announce = message => { $('learn-announcement').textContent = message; };
  const motion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  function focus(id, scroll = false) {
    const target = $(id);
    if (!target) return;
    target.focus({preventScroll: true});
    if (scroll) target.scrollIntoView({behavior: motion(), block: 'start'});
  }
  function dashboard() {
    const count = state.completed.length, next = M.nextLesson(state), todayDone = state.days.includes(M.dayKey());
    const stats = [
      ['spark', count * 50, 'puntos de aprendizaje'],
      ['sun', M.streak(state), M.streak(state) === 1 ? 'día de constancia' : 'días de constancia'],
      ['book', `${count} <span aria-hidden="true">/</span><span class="learn-sr">de</span> 6`, 'lecciones completadas']
    ];
    $('learn-stats').innerHTML = stats.map(([symbol, value, label]) => `<div class="learn-stat"><span class="learn-stat-icon">${icon(symbol)}</span><div><strong>${value}</strong><small>${label}</small></div></div>`).join('');
    $('learn-percent').textContent = `${Math.round(count / M.lessons.length * 100)} % COMPLETADO`;
    $('learn-overall-fill').style.width = `${count / M.lessons.length * 100}%`;
    const units = [...new Set(M.lessons.map(l => l.unit))];
    $('learn-path').innerHTML = units.map((unit, unitIndex) => `<section class="learn-unit" aria-labelledby="learn-unit-${unitIndex}"><h3 class="learn-unit-heading" id="learn-unit-${unitIndex}"><span>0${unitIndex + 1}</span> ${esc(unit)}</h3><ol class="learn-nodes" start="${unitIndex * 2 + 1}">${M.lessons.filter(l => l.unit === unit).map(lesson => {
      const done = state.completed.includes(lesson.id), available = M.unlocked(state, lesson.id), pending = Boolean(state.sessions[lesson.id]);
      const current = !done && available;
      return `<li class="learn-node ${done ? 'is-done' : current ? 'is-current' : 'is-locked'}"><button class="learn-lesson" data-start="${lesson.id}" ${available ? '' : 'disabled'} ${current ? 'aria-current="step"' : ''}><span class="learn-node-circle">${icon(done ? 'check' : available ? lesson.icon : 'lock')}</span><span class="learn-node-copy">${current ? '<span class="learn-node-badge">Tu siguiente paso</span>' : ''}<strong>${esc(lesson.title)}</strong><small>${done ? pending ? 'Repaso en curso · Continuar' : 'Completada · Volver a practicar' : available ? pending ? 'Lección en curso · Continuar' : `${lesson.minutes} min · 4 ejercicios · +50 puntos` : 'Completa la lección anterior'}</small></span>${available ? '<span class="learn-node-arrow" aria-hidden="true">↗</span>' : ''}</button></li>`;
    }).join('')}</ol></section>`).join('');
    $('learn-path-finish').innerHTML = `${icon(count === M.lessons.length ? 'check' : 'flag')}<p><strong>${count === M.lessons.length ? 'El camino está completo. El aprendizaje sigue.' : 'Un descanso más consciente empieza aquí.'}</strong>${count === M.lessons.length ? 'Vuelve a cualquier lección cuando te apetezca repasar.' : 'Sin prisa, sin vidas que perder. Una idea a la vez.'}</p>`;
    const title = todayDone ? 'Tu paso de hoy, dado.' : count ? 'Un ratito para ti.' : 'Hoy empieza tu camino.';
    const body = todayDone ? 'Ya has completado una práctica hoy. Puedes seguir aprendiendo o dejarlo aquí: tú marcas el ritmo.' : 'Tu objetivo de hoy: completar una lección y elegir un pequeño hábito para probar.';
    $('learn-daily').innerHTML = `<div class="learn-goal-mark"><p class="learn-eyebrow">TU OBJETIVO DE HOY</p><span class="learn-goal-ring ${todayDone ? 'is-met' : ''}" aria-label="${todayDone ? 'Objetivo completado' : 'Objetivo pendiente'}">${todayDone ? icon('check') : '1'}</span></div><h2>${title}</h2><p>${body}</p><button class="learn-primary" data-start="${next.id}">${state.sessions[next.id] ? 'Continuar mi lección' : count === M.lessons.length ? 'Volver a practicar' : count ? 'Seguir mi camino' : 'Empezar mi camino'} <span aria-hidden="true">→</span></button>`;
    const plans = M.lessons.filter(l => Number.isInteger(state.plans[l.id]));
    $('learn-plans').innerHTML = plans.length ? `<ul>${plans.map(l => `<li>${esc(l.plans[state.plans[l.id]])}</li>`).join('')}</ul>` : '<p>Al terminar una lección, elige una acción sencilla. Aquí irá creciendo tu propia rutina.</p>';
    if (!storageAvailable) showStorage('Este navegador no permite guardar el progreso. Puedes hacer los ejercicios, pero se perderá al cerrar o recargar la página.');
  }
  function header(lesson, session, full = false) {
    let mastered = lesson.questions.length - new Set(session?.queue || []).size;
    if (session?.feedback?.correct && session.queue.filter(id => id === session.queue[0]).length === 1) mastered++;
    if (full) mastered = lesson.questions.length;
    return `<div class="learn-player-head"><button class="learn-exit" data-action="exit">${icon('close')} Guardar y salir</button><div class="learn-progress-group"><small>${esc(lesson.title)} · ${mastered} de ${lesson.questions.length} ideas</small><progress value="${mastered}" max="${lesson.questions.length}" aria-label="Ideas aprendidas en esta lección"></progress></div></div>`;
  }
  function footer(label, action, disabled = false, note = 'Sin perder puntos. Puedes tomarte tu tiempo.') {
    return `<div class="learn-player-footer"><p>${note}</p><button class="learn-primary" data-action="${action}" ${disabled ? 'disabled' : ''}>${label} <span aria-hidden="true">→</span></button></div>`;
  }
  function intro(lesson, session) {
    return `${header(lesson, session)}<div class="learn-player-card"><div class="learn-lesson-emblem">${icon(lesson.icon)}</div><p class="learn-eyebrow">${esc(lesson.unit)} · ${lesson.minutes} MINUTOS</p><h2 id="learn-title" tabindex="-1">${esc(lesson.title)}</h2><p>${esc(lesson.intro)}</p><div class="learn-takeaway">${icon('spark')}<p><strong>Quédate con esta idea</strong><br>${esc(lesson.takeaway)}</p></div>${footer('Vamos allá', 'advance', false, '4 ejercicios y un pequeño paso para tu día.')}</div>`;
  }
  function answerText(question) {
    if (question.type === 'choice') return question.options[question.answer];
    return question.answer.map(index => (question.type === 'order' ? question.items : question.options)[index]).join(question.type === 'order' ? ' → ' : ' · ');
  }
  function options(question, feedback) {
    if (question.type === 'order') return `<ol class="learn-order" aria-label="Pasos para ordenar">${selection.map((itemIndex, position) => `<li><span class="learn-order-number" aria-hidden="true">${position + 1}.</span><span class="learn-order-text">${esc(question.items[itemIndex])}</span><div class="learn-order-controls"><button class="learn-move" data-move="up" data-item="${itemIndex}" aria-label="Subir: ${esc(question.items[itemIndex])}" ${feedback || position === 0 ? 'disabled' : ''}>↑</button><button class="learn-move" data-move="down" data-item="${itemIndex}" aria-label="Bajar: ${esc(question.items[itemIndex])}" ${feedback || position === selection.length - 1 ? 'disabled' : ''}>↓</button></div></li>`).join('')}</ol>`;
    const multi = question.type === 'multi';
    return `<div class="learn-options" role="group" aria-labelledby="learn-title">${question.options.map((text, index) => {
      const selected = multi ? selection.includes(index) : selection === index;
      const correct = feedback && (multi ? question.answer.includes(index) : question.answer === index);
      return `<label class="learn-option ${correct ? 'is-correct' : ''}"><input type="${multi ? 'checkbox' : 'radio'}" name="learn-answer" value="${index}" ${selected ? 'checked' : ''} ${feedback ? 'disabled' : ''}><span>${esc(text)}</span>${correct ? '<span class="learn-option-marker" aria-label="Respuesta correcta">✓</span>' : ''}</label>`;
    }).join('')}</div>`;
  }
  function questionView(lesson, session, keepSelection = false) {
    const q = lesson.questions.find(item => item.id === session.queue[0]);
    const feedback = session.feedback;
    if (!keepSelection) selection = feedback ? feedback.answer : q.type === 'choice' ? null : q.type === 'multi' ? [] : q.items.map((_, i) => i);
    return `${header(lesson, session)}<div class="learn-player-card"><p class="learn-eyebrow">${esc(q.label || (q.type === 'order' ? 'PONLO EN ORDEN' : q.type === 'multi' ? 'ELIGE VARIAS RESPUESTAS' : 'ELIGE UNA RESPUESTA'))}</p><h2 id="learn-title" tabindex="-1">${esc(q.prompt)}</h2>${q.hint ? `<p class="learn-question-hint" id="learn-question-hint">${esc(q.hint)}</p>` : ''}${options(q, feedback)}${feedback ? `<section class="learn-feedback" role="status"><h3 id="learn-feedback-title" tabindex="-1">${icon(feedback.correct ? 'check' : 'book')}${feedback.correct ? 'Una idea más para ti.' : 'No pasa nada. Vamos a entenderlo.'}</h3>${feedback.correct ? '' : `<p class="learn-correction">${q.type === 'order' ? 'El orden propuesto' : 'La respuesta'}: ${esc(answerText(q))}.</p>`}<p>${esc(q.why)}</p>${feedback.correct ? '' : '<p class="learn-review-note">Volverás a practicar esta idea antes de terminar.</p>'}</section>` : ''}${footer(feedback ? 'Continuar' : 'Comprobar', feedback ? 'advance' : 'check', !feedback && !canCheck(q))}</div>`;
  }
  function practice(lesson, session) {
    selection = Number.isInteger(state.plans[lesson.id]) ? state.plans[lesson.id] : null;
    return `${header(lesson, session)}<div class="learn-player-card"><p class="learn-eyebrow">DE LA IDEA AL HÁBITO</p><h2 id="learn-title" tabindex="-1">¿Qué pequeño paso te llevas?</h2><p>No hace falta cambiarlo todo. Elige una acción que te gustaría probar; no tiene que estar hecha todavía.</p><div class="learn-options" role="group" aria-labelledby="learn-title">${lesson.plans.map((plan, i) => `<label class="learn-option"><input type="radio" name="learn-plan" value="${i}" ${selection === i ? 'checked' : ''}><span>${esc(plan)}</span></label>`).join('')}</div><p class="learn-plans-hint">Se añadirá a «Mis pequeños pasos». Solo se guardará en este navegador.</p>${footer('Guardar y terminar', 'complete', selection === null, 'Un hábito que encaje contigo vale más que una rutina perfecta.')}</div>`;
  }
  function completedView(lesson, result) {
    const index = M.lessons.indexOf(lesson), next = M.lessons[index + 1];
    return `<div class="learn-player-card learn-complete"><div class="learn-lesson-emblem">${icon('check')}</div><p class="learn-eyebrow">${result.fresh ? 'LECCIÓN COMPLETADA' : 'REPASO COMPLETADO'}</p><h2 id="learn-title" tabindex="-1">Un pequeño paso.<br>Una nueva idea.</h2><p>${result.fresh ? 'Lo aprendido se queda contigo. Sigue a tu ritmo.' : 'Volver a una idea también es avanzar. Tu práctica de hoy queda registrada.'}</p><div class="learn-reward">${icon(result.fresh ? 'spark' : 'book')}${result.fresh ? '+50 puntos de aprendizaje' : 'Ideas repasadas · Sin puntos duplicados'}</div><div class="learn-takeaway">${icon('leaf')}<p><strong>Mi pequeño paso</strong><br>${esc(result.plan)}</p></div><p class="learn-fine">Tus puntos reconocen el aprendizaje. No miden la calidad de tu sueño.</p><div class="learn-complete-actions">${next ? `<button class="learn-primary" data-start="${next.id}">Siguiente lección <span aria-hidden="true">→</span></button>` : ''}<button class="learn-secondary" data-action="exit">Volver a mi camino</button></div></div>`;
  }
  function renderActive(keepSelection = false) {
    const lesson = M.lessons.find(l => l.id === activeId);
    if (!lesson) {showDashboard(); return;}
    $('learn-dashboard').hidden = true; $('learn-player').hidden = false;
    if (celebration) {$('learn-player').innerHTML = completedView(lesson, celebration); return;}
    const session = state.sessions[activeId];
    if (!session) {showDashboard(); return;}
    $('learn-player').innerHTML = session.phase === 'intro' ? intro(lesson, session) : session.phase === 'practice' ? practice(lesson, session) : questionView(lesson, session, keepSelection);
  }
  function showDashboard(withFocus = false) {
    activeId = null; celebration = null; selection = null;
    $('learn-dashboard').hidden = false; $('learn-player').hidden = true; dashboard();
    if (withFocus) { $('learn-path-title').tabIndex = -1; focus('learn-path-title', true); }
  }
  function openLesson(id) {
    if (!M.start(state, id)) return;
    pauseBreathing(); activeId = id; celebration = null; save(); renderActive(); focus('learn-title');
    $('learn-player').scrollIntoView({behavior: motion(), block: 'start'});
  }
  function canCheck(q) {
    return q.type === 'choice' ? Number.isInteger(selection) : q.type === 'multi' ? selection.length === q.answer.length : true;
  }
  $('v-aprende').addEventListener('click', event => {
    const start = event.target.closest('[data-start]');
    if (start && !start.disabled) {openLesson(start.dataset.start); return;}
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'exit') {showDashboard(true); return;}
    if (!activeId || celebration) return;
    const move = event.target.closest('[data-move]');
    if (move && !move.disabled) {
      const session = state.sessions[activeId];
      if (session.feedback) return;
      const item = Number(move.dataset.item), from = selection.indexOf(item), to = from + (move.dataset.move === 'up' ? -1 : 1);
      if (from < 0 || to < 0 || to >= selection.length) return;
      [selection[from], selection[to]] = [selection[to], selection[from]];
      renderActive(true);
      const controls = [...$('learn-player').querySelectorAll(`[data-item="${item}"]`)];
      const target = controls.find(b => b.dataset.move === move.dataset.move && !b.disabled) || controls.find(b => !b.disabled);
      target?.focus({preventScroll: true});
      announce(`Paso movido a la posición ${to + 1}.`);
    }
    if (action === 'check' && M.submit(state, activeId, selection)) {save(); renderActive(); focus('learn-feedback-title');}
    if (action === 'advance' && M.advance(state, activeId)) {save(); renderActive(); focus('learn-title', true);}
    if (action === 'complete') {
      const result = M.complete(state, activeId, selection);
      if (result) {celebration = result; save(); dashboard(); renderActive(); focus('learn-title', true); announce(result.fresh ? 'Lección completada. Has ganado 50 puntos.' : 'Repaso completado.');}
    }
  });
  $('learn-player').addEventListener('change', event => {
    if (!activeId || celebration) return;
    const input = event.target;
    if (input.name === 'learn-plan') {
      selection = Number(input.value); $('learn-player').querySelector('[data-action="complete"]').disabled = false;
    } else if (input.name === 'learn-answer') {
      const lesson = M.lessons.find(l => l.id === activeId), session = state.sessions[activeId];
      if (session.feedback) return;
      const q = lesson.questions.find(item => item.id === session.queue[0]);
      selection = q.type === 'multi' ? [...$('learn-player').querySelectorAll('input[name="learn-answer"]:checked')].map(n => Number(n.value)) : Number(input.value);
      $('learn-player').querySelector('[data-action="check"]').disabled = !canCheck(q);
    }
  });
  $('learn-reset').onclick = () => { $('learn-reset-confirm').hidden = false; focus('learn-reset-cancel'); };
  $('learn-reset-cancel').onclick = () => { $('learn-reset-confirm').hidden = true; focus('learn-reset'); };
  $('learn-reset-yes').onclick = () => {
    state = M.blank(); save(); pauseBreathing(); showDashboard(); $('learn-reset-confirm').hidden = true; focus('learn-reset'); announce('Tu progreso de aprendizaje se ha borrado. Puedes empezar de nuevo.');
  };
  // The optional pause uses elapsed time, rather than counting interval ticks.
  let remaining = 60000, deadline = 0, interval = null;
  function updateBreathing() {
    if (interval !== null) remaining = Math.max(0, deadline - performance.now());
    $('learn-breath-time').textContent = Math.ceil(remaining / 1000);
    if (remaining === 0) {
      clearInterval(interval); interval = null;
      $('learn-breath-orbit').classList.remove('is-running', 'is-paused');
      $('learn-breath-toggle').textContent = 'Otra pausa';
      $('learn-breath-cue').textContent = 'Tu minuto de pausa está completo.';
      $('learn-breath-status').textContent = 'Pausa terminada. Puedes seguir respirando a tu ritmo.';
      return;
    }
    $('learn-breath-cue').textContent = interval !== null ? (60000 - remaining) % 10000 < 4000 ? 'Inspira con suavidad, a tu ritmo.' : 'Suelta el aire sin forzar.' : remaining === 60000 ? 'Respira sin forzar.' : 'En pausa. Tú marcas el ritmo.';
  }
  function pauseBreathing() {
    if (interval === null) return;
    remaining = Math.max(0, deadline - performance.now()); clearInterval(interval); interval = null;
    $('learn-breath-orbit').classList.add('is-paused'); $('learn-breath-toggle').textContent = 'Continuar'; updateBreathing();
  }
  $('learn-breathe-open').onclick = () => {
    const open = $('learn-breathing').hidden;
    $('learn-breathing').hidden = !open; $('learn-breathe-open').setAttribute('aria-expanded', String(open));
    if (!open) pauseBreathing(); else focus('learn-breath-toggle');
  };
  $('learn-breath-toggle').onclick = () => {
    if (interval !== null) {pauseBreathing(); return;}
    if (remaining === 0) remaining = 60000;
    deadline = performance.now() + remaining;
    interval = setInterval(updateBreathing, 200);
    $('learn-breath-orbit').classList.add('is-running'); $('learn-breath-orbit').classList.remove('is-paused');
    $('learn-breath-toggle').textContent = 'Pausar'; $('learn-breath-status').textContent = 'Pausa iniciada. Respira con comodidad; no tienes que seguir la animación.';
    updateBreathing();
  };
  $('learn-breath-reset').onclick = () => {
    pauseBreathing(); remaining = 60000;
    $('learn-breath-orbit').classList.remove('is-running', 'is-paused'); $('learn-breath-toggle').textContent = 'Empezar'; updateBreathing();
    $('learn-breath-status').textContent = 'Pausa reiniciada.';
  };
  window.addEventListener('hashchange', () => {if (location.hash !== '#aprende') {pauseBreathing(); if (activeId) showDashboard();}});
  document.addEventListener('visibilitychange', () => {if (document.hidden) pauseBreathing();});
  window.addEventListener('pagehide', pauseBreathing);
  window.addEventListener('storage', event => {
    if (event.key !== M.KEY) return;
    try {state = event.newValue ? M.normalize(JSON.parse(event.newValue)) : M.blank();} catch {return;}
    showDashboard(); announce('El progreso se ha actualizado desde otra pestaña.');
  });
  dashboard();
})();
