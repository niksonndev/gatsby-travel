# Gatsby Travel

Modern travel website built with **Gatsby 5**, **React 19**, and **TypeScript**: destinations, testimonials, stats, newsletter signup, and contact page. Accessible (WCAG 2.2 AA), multilingual (PT, EN, ES), and deployed via GitHub Actions.

## ✨ Tech stack

- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) (i18n)
- [GitHub Actions](https://github.com/features/actions)
- [pnpm](https://pnpm.io/)

## 🚀 Features

- **Travel landing page**: Hero with video, trips grid, testimonials, stats, and email capture form.
- **Contact page**: `/contact` with email, phone, and office info.
- **Responsive layout**: Desktop, tablet, and mobile; functional hamburger menu on mobile (keyboard and Escape to close).
- **Accessibility (WCAG 2.2 AA)**:
  - Skip link “Skip to main content” and visible focus on links/buttons.
  - Logical heading hierarchy (h1 → h2 → h3), form labels, `aria-describedby`/`aria-invalid` for errors.
  - Live regions (aria-live) for language change and newsletter result (success/error).
  - Visible error and success messages announced by screen readers; focus returns to the field on validation error.
- **Internationalization (i18n)**: Portuguese, English, and Spanish with language switcher in the header.
- **SEO**: Reusable `Seo` component using Gatsby `useStaticQuery`.
- **Deploy**: GitHub Pages via GitHub Actions.

## 🧩 Project scripts

From the project root:

- `pnpm develop` – start Gatsby dev server at `http://localhost:8000`
- `pnpm build` – production build (with `--prefix-paths` for GitHub Pages)
- `pnpm serve` – serve the production build locally
- `pnpm clean` – clear Gatsby cache
- `pnpm format` – run Prettier on the codebase
- `pnpm lint` – run ESLint on `src/**/*.{ts,tsx}`

## 🛠 How to run locally

```bash
git clone <repo-url>
cd gatsby-travel
pnpm install
pnpm dev
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## 👤 Author

**niksonndev**

- Email: <niksonndev@gmail.com>
- GitHub: [@niksonndev](https://github.com/niksonndev)
- LinkedIn: [nikson-rotondaro](https://www.linkedin.com/in/nikson-rotondaro/)
