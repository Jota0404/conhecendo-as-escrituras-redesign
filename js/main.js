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
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
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
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
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
      .mobile-nav-toggle{display:none;border:1px solid rgba(21,23,19,.12);background:rgba(240,235,225,.92);color:#151713;width:42px;height:42px;border-radius:12px;padding:0;align-items:center;justify-content:center;flex-direction:column;gap:4px;cursor:pointer}
      .mobile-nav-toggle span{display:block;width:16px;height:1.5px;background:currentColor;transition:transform .18s ease,opacity .18s ease}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(2){opacity:0}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
      .mobile-nav{display:none;position:absolute;left:14px;right:14px;top:calc(100% + 8px);padding:10px;background:#f0ebe1;border:1px solid rgba(21,23,19,.10);border-radius:18px;box-shadow:0 18px 50px rgba(21,23,19,.14)}
      .mobile-nav a{display:block;padding:13px 14px;border-radius:12px;font-size:14px;font-weight:600;color:#4f4d47}
      .mobile-nav a:hover,.mobile-nav a:focus-visible{background:#e1dbcf;color:#151713;outline:none}
      .mobile-nav .mobile-nav__cta{margin-top:6px;background:#e6c84f;color:#151713;text-align:center}
      .mobile-nav.is-open{display:block}
      @media(max-width:980px){.site-header .desktop-nav,.site-header .header-cta{display:none}.site-header .mobile-nav-toggle{display:flex;margin-left:auto}}
      @media(min-width:981px){.mobile-nav{display:none!important}}
      @media(prefers-reduced-motion:reduce){.mobile-nav-toggle span{transition:none}}
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
  }

  const method = document.querySelector('.method');
  if (method) {
    method.innerHTML = `
      <div class="container method-simple">
        <div class="section-intro">
          <div><p class="eyebrow">Como funciona</p><h2>Uma leitura mais completa começa olhando para o que existe ao redor do texto.</h2></div>
          <p class="method-simple__intro">A proposta combina diferentes lentes de leitura para transformar informação espalhada em uma visão mais organizada das Escrituras.</p>
        </div>
        <div class="method-steps">
          <article class="method-step"><span>01</span><div><p>Contexto histórico</p><h3>Entender o que estava acontecendo.</h3><small>Tempo, cenário e circunstâncias ajudam a aproximar o leitor do mundo do texto.</small></div></article>
          <article class="method-step"><span>02</span><div><p>Estrutura</p><h3>Perceber como a narrativa se organiza.</h3><small>Livros e acontecimentos deixam de parecer uma sequência solta quando vistos dentro de uma estrutura.</small></div></article>
          <article class="method-step method-step--accent"><span>03</span><div><p>Relações</p><h3>Enxergar como as partes se conectam.</h3><small>As conexões entre pessoas, eventos e livros ajudam a construir uma compreensão mais ampla.</small></div></article>
        </div>
        <p class="method-simple__note">O site original apresenta o curso como adequado para iniciantes ou para quem deseja recomeçar.</p>
      </div>
    `;
  }

  const preview = document.querySelector('.product-preview');
  if (preview) {
    preview.className = 'section audience';
    preview.innerHTML = `
      <div class="container audience-grid">
        <div>
          <p class="eyebrow">Antes da oferta</p>
          <h2>Para quem esta jornada pode fazer sentido?</h2>
          <p class="section-lead">Em vez de criar uma falsa prévia da plataforma, usamos esta etapa para responder uma pergunta mais útil: quem tende a encontrar valor nesta proposta?</p>
        </div>
        <div class="audience-list">
          <article><span>01</span><div><h3>Para quem quer começar</h3><p>Quem deseja estudar a Bíblia, mas ainda não encontrou um caminho organizado.</p></div></article>
          <article><span>02</span><div><h3>Para quem quer recomeçar</h3><p>Quem já tentou ler sozinho e sentiu dificuldade para manter direção ou contexto.</p></div></article>
          <article><span>03</span><div><h3>Para quem quer compreender melhor o Antigo Testamento</h3><p>Quem deseja conectar história, livros, personagens e acontecimentos em uma visão mais ampla.</p></div></article>
        </div>
      </div>
    `;
  }

  // O retrato atual ainda depende de um arquivo binário definitivo no repositório.
  // Mantemos a imagem pública original como fallback até a publicação desse asset.
  const authorImage = document.querySelector('.author-photo-wrap img');
  if (authorImage) {
    authorImage.src = 'https://static-media.hotmart.com/XRaPfgYIupbS4tyhOiMSE3ChEKM%3D/filters%3Aquality%28100%29%3Aformat%28webp%29/klickart-prod/uploads/media/file/9912713/foto.jpg';
  }
})();
