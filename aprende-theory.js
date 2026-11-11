/* Teoría original en lenguaje sencillo, con referencias para ampliar cada concepto. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LoakTheory = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const sources = {
    clock: {title: 'NIH · El ciclo de sueño y vigilia', url: 'https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle'},
    stages: {title: 'NIH · Fases y etapas del sueño', url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep'},
    duration: {title: 'NIH · Cuánto sueño necesitamos', url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep'},
    habits: {title: 'NIH · Hábitos para cuidar el sueño', url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits'},
    treatment: {title: 'NIH · Tratamiento del insomnio', url: 'https://www.nhlbi.nih.gov/health/insomnia/treatment'},
    cdc: {title: 'CDC · Sueño y salud', url: 'https://www.cdc.gov/sleep/about/index.html'},
    nhs: {title: 'NHS · Comprender el insomnio', url: 'https://www.nhs.uk/conditions/insomnia/'}
  };
  const chapters = {
    reloj: [
      {id: 'dos-fuerzas', title: 'Dos fuerzas preparan tu sueño', tag: 'EL PORQUÉ',
        paragraphs: ['Dormir depende, entre otras cosas, de dos procesos. La presión de sueño aumenta al pasar tiempo despierto y disminuye al dormir. El ritmo circadiano organiza la alternancia de sueño y vigilia a lo largo de unas 24 horas.', 'Por eso estar agotado no siempre significa tener sueño en ese momento. No se trata solo de acumular cansancio: también importa en qué momento de tu ritmo estás.'],
        concepts: [{label: 'Presión de sueño', text: 'Se relaciona con el tiempo que llevas despierto.'}, {label: 'Reloj interno', text: 'Ayuda a organizar cuándo estás más alerta o somnoliento.'}],
        example: 'Puedes estar cansado después de un día intenso y seguir muy despierto al acostarte. Cansancio y somnolencia no son exactamente lo mismo.',
        remember: 'Tiempo despierto y momento del día trabajan juntos.', sources: ['clock']},
      {id: 'luz-senal', title: 'La luz le dice al cuerpo qué hora es', tag: 'UNA SEÑAL COTIDIANA',
        paragraphs: ['La luz que reciben los ojos es una señal importante para el reloj interno. La alternancia entre claridad y oscuridad también influye en la producción de melatonina, una hormona vinculada a la noche biológica.', 'Recibir luz natural durante el día y reducir la luz intensa al acercarse la noche puede acompañar ese ritmo. No es necesario mirar al sol. La melatonina del cuerpo tampoco implica que tomar un suplemento sea adecuado para cualquier persona.'],
        concepts: [{label: 'Durante el día', text: 'Luz natural y actividad compatibles con tu situación.'}, {label: 'Al cerrar el día', text: 'Menos luz intensa y una transición más tranquila.'}],
        example: 'En lugar de empezar la mañana en penumbra, puedes abrir las persianas o salir un momento a un espacio exterior seguro.',
        remember: 'La luz es una referencia para tu reloj, no un interruptor inmediato del sueño.', sources: ['clock', 'habits']},
      {id: 'horario-realista', title: 'Regularidad con margen para la vida', tag: 'LLEVARLO A TU DÍA',
        paragraphs: ['Un horario bastante regular ayuda a dar referencias al cuerpo. La hora de levantarse puede ser un punto de apoyo, incluso después de una noche diferente. Regularidad no significa acostarte a la fuerza sin tener sueño.', 'Las preferencias horarias varían entre personas. Los turnos de trabajo, los cuidados o los viajes también cambian lo que es posible. Si trabajas de noche o necesitas adaptar tu ritmo por un problema de salud, busca orientación individual.'],
        example: 'Elige una hora de levantarte que puedas mantener la mayoría de los días, en vez de perseguir el horario ideal de otra persona.',
        remember: 'Busca una referencia sostenible, no un horario perfecto.', sources: ['habits', 'clock']}
    ],
    refugio: [
      {id: 'entorno', title: 'Tu habitación también da señales', tag: 'EL PORQUÉ',
        paragraphs: ['La luz, el ruido y una temperatura incómoda pueden dificultar el descanso. Preparar el entorno consiste en reducir molestias, no en conseguir una habitación de revista.', 'Lo habitual es buscar oscuridad o poca luz, tranquilidad y una temperatura que te resulte agradable. Si necesitas una luz para moverte con seguridad, esa necesidad va primero. No hay una única temperatura ideal para todo el mundo.'],
        concepts: [{label: 'Luz', text: 'Atenúa lo que te molesta, manteniendo la seguridad.'}, {label: 'Ruido y temperatura', text: 'Busca comodidad con lo que tengas a tu alcance.'}],
        example: 'Si una farola entra por la ventana, prueba primero a reducir esa luz. No hace falta cambiar todos los muebles.',
        remember: 'Resuelve una molestia concreta antes de añadir cosas nuevas.', sources: ['habits', 'nhs']},
      {id: 'asociacion-cama', title: 'La cama puede convertirse en una señal de descanso', tag: 'CÓMO SE APRENDE',
        paragraphs: ['Las rutinas repetidas crean asociaciones. Pasar muchas horas trabajando, discutiendo o preocupándote en la cama puede mezclarla con la activación. Reservarla para dormir y la intimidad ayuda a reforzar otra asociación.', 'Esto forma parte del control de estímulos, una estrategia utilizada en el tratamiento del insomnio. Aquí lo presentamos como una idea educativa, no como un tratamiento completo que debas aplicar por tu cuenta.'],
        example: 'Si sueles contestar correos desde la cama, prueba a cerrar esa tarea en otro lugar antes de entrar en el dormitorio.',
        remember: 'Cambia la señal poco a poco: la cama como lugar de descanso.', sources: ['treatment']},
      {id: 'pantallas', title: 'Las pantallas influyen de más de una manera', tag: 'MÁS ALLÁ DEL BRILLO',
        paragraphs: ['Una pantalla puede aportar luz, mantenerte pendiente de mensajes o quitar tiempo al descanso. El efecto no depende únicamente de un ajuste de color o del brillo.', 'Observa qué sucede contigo: ¿retrasas la hora de acostarte?, ¿te activa lo que ves? Una actividad menos estimulante puede facilitar la transición. La mejor alternativa es una que puedas repetir y que te resulte agradable.'],
        example: 'Puedes dejar el móvil fuera de la cama y cambiar los últimos mensajes de trabajo por unas páginas de lectura tranquila.',
        remember: 'Importan la luz, el contenido y el tiempo que desplaza.', sources: ['clock', 'cdc']}
    ],
    habitos: [
      {id: 'cafeina', title: 'La cafeína no elimina la necesidad de dormir', tag: 'EL PORQUÉ',
        paragraphs: ['La adenosina está relacionada con la necesidad de dormir que se acumula durante la vigilia. La cafeína interfiere con esa señal y puede hacer que te sientas más alerta sin haber descansado.', 'Sus efectos pueden durar varias horas y la sensibilidad cambia entre personas. Además del café, puede haber cafeína en té, bebidas energéticas y otros productos. No existe una hora límite que funcione igual para todos.'],
        example: 'Si un café de tarde coincide con noches en las que te cuesta dormir, prueba a adelantarlo y observa la tendencia durante varios días.',
        remember: 'Sentirte más despierto no equivale a haber recuperado sueño.', sources: ['clock', 'habits']},
      {id: 'movimiento-siesta', title: 'Movimiento y pausas, con contexto', tag: 'LO QUE PASA DURANTE EL DÍA',
        paragraphs: ['La actividad física regular puede acompañar un buen descanso. Si el ejercicio intenso al final del día te activa demasiado, puedes probar otro horario o bajar la intensidad.', 'Las siestas pueden mejorar la alerta, pero en algunas personas también dificultan conciliar el sueño por la noche. Si notas esa relación, observa si una siesta más temprana o más corta encaja mejor contigo. No uses la somnolencia como una prueba de fuerza.'],
        example: 'Dar un paseo durante el día puede ser un primer paso más sostenible que exigirte un entrenamiento intenso antes de acostarte.',
        remember: 'Adapta el hábito a tu respuesta, en lugar de seguir una regla rígida.', sources: ['habits']},
      {id: 'alcohol', title: 'Dar sueño y descansar bien no son lo mismo', tag: 'UN MITO FRECUENTE',
        paragraphs: ['El alcohol puede producir somnolencia al principio, pero también favorecer un sueño más ligero y despertares posteriores. Por eso no es una buena herramienta para dormir.', 'Una noche que empieza con facilidad no siempre es una noche reparadora. Observa también cómo te encuentras durante el día. Si tienes dudas sobre medicamentos o productos para dormir, consúltalas con un profesional en lugar de combinarlos por tu cuenta.'],
        concepts: [{label: 'Somnolencia inicial', text: 'Puede aparecer sin que mejore la calidad del descanso.'}, {label: 'Continuidad de la noche', text: 'También importa para entender cómo has dormido.'}],
        example: 'Cambiar la bebida de la noche por una opción sin alcohol evita utilizarlo como una supuesta ayuda para conciliar el sueño.',
        remember: 'No confundas sedación con descanso reparador.', sources: ['treatment', 'cdc']}
    ],
    calma: [
      {id: 'activacion', title: 'El sueño no se puede obligar', tag: 'EL PORQUÉ',
        paragraphs: ['La preocupación por dormir puede aumentar la activación y hacer que sigas más pendiente de si te estás durmiendo. Comprobar la hora constantemente puede añadir presión a ese círculo.', 'Una transición tranquila busca reducir la activación, no garantizar que te duermas al instante. La respiración cómoda, una lectura agradable o una actividad calmada son posibilidades, no exámenes que tengas que aprobar.'],
        concepts: [{label: 'Más exigencia', text: '«Tengo que dormirme ya» puede añadir preocupación.'}, {label: 'Otra dirección', text: 'Dar espacio al descanso y quitar presión al resultado.'}],
        example: 'En vez de contar los minutos que faltan para levantarte, puedes apartar el reloj de la vista y elegir una actividad tranquila.',
        remember: 'La relajación ayuda a bajar el ritmo; no promete un sueño inmediato.', sources: ['treatment', 'nhs']},
      {id: 'transicion', title: 'Cerrar el día antes de ir a la cama', tag: 'UN PUENTE HACIA LA NOCHE',
        paragraphs: ['Pasar directamente de resolver tareas a intentar dormir puede dejar poco espacio para cambiar de ritmo. Una secuencia corta y previsible puede crear ese puente.', 'No necesitas una rutina larga: cerrar una tarea, reducir la luz y hacer algo tranquilo puede ser suficiente para empezar. Si anotar pendientes te ayuda, hazlo antes de acostarte, sin convertir la cama en un despacho.'],
        example: 'Después de cenar, dejas anotada una tarea de mañana, bajas la luz y lees un rato. Te acuestas cuando aparece el sueño.',
        remember: 'Elige una transición amable y flexible.', sources: ['habits', 'treatment']},
      {id: 'despierto-cama', title: 'Si sigues despierto y te frustras', tag: 'UNA SITUACIÓN COTIDIANA',
        paragraphs: ['Permanecer en la cama luchando contra el sueño puede aumentar la frustración. Si llevas un rato despierto, puedes levantarte y hacer algo tranquilo con poca luz hasta volver a tener sueño, siempre que puedas hacerlo con seguridad.', 'No necesitas cronometrarlo ni hacerlo a la fuerza si tu situación física no lo permite. Si el problema es persistente, la terapia cognitivo-conductual para el insomnio, o TCC-I, es un tratamiento que puede valorar un profesional. Una guía de hábitos no equivale a esa terapia.'],
        example: 'Puedes sentarte en otro lugar a leer algo tranquilo y volver a la cama cuando notes sueño, sin revisar la hora constantemente.',
        remember: 'Busca reducir la lucha con el sueño y pide ayuda si la dificultad se mantiene.', sources: ['treatment']}
    ],
    mitos: [
      {id: 'fases', title: 'Tu noche no es un bloque uniforme', tag: 'CÓMO FUNCIONA',
        paragraphs: ['A lo largo de la noche alternas sueño no REM y sueño REM. El no REM incluye etapas de sueño ligero y profundo. Durante REM el cerebro está activo y aparecen muchos de los sueños que recordamos.', 'Estas fases se repiten en ciclos y su distribución cambia durante la noche. Suele haber más sueño profundo al principio y más REM hacia el final. No necesitas controlar cada fase ni intentar obtener una noche idéntica a la anterior.'],
        concepts: [{label: 'No REM', text: 'Incluye la transición al sueño y el sueño profundo.'}, {label: 'REM', text: 'Se asocia a actividad cerebral y movimientos oculares rápidos.'}],
        example: 'Recordar un sueño al despertarte no significa que toda tu noche haya sido ligera. Has pasado por distintas fases.',
        remember: 'Hay varias fases: ninguna cifra aislada resume toda tu noche.', sources: ['stages']},
      {id: 'horas-calidad', title: 'Horas, calidad y cómo te encuentras', tag: 'MÁS ALLÁ DE LAS OCHO HORAS',
        paragraphs: ['Las necesidades de sueño varían con la edad y entre personas. Para muchos adultos la referencia está en torno a siete a nueve horas, pero no es una competición por alcanzar un número exacto.', 'Tener tiempo suficiente para dormir importa, y también la continuidad del sueño y cómo te encuentras durante el día. Una noche distinta no permite sacar conclusiones sobre todo tu descanso: busca el contexto de varios días.'],
        example: 'En lugar de juzgar una única noche, observa si dispones de tiempo para dormir y si la somnolencia está afectando a tu vida cotidiana.',
        remember: 'Valora el conjunto, no solo una cifra o una noche.', sources: ['duration', 'cdc']},
      {id: 'pedir-ayuda', title: 'Saber cuándo pedir ayuda también es aprender', tag: 'CUIDARTE CON CRITERIO',
        paragraphs: ['Los hábitos pueden ayudar, pero no explican ni resuelven todas las dificultades para dormir. Si el problema persiste y afecta a tu vida diaria, merece una valoración.', 'Las pausas respiratorias observadas, los despertares con ahogo o una somnolencia intensa son motivos para consultar. No tienes que terminar este curso antes de hacerlo. Tampoco cambies medicación o suplementos sin comentarlo con quien te atiende.'],
        example: 'Si alguien observa que dejas de respirar mientras duermes, no lo resuelvas solo cambiando la almohada: coméntalo con un profesional.',
        remember: 'Pedir ayuda no significa haber fallado en tus hábitos.', sources: ['nhs', 'cdc']}
    ],
    ritual: [
      {id: 'accion-pequena', title: 'Una acción pequeña tiene dónde empezar', tag: 'DE LA TEORÍA A TU VIDA',
        paragraphs: ['Una recomendación general necesita convertirse en algo concreto para probarla en tu día. «Cuidar el descanso» es una intención; «dejar el móvil fuera de la cama» es una acción que puedes reconocer.', 'Este es un método práctico para aplicar lo aprendido, no una fórmula que garantice dormir mejor. Elige algo que dependa de ti y que quepa en tu situación actual.'],
        example: 'Si quieres reducir la luz intensa de noche, puedes empezar por encender una lámpara más tenue al terminar de cenar.',
        remember: 'Elige qué vas a hacer, sin exigirte controlar cuándo te dormirás.', sources: ['habits']},
      {id: 'senal-habito', title: 'Dale una señal a tu pequeño paso', tag: 'UN EJEMPLO DE PLAN',
        paragraphs: ['Para recordar tu acción, puedes vincularla a un momento que ya exista en tu día. Es una manera sencilla de organizar la práctica: cuando ocurra esa señal, probarás el paso elegido.', 'No todas las rutinas funcionan para todas las personas. Si tu horario cambia, puedes elegir una señal relacionada con una actividad, en vez de una hora rígida. La rutina acompaña el descanso; no debe convertirse en otra fuente de presión.'],
        concepts: [{label: 'Mi señal', text: 'Un momento reconocible, como terminar de cenar.'}, {label: 'Mi acción', text: 'Un paso posible, como bajar la luz de la habitación.'}],
        example: '«Cuando termine de preparar las cosas de mañana, dejaré el móvil cargando fuera de la cama». Es un ejemplo para adaptar, no una obligación.',
        remember: 'Una señal cotidiana puede ayudarte a recordar tu intención.', sources: ['habits', 'cdc']},
      {id: 'revisar-sin-juzgar', title: 'Probar, observar y ajustar', tag: 'SEGUIR APRENDIENDO',
        paragraphs: ['Prueba un cambio durante varios días y observa si encaja en tu vida. Si no resulta práctico, puedes hacerlo más pequeño o elegir otro. Una noche difícil no demuestra por sí sola que el hábito haya fracasado.', 'Valora también cómo te encuentras durante el día. Si necesitas llevar un registro por un problema persistente, un profesional puede orientarte sobre qué anotar. La racha de LOAK mide práctica educativa: no es una valoración de tu salud ni de tu sueño.'],
        example: 'Si leer media hora te resulta imposible, quizá unos minutos tranquilos sean un primer paso más realista. Puedes ajustar sin empezar todo de cero.',
        remember: 'Tu rutina se adapta a ti. Lo aprendido no desaparece por un día distinto.', sources: ['cdc', 'nhs']}
    ]
  };
  const glossary = [
    {term: 'Ritmo circadiano', text: 'Ritmo biológico de aproximadamente 24 horas que ayuda a organizar el sueño, la vigilia y otras funciones.', source: 'clock'},
    {term: 'Presión de sueño', text: 'Necesidad de dormir relacionada con el tiempo que llevas despierto. Disminuye al dormir.', source: 'clock'},
    {term: 'Adenosina', text: 'Sustancia relacionada con la necesidad de dormir durante la vigilia. La cafeína interfiere con su señal.', source: 'clock'},
    {term: 'Melatonina', text: 'Hormona cuyo ritmo de producción está influido por la luz y la oscuridad. No equivale a una recomendación de tomar suplementos.', source: 'clock'},
    {term: 'Sueño no REM', text: 'Conjunto de etapas que incluye la transición al sueño, el sueño ligero y el sueño profundo.', source: 'stages'},
    {term: 'Sueño REM', text: 'Fase con movimientos oculares rápidos y actividad cerebral elevada, durante la que se producen muchos sueños.', source: 'stages'},
    {term: 'Control de estímulos', text: 'Estrategia que busca reforzar la asociación entre la cama y el sueño. Puede formar parte del tratamiento del insomnio.', source: 'treatment'},
    {term: 'TCC-I', text: 'Terapia cognitivo-conductual para el insomnio. Es un tratamiento estructurado que un profesional puede recomendar; este curso no lo sustituye.', source: 'treatment'}
  ];
  return {sources, chapters, glossary};
});
