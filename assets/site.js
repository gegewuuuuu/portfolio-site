(function () {
  const introMain = document.querySelector('[data-intro-main]');
  const introCanvas = document.querySelector('[data-intro-canvas]');
  if (introMain && introCanvas) {
    const DESIGN_WIDTH = 2000;
    const DESIGN_HEIGHT = 1125;

    const syncIntroScale = () => {
      const viewportWidth = introMain.clientWidth;
      const viewportHeight = introMain.clientHeight;
      const scale = Math.max(viewportWidth / DESIGN_WIDTH, viewportHeight / DESIGN_HEIGHT);
      introCanvas.style.setProperty('--canvas-scale', String(scale));
    };

    syncIntroScale();
    window.addEventListener('resize', syncIntroScale);
  }

  const goLink = document.querySelector('[data-go-link]');
  if (goLink) {
    goLink.addEventListener('click', function (event) {
      event.preventDefault();
      goLink.classList.add('is-pressed');
      document.body.classList.add('is-leaving');
      const target = goLink.getAttribute('href');
      window.setTimeout(function () {
        window.location.href = target;
      }, 280);
    });
  }

  const revealCards = Array.from(document.querySelectorAll('[data-reveal]'));
  if (revealCards.length) {
    if (!('IntersectionObserver' in window)) {
      revealCards.forEach((card) => card.classList.add('in-view'));
    } else {
      const observer = new IntersectionObserver(
        (entries, inst) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            inst.unobserve(entry.target);
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
      );
      revealCards.forEach((card, idx) => {
        card.style.transitionDelay = `${Math.min(idx * 90, 320)}ms`;
        observer.observe(card);
      });
    }
  }

  const listRoot = document.querySelector('#collection-list');
  const titleNode = document.querySelector('#collection-title');
  if (!listRoot || !titleNode) return;

  const collections = {
    aigc: {
      title: 'AIGC Works',
      items: [
        {
          name: 'AI Portrait Narrative',
          year: '2025',
          desc: 'Prompt-driven storytelling and visual direction for portrait generation.',
          img: 'assets/img/profile.jpg',
        },
        {
          name: 'Style Transfer Study',
          year: '2024',
          desc: 'Color and mood transfer experiments for short-form visual creation.',
          img: 'assets/img/ref-detail-a.png',
        },
      ],
    },
    'vibe-coding': {
      title: 'Vibe Coding',
      items: [
        {
          name: 'Portfolio Entry Experience',
          year: '2026',
          desc: 'Landing page interaction and emotional transition from intro to content.',
          img: 'assets/img/intro-bg.jpg',
        },
        {
          name: 'Web Prototype Sprint',
          year: '2026',
          desc: 'Rapid prototype delivery with a clean information hierarchy.',
          img: 'assets/img/ref-detail-a.png',
        },
      ],
    },
    design: {
      title: 'Industrial & Interactive Design',
      items: [
        {
          name: 'Service Experience Placeholder',
          year: '2024',
          desc: 'Product-system thinking from scenario definition to interaction flow.',
          img: 'assets/img/ref-detail-b.png',
        },
      ],
    },
    pm: {
      title: 'PM Experience',
      items: [
        {
          name: 'Growth and Iteration Cases',
          year: '2024-2026',
          desc: 'This section will host PRD snapshots and iteration stories soon.',
          img: 'assets/img/ref-detail-a.png',
        },
      ],
    },
    photography: {
      title: 'Photography',
      items: [
        {
          name: 'Night Street Scene',
          year: '2025',
          desc: 'Capturing atmosphere, motion blur, and emotional framing in urban scenes.',
          img: 'assets/img/profile.jpg',
        },
        {
          name: 'Winter Window Light',
          year: '2025',
          desc: 'A quiet frame focused on geometry, texture, and ambient light.',
          img: 'assets/img/intro-bg.jpg',
        },
      ],
    },
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get('topic') || 'aigc';
  const data = collections[key] || collections.aigc;
  titleNode.textContent = data.title;

  listRoot.innerHTML = data.items
    .map(
      (item) => `
      <article class="collection-item">
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
        <time>${item.year}</time>
        <img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async" />
      </article>
    `,
    )
    .join('');
})();
