/* Contenido y estado de aprendizaje. Sin dependencias ni servicios externos. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LoakLearning = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const lessons = [
    {
      id: 'reloj', title: 'Conoce tu reloj interno', unit: 'Entiende tu descanso', icon: 'sun', minutes: 3,
      intro: 'Tu cuerpo tiene un reloj que coordina el sueño y la vigilia. La luz del día y los horarios regulares le dan pistas para ponerse en hora.',
      takeaway: 'Un poco de luz natural al empezar el día es una señal para tu reloj interno.',
      plans: ['Salir a recibir luz natural por la mañana.', 'Elegir una hora de levantarse bastante regular.', 'Abrir las persianas al comenzar el día.'],
      questions: [
        {id: 'luz', type: 'choice', prompt: '¿Qué señal ayuda a poner en hora tu reloj interno?', options: ['La luz natural durante el día', 'La luz del móvil en la cama', 'Pasar el día en penumbra'], answer: 0, why: 'La luz diurna ayuda a sincronizar el ritmo de sueño y vigilia. No hace falta mirar al sol: basta con recibir luz natural de forma segura.'},
        {id: 'regularidad', type: 'choice', label: 'Verdadero o falso', prompt: 'Levantarse a una hora bastante regular puede ayudar a cuidar el sueño.', options: ['Verdadero', 'Falso'], answer: 0, why: 'La regularidad aporta una referencia a tu reloj interno. Busca un horario realista que encaje con tu vida.'},
        {id: 'dia', type: 'order', prompt: 'De la mañana a la noche: ordena estas señales para tu cuerpo.', hint: 'Usa las flechas para colocar primero lo que harías al empezar el día.', items: ['Bajar la luz al acercarse la noche', 'Recibir luz natural por la mañana', 'Hacer una pausa activa a mediodía'], answer: [1, 2, 0], why: 'La luz por la mañana, el movimiento durante el día y una transición con menos luz por la noche acompañan el ritmo diario.'},
        {id: 'malanoche', type: 'choice', label: 'Una situación cotidiana', prompt: 'Has dormido mal. ¿Qué puede ayudarte a mantener tu ritmo al día siguiente?', options: ['Cambiar por completo todos tus horarios', 'Mantener una hora de levantarte bastante regular', 'Tomar bebidas estimulantes hasta la noche'], answer: 1, why: 'Mantener una referencia horaria ayuda a conservar el ritmo. Ajusta tus actividades si tienes somnolencia y evita conducir si tienes sueño.'}
      ]
    },
    {
      id: 'refugio', title: 'Crea tu refugio de noche', unit: 'Entiende tu descanso', icon: 'moon', minutes: 3,
      intro: 'No necesitas un dormitorio perfecto. Reducir la luz, el ruido o una temperatura incómoda puede hacer de tu habitación un lugar más propicio para descansar.',
      takeaway: 'Empieza por una sola cosa que puedas cambiar en tu dormitorio.',
      plans: ['Reducir una fuente de luz del dormitorio.', 'Buscar una forma de atenuar un ruido molesto.', 'Dejar el trabajo fuera de la cama.'],
      questions: [
        {id: 'ambiente', type: 'multi', prompt: 'Elige las dos condiciones que suelen favorecer el descanso.', hint: 'Selecciona dos respuestas.', options: ['Oscuridad o poca luz', 'Televisión encendida toda la noche', 'Un ambiente tranquilo', 'Una habitación muy calurosa'], answer: [0, 2], why: 'Un ambiente oscuro y tranquilo facilita el descanso. La temperatura también importa: busca que te resulte cómoda.'},
        {id: 'cama', type: 'choice', prompt: '¿Qué asociación conviene reforzar con la cama?', options: ['Cama y trabajo', 'Cama y descanso', 'Cama y tareas pendientes'], answer: 1, why: 'Reservar la cama para dormir y la intimidad puede ayudar a asociarla con el descanso.'},
        {id: 'pantalla', type: 'choice', label: 'Verdadero o falso', prompt: 'Solo importa el brillo de las pantallas; el contenido y el tiempo de uso no influyen.', options: ['Verdadero', 'Falso'], answer: 1, why: 'Además de la luz, el contenido puede activarte y el tiempo de uso puede retrasar el momento de acostarte.'},
        {id: 'cambio', type: 'choice', label: 'Una situación cotidiana', prompt: 'Entra luz de una farola por tu ventana. ¿Cuál es un primer paso razonable?', options: ['Probar a reducir esa luz con una cortina o un antifaz cómodo', 'Renovar toda la habitación antes de intentarlo', 'Dejar todas las luces encendidas'], answer: 0, why: 'Un cambio pequeño que resuelva una molestia concreta puede ser suficiente para empezar. No necesitas comprar todo un dormitorio nuevo.'}
      ]
    },
    {
      id: 'habitos', title: 'Haz que tu día te ayude', unit: 'Cuida tus hábitos', icon: 'leaf', minutes: 4,
      intro: 'Tu noche empieza durante el día. El movimiento, la cafeína y el alcohol pueden influir en cómo descansas después.',
      takeaway: 'Observa cómo te afectan tus hábitos, sin exigirte cambiarlos todos a la vez.',
      plans: ['Adelantar mi última bebida con cafeína.', 'Reservar un momento para moverme durante el día.', 'Evitar usar el alcohol como ayuda para dormir.'],
      questions: [
        {id: 'cafe', type: 'choice', prompt: '¿Puede un café de la tarde influir en el sueño de esa noche?', options: ['No, su efecto dura solo unos minutos', 'Sí, la cafeína puede actuar durante varias horas', 'Solo si el café está muy caliente'], answer: 1, why: 'La cafeína puede seguir activa varias horas. La sensibilidad varía: si notas que te afecta, prueba a evitarla en la tarde o la noche.'},
        {id: 'alcohol', type: 'choice', label: 'Verdadero o falso', prompt: 'Aunque dé somnolencia, el alcohol puede fragmentar el sueño.', options: ['Verdadero', 'Falso'], answer: 0, why: 'El alcohol no es una buena ayuda para dormir. Puede empeorar la calidad del sueño y los problemas respiratorios nocturnos.'},
        {id: 'acciones', type: 'multi', prompt: '¿Qué dos hábitos pueden acompañar un buen descanso?', hint: 'Selecciona dos respuestas.', options: ['Moverse de forma regular durante el día', 'Tomar estimulantes al acercarse la noche', 'Observar cómo te afecta la cafeína', 'Usar alcohol para conciliar el sueño'], answer: [0, 2], why: 'La actividad regular puede favorecer el descanso. Observar tus respuestas a la cafeína te permite adaptar su consumo a tu sensibilidad.'},
        {id: 'ejercicio', type: 'choice', label: 'Una situación cotidiana', prompt: 'El ejercicio intenso a última hora te deja muy activado. ¿Qué puedes probar?', options: ['Dejar de moverte para siempre', 'Acostarte inmediatamente aunque no tengas sueño', 'Cambiar la intensidad o hacerlo antes'], answer: 2, why: 'La actividad física suele ayudar. Si un horario o intensidad te activa demasiado, puedes ajustarlos en lugar de abandonar el movimiento.'}
      ]
    },
    {
      id: 'calma', title: 'Baja una marcha', unit: 'Cuida tus hábitos', icon: 'wind', minutes: 3,
      intro: 'Dormir no es una tarea que se pueda forzar. Una transición tranquila y menos presión por conciliar el sueño pueden ayudarte a bajar el ritmo.',
      takeaway: 'La calma es una invitación, no otra tarea que tengas que hacer perfectamente.',
      plans: ['Reservar unos minutos para una actividad tranquila.', 'Anotar mis pendientes antes de acostarme.', 'Probar una pausa de respiración cómoda, sin forzarla.'],
      questions: [
        {id: 'objetivo', type: 'choice', prompt: '¿Cuál es el propósito de una práctica de relajación?', options: ['Dormirse obligatoriamente en dos minutos', 'Reducir la activación sin exigirse dormir', 'Aguantar la respiración todo lo posible'], answer: 1, why: 'La relajación busca reducir la activación. No garantiza que te duermas de inmediato y no es una prueba que tengas que superar.'},
        {id: 'rutina', type: 'order', prompt: 'Ordena esta propuesta de transición, desde cerrar el día hasta acostarte.', hint: 'Es un ejemplo flexible, no una receta obligatoria.', items: ['Ir a la cama cuando aparezca el sueño', 'Cerrar las tareas del día', 'Hacer una actividad tranquila con poca luz'], answer: [1, 2, 0], why: 'Cerrar pendientes, bajar el ritmo e ir a la cama cuando tienes sueño es una posible transición. Adáptala a lo que te resulte agradable.'},
        {id: 'reloj', type: 'choice', label: 'Verdadero o falso', prompt: 'Comprobar el reloj una y otra vez siempre ayuda a conciliar el sueño.', options: ['Verdadero', 'Falso'], answer: 1, why: 'Mirar el reloj repetidamente puede aumentar la preocupación por no dormir. Apartarlo de la vista puede quitar presión.'},
        {id: 'despierto', type: 'choice', label: 'Una situación cotidiana', prompt: 'Llevas un rato despierto en la cama y te estás frustrando. ¿Qué puedes probar?', options: ['Forzarte a dormir con más empeño', 'Mirar la hora cada minuto', 'Levantarte un rato, hacer algo tranquilo y volver cuando tengas sueño'], answer: 2, why: 'Una actividad tranquila con poca luz, fuera de la cama si puedes hacerlo con seguridad, puede ayudar a romper el ciclo de frustración. No hace falta cronometrar.'}
      ]
    },
    {
      id: 'mitos', title: 'Menos mitos, menos presión', unit: 'Encuentra tu ritmo', icon: 'spark', minutes: 3,
      intro: 'Una noche difícil no define tu descanso. Entender qué es normal y cuándo pedir ayuda permite cuidar el sueño con menos presión.',
      takeaway: 'Mira el conjunto: cómo duermes a lo largo del tiempo y cómo te encuentras durante el día.',
      plans: ['Valorar mi descanso a lo largo de varios días.', 'Evitar compararme con el sueño de otras personas.', 'Pedir ayuda si el problema persiste y afecta a mi día.'],
      questions: [
        {id: 'ocho', type: 'choice', label: 'Verdadero o falso', prompt: 'Todas las personas adultas necesitan exactamente ocho horas de sueño.', options: ['Verdadero', 'Falso'], answer: 1, why: 'Las necesidades varían. Muchos adultos necesitan entre siete y nueve horas; también importa cómo te encuentras durante el día.'},
        {id: 'noche', type: 'choice', prompt: '¿Qué significa tener una mala noche aislada?', options: ['Que todo tu progreso se ha perdido', 'Que nunca volverás a descansar bien', 'Que el sueño puede variar de una noche a otra'], answer: 2, why: 'El sueño no es idéntico cada noche. Una noche difícil no borra los hábitos que has ido construyendo.'},
        {id: 'ayuda', type: 'multi', prompt: '¿En qué dos situaciones conviene pedir una valoración profesional?', hint: 'Selecciona dos respuestas.', options: ['Las dificultades persisten y afectan a tu vida diaria', 'Has tenido una sola noche diferente', 'Hay pausas respiratorias observadas o somnolencia intensa', 'Tu horario no es idéntico al de otra persona'], answer: [0, 2], why: 'Los problemas persistentes, las pausas respiratorias y la somnolencia intensa merecen una valoración. No hace falta esperar a completar este recorrido.'},
        {id: 'medicacion', type: 'choice', prompt: 'Si tomas medicación y sigues durmiendo mal, ¿qué es lo adecuado?', options: ['Cambiar la dosis por tu cuenta', 'Comentarlo con el profesional que te atiende', 'Combinar productos sin consultar'], answer: 1, why: 'Un profesional puede revisar las causas y las opciones de tratamiento. No cambies ni combines medicación sin indicación sanitaria.'}
      ]
    },
    {
      id: 'ritual', title: 'Diseña tu pequeño ritual', unit: 'Encuentra tu ritmo', icon: 'flag', minutes: 4,
      intro: 'Ya tienes muchas ideas. Ahora toca elegir una acción pequeña, darle un lugar en tu día y dejar margen para aprender de la experiencia.',
      takeaway: 'La constancia se construye con pasos que caben en tu vida, no con noches perfectas.',
      plans: ['Bajar la luz después de cenar como señal de cierre.', 'Dejar el móvil fuera de la cama al prepararme para dormir.', 'Revisar dentro de unos días cómo me funciona un hábito.'],
      questions: [
        {id: 'pequeno', type: 'choice', prompt: '¿Cuál es un buen punto de partida para una rutina?', options: ['Elegir un cambio pequeño que puedas repetir', 'Cambiar diez hábitos esta misma noche', 'Exigirte una noche perfecta desde el primer día'], answer: 0, why: 'Un paso pequeño y realista suele ser más fácil de mantener y ajustar.'},
        {id: 'plan', type: 'order', prompt: 'Construye un plan de hábito, desde elegirlo hasta revisarlo.', hint: 'Coloca los pasos en un orden que permita probar y aprender.', items: ['Revisar qué ha funcionado y ajustar', 'Elegir una acción pequeña', 'Probarla durante varios días', 'Asociarla a un momento cotidiano'], answer: [1, 3, 2, 0], why: 'Primero elige la acción y una señal para recordarla. Después pruébala y revisa la experiencia, sin convertirla en una exigencia.'},
        {id: 'progreso', type: 'multi', prompt: 'Elige dos maneras de observar tus avances con menos presión.', hint: 'Selecciona dos respuestas.', options: ['Compararte continuamente con otras personas', 'Observar cómo te encuentras durante el día', 'Valorar tendencias a lo largo de varios días', 'Juzgar todo por una única noche'], answer: [1, 2], why: 'Las tendencias y tu bienestar durante el día aportan más contexto que una noche aislada o una comparación.'},
        {id: 'retomar', type: 'choice', label: 'Una situación cotidiana', prompt: 'Un día no has seguido tu rutina. ¿Y ahora?', options: ['Empezar desde cero y castigarte', 'Abandonarla por completo', 'Retomar el siguiente paso posible y ajustar si hace falta'], answer: 2, why: 'Un día distinto forma parte de la vida. Puedes retomar y adaptar el hábito sin borrar lo aprendido.'}
      ]
    }
  ];
  const KEY = 'loak-sleep-learning-v2';
  const blank = () => ({version: 2, completed: [], days: [], plans: {}, sessions: {}});
  const dayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const validDay = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T12:00:00`);
    return !Number.isNaN(date.getTime()) && dayKey(date) === value;
  };
  const equalAnswer = (question, answer) => {
    if (question.type === 'choice') return Number.isInteger(answer) && answer === question.answer;
    if (!Array.isArray(answer) || answer.some(n => !Number.isInteger(n))) return false;
    const actual = question.type === 'multi' ? [...answer].sort((a, b) => a - b) : answer;
    const expected = question.type === 'multi' ? [...question.answer].sort((a, b) => a - b) : question.answer;
    return actual.length === expected.length && actual.every((v, i) => v === expected[i]);
  };
  function normalize(input) {
    const state = blank();
    if (!input || input.version !== 2) return state;
    // Preserve a contiguous path: malformed storage cannot accidentally lock its first lesson.
    for (const lesson of lessons) {
      if (!Array.isArray(input.completed) || !input.completed.includes(lesson.id)) break;
      state.completed.push(lesson.id);
    }
    if (Array.isArray(input.days)) state.days = [...new Set(input.days.filter(validDay))].sort();
    for (const lesson of lessons) {
      const plan = input.plans?.[lesson.id];
      if (Number.isInteger(plan) && plan >= 0 && plan < lesson.plans.length && state.completed.includes(lesson.id)) state.plans[lesson.id] = plan;
      const session = input.sessions?.[lesson.id];
      if (!session || !unlocked(state, lesson.id)) continue;
      const ids = lesson.questions.map(q => q.id);
      if (!Array.isArray(session.queue) || session.queue.length > 100 || !session.queue.every(id => ids.includes(id))) continue;
      const phase = ['intro', 'question', 'practice'].includes(session.phase) ? session.phase : 'intro';
      if (phase !== 'practice' && !session.queue.length || phase === 'practice' && session.queue.length) continue;
      const clean = {phase, queue: [...session.queue], feedback: null, mistakes: Math.max(0, Math.min(999, Number.isInteger(session.mistakes) ? session.mistakes : 0))};
      const q = lesson.questions.find(item => item.id === clean.queue[0]);
      if (q && session.feedback && typeof session.feedback.correct === 'boolean') {
        const answer = session.feedback.answer;
        const candidates = q.type === 'order' ? q.items : q.options;
        const valid = q.type === 'choice' ? Number.isInteger(answer) && answer >= 0 && answer < candidates.length : Array.isArray(answer) && answer.length <= candidates.length && new Set(answer).size === answer.length && answer.every(n => Number.isInteger(n) && n >= 0 && n < candidates.length) && (q.type !== 'order' || answer.length === candidates.length);
        if (valid && equalAnswer(q, answer) === session.feedback.correct) clean.feedback = {correct: session.feedback.correct, answer};
      }
      // Feedback and its retry must travel together; otherwise discard only this session.
      if (clean.feedback && !clean.feedback.correct && !clean.queue.slice(1).includes(clean.queue[0])) continue;
      state.sessions[lesson.id] = clean;
    }
    return state;
  }
  function unlocked(state, id) {
    const index = lessons.findIndex(l => l.id === id);
    return index >= 0 && (index === 0 || state.completed.includes(lessons[index - 1].id));
  }
  function start(state, id) {
    if (!unlocked(state, id)) return null;
    if (!state.sessions[id]) {
      const lesson = lessons.find(l => l.id === id);
      state.sessions[id] = {phase: 'intro', queue: lesson.questions.map(q => q.id), feedback: null, mistakes: 0};
    }
    return state.sessions[id];
  }
  function submit(state, id, answer) {
    const lesson = lessons.find(l => l.id === id), session = state.sessions[id];
    if (!session || session.phase !== 'question' || session.feedback) return null;
    const question = lesson.questions.find(q => q.id === session.queue[0]);
    if (!question) return null;
    const options = question.type === 'order' ? question.items : question.options;
    const valid = question.type === 'choice' ? Number.isInteger(answer) && answer >= 0 && answer < options.length : Array.isArray(answer) && answer.length === question.answer.length && new Set(answer).size === answer.length && answer.every(n => Number.isInteger(n) && n >= 0 && n < options.length);
    if (!valid) return null;
    const correct = equalAnswer(question, answer);
    session.feedback = {correct, answer: Array.isArray(answer) ? [...answer] : answer};
    if (!correct) {session.mistakes++; session.queue.push(question.id);}
    return session.feedback;
  }
  function advance(state, id) {
    const session = state.sessions[id];
    if (!session) return false;
    if (session.phase === 'intro') {session.phase = 'question'; return true;}
    if (session.phase !== 'question' || !session.feedback) return false;
    session.queue.shift(); session.feedback = null;
    if (!session.queue.length) session.phase = 'practice';
    return true;
  }
  function complete(state, id, planIndex, date = new Date()) {
    const lesson = lessons.find(l => l.id === id), session = state.sessions[id];
    if (!lesson || !session || session.phase !== 'practice' || !Number.isInteger(planIndex) || planIndex < 0 || planIndex >= lesson.plans.length) return null;
    const fresh = !state.completed.includes(id);
    if (fresh) state.completed.push(id);
    state.plans[id] = planIndex;
    const today = dayKey(date);
    if (!state.days.includes(today)) state.days.push(today);
    delete state.sessions[id];
    return {fresh, xp: fresh ? 50 : 0, plan: lesson.plans[planIndex]};
  }
  function streak(state, date = new Date()) {
    const cursor = new Date(date); cursor.setHours(12, 0, 0, 0);
    if (!state.days.includes(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    let count = 0;
    while (state.days.includes(dayKey(cursor))) {count++; cursor.setDate(cursor.getDate() - 1);}
    return count;
  }
  function nextLesson(state) {
    const pending = lessons.find(l => state.sessions[l.id] && !state.completed.includes(l.id)) || lessons.find(l => state.sessions[l.id]);
    return pending || lessons.find(l => !state.completed.includes(l.id)) || lessons[0];
  }
  return {lessons, KEY, blank, normalize, dayKey, validDay, equalAnswer, unlocked, start, submit, advance, complete, streak, nextLesson};
});
