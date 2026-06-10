// =========================================
// LOGIN
// =========================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            return alert("Rellena todos los campos");
        }

        if (password.length < 6) {
            return alert("Mínimo 6 caracteres");
        }

        loginForm.submit();
    });
}

// =========================================
// REGISTER
// =========================================
const registerForm = document.getElementById('registerForm');

if (registerForm) {

    registerForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const nombre = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (!nombre || !email || !password || !confirm) {
            return alert("Completa todos los campos");
        }

        if (password.length < 6) {
            return alert("La contraseña debe tener mínimo 6 caracteres");
        }

        if (password !== confirm) {
            return alert("Las contraseñas no coinciden");
        }

        registerForm.submit();
    });
}

// =========================================
// HERO CAROUSEL
// =========================================
function initHeroCarousel() {

    const images = [

        'https://images.alphacoders.com/134/thumbbig-1348433.webp',

        'https://store.fcbarcelona.com/cdn/shop/files/Mainbannermobile.jpg?v=1751433997&width=1200',

        'https://www.fcbarcelona.com/photo-resources/2026/05/10/3c3fed61-39e2-4c62-8779-1314d6d0a02a/_MGA3161.jpg?width=3200&height=1400',

        'https://www.fcbarcelona.com/photo-resources/2021/08/09/c4f2dddd-2152-4b8b-acf8-826b4377e29d/Camp-Nou-4.jpg?width=2400&height=1500'
    ];

    const container = document.querySelector('.carousel-container');

    if (!container) return;

    images.forEach((img, i) => {

        const div = document.createElement('div');

        div.classList.add('carousel-slide');

        if (i === 0) {
            div.classList.add('active');
        }

        div.style.backgroundImage = `url(${img})`;

        container.appendChild(div);
    });

    let index = 0;

    setInterval(() => {

        const slides = document.querySelectorAll('.carousel-slide');

        slides[index].classList.remove('active');

        index = (index + 1) % slides.length;

        slides[index].classList.add('active');

    }, 5000);
}

// =========================================
// NAVBAR EFFECT
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
// FADE IN EFFECT
// =========================================
function initFadeIn() {

    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0px)';
            }
        });

    }, {
        threshold: 0.2
    });

    elements.forEach(el => {

        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all .8s ease';

        observer.observe(el);
    });
}

// =========================================
// INIT
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    initHeroCarousel();
    initNavbarScroll();
    initFadeIn();

});

