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
