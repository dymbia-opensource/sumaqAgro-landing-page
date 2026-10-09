# SumaqAgro — Landing Page

[![Release](https://img.shields.io/badge/release-v1.1.0-brightgreen.svg)](#versionado-y-flujo-de-trabajo)
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

| Sección | Ancla | Descripción |
|---|---|---|
| Hero | `#hero` | Propuesta de valor y llamada a la acción principal |
| Nosotros | `#about` | Misión y visión: democratizar la agricultura de precisión en el Perú |
| Nuestro equipo | `#team` | Perfiles de los 5 integrantes |
| ¿A quién ayudamos? | — | Agricultores independientes, líderes de cooperativas y asesores técnicos |
| Soluciones y características | `#solutions` | Las 4 capacidades centrales del producto |
| Demo | `#demo` | Reproductor de video "Conoce SumaqAgro en acción" |
| Planes | `#plans` | Planes de suscripción con selector mensual/anual |
| Impacto | `#impact` | Métricas de impacto |
| Testimonios | — | Opiniones de usuarios |
| CTA | `#cta` | Llamado final a empezar |
| Footer | — | Enlaces rápidos, soporte y páginas legales |

### Páginas Legales

---

## Características Técnicas

- **Selector de facturación:** alterna precios mensual/anual y sincroniza el periodo (`/mes` · `/año`) con el idioma activo.
- **Responsive Design:** media queries y menú móvil (hamburguesa) para móvil, tablet y escritorio.
- **SEO y Open Graph:** meta tags, título descriptivo y propiedades `og:*` en el `<head>`.
- **Accesibilidad:** HTML semántico, `aria-labelledby`, `aria-live` y etiquetas dinámicas en el botón de idioma.
- **Rendimiento:** fuentes Inter autoalojadas (sin CDN), iconos SVG y sin dependencias de terceros.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Marcado | HTML5 semántico |
| Tipografía | Inter (200–900), autoalojada |
| Iconografía | SVG |
| Gestión de proyecto | Jira, Miro, GitHub |

> **Nota de Alcance:** SumaqAgro es exclusivamente software en la nube; no contempla sensores físicos ni dispositivos IoT.

---

## Ejecución Local

No requiere compilación ni instalación de dependencias.

```bash
# 1. Clonar el repositorio
cd sumaqAgro-landing-page

# 2. Abrir directamente index.html en el navegador, o servirlo localmente:
python3 -m http.server 8080
# → http://localhost:8080
```

## Estructura de Directorios

```text
sumaqAgro-landing-page/
├── index.html                # Página principal
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

---

## Licencia

Distribuido bajo la licencia **CC BY-NC-SA 4.0**. Ver [`LICENSE.md`](LICENSE.md).

© 2026 Dymbia — SumaqAgro.
