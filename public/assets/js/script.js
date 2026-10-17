const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'es'];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let currentLang = DEFAULT_LANG;
let currentBilling = 'monthly';

/* ---------- Internationalization ---------- */

function getDictionary(lang) {
    const dictionaries = window.i18nDictionary || {};
    return dictionaries[lang] || {};
}

function t(key, lang = currentLang) {
    const value = getDictionary(lang)[key];
    return value !== undefined ? value : getDictionary(DEFAULT_LANG)[key];
}

function getSavedLanguage() {
    try {
        const saved = localStorage.getItem('preferredLang');
        if (SUPPORTED_LANGS.includes(saved)) return saved;
    } catch (error) {
        // Storage can be unavailable (private mode); fall back to the browser language.
    }

    return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : DEFAULT_LANG;
}

function translateTree(root, lang) {
    root.querySelectorAll('[data-i18n]').forEach(element => {
        const value = t(element.getAttribute('data-i18n'), lang);
        if (value !== undefined) element.innerHTML = value;
    });

    // data-i18n-attr="aria-label:key;alt:otherKey"
    root.querySelectorAll('[data-i18n-attr]').forEach(element => {
        element.getAttribute('data-i18n-attr').split(';').forEach(pair => {
            const [attribute, key] = pair.split(':').map(part => part.trim());
            const value = t(key, lang);
            if (attribute && value !== undefined) element.setAttribute(attribute, value);
        });
    });
}

function setLanguage(lang) {
    currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

    try {
        localStorage.setItem('preferredLang', currentLang);
    } catch (error) {
        // Ignore: the choice still applies to the current visit.
    }

    document.documentElement.lang = currentLang;
    translateTree(document, currentLang);

    const pageTitle = t(document.body.dataset.titleKey || 'meta_title');
    if (pageTitle) document.title = pageTitle;

    document.querySelectorAll('.language__option').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.lang === currentLang));
    });

    updatePrices();
    updateFilterStatus();
    document.dispatchEvent(new Event('sumaq:languagechange'));
}

function initLanguageToggle() {
    document.querySelectorAll('.language__option').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
}

/* ---------- Navigation ---------- */

function initNavigation() {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const isOverlay = header && header.classList.contains('site-header--overlay');

    // Transparent glass header while it floats over the hero; solid otherwise or when the menu is open.
    const updateHeader = () => {
        if (!header) return;
        const scrolled = window.scrollY > 8;
        const overHero = isOverlay && hero
            && hero.getBoundingClientRect().bottom > header.offsetHeight
            && !(navMenu && navMenu.classList.contains('is-open'));

        header.classList.toggle('is-scrolled', scrolled && !overHero);
        header.classList.toggle('is-over-hero', Boolean(overHero));
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);

    if (!navToggle || !navMenu) return;

    const setMenu = isOpen => {
        navMenu.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', t(isOpen ? 'aria_close_menu' : 'aria_open_menu') || '');
        document.body.classList.toggle('menu-open', isOpen);
        updateHeader();
    };

    navToggle.addEventListener('click', event => {
        event.stopPropagation();
        setMenu(!navMenu.classList.contains('is-open'));
    });

    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

    document.addEventListener('click', event => {
        if (navMenu.classList.contains('is-open') && !navMenu.contains(event.target)) setMenu(false);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
            setMenu(false);
            navToggle.focus();
        }
    });

    window.matchMedia('(min-width: 1181px)').addEventListener('change', event => {
        if (event.matches) setMenu(false);
    });
}

/* ---------- Hero parallax: layers move at different speeds on scroll and with the pointer ---------- */

function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero || reducedMotion) return;

    const layers = [...hero.querySelectorAll('[data-depth]')];
    const content = hero.querySelector('.hero__content');
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let pointerX = 0;
    let pointerY = 0;
    let ticking = false;

    const render = () => {
        ticking = false;
        const scroll = Math.min(window.scrollY, hero.offsetHeight);

        layers.forEach(layer => {
            const depth = Number(layer.dataset.depth);
            const x = pointerX * depth * -30;
            const y = scroll * depth + pointerY * depth * -16;
            layer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        });

        if (content) content.style.opacity = String(Math.max(0, 1 - scroll / (hero.offsetHeight * .7)));
    };

    const requestRender = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(render);
        }
    };

    window.addEventListener('scroll', requestRender, { passive: true });

    if (finePointer) {
        hero.addEventListener('pointermove', event => {
            const rect = hero.getBoundingClientRect();
            pointerX = (event.clientX - rect.left) / rect.width - .5;
            pointerY = (event.clientY - rect.top) / rect.height - .5;
            requestRender();
        });
        hero.addEventListener('pointerleave', () => {
            pointerX = 0;
            pointerY = 0;
            requestRender();
        });
    }

    render();
}

