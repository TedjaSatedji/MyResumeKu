document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav: scrolled state + scrollspy ── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── Smooth scroll for anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Typewriter ── */
  const phrases = [
    'Informatics Engineering Student',
    'full-stack & security tinkerer',
    'Flutter & IoT builder',
  ];
  const typeEl = document.getElementById('typewriter');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 55);
    } else {
      charIndex--;
      typeEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 28);
    }
  }

  type();

  /* ── Reveal on scroll ── */
  const revealElements = document.querySelectorAll(
    '.tl-item, .quest-card, .skill-group, .org-card, .stat, .about-text, .status-window, .contact-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

});
