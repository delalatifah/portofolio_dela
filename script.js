
/* =========================================
   1. NAVIGASI AKTIF
========================================= */

const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', function() {

        navLinks.forEach(item => {
            item.classList.remove('active');
        });

        this.classList.add('active');

    });
});


/* =========================================
   2. NAVBAR SAAT SCROLL
========================================= */

const header = document.querySelector('header');

window.addEventListener('scroll', function() {

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

}, { passive: true });


/* =========================================
   3. NAVIGASI MENGIKUTI SCROLL
========================================= */

function updateActiveNavigation() {

    let currentSection = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }

    });

}

window.addEventListener('scroll', updateActiveNavigation, {
    passive: true
});


/* =========================================
   4. ANIMASI MUNCUL SAAT SCROLL
========================================= */

const revealElements = document.querySelectorAll(`
    .section-title,
    .section-description,
    .skill-card,
    .timeline-item,
    .project-card,
    #kemampuan .skill-item,
    .contact-detail,
    .organization-section
`);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(element => {
    observer.observe(element);
});


/* =========================================
   5. EFEK ANIMASI KARTU
========================================= */

const cards = document.querySelectorAll(`
    .skill-card,
    .project-card,
    #kemampuan .skill-item,
    .contact-detail
`);

cards.forEach(card => {

    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });

});


/* =========================================
   6. ANIMASI PROGRESS BAR
   Jika menggunakan progress bar lama
========================================= */

const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const bar = entry.target;
            const width = bar.getAttribute('data-width') ||
                          bar.style.width;

            bar.style.width = '0';

            requestAnimationFrame(() => {
                bar.style.width = width;
            });

            progressObserver.unobserve(bar);

        }

    });

}, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});


/* =========================================
   7. EFEK TOMBOL LINK
========================================= */

const allButtons = document.querySelectorAll(
    '.project-info a, .contact-detail a'
);

allButtons.forEach(button => {

    button.addEventListener('mouseenter', function() {
        this.style.transition = '0.3s ease';
    });

});


/* =========================================
   8. TAHUN FOOTER OTOMATIS
========================================= */

const footerText = document.querySelector('footer p');

if (footerText) {
    footerText.textContent =
        `© Dela Latipah ${new Date().getFullYear()}. Hak cipta dilindungi.`;
}


/* =========================================
   9. UPDATE NAVIGASI SAAT HALAMAN DIBUKA
========================================= */

window.addEventListener('load', function() {

    updateActiveNavigation();

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

});

