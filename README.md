# LOAK Sleep Wellness

Copia de la web propia https://loak.netlify.app/, recuperada el 11 de noviembre de 2026.

## Ejecutar en local

Requiere Python 3:

```sh
python3 -m http.server 8000
```

Abre http://localhost:8000. No requiere instalación de dependencias ni compilación.

## Estructura

- `index.html`: página original, estilos, animaciones, navegación y lógica de eventos.
- `sky.webp`: imagen del cielo del inicio.
- `img/`: fondo del evento y cartel originales.
- `netlify.toml`: configuración de publicación estática.

## Desplegar en Netlify

Importa este repositorio desde Netlify. Directorio de publicación: `.`. Sin comando de compilación.

## Servicios externos y formularios

Se conservan las fuentes de Google Fonts, fotografías externas de Unsplash y enlaces originales de correo, WhatsApp y reservas de Namaste Yoga. Requieren conexión a Internet.

El HTML público no incluye el código del servidor, las credenciales, la configuración privada de Netlify ni los envíos previos de formularios. Los formularios originales hacen POST a `/`: para recibir mensajes en un nuevo despliegue hay que configurar Netlify Forms (detección y notificaciones) o un backend equivalente. Un servidor estático local o GitHub Pages no procesa estos envíos. No se ha verificado un envío real.

## Editar eventos

La lista `SESSIONS` de `index.html` define fechas, plazas, precios, carteles y enlaces de reserva. Los eventos se clasifican como próximos o pasados según la fecha del navegador.

## Fidelidad

`index.html` y las tres imágenes locales se conservan sin modificaciones respecto de la descarga pública. Este repositorio contiene una instantánea del sitio publicado, no su historial ni un eventual proyecto fuente anterior.
