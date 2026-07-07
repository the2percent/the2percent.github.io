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
    // Desktop nav
    const nav = document.querySelector('.main-nav');
    if (nav) {
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

    // Bottom sheet nav links
    const sheetNav = document.querySelector('.sheet-nav');
    if (sheetNav) {
      const page = currentPage();
      NAV_ITEMS.forEach(function (item) {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        const isActive = item.match.some(function (m) {
          return m === page || (m === '/' && (page === 'index.html' || page === ''));
        });
        if (isActive) link.classList.add('active');
        sheetNav.appendChild(link);
      });
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var sheet = document.querySelector('.bottom-sheet');
    var backdrop = document.querySelector('.nav-backdrop');
    if (!toggle || !sheet) return;

    function setOpen(open) {
      sheet.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (backdrop) {
        backdrop.classList.toggle('is-open', open);
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!sheet.classList.contains('is-open'));
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () { setOpen(false); });
    }

    // Close on link click
    sheet.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) setOpen(false);
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
    initMobileNav();
    initScrollAnimations();
  });
})();
