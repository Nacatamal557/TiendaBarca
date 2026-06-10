// =========================================
// NAVBAR SCROLL EFFECT (Sutil y elegante)
// =========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =========================================
// INTERSECTION OBSERVER (Efecto de aparición suave)
// =========================================
function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all .6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// =========================================
// EFECTO CARRITO (Cambio dinámico de estado)
// =========================================
function initCartButtons() {
    const buttons = document.querySelectorAll('.btn-buy');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.innerText = 'Añadido ✓';
            button.style.background = 'linear-gradient(to right, #16a34a, #22c55e)';
            button.style.color = 'white';

            setTimeout(() => {
                button.innerText = 'Añadir al carrito';
                button.style.background = '';
                button.style.color = '';
            }, 1800);
        });
    });
}

// =========================================
// CARGA INICIAL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initFadeIn();
    initCartButtons();
});

// =========================================
// LOGICA DEL CARRUSEL DE EQUIPACIONES
// =========================================
function initEquipacionesCarousel() {
    const carousel = document.querySelector('.equipaciones-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Función para cambiar de slide
    function showSlide(index) {
        // Manejar desbordamientos (ciclo infinito)
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        // Remover clases activas de todos los slides y puntitos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activar el slide y puntito correspondiente
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    // Eventos para los botones de flechas
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoPlay();
        });
    }

    // Eventos para los puntitos (indicadores)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-reproducción (Cambia cada 5 segundos)
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Arrancar el carrusel
    startAutoPlay();
}

// =========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initEquipacionesCarousel();
    
    // Si tenías las otras funciones de los botones del carrito acá, 
    // asegúrate de que también se ejecuten dentro de este DOMContentLoaded:
    if (typeof initCartButtons === 'function') initCartButtons();
    if (typeof initFadeIn === 'function') initFadeIn();
});