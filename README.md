# LOAK Sleep Wellness

Web de LOAK basada en la página propia https://loak.netlify.app/, recuperada el 11 de noviembre de 2026, con una escuela interactiva del descanso.

## Abrir en local

Requiere Python 3. Desde la carpeta del proyecto:

```sh
python3 -m http.server 8000
```

- Web: http://localhost:8000/
- Escuela del descanso: http://localhost:8000/#aprende

La web es estática: no necesita instalar dependencias, compilar ni configurar claves. JavaScript debe estar activado para realizar los ejercicios.

## Escuela del descanso

El enlace **Aprende a dormir** del menú abre un recorrido de seis lecciones:

1. Conoce tu reloj interno.
2. Crea tu refugio de noche.
3. Haz que tu día te ayude.
4. Baja una marcha.
5. Menos mitos, menos presión.
6. Diseña tu pequeño ritual.

Cada lección contiene una introducción, cuatro ejercicios y la elección de un hábito para probar. Hay preguntas de respuesta única, selección múltiple y ejercicios para ordenar pasos, utilizables con teclado mediante sus botones de subir y bajar. Cada respuesta incluye una explicación; las ideas que cuesten se repiten antes de terminar. No hay vidas ni penalizaciones.

La primera finalización de una lección otorga **50 puntos**. Los repasos registran la práctica del día sin duplicarlos. La racha cuenta días locales con una lección o repaso terminado, no noches de buen sueño. El objetivo diario es una lección o repaso; no bloquea continuar.

El progreso, las respuestas comprobadas y los hábitos se guardan únicamente en `localStorage`, bajo la clave `loak-sleep-learning-v2`. «Guardar y salir» conserva la lección; al volver se puede retomarla, también tras recargar. No hay cuentas, seguimiento del sueño, envíos a LOAK ni sincronización entre dispositivos. Si el navegador bloquea el almacenamiento, se informa y los ejercicios siguen funcionando en memoria. El borrado de progreso requiere una confirmación y no toca datos de otras aplicaciones.

La pausa opcional de 60 segundos permite empezar, pausar y reiniciar. Se pausa al salir del apartado o al ocultar la pestaña. La animación respeta la preferencia de reducir movimiento y no es necesario acompasar la respiración con ella.

El contenido es educativo para adultos y no diagnostica ni sustituye atención sanitaria. Incluye referencias a NHLBI, CDC y NHS. Para ampliar preguntas o adaptar el material a una revisión profesional, edita `aprende-model.js`.

## Archivos

- `index.html`: página, estilos originales y navegación por secciones.
- `aprende-model.js`: contenido, reglas de avance, puntos y validación del estado guardado.
- `aprende.js`: interfaz, interacción, guardado y pausa opcional.
- `aprende.css`: diseño de la escuela, móvil, temas claro/oscuro y movimiento reducido.
- `sky.webp` e `img/`: cielo y cartel originales.
- `netlify.toml`: publicación estática, sin compilación.
- `tests/`: pruebas de reglas y de interacción con el DOM.

## Comprobar el proyecto

Solo para desarrollo, con Node.js 18 o posterior:

```sh
npm ci
npm run check
npm test
```

Las pruebas usan jsdom para recorrer las lecciones y comprobar almacenamiento, navegación, repasos, selección múltiple, ordenación y controles de la pausa. No sustituyen la revisión visual en un navegador real ni una auditoría completa de accesibilidad.

## Desplegar en Netlify

Importa este repositorio en Netlify. Directorio de publicación: `.`. Sin comando de compilación. El apartado se abrirá en `https://TU-DOMINIO/#aprende`.

Subir cambios a GitHub solo actualiza automáticamente la web si Netlify está conectado a este repositorio y a la rama `main`. Este proyecto no cambia por sí mismo el despliegue existente de `loak.netlify.app`.

## Servicios externos y formularios originales

Se conservan Google Fonts, fotografías externas de Unsplash y enlaces de correo, WhatsApp y reservas de Namaste Yoga. Requieren conexión a Internet. La escuela no añade peticiones a servicios externos.

El HTML público no incluye el servidor, las credenciales, la configuración privada de Netlify ni los envíos anteriores. Los formularios originales hacen POST a `/`: para recibir mensajes en un nuevo despliegue hay que configurar Netlify Forms o un backend equivalente. Un servidor estático local o GitHub Pages no procesa estos envíos.

La lista `SESSIONS` de `index.html` contiene las fechas, plazas, precios, carteles y enlaces de los eventos. Los eventos pasan a la sección de pasados según la fecha del navegador.

## Origen

Las imágenes locales conservan los archivos originales. La página mantiene su diseño y funcionamiento previos; se han añadido el apartado de aprendizaje, sus enlaces de navegación y la adaptación de la cabecera al menú ampliado. Este repositorio contiene una copia del sitio público con estas mejoras, no el historial del proyecto original.
