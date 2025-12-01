// js/main.js — Interacciones, parallax leve, IntersectionObserver coreografiado

document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isVisible = getComputedStyle(nav).display !== 'none';
      nav.style.display = isVisible ? 'none' : 'flex';
    });
    window.addEventListener('resize', () => {
      nav.style.display = window.innerWidth > 640 ? 'flex' : 'none';
    });
  }

  // IntersectionObserver: entrada de secciones y barras de skills
  const sections = document.querySelectorAll('.section-enter');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skills')) {
          entry.target.querySelectorAll('.skill').forEach(s => s.classList.add('visible'));
        }
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => io.observe(s));

  // Spotlight hover en proyectos (seguimiento del cursor)
  const grid = document.getElementById('projectsGrid');
  if (grid) {
    grid.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const img = card.querySelector('.project-img');
      const rect = img.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.setProperty('--mx', `${mx}%`);
      img.style.setProperty('--my', `${my}%`);
    });
  }

  // Parallax sutil del hero visual
  const heroWrap = document.querySelector('.media-fit-wrap');
  const heroImg = document.querySelector('.photo-fit');
  if (heroWrap && heroImg) {
    heroWrap.addEventListener('mousemove', (e) => {
      const rect = heroWrap.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `translate3d(${relX * 10}px, ${relY * 8}px, 0) scale(1.01)`;
    });
    heroWrap.addEventListener('mouseleave', () => {
      heroImg.style.transform = `translate3d(0,0,0) scale(1)`;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Evita animaciones si el usuario prefiere reducir movimiento
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skills = document.querySelectorAll('.skill');

  skills.forEach(skill => {
    const span = skill.querySelector('.skill-bar span');
    if (!span) return;

    // Lee data-target, fallback a 100%
    let target = skill.getAttribute('data-target') || '100%';
    target = target.trim();

    // Si el valor es numérico sin %, añade %
    if (/^\d+(\.\d+)?$/.test(target)) target = `${target}%`;

    // Forzar valor seguro entre 0% y 100%
    const num = parseFloat(target);
    if (isNaN(num)) target = '100%';
    else if (num < 0) target = '0%';
    else if (num > 100) target = '100%';
    else target = `${Math.round(num)}%`;

    // Aplica el ancho; si reduce-motion, aplica sin transición
    if (reduceMotion) {
      span.style.transition = 'none';
      span.style.width = target;
    } else {
      // pequeña espera para permitir repintado y que la transición se vea
      requestAnimationFrame(() => {
        span.style.width = target;
      });
    }
  });
});