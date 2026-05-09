/**
 * =====================================================
 * GUÍA DE PERSONALIZACIÓN
 * Cambios rápidos y fáciles para tu página romántica
 * ===================================================== 
 */

// ==================== CAMBIOS DE TEXTO ====================
// Archivo: app/app.py (línea ~20)

/*
romantic_data = {
    "parejas": {
        "el": "Daniel ❤️",
        "ella": "Anastasia 💕"
    },
    "milestones": [
        {
            "titulo": "Cambiar este título",
            "fecha": "Tu fecha especial",
            "icono": "✉️",
            "descripcion": "Tu descripción aquí"
        },
        // ... más hitos
    ],
    "mensaje_principal": "Eres la mejor parte de mis días ❤️",
    "mensajeFinal_parte1": "Y esto recién comienza...",
    "mensajeFinal_parte2": "Vamos por muchos más recuerdos lindos juntos ❤️",
    "mensajeFinal_parte3": "Y por un futuro próximo lleno de amor"
}
*/

// ==================== CAMBIOS DE COLORES ====================
// Archivo: app/static/css/main.css (línea ~10)

/*
:root {
    /* Colores principales */
    --color-primary: #ff6b9d;      /* Rosa principal - CAMBIAR */
    --color-secondary: #ee5a6f;    /* Rojo romántico - CAMBIAR */
    --color-accent: #ffb6d9;       /* Rosa pastel - CAMBIAR */
    --color-light: #fff5f7;        /* Fondo claro */
    --color-dark: #3d3d3d;         /* Texto oscuro */
    --color-text: #2c2c2c;         /* Texto principal */
}
*/

// Ejemplos de paletas alternativas:
/*
OPCIÓN 1 - Rojo Pasional:
--color-primary: #e91e63;
--color-secondary: #c2185b;
--color-accent: #f06292;

OPCIÓN 2 - Púrpura Romántico:
--color-primary: #9c27b0;
--color-secondary: #7b1fa2;
--color-accent: #ce93d8;

OPCIÓN 3 - Naranja Cálido:
--color-primary: #ff6b35;
--color-secondary: #f7931e;
--color-accent: #ffb5a7;

OPCIÓN 4 - Azul Celeste:
--color-primary: #00bcd4;
--color-secondary: #0097a7;
--color-accent: #80deea;
*/

// ==================== AGREGAR/CAMBIAR FOTOS ====================
// Archivo: app/static/img/

/*
Foto principal:
- Nombre: nosotros.jpg
- Tamaño recomendado: 400x500px
- Formato: JPG, PNG, WebP

Fotos de recuerdos:
- Nombres: recuerdo1.jpg, recuerdo2.jpg, recuerdo3.jpg
- Tamaño recomendado: 200x250px
- Formato: JPG, PNG, WebP

La página mostrará placeholder si no encuentra las imágenes.
*/

// ==================== MÚSICA ====================
// Archivo: app/static/music/

/*
Archivo de música:
- Nombre: romantic.mp3
- Formato: MP3
- Duración: Recomendado 5-10 minutos
- Sitios para descargar:
  * Free Music Archive: freemusicarchive.org
  * Pixabay Music: pixabay.com/music/
  * YouTube Audio Library: music.youtube.com
*/

// ==================== CAMBIOS EN HTML ====================
// Archivo: app/templates/index.html

/*
Para cambiar el título de la página (línea ~6):
<title>💕 A & D 💕</title>

Para cambiar el mensaje de bienvenida (línea ~180):
<p class="hero-message">
    Tu mensaje personalizado aquí 💕
</p>

Para agregar más fotos de recuerdos:
1. Copiar bloque .memory-card (línea ~240)
2. Cambiar src de la imagen
3. Cambiar el texto del polaroid-label
*/

// ==================== CAMBIOS EN ANIMACIONES ====================
// Archivo: app/static/css/animations.css

/*
Para cambiar velocidad de latido del corazón:
#main-heart {
    animation: heartbeat 1.5s ease-in-out infinite;
    /* Cambiar 1.5s a lo que quieras: 1s más rápido, 2s más lento */
}

Para cambiar duración de animaciones:
@keyframes fadeInUp {
    /* duración definida en la clase fade-in-up */
    animation: fadeInUp 1s ease-out forwards;
    /* Cambiar 1s a lo que desees */
}
*/

// ==================== EFECTOS ADICIONALES ====================

