// js/components.js — Beast Mode DAM components

const inPagesFolder = location.pathname.includes('/pages/') || location.pathname.match(/\/pages(\/|$)/);

function headerLinks() {
  if (inPagesFolder) {
    return {
      home: '../index.html#inicio',
      about: '../index.html#sobre-mi',
      skills: '../index.html#habilidades',
      projects: '../index.html#proyectos',
      contact: 'contacto.html'
    };
  } else {
    return {
      home: 'index.html#inicio',
      about: 'index.html#sobre-mi',
      skills: 'index.html#habilidades',
      projects: 'index.html#proyectos',
      contact: 'pages/contacto.html'
    };
  }
}

/* Header */
class SiteHeader extends HTMLElement {
  connectedCallback(){
    const links = headerLinks();
    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <div class="logo">
            <img src="${ inPagesFolder ? '../assets/images/logo.png' : 'assets/images/logo.png' }" alt="Logo">
            <span>Javier<span class="logo-dot">.</span></span>
          </div>
          <nav class="nav" role="navigation" aria-label="Principal">
            <a href="${links.home}" class="nav-link">Inicio</a>
            <a href="${links.about}" class="nav-link">Sobre mi</a>
            <a href="${links.skills}" class="nav-link">Habilidades</a>
            <a href="${links.projects}" class="nav-link">Proyectos</a>
            <a href="${links.contact}" class="nav-link cta-link" aria-label="Ir a contacto">Contáctame</a>
          </nav>
          <button class="nav-toggle" aria-label="Abrir menú">☰</button>
        </div>
      </header>
    `;
  }
}
customElements.define('site-header', SiteHeader);

/* Footer */
class SiteFooter extends HTMLElement {
  connectedCallback(){
    const year = new Date().getFullYear();
    const contactHref = inPagesFolder ? 'contacto.html' : 'pages/contacto.html';
    const homeHref = inPagesFolder ? '../index.html' : 'index.html';
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-inner">
          <div>© ${year} Javier Muñoz Esqueta — Técnico Superior DAM</div>
          <div class="footer-links">
            <a href="mailto:jamuwork24@gmail.com">jamuwork24@gmail.com</a>
            <a href="${contactHref}">Contacto</a>
            <a href="${homeHref}">Inicio</a>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);

/* Hero Section */
class HeroSection extends HTMLElement {
  connectedCallback(){
    const cvPath = inPagesFolder ? '../assets/CV_Javier_Munoz_Esqueta.pdf' : 'assets/CV_Javier_Munoz_Esqueta.pdf';
    const projectsHref = inPagesFolder ? '../index.html#proyectos' : '#proyectos';
    const heroImg = inPagesFolder ? '../assets/images/hero.jpg' : 'assets/images/hero.jpg';

    this.innerHTML = `
      <section id="inicio" class="hero section-enter" data-animate="fade-up">
        <div class="container hero-inner">
          <div class="hero-text">
            <h1 class="title">Hola, soy Javier</h1>
            <p class="subtitle">Técnico Superior en Desarrollo de Aplicaciones Multiplataforma. Backend sólido con Java y Spring Boot, apps Android con Kotlin, multiplataforma con React Native y APIs REST bien diseñadas.</p>
            <div class="hero-cta">
              <a href="${projectsHref}" class="btn btn-primary">Ver proyectos</a>
              <a href="${cvPath}" class="btn btn-secondary" download="CV_Javier_Munoz_Esqueta.pdf" aria-label="Descargar CV en PDF">Descargar CV</a>
            </div>
            <div style="margin-top:16px">
              <span class="badge-skill">Java</span>
              <span class="badge-skill">Kotlin</span>
              <span class="badge-skill">Spring Boot</span>
              <span class="badge-skill">Android</span>
              <span class="badge-skill">React Native</span>
              <span class="badge-skill">Python</span>
              <span class="badge-skill">SQL</span>
              <span class="badge-skill">REST APIs</span>
            </div>
          </div>

          <div class="media-fit-wrap" aria-hidden="true">
            <img src="${heroImg}" alt="Javier Muñoz" class="photo-fit">
            <div class="hero-particles"></div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('hero-section', HeroSection);

class AboutSection extends HTMLElement {
  connectedCallback(){
    const photoSrc = inPagesFolder ? '../assets/images/hero.jpg' : 'assets/images/hero.jpg';
    const cvPath = inPagesFolder ? '../assets/CV_Javier_Munoz_Esqueta.pdf' : 'assets/CV_Javier_Munoz_Esqueta.pdf';
    const githubUrl = 'https://github.com/javmunozesq'; 

    this.innerHTML = `
      <section id="sobre-mi" class="section section-enter" data-animate="fade-up">
        <div class="container about-grid">
          <div>
            <h2 class="section-title">Sobre mi</h2>
            <p class="lead">Busco que el código sea claro, mantenible y rápido. Pienso en arquitectura, experiencia de usuario y despliegue desde el primer commit.</p>
            <p>Me muevo cómodo entre <strong>Java + Spring Boot</strong> para backend, <strong>Kotlin + Android</strong> para apps nativas, y <strong>React Native</strong> cuando toca multiplataforma. Diseño e integro <strong>APIs REST</strong>, trabajo con <strong>SQL</strong>, y automatizo con <strong>Python</strong> y <strong>Docker</strong>.</p>
            <div class="hero-cta" style="margin-top:10px; display:flex; gap:8px; align-items:center;">
              <a href="${cvPath}" class="btn btn-primary" download="CV_Javier_Munoz_Esqueta.pdf">Descargar CV</a>
              <a href="${githubUrl}" class="btn-github" target="_blank" rel="noopener noreferrer" aria-label="Ir a GitHub">Ver GitHub</a>
            </div>
          </div>

          <div class="about-photo-wrap" aria-hidden="true">
            <img src="${photoSrc}" alt="Javier trabajando en aplicaciones multiplataforma" class="about-photo-fit">
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('about-section', AboutSection);

// Skills Section
class SkillsSection extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <section id="habilidades" class="section skills section-enter" data-animate="fade-up">
  <div class="container">
    <h3 class="section-subtitle">Habilidades técnicas</h3>

    <div class="skills-grid">
      <div class="skill" data-target="100%">
        <strong>Frontend</strong>
        <div class="skill-bar"><span></span></div>
        <p style="margin-top:8px;font-size:13px;color:#444">JavaScript, HTML, CSS, accesibilidad, rendimiento...</p>
      </div>

      <div class="skill" data-target="92%">
        <strong>Backend</strong>
        <div class="skill-bar"><span></span></div>
        <p style="margin-top:8px;font-size:13px;color:#444">Java, Spring Boot, seguridad, testing, integración, observabilidad...</p>
      </div>

      <div class="skill" data-target="90%">
        <strong>Mobile</strong>
        <div class="skill-bar"><span></span></div>
        <p style="margin-top:8px;font-size:13px;color:#444">Android nativo (Kotlin), React Native, performance, accesibilidad...</p>
      </div>

      <div class="skill" data-target="85%">
        <strong>Data</strong>
        <div class="skill-bar"><span></span></div>
        <p style="margin-top:8px;font-size:13px;color:#444">SQL, modelado, consultas eficientes, migraciones...</p>
      </div>
    </div>
  </div>
</section>

    `;
  }
}
customElements.define('skills-section', SkillsSection);

/* Project Card */
class ProjectCard extends HTMLElement {
  connectedCallback(){
    const title = this.getAttribute('title') || 'Proyecto';
    const desc = this.getAttribute('desc') || 'Descripción breve';
    const img = this.getAttribute('img') || '';
    const demo = this.getAttribute('demo') || '#';
    const code = this.getAttribute('code') || '#';
    const imgSrc = img ? (inPagesFolder ? `../${img}` : img) : '';

    this.innerHTML = `
      <article class="project-card" tabindex="0" aria-label="Proyecto: ${title}">
        <div class="project-img" data-title="${title}">
          ${ imgSrc ? `<img src="${imgSrc}" alt="${title}">` : 'IMG' }
          <div class="project-spotlight"></div>
        </div>
        <div class="project-body">
          <h4 class="project-title">${title}</h4>
          <p class="project-desc">${desc}</p>
          <div class="project-actions">
            <a href="${demo}" class="link" target="_blank" rel="noopener">Ver demo</a>
            <a href="${code}" class="link" target="_blank" rel="noopener">Código</a>
          </div>
        </div>
      </article>
    `;
  }
}
customElements.define('project-card', ProjectCard);

/* Projects Section */
class ProjectsSection extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <section id="proyectos" class="section section-enter" data-animate="fade-up">
        <div class="container">
          <h2 class="section-title">Proyectos destacados</h2>
          <p class="lead" style="margin-bottom:16px">Apps móviles, APIs y sistemas multiplataforma con foco en rendimiento y experiencia.</p>
          <div class="projects-grid" id="projectsGrid">
            <project-card title="Gestor de Tareas Android" desc="Kotlin + Room + Retrofit. Sync con API REST y offline-first." img="assets/images/projects/proyecto1.png" demo="#" code="#"></project-card>
            <project-card title="API de Reservas" desc="Spring Boot, JWT, SQL optimizado y documentación con OpenAPI." img="assets/images/projects/proyecto2.png" demo="#" code="#"></project-card>
            <project-card title="App Multiplataforma" desc="React Native + API REST. Android/iOS con performance y accesibilidad." img="assets/images/projects/proyecto3.png" demo="#" code="#"></project-card>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('projects-section', ProjectsSection);

/* Contact Form */
class ContactForm extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <main id="mainContent">
    <section class="section section-enter contact-page" data-animate="fade-up">
      <div class="container contact-layout">
        <header class="contact-header">
          <h2 class="section-title">Hablemos de tu proyecto</h2>
          <p class="lead">Cuéntame objetivo y alcance. Te propongo arquitectura, stack y un plan claro.</p>
        </header>

        <div class="contact-grid">
          <!-- Formulario mínimo y amplio -->
          <div class="contact-main">
            <form id="contactForm" class="contact-form" action="#" method="post" novalidate>
  <div class="form-row">
    <div class="form-group">
      <label for="name">Nombre</label>
      <input id="name" name="name" type="text" required />
    </div>
    <div class="form-group">
      <label for="email">Correo electrónico</label>
      <input id="email" name="email" type="email" required />
    </div>
  </div>

  <div class="form-group">
    <label for="subject">Asunto</label>
    <input id="subject" name="subject" type="text" required />
  </div>

  <div class="form-group">
    <label for="message">Mensaje</label>
    <textarea id="message" name="message" rows="8" required></textarea>
  </div>

  <div class="form-actions">
    <button id="submitBtn" type="submit" class="btn btn-primary" aria-disabled="true" disabled>Enviar mensaje</button>
    <a class="btn btn-secondary" href="mailto:jamuwork24@gmail.com">Enviar por correo</a>
  </div>

  <p id="formStatus" class="form-status" aria-live="polite"></p>
</form>
          </div>

          <!-- Lateral: contacto directo y stack -->
          <aside class="contact-aside" aria-label="Información de contacto y disponibilidad">
            <div class="contact-card">
              <h3 class="contact-card-title">Contacto directo</h3>
              <ul class="contact-list">
                <li><strong>Email:</strong> <a href="mailto:jamuwork24@gmail.com" class="link">jamuwork24@gmail.com</a></li>
                <li><strong>Ubicación:</strong> Madrid, España</li>
                <li><strong>Disponibilidad:</strong> Parcial, remoto</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
    `;
  }
}
customElements.define('contact-form', ContactForm);

// Reintento de inicialización: dispara input y blur tras 200ms para forzar la lógica
setTimeout(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.querySelectorAll('input, textarea').forEach(i => {
    i.dispatchEvent(new Event('input', { bubbles: true }));
    i.dispatchEvent(new Event('blur', { bubbles: true }));
  });
  console.log('Revalidación forzada tras inyección del formulario.');
}, 200);