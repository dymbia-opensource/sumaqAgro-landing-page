const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.site-header');

function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
}

navToggle.addEventListener('click', () => {
    setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
});

navMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('is-open') && !header.contains(event.target)) setMenu(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setMenu(false);
});

const billingOptions = document.querySelectorAll('.billing__option');

billingOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const period = option.dataset.billing;

        billingOptions.forEach((button) => {
            const active = button === option;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        document.querySelectorAll('[data-monthly][data-annual]').forEach((pricePart) => {
            pricePart.textContent = pricePart.dataset[period];
        });
    });
});

const demoButton = document.querySelector('.demo-player__play');
const demoStatus = document.querySelector('.demo-player__status');

demoButton?.addEventListener('click', () => {
    demoStatus.textContent = 'El video demostrativo se añadirá próximamente.';
    demoButton.setAttribute('aria-label', 'Video demostrativo disponible próximamente');
});
