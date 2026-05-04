/* ============================================================
   Daniel Portnov Portfolio — script.js
   ============================================================ */

/* ---- TYPED TEXT ---- */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'AI/ML Engineer',
    'MLOps Engineer',
    'LLM Developer',
    'ML Systems Builder',
    'AV Vision Engineer',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const word = phrases[pi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 48 : 82);
  }

  setTimeout(tick, 1500);
})();


/* ---- NAVBAR SCROLL STATE ---- */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ---- HAMBURGER MENU ---- */
(function () {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    })
  );
})();


/* ---- SCROLL REVEAL (IntersectionObserver) ---- */
(function () {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('in'), delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el, i) => {
    io.observe(el);
  });

  // Stagger timeline items
  document.querySelectorAll('.tl-item.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });

  // Stagger skill cards
  document.querySelectorAll('.skill-card.reveal').forEach((el, i) => {
    el.dataset.delay = i * 70;
  });

  // Stagger edu cards
  document.querySelectorAll('.edu-card.reveal').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
})();


/* ---- COUNT-UP ANIMATION FOR STATS ---- */
(function () {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1200;
      const step   = 16;
      const steps  = Math.ceil(dur / step);
      let   count  = 0;

      const timer = setInterval(() => {
        count++;
        el.textContent = Math.round((target * count) / steps);
        if (count >= steps) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, step);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => io.observe(el));
})();
