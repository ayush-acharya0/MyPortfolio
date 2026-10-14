(() => {
    const pupils = document.querySelectorAll('.pupil');
    if (!pupils.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = [...pupils].map(el => ({ el, cx: 0, cy: 0, tx: 0, ty: 0 }));
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf = null;

    const tick = () => {
        let moving = false;

        items.forEach(it => {
            const rect = it.el.parentElement.getBoundingClientRect();
            const dx = pointer.x - (rect.left + rect.width / 2);
            const dy = pointer.y - (rect.top + rect.height / 2);
            const angle = Math.atan2(dy, dx);

            const radius = rect.width * 0.24;
            it.tx = Math.cos(angle) * radius;
            it.ty = Math.sin(angle) * radius;

            it.cx += (it.tx - it.cx) * 0.16;
            it.cy += (it.ty - it.cy) * 0.16;

            if (Math.abs(it.tx - it.cx) > 0.1 || Math.abs(it.ty - it.cy) > 0.1) {
                moving = true;
            } else {
                it.cx = it.tx;
                it.cy = it.ty;
            }

            it.el.style.transform =
                `translate(-50%, -50%) translate(${it.cx.toFixed(2)}px, ${it.cy.toFixed(2)}px)`;
        });

        raf = moving ? requestAnimationFrame(tick) : null;
    };

    const onMove = (e) => {
        const point = e.touches ? e.touches[0] : e;
        pointer = { x: point.clientX, y: point.clientY };
        if (raf === null) raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize', onMove, { passive: true });
    tick();
})();
