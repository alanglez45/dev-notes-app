# JS Notes — Agent Guide

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `sync-notes` → `tsc -b` → `vite build` (order matters) |
| `npm run lint` | ESLint flat config on all files |
| `npm run preview` | Vite preview of production build |
| `npm run sync-notes` | Regenerate `public/data/notes-index.json` from markdown files |

## Build note

`npm run build` runs three steps sequentially. Running just `tsc -b` or `vite build` alone produces stale output if markdown notes changed. No separate typecheck script — `tsc -b` is embedded in the build.

## Architecture

- **SPA** — React 19 + TypeScript 6 + Vite 8 + react-router-dom v7
- **Entry** — `src/main.tsx` renders into `<div id="root">`
- **Routes** — `/` (IndexPage), `/:category` (CategoryPage: index.md + cards with checkboxes), `/:category/:slug` (NotePage)
- **Layout** — `App.tsx` renders header (hamburger, logo, SearchBar, ExportButton, ThemeToggle) + `<Sidebar>` + `<Outlet>`
- **Sidebar** — Category buttons only (no dropdown, no note list). Each navigates to `/:category`.
- **CategoryPage** — Renders the category's `index.md` (markdown intro) + note cards with checkboxes for export selection
- **Notes** — Markdown files in `public/notes/<category>/*.md`, read at build time
- **Notes index** — `scripts/sync-notes.mjs` parses `public/notes/index.md` for ordering/descriptions and emits `public/data/notes-index.json`
- **Contexts** — `ThemeProvider` (dark/light), `SelectionProvider` (export checkboxes), `NotesContext` (index data)
- **Export** — html2canvas + jspdf via `ExportButton`/`ExportModal`
- **Styling** — plain CSS (`normalize.css`, `index.css`), no framework
- **Fonts** — DM Sans (body), JetBrains Mono (code), Inter (UI) — loaded from Google Fonts in `index.html`
- **Deploy** — Netlify SPA redirect rules in `netlify.toml`

## TypeScript gotchas

- `verbatimModuleSyntax` — use `import type` for type-only imports
- `erasableSyntaxOnly` — no enums, no namespaces, no parameter properties
- `noUnusedLocals` + `noUnusedParameters` — will error on unused declarations
- Project references: `tsconfig.app.json` (src/) + `tsconfig.node.json` (vite.config.ts only)
- `types: ["vite/client"]` in app tsconfig (no `@types/node` in app scope)

## ESLint

Flat config in `eslint.config.js` with `react-refresh` rule — components must be exported as named or default export (inline function expressions without export will lint-error).

## Notes content workflow

1. Create `public/notes/<CategoryName>/my-note.md` with a `# Title` heading
2. Add entry in `public/notes/index.md`: `- [My Note](CategoryName/my-note.md) - Optional description`
3. Each category should have an `index.md` for its category page (visible at `/:category`)
4. Run `npm run sync-notes` (or `npm run build`) to regenerate index
5. Category icons are mapped in `scripts/sync-notes.mjs` (`iconMap`)

## Tests

No test framework is installed. No test commands.

## What is NOT in this repo

- `docker.txt` is personal Docker learning notes, not part of the app
- `src/utils/` exists but is empty
