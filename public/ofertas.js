// =========================================
// NAVBAR SCROLL
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
// FADE IN
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
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all .7s ease';
        observer.observe(el);
    });
}

// =========================================
// BOTONES CARRITO (Corregido a .btn-buy)
// =========================================
function initCartButtons() {
    // Antes tenías '.btn-comprar', por eso no funcionaba
    const buttons = document.querySelectorAll('.btn-buy');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const original = button.innerText;
            button.innerText = 'Añadido ✓';
            button.style.background = 'linear-gradient(to right, #16a34a, #22c55e)';
            button.style.color = 'white';

            setTimeout(() => {
                button.innerText = original;
                button.style.background = '';
                button.style.color = '';
            }, 1800);
        });
    });
}

// =========================================
// LÓGICA DEL CARRUSEL DE OFERTAS (Faltaba esto)
// =========================================
function initOfertasCarousel() {
    const carousel = document.querySelector('.ofertas-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    function showSlide(index) {
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

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

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();
}

// =========================================
// INIT
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initFadeIn();
    initCartButtons();
    initOfertasCarousel(); // Ahora el carrusel va a arrancar
});