function initActiveSection() {
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const linkById = new Map(links.map(link => [link.getAttribute('href').slice(1), link]));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                const isCurrent = link === linkById.get(entry.target.id);
                link.classList.toggle('is-current', isCurrent);
                if (isCurrent) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    linkById.forEach((link, id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

/* ---------- Solutions filter by profile (US-06) ---------- */

let activeFilter = 'all';

function updateFilterStatus() {
    const status = document.getElementById('filter-status');
    if (!status) return;

    const count = document.querySelectorAll('.solution-card.is-highlighted').length;
    status.textContent = activeFilter === 'all'
        ? ''
        : (t('filter_status') || '').replace('{count}', count);
}

function initSolutionsFilter() {
    const chips = document.querySelectorAll('.filter .chip');
    const cards = document.querySelectorAll('.solution-card[data-segments]');
    if (!chips.length || !cards.length) return;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            activeFilter = chip.dataset.filter;

            chips.forEach(item => {
                const isActive = item === chip;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            cards.forEach(card => {
                const matches = card.dataset.segments.split(' ').includes(activeFilter);
                card.classList.toggle('is-highlighted', activeFilter !== 'all' && matches);
                card.classList.toggle('is-dimmed', activeFilter !== 'all' && !matches);
            });

            updateFilterStatus();
        });
    });
}

/* ---------- Community gallery ---------- */

function initAudienceGallery() {
    const gallery = document.querySelector('[data-audience-gallery]');
    if (!gallery) return;

    const tabs = [...gallery.querySelectorAll('[data-audience-tab]')];
    const panels = [...gallery.querySelectorAll('[data-audience-panel]')];
    const playback = gallery.querySelector('[data-audience-playback]');
    const playbackLabel = gallery.querySelector('[data-audience-playback-label]');
    const playbackIcon = gallery.querySelector('[data-audience-playback-icon]');
    const status = gallery.querySelector('[data-audience-status]');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const duration = 10000;
    const pauses = new Set(['offscreen']);
    let active = 0;
    let elapsed = 0;
    let lastTime = 0;
    let frame = null;
    let userPaused = motionPreference.matches;

    const updatePlayback = () => {
        const key = userPaused ? 'audience_play' : 'audience_pause';
        playbackLabel.dataset.i18n = key;
        playbackLabel.textContent = t(key);
        playbackIcon.textContent = userPaused ? 'play_arrow' : 'pause';
        playback.setAttribute('aria-pressed', String(userPaused));
    };

    const select = (index, manual = false) => {
        active = (index + tabs.length) % tabs.length;
        elapsed = 0;
        lastTime = performance.now();
        gallery.style.setProperty('--audience-progress', '0');

        tabs.forEach((tab, i) => {
            const selected = i === active;
            tab.classList.toggle('is-active', selected);
            tab.classList.toggle('is-complete', i < active);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[i].classList.toggle('is-active', selected);
            panels[i].setAttribute('aria-hidden', String(!selected));
            panels[i].inert = !selected;
        });

        if (manual) {
            status.textContent = t('audience_status').replace('{segment}', t(`audience_tab${active + 1}`));
        }
    };

    const tick = now => {
        elapsed += Math.max(0, now - lastTime);
        lastTime = now;
        if (elapsed >= duration) select(active + 1);
        gallery.style.setProperty('--audience-progress', String(elapsed / duration));
        frame = requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
        const paused = userPaused || pauses.size > 0;
        gallery.classList.toggle('is-paused', paused);
        if (paused && frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        } else if (!paused && frame === null) {
            lastTime = performance.now();
            frame = requestAnimationFrame(tick);
        }
    };

    const setPause = (reason, paused) => {
        if (paused) pauses.add(reason);
        else pauses.delete(reason);
        syncPlayback();
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            select(index, true);
            syncPlayback();
        });
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (active + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (active - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            select(next, true);
            tabs[next].focus();
            syncPlayback();
        });
    });

    playback.addEventListener('click', () => {
        userPaused = !userPaused;
        updatePlayback();
        syncPlayback();
    });
    // Selecting or hovering a segment leaves playback under the pause button's control.
    const updateVisibility = () => setPause('document', document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    document.addEventListener('sumaq:languagechange', () => {
        status.textContent = '';
        updatePlayback();
    });
    motionPreference.addEventListener('change', event => {
        if (event.matches) userPaused = true;
        updatePlayback();
        syncPlayback();
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            setPause('offscreen', entries[0].intersectionRatio < .35);
        }, { threshold: .35 });
        observer.observe(gallery.querySelector('.audience-gallery__panels'));
    } else {
        pauses.delete('offscreen');
        userPaused = true;
    }

    select(0);
    updatePlayback();
    updateVisibility();
}

