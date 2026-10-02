/* ju4nacademy · app.js — JS ligero, sin dependencias */
(() => {
  'use strict';

  /* ===== CONFIGURACIÓN (edita aquí) ===== */
  const CONFIG = {
    instagram: 'ju4n_Tech.404',
    // Opcional: endpoint tipo Formspree ("https://formspree.io/f/xxxx"). Vacío = el mensaje se copia y se abre Instagram.
    formEndpoint: '',
    // Opcional: tu proxy de IA (backend). NUNCA pongas una API key en este archivo.
    botEndpoint: ''
  };
  const IG_URL = `https://ig.me/m/${CONFIG.instagram}`;

  /* ===== CONTENIDO (reemplaza por tus cursos reales) ===== */
  const COURSES = [
    { area: 'reparacion',   title: 'Diagnóstico y reparación de PC', desc: 'Detecta fallas de hardware y software y corrígelas paso a paso.', meta: 'video · pdf · diagramas', href: 'cursos.html' },
    { area: 'optimizacion', title: 'Optimización de sistemas',       desc: 'Haz que un equipo lento vuelva a rendir.',                          meta: 'video · pdf',             href: 'cursos.html' },
    { area: 'web',          title: 'Desarrollo web desde cero',      desc: 'HTML, CSS y JavaScript construyendo cosas reales.',                  meta: 'video · pdf · código',    href: 'cursos.html' },
    { area: 'seguridad',    title: 'Seguridad informática básica',   desc: 'Protege tus cuentas, equipos y datos.',                              meta: 'video · pdf',             href: 'cursos.html' },
    { area: 'video',        title: 'Edición de video',               desc: 'De material en bruto a un video terminado.',                         meta: 'video · pdf',             href: 'cursos.html' }
  ];
  const PATHS = {
    reparacion:   { label: 'Arreglar mi PC',  cmd: 'ju4n fix --pc',      steps: ['Diagnóstico y reparación de PC', 'Optimización de sistemas', 'Seguridad informática básica'] },
    web:          { label: 'Crear una web',   cmd: 'ju4n build --web',   steps: ['Desarrollo web desde cero', 'Seguridad informática básica'] },
    seguridad:    { label: 'Protegerme',      cmd: 'ju4n protect --me',  steps: ['Seguridad informática básica', 'Optimización de sistemas'] },
    video:        { label: 'Editar video',    cmd: 'ju4n edit --video',  steps: ['Edición de video', 'Optimización de sistemas'] }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = t => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };

  /* ===== Tema claro/oscuro ===== */
  $('#theme').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ===== Menú móvil ===== */
  const menu = $('.menu'), nav = $('#nav');
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded', nav.classList.toggle('open')));
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });

  /* ===== Terminal con tipeo ===== */
  const lines = [
    '$ ju4n learn --gratis',
    '> reparación · optimización · web',
    '> seguridad · edición de video',
    '> sin registro. con PDFs. $0.'
  ].join('\n');
  const out = $('#typed');
  if (reduced) out.textContent = lines;
  else { let i = 0; (function t() { out.textContent = lines.slice(0, ++i); if (i < lines.length) setTimeout(t, 28); })(); }

  /* ===== Borde lumínico que sigue al cursor ===== */
  const glows = () => document.querySelectorAll('.glow');
  document.addEventListener('pointermove', e => {
    glows().forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  }, { passive: true });

  /* ===== Reveal al hacer scroll ===== */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ===== Cursos ===== */
  $('#grid').innerHTML = COURSES.map(c => `
    <a class="card glow" href="${c.href}" style="text-decoration:none;display:block">
      <small>./${c.area}</small><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><div class="meta">${esc(c.meta)}</div>
    </a>`).join('');

  /* ===== Ruta interactiva ===== */
  const chips = $('.chips'), route = $('#route');
  chips.innerHTML = Object.entries(PATHS).map(([k, p]) => `<button class="chip" role="radio" aria-checked="false" data-k="${k}">${esc(p.label)}</button>`).join('');
  function showPath(k) {
    const p = PATHS[k];
    chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-checked', c.dataset.k === k));
    route.innerHTML = `<span class="cmd">$ ${p.cmd}</span><ol>${p.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`;
  }
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) showPath(b.dataset.k); });
  route.innerHTML = '<span class="cmd">$</span> elige un objetivo para ver tu ruta sugerida…';

  /* ===== Formulario de contacto ===== */
  const form = $('#form'), status = $('#status'), btn = form.querySelector('button[type=submit]');
  const rules = {
    nombre: v => v.trim().length >= 2 || 'Escribe tu nombre.',
    tema: v => !!v || 'Elige un tema.',
    mensaje: v => v.trim().length >= 10 || 'Cuéntame un poco más (mín. 10 caracteres).'
  };
  function validate(field) {
    const ok = rules[field.name](field.value);
    field.setAttribute('aria-invalid', ok !== true);
    field.parentElement.querySelector('.err').textContent = ok === true ? '' : ok;
    return ok === true;
  }
  form.querySelectorAll('input[name=nombre],select,textarea').forEach(f => f.addEventListener('blur', () => validate(f)));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.web.value) return; // honeypot anti-bots
    const fields = [...form.querySelectorAll('input[name=nombre],select,textarea')];
    if (!fields.map(validate).every(Boolean)) { status.textContent = 'Revisa los campos marcados.'; return; }

    const data = Object.fromEntries(new FormData(form));
    const text = `Hola, soy ${data.nombre}. [${data.tema}] ${data.mensaje}`;
    btn.disabled = true; btn.querySelector('.spin').hidden = false; btn.querySelector('.lbl').textContent = 'Enviando…';
    status.textContent = '';
    try {
      if (CONFIG.formEndpoint) {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error('http');
        status.textContent = '✓ Mensaje enviado. Te respondo pronto.';
      } else {
        await new Promise(r => setTimeout(r, 700));
        try { await navigator.clipboard.writeText(text); } catch (_) {}
        status.innerHTML = `✓ Mensaje listo y copiado. <a href="${IG_URL}" target="_blank" rel="noopener">Abrir Instagram y pegarlo →</a>`;
      }
      form.reset();
    } catch (_) {
      status.textContent = 'No se pudo enviar. Inténtalo de nuevo.';
    } finally {
      btn.disabled = false; btn.querySelector('.spin').hidden = true; btn.querySelector('.lbl').textContent = 'Enviar mensaje';
    }
  });

  /* ===== Mini-bot ===== */
  const fab = $('#bot-fab'), panel = $('#bot-panel'), log = $('#bot-log'), quick = $('#bot-quick'), bform = $('#bot-form'), bin = $('#bot-in');
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const KB = [
    { k: ['gratis', 'costo', 'precio', 'pagar', 'cuesta'], a: 'Todos los cursos son 100% gratuitos, sin tarjeta.' },
    { k: ['curso', 'aprender', 'temas', 'que hay'], a: 'Hay cursos de reparación, optimización, desarrollo web, seguridad y edición de video. Mira la sección Cursos.' },
    { k: ['material', 'pdf', 'video', 'descargar'], a: 'Cada curso incluye videos, PDFs descargables y diagramas.' },
    { k: ['quien', 'autor', 'juan', 'fundador'], a: 'Lo creó Juan, autodidacta en informática. Puedes ver su portafolio en <a href="https://ju4nstudio.online" rel="noopener">ju4nstudio.online</a>.' },
    { k: ['contacto', 'contactar', 'escribir', 'hablar', 'instagram', 'asesoria', 'ayuda'], a: `Escríbele desde el formulario de la página o por <a href="${IG_URL}" target="_blank" rel="noopener">Instagram</a>.` },
    { k: ['hola', 'buenas', 'hey'], a: '¡Hola! Pregúntame por los cursos, el material o cómo contactar.' }
  ];
  const FALLBACK = `Eso no lo tengo claro. Mejor pregúntaselo directo por <a href="${IG_URL}" target="_blank" rel="noopener">Instagram</a>.`;

  function say(html, who) {
    const m = document.createElement('div');
    m.className = `msg ${who}`; m.innerHTML = html;
    log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
  }
  async function reply(q) {
    if (CONFIG.botEndpoint) { // modo IA real vía tu backend
      try {
        const r = await fetch(CONFIG.botEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q }) });
        const j = await r.json(); return esc(j.reply || '').replace(/\n/g, '<br>') || FALLBACK;
      } catch (_) { return FALLBACK; }
    }
    const n = norm(q);
    const hit = KB.find(x => x.k.some(w => n.includes(w)));
    return hit ? hit.a : FALLBACK;
  }
  async function ask(q) {
    q = q.trim(); if (!q) return;
    say(esc(q), 'me');
    const typing = say('…', 'bot');
    const [ans] = await Promise.all([reply(q), new Promise(r => setTimeout(r, 450))]);
    typing.innerHTML = ans; log.scrollTop = log.scrollHeight;
  }
  ['¿Es gratis?', '¿Qué cursos hay?', 'Contacto'].forEach(t => {
    const b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = t;
    b.addEventListener('click', () => ask(t)); quick.appendChild(b);
  });
  bform.addEventListener('submit', e => { e.preventDefault(); ask(bin.value); bin.value = ''; });

  let greeted = false;
  function toggleBot(open) {
    panel.hidden = !open; fab.setAttribute('aria-expanded', open);
    if (open) { if (!greeted) { say('Hola, soy el asistente de ju4nacademy. ¿En qué te ayudo?', 'bot'); greeted = true; } bin.focus(); } else fab.focus();
  }
  fab.addEventListener('click', () => toggleBot(panel.hidden));
  $('#bot-x').addEventListener('click', () => toggleBot(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) toggleBot(false); });
})();
