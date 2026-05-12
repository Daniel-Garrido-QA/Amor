/**
 * =====================================================
 * CONTROL DE MÚSICA
 * Gestión de audio de fondo romántico
 * ===================================================== 
 */

class MusicController {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.toggleBtn = document.getElementById('music-toggle');
        this.isPlaying = false;
        this.volume = 0.01;
        this.playbackRate = 0.9;
        this.muted = false;
        this.userInteracted = false;

        if (this.audio && this.toggleBtn) {
            this.init();
        }
    }

    init() {
        // Configurar volumen inicial
        this.audio.volume = this.volume;
        // Reproducir más despacio por defecto
        this.audio.playbackRate = this.playbackRate;
        // Forzar inicio sin mute para evitar que estados viejos silencien la música
        this.muted = false;
        this.audio.muted = false;
        localStorage.setItem('music-muted', 'false');

        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggleMusic());
        this.audio.addEventListener('play', () => this.onMusicPlay());
        this.audio.addEventListener('pause', () => this.onMusicPause());
        this.audio.addEventListener('ended', () => this.onMusicEnd());
        this.audio.addEventListener('canplay', () => this.playMusic());

        // Cargar estado guardado
        this.loadState();

        // No restauramos mute al iniciar para evitar silencios inesperados.
        // El usuario puede silenciar manualmente con el botón.

        // Si el audio ya se está reproduciendo (pudo empezar por autoplay antes
        // de que los listeners se registraran), sincronizar el estado y UI.
        if (this.audio && !this.audio.paused) {
            this.isPlaying = true;
        }
        this.updateButtonUI();

        this.setupAutoplayFallback();

        // Hacer que el botón sea visible
        this.toggleBtn.style.display = 'flex';
    }

    setupAutoplayFallback() {
        const unlockAndPlay = () => {
            if (this.userInteracted) return;
            this.userInteracted = true;

            if (!this.audio) return;
            this.audio.muted = this.muted;
            this.playMusic();
        };

        document.addEventListener('pointerdown', unlockAndPlay, { once: true });
        document.addEventListener('keydown', unlockAndPlay, { once: true });
        document.addEventListener('touchstart', unlockAndPlay, { once: true });
    }

    toggleMusic() {
        // Cambiar entre mutear/desmutear en lugar de pausar/reproducir
        if (!this.audio) return;
        this.muted = !this.muted;
        this.audio.muted = this.muted;
        localStorage.setItem('music-muted', this.muted);
        this.updateButtonUI();
    }

    playMusic() {
        if (this.audio) {
            this.audio.play().catch(error => {
                console.log('No se pudo reproducir la música:', error);
            });
        }
    }

    pauseMusic() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
        localStorage.setItem('music-volume', this.volume);
    }

    onMusicPlay() {
        this.isPlaying = true;
        this.updateButtonUI();
        localStorage.setItem('music-playing', 'true');
        
        // Animar el icono
        if (this.toggleBtn) {
            gsap.to(this.toggleBtn, {
                duration: 0.3,
                scale: 1.1,
                ease: "power2.out"
            });
        }
    }

    onMusicPause() {
        this.isPlaying = false;
        this.updateButtonUI();
    }

    onMusicEnd() {
        // Reiniciar la música si se desea que sea continua
        // this.audio.currentTime = 0;
        // this.playMusic();
    }

    updateButtonUI() {
        if (!this.toggleBtn) return;

        const icon = this.toggleBtn.querySelector('i');
        if (icon) {
            if (this.muted) {
                icon.className = 'fas fa-volume-mute';
                this.toggleBtn.classList.remove('active');
                this.toggleBtn.title = 'Activar sonido';
            } else {
                icon.className = 'fas fa-volume-up';
                this.toggleBtn.classList.add('active');
                this.toggleBtn.title = 'Silenciar sonido';
            }
        }
    }

    loadState() {
        // Cargar volumen guardado
        const savedVolume = localStorage.getItem('music-volume');
        if (savedVolume) {
            this.setVolume(parseFloat(savedVolume));
        }

        // Intentar auto-reproducir por defecto (si el navegador lo permite).
        // En navegadores con bloqueo, el fallback de interacción la iniciará.
        setTimeout(() => this.playMusic(), 300);
    }

    setPlaybackRate(rate) {
        if (this.audio) {
            this.audio.playbackRate = rate;
        }
    }
}

// Inicializar controlador de música
let musicController;

document.addEventListener('DOMContentLoaded', function () {
    musicController = new MusicController();
});

/**
 * Visualizador de música (opcional, requiere Web Audio API)
 */
class MusicVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.audio = document.getElementById('background-music');
        
        if (!this.canvas || !this.audio) return;

        this.ctx = this.canvas.getContext('2d');
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.init();
    }

    init() {
        // Crear AudioContext
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();

        // Crear analysers
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;

        // Conectar audio
        const source = this.audioContext.createMediaElementAudioSource(this.audio);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        // Inicializar array de datos
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        // Configurar canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Iniciar visualización
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 100;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.analyser.getByteFrequencyData(this.dataArray);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const barWidth = (this.canvas.width / this.dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            barHeight = (this.dataArray[i] / 255) * this.canvas.height;

            const hue = (i / this.dataArray.length) * 360;
            this.ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
            this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
}

/**
 * Listas de reproducción (opcional)
 */
const playlists = {
    romantic: [
        {
            title: 'Soft Piano',
            url: '/static/music/romantic.mp3',
            duration: 300
        },
        {
            title: 'Ambient Love',
            url: '/static/music/ambient.mp3',
            duration: 600
        }
    ]
};

/**
 * Gestor de reproducción en bucle
 */
function setupMusicLoop() {
    const audio = document.getElementById('background-music');
    if (!audio) return;

    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        // Descomentar para reproducir en bucle automático
        // this.play();
    }, false);
}

// Configurar reproducción en bucle
document.addEventListener('DOMContentLoaded', setupMusicLoop);

/**
 * Sonidos de interacción (opcionales)
 */
const soundEffects = {
    click: '/static/sounds/click.mp3',
    hover: '/static/sounds/hover.mp3',
    success: '/static/sounds/success.mp3'
};

function playSound(soundName) {
    const soundUrl = soundEffects[soundName];
    if (!soundUrl) return;

    try {
        const audio = new Audio(soundUrl);
        audio.volume = 0.001;
        audio.play().catch(err => console.log('Audio error:', err));
    } catch (error) {
        console.log('No se pudo reproducir el sonido:', error);
    }
}

/**
 * Gestión de volumen con teclado
 */
document.addEventListener('keydown', function (e) {
    if (!musicController) return;

    // Aumentar volumen: +
    if (e.key === '+' || e.key === '=') {
        musicController.setVolume(musicController.volume + 0.1);
        console.log('Volumen:', (musicController.volume * 100).toFixed(0) + '%');
    }
    // Disminuir volumen: -
    else if (e.key === '-') {
        musicController.setVolume(musicController.volume - 0.1);
        console.log('Volumen:', (musicController.volume * 100).toFixed(0) + '%');
    }
    // Toggle música: M
    else if (e.key.toLowerCase() === 'm') {
        musicController.toggleMusic();
    }
});

console.log('%cMúsica Lista 🎵', 'font-size: 16px; color: #ff6b9d; font-weight: bold;');
console.log('Presiona + / - para ajustar volumen');
console.log('Presiona M para activar/desactivar música');
