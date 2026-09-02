# Insumos S.R.L. — Propuesta v2

One-page corporativa elegante para **Insumos S.R.L.** (Paraguay, RUC 80038724-4) — importador → convertidor → mayorista de bobinas térmicas/químicas, cintas, etiquetas y formularios continuos.

> **Nota:** esta es una **propuesta independiente** de mejora visual/contenido del sitio actual (insumos.com.py). No lo reemplaza ni lo modifica.

## Stack

- HTML + CSS + JS **vanilla**. Sin build, sin dependencias (solo Google Fonts).
- Assets (logo, fotos, videos) alojados localmente en `assets/`.

## Cómo verlo en local

```bash
# cualquier servidor estático sirve la raíz del repo
python -m http.server 8000
# o doble clic en index.html
```
Abrir `http://localhost:8000`.

## Estructura

```
index.html                 # one-page completa
render.yaml                # blueprint Render (static site)
assets/css/styles.css      # design system (tokens: azul #013687 + acero)
assets/js/catalogo.js      # catálogo como datos
assets/js/app.js           # modales, tabs, contadores, form→WhatsApp, scroll-spy
assets/img/                # logo.svg + fotos del sitio actual
assets/video/              # INFORMACION-GENERAL.mp4, REPARTOS.mp4
docs/superpowers/specs/    # design doc
```

## Deploy en Render (static site)

**Opción A — Blueprint (auto):**
1. Subir este repo a GitHub.
2. Crear un **Blueprint** en Render conectando el repo. Render lee `render.yaml` y crea el static site automáticamente.
3. Auto-deploy activo en cada push a `main`.

**Opción B — Manual desde el panel:**
1. Render → **New → Static Site** → conectar repo `Gauss-seidel/insumosSRL`.
2. **Build command:** *(vacío)*
3. **Publish directory:** `.`
4. Render genera una URL `https://insumos-srl.onrender.com`.

### Variable de entorno

`WHATSAPP_NUMBER` (default `595986809607`) se usa para los mensajes de cotización. Render la expone solo al **build/runtime**, no al navegador. El frontend lee `window.__WHATSAPP__` si existe, o usa el default.
