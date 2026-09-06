(() => {
  'use strict';

  const themeLink = document.createElement('link');
  themeLink.rel = 'stylesheet';
  themeLink.href = 'css/theme.css';
  document.head.appendChild(themeLink);

  const header = document.querySelector('[data-header]');
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const detailsGroups = document.querySelectorAll('.faq-list details');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  detailsGroups.forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      detailsGroups.forEach((other) => {
        if (other !== details) other.removeAttribute('open');
      });
    });
  });

  const desktopNav = document.querySelector('.desktop-nav');
  const headerInner = document.querySelector('.header-inner');

  if (desktopNav && headerInner) {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-toggle { display:none; border:1px solid rgba(21,23,19,.12); background:rgba(240,235,225,.92); color:#151713; width:42px; height:42px; border-radius:12px; padding:0; align-items:center; justify-content:center; flex-direction:column; gap:4px; cursor:pointer; }
      .mobile-nav-toggle span { display:block; width:16px; height:1.5px; background:currentColor; transition:transform .18s ease, opacity .18s ease; }
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(1) { transform:translateY(5.5px) rotate(45deg); }
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity:0; }
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(3) { transform:translateY(-5.5px) rotate(-45deg); }
      .mobile-nav { display:none; position:absolute; left:14px; right:14px; top:calc(100% + 8px); padding:10px; background:#f0ebe1; border:1px solid rgba(21,23,19,.10); border-radius:18px; box-shadow:0 18px 50px rgba(21,23,19,.14); }
      .mobile-nav a { display:block; padding:13px 14px; border-radius:12px; font-size:14px; font-weight:600; color:#4f4d47; }
      .mobile-nav a:hover, .mobile-nav a:focus-visible { background:#e1dbcf; color:#151713; outline:none; }
      .mobile-nav .mobile-nav__cta { margin-top:6px; background:#e6c84f; color:#151713; text-align:center; }
      .mobile-nav.is-open { display:block; }
      .site-header { position:sticky; }
      @media (max-width:980px) {
        .site-header .header-inner { min-height:68px; }
        .site-header .desktop-nav, .site-header .header-cta { display:none; }
        .site-header .mobile-nav-toggle { display:flex; margin-left:auto; }
        .site-header { position:sticky; }
      }
      @media (min-width:981px) { .mobile-nav { display:none !important; } }
      @media (prefers-reduced-motion:reduce) { .mobile-nav-toggle span { transition:none; } }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-nav');
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const mobileNav = document.createElement('nav');
    mobileNav.id = 'mobile-nav';
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Navegação móvel');
    mobileNav.innerHTML = `
      <a href="#como-funciona">Como funciona</a>
      <a href="#jornada">Jornada</a>
      <a href="#autor">Sobre o autor</a>
      <a href="#faq">FAQ</a>
      <a class="mobile-nav__cta" href="#oferta">Conhecer o curso</a>
    `;

    headerInner.appendChild(toggle);
    header.appendChild(mobileNav);

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      mobileNav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      mobileNav.classList.toggle('is-open', !open);
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    }, { passive: true });
  }
})();
