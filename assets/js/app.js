/* app.js — Comportamiento de la one-page Insumos S.R.L. (JS vanilla, sin dependencias).
   Espera window.CATALOGO (definido por catalogo.js, que se carga antes).
   Selectores = contrato con index.html/styles.css (ver spec §6). */

(function () {
  "use strict";

  /* ── Utilidades mínimas ── */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var PLACEHOLDER = (function () {
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">',
      '<rect width="800" height="600" fill="#E4E8EE"/>',
      '<text x="400" y="278" font-family="Roboto, Arial, sans-serif" font-size="34" font-weight="600" fill="#6B7684" text-anchor="middle">Insumos S.R.L.</text>',
      '<text x="400" y="330" font-family="Roboto, Arial, sans-serif" font-size="18" fill="#6B7684" text-anchor="middle">Imagen no disponible</text>',
      "</svg>"
    ].join("");
    return "data:image/svg+xml," + encodeURIComponent(svg);
  })();

  var CATALOGO = Array.isArray(window.CATALOGO) ? window.CATALOGO : [];
  var EMAIL_VENTAS = "ventas@insumos.com.py";
  var TELEFONO_DIRECTO = "(021) 559 358";
  var TELEFONO_TEL = "tel:+59521559358";
  var ORDEN_CATEGORIAS = ["bobinas", "cintas-embalaje", "cintas-matriciales", "etiquetas", "formularios"];
  var LABEL_CATEGORIA = {
    bobinas: "Bobinas",
    "cintas-embalaje": "Cintas de embalaje",
    "cintas-matriciales": "Cintas matriciales",
    etiquetas: "Etiquetas",
    formularios: "Formularios continuos"
  };

  var numeroWhatsapp = function () { return window.__WHATSAPP__ || "595986809607"; };
  var urlWhatsApp = function (texto) { return "https://wa.me/" + numeroWhatsapp() + "?text=" + encodeURIComponent(texto); };
  var esPlaceholder = function (src) { return !!(src && src.indexOf("data:image/svg+xml") === 0); };
  var escapeHtml = function (str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };
  var imgSrcDe = function (item) { return item.imagen || PLACEHOLDER; };
  var desbloquearScroll = function () { document.body.style.overflow = ""; };

  /* ── Cierre global de modales (producto, video) + lightbox ── */
  var cerrarTodo = function () {
    $$(".modal.open").forEach(function (m) {
      m.classList.remove("open");
      m.setAttribute("aria-hidden", "true");
      var v = m.querySelector("video");
      if (v) {
        v.pause();
        try { v.currentTime = 0; } catch (err) { /* algunos navegadores restringen seek */ }
      }
    });
    var lb = $("#lightbox");
    if (lb && lb.classList.contains("open")) lb.classList.remove("open");
    desbloquearScroll();
  };

  var abrirModal = function (modal) {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  /* ── 1. Header sticky ── */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── 2. Nav mobile + scroll suave en anclas ── */
  function initNav() {
    var toggle = $("#nav-toggle");
    var header = $(".site-header");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var abierto = header ? header.classList.toggle("nav-open") : document.body.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(abierto));
      });
    }
    var targetDe = function (a) {
      var id = (a.getAttribute("data-scroll") || a.getAttribute("href") || "").replace(/^#/, "");
      return id ? document.getElementById(id) : null;
    };
    $$("a[data-scroll]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var destino = targetDe(a);
        if (!destino) return;
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
        if (header) header.classList.remove("nav-open");
        document.body.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── 3. Catálogo: tabs + grid + modal producto + select ── */
  function initCatalogo() {
    var grid = $("#catalogo-grid");
    if (!grid) {
      console.warn("[app.js] #catalogo-grid no encontrado; funcionalidad del catálogo desactivada.");
      return;
    }
    if (!CATALOGO.length) {
      grid.innerHTML = '<p class="catalogo-vacio">El catálogo está vacío.</p>';
      return;
    }

    var tabs = $$(".tab-btn[data-categoria]", $("#catalogo-tabs"));
    var primera = (tabs.length && tabs[0].getAttribute("data-categoria")) || "bobinas";
    var ultimoTrigger = null;

    var renderGrid = function (categoria) {
      var items = CATALOGO.filter(function (p) { return p.categoria === categoria; });
      if (!items.length) {
        grid.innerHTML = '<p class="catalogo-vacio">No hay productos disponibles en esta categoría.</p>';
        return;
      }
      grid.innerHTML = items.map(function (item) {
        var medidas = item.medidas ? '<p class="producto-medidas">' + escapeHtml(item.medidas) + "</p>" : "";
        var badge = item.certificadoDnit ? '<span class="badge-dnit">Certificado DNIT</span>' : "";
        return (
          '<article class="producto-card" data-id="' + escapeHtml(item.id) + '" tabindex="0" role="button" ' +
          'aria-label="Ver ficha de ' + escapeHtml(item.nombre) + '">' +
          '<img src="' + imgSrcDe(item) + '" alt="' + escapeHtml(item.nombre) + '" loading="lazy">' +
          '<div class="producto-info">' +
          '<h3 class="producto-nombre">' + escapeHtml(item.nombre) + "</h3>" +
          medidas + badge +
          '<button type="button" class="btn-ficha">Ver ficha técnica</button>' +
          "</div></article>"
        );
      }).join("");
    };

    var activarTab = function (tab) {
      tabs.forEach(function (t) {
        var activo = t === tab;
        t.classList.toggle("active", activo);
        t.setAttribute("aria-selected", String(activo));
      });
      if (tab) renderGrid(tab.getAttribute("data-categoria"));
    };

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { activarTab(tab); });
    });

    if (tabs.length) {
      activarTab(tabs[0]);
    } else {
      renderGrid(primera);
    }

    /* Apertura del modal por click (botón o card) y por teclado */
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".producto-card");
      if (card) {
        ultimoTrigger = card;
        abrirModalProducto(card.getAttribute("data-id"));
      }
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".producto-card");
      if (card) {
        e.preventDefault();
        ultimoTrigger = card;
        abrirModalProducto(card.getAttribute("data-id"));
      }
    });
  }

  function abrirModalProducto(id) {
    var modal = $("#producto-modal");
    var cuerpo = $("#modal-body");
    if (!modal || !cuerpo) return;
    var item = CATALOGO.find(function (p) { return p.id === id; });
    if (!item) return;

    var specs = Object.keys(item.specs || {});
    var specsHtml = specs.length
      ? "<table class=\"specs-table\">" + specs.map(function (k) {
          return "<tr><th scope=\"row\">" + escapeHtml(k) + "</th><td>" + escapeHtml(item.specs[k]) + "</td></tr>";
        }).join("") + "</table>"
      : '<p class="sin-specs">Consultá disponibilidad y medidas a medida.</p>';
    var dnit = item.certificadoDnit
      ? '<p class="dnit-note"><span class="badge-dnit">Certificado DNIT</span> ' +
        "Nuestras bobinas cuentan con el Certificado de Calidad de Imagen, respaldo técnico " +
        "para cumplir con los requerimientos normativos de la DNIT.</p>"
      : "";
    var medidas = item.medidas ? '<p class="producto-medidas">' + escapeHtml(item.medidas) + "</p>" : "";
    var sub = item.subcategoria ? '<p class="producto-subcategoria">' + escapeHtml(item.subcategoria) + "</p>" : "";
    var ctaTexto = "Hola, quiero cotizar: " + item.nombre + (item.medidas ? " " + item.medidas : "");

    cuerpo.innerHTML =
      '<div class="producto-modal-grid">' +
      '<div class="producto-modal-media">' +
      '<img src="' + imgSrcDe(item) + '" alt="' + escapeHtml(item.nombre) + '">' +
      "</div>" +
      '<div class="producto-modal-info">' +
      "<h3 class=\"producto-modal-nombre\">" + escapeHtml(item.nombre) + "</h3>" +
      sub + medidas + specsHtml + dnit +
      '<a class="btn-cotizar" href="' + urlWhatsApp(ctaTexto) + '" target="_blank" rel="noopener">Cotizar por WhatsApp</a>' +
      '<p class="producto-tel">Teléfono directo: <a href="' + TELEFONO_TEL + '">' + TELEFONO_DIRECTO + "</a></p>" +
      "</div></div>";

    modal._trigger = ultimoTrigger || null;
    abrirModal(modal);
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
    ultimoTrigger = null;
  }

  /* ── 4. Select de producto (optgroups por categoría) ── */
  function initSelectProducto() {
    var select = $("#producto");
    if (!select) return;
    if (!CATALOGO.length) {
      console.error("[app.js] window.CATALOGO vacío: el select de producto quedó sin opciones.");
      return;
    }
    var fragment = document.createDocumentFragment();
    ORDEN_CATEGORIAS.forEach(function (cat) {
      var items = CATALOGO.filter(function (p) { return p.categoria === cat; });
      if (!items.length) return;
      var og = document.createElement("optgroup");
      og.label = LABEL_CATEGORIA[cat] || cat;
      items.forEach(function (p) {
        var op = document.createElement("option");
        op.value = p.id;
        op.textContent = p.nombre + (p.medidas ? " — " + p.medidas : "");
        og.appendChild(op);
      });
      fragment.appendChild(og);
    });
    select.appendChild(fragment);
  }

  /* ── 5. Form → WhatsApp (con validación y fallback mailto) ── */
  function initForm() {
    var form = $("#form-contacto");
    if (!form) return;
    var status = $(".form-status", form);
    var inputNombre = $("#nombre", form);
    var inputEmpresa = $("#empresa", form);
    var inputEmail = $("#email", form);
    var inputCantidad = $("#cantidad", form);
    var inputMensaje = $("#mensaje", form);
    var select = $("#producto", form);

    var mostrarStatus = function (msg, tipo) {
      if (!status) return;
      status.textContent = msg;
      status.removeAttribute("data-estado");
      if (tipo) status.setAttribute("data-estado", tipo === "success" ? "ok" : "error");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = inputNombre ? inputNombre.value.trim() : "";
      var empresa = inputEmpresa ? inputEmpresa.value.trim() : "";
      var email = inputEmail ? inputEmail.value.trim() : "";
      var productoId = select ? select.value : "";
      var cantidadRaw = inputCantidad ? inputCantidad.value.trim() : "";
      var mensaje = inputMensaje ? inputMensaje.value.trim() : "";
      var cantidad = parseInt(cantidadRaw, 10);

      var errores = [];
      if (!nombre) errores.push("Ingresa tu nombre.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("Ingresa un email válido.");
      if (select && !productoId) errores.push("Selecciona un producto.");
      if (!isFinite(cantidad) || cantidad < 1) errores.push("La cantidad mínima es 1.");

      if (errores.length) {
        mostrarStatus(errores.join(" "), "error");
        return;
      }

      var producto = CATALOGO.find(function (p) { return p.id === productoId; }) || null;
      var lineas = [
        "Hola, quiero cotizar:",
        producto ? producto.nombre + (producto.medidas ? " — " + producto.medidas : "") : "",
        "Datos:",
        "- Nombre: " + nombre,
        "- Empresa: " + (empresa || "—"),
        "- Email: " + email,
        "- Cantidad: " + cantidad
      ];
      if (mensaje) lineas.push("- Mensaje: " + mensaje);
      var texto = lineas.filter(function (l) { return l !== ""; }).join("\n");
      var url = urlWhatsApp(texto);

      var abierto = false;
      try { abierto = !!window.open(url, "_blank"); } catch (err) { abierto = false; }

      if (abierto) {
        mostrarStatus("¡Listo! Abrimos WhatsApp para completar tu cotización.", "success");
        form.reset();
      } else {
        location.href = "mailto:" + EMAIL_VENTAS +
          "?subject=" + encodeURIComponent("Cotización") +
          "&body=" + encodeURIComponent(texto);
        mostrarStatus("No pudimos abrir WhatsApp; abrimos tu correo para enviar la cotización.", "success");
      }
    });
  }

  /* ── 6. Scroll-spy (IntersectionObserver, >50% visible) ── */
  function initScrollSpy() {
    var links = $$("#nav-principal a[data-scroll]:not(.btn)");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var mapa = {};
    links.forEach(function (l) {
      var id = (l.getAttribute("data-scroll") || l.getAttribute("href") || "").replace(/^#/, "");
      if (id) mapa[id] = l;
    });
    var secciones = $$("section[id]").filter(function (s) { return mapa[s.id]; });
    if (!secciones.length) return;

    var marcarActivo = function (link) {
      links.forEach(function (l) {
        var activo = l === link;
        l.classList.toggle("active", activo);
        if (activo) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      });
    };

    /* Estado inicial: primera sección */
    if (secciones[0]) marcarActivo(mapa[secciones[0].id]);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && mapa[en.target.id]) marcarActivo(mapa[en.target.id]);
      });
    }, { threshold: 0.5 });
    secciones.forEach(function (s) { spy.observe(s); });

    /* Al llegar al fondo, forzar la última sección como activa */
    window.addEventListener("scroll", function () {
      var fin = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (fin && secciones.length) marcarActivo(mapa[secciones[secciones.length - 1].id]);
    }, { passive: true });
  }

  /* ── 7. Contadores #stats ── */
  function initContadores() {
    var stats = $("#stats");
    if (!stats || !("IntersectionObserver" in window)) return;
    var contadores = $$("[data-target]", stats);
    if (!contadores.length) return;

    var animar = function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10);
      if (!isFinite(target)) return;
      var numEl = el.querySelector(".stat-num") || (el.childElementCount === 0 ? el : null);
      if (!numEl) return;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        numEl.textContent = String(target);
        return;
      }
      var duracion = 1200;
      var inicio = null;
      numEl.textContent = "0";
      var frame = function (ts) {
        if (inicio === null) inicio = ts;
        var p = Math.min((ts - inicio) / duracion, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = String(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        animar(en.target);
      });
    }, { threshold: 0.4 });
    contadores.forEach(function (c) { obs.observe(c); });
  }

  /* ── 8. Video modal ── */
  function initVideoModal() {
    var modal = $("#video-modal");
    var video = $("#video-nosotros");
    var botones = $$(".btn-video");
    if (!modal || !video || !botones.length) return;
    botones.forEach(function (btn) {
      btn.addEventListener("click", function () {
        modal._trigger = btn;
        abrirModal(modal);
        video.play().catch(function () { /* autoplay restringido; el usuario puede presionar play */ });
      });
    });
  }

  /* ── 9. Modales: cierre por botón, backdrop y ESC ── */
  function initModales() {
    $$(".modal").forEach(function (modal) {
      var cerrar = function () {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        var v = modal.querySelector("video");
        if (v) {
          v.pause();
          try { v.currentTime = 0; } catch (err) { /* noop */ }
        }
        if (modal._trigger && modal._trigger.focus) modal._trigger.focus();
        modal._trigger = null;
        desbloquearScroll();
      };
      var closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.addEventListener("click", cerrar);
      modal.addEventListener("click", function (e) {
        if (e.target === modal || (e.target.closest && e.target.closest("[data-modal-close]"))) cerrar();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrarTodo();
    });
  }

  /* ── 10. Lightbox ── */
  function initLightbox() {
    var lightbox = $("#lightbox");
    if (!lightbox) return;
    var lbImg = lightbox.querySelector("img");

    document.addEventListener("click", function (e) {
      var img = e.target.closest ? e.target.closest("img[data-lightbox]") : null;
      if (!img || img === lbImg) return;
      if (lbImg) {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
      }
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || (e.target.closest && e.target.closest("[data-lightbox-close]"))) {
        lightbox.classList.remove("open");
        desbloquearScroll();
      }
    });
    var closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("open");
        desbloquearScroll();
      });
    }
  }

  /* ── 11. Reveal on scroll ── */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    var elementos = $$("[data-reveal]");
    if (!elementos.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    elementos.forEach(function (el) { obs.observe(el); });
  }

  /* ── 12. Placeholder global para imágenes rotas (fase capture) ── */
  function initPlaceholderGlobal() {
    window.addEventListener("error", function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG" && !esPlaceholder(t.src)) {
        t.src = PLACEHOLDER;
      }
    }, true);
  }

  /* ── 13. Año dinámico ── */
  function initAnio() {
    var anio = $("#anio");
    if (anio) anio.textContent = String(new Date().getFullYear());
  }

  /* ── 14. WhatsApp flotante (override por window.__WHATSAPP__) ── */
  function initWhatsappFloat() {
    var wa = $("#whatsapp-float");
    if (!wa) return;
    wa.href = urlWhatsApp("Hola, quiero información de sus productos.");
  }

  /* ── Arranque ── */
  function init() {
    [
      initHeader,
      initNav,
      initCatalogo,
      initSelectProducto,
      initForm,
      initScrollSpy,
      initContadores,
      initVideoModal,
      initModales,
      initLightbox,
      initReveal,
      initPlaceholderGlobal,
      initAnio,
      initWhatsappFloat
    ].forEach(function (fn) {
      try { fn(); } catch (err) { console.error("[app.js] error en " + fn.name + ":", err); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();