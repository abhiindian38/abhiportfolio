## Purpose

Short, actionable guidance to help AI coding agents be productive in this repository.

## Big picture

- Tech: React 19 + TypeScript + Vite. Styling with Tailwind CSS v4. Animation via Framer Motion and Three.js. Project is a single-page portfolio app.
- Structure: source lives under `src/`. Key folders:
  - `src/components/` — all React UI components (e.g. `ThemeProvider`, `Navbar`, `Projects`).
  - `src/lib/` — small utilities and app-level data (e.g. `translations.ts`, `useLanguage.ts`).
  - `public/` — static assets, manifest, verification files.
- Entrypoint: `src/main.tsx` mounts `<App/>` wrapped with `ThemeProvider` and `HelmetProvider`.
- Build: Vite is the dev/build tool. `vite.config.ts` sets an alias `@ -> src` and enables Tailwind plugin.

## How to run / build / lint

- Dev server: `pnpm dev` or `npm run dev` (runs `vite`).
- Build: `pnpm build` or `npm run build` (runs `tsc && vite build`). Note: the build runs TypeScript compilation first.
- Preview production build: `pnpm preview` or `npm run preview`.
- Lint: `pnpm lint` or `npm run lint` (runs ESLint).

Reference: `package.json` scripts. Always prefer the project's package manager for installs (pnpm is present in repo via `pnpm-lock.yaml`).

## Project-specific conventions & patterns

- Theme handling

  - `src/components/theme-provider.tsx` implements the theme system. It stores the user's preference under the storage key `vite-ui-theme` (default).
  - The provider sets a `light` or `dark` class on `document.documentElement`. Code that relies on theme should read these classes (don't assume CSS variables only).
  - Use the exported `useTheme()` hook to read/set theme.

- Translations / language

  - `src/lib/translations.ts` contains the translations object. Current code (`src/lib/useLanguage.ts`) returns `translations.en` and a fixed `language: "en"`.
  - To add another language: extend `translations` and update `useLanguage` or create a runtime selector. Don’t assume a dynamic i18n framework is present.

- Code organization
  - Components are small, functional, and colocated in `src/components/`.
  - Re-usable config or data lives in `src/lib/`.
  - Use the `@` alias for imports into `src/` (e.g. `import X from '@/components/X'`). This is defined in `vite.config.ts`.

## Integration points & external deps

- Email sending: `@emailjs/browser` used for contact form interactions.
- Analytics: `@vercel/analytics` and `@vercel/speed-insights` referenced in repo/readme.
- 3D/graphics: `three`, `@react-three/fiber`, `@react-three/drei` are used for background/visual components.

## Quick examples (copy-paste friendly)

- Changing the theme from a component:

  - import { useTheme } from '@/components/theme-provider'; const { setTheme } = useTheme(); setTheme('dark');

- Reading translations in a component:
  - import { useLanguage } from '@/lib/useLanguage'; const { t } = useLanguage(); then use `t.sections` or other keys from `translations.ts`.

## Files to read first (recommended order)

1. `src/main.tsx` — see how the app is mounted and providers wired.
2. `src/components/theme-provider.tsx` — theme behavior and storage.
3. `src/lib/translations.ts` + `src/lib/useLanguage.ts` — translation data and accessor.
4. `vite.config.ts` — alias and build options.

## What to avoid / gotchas

- Don't assume dynamic i18n is implemented — `useLanguage` currently hardcodes English.
- The build runs `tsc` before `vite build`; changes that introduce type errors will break `npm run build`.
- Theme is controlled by adding `light`/`dark` classes to the root element — CSS selectors may depend on these exact class names.

## Where to extend

- Add UI components in `src/components/` and keep them focused and small.
- Add shared utilities or constants to `src/lib/`.
- When adding translations, update `src/lib/translations.ts` and the consumer hook `useLanguage`.

---

If any section is unclear or you want more examples (tests, new feature wiring, or PR-style commits), tell me which area to expand and I will update this file.
