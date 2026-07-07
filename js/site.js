(function () {
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home', match: ['index.html', '', '/'] },
    { href: 'performance.html', label: 'Performance', match: ['performance.html'] },
    { href: 'live-record.html', label: 'Live Record', match: ['live-record.html'] },
    { href: 'system.html', label: 'System', match: ['system.html'] },
    { href: 'infrastructure.html', label: 'Infrastructure', match: ['infrastructure.html'] },
    { href: 'methodology.html', label: 'Methodology', match: ['methodology.html'] },
    { href: 'faq.html', label: 'FAQ', match: ['faq.html'] },
    { href: 'disclosure.html', label: 'Disclosure', match: ['disclosure.html'] }
  ];

  function currentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    return file;
  }

  function initNav() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    const page = currentPage();
    NAV_ITEMS.forEach(function (item) {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      const isActive = item.match.some(function (m) {
        return m === page || (m === '/' && (page === 'index.html' || page === ''));
      });
      if (isActive) link.classList.add('active');
      nav.appendChild(link);
    });
  }

  function initScrollAnimations() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.year-bar-fill[data-w]').forEach(function (bar) {
            setTimeout(function () { bar.style.width = bar.dataset.w + '%'; }, 200);
          });
          e.target.querySelectorAll('.ratio-bar-fill[data-w]').forEach(function (bar) {
            setTimeout(function () { bar.style.width = bar.dataset.w + '%'; }, 300);
          });
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      obs.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initScrollAnimations();
  });
})();
