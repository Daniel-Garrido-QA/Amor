/**
 * =====================================================
 * INTERACCIONES DEL USUARIO
 * Manejo de eventos, navegación y efectos interactivos
 * ===================================================== 
 */

/**
 * Manejo del menú de navegación móvil
 */
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.hamburger');
    
    // Crear botón hamburger si no existe
    if (!navToggle && window.innerWidth <= 768) {
        createHamburgerMenu();
    }

    // Cerrar menú al hacer clic en un link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

/**
 * Crear botón hamburger para móvil
 */
function createHamburgerMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = navbar?.querySelector('.nav-container');
    
    if (!navContainer) return;

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-primary);
        cursor: pointer;
        display: none;
        z-index: 1000;
    `;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });

    // Mostrar en móvil
    const showHamburger = () => {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    };

    navContainer.insertBefore(hamburger, navContainer.querySelector('.nav-menu'));
    
    window.addEventListener('resize', showHamburger);
    showHamburger();

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
}

/**
 * Smooth scroll para navegación
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Sistema de notificaciones/toasts
 */
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#ff6b9d' : '#ee5a6f'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Manejo del evento de clic en el corazón principal
 */
function initHeartClick() {
    const mainHeart = document.getElementById('main-heart');
    if (!mainHeart) return;

    mainHeart.addEventListener('click', (event) => {
        // Crear efecto de corazones flotantes
        createFloatingHearts(event.clientX, event.clientY);
        
        // Mostrar notificación
        showNotification('💕 ¡Te amo! 💕', 'success', 2000);

        // Reproducir sonido si existe
        playHeartSound();
    });

    // Hacer el corazón interactivo (cursor pointer)
    mainHeart.style.cursor = 'pointer';
}

/**
 * Crear corazones flotantes al hacer clic
 */
function createFloatingHearts(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: floatUpHeart 2s ease-out forwards;
        `;

        document.body.appendChild(heart);

        // Ángulo de dispersión
        const angle = (i / count) * Math.PI * 2;
        const distance = 100;
        const vx = Math.cos(angle) * (distance / 2);
        const vy = Math.sin(angle) * (distance / 2) - distance / 2;

        gsap.to(heart, {
            x: vx,
            y: vy,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => heart.remove()
        });
    }
}

/**
 * Reproducir sonido de corazón (opcional)
 */
function playHeartSound() {
    // Descomentar si se desea sonido
    /*
    const audio = new Audio('{{ url_for("static", filename="sounds/heart.mp3") }}');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio error:', err));
    */
}

/**
 * Efecto de escritura para textos
 */
function initTypewriterEffect(element, text, speed = 50) {
    if (!element) return;
    
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

/**
 * Detección de desplazamiento y activación de animaciones
 */
function initScrollDetection() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase 'scroll-reveal'
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Inicializar AOS (Animate On Scroll)
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });
    }
}

/**
 * Copiar al portapapeles
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Copiado al portapapeles!', 'success', 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        showNotification('Error al copiar', 'error', 2000);
    });
}

/**
 * Compartir en redes sociales
 */
function shareOnSocial(platform, url, text) {
    let shareUrl = '';
    
    switch(platform.toLowerCase()) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/**
 * Detección de reducción de movimiento
 */
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Desactivar animaciones complejas
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }

    // Escuchar cambios en la preferencia
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        } else {
            document.documentElement.style.setProperty('--transition-fast', '0.2s ease');
            document.documentElement.style.setProperty('--transition-normal', '0.3s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
        }
    });
}

/**
 * Validación de formulario (si existe)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validación básica
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ee5a6f';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                showNotification('¡Mensaje enviado! 💕', 'success', 3000);
                form.reset();
            } else {
                showNotification('Por favor completa todos los campos', 'error', 3000);
            }
        });
    });
}

/**
 * Inicializar todo al cargar
 */
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScroll();
    initHeartClick();
    initScrollDetection();
    initAOS();
    respectReducedMotion();
    initFormValidation();

    // Agregar animación de carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        gsap.to(document.body, {
            duration: 0.5,
            opacity: 1,
            ease: "power2.out"
        });
    }, 100);
});

/**
 * Efectos hover adicionales
 */
document.addEventListener('DOMContentLoaded', function () {
    const hoverElements = document.querySelectorAll('[data-hover-effect]');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});

/**
 * Log de información en consola
 */
console.log('%c💕 Página Romántica Cargada 💕', 
    'font-size: 20px; color: #ff6b9d; font-weight: bold;');
console.log('%cUna experiencia interactiva de amor hecha con ❤️', 
    'font-size: 14px; color: #ee5a6f;');
