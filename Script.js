// Script para el menú de navegación móvil
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  if (!navToggle || !navLinks || !navOverlay) return;

  // Función para cerrar el menú
  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  }

  // Toggle del menú móvil
  navToggle.addEventListener('click', function() {
    const isActive = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active', isActive);
    navOverlay.classList.toggle('active', isActive);
    
    // Prevenir scroll del body cuando el menú está abierto
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      closeMenu();
    }
  });

  // Cerrar menú al hacer clic en el overlay
  navOverlay.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en un enlace dentro del menú
  const navLinksItems = navLinks.querySelectorAll('a');
  navLinksItems.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Solo cerrar si no es el enlace de GitHub (que abre en nueva pestaña)
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
        
        // Cerrar menú si está abierto (para móviles)
        if (navLinks.classList.contains('active')) {
          closeMenu();
        }
        
        // Scroll suave
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Cambiar URL sin recargar
        if (history.pushState) {
          history.pushState(null, null, href);
        } else {
          location.hash = href;
        }
      }
    });
  });
});