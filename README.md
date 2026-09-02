# Pedro Henrique Rocha Moy - Resume

Personal resume website showcasing professional experience, portfolio projects, and education.

**Live:** https://rocha-moy-engineering-technology.github.io/resume

## Screenshots

Captured from the production build; sources in `docs/screenshots/`.

| View          | Light                                                                   | Dark                                                                  |
| ------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Desktop       | ![Desktop, light theme](docs/screenshots/desktop-light.png)             | ![Desktop, dark theme](docs/screenshots/desktop-dark.png)             |
| Mobile        | ![Mobile, light theme](docs/screenshots/mobile-light.png)               | ![Mobile, dark theme](docs/screenshots/mobile-dark.png)               |
| Contact modal | ![Contact modal, light theme](docs/screenshots/contact-modal-light.png) | ![Contact modal, dark theme](docs/screenshots/contact-modal-dark.png) |

## Design

The site shares its design system with the
[rmet-publishing blog](https://rocha-moy-engineering-technology.github.io/rmet-publishing/):
black ground, Barlow Condensed set in uppercase for display type, Barlow for
body copy, hairline rules instead of filled cards, square corners, and no accent
colour. The shared vocabulary lives in `src/app.css` as `display`, `label`,
`icon-link`, `entry`, `entry-title`, `chip` and `action`; those class names mean
the same thing on both sites.

## Features

- Professional experience timeline with role descriptions and technology tags
- Portfolio section highlighting key projects
- Education history
- Downloadable PDF resume
- Contact form powered by [Web3Forms](https://web3forms.com/)
- Responsive two-column layout (desktop) with single-column mobile fallback
- Light and dark themes that follow the visitor's system preference, with a
  navbar toggle whose choice is remembered and applied before first paint

## Tech Stack

- **Framework:** Svelte 5 + Vite
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest (unit), Playwright (e2e). Set `PLAYWRIGHT_CHROMIUM_PATH`
  to run the end-to-end suite against a supplied Chromium, for example in a
  container with no downloadable browser; unset, it uses the usual one.
- **Deployment:** GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev        # Start dev server
npm run build      # Production build
npm run test       # Run unit tests
npm run test:e2e   # Run end-to-end tests
npm run validate   # Format, type-check, lint, test, and build
```

## Links

- [GitHub](https://github.com/phrmoy)
- [LinkedIn](https://www.linkedin.com/in/phrmoy/)
- [Toptal Profile](https://www.toptal.com/developers/resume/pedro-henrique-rocha-moy)
