# 💕 Una Página Romántica Dedicada a Mi Pareja

Una experiencia web interactiva, emotiva y visualmente impactante hecha con **Flask** y **JavaScript moderno**. Una carta digital interactiva llena de amor, recuerdos y emociones.

---

## 🎨 Características Principales

### ✨ Experiencia Visual
- **Diseño moderno y elegante** con glassmorphism
- **Animaciones fluidas** con GSAP y ScrollTrigger
- **Sistema de partículas** interactivas con tsParticles
- **Efectos visuales** cinematográficos
- **Paleta romántica** de colores (rosado, rojo, tonos cálidos)
- **Responsive** para móviles, tablets y pantallas grandes

### 💫 Secciones
1. **Sección Hero**: Corazón animado principal con latido, título romántico y mensaje emocional
2. **Galería de Recuerdos**: Foto principal y colección de polaroids animadas
3. **Timeline Romántica**: Línea del tiempo visual con hitos importantes
4. **Mensaje Final**: Sección emocional con animaciones especiales
5. **Música Romántica**: Control de audio de fondo elegante

### 🎭 Interactividades
- Corazón clickeable con efecto de corazones flotantes
- Efectos hover suave en elementos
- Cursor con brillo personalizado
- Navegación fluida con smooth scroll
- Menú adaptativo para móvil
- Notificaciones elegantes

### 🎵 Audio
- Control de música de fondo
- Botón elegante para activar/desactivar
- Control de volumen con teclado (+ / -)
- Reproductor integrado

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si tienes git
git clone <url-del-repositorio>
cd Amor

# Si descargaste el archivo ZIP
# Extrae el archivo y navega a la carpeta
cd Amor
```

### Paso 2: Crear Entorno Virtual

**En Windows (PowerShell):**
```powershell
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1
```

**En Windows (CMD):**
```cmd
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate.bat
```

**En macOS/Linux:**
```bash
# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
source venv/bin/activate
```

### Paso 3: Instalar Dependencias

```bash
# Instalar las librerías requeridas
pip install -r requirements.txt
```

### Paso 4: Ejecutar la Aplicación

```bash
# Navegar a la carpeta de la app
cd app

# Ejecutar Flask
python app.py
```

Deberías ver algo como:
```
╔════════════════════════════════════════╗
║     Página Romántica - Flask App       ║
║   💕 Una carta interactiva de amor 💕  ║
╚════════════════════════════════════════╝

✨ Servidor iniciado en: http://localhost:5000
🔒 Presiona Ctrl+C para detener el servidor
```

### Paso 5: Acceder a la Página

Abre tu navegador y ve a:
```
http://localhost:5000
```

---

## 📁 Estructura del Proyecto

```
Amor/
├── app/
│   ├── app.py                 # Aplicación Flask principal
│   ├── templates/
│   │   └── index.html         # Página HTML principal
│   └── static/
│       ├── css/
│       │   ├── main.css       # Estilos principales
│       │   ├── animations.css # Animaciones GSAP
│       │   └── responsive.css # Estilos responsivos
│       ├── js/
│       │   ├── particles.js   # Sistema de partículas
│       │   ├── animations.js  # Animaciones con GSAP
│       │   ├── interactions.js# Interacciones del usuario
│       │   └── music.js       # Control de música
│       ├── img/
│       │   ├── nosotros.jpg   # Foto principal (opcional)
│       │   ├── recuerdo1.jpg  # Fotos de recuerdos (opcional)
│       │   ├── recuerdo2.jpg
│       │   └── recuerdo3.jpg
│       └── music/
│           └── romantic.mp3   # Música de fondo (opcional)
├── requirements.txt           # Dependencias de Python
└── README.md                  # Este archivo
```

---

## 🎨 Personalización

### Cambiar Nombres y Mensajes

Edita el archivo `app/app.py`:

```python
romantic_data = {
    "parejas": {
        "el": "Tu nombre aquí ❤️",
        "ella": "Tu nombre aquí 💕"
    },
    "mensaje_principal": "Tu mensaje personalizado ❤️",
    # ... más datos
}
```

### Agregar Fotos

1. Coloca tus fotos en `app/static/img/`
2. Los nombres deben ser:
   - `nosotros.jpg` - Foto principal
   - `recuerdo1.jpg`, `recuerdo2.jpg`, `recuerdo3.jpg` - Fotos secundarias

### Agregar Música

1. Coloca tu archivo MP3 en `app/static/music/`
2. Renómbra lo como `romantic.mp3`

### Cambiar Colores

Edita el archivo `app/static/css/main.css` en la sección `:root`:

```css
:root {
    --color-primary: #ff6b9d;      /* Color principal */
    --color-secondary: #ee5a6f;    /* Color secundario */
    --color-accent: #ffb6d9;       /* Color de acento */
    /* ... más variables */
}
```

---

## 🛠️ Librerías Utilizadas

### Backend
- **Flask 3.0.0** - Framework web ligero
- **Werkzeug 3.0.1** - Utilidades WSGI

### Frontend
- **GSAP 3.12.2** - Animaciones suaves y profesionales
- **tsParticles 2.12.0** - Sistema de partículas interactivas
- **AOS 2.3.1** - Animate On Scroll
- **Font Awesome 6.4.0** - Iconos vectoriales
- **Google Fonts** - Tipografías modernas

---

## 🎯 Funcionalidades Avanzadas

### Animaciones
- ✅ Latido de corazón principal con efecto de brillo
- ✅ Corazones flotantes en el fondo
- ✅ Fade-in suave de elementos al scroll
- ✅ Efectos parallax
- ✅ Transiciones y transformaciones suaves

### Interactividad
- ✅ Corazón clickeable con partículas flotantes
- ✅ Cursor personalizado con brillo
- ✅ Menú responsivo para móvil
- ✅ Smooth scroll entre secciones
- ✅ Notificaciones elegantes

### Rendimiento
- ✅ Optimizado para dispositivos móviles
- ✅ Lazy loading de imágenes
- ✅ Reducción de movimiento respetada
- ✅ Animaciones aceleradas por GPU

---

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Dispositivos móviles iOS/Android
- ✅ Tablets

---

## 🔊 Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `+` | Aumentar volumen de música |
| `-` | Disminuir volumen de música |
| `M` | Activar/desactivar música |

---

## 🐛 Solución de Problemas

### La música no se reproduce
- Algunos navegadores requieren interacción del usuario primero
- Haz clic en el botón de música para activarla
- Asegúrate de tener el archivo `romantic.mp3` en `app/static/music/`

### Las imágenes no se cargan
- Verifica que los archivos estén en `app/static/img/`
- Los nombres deben ser exactos: `nosotros.jpg`, `recuerdo1.jpg`, etc.
- Formatos soportados: JPG, PNG, WebP

### Animaciones lentas
- Desactiva extensiones del navegador que ralenticen
- Reduce la calidad de video/hardware en navegador
- En dispositivos antiguos, algunos efectos pueden ser más sutiles

### Puerto 5000 en uso
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# Cambiar puerto en app.py
app.run(host='localhost', port=5001)
```

