# Insumos S.R.L. — Propuesta v2 · Design Doc

**Fecha:** 2026-09-01
**Estado:** Aprobado por usuario (diseño)
**Tipo:** Propuesta aparte (no reemplaza insumos.com.py — demostración navegable para decisión futura)

---

## 1. Contexto

Insumos S.R.L. (Paraguay, RUC 80038724-4) es un importador → convertidor → mayorista de bobinas térmicas/químicas, cintas de embalaje, cintas matriciales, etiquetas y formularios continuos. Clientes: mayoristas, cadenas de supermercados, farmacias, estaciones de servicio y librerías.

El sitio actual (insumos.com.py, WordPress + Elementor, desarrollado por terceros) fue calificado por el cliente como "muy mal trabajo". Se construye una **propuesta independiente y mejorada** — one-page corporativa elegante — con el contenido real del sitio actual copiado y enriquecido con datos públicos relevados (catálogo ampliado, specs técnicas de versiones anteriores indexadas, RUC, perfil de importación).

## 2. Decisiones tomadas (con usuario)

| # | Tema | Decisión |
|---|---|---|
| 1 | Alcance | Propuesta aparte (demo navegable). No modifica el sitio real. |
| 2 | Estética | Corporativo azul + acero. Evolución de su identidad (#013687). |
| 3 | Estructura | Híbrida: one-page con scroll + modales de ficha técnica por producto. |
| 4 | Contacto | WhatsApp flotante global + formulario inteligente que abre WhatsApp con mensaje pre-armado. |
| 5 | Assets | Descargar y alojar localmente logo/fotos/videos reales del sitio actual + logo recreado en SVG. |
| 6 | Stack | HTML + CSS + JS vanilla. Sin build, sin dependencias (salvo Google Fonts). |

## 3. Arquitectura de archivos

```
insumosSRL/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/catalogo.js
│   ├── js/app.js
│   ├── img/            (descargados de insumos.com.py + logo.svg)
│   └── video/          (INFORMACION-GENERAL.mp4, REPARTOS.mp4)
├── docs/superpowers/specs/2026-09-01-insumos-srl-v2-design.md
```

## 4. Design system (tokens CSS)

- **Color primario:** `#013687` (azul corporativo existente)
- **Azul profundo (hero/footer):** derivado `#00265C` / `#001B3D`
- **Acero (neutros):** `#F5F7FA` (fondo claro), `#E4E8EE` (bordes), `#6B7684` (texto secundario), `#1A2230` (texto primario)
- **Acento:** `#0E9F6E` (verde éxito para WhatsApp/CTAs de conversión) o dorado `#C9A227` (premium para certificaciones) — decisión final en implementación
- **Tipografía:** Roboto (texto) + Roboto Slab (títulos) — Google Fonts
- **Radios:** `8px` cards, `12px` modales; sombras suaves de baja elevación (B2B serio, sin neón)
- **Layout:** contenedor máx `1200px`; breakpoints 640 / 768 / 1024 / 1280

## 5. Secciones (orden de scroll)

1. **Header sticky** — logo SVG, nav con scroll-spy activo, botón "Cotizar", hamburguesa mobile, comportamiento sticky con sombra al scrollear.
2. **Hero** — fondo azul profundo con overlay foto (repartidores), H1 "Aseguramos la continuidad operativa de tu negocio", subtexto, CTAs (Ver catálogo / WhatsApp), chips de confianza: 20+ años · Stock permanente · Entrega 24h · Instalaciones propias.
3. **Contadores animados** — 20+ / 780 m² / 4 vehículos / 24h (count-up con IntersectionObserver).
4. **Nosotros** — copy real del sitio + foto instalaciones + video reseña (INFORMACION-GENERAL.mp4) en modal elegante.
5. **A quién servimos** — chips con íconos: Mayoristas · Supermercados · Farmacias · Estaciones de servicio · Librerías.
6. **Catálogo** — tabs por categoría + grid de cards → modal de ficha técnica con CTA de cotización.
7. **Capacidad industrial** — diferenciador: conversión local (impresión hasta 3 colores, troquelado, duplicado/triplicado).
8. **Calidad y certificaciones** — ISO 9001 · BRCGS · 6S (etiquetados como certificaciones de la empresa, sin logos oficiales no confirmados) + banner destacado Certificado de Calidad de Imagen DNIT.
9. **Contacto** — formulario inteligente + mapa embebido + tarjetas de datos (teléfonos, emails por área, dirección).
10. **Footer** — logo, RUC, dirección, teléfonos, emails, redes, copyright.
11. **WhatsApp flotante** — ícono fijo, visible en todo momento.

## 6. Componentes

- **app.js:** modal sistema, tabs catálogo, scroll-spy, contadores, form→WhatsApp, nav mobile, lightbox fotos, IntersectionObserver reveal.
- **catalogo.js:** estructura de datos `{ id, categoria, subcategoria, nombre, medidas, imagen, specs: {...}, certificadoDnit: true|false }`.
- **Formulario inteligente:** campos nombre, empresa, email, producto de interés (select), cantidad, mensaje → valida → `https://wa.me/595986809607?text=...` pre-armado; fallback `mailto:ventas@insumos.com.py` si WhatsApp no abre.
- **Modal producto:** imagen grande, nombre, medidas, tabla de specs según tipo (micras, unidades/caja, capas, impresión), CTA cotizar + teléfono directo.

## 7. Datos del catálogo (fuente de verdad)

Incluye el catálogo visible actual **y** variedades de versiones anteriores indexadas (Google cache del sitio viejo).

**Bobinas**
- Térmicas: 57×38 · 75×75 · 75×75 (2da variante) · 80×44 · 80×55 · 80×70 · 80×75 · 80×110 · 80×300 · amarilla 80×40 · 75×55 · SH47 · 80×310 · caja 75×75
- Químicas: 75×75 duplicada · 75×75 triplicada · 75×55 duplicada · 75×55 triplicada · duplicada con impresión hasta 3 colores · bobinas impresas · obra primera 75×75
- Original: 75×75 obra 1era · SH47 · 70×55 · 70×70 · 75×55 · calculadora

**Cintas de embalaje** (con specs)
- Transparente 50 micras 48×100 m · caja ×36
- Marrón 50 micras 48×30 m · caja ×120
- 50 micras 12×30 m · caja ×144

**Cintas matriciales:** LX350 EPSON · ERC38 · SP700 · ERC38 (variante)

**Etiquetas:** balanza 28×55 Kretz · balanza 45×55 digi2 · adhesivas 45×55

**Formularios continuos:** duplicado troquelado · triplicado · triplicado troquelado

Imágenes: descargadas de `https://insumos.com.py/wp-content/uploads/2026/08/...` y `2026/09/...` (rutas mapeadas en el inventario del escaneo).

## 8. Contenido editorial (copy real copiado)

- Hero/Nosotros: "Aseguramos la continuidad operativa de tu negocio con stock permanente y entrega inmediata. Somos el socio estratégico de mayoristas, cadenas de supermercados, farmacias, estaciones de servicio y librerías que no pueden detener sus ventas por falta de insumos."
- Infraestructura: "Contamos con más de 780 m² de instalaciones propias, 4 vehículos de reparto, llegando a todo el país en 24 horas."
- Reseña histórica: "Más de dos décadas de trayectoria…" (texto completo del sitio).
- Producción/Calidad: ISO 9001, ZRX, 6S, BRCGS + "Nuestras bobinas térmicas cuentan con el Certificado de Calidad de Imagen, un respaldo técnico imprescindible para cumplir al 100% con los requerimientos normativos de la Dirección Nacional de Ingresos Tributarios (DNIT)."

## 9. Contacto (datos reales)

- Dirección: Alcides González e/ Osvaldo Kallsen, Asunción — Barrio Terminal
- Teléfonos: (021) 559 358 · (021) 559 530 · (021) 559 579
- Emails: insumos@ · administracion@ · ventas@ · licitaciones@ · mayorista@ (insumos.com.py)
- WhatsApp Ventas: `https://wa.me/595986809607`
- Social: Facebook · Instagram · YouTube (`XszqXHLqIT8`)
- Mapa: Google Maps embed `q=Insumos S.R.L.` z=14

## 10. Manejo de errores / robustez

- Imágenes con `onerror` → placeholder SVG elegante (sin icono roto).
- Form: validación de requeridos; fallback mailto si fail WhatsApp.
- Videos: `loading="lazy"` + `preload="metadata"` + poster; si el archivo es muy pesado, se integra con modal + play bajo demanda.
- Sin dependencia de red: todos los assets locales (salvo Google Fonts, con fallback system-ui).

## 11. SEO / Performance

- `<title>`, meta description, Open Graph, favicon SVG.
- `loading="lazy"` en imágenes de catálogo; hero eager + preload.
- Estructura semántica: header/nav/main/section/footer, H1 único.
- 100% responsive mobile-first.

## 12. Verificación / testing

- Checklist manual: navegación anclas, scroll-spy, tabs, modal apertura/cierre, form (mensaje WhatsApp correcto), contadores, lightbox, footer.
- Validación con Playwright (e2e-runner): click en tabs → productos visibles; click card → modal abre con specs; submit form → URL WhatsApp generada correcta; responsive en 360/768/1024/1440.
- Push al repo GitHub `Gauss-seidel/insumosSRL`.

## 12b. Deploy — Render (estático)

**Tipo:** Render **Static Site** (no web service). Sirve archivos estáticos directamente, sin servidor Python/Node (el stack vanilla lo permite; no se necesita Flask ni runtime).

**Archivos de deploy a crear en el repo root:**
- `render.yaml` — blueprint declarativo de Render (Static Site + GitHub auto-deploy).
- `README.md` — documento corto del proyecto + instrucciones de deploy manual desde el panel.
- (Opcional) `.gitignore` — evita subir basura local (`*.db`, `.env`, `node_modules` por si se agregan luego).

**`render.yaml` (contenido previsto):**
```yaml
services:
  - type: web            # Render usa "web" como tipo para static sites
    name: insumos-srl
    runtime: static
    buildCommand: ""     # vanilla: sin build
    staticPublishPath: . # raíz del repo (contiene index.html + assets/)
    routes:
      - type: rewrite
        source: /*
        destination: /index.html   # SPA fallback a la one-page
    headers:
      - path: /assets/*
        name: Cache-Control
        value: public,max-age=31536000,immutable  # assets versionados = cache largo
    envVars:
      - key: WHATSAPP_NUMBER   # +595... (sin espacios) para mensajes de cotización
        value: 595986809607
```

**Pasos manuales alternativos (sin blueprint):**
1. Subir el repo a GitHub.
2. Render → **New → Static Site** → conectar repo `Gauss-seidel/insumosSRL`.
3. Build command: *(vacío)* · Publish directory: `.` (raíz).
4. Auto-deploy: on push a `main` (auto-activo por defecto).
5. Obtener URL `https://insumos-srl.onrender.com`.

**Cómo usa el frontend la variable de entorno de Render:**
- Los `envVars` de Render solo existen en el *build/runtime* del servidor, NO en el navegador del visitante. Para respetar esto sin backend, `app.js` debe: leer `window.__WHATSAPP__` si está presente **o** caer al default `595986809607` hardcodeado.
- Render static usa plantillas (templates) para inyectar valores de entorno en HTML. Se genera un `index.html` simple con un script que inyecta `window.__INITIAL_STATE__ = { WHATSAPP: "<valor>" }` — documentado como nota a `@deploy`.

**Notas técnicas:**
- Las rutas relativas (`./assets/...`, `./index.html`) permiten servir el sitio desde un subpath o el dominio raíz sin reconfigurar.
- SPA fallback: el rewrite a `/index.html` garantiza que cualquier ruta (aunque sea one-page) cargue la aplicación.
- Cache-Control inmutable para `/assets/*` + hash/fecha en nombres de archivo si se quiere invalidar cache en releases futuros.

## 13. Fuera de alcance (YAGNI)

## 13. Fuera de alcance (YAGNI)

- Testimonios reales (no hay datos) — se puede dejar la sección con placeholder si el usuario lo pide, NO por defecto.
- Precios / e-commerce / carrito.
- Backend, formulario con almacenamiento, multi-idioma.
- Paginación/SEO multi-página.
- Logos oficiales de ISO/BRCGS (solo texto hasta confirmación del cliente).