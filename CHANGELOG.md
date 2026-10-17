# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-10-10

### Added

- **Immersive hero**: illustrated Andean landscape in SVG layers (sunrise, satellite scanning the fields, snow-capped peaks, terraces with coffee shrubs and a farmer using the app) with scroll and pointer parallax.
- **Glass pill navigation** over the hero (active section highlighted, EN/ES pill, dark CTA) that turns solid after scrolling.
- **Platform showcase** with an infinite marquee and the dashboard screenshot.
- **Conversion-oriented structure**: new sections *The challenge* (with official sources), *How it works*, *FAQ* and a final plan finder that recommends a plan by profile.
- **Solutions filter** by profile (farmer, cooperative, advisor) — US-06.
- **Testimonials carousel** with keyboard and arrow navigation — US-08.
- **Lazy demo video** that loads YouTube only after pressing play — US-05.
- **Legal policies in a modal dialog** with fallback to the full page — US-09.
- **GitHub links** on team cards — US-04.
- Real screenshots of the SumaqAgro web app in the hero and *How it works*.
- `404.html`, canonical URL, absolute Open Graph image and JSON-LD `SoftwareApplication` data.
- `data-i18n-attr` support to translate `alt` and `aria-label` attributes; browser language detection.

### Changed

- Visual identity aligned with the Style Guidelines: teal/green palette, Poppins headings, Inter body text and 8 px spacing.
- Plans now list features, show the monthly equivalent for annual billing and link to the web app with the selected plan.
- Impact section shows Lean UX goals instead of market statistics, which moved to *The challenge*.
- Footer links now point to SumaqAgro modules instead of placeholder products.
- Legal pages redesigned; Cookie Policy describes what the website actually stores.

### Removed

- Unused images, social PNG icons and Inter weights 200, 300, 800 and 900; images converted to WebP (~5 MB → ~620 KB).

## [2.0.0] - 2026-10-09

### Added

- **About the Team**:
  - Dedicated team video section with descriptive content and internationalization support.
- **Internationalization**:
  - Modular English and Spanish translation dictionaries.
  - Spanish translations for legal pages.
  - Support for multiple language toggle buttons.
- **Application Initialization**:
  - Modular `initApp` function for initializing navigation, pricing, and language selection.
- **Legal Page Assets**:
  - Icons for policy and service pages.
- **Project Documentation**:
  - Landing page documentation in `README.md`.
  - `CHANGELOG.md` and `LICENSE.md`.

## [1.1.0]

### Added
- **Legal Pages**:
  - Privacy Policy (`public/sections/policy.html`) describing information collection, data usage, protection, and contact details.
  - Terms of Service (`public/sections/service.html`) covering service acceptance, user accounts, intellectual property, and liability.
  - Cookie Policy (`public/sections/cookie.html`) describing cookie categories and browser management options.
  - Shared branding, footer navigation, and language controls across legal pages.
- **Internationalization**:
  - English and Spanish language switching through `data-i18n` attributes and language dictionaries in `public/assets/js/i18n/`.
  - Language preference persistence using `localStorage`.
  - Dynamic updates to the document language and language button accessibility labels.
  - Billing period translations when changing languages.
- **Interactive Navigation and Pricing**:
  - Mobile navigation toggle with dynamic `aria-expanded` states.
  - Automatic menu closure when selecting a navigation link or clicking outside the menu.
  - Monthly and annual billing selection with dynamic price updates.
  - Annual billing selection through the savings badge, including Enter and Space keyboard support.
- **Product Demonstration**:
  - HTML5 video player referencing `public/assets/images/Recording-20261009_092557.webm`.

## [1.0.0]

### Added
- **Landing Page (`index.html`)**:
  - Hero section presenting SumaqAgro and its precision agriculture value proposition.
  - About Us section describing the platform and its focus on Peruvian potato and coffee growers.
  - Audience cards for independent farmers, cooperative leaders, and technical advisors.
  - Solutions section presenting satellite monitoring, cost accounting, digital harvest quality certification, and agronomic alerts.
  - Pricing cards for Seed Plan, Cooperative Pro, and Technical Advisor Plan, with monthly and annual price data.
  - Impact section with agricultural metrics and user testimonials.
  - Team section with member profiles, photographs, and responsibilities.
  - About the Team video placeholder.
  - Registration calls to action and links to `/app/login` and `/app/register`.
- **Page Structure and Navigation**:
  - Header with brand identity, section navigation, and account access links.
  - Footer with product, company, support, social media, and legal navigation areas.
  - Asset organization under `public/assets/`, including CSS, fonts, images, and JavaScript directories.
- **Metadata and Accessibility**:
  - Page title, description, keywords, author metadata, and Open Graph tags.
  - Favicon reference and viewport configuration.
  - Semantic HTML sections, descriptive image alternative text, and skip-to-content navigation.
  - Accessible labels for navigation and interactive controls.

### Changed

- **Project Structure**: Reorganized assets and legal pages under `public/assets/` and `public/sections/`.
- **Product Demonstration**: Replaced the previous video player with an embedded YouTube iframe and updated its styles.
- **Project Documentation**: Updated README layout and project structure information.

### Removed

- Unused SVG icons and obsolete image assets during asset cleanup.
- Previous product demo video player implementation, replaced by the YouTube embed.

### Fixed
- Landing page title, meta description, and keyword content.
- Header, hero, and About Us text content.
- Team section content and positioning.
- Text content across audience, solutions, demo, and pricing sections.
- Impact, testimonials, and call-to-action text.
- Language switcher logic and billing period labels.
- Monthly and annual billing toggle behavior and period display.
- Internationalization logic and translated content for legal pages.
- Asset structure and internationalization paths after directory reorganization.