---

## 📝 Personalización Avanzada

### Cambiar Paleta de Colores

En `app/static/css/main.css`, edita:

```css
--color-primary: #ff6b9d;      /* Rosa principal */
--color-secondary: #ee5a6f;    /* Rojo romántico */
--color-accent: #ffb6d9;       /* Rosa pastel */
```

### Agregar Secciones Nuevas

Edita `app/templates/index.html` y agrega:

```html
<section id="mi-seccion" class="mi-seccion">
    <!-- Tu contenido -->
</section>
```

Luego agrega CSS y JavaScript en los archivos correspondientes.

### Modificar Velocidad de Animaciones

En `app/static/css/main.css`, ajusta:

```css
--transition-fast: 0.2s ease;      /* Rápido */
--transition-normal: 0.3s ease;    /* Normal */
--transition-slow: 0.5s ease;      /* Lento */
```

---

## 💡 Tips y Trucos

1. **Agregar más fotos**: Copia el bloque `.memory-card` en el HTML y cambia las referencias de imagen

2. **Cambiar mensajes**: Todos los textos pueden editarse en `app.py` en la variable `romantic_data`

3. **Agregar sonidos**: Coloca archivos MP3 en `app/static/music/` y referencia en JavaScript

4. **Efectos hover personalizados**: Edita los `@keyframes` en `app/static/css/animations.css`

5. **Desactivar efectos en móvil**: Modifica `isTouchDevice()` en `app/static/js/particles.js`

---

## 🚀 Despliegue en Producción

### Opción 1: Heroku

```bash
# Instalar Heroku CLI
# Crear Procfile
echo "web: gunicorn app:app" > Procfile

# Desplegar
heroku login
heroku create nombre-de-tu-app
git push heroku main
```

### Opción 2: PythonAnywhere

1. Crea cuenta en pythonanywhere.com
2. Sube los archivos
3. Configura la aplicación WSGI
4. Accede a tu_usuario.pythonanywhere.com

### Opción 3: VPS (DigitalOcean, Linode, etc.)

```bash
# Instalar Gunicorn
pip install gunicorn

# Ejecutar en producción
gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
```

---

## 📄 Licencia

Este proyecto es un regalo de amor. Haz lo que quieras con él. 💕

---

## 💌 Créditos

Hecho con ❤️ para alguien especial.

Librerías y recursos:
- Flask: https://flask.palletsprojects.com/
- GSAP: https://greensock.com/gsap/
- tsParticles: https://tsparticles.js.org/
- Font Awesome: https://fontawesome.com/
- Google Fonts: https://fonts.google.com/

---

## 💕 Notas Finales

Esta es una página web romántica y moderna, diseñada para expresar amor y crear momentos especiales. Cada elemento, cada animación, cada color, está hecho con cariño.

Personaliza, disfruta y crea momentos mágicos con la persona que amas.

**¡Que esta página te ayude a expresar tus sentimientos de la manera más hermosa posible!**

---

## 📧 Soporte

Si tienes preguntas o sugerencias, no dudes en contactar o modificar el código a tu gusto.

Que disfrutes creando momentos románticos. 💫✨

---

*Última actualización: 8 de mayo de 2026*
*Hecho con amor para ti. 💕*
