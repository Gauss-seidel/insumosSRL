# Insumos S.R.L. Propuesta v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la one-page corporativa "azul + acero" de Insumos S.R.L. (HTML/CSS/JS vanilla) con catálogo ampliado, modales de ficha técnica, formulario→WhatsApp y deploy en Render, como propuesta aparte del sitio actual.

**Architecture:** Sitio estático vanilla. `index.html` = estructura semántica completa. `assets/css/styles.css` = design system con tokens CSS (azul `#013687`/`#013C7E` + acero). `assets/js/catalogo.js` = datos del catálogo (objeto JS, fuente única de verdad). `assets/js/app.js` = componente de comportamiento (modales, tabs, contadores, form→WhatsApp, scroll-spy, nav mobile). Todos los assets alojados localmente (respetando los ya descargados en `assets/img/` y `assets/video/`).

**Tech Stack:** HTML5 · CSS3 (custom properties, grid) · JS vanilla (ES6 modulos) · Playwright (tests e2e) · Render (static deploy).

**Estado de assets (ya descargados en `assets/`):**
- Logo: `assets/img/logo.jpg` (azul predominante `#013C7E`, 160×60). Se recrea como `assets/img/logo.svg` (Task 2).
- 27 fotos de producto/infra en `assets/img/` (listadas en mapeo, sección 7 del spec).
- Videos: `assets/video/informacion-general.mp4` (6.9MB), `assets/video/repartos.mp4` (10.7MB).
- `render.yaml`, `README.md`, `.gitignore` ya existen (commit eabe8ef).

**Fuente de datos:** `docs/superpowers/specs/2026-09-01-insumos-srl-v2-design.md` (sección 7 = datos de catálogo; sección 9 = contacto).

---

## Tasks

- [x] **Task 1 — Assets base**: verificar descarga de fotos (27), videos (2) y logo.jpg en `assets/`. *(hecho en sesión previa)*
- [ ] **Task 2 — Logo SVG**: recrear `assets/img/logo.svg` (azul `#013C7E`) a partir de `assets/img/logo.jpg` + favicon SVG.
- [ ] **Task 3 — `index.html`**: estructura semántica completa (header sticky, hero, contadores, nosotros+video modal, a quién servimos, catálogo, capacidad industrial, calidad/certificaciones, contacto, footer, WhatsApp flotante). SEO: title, meta description, OG, preload hero.
- [ ] **Task 4 — `assets/css/styles.css`**: design system con tokens (azul `#013687`/`#00265C`/`#001B3D`, acero `#F5F7FA`/`#E4E8EE`/`#6B7684`/`#1A2230`, acento verde `#0E9F6E`, dorado `#C9A227` solo certificaciones), Roboto + Roboto Slab, radios 8/12px, grid, breakpoints 640/768/1024/1280, mobile-first.
- [ ] **Task 5 — `assets/js/catalogo.js`**: datos catálogo (spec §7) — bobinas (térmicas/químicas/original), cintas embalaje, cintas matriciales, etiquetas, formularios. Imágenes mapeadas de `assets/img/`.
- [ ] **Task 6 — `assets/js/app.js`**: modal sistema, tabs, scroll-spy, contadores, form→WhatsApp (`wa.me/595986809607`) con fallback mailto, nav mobile, lightbox, IntersectionObserver reveal, `window.__WHATSAPP__` override.
- [ ] **Task 7 — Tests e2e (Playwright)**: tabs→productos visibles; card→modal abre con specs; form→URL WhatsApp correcta; responsive 360/768/1024/1440.
- [ ] **Task 8 — Verificación + commit + push**: checklist manual §12, revisión, commit descriptivo y push a `Gauss-seidel/insumosSRL` (main).

---
