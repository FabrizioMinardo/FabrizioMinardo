// Script para el menú de navegación móvil
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;
  const html = document.documentElement;
  let scrollPosition = 0;

  if (!navToggle || !navLinks || !navOverlay) return;

  // Función para cerrar el menú
  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  // Toggle del menú móvil
  navToggle.addEventListener('click', function() {
    const isActive = !navLinks.classList.contains('active');
    
    if (isActive) {
      // Guardar posición del scroll antes de abrir el menú
      scrollPosition = window.scrollY;
      body.classList.add('menu-open');
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.width = '100%';
    } else {
      closeMenu();
    }
    
    navToggle.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    navOverlay.classList.toggle('active', isActive);
  });

  // Cerrar menú al hacer clic en el overlay
  navOverlay.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en un enlace dentro del menú
  const navLinksItems = navLinks.querySelectorAll('a');
  navLinksItems.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (!this.closest('.github-link')) {
        closeMenu();
      }
    });
  });

  // Cerrar menú al cambiar el tamaño de pantalla
  window.addEventListener('resize', function() {
    if (window.innerWidth > 480) {
      closeMenu();
    }
  });

  // Smooth scroll para los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
          closeMenu();
        }
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        if (history.pushState) {
          history.pushState(null, null, href);
        } else {
          location.hash = href;
        }
      }
    });
  });
});