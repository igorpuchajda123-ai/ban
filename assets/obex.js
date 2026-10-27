/* OBEX Atelier – skrypty motywu (bez zależności) */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const S = window.Obex || { routes: {}, strings: {} };

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  /* ---------- Focus trap helpers ---------- */
  let lastFocus = null;
  const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function openLayer(el) {
    if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    const first = $$(focusable, el).find((n) => n.offsetParent !== null && !n.classList.contains('drawer__overlay') && !n.classList.contains('modal__overlay'));
    setTimeout(() => first && first.focus(), 60);
  }
  function closeLayer(el) {
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!$('.drawer.is-open, .modal.is-open, .search-overlay.is-open, .lightbox.is-open')) {
      document.body.classList.remove('is-locked');
    }
    $$('[aria-expanded="true"][data-drawer-open]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = $$('.drawer.is-open, .modal.is-open, .search-overlay.is-open, .lightbox.is-open').pop();
    if (open) closeLayer(open);
    $$('[data-nav-item].is-open').forEach(closeNav);
  });

  /* ---------- Drawers / modals ---------- */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-drawer-open]');
    if (opener) {
      e.preventDefault();
      opener.setAttribute('aria-expanded', 'true');
      openLayer(document.getElementById(opener.dataset.drawerOpen));
      return;
    }
    const cartOpener = e.target.closest('[data-cart-open]');
    if (cartOpener && document.getElementById('CartDrawer') && !document.body.classList.contains('template-cart')) {
      e.preventDefault();
      openLayer(document.getElementById('CartDrawer'));
      return;
    }
    const modalOpener = e.target.closest('[data-modal-open]');
    if (modalOpener) {
      e.preventDefault();
      openLayer(document.getElementById(modalOpener.dataset.modalOpen));
      return;
    }
    if (e.target.closest('[data-drawer-close]')) closeLayer(e.target.closest('[data-drawer]'));
    if (e.target.closest('[data-modal-close]')) closeLayer(e.target.closest('[data-modal]'));
    if (e.target.closest('[data-search-open]')) { e.preventDefault(); openLayer($('[data-search-overlay]')); }
    if (e.target.closest('[data-search-close]')) closeLayer($('[data-search-overlay]'));
  });

  /* ---------- Header ---------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  function closeNav(item) {
    item.classList.remove('is-open');
    const btn = $('.nav__link', item);
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  function openNav(item) {
    $$('[data-nav-item].is-open').forEach((o) => o !== item && closeNav(o));
    item.classList.add('is-open');
    const btn = $('.nav__link', item);
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
  $$('[data-nav-item]').forEach((item) => {
    let t;
    const btn = $('.nav__link', item);
    item.addEventListener('mouseenter', () => { clearTimeout(t); openNav(item); });
    item.addEventListener('mouseleave', () => { t = setTimeout(() => closeNav(item), 160); });
    btn.addEventListener('click', () => (item.classList.contains('is-open') ? closeNav(item) : openNav(item)));
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) closeNav(item); });
  });

  /* ---------- Localization ---------- */
  $$('[data-autosubmit]').forEach((sel) => sel.addEventListener('change', () => sel.form.submit()));

  /* ---------- Announcement rotation ---------- */
  $$('[data-announcement]').forEach((track) => {
    const msgs = $$('.announcement__msg', track);
    if (msgs.length < 2) return;
    let i = 0;
    const interval = parseInt(track.dataset.interval, 10) || 5000;
    setInterval(() => {
      const cur = msgs[i];
      cur.classList.remove('is-active');
      cur.classList.add('is-out');
      i = (i + 1) % msgs.length;
      const next = msgs[i];
      next.classList.remove('is-out');
      next.classList.add('is-active');
      setTimeout(() => cur.classList.remove('is-out'), 600);
    }, interval);
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !(window.Shopify && window.Shopify.designMode)) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('is-in'));
  }

  /* ---------- Sliders ---------- */
  document.addEventListener('click', (e) => {
    const prev = e.target.closest('[data-slider-prev]');
    const next = e.target.closest('[data-slider-next]');
    const btn = prev || next;
    if (!btn) return;
    const slider = document.getElementById(btn.dataset.sliderPrev || btn.dataset.sliderNext);
    if (!slider) return;
    const step = slider.firstElementChild ? slider.firstElementChild.getBoundingClientRect().width + 24 : slider.clientWidth;
    slider.scrollBy({ left: prev ? -step : step, behavior: 'smooth' });
  });

  /* ---------- Tabs (materials + size guide) ---------- */
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      $$('[data-panel]', root).forEach((p) => { p.hidden = p.dataset.panel !== idx; });
      $$('[data-panel-img]', root).forEach((p) => p.classList.toggle('is-active', p.dataset.panelImg === idx));
    }));
  });
  $$('[data-tabs-simple]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.setAttribute('aria-selected', String(t === tab));
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = t !== tab;
      });
    }));
  });

  /* ---------- Size calculator ---------- */
  function initSizer(root) {
    const input = $('[data-sizer-input]', root);
    const result = $('[data-sizer-result]', root);
    const apply = $('[data-sizer-apply]', root.parentElement) || $('[data-sizer-apply]', root);
    const rows = $$('tr[data-size]', root);
    const min = parseFloat(root.dataset.min) || 5;
    const max = parseFloat(root.dataset.max) || 7;
    const emptyHtml = result ? result.innerHTML : '';
    let best = null;

    const render = () => {
      const foot = parseFloat(input.value);
      best = null;
      rows.forEach((tr) => {
        tr.classList.remove('is-fit', 'is-small');
        const cell = $('[data-margin]', tr);
        if (!foot) { cell.textContent = '–'; return; }
        const margin = parseFloat(tr.dataset.length) - foot;
        if (margin < 0) { cell.textContent = S.strings.tooSmall; tr.classList.add('is-small'); return; }
        cell.textContent = `+${Math.round(margin)} mm`;
        if (!best && margin >= min) best = { tr, margin };
        if (margin >= min && margin <= max) tr.classList.add('is-fit');
      });
      if (!foot) { result.innerHTML = emptyHtml; if (apply) apply.hidden = true; return; }
      if (best) {
        best.tr.classList.add('is-fit');
        best.tr.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        result.innerHTML = `<span class="sizer__result-size">${best.tr.dataset.size}</span><span class="sizer__result-text"><strong>${S.strings.recommended}</strong>${S.strings.perfect.replace('__MARGIN__', Math.round(best.margin))}</span>`;
        if (apply) { apply.hidden = false; apply.dataset.size = best.tr.dataset.size; }
        document.dispatchEvent(new CustomEvent('obex:size-recommended', { detail: { size: best.tr.dataset.size } }));
      } else {
        result.innerHTML = `<span class="sizer__result-text">${S.strings.tooSmall}</span>`;
        if (apply) apply.hidden = true;
      }
    };
    input.addEventListener('input', render);
    if (apply) {
      apply.addEventListener('click', () => {
        const pill = $(`[data-variant-picker] .pill[data-pill-value="${CSS.escape(apply.dataset.size)}"] input`);
        if (pill) { pill.checked = true; pill.dispatchEvent(new Event('change', { bubbles: true })); }
        closeLayer(root.closest('[data-modal]'));
      });
    }
  }
  $$('[data-sizer]').forEach(initSizer);

  /* ---------- Quantity ---------- */
  document.addEventListener('click', (e) => {
    const minus = e.target.closest('[data-qty-minus]');
    const plus = e.target.closest('[data-qty-plus]');
    if (!minus && !plus) return;
    const input = (minus || plus).parentElement.querySelector('input');
    const v = Math.max(1, (parseInt(input.value, 10) || 1) + (plus ? 1 : -1));
    input.value = v;
  });

  /* ---------- Cart ---------- */
  const cartSections = () => {
    const ids = ['cart-drawer'];
    if ($('[data-cart-page]')) ids.push($('[data-cart-page]').dataset.section);
    return ids;
  };

  function renderCartSections(sections) {
    if (!sections) return;
    if (sections['cart-drawer']) {
      const html = new DOMParser().parseFromString(sections['cart-drawer'], 'text/html');
      const fresh = $('.drawer__panel', html);
      const current = $('#CartDrawer .drawer__panel');
      if (fresh && current) current.innerHTML = fresh.innerHTML;
    }
    const page = $('[data-cart-page]');
    if (page && sections[page.dataset.section]) {
      const html = new DOMParser().parseFromString(sections[page.dataset.section], 'text/html');
      const fresh = $('[data-cart-page]', html);
      if (fresh) page.innerHTML = fresh.innerHTML;
    }
  }

  function updateCount(count) {
    $$('[data-cart-count]').forEach((el) => { el.textContent = count; el.hidden = count === 0; });
  }

  async function changeLine(line, quantity) {
    const drawer = $('#CartDrawer .drawer__panel');
    if (drawer) drawer.classList.add('is-loading-grid');
    try {
      const res = await fetch(`${S.routes.cartChange}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line, quantity, sections: cartSections(), sections_url: window.location.pathname })
      });
      const data = await res.json();
      if (data.status) { toast(data.description || data.message || S.strings.error); }
      renderCartSections(data.sections);
      if (typeof data.item_count === 'number') updateCount(data.item_count);
    } catch (err) {
      toast(S.strings.error);
    } finally {
      const d = $('#CartDrawer .drawer__panel');
      if (d) d.classList.remove('is-loading-grid');
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cart-qty]');
    if (!btn) return;
    e.preventDefault();
    changeLine(parseInt(btn.dataset.cartQty, 10), parseInt(btn.dataset.qty, 10));
  });
  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-cart-input]');
    if (!input) return;
    changeLine(parseInt(input.dataset.cartInput, 10), Math.max(0, parseInt(input.value, 10) || 0));
  });

  /* ---------- Product ---------- */
  $$('[data-product]').forEach((root) => {
    const sectionId = root.dataset.section;
    const jsonEl = document.querySelector(`[data-variant-json="${sectionId}"]`);
    const variants = jsonEl ? JSON.parse(jsonEl.textContent) : [];
    const form = $('[data-product-form]', root);
    const idInput = form ? $('[data-variant-id]', form) : null;
    const addBtn = form ? $('[data-add-button]', form) : null;
    const addLabel = addBtn ? $('[data-add-label]', addBtn) : null;
    const errorEl = form ? $('[data-form-error]', form) : null;
    const picker = $('[data-variant-picker]', root);
    const priceBox = $('[data-price-container]', root);
    const saleBadge = $('[data-sale-badge]', root);
    const sticky = $('[data-sticky-atc]');
    const stickyPrice = sticky ? $('[data-sticky-price]', sticky) : null;
    const stickyAdd = sticky ? $('[data-sticky-add]', sticky) : null;

    const selectedOptions = () => {
      if (!picker) return null;
      const groups = $$('.pills', picker);
      const opts = groups.map((g) => { const c = $('input:checked', g); return c ? c.value : null; });
      return opts.includes(null) ? null : opts;
    };

    const findVariant = (opts) => opts && variants.find((v) => v.options.every((o, i) => o === opts[i]));

    function setButton(state) {
      if (!addBtn) return;
      addBtn.disabled = state !== 'add' && state !== 'choose';
      const label = state === 'add' ? S.strings.addToCart : state === 'choose' ? S.strings.selectSize : state === 'soldout' ? S.strings.soldOut : S.strings.unavailable;
      if (addLabel) addLabel.textContent = label;
      if (stickyAdd) { stickyAdd.textContent = state === 'choose' ? S.strings.selectSize : label; stickyAdd.disabled = state === 'soldout' || state === 'unavailable'; }
    }

    function onChange() {
      if (errorEl) errorEl.hidden = true;
      const opts = selectedOptions();
      $$('[data-option-value]', root).forEach((el, i) => {
        const g = $$('.pills', picker)[i];
        const c = g && $('input:checked', g);
        if (c) el.textContent = c.value;
      });
      const v = findVariant(opts);
      if (!v) { if (idInput) idInput.value = ''; setButton(opts ? 'unavailable' : 'choose'); return; }
      if (idInput) idInput.value = v.id;
      if (priceBox) priceBox.innerHTML = v.priceHtml;
      if (saleBadge) saleBadge.hidden = !v.onSale;
      if (stickyPrice) stickyPrice.textContent = v.price;
      setButton(v.available ? 'add' : 'soldout');
      const url = new URL(window.location.href);
      url.searchParams.set('variant', v.id);
      window.history.replaceState({}, '', url.toString());
    }

    if (picker) {
      picker.addEventListener('change', onChange);
      if (idInput && !idInput.value) setButton('choose');
    }

    // Rekomendacja rozmiaru z kalkulatora
    document.addEventListener('obex:size-recommended', (e) => {
      if (!picker) return;
      $$('.pill', picker).forEach((p) => p.classList.toggle('is-recommended', p.dataset.pillValue === e.detail.size));
      const hint = $('[data-size-hint]', root);
      if (hint) { $('span', hint).textContent = `${S.strings.recommended}: ${e.detail.size}`; hint.hidden = false; }
    });

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!idInput.value) {
          if (errorEl) { errorEl.textContent = S.strings.selectSize; errorEl.hidden = false; }
          if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        addBtn.classList.add('is-loading');
        const body = new FormData(form);
        body.append('sections', cartSections().join(','));
        body.append('sections_url', window.location.pathname);
        try {
          const res = await fetch(`${S.routes.cartAdd}.js`, { method: 'POST', headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, body });
          const data = await res.json();
          if (data.status) {
            if (errorEl) { errorEl.textContent = data.description || data.message; errorEl.hidden = false; }
            return;
          }
          renderCartSections(data.sections);
          const cart = await (await fetch(`${S.routes.cart}.js`)).json();
          updateCount(cart.item_count);
          openLayer(document.getElementById('CartDrawer'));
        } catch (err) {
          if (errorEl) { errorEl.textContent = S.strings.error; errorEl.hidden = false; }
        } finally {
          addBtn.classList.remove('is-loading');
        }
      });
    }

    // Sticky ATC
    if (sticky && addBtn) {
      const io = new IntersectionObserver(([en]) => {
        const show = !en.isIntersecting && en.boundingClientRect.top < 0;
        sticky.classList.toggle('is-visible', show);
        sticky.setAttribute('aria-hidden', String(!show));
        if (stickyAdd) stickyAdd.tabIndex = show ? 0 : -1;
      });
      io.observe(addBtn);
      stickyAdd.addEventListener('click', () => {
        if (!idInput.value) { picker.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        form.requestSubmit();
      });
    }

    // Gallery dots (mobile)
    const gallery = $('[data-gallery]', root);
    const dots = $$('[data-gallery-dots] span', root);
    if (gallery && dots.length) {
      gallery.addEventListener('scroll', () => {
        const i = Math.round(gallery.scrollLeft / gallery.clientWidth);
        dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
      }, { passive: true });
    }

    // Lightbox
    const lightbox = $('[data-lightbox]');
    if (lightbox) {
      const track = $('[data-lightbox-track]', lightbox);
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-lightbox-open]');
        if (!b || !track.children.length) return;
        openLayer(lightbox);
        const idx = parseInt(b.dataset.lightboxOpen, 10);
        requestAnimationFrame(() => { track.scrollLeft = track.clientWidth * idx; });
      });
      $('[data-lightbox-close]', lightbox).addEventListener('click', () => closeLayer(lightbox));
    }
  });

  /* ---------- Predictive search ---------- */
  const pInput = $('[data-predictive-input]');
  const pResults = $('[data-predictive-results]');
  if (pInput && pResults) {
    const initial = pResults.innerHTML;
    let ctrl;
    let timer;
    pInput.addEventListener('input', () => {
      clearTimeout(timer);
      const q = pInput.value.trim();
      if (q.length < 2) { pResults.innerHTML = initial; return; }
      timer = setTimeout(async () => {
        if (ctrl) ctrl.abort();
        ctrl = new AbortController();
        try {
          const url = `${S.routes.predictiveSearch}?q=${encodeURIComponent(q)}&resources[type]=product,collection,page&resources[limit]=5&section_id=predictive-search`;
          const res = await fetch(url, { signal: ctrl.signal });
          const text = await res.text();
          const html = new DOMParser().parseFromString(text, 'text/html');
          const inner = $('#shopify-section-predictive-search', html);
          pResults.innerHTML = inner ? inner.innerHTML : '';
        } catch (err) { /* przerwane */ }
      }, 220);
    });
  }

  /* ---------- Collection filters (AJAX) ---------- */
  const facets = $('[data-facets]');
  if (facets) {
    const sectionId = facets.dataset.section;
    const grid = () => $('[data-collection-grid]');
    async function load(url, push = true) {
      const g = grid();
      if (g) g.classList.add('is-loading-grid');
      const u = new URL(url, window.location.origin);
      u.searchParams.set('section_id', sectionId);
      const res = await fetch(u.toString());
      const html = new DOMParser().parseFromString(await res.text(), 'text/html');
      ['[data-collection-grid]', '[data-facets-form-wrap]', '[data-active-filters]', '[data-product-count]', '[data-sort-wrap]'].forEach((sel) => {
        const fresh = $$(sel, html);
        $$(sel).forEach((cur, i) => { const f = fresh[i] || fresh[0]; if (f) cur.innerHTML = f.innerHTML; });
      });
      u.searchParams.delete('section_id');
      if (push) window.history.pushState({ facets: true }, '', u.toString());
      bindFacetForms();
    }
    function formUrl(form) {
      const params = new URLSearchParams(new FormData(form));
      for (const [k, v] of Array.from(params.entries())) { if (v === '') params.delete(k); }
      return `${window.location.pathname}?${params.toString()}`;
    }
    function bindFacetForms() {
      $$('[data-facets-form]').forEach((form) => {
        if (form.dataset.bound) return;
        form.dataset.bound = '1';
        let t;
        form.addEventListener('change', () => { clearTimeout(t); t = setTimeout(() => load(formUrl(form)), 250); });
        form.addEventListener('submit', (e) => { e.preventDefault(); load(formUrl(form)); });
      });
    }
    bindFacetForms();
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-facet-link]');
      if (!a) return;
      e.preventDefault();
      load(a.href);
      const drawer = a.closest('[data-drawer]');
      if (drawer) closeLayer(drawer);
    });
    window.addEventListener('popstate', (e) => { if (e.state && e.state.facets) load(window.location.href, false); });
  }

  /* ---------- Footer accordions on mobile ---------- */
  const mq = window.matchMedia('(max-width: 989px)');
  const syncFooter = () => $$('[data-footer-details]').forEach((d) => { d.open = !mq.matches; });
  syncFooter();
  mq.addEventListener('change', syncFooter);
})();
