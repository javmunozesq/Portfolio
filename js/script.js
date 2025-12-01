// js/script.js — Validador definitivo + observador de botón (re-attach y override)
(function(){
  const log = (...args) => console.log('[contact-validator]', ...args);

  function attachValidator(form) {
    if (!form) return;
    if (form.__validatorAttached) { log('Ya inicializado en este nodo.'); return; }
    form.__validatorAttached = true;
    log('Inicializando validador en form', form);

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    const submitBtn = document.getElementById('submitBtn') || form.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message || !submitBtn) {
      log('Campos faltantes. Reintentando si se reinyecta.', {
        name: !!name, email: !!email, subject: !!subject, message: !!message, submitBtn: !!submitBtn
      });
      return;
    }

    // Bloqueo submit nativo y por otros handlers
    form.addEventListener('submit', (e) => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
    form.submit = function(){ log('submit() bloqueado.'); return false; };

    function setError(el, msg) {
      el.classList.add('error'); el.setAttribute('aria-invalid','true');
      let err = el.parentNode.querySelector('.error-msg');
      if (!err) { err = document.createElement('div'); err.className = 'error-msg'; err.setAttribute('role','alert'); err.style.marginTop='6px'; el.parentNode.appendChild(err); }
      err.textContent = msg;
    }
    function clearError(el) {
      el.classList.remove('error'); el.removeAttribute('aria-invalid');
      const err = el.parentNode.querySelector('.error-msg'); if (err) err.remove();
    }

    function validateField(el) {
      const v = el.value.trim();
      if (el === name) { if (!v) { setError(el,'Por favor, escribe tu nombre.'); return false; } clearError(el); return true; }
      if (el === email) { if (!v) { setError(el,'Por favor, escribe tu correo.'); return false; } if (!emailRx.test(v)) { setError(el,'Correo no válido.'); return false; } clearError(el); return true; }
      if (el === subject) { if (!v) { setError(el,'Por favor, indica el asunto.'); return false; } clearError(el); return true; }
      if (el === message) { if (!v) { setError(el,'Por favor, escribe tu mensaje.'); return false; } clearError(el); return true; }
      return true;
    }

    function validateAll() {
      return [name,email,subject,message].every(i => validateField(i));
    }

    function toggleSubmit(reason) {
      const allFilled = [name,email,subject,message].every(i => i.value.trim().length > 0);
      const allValid = validateAll();
      const enable = allFilled && allValid;
      submitBtn.disabled = !enable;
      submitBtn.setAttribute('aria-disabled', String(!enable));
      if (!enable) {
        log('toggleSubmit -> disabled (motivo):', {
          reason: reason || 'no especificado',
          allFilled, allValid,
          values: { name: name.value, email: email.value, subject: subject.value, message: message.value }
        });
      } else {
        log('toggleSubmit -> enabled');
      }
      if (enable) submitBtn.classList.remove('disabled'); else submitBtn.classList.add('disabled');
    }

    // Inicial
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled','true');
    submitBtn.classList.add('disabled');

    // Eventos de inputs
    [name,email,subject,message].forEach(i => {
      i.addEventListener('input', () => { clearError(i); validateField(i); toggleSubmit('input'); if (status) status.textContent = ''; });
      i.addEventListener('blur', () => { validateField(i); toggleSubmit('blur'); });
    });

    // Click en botón
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (!validateAll()) { toggleSubmit('click-invalid'); if (status) status.textContent = 'Revisa los campos marcados en rojo.'; return; }
      if (status) status.textContent = 'Enviando...';
      submitBtn.disabled = true;
      setTimeout(() => {
        if (status) status.textContent = 'Mensaje enviado. Gracias, te responderé pronto.';
        form.reset();
        [name,email,subject,message].forEach(clearError);
        toggleSubmit('after-reset');
      }, 900);
    });

    // Observador sobre el botón: si otro script fuerza disabled, lo revertimos si los campos son válidos
    const btnObserver = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.type === 'attributes' && (m.attributeName === 'disabled' || m.attributeName === 'aria-disabled' || m.attributeName === 'class')) {
          // Si el botón está marcado como disabled por otro proceso, comprobamos si debe estar habilitado
          const currentlyDisabled = submitBtn.disabled;
          const shouldBeEnabled = [name,email,subject,message].every(i => i.value.trim().length > 0) && validateAll();
          if (currentlyDisabled && shouldBeEnabled) {
            log('Se detectó que otro script forzó disabled; lo revertimos porque los campos son válidos.');
            submitBtn.disabled = false;
            submitBtn.setAttribute('aria-disabled','false');
            submitBtn.classList.remove('disabled');
          } else {
            // Log para diagnóstico
            log('Cambio en atributos del botón detectado. disabled:', submitBtn.disabled, 'aria-disabled:', submitBtn.getAttribute('aria-disabled'));
          }
        }
      });
    });
    btnObserver.observe(submitBtn, { attributes: true, attributeFilter: ['disabled','aria-disabled','class'] });

    // Observador local: si el form es eliminado del DOM, marcamos para reinit
    const localMo = new MutationObserver(() => {
      if (!document.body.contains(form)) {
        log('Formulario eliminado del DOM; marcando para reinit si reaparece.');
        form.__validatorAttached = false;
        localMo.disconnect();
        btnObserver.disconnect();
      }
    });
    localMo.observe(document.documentElement, { childList: true, subtree: true });

    // Validación inicial
    toggleSubmit('initial');
    log('Validador adjuntado correctamente.');
  }

  // Observador global para re-attach si el form se reinyecta
  function startObserver() {
    const mo = new MutationObserver(() => {
      const f = document.getElementById('contactForm');
      if (f && !f.__validatorAttached) attachValidator(f);
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    // Intento inmediato
    const initial = document.getElementById('contactForm');
    if (initial) attachValidator(initial);
    log('Observador global iniciado para #contactForm.');
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
})();