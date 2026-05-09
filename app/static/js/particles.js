/**
 * =====================================================
 * SISTEMA DE PARTÍCULAS - tsParticles
 * Crea un efecto visual mágico y romántico
 * ===================================================== 
 */

// Configuración de partículas al cargar la página
document.addEventListener('DOMContentLoaded', async function () {
    const MAX_PARTICLES = 500;

    // Inicializar partículas con tsParticles
    await tsParticles.load("particles-background", {
        fullScreen: {
            enable: true,
            zIndex: 1
        },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "attract",
                    parallax: {
                        enable: true,
                        force: 60,
                        smooth: 10,
                    }
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                attract: {
                    distance: 200,
                    duration: 0.4,
                }
            }
        },
        particles: {
            color: {
                value: ["#ff6b9d", "#ee5a6f", "#ffb6d9"],
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 0.5,
                },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                }
            },
            size: {
                value: {
                    min: 1,
                    max: 3,
                },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false,
                }
            },
            move: {
                enable: true,
                speed: {
                    min: 1.4,
                    max: 4,
                },
                direction: "top",
                straight: false,
                outModes: "out",
                bounce: false,
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                }
            }
        },
        emitters: {
            position: {
                x: 50,
                y: 50,
            },
            rate: {
                delay: 0.2,
                quantity: 1,
            }
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            limit: MAX_PARTICLES,
            value: MAX_PARTICLES,
        }
    });
});

/**
 * Sistema alternativo de partículas con Canvas
 * Más ligero y personalizable
 */
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.zIndex = '1';
            this.canvas.style.pointerEvents = 'none';
            document.body.insertBefore(this.canvas, document.body.firstChild);
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 50;
        this.mouseX = 0;
        this.mouseY = 0;

        // Configurar canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Iniciar animación
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    addParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            return;
        }

        const particle = {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            color: ['#ff6b9d', '#ee5a6f', '#ffb6d9'][Math.floor(Math.random() * 3)],
            life: 1,
            maxLife: Math.random() * 200 + 100
        };
        this.particles.push(particle);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar partículas
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Movimiento
            p.x += p.vx;
            p.y += p.vy;

            // Atracción al mouse
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * 0.5;
                p.vy += Math.sin(angle) * 0.5;
            }

            // Aplicar gravedad suave
            p.vy += 0.08;

            // Actualizar vida
            p.life--;
            p.opacity = (p.life / p.maxLife) * 0.5;

            // Dibujar partícula
            if (p.opacity > 0) {
                this.ctx.save();
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.opacity;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else {
                this.particles.splice(i, 1);
            }
        }

        // Agregar nuevas partículas ocasionalmente
        if (this.particles.length < this.maxParticles && Math.random() < 0.15) {
            this.addParticle();
        }

        // Seguridad extra: si por cualquier motivo se supera el máximo,
        // eliminamos las más antiguas para mantener el rendimiento estable.
        if (this.particles.length > this.maxParticles) {
            this.particles.splice(0, this.particles.length - this.maxParticles);
        }

        requestAnimationFrame(() => this.animate());
    }
}

/**
 * Efecto de cursor con brillo personalizado
 */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX - 15;
        targetY = e.clientY - 15;
    });

    function animateCursor() {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.display = 'block';
    });
}

/**
 * Efecto de onda en el fondo
 */
function createWaveEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'wave-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';

    // Opcional: solo crear si se desea el efecto de onda
    // document.body.insertBefore(canvas, document.body.firstChild);

    // Descomentar si se quiere activar
    // initWaveAnimation(canvas);
}

/**
 * Animación de onda (opcional, intensiva en CPU)
 */
function initWaveAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    let time = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar ondas
        ctx.strokeStyle = 'rgba(255, 107, 157, 0.05)';
        ctx.lineWidth = 2;

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 + Math.sin((x + time) * 0.005 + i) * 30;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        time += 2;
        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Inicializar todos los efectos de partículas
 */
function initAllParticleEffects() {
    // Cursor con brillo
    initCursorGlow();

    // Efecto de onda (opcional - comentar si afecta rendimiento)
    // createWaveEffect();

    // Sistema de partículas alternativo (comentar si usa tsParticles)
    // new ParticleSystem('particle-canvas');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllParticleEffects);
} else {
    initAllParticleEffects();
}

/**
 * Detector de dispositivo táctil
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Desactivar efectos en dispositivos móviles si es necesario para rendimiento
if (isTouchDevice()) {
    console.log('Dispositivo táctil detectado - Optimizando efectos visuales');
}