/* ---------- Pricing (US-07) ---------- */

// Amounts in céntimos keep the annual charge exactly equal to ten monthly charges.
const PLAN_CATALOG = {
    seed: { name: 'plan1_name', monthly: 4900, cta: 'plan1_btn' },
    cooperative: { name: 'plan2_name', monthly: 18900, cta: 'plan2_btn' },
    advisor: { name: 'plan3_name', monthly: 8900, cta: 'plan3_btn' }
};

function formatPlanPrice(cents, fixedDecimals = false) {
    const whole = Math.floor(cents / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const fraction = cents % 100;
    return `S/${whole}${fraction || fixedDecimals ? `,${String(fraction).padStart(2, '0')}` : ''}`;
}

function getPlanCharge(plan) {
    return plan.monthly * (currentBilling === 'annual' ? 10 : 1);
}

function getPlanContactUrl(plan) {
    const planName = currentLang === 'es' && plan.name === 'plan2_name'
        ? `plan ${t(plan.name)}`
        : t(plan.name);
    const message = t('plans_contact_message')
        .replace('{plan}', planName)
        .replace('{billing}', t(currentBilling === 'annual' ? 'plans_year' : 'plans_month').toLowerCase())
        .replace('{price}', formatPlanPrice(getPlanCharge(plan)))
        .replace('{period}', t(currentBilling === 'annual' ? 'plans_contact_year' : 'plans_contact_month'));
    return `mailto:contacto@sumaqagro.pe?subject=${encodeURIComponent(t('plans_contact_subject'))}&body=${encodeURIComponent(message)}`;
}

function updatePlanContacts() {
    document.querySelectorAll('[data-plan-contact]').forEach(link => {
        const plan = PLAN_CATALOG[link.dataset.planContact];
        if (plan) link.href = getPlanContactUrl(plan);
    });
}

function updatePrices() {
    const isAnnual = currentBilling === 'annual';

    document.querySelectorAll('[data-price-plan]').forEach(element => {
        element.textContent = formatPlanPrice(getPlanCharge(PLAN_CATALOG[element.dataset.pricePlan]));
    });

    document.querySelectorAll('[data-period]').forEach(element => {
        element.textContent = t(isAnnual ? 'plans_year_suffix' : 'plans_month_suffix') || '';
    });

    document.querySelectorAll('[data-annual-note]').forEach(element => {
        const plan = PLAN_CATALOG[element.dataset.annualNote];
        element.textContent = t('plans_annual_note').replace('{price}', formatPlanPrice(Math.round(plan.monthly * 10 / 12), true));
        element.hidden = !isAnnual;
    });

    updatePlanFinder();
    updatePlanContacts();
}

function initBilling() {
    const buttons = document.querySelectorAll('.billing__option');
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.billing === currentBilling) return;
            currentBilling = button.dataset.billing;

            buttons.forEach(item => {
                const isActive = item === button;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            // Contact links and the final recommendation change with the selected period immediately.
            updatePlanFinder();
            updatePlanContacts();

            const prices = document.querySelectorAll('.price-val');
            prices.forEach(element => element.classList.add('price-updating'));

            setTimeout(() => {
                updatePrices();
                prices.forEach(element => element.classList.remove('price-updating'));
            }, reducedMotion ? 0 : 150);
        });
    });
}

/* ---------- Plan finder (final CTA) ---------- */

