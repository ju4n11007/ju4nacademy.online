// =============================================
// 1. MENÚ HAMBURGUESA
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('open');
                
                // Cambiar ícono del menú
                this.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
            }
        });
    }

    // =============================================
    // 2. ANIMACIONES DE ENTRADA (Intersection Observer)
    // =============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.course-card, .feature-card, .mission-card, .team-card, ' +
        '.contact-form-wrapper, .contact-info, .story-content, ' +
        '.hero-content, .about-content'
    );

    animatedElements.forEach(el => {
        // Añadir clase de estado inicial (invisible)
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // =============================================
    // 3. SCROLL SUAVE PARA ENLACES INTERNOS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // 4. VALIDACIÓN Y ENVÍO DEL FORMULARIO
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !subject || !message) {
                showNotification('⚠️ Por favor, completa todos los campos.', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showNotification('⚠️ Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simular envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification(
                    '✅ ¡Mensaje enviado! Te responderé en menos de 24 horas.',
                    'success'
                );
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // =============================================
    // 5. NOTIFICACIONES TOAST
    // =============================================
    function showNotification(message, type = 'success') {
        // Eliminar notificaciones existentes
        const existing = document.querySelector('.toast-notification');
        if (existing) {
            existing.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        
        // Estilos inline para que funcione sin depender del CSS
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '600',
            zIndex: '9999',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.5s ease',
            background: type === 'success' 
                ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' 
                : '#ff4444',
            color: '#ffffff'
        });

        document.body.appendChild(toast);

        // Eliminar después de 4 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(30px)';
            toast.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // =============================================
    // 6. EFECTO PARALLAX SUAVE EN HERO
    // =============================================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }, { passive: true });
    }

    // =============================================
    // 7. CONTADOR DE ESTADÍSTICAS (opcional)
    // =============================================
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text);
            if (!isNaN(number) && number < 100) {
                let current = 0;
                const increment = Math.ceil(number / 30);
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(interval);
                    }
                    stat.textContent = current + (text.includes('+') ? '+' : '');
                }, 50);
            }
        });
    }

    // Ejecutar contadores cuando los elementos sean visibles
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.hero-stats, .story-stats');
    if (statsSection) {
        statObserver.observe(statsSection);
    }

    // =============================================
    // 8. EFECTO DE TIPO ESCRITURA (opcional)
    // =============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    // Aplicar a elementos con clase .typewriter
    document.querySelectorAll('.typewriter').forEach(el => {
        const text = el.getAttribute('data-text') || el.textContent;
        typeWriter(el, text, 40);
    });
});

// =============================================
// 9. INYECTAR CSS PARA ANIMACIONES
// =============================================
// Añadir estilos de animación dinámicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Animaciones */
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    .animate-ready {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Delay para efectos escalonados */
    .course-card:nth-child(1) { transition-delay: 0.05s; }
    .course-card:nth-child(2) { transition-delay: 0.10s; }
    .course-card:nth-child(3) { transition-delay: 0.15s; }
    .course-card:nth-child(4) { transition-delay: 0.20s; }
    .course-card:nth-child(5) { transition-delay: 0.25s; }
    .course-card:nth-child(6) { transition-delay: 0.30s; }

    .feature-card:nth-child(1) { transition-delay: 0.05s; }
    .feature-card:nth-child(2) { transition-delay: 0.10s; }
    .feature-card:nth-child(3) { transition-delay: 0.15s; }
    .feature-card:nth-child(4) { transition-delay: 0.20s; }

    .mission-card:nth-child(1) { transition-delay: 0.05s; }
    .mission-card:nth-child(2) { transition-delay: 0.10s; }
    .mission-card:nth-child(3) { transition-delay: 0.15s; }

    .team-card:nth-child(1) { transition-delay: 0.05s; }
    .team-card:nth-child(2) { transition-delay: 0.10s; }
    .team-card:nth-child(3) { transition-delay: 0.15s; }
`;
document.head.appendChild(styleSheet);

// =============================================
// 10. CERRAR MENÚ AL HACER CLICK FUERA
// =============================================
document.addEventListener('click', function(e) {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks && navLinks.classList.contains('open')) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('open');
            menuToggle.textContent = '☰';
        }
    }
});

console.log('🚀 ju4nacademy - Cargado correctamente');
console.log('📚 Cursos gratuitos de informática');
console.log('💡 Aprende a tu ritmo con material descargable');