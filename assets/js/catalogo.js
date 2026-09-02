/* catalogo.js — Datos del catálogo Insumos S.R.L. (fuente de verdad, spec §7).
   Se carga ANTES que app.js (orden garantizado por index.html) y expone
   window.CATALOGO como array plano. app.js lo consume como global. */

window.CATALOGO = [
  /* ── Bobinas térmicas ── */
  {
    id: "bobina-termica-57x38",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 57×38",
    medidas: "57×38 mm",
    imagen: "assets/img/bobina-57x38.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-75x75",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 75×75",
    medidas: "75×75 mm",
    imagen: "assets/img/bobina-75x75.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-75x75-b",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 75×75",
    medidas: "75×75 mm",
    imagen: "assets/img/bobina-75x75-2.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x44",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×44",
    medidas: "80×44 mm",
    imagen: "assets/img/bobina-80x44.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x55",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×55",
    medidas: "80×55 mm",
    imagen: "assets/img/bobina-80x55.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x70",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×70",
    medidas: "80×70 mm",
    imagen: "assets/img/bobina-80x70.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x75",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×75",
    medidas: "80×75 mm",
    imagen: "assets/img/bobina-80x75.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x110",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×110",
    medidas: "80×110 mm",
    imagen: "assets/img/bobina-80x110.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x300",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×300",
    medidas: "80×300 mm",
    imagen: "assets/img/bobina-80x300.jpg",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-amarilla-80x40",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica amarilla 80×40",
    medidas: "80×40 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-75x55",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 75×55",
    medidas: "75×55 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-sh47",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica SH47",
    medidas: "",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-80x310",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 80×310",
    medidas: "80×310 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-termica-75x75-caja",
    categoria: "bobinas",
    subcategoria: "Térmicas",
    nombre: "Bobina térmica 75×75 caja",
    medidas: "75×75 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },

  /* ── Bobinas químicas ── */
  {
    id: "bobina-quimica-75x75-duplicada",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química 75×75 duplicada",
    medidas: "75×75 mm",
    imagen: "assets/img/bobina-quimica-dup.jpg",
    specs: { "Capas": "Duplicado" },
    certificadoDnit: true
  },
  {
    id: "bobina-quimica-75x75-triplicada",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química 75×75 triplicada",
    medidas: "75×75 mm",
    imagen: "assets/img/bobina-quimica-trip.jpg",
    specs: { "Capas": "Triplicado" },
    certificadoDnit: true
  },
  {
    id: "bobina-quimica-75x55-duplicada",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química 75×55 duplicada",
    medidas: "75×55 mm",
    imagen: "",
    specs: { "Capas": "Duplicado" },
    certificadoDnit: true
  },
  {
    id: "bobina-quimica-75x55-triplicada",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química 75×55 triplicada",
    medidas: "75×55 mm",
    imagen: "assets/img/bobina-quimica-trip2.jpg",
    specs: { "Capas": "Triplicado" },
    certificadoDnit: true
  },
  {
    id: "bobina-quimica-duplicada-impresa",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química duplicada con impresión",
    medidas: "",
    imagen: "",
    specs: { "Capas": "Duplicado", "Impresión": "Hasta 3 colores" },
    certificadoDnit: true
  },
  {
    id: "bobinas-quimicas-impresas",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobinas químicas impresas",
    medidas: "",
    imagen: "",
    specs: { "Impresión": "Hasta 3 colores" },
    certificadoDnit: true
  },
  {
    id: "bobina-quimica-obra-primera-75x75",
    categoria: "bobinas",
    subcategoria: "Químicas",
    nombre: "Bobina química obra primera 75×75",
    medidas: "75×75 mm",
    imagen: "",
    specs: { "Capas": "Primera copia" },
    certificadoDnit: true
  },

  /* ── Bobinas originales ── */
  {
    id: "bobina-original-75x75-obra-primera",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original 75×75 obra primera",
    medidas: "75×75 mm",
    imagen: "assets/img/bobina-original.jpg",
    specs: { "Capas": "Primera copia" },
    certificadoDnit: true
  },
  {
    id: "bobina-original-sh47",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original SH47",
    medidas: "",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-original-70x55",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original 70×55",
    medidas: "70×55 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-original-70x70",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original 70×70",
    medidas: "70×70 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-original-75x55",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original 75×55",
    medidas: "75×55 mm",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },
  {
    id: "bobina-original-calculadora",
    categoria: "bobinas",
    subcategoria: "Original",
    nombre: "Bobina original calculadora",
    medidas: "",
    imagen: "",
    specs: {},
    certificadoDnit: true
  },

  /* ── Cintas de embalaje ── */
  {
    id: "cinta-transparente-50-micras-48x100",
    categoria: "cintas-embalaje",
    subcategoria: "",
    nombre: "Cinta transparente 50 micras",
    medidas: "48×100 m",
    imagen: "assets/img/cinta-48x100.jpg",
    specs: { "Micras": "50", "Presentación": "Caja × 36" },
    certificadoDnit: false
  },
  {
    id: "cinta-marron-50-micras-48x30",
    categoria: "cintas-embalaje",
    subcategoria: "",
    nombre: "Cinta marrón 50 micras",
    medidas: "48×30 m",
    imagen: "",
    specs: { "Micras": "50", "Presentación": "Caja × 120" },
    certificadoDnit: false
  },
  {
    id: "cinta-50-micras-12x30",
    categoria: "cintas-embalaje",
    subcategoria: "",
    nombre: "Cinta 50 micras",
    medidas: "12×30 m",
    imagen: "assets/img/cinta-aro12x30.jpg",
    specs: { "Micras": "50", "Presentación": "Caja × 144" },
    certificadoDnit: false
  },

  /* ── Cintas matriciales ── */
  {
    id: "cinta-matricial-lx350",
    categoria: "cintas-matriciales",
    subcategoria: "",
    nombre: "Cinta matricial LX350",
    medidas: "",
    imagen: "assets/img/cinta-LX350.jpg",
    specs: { "Compatible": "EPSON LX-350" },
    certificadoDnit: false
  },
  {
    id: "cinta-matricial-erc38",
    categoria: "cintas-matriciales",
    subcategoria: "",
    nombre: "Cinta matricial ERC-38",
    medidas: "",
    imagen: "assets/img/cinta-ERC38.jpg",
    specs: { "Compatible": "ERC-38" },
    certificadoDnit: false
  },
  {
    id: "cinta-matricial-sp700",
    categoria: "cintas-matriciales",
    subcategoria: "",
    nombre: "Cinta matricial SP700",
    medidas: "",
    imagen: "assets/img/cinta-SP700.jpg",
    specs: { "Compatible": "SP700" },
    certificadoDnit: false
  },
  {
    id: "cinta-matricial-erc38-b",
    categoria: "cintas-matriciales",
    subcategoria: "",
    nombre: "Cinta matricial ERC-38",
    medidas: "",
    imagen: "assets/img/cinta-ERC38-2.jpg",
    specs: { "Compatible": "ERC-38" },
    certificadoDnit: false
  },

  /* ── Etiquetas ── */
  {
    id: "etiqueta-balanza-28x55-kretz",
    categoria: "etiquetas",
    subcategoria: "",
    nombre: "Etiqueta balanza 28×55",
    medidas: "28×55 mm",
    imagen: "assets/img/etiqueta-balanza-kretz.jpg",
    specs: { "Uso": "Balanza Kretz" },
    certificadoDnit: false
  },
  {
    id: "etiqueta-balanza-45x55-digi2",
    categoria: "etiquetas",
    subcategoria: "",
    nombre: "Etiqueta balanza 45×55",
    medidas: "45×55 mm",
    imagen: "assets/img/etiqueta-balanza-45x55.jpg",
    specs: { "Uso": "Balanza Digi 2" },
    certificadoDnit: false
  },
  {
    id: "etiqueta-adhesiva-45x55",
    categoria: "etiquetas",
    subcategoria: "",
    nombre: "Etiqueta adhesiva 45×55",
    medidas: "45×55 mm",
    imagen: "assets/img/etiqueta-adhesiva-45x55.jpg",
    specs: { "Uso": "Adhesiva" },
    certificadoDnit: false
  },

  /* ── Formularios continuos ── */
  {
    id: "formulario-continuo-duplicado-troquelado",
    categoria: "formularios",
    subcategoria: "",
    nombre: "Formulario continuo duplicado troquelado",
    medidas: "",
    imagen: "assets/img/formulario-dup.jpg",
    specs: { "Capas": "Duplicado", "Troquelado": "Sí" },
    certificadoDnit: false
  },
  {
    id: "formulario-continuo-triplicado",
    categoria: "formularios",
    subcategoria: "",
    nombre: "Formulario continuo triplicado",
    medidas: "",
    imagen: "assets/img/formulario-trip.jpg",
    specs: { "Capas": "Triplicado", "Troquelado": "No" },
    certificadoDnit: false
  },
  {
    id: "formulario-continuo-triplicado-troquelado",
    categoria: "formularios",
    subcategoria: "",
    nombre: "Formulario continuo triplicado troquelado",
    medidas: "",
    imagen: "assets/img/formulario-trip-troq.jpg",
    specs: { "Capas": "Triplicado", "Troquelado": "Sí" },
    certificadoDnit: false
  }
];