function updatePlanFinder() {
    const form = document.querySelector('.plan-finder');
    if (!form) return;

    const selected = form.querySelector('input[name="plan"]:checked');
    const planId = selected ? selected.value : 'seed';
    const plan = PLAN_CATALOG[planId];
    const period = t(currentBilling === 'annual' ? 'plans_year_suffix' : 'plans_month_suffix');

    form.querySelector('[data-finder-plan]').textContent = `${t(plan.name)} · ${formatPlanPrice(getPlanCharge(plan))}${period}`;
    const contact = form.querySelector('[data-finder-cta]');
    contact.textContent = t(plan.cta);
    contact.dataset.planContact = planId;
    contact.href = getPlanContactUrl(plan);
}

function initPlanFinder() {
    const form = document.querySelector('.plan-finder');
    if (!form) return;

    form.addEventListener('change', updatePlanFinder);
}

/* ---------- Lazy video facade (US-05) ---------- */

function initVideos() {
    document.querySelectorAll('.video').forEach(video => {
        const videoId = video.dataset.videoId;
        const playButton = video.querySelector('.video__play');

        if (!videoId) {
            video.classList.add('is-unavailable');
            return;
        }

        if (!playButton) return;

        playButton.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&hl=${currentLang}`;
            iframe.title = video.dataset.videoTitle || 'Video';
            iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

            video.replaceChildren(iframe);
            iframe.focus();
        });
    });
}

/* ---------- Testimonials carousel (US-08) ---------- */

function initCarousel() {
    const track = document.querySelector('.testimonials__track');
    const prev = document.querySelector('[data-carousel="prev"]');
    const next = document.querySelector('[data-carousel="next"]');
    if (!track || !prev || !next) return;

    const step = () => {
        const card = track.querySelector('.testimonial-card');
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };

    const updateButtons = () => {
        const maxScroll = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= maxScroll;
        track.closest('.testimonials').querySelector('.carousel-controls').hidden = maxScroll <= 0;
    };

    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reducedMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reducedMotion ? 'auto' : 'smooth' }));

    track.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') next.click();
        if (event.key === 'ArrowLeft') prev.click();
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
}

/* ---------- Scroll reveal & counters ---------- */

function animateCounter(element) {
    const target = Number(element.dataset.count);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    if (!target || reducedMotion) return;

    const duration = 1200;
    const start = performance.now();

    const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');

    if (!('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            // Drop the stagger once revealed so hover and filter transitions stay instant.
            entry.target.addEventListener('transitionend', () => entry.target.style.removeProperty('transition-delay'), { once: true });
            if (entry.target.classList.contains('counter')) animateCounter(entry.target);
            obs.unobserve(entry.target);
        });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item, index) => {
        item.style.transitionDelay = `${(index % 4) * 80}ms`;
        observer.observe(item);
    });
    counters.forEach(counter => observer.observe(counter));
}

/* ---------- Legal documents in a modal (US-09) ---------- */

function initLegalDialog() {
    const dialog = document.querySelector('.legal-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const title = dialog.querySelector('#legal-dialog-title');
    const body = dialog.querySelector('.legal-dialog__body');
    const cache = new Map();

    const loadDocument = async url => {
        if (cache.has(url)) return cache.get(url);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const heading = page.querySelector('.legal-hero h1');
        const content = page.querySelector('.legal-cards');
        if (!heading || !content) throw new Error('Unexpected legal page structure');

        const legalDocument = { heading, content };
        cache.set(url, legalDocument);
        return legalDocument;
    };

    // Delegated, because translations re-render links such as the one inside the FAQ.
    document.addEventListener('click', async event => {
        const link = event.target.closest('a[data-legal]');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey) return;
        event.preventDefault();

        try {
            const { heading, content } = await loadDocument(link.href);
            title.setAttribute('data-i18n', heading.getAttribute('data-i18n') || '');
            title.textContent = heading.textContent;
            body.replaceChildren(content.cloneNode(true));
            translateTree(dialog, currentLang);
            dialog.showModal();
            body.scrollTop = 0;
        } catch (error) {
            // Opening index.html from disk blocks fetch; fall back to the full legal page.
            window.location.href = link.href;
        }
    });

    dialog.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
}

/* ---------- App ---------- */

function initApp() {
    document.documentElement.classList.add('js');

    document.querySelectorAll('[data-year]').forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    initNavigation();
    initLanguageToggle();
    initBilling();
    initPlanFinder();
    initSolutionsFilter();
    setLanguage(getSavedLanguage());

    initActiveSection();
    initHeroParallax();
    initVideos();
    initCarousel();
    initAudienceGallery();
    initReveal();
    initLegalDialog();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
