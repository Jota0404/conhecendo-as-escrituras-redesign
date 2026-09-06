(() => {
  'use strict';

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

  // Mobile navigation is created progressively so the base markup stays semantic.
  const desktopNav = document.querySelector('.desktop-nav');
  const headerInner = document.querySelector('.header-inner');

  if (desktopNav && headerInner) {
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
