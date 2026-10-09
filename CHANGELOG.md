# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
