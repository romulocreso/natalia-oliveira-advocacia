/* ===================================================
   Natalia Oliveira — Advocacia | interações + i18n
=================================================== */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  /* ---- Header com fundo ao rolar ---- */
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  const closeMenu = () => {
    nav.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* ---- Tradução PT / EN ---- */
  const STORAGE_KEY = "no-lang";
  const langButtons = document.querySelectorAll(".lang__btn");

  function applyLang(lang) {
    if (lang !== "pt" && lang !== "en") lang = "pt";

    // Conteúdo de texto (elementos com data-pt / data-en)
    document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
      const value = el.getAttribute("data-" + lang);
      if (value === null) return;
      if (el.tagName === "TITLE") {
        el.textContent = value;
      } else if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else {
        el.innerHTML = value;
      }
    });

    // Atributo lang do documento
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    // Estado dos botões
    langButtons.forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
  });

  // Idioma inicial: salvo > navegador > PT
  let initial = "pt";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) initial = saved;
    else if (navigator.language && navigator.language.toLowerCase().startsWith("en")) initial = "en";
  } catch (e) {}
  applyLang(initial);

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Ano no rodapé ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
