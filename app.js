/* ===== VARIABLES Y CONFIGURACIÓN DE TEMA ===== */
:root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #161622;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --border-color: rgba(255, 255, 255, 0.1);
    --gradient-start: #3b82f6;
    --gradient-end: #8b5cf6;
    --radius: 12px;
    --transition: all 0.25s ease;
}

[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #f1f5f9;
    --bg-card: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --border-color: rgba(0, 0, 0, 0.1);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
}

a {
    color: inherit;
    text-decoration: none;
}

/* ===== HEADER / TOP ===== */
.top {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
}

.top .logo {
    font-weight: 800;
    font-size: 1.2rem;
}

.top .logo span {
    color: var(--gradient-start);
}

.top nav {
    display: flex;
    align-items: center;
    gap: 20px;
}

.top nav a {
    color: var(--text-secondary);
    font-size: 0.9rem;
    transition: var(--transition);
}

.top nav a:hover {
    color: var(--text-primary);
}

/* ===== BOTONES E ICONOS GENERALES ===== */
.icon-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
}

.menu {
    display: none;
}

.skip {
    position: absolute;
    left: -9999px;
}

/* ===== HERO SECTION ===== */
.hero {
    padding: 60px 24px;
    max-width: 900px;
    margin: 0 auto;
}

.tag {
    font-family: 'JetBrains Mono', monospace;
    color: var(--gradient-start);
    font-size: 0.85rem;
    margin-bottom: 16px;
}

.hero h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
}

.hero h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.lead {
    color: var(--text-secondary);
    font-size: 1.1rem;
    margin-bottom: 28px;
}

.cta {
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
}

.btn {
    padding: 10px 24px;
    border-radius: 50px;
    font-weight: 600;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    color: var(--text-primary);
    cursor: pointer;
    transition: var(--transition);
    display: inline-block;
    text-align: center;
}

.btn.primary {
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    border: none;
    color: #fff;
}

.btn:hover {
    transform: translateY(-2px);
    border-color: var(--gradient-start);
}

/* ===== TERMINAL SIMULADA ===== */
.term {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}

.term-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    color: var(--text-secondary);
    font-size: 0.8rem;
}

.term-bar i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-color);
    display: inline-block;
}

.term pre {
    color: var(--gradient-start);
    white-space: pre-wrap;
}

/* ===== STATS ===== */
.stats {
    display: flex;
    gap: 40px;
    border-top: 1px solid var(--border-color);
    padding-top: 24px;
}

.stats dt {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.stats dd {
    font-size: 1.5rem;
    font-weight: 800;
}

/* ===== SECCIONES GENERALES Y SPLIT ===== */
section {
    padding: 60px 24px;
    max-width: 900px;
    margin: 0 auto;
}

.split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
}

.list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list li b {
    display: block;
    color: var(--gradient-start);
    font-size: 0.9rem;
}

.list li span {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

/* ===== CHIPS Y RUTA INTERACTIVA (JS) ===== */
.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
}

.chip {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 8px 18px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: var(--transition);
}

.chip[aria-checked="true"],
.chip:hover {
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    color: #fff;
    border-color: transparent;
}

.route {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 24px;
    margin-top: 16px;
}

.route .cmd {
    font-family: 'JetBrains Mono', monospace;
    color: var(--gradient-start);
    display: block;
    margin-bottom: 12px;
}

.route ol {
    padding-left: 20px;
    color: var(--text-secondary);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* ===== GRID DE CURSOS (INYECTADO POR JS) ===== */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 24px;
}

.card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 24px;
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-4px);
    border-color: var(--gradient-start);
}

.card small {
    font-family: 'JetBrains Mono', monospace;
    color: var(--gradient-end);
    font-size: 0.8rem;
}

.card h3 {
    font-size: 1.15rem;
    margin: 8px 0;
}

.card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 16px;
}

.card .meta {
    font-size: 0.8rem;
    color: var(--text-secondary);
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
}

/* ===== FORMULARIO DE CONTACTO ===== */
.form {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.form label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.form .full {
    grid-column: 1 / -1;
}

.form input,
.form select,
.form textarea {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 10px 14px;
    color: var(--text-primary);
    outline: none;
    font-family: inherit;
}

.form input:focus,
.form select:focus,
.form textarea:focus {
    border-color: var(--gradient-start);
}

.hp {
    display: none;
}

.err {
    color: #ff5c5c;
    font-size: 0.75rem;
}

.status {
    font-size: 0.9rem;
    color: var(--gradient-start);
}

/* ===== FOOTER Y MINI-BOT ===== */
footer {
    text-align: center;
    padding: 40px 24px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.bot-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-weight: bold;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    z-index: 1000;
}

.bot-panel {
    position: fixed;
    bottom: 85px;
    right: 24px;
    width: 320px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    overflow: hidden;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.bot-panel header {
    background: var(--bg-secondary);
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    font-size: 0.9rem;
}

.bot-log {
    padding: 16px;
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.85rem;
}

.bot-quick {
    padding: 0 16px 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

#bot-form {
    display: flex;
    border-top: 1px solid var(--border-color);
    padding: 8px;
    background: var(--bg-secondary);
}

#bot-in {
    flex: 1;
    background: none;
    border: none;
    color: var(--text-primary);
    padding: 6px;
    outline: none;
    font-size: 0.85rem;
}

.msg.me {
    text-align: right;
    color: var(--gradient-start);
}

.msg.bot {
    text-align: left;
    color: var(--text-secondary);
}

/* ===== RESPONSIVE ===== */
@media(max-width: 768px) {
    .split, .form {
        grid-template-columns: 1fr;
    }
    .hero h1 {
        font-size: 2.2rem;
    }
    .top nav {
        display: none;
    }
    .menu {
        display: block;
    }
}
