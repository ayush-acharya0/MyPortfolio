(() => {
    'use strict';

    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------- theme toggle ---------------- */
    const root = document.documentElement;
    const themeBtn = $('#themeToggle');
    const themeLabel = $('#themeLabel');
    const themeIcon = $('#themeIcon');

    const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>';
    const MOON = '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>';

    const paintTheme = () => {
        const isLight = root.dataset.theme !== 'dark';
        if (themeLabel) themeLabel.textContent = isLight ? 'Dark' : 'Light';
        if (themeIcon) themeIcon.innerHTML = isLight ? SUN : MOON;
    };
    paintTheme();

    themeBtn && themeBtn.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
        paintTheme();
    });

    /* ---------------- mobile menu ---------------- */
    const menuBtn = $('#menuBtn');
    const sidebar = $('#sidebar');
    const navLinks = $('#navLinks');

    menuBtn && menuBtn.addEventListener('click', () => {
        const open = sidebar.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
    });

    navLinks && $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    }));

    document.addEventListener('click', (e) => {
        if (!sidebar.classList.contains('open')) return;
        if (sidebar.contains(e.target) || menuBtn.contains(e.target)) return;
        sidebar.classList.remove('open');
        menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    });

    /* ---------------- scroll reveal ---------------- */
    const revealables = $$('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealables.forEach(el => io.observe(el));
    } else {
        revealables.forEach(el => el.classList.add('in'));
    }

    /* ---------------- scroll-spy (active nav link) ---------------- */
    const sections = $$('main section[id]');
    const linkFor = id => navLinks && $(`a[href="#${id}"]`, navLinks);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const link = linkFor(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    $$('a', navLinks).forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(s => spy.observe(s));
    }

    /* ---------------- project filters ---------------- */
    const filterBtns = $$('.filter');
    const cards = $$('.card');

    filterBtns.forEach(btn => btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;
        cards.forEach(card => {
            const show = category === 'all' || card.dataset.category === category;
            card.classList.toggle('hide', !show);
            if (show && !reduceMotion) {
                // re-trigger the entrance animation
                card.classList.remove('in');
                requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in')));
            }
        });
    }));

    /* ---------------- card spotlight (cursor-following light) ---------------- */
    if (!reduceMotion) $$('.card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });
})();
