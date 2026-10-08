const i18nDictionary = window.i18nDictionary || {};

function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;

    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');

        if (i18nDictionary && i18nDictionary[lang] && i18nDictionary[lang][key]) {
            element.innerHTML = i18nDictionary[lang][key];
        }
    });

    const activeBillingBtn = document.querySelector('.billing__option.is-active');
    const activeBilling = activeBillingBtn
        ? activeBillingBtn.getAttribute('data-billing')
        : 'monthly';

    document.querySelectorAll('.price-period').forEach(el => {
        if (activeBilling === 'annual') {
            el.textContent = lang === 'es' ? '/año' : '/year';
        } else {
            el.textContent = lang === 'es' ? '/mes' : '/month';
        }
    });

    const langButtons = document.querySelectorAll('.language');
    langButtons.forEach(langButton => {
        langButton.setAttribute(
            'aria-label',
            lang === 'es'
                ? 'Idioma actual: español'
                : 'Current language: English'
        );
    });
}

function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.language');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('preferredLang') || 'en';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
    });
}

function initApp() {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);

    initNavigation();
    initBilling();
    initLanguageToggle();
}

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();

            const isOpen = navMenu.classList.toggle('is-active');
            navMenu.classList.toggle('is-open', isOpen);
            navToggle.classList.toggle('is-active', isOpen);

            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-active', 'is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('is-active', 'is-open');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

function initBilling() {
    const billingContainer = document.querySelector('.billing');
    if (!billingContainer) return;

    const billingButtons = billingContainer.querySelectorAll('.billing__option');
    const savingBadge = billingContainer.querySelector('.billing__saving');

    function switchBilling(selectedBilling) {
        billingButtons.forEach(btn => {
            const isSelected = btn.getAttribute('data-billing') === selectedBilling;
            btn.classList.toggle('is-active', isSelected);
            btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });

        const priceValues = document.querySelectorAll('.price-val');
        const pricePeriods = document.querySelectorAll('.price-period');

        priceValues.forEach(el => el.classList.add('price-updating'));
        pricePeriods.forEach(el => el.classList.add('price-updating'));

        setTimeout(() => {
            priceValues.forEach(el => {
                const newPrice = el.getAttribute(`data-${selectedBilling}`);
                if (newPrice) {
                    el.textContent = newPrice;
                }
                el.classList.remove('price-updating');
            });

            pricePeriods.forEach(el => {
                const newPeriod = el.getAttribute(`data-${selectedBilling}`);
                if (newPeriod) {
                    el.textContent = newPeriod;
                }
                el.classList.remove('price-updating');
            });
        }, 150);
    }

    billingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-billing');
            switchBilling(mode);
        });
    });

    if (savingBadge) {
        savingBadge.addEventListener('click', () => switchBilling('annual'));
        savingBadge.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchBilling('annual');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

