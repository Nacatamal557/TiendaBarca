// =========================================
// NAVBAR SCROLL
// =========================================
function initNavbarScroll() {

    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }

        else {
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

    }, {
        threshold: 0.1
    });

    elements.forEach(el => {

        el.style.opacity = '0';

        el.style.transform = 'translateY(40px)';

        el.style.transition = 'all .7s ease';

        observer.observe(el);

    });

}

// =========================================
// COUNTER
// =========================================
function initCounters(){

    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.getAttribute('data-target');

            const current = +counter.innerText;

            const increment = target / 100;

            if(current < target){

                counter.innerText = `${Math.ceil(current + increment)}`;

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

}

// =========================================
// LOAD
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    initNavbarScroll();

    initFadeIn();

    initCounters();

});