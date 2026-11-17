(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Mobile menu */
  const btn = $('.menu-btn'), nav = $('#nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  $$('#nav a:not(.sub-toggle)').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); btn.setAttribute('aria-expanded', false);
  }));

  /* Hero slider */
  (function () {
    const slides = $$('.hs'); if (!slides.length) return;
    const box = $('.hs-dots'); let i = 0, timer;
    slides.forEach((_, n) => {
      const d = document.createElement('button');
      d.setAttribute('aria-label', 'Go to slide ' + (n + 1));
      d.onclick = () => { go(n); play(); };
      box.appendChild(d);
    });
    const dots = [...box.children];
    function go(n) {
      slides[i].classList.remove('active'); dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active'); dots[i].classList.add('on');
    }
    function play() {
      clearInterval(timer);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => go(i + 1), 5500);
    }
    $('.hs-btn.next').onclick = () => { go(i + 1); play(); };
    $('.hs-btn.prev').onclick = () => { go(i - 1); play(); };
    const hero = $('.hslider');
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', play);
    go(0); play();
  })();

  /* Count-up stats */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(end * p) + (p === 1 ? suf : '');
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    io.unobserve(el);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => io.observe(el));

  /* Branch finder: replace this sample data with your own (or fetch from an API) */
  const branches = [
    { type: 'School', state: 'Telangana', city: 'Hyderabad', name: 'Madhapur Campus' },
    { type: 'School', state: 'Karnataka', city: 'Bengaluru', name: 'Indiranagar Campus' },
    { type: 'Coaching', state: 'Telangana', city: 'Hyderabad', name: 'Kukatpally Centre' },
    { type: 'Coaching', state: 'Tamil Nadu', city: 'Chennai', name: 'Anna Nagar Centre' }
  ];
  const fType = $('#fType'), fState = $('#fState'), fCity = $('#fCity'), out = $('#results');
  const uniq = (arr, k) => [...new Set(arr.map(b => b[k]))].sort();
  const fill = (sel, vals) => {
    sel.innerHTML = '<option value="">Choose</option>' + vals.map(v => `<option>${v}</option>`).join('');
    sel.disabled = !vals.length;
  };
  const render = () => {
    const m = branches.filter(b => (!fType.value || b.type === fType.value) &&
      (!fState.value || b.state === fState.value) && (!fCity.value || b.city === fCity.value));
    out.innerHTML = fCity.value && m.length
      ? m.map(b => `<li><b>${b.name}</b><br>${b.city}, ${b.state} (${b.type})</li>`).join('')
      : `<li>${fCity.value ? 'No branches found.' : 'Choose a type, state and city.'}</li>`;
  };
  fill(fType, uniq(branches, 'type'));
  fType.onchange = () => {
    fill(fState, fType.value ? uniq(branches.filter(b => b.type === fType.value), 'state') : []);
    fill(fCity, []); render();
  };
  fState.onchange = () => {
    fill(fCity, fState.value ? uniq(branches.filter(b => b.type === fType.value && b.state === fState.value), 'city') : []);
    render();
  };
  fCity.onchange = render;

  /* Student stories */
  const stories = [
    { q: 'Add a short, real quote from a student here.', n: 'Student name, exam and score' },
    { q: 'Regular tests showed me what to fix each week.', n: 'Another student, result' },
    { q: 'My teachers always had time for my doubts.', n: 'A third student, result' }
  ];
  let s = 0;
  const showStory = n => {
    s = (n + stories.length) % stories.length;
    $('#story blockquote').textContent = stories[s].q;
    $('#story figcaption').textContent = stories[s].n;
  };
  $('#sPrev').onclick = () => showStory(s - 1);
  $('#sNext').onclick = () => showStory(s + 1);
  showStory(0);

  /* Enquiry form: swap the fake submit for a real fetch() to your backend */
  $('#enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, msg = $('#formMsg');
    if (!f.checkValidity()) { msg.textContent = 'Please enter your name and a valid phone number.'; return; }
    msg.textContent = 'Thanks. We will call you within one working day.';
    f.reset();
  });

  /* Programs dropdown: tap to open on mobile */
  $$('.sub-toggle').forEach(t => t.addEventListener('click', e => {
    if (!matchMedia('(max-width: 860px)').matches) return;
    e.preventDefault();
    const open = t.parentElement.classList.toggle('open');
    t.setAttribute('aria-expanded', open);
  }));
  /*chatbox*/
  Tawk_API.onLoad = function() {
    Tawk_API.hideWidget();
  };
  function openLiveChat() {
      if (window.Tawk_API &&
          typeof window.Tawk_API.maximize === "function") {
          window.Tawk_API.maximize();
      }
  }

  /*chatbox*/
})();
