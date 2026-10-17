# SumaqAgro — Landing Page

[![Release](https://img.shields.io/badge/release-v3.0.0-brightgreen.svg)](#versionado-y-flujo-de-trabajo)
[![Stack](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20vanilla-blue.svg)](#stack-tecnológico)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-orange.svg)](#internacionalización-es--en)
[![Course](https://img.shields.io/badge/UPC-1ASI0729%20Open%20Source-red.svg)](https://www.upc.edu.pe/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE.md)

Repositorio oficial del **Landing Page** de **SumaqAgro**, la plataforma SaaS de agricultura de precisión de la startup peruana **Dymbia**. Sitio web estático, responsive y bilingüe (español/inglés), desarrollado con HTML5, CSS3 y JavaScript vanilla, sin frameworks ni dependencias de ejecución, para cargar rápido en redes móviles rurales.

Proyecto desarrollado para el curso *1ASI0729 Desarrollo de Aplicaciones Open Source* (UPC, Ciclo 2026-20) bajo GitFlow y Conventional Commits.

---

## Información Académica

- **Institución:** Universidad Peruana de Ciencias Aplicadas (UPC)
- **Facultad:** Facultad de Ingeniería
- **Carrera:** Ingeniería de Software
- **Curso:** 1ASI0729 - Desarrollo de Aplicaciones Open Source
- **Ciclo Académico:** 2026-20
- **Docente:** Velasquez Nuñez, Angel Augusto

---

## Descripción del Proyecto

**Startup:** Dymbia  
**Producto:** SumaqAgro

**Dymbia** busca cerrar la brecha de digitalización del sector agroalimentario peruano, orientándose a pequeños y medianos productores, cooperativas agrarias y asesores técnicos de las cadenas de **papa andina** y **café de especialidad**.

Este landing page es la **puerta de entrada comercial** de SumaqAgro: comunica la propuesta de valor bajo el lema *"Cultiva con información. Decide con precisión"*, presenta al equipo, los planes de suscripción y dirige al usuario hacia el registro.

### Soluciones presentadas en la Landing
1. **Monitoreo Satelital de Vigor y Humedad:** NDVI y NDWI vía Sentinel-2, sin sensores en campo.
2. **Contabilidad de Costos por Lote:** registro financiero y precio mínimo de venta.
3. **Certificación Digital de Calidad de Cosecha:** constancias PDF con sello QR auditable.
4. **Prescripciones y Alertas Agronómicas:** avisos ante heladas, plagas y estrés hídrico.

---

## Secciones del Sitio

La landing sigue un recorrido de conversión: **propuesta de valor → problema → solución → prueba → precio → confianza → acción**. Cada bloque responde a una historia de usuario de la épica EPIC-01 del reporte.

| # | Sección | Ancla | Objetivo | US |
|---|---|---|---|---|
| 1 | Hero | `#hero` | Propuesta de valor, captura real de la app y CTA "Empieza gratis" | US-01 |
| 2 | El desafío | `#problem` | Problemas del productor y cifras oficiales con fuente (MIDAGRI, INEI, JNC) | US-01 |
| 3 | Soluciones | `#solutions` | Los 4 módulos con filtro por perfil (Agricultor, Cooperativa, Asesor) | US-06 |
| 4 | Cómo funciona | `#how-it-works` | 3 pasos de uso y vista Salud del Cultivo | US-06 |
| 5 | Demo | `#demo` | Video con carga diferida (miniatura → reproductor) | US-05 |
| 6 | ¿A quién ayudamos? | `#audience` | Beneficios, plan recomendado y CTA por segmento | US-06 |
| 7 | Planes | `#plans` | Semilla, Cooperativa Pro y Asesor Técnico con facturación mensual/anual | US-07 |
| 8 | Impacto y testimonios | `#impact` | Metas de impacto (hipótesis Lean UX) y carrusel de testimonios | US-08 |
| 9 | Nosotros y equipo | `#about`, `#team` | Misión, visión, perfiles con enlace a GitHub y video del equipo | US-04 |
| 10 | Preguntas frecuentes | `#faq` | Resuelve objeciones antes de registrarse | — |
| 11 | CTA final | `#cta` | Selector de perfil que recomienda el plan y lleva al registro | US-07 |
| 12 | Footer | — | Navegación, contacto y políticas legales en ventana modal | US-09 |

### Páginas Legales
- [`public/sections/policy.html`](public/sections/policy.html) — Política de Privacidad
- [`public/sections/service.html`](public/sections/service.html) — Términos de Servicio
- [`public/sections/cookie.html`](public/sections/cookie.html) — Política de Cookies

---

## Características Técnicas

- **Bilingüe ES/EN:** traducción dinámica mediante `data-i18n` (contenido) y `data-i18n-attr` (atributos como `alt` o `aria-label`); el idioma inicial se toma de `localStorage` o del navegador.
- **Selector de facturación:** alterna precios mensual/anual, muestra el equivalente mensual y sincroniza el periodo (`/mes` · `/año`) con el idioma activo.
- **Conversión:** CTA principal repetido en hero, segmentos, planes y cierre; el selector de perfil del CTA final envía el plan elegido (`?plan=`) a la aplicación web.
- **Políticas legales en modal:** los enlaces legales abren un `<dialog>` con el contenido de la página legal y, si no es posible, navegan a la página completa.
- **Responsive Design:** media queries y menú móvil (hamburguesa) para móvil, tablet y escritorio.
- **SEO y Open Graph:** meta tags, título descriptivo y propiedades `og:*` en el `<head>`.
- **Accesibilidad:** HTML semántico, `aria-labelledby`, `aria-live` y etiquetas dinámicas en el botón de idioma.
- **Rendimiento:** imágenes WebP optimizadas (~620 KB en total), carga diferida de imágenes y video, e Inter autoalojada.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Marcado | HTML5 semántico |
| Estilos | CSS3 (`public/assets/css/styles.css`) |
| Lógica | JavaScript vanilla (`public/assets/js/script.js`) |
| i18n | Módulos de traducción (`public/assets/js/i18n/`) |
| Tipografía | Poppins (títulos, Google Fonts) e Inter (texto, autoalojada) |
| Iconografía | Material Symbols Outlined y SVG |
| Gestión de proyecto | Jira, Miro, GitHub |

> **Nota de Alcance:** SumaqAgro es exclusivamente software en la nube; no contempla sensores físicos ni dispositivos IoT.

---

## Ejecución Local

No requiere compilación ni instalación de dependencias.

```bash
# 1. Clonar el repositorio
git clone [https://github.com/dymbia-opensource/sumaqAgro-landing-page.git](https://github.com/dymbia-opensource/sumaqAgro-landing-page.git)
cd sumaqAgro-landing-page

# 2. Abrir directamente index.html en el navegador, o servirlo localmente:
python3 -m http.server 8080
# → http://localhost:8080
```

## Estructura de Directorios

```text
sumaqAgro-landing-page/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css          # Estilos globales y media queries responsive
│   │   ├── fonts/                  # Inter (400–700) en .ttf
│   │   ├── images/                 # Logos y fotos en WebP, capturas de la app
│   │   └── js/
│   │       ├── i18n/               # Diccionarios de internacionalización
│   │       │   ├── en.js           # Traducción al inglés
│   │       │   └── es.js           # Traducción al español
│   │       └── script.js           # Lógica principal, menú móvil, billing y toggle i18n
│   └── sections/                   # Páginas secundarias y legales
│       ├── cookie.html             # Política de Cookies
│       ├── policy.html             # Política de Privacidad
│       └── service.html            # Términos de Servicio
├── index.html                      # Página principal
├── 404.html                        # Página no encontrada (Cloudflare Pages)
├── package.json
├── .gitignore
└── README.md
```

## Equipo de Desarrollo

| Integrante |
|---|
| Solorzano Sullca, Benjamin |
| Tejada Pumacayo, Yamil Jared |
| Vargas Enriquez, Jose Carlos |
| Sanca Condori, Miguel |
| Duarte Ruffner, Drago Derick |

---

## Versionado y Flujo de Trabajo

- **GitFlow:** ramas `main` (producción), `develop` (integración), `feature/*`, `release/*` y `fix/*`.
- **Conventional Commits:** `feat(landing): …`, `fix(i18n): …`, `style(footer): …`.
- **Releases:**
    - `v1.0.0` — Landing page inicial, i18n, SEO y equipo.
    - `v1.1.0` — Layout responsive, menú móvil y correcciones de páginas legales.
    - `v3.0.0` — Rediseño orientado a conversión (problema, cómo funciona, FAQ, selector de plan) y optimización de imágenes.

---

## Licencia

Distribuido bajo la licencia **CC BY-NC-SA 4.0**. Ver [`LICENSE.md`](LICENSE.md).

© 2026 Dymbia — SumaqAgro.
