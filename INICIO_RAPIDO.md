# =====================================================
# EJECUCIÓN RÁPIDA - Página Romántica
# =====================================================

## WINDOWS

### Opción 1: Usar script automático (RECOMENDADO)
```
1. Abre la carpeta del proyecto
2. Haz doble clic en: run.bat
3. Espera a que se instale todo
4. Se abrirá automáticamente en: http://localhost:5000
```

### Opción 2: Línea de comandos
```powershell
# Navega a la carpeta del proyecto
cd C:\Users\TuUsuario\Documents\Proyectos\Amor

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar Flask
cd app
python app.py

# Visita: http://localhost:5000
```

---

## macOS / LINUX

### Opción 1: Usar script automático (RECOMENDADO)
```bash
1. Abre Terminal en la carpeta del proyecto
2. Ejecuta: chmod +x run.sh && ./run.sh
3. Se abrirá automáticamente en: http://localhost:5000
```

### Opción 2: Línea de comandos
```bash
# Navega a la carpeta del proyecto
cd ~/Documents/Proyectos/Amor

# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar Flask
cd app
python app.py

# Visita: http://localhost:5000
```

---

## PERSONALIZACIONES RÁPIDAS

### 1. Cambiar nombres
```
Abre: app/app.py
Busca: romantic_data = {
Cambia:
    "parejas": {
        "el": "TU NOMBRE ❤️",
        "ella": "SU NOMBRE 💕"
    }
```

### 2. Agregar fotos
```
1. Coloca tus fotos en: app/static/img/
2. Nombres requeridos:
   - nosotros.jpg (foto principal)
   - recuerdo1.jpg, recuerdo2.jpg, recuerdo3.jpg (galería)
```

### 3. Cambiar colores
```
Abre: app/static/css/main.css
Busca: :root {
Cambia los colores HEX:
    --color-primary: #ff6b9d;
    --color-secondary: #ee5a6f;
    --color-accent: #ffb6d9;
```

### 4. Agregar música
```
1. Descarga una canción MP3 romántica
2. Colócala en: app/static/music/
3. Renómbrala como: romantic.mp3
```

---

## CONTROLES

### Botones
- 🎵 Botón de música: Activa/desactiva la música de fondo

### Teclado
- `+` : Aumentar volumen
- `-` : Disminuir volumen
- `M` : Activar/desactivar música

### Mouse
- Click en corazón: Efecto especial
- Hover en fotos: Zoom y efectos suaves

---

## AYUDA

### La música no se reproduce
```
- Asegúrate que el archivo está en: app/static/music/romantic.mp3
- Haz clic en el botón 🎵 para activarla
- Algunos navegadores requieren interacción del usuario primero
```

### Las fotos no se cargan
```
- Verifica que estén en: app/static/img/
- Nombres correctos: nosotros.jpg, recuerdo1.jpg, etc.
- Formatos: JPG, PNG, WebP
```

### Animaciones lentas
```
- Cierra otras aplicaciones
- Desactiva extensiones del navegador
- Usa un navegador moderno (Chrome, Firefox, Safari, Edge)
```

### Puerto 5000 ya está en uso
```
Windows:
netstat -ano | findstr :5000

macOS/Linux:
lsof -i :5000

Cambiar puerto en app.py línea final:
app.run(host='localhost', port=5001)
```

---

## ESTRUCTURA FINAL

```
Amor/
├── app/
│   ├── app.py                          ← EDITAR MENSAJES
│   ├── templates/index.html            ← EDITAR SECCIONES
│   └── static/
│       ├── css/main.css                ← EDITAR COLORES
│       ├── js/animations.js
│       ├── js/particles.js
│       ├── js/interactions.js
│       ├── js/music.js
│       ├── img/                        ← TUS FOTOS
│       │   ├── nosotros.jpg
│       │   ├── recuerdo1.jpg
│       │   └── ...
│       └── music/                      ← TU MÚSICA
│           └── romantic.mp3
├── venv/                               ← SE CREA SOLO
├── requirements.txt                    ← DEPENDENCIAS
├── run.bat                             ← EJECUTAR (Windows)
├── run.sh                              ← EJECUTAR (Mac/Linux)
├── README.md                           ← DOCUMENTACIÓN COMPLETA
└── PERSONALIZACION.js                  ← GUÍA DE CAMBIOS
```

---

## PRÓXIMOS PASOS

1. ✅ Instala las dependencias (`run.bat` o `run.sh`)
2. 🎨 Personaliza con tus fotos y mensajes
3. 🎵 Agrega tu música romántica
4. 💻 Comparte con tu pareja
5. 🚀 Opcional: Despliega en internet

---

## DESPLIEGUE EN INTERNET

### Opción gratis: Heroku
```bash
pip install gunicorn
echo "web: gunicorn app:app" > Procfile
git push heroku main
```

### Opción gratis: PythonAnywhere
- Crea cuenta en: pythonanywhere.com
- Sube los archivos
- ¡Listo! Tu página estará en internet

### Opción profesional: DigitalOcean, AWS, etc.
- Requiere configuración más avanzada
- Mejor rendimiento y características

---

## SOPORTE Y RECURSOS

- 📚 Documentación: README.md
- 🎨 Guía de personalización: PERSONALIZACION.js
- 🐍 Flask: https://flask.palletsprojects.com/
- ✨ GSAP: https://greensock.com/gsap/
- 🎨 Google Fonts: https://fonts.google.com/
- 🎵 Música gratis: pixabay.com/music/

---

## TIPS FINALES

1. **Abre la consola** (F12) para ver mensajes y errores
2. **Prueba en móvil** para ver el diseño responsivo
3. **Agrega más fotos** duplicando los bloques en HTML
4. **Personaliza textos** en app.py
5. **Cambia colores** en main.css según tu gusto

---

**¡Diviértete creando una página romántica perfecta! 💕✨**

*Si necesitas ayuda, revisa el README.md o la guía de PERSONALIZACION.js*
