/* =========================================================
   ju4nacademy · Auth con Firebase
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuración real de ju4nacademy
const firebaseConfig = {
  apiKey: "AIzaSyDJC_8dcIxt1ldXJMHPqjbPNQf_x8mhE08",
  authDomain: "ju4nacademy.firebaseapp.com",
  projectId: "ju4nacademy",
  storageBucket: "ju4nacademy.firebasestorage.app",
  messagingSenderId: "540636119763",
  appId: "1:540636119763:web:b8d3a033d1afcb5240ca26",
  measurementId: "G-3L7QZC1458"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- Traducciones de errores Firebase ---------- */
const ERR = {
  "auth/email-already-in-use": "Ese email ya está registrado.",
  "auth/invalid-email": "Email inválido.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/user-not-found": "No existe una cuenta con ese email.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
  "auth/network-request-failed": "Sin conexión. Revisa tu internet.",
  "auth/unauthorized-domain": "Este dominio no está autorizado en Firebase."
};
const traducir = (code) => ERR[code] || "Error inesperado. Inténtalo de nuevo.";

/* ---------- Referencias DOM ---------- */
const $ = (sel) => document.querySelector(sel);

const zonaGuest  = $("#auth-guest");
const zonaUser   = $("#auth-user");
const nombreUser = $("#auth-user-name");
const avatarUser = $("#auth-user-avatar");
const modal      = $("#auth-modal");
const formEl     = $("#auth-form");
const titulo     = $("#auth-title");
const emailInp   = $("#auth-email");
const passInp    = $("#auth-pass");
const btnEnv     = $("#auth-submit");
const msgEl      = $("#auth-msg");
const btnCerrar  = $("#auth-close");
const switchTxt  = $("#auth-switch-text");
const switchBtn  = $("#auth-switch-btn");

let modo = "login"; // "login" | "registro"

/* ---------- Abrir / cerrar modal ---------- */
function abrirModal(nuevoModo = "login") {
  modo = nuevoModo;
  titulo.textContent   = modo === "login" ? "Iniciar sesión" : "Crear cuenta";
  btnEnv.textContent   = modo === "login" ? "Entrar" : "Registrarme";
  switchTxt.textContent = modo === "login" ? "¿Sin cuenta?" : "¿Ya tienes cuenta?";
  switchBtn.textContent = modo === "login" ? "Crear una" : "Inicia sesión";
  msgEl.textContent = "";
  msgEl.className = "auth-msg";
  emailInp.value = "";
  passInp.value = "";
  modal.hidden = false;
  setTimeout(() => emailInp.focus(), 50);
}

function cerrarModal() { modal.hidden = true; }

/* ---------- Acciones ---------- */
async function login(email, pass) {
  btnEnv.disabled = true;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    cerrarModal();
  } catch (e) {
    msgEl.textContent = traducir(e.code);
    msgEl.className = "auth-msg error";
  } finally {
    btnEnv.disabled = false;
  }
}

async function registrar(email, pass) {
  btnEnv.disabled = true;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const nombre = email.split("@")[0];
    await updateProfile(cred.user, { displayName: nombre });
    cerrarModal();
  } catch (e) {
    msgEl.textContent = traducir(e.code);
    msgEl.className = "auth-msg error";
  } finally {
    btnEnv.disabled = false;
  }
}

async function logout() {
  if (!confirm("¿Cerrar sesión?")) return;
  await signOut(auth);
}

/* ---------- Submit del modal ---------- */
formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = emailInp.value.trim();
  const pass  = passInp.value;
  if (!email || !pass) {
    msgEl.textContent = "Completa ambos campos.";
    msgEl.className = "auth-msg error";
    return;
  }
  modo === "login" ? login(email, pass) : registrar(email, pass);
});

/* ---------- Cambiar entre login / registro ---------- */
switchBtn.addEventListener("click", () => {
  abrirModal(modo === "login" ? "registro" : "login");
});

/* ---------- Botones del header ---------- */
$("#btn-open-login").addEventListener("click", () => abrirModal("login"));
$("#btn-open-registro").addEventListener("click", () => abrirModal("registro"));
$("#btn-logout").addEventListener("click", logout);
btnCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) cerrarModal();
});

/* ---------- Estado de sesión ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    zonaGuest.hidden = true;
    zonaUser.hidden  = false;
    const nombre = user.displayName || user.email.split("@")[0];
    nombreUser.textContent = nombre;
    avatarUser.textContent = nombre.charAt(0).toUpperCase();
  } else {
    zonaGuest.hidden = false;
    zonaUser.hidden  = true;
  }
});