/*
AGREGAR SONIDO AL HACER CLIC EN CORAZÓN:
Descomenta en app/static/js/music.js (línea ~150):

function playHeartSound() {
    const audio = new Audio('{{ url_for("static", filename="sounds/heart.mp3") }}');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio error:', err));
}

CAMBIAR CANTIDAD DE PARTÍCULAS:
En app/static/js/particles.js (línea ~50):

number: {
    density: {
        enable: true,
        area: 800,
    },
    limit: 80,  // <-- Cambiar este número (mayor = más partículas)
    value: 80,
}

DESACTIVAR MÚSICA AUTOMÁTICA:
En app/static/js/music.js, la música NO se reproduce automáticamente.
El usuario debe hacer clic en el botón. Esto es por política de navegadores modernos.

CAMBIAR VELOCIDAD DE SCROLL:
En HTML, agregar data-parallax:
<div data-parallax>Contenido</div>

En animations.js, cambiar:
gsap.to(element, {
    scrollTrigger: {
        trigger: element,
        scrub: 1,  // <-- Cambiar número (1=lento, 3=rápido)
    }
});
*/

// ==================== FUENTES TIPOGRÁFICAS ====================
// Archivo: app/templates/index.html (línea ~15)

/*
Google Fonts incluidas:
- Playfair Display (títulos) - serif elegante
- Poppins (cuerpo) - sans-serif moderna

Para cambiar, ir a:
https://fonts.google.com/

Copiar el @import y reemplazar en:
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">

Luego actualizar en main.css:
--font-heading: 'Nueva Fuente Aquí';
--font-body: 'Nueva Fuente Aquí';
*/

// ==================== SECCIONES PERSONALIZADAS ====================

/*
Para agregar una nueva sección:

1. En index.html, antes del footer:
<section id="mi-seccion" class="mi-seccion">
    <div class="section-header">
        <h2 class="section-title">Mi Título</h2>
        <div class="title-underline"></div>
    </div>
    <div class="mi-contenido">
        <!-- Tu contenido aquí -->
    </div>
</section>

2. En main.css, agregar estilos:
.mi-seccion {
    padding: var(--spacing-2xl) var(--spacing-xl);
    background: linear-gradient(...);
}

3. En animations.js, agregar animaciones:
gsap.from('.mi-contenido', {
    scrollTrigger: {
        trigger: '.mi-seccion',
        start: "top 80%",
    },
    duration: 1,
    opacity: 0,
});

4. En app.py, agregar datos si es necesario:
"mi_datos": {
    "titulo": "Valor",
    "contenido": "Valor"
}
*/

// ==================== BOTONES Y FORMULARIOS ====================

/*
Para agregar un botón personalizado:

<button class="custom-btn" onclick="miFuncion()">
    Mi Botón
</button>

Estilos en main.css:
.custom-btn {
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition-normal);
}

.custom-btn:hover {
    background: var(--color-secondary);
    transform: scale(1.05);
    box-shadow: var(--shadow-glow);
}

Función en interactions.js:
function miFuncion() {
    showNotification('¡Mensaje aquí!', 'success');
}
*/

// ==================== VARIABLES CSS DISPONIBLES ====================

/*
Spacing:
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-2xl: 4rem

Shadows:
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.15);
--shadow-glow: 0 0 20px rgba(255, 107, 157, 0.4);

Transitions:
--transition-fast: 0.2s ease
--transition-normal: 0.3s ease
--transition-slow: 0.5s ease

Usar así:
padding: var(--spacing-lg);
box-shadow: var(--shadow-md);
transition: var(--transition-normal);
*/

// ==================== CONTACTO/REDES SOCIALES ====================

/*
Para agregar botones de redes sociales:

<div class="social-links">
    <a href="https://facebook.com/tuurl" target="_blank" title="Facebook">
        <i class="fab fa-facebook"></i>
    </a>
    <a href="https://instagram.com/tuurl" target="_blank" title="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://tiktok.com/tuurl" target="_blank" title="TikTok">
        <i class="fab fa-tiktok"></i>
    </a>
</div>

Estilos en main.css:
.social-links {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
}

.social-links a {
    width: 40px;
    height: 40px;
    background: rgba(255, 107, 157, 0.1);
    color: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-normal);
    text-decoration: none;
}

.social-links a:hover {
    background: var(--color-primary);
    color: white;
    transform: scale(1.1);
}
*/

// ==================== OPTIMIZACIÓN ====================

/*
Para mejorar rendimiento en dispositivos antiguos:

1. Reducir cantidad de partículas (particles.js)
2. Desactivar algunos efectos parallax (animations.js)
3. Simplificar animaciones (animations.css)
4. Usar imágenes más pequeñas (img/)
5. Comprimir imágenes con: tinypng.com o squoosh.app

MONITOREO:
Presiona F12 en navegador → Perf → Record
Ejecuta la página y analiza el rendimiento
*/

console.log('%c💕 Personalización Lista 💕', 
    'font-size: 16px; color: #ff6b9d; font-weight: bold;');
console.log('Ve a app/app.py para cambiar mensajes y datos');
console.log('Ve a app/static/css/main.css para cambiar colores');
console.log('Coloca tus fotos en app/static/img/');
console.log('Coloca tu música en app/static/music/');
