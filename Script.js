document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;

  if (!navToggle || !navLinks || !navOverlay) return;

  /* ============================
     OPEN / CLOSE MENU
  ============================ */

  function openMenu() {
    navToggle.classList.add('active');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  navOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');

  body.style.overflow = '';
  body.style.position = '';
  body.style.top = '';
  body.style.width = '';

  // restaura la posición previa
  window.scrollTo(0, scrollPosition);
}
  /* ============================
     TOGGLE BUTTON
  ============================ */

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  /* ============================
     OVERLAY CLICK
  ============================ */

  navOverlay.addEventListener('click', closeMenu);

  /* ============================
     NAV LINKS (INTERNAL)
  ============================ */

  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      closeMenu();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  /* ============================
     CLOSE MENU ON RESIZE
  ============================ */

  window.addEventListener('resize', () => {
    if (window.innerWidth > 480 && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });
});