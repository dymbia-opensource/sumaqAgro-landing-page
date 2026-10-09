# Contributing to SumaqAgro Landing Page

Thank you for contributing to the SumaqAgro landing page! This document defines the project structure, coding conventions, Git workflow, and review process for maintaining a consistent and accessible website.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Development Setup](#development-setup)
3. [Git Workflow & Branching Strategy](#git-workflow--branching-strategy)
4. [Conventional Commits](#conventional-commits)
5. [HTML, CSS & JavaScript Guidelines](#html-css--javascript-guidelines)
6. [Internationalization](#internationalization)
7. [Accessibility & Responsive Design](#accessibility--responsive-design)
8. [Assets & Legal Pages](#assets--legal-pages)
9. [Semantic Versioning](#semantic-versioning)
10. [Quality Assurance](#quality-assurance)
11. [Pull Request Process](#pull-request-process)

---

## Project Structure

The landing page uses HTML, CSS, and JavaScript.

```text
sumaqAgro-landing-page/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── fonts/
│   │   ├── images/
│   │   └── js/
│   │       ├── i18n/
│   │       │   ├── en.js
│   │       │   └── es.js
│   │       └── script.js
│   └── sections/
│       ├── cookie.html
│       ├── policy.html
│       └── service.html
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── index.html
├── package.json
└── README.md
```

### Responsibilities

- `index.html`: Main landing page content and structure.
- `styles.css`: Shared visual styles, layouts, and responsive rules.
- `script.js`: Navigation, language selection, pricing interactions, and application initialization.
- `i18n/en.js` and `i18n/es.js`: English and Spanish translation dictionaries.
- `public/sections/`: Privacy Policy, Terms of Service, and Cookie Policy pages.
- `public/assets/images/`: Images and video assets referenced by the website.

---

## Development Setup

### Prerequisites

- Git.
- A code editor.
- A modern web browser.
- A local static web server for previewing the website.

### Clone the Repository

```bash
git clone https://github.com/dymbia-opensource/sumaqAgro-landing-page.git
cd sumaqAgro-landing-page
```

Open the project in your editor and serve the repository root using a local static server, such as the Live Server extension for Visual Studio Code.

Serving the repository root ensures that `index.html` and the `public/` directory are available together.

### Available Scripts

The supplied `package.json` does not declare dependencies or development, build, or lint scripts.

Its current `test` script is a placeholder that exits with an error. It must not be treated as an automated test suite.

Do not document or require commands such as `npm start`, `npm run build`, or `npm run lint` unless those scripts are added to the project.

---

## Git Workflow & Branching Strategy

Use the following workflow for contributions:

- `main`: Stable release branch.
- `develop`: Integration branch for completed changes.
- `feature/<short-description>`: New features, enhancements, and documentation updates.
- `bugfix/<short-description>`: Non-urgent corrections.
- `release/v<version>`: Release preparation.
- `hotfix/<short-description>`: Urgent corrections to the stable version.

Create feature and bugfix branches from `develop` and submit pull requests back to `develop`.

### Branch Examples

```text
feature/update-changelog
feature/team-video
feature/legal-pages
bugfix/language-switcher
bugfix/mobile-navigation
```

### Starting a Contribution

Commit or stash existing local changes before switching branches.

```bash
git switch develop
git pull origin develop
git switch -c feature/short-description
```

Keep each branch focused on one related change.

---

## Conventional Commits

Use the following commit format:

```text
<type>(<scope>): <short description>
```

Write concise descriptions in English using the imperative mood.

### Commit Types

| Type | Purpose |
|------|---------|
| `feat` | Add a feature or capability. |
| `fix` | Correct a defect. |
| `docs` | Update documentation. |
| `style` | Change formatting without changing behavior. |
| `refactor` | Restructure code without adding a feature or fixing a defect. |
| `perf` | Improve performance. |
| `test` | Add or update automated tests. |
| `build` | Change dependencies or build configuration. |
| `ci` | Change continuous integration configuration. |
| `chore` | Perform maintenance tasks. |

### Scopes

Use descriptive scopes such as:

```text
landing
i18n
pricing
navigation
legal
assets
config
```

### Examples

```text
feat(landing): add team video section
fix(i18n): correct billing period labels
fix(navigation): close mobile menu after selecting a link
docs(landing): update changelog
refactor(landing): organize application initialization
chore(assets): remove unused images
```

Use `docs` for changes limited to `README.md`, `CHANGELOG.md`, or `CONTRIBUTING.md`.

---

## HTML, CSS & JavaScript Guidelines

### HTML

- Use semantic elements such as `header`, `nav`, `main`, `section`, and `footer`.
- Maintain a logical heading hierarchy.
- Keep element IDs unique and consistent with navigation links.
- Use buttons for actions and links for navigation.
- Keep asset paths correct relative to each HTML file.
- Preserve translation attributes when editing localized content.

### CSS

- Maintain shared styles in `public/assets/css/styles.css`.
- Follow the existing class naming conventions, such as `demo__content` and `button--primary`.
- Reuse existing colors, typography, spacing, and component styles.
- Prefer reusable classes over repeated inline styles.
- Avoid changes that unintentionally affect other sections or legal pages.
- Ensure layouts remain usable on desktop and mobile screens.

### JavaScript

- Maintain website interactions in `public/assets/js/script.js`.
- Use `const` by default and `let` when reassignment is necessary.
- Use descriptive `camelCase` names for functions and variables.
- Keep initialization functions focused on their responsibilities.
- Check that an element exists before attaching page-specific behavior.
- Ensure the shared script works on both the landing page and legal pages.
- Keep visual states and accessibility attributes synchronized.

---

## Internationalization

The website supports English and Spanish through:

```text
public/assets/js/i18n/en.js
public/assets/js/i18n/es.js
```

### Translation Rules

- Add matching translation keys to both dictionaries.
- Use the existing `window.i18nDictionary` structure.
- Connect translated HTML content through `data-i18n`.
- Use descriptive keys consistent with existing sections.
- Preserve the selected language through the `preferredLang` local storage key.
- Update `document.documentElement.lang` when switching languages.
- Verify that pricing labels remain consistent with the selected language and billing period.
- Check translations on both the landing page and legal pages.

### Example

```html
<h2 data-i18n="demo_title">See SumaqAgro in action</h2>
```

Only include trusted, project-controlled markup in translation values because the current implementation inserts translated content using `innerHTML`.

---

## Accessibility & Responsive Design

- Provide descriptive alternative text for informative images.
- Use empty `alt` attributes for decorative images.
- Preserve skip-to-content navigation.
- Ensure interactive controls can be operated with a keyboard.
- Maintain visible keyboard focus indicators.
- Update `aria-expanded` when opening or closing navigation.
- Update `aria-pressed` when changing the billing selection.
- Provide visible labels or accessible names for controls.
- Aim for WCAG AA color contrast.
- Verify that content does not overflow horizontally on small screens.
- Add captions or a transcript when spoken video content requires them.

---

## Assets & Legal Pages

### Images and Videos

- Store assets in the appropriate directory under `public/assets/`.
- Prefer descriptive, lowercase, hyphen-separated filenames for new assets.
- Optimize image and video sizes before committing.
- Update all references when renaming or moving assets.
- Confirm that assets are authorized for use and distribution.
- Verify video playback, controls, and fallback text.
- Remove an asset only after confirming it is no longer referenced.

### Legal Pages

- Maintain shared styles and branding across legal pages.
- Preserve relative links to the homepage, assets, and scripts.
- Add matching English and Spanish translations for changed content.
- Keep descriptions of data collection and storage consistent with actual website behavior.
- Coordinate changes to legal commitments and licensing with the project maintainers.

---

## Semantic Versioning

Use the following version format:

```text
MAJOR.MINOR.PATCH
```

- **MAJOR**: Changes that break established public behavior or integrations.
- **MINOR**: Backward-compatible features and capabilities.
- **PATCH**: Backward-compatible defect corrections.

Update `package.json` and `CHANGELOG.md` together when preparing a release.

Record changes under the appropriate changelog categories:

- `Added`
- `Changed`
- `Deprecated`
- `Removed`
- `Fixed`
- `Security`

Include only categories that contain actual changes. Do not invent release dates, corrections, or removals.

---

## Quality Assurance

The supplied project configuration does not include an automated test suite. Validate changes manually before submitting a pull request.

### Manual Verification

- Open the landing page through a local static server.
- Verify desktop and mobile layouts.
- Test navigation links and mobile menu behavior.
- Switch between English and Spanish.
- Reload the page and confirm that the selected language persists.
- Test monthly and annual pricing in both languages.
- Verify savings badge interaction using the mouse and keyboard.
- Open all legal pages and test their navigation and language controls.
- Confirm that images and videos load correctly.
- Check keyboard navigation and visible focus states.
- Inspect the browser console for JavaScript errors.
- Check the network panel for missing assets.

Registration and sign-in links point to the web application. Confirm their destination against the intended deployment configuration.

---

## Pull Request Process

Before submitting a pull request:

- [ ] Keep the change focused on a clear purpose.
- [ ] Follow the existing HTML, CSS, and JavaScript conventions.
- [ ] Use Conventional Commits.
- [ ] Add matching English and Spanish translation keys when needed.
- [ ] Verify desktop and mobile layouts.
- [ ] Check keyboard interaction and accessibility attributes.
- [ ] Confirm that referenced assets and links resolve correctly.
- [ ] Complete the relevant manual checks.
- [ ] Update documentation and the changelog when appropriate.
- [ ] Target `develop` for feature and bugfix contributions.

### Pull Request Description

Include:

- The problem or requirement addressed.
- A brief description of the resulting behavior.
- Screenshots for visible interface changes.
- The validation performed.
- Any remaining limitations.

Request a maintainer review before merging.