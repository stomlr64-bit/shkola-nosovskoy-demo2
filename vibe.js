// Отметка текущего варианта в переключателе
(function () {
  var v = document.documentElement.getAttribute('data-v');
  document.querySelectorAll('.switch a').forEach(function (a) {
    if (a.getAttribute('data-to') === v) a.classList.add('on');
  });
})();

// Плавное появление блоков при прокрутке
(function () {
  var els = document.querySelectorAll('.up');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (e) { io.observe(e); });
})();

// Отзывы: бегущие ленты (дублируем карточки для бесконечной прокрутки) и рейтинг
(function () {
  document.querySelectorAll('.marquee__row').forEach(function (row) {
    Array.prototype.slice.call(row.children).forEach(function (c) {
      var k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); row.appendChild(k);
    });
  });
  var r = document.querySelector('.rating');
  if (!r) return;
  var num = r.querySelector('.rating__num'), done = false;
  function run() {
    if (done) return; done = true; r.classList.add('lit');
    var target = parseFloat(num.getAttribute('data-count')), t0 = null;
    function step(t) {
      if (!t0) t0 = t; var p = Math.min((t - t0) / 1200, 1), e = 1 - Math.pow(1 - p, 3);
      num.textContent = (target * e).toFixed(1).replace('.', ',');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window)) { run(); return; }
  new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: 0.5 }).observe(r);
})();

// Шапка получает подложку после прокрутки
(function () {
  var bar = document.getElementById('bar');
  if (!bar) return;
  function f() { bar.classList.toggle('scrolled', window.scrollY > 60); }
  window.addEventListener('scroll', f, { passive: true }); f();
})();

// Лёгкий параллакс портрета на первом экране
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var imgs = document.querySelectorAll('.hero__img');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = Math.min(window.scrollY, window.innerHeight);
      imgs.forEach(function (i) { i.style.transform = 'translateY(' + (y * 0.12) + 'px) scale(1.04)'; });
      ticking = false;
    });
  }, { passive: true });
})();
