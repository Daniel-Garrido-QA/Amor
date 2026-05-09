/**
 * =====================================================
 * ANIMACIONES CON GSAP
 * Animaciones suaves y profesionales con ScrollTrigger
 * ===================================================== 
 */

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Inicializar animaciones principales al cargar
 */
document.addEventListener('DOMContentLoaded', function () {
    initHeroAnimations();
    initScrollAnimations();
    initMemoriesAnimations();
    initTimelineAnimations();
    initFinalAnimations();
});

/**
 * Animaciones de la sección Hero
 */
function initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Animar el corazón principal
    const heartBeat = document.getElementById('main-heart');
    if (heartBeat) {
        timeline.from(heartBeat, {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            rotation: -180,
        }, 0);
    }

    // Título: fromTo con opacidad final explícita. Antes, timeline.from() + un tween
    // repetido infinito en el mismo timeline dejaba la duración en ∞ y los tweens
    // del título podían no completarse; el texto quedaba en opacity: 0.
    const titleWords = document.querySelectorAll('.hero-title .title-word');
    titleWords.forEach((word, index) => {
        timeline.fromTo(
            word,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "back.out",
            },
            0.2 + index * 0.15
        );
    });

    // Animar mensaje
    timeline.from('.hero-message', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out"
    }, 1.2);

    // Animar indicador de scroll
    timeline.from('.scroll-indicator', {
        duration: 0.8,
        y: -30,
        opacity: 0,
        ease: "power2.out"
    }, 1.5);

    // Animación continua del indicador de scroll
    gsap.to('.arrow span', {
        duration: 1.5,
        y: 10,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Brillo del corazón en bucle: va aparte del timeline para no marcar duración ∞
    if (heartBeat) {
        gsap.to(heartBeat, {
            duration: 2,
            boxShadow: [
                "0 0 20px rgba(255, 107, 157, 0.4)",
                "0 0 40px rgba(255, 107, 157, 0.7)",
                "0 0 20px rgba(255, 107, 157, 0.4)"
            ],
            repeat: -1,
            ease: "sine.inOut"
        });
    }
}

/**
 * Animaciones de scroll con ScrollTrigger
 */
function initScrollAnimations() {
    // Animar elementos cuando entran en viewport (EXCEPTO timeline items que usan data-delay)
    const fadeElements = document.querySelectorAll('.fade-in-up:not(.timeline-item)');

    fadeElements.forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse",
                markers: false
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });

    // Manejar timeline items por separado con data-delay
    const timelineItems = document.querySelectorAll('.timeline-item.fade-in-up');
    timelineItems.forEach((element) => {
        const d = element.dataset.delay;
        if (d !== undefined) {
            const parsed = parseFloat(d);
            if (!Number.isNaN(parsed)) {
                element.style.animationDelay = parsed + 's';
            }
        }
    });

    // Parallax opcional: el bloque anterior usaba ScrollTrigger.getById sin registrar id y fallaba.
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach((element) => {
        gsap.fromTo(
            element,
            { y: 0 },
            {
                y: -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            }
        );
    });
}

/**
 * Animaciones de la sección de recuerdos
 */
function initMemoriesAnimations() {
    // Animar foto principal
    const memoryMain = document.querySelector('.memory-main');
    if (memoryMain) {
        gsap.from(memoryMain, {
            scrollTrigger: {
                trigger: memoryMain,
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: "back.out"
        });

        // Efecto hover suave en la foto
        const memoryPhoto = memoryMain.querySelector('.memory-photo');
        if (memoryPhoto) {
            memoryPhoto.addEventListener('mouseenter', () => {
                gsap.to(memoryPhoto, {
                    duration: 0.4,
                    scale: 1.05,
                    ease: "power2.out"
                });
            });

            memoryPhoto.addEventListener('mouseleave', () => {
                gsap.to(memoryPhoto, {
                    duration: 0.4,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        }
    }

    // Animar tarjetas de recuerdos
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: memoryCards[0],
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            rotation: -5,
            ease: "back.out",
            delay: index * 0.15
        });

        // Efecto al pasar el mouse
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                rotation: -2,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                rotation: 0,
                ease: "power2.out"
            });
        });
    });
}

/**
 * Animaciones de la sección timeline
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        // Animar línea de entrada
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            x: (index % 2 === 0) ? -50 : 50,
            opacity: 0,
            ease: "power2.out"
        });

        // Efecto en el punto de la línea
        const timelineDot = item.querySelector('.timeline-dot');
        if (timelineDot) {
            timelineDot.addEventListener('mouseenter', () => {
                gsap.to(timelineDot, {
                    duration: 0.3,
                    scale: 1.3,
                    boxShadow: '0 0 0 15px rgba(255, 107, 157, 0.3)',
                    ease: "power2.out"
                });
            });

            timelineDot.addEventListener('mouseleave', () => {
                gsap.to(timelineDot, {
                    duration: 0.3,
                    scale: 1,
                    boxShadow: '0 0 0 8px rgba(255, 107, 157, 0.2)',
                    ease: "power2.out"
                });
            });
        }
    });

    // Animar contenido de la línea de tiempo
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach((content) => {
        gsap.from(content, {
            scrollTrigger: {
                trigger: content,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.6,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });
    });
}

/**
 * Animaciones de la sección final
 */
function initFinalAnimations() {
    const finalSection = document.querySelector('.final-section');
    if (!finalSection) return;

    // Animar líneas de mensaje
    const messageLines = document.querySelectorAll('.final-message-line');
    messageLines.forEach((line, index) => {
        gsap.from(line, {
            scrollTrigger: {
                trigger: finalSection,
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "back.out",
            delay: index * 0.4
        });
    });

    // Animar corazón final
    const finalHeart = document.querySelector('.final-heart');
    if (finalHeart) {
        gsap.from(finalHeart, {
            scrollTrigger: {
                trigger: finalSection,
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: "elastic.out(1.2, 0.5)",
            delay: 1.2
        });

        // Latido continuo del corazón final
        gsap.to(finalHeart, {
            scale: 1.2,
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Animar partículas de luz
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        gsap.fromTo(particle, {
            opacity: 0,
            y: 0,
            x: 0
        }, {
            opacity: 0,
            y: -100,
            x: (Math.random() - 0.5) * 100,
            duration: 3,
            repeat: -1,
            ease: "none",
            delay: index * 0.8
        });
    });
}

/**
 * Efectos especiales del mouse en elementos interactivos
 */
function initMouseEffects() {
    const interactiveElements = document.querySelectorAll('[data-interactive]');

    interactiveElements.forEach((element) => {
        element.addEventListener('mouseenter', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
}

/**
 * Animar elementos nav en scroll
 */
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            gsap.to(navbar, {
                duration: 0.3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)'
            });
        } else {
            gsap.to(navbar, {
                duration: 0.3,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            });
        }
    });
}

/**
 * Inicializar todas las animaciones
 */
function initAllAnimations() {
    initMouseEffects();
    initNavbarAnimations();

    // Forzar reflow para asegurar que las animaciones se ejecuten
    ScrollTrigger.refresh();
}

// Ejecutar cuando esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// Refrescar ScrollTrigger cuando la ventana se redimensiona
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
