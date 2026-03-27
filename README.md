# AIRMEIZ React Website

This repository is now React-first and React-only for active website behavior.

## Active App Root

- `react-app/index.html`
- `react-app/src/main.tsx`
- `react-app/src/App.tsx`

## Run The Real App

From repo root:

```bash
npm run dev
```

Or directly:

```bash
cd react-app
npm run dev
```

Open:

- `http://localhost:5173`

## Build / Preview

```bash
npm run build
npm run preview
```

## Legacy Static Site

Old static HTML site files were isolated and are no longer active:

- `legacy-static/public-legacy/`
- `legacy-static/QUICKSTART.html`

Do not run `python -m http.server` against `public/` for the main site.

## Notes

- `public/` is now asset/support-only for the React build pipeline.
- Legacy `.html` project routes are redirected to React routes via `public/_redirects`.
