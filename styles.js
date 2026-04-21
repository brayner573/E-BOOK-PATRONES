/* =========================================================
   AMIGURUMIS DEL MUNDO ANIMAL — script.js
   - Año automático en el footer
   - Navbar con efecto al hacer scroll
   - Menú hamburguesa responsive
   - Animaciones de aparición al hacer scroll (Intersection Observer)
   - Scroll suave para todos los links internos
   ========================================================= */

// ---- Año automático en el footer ----
document.getElementById('year').textContent = new Date().getFullYear();


// ---- Navbar: agregar clase "scrolled" al hacer scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ---- Menú hamburguesa ----
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Cambio visual del icono
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});


// ---- Animaciones de aparición al hacer scroll ----
// Seleccionamos todos los elementos con clase fade-in o fade-up
const animatedElements = document.querySelectorAll('.fade-in, .fade-up');

const observerOptions = {
  root: null,           // viewport
  rootMargin: '0px',
  threshold: 0.12       // se activa cuando el 12% del elemento es visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Dejamos de observar una vez que ya apareció
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));


// ---- Scroll suave a secciones (compatibilidad adicional) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 70; // altura del navbar fijo
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---- Efecto hover extra: cards de oferta con pequeño shake en click ----
document.querySelectorAll('.offer-card').forEach(card => {
  card.addEventListener('click', function () {
    this.style.transition = 'transform 0.1s ease';
    this.style.transform  = 'scale(0.97)';
    setTimeout(() => {
      this.style.transform  = '';
      this.style.transition = '';
    }, 150);
  });
});


// ---- Efecto partícula suave al click en el CTA ----
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
ctaButtons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
      background: rgba(255,255,255,0.30);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.55s ease-out;
      pointer-events: none;
    `;

    // Necesitamos position relative en el botón
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Keyframe dinámico para el efecto ripple
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(styleTag);


// ---- Marcar link activo en el navbar al hacer scroll ----
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.pageYOffset >= sectionTop) {
      current = '#' + section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === current) {
      a.style.color = 'var(--terra)';
    }
  });
});
