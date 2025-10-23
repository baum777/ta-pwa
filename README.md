# TA-PWA Starter (Vite + React + TS + Tailwind + PWA + lightweight-charts)

Minimal, fast starter tailored for a trading PWA MVP. Includes:
- **Vite + React + TypeScript**
- **Tailwind** with brand tokens (Neon-Orange, Neon-Green, etc.)
- **vite-plugin-pwa** (autoUpdate, offline)
- **ESLint + Prettier** (TS-first, no-undef off, no-unused-vars warn)
- **lightweight-charts** demo with a tiny Replay stub

## Quickstart
```bash
pnpm install         # or npm/yarn
pnpm dev             # http://localhost:5173
pnpm build && pnpm preview
```

## Where to add features next
- `/src/features/replay` — plug real tick feed + buffer + playhead
- `/src/components/chart` — add overlays, markers, theme switch
- `/src/lib` — utils, API clients, wallet adapters

> Tip: Use Hono on an Edge runtime to proxy DEX/X/Helius and add rate limits.


---

## Troubleshooting (Black screen / CSP / Icons)

- **Black screen after flash**: likely cached **Service Worker** or runtime error.
  - DevTools → Application → Service Workers → *Unregister*; Clear Storage → *Clear site data*; Hard Reload.
  - Search for `getData(` in code; it should **not** exist. We pass chart data via `onReady({ data })`.
- **CSP blocks 'eval' in dev**: Vite React Refresh may need `'unsafe-eval'` in dev.
  - In `index.html` there is a **DEV-ONLY** CSP `<meta>` commented block. Uncomment while running `pnpm dev`. Remove it for production or just keep it commented.
  - Alternatively, run a production build: `pnpm build && pnpm preview` (no eval needed).
- **Manifest icon error**: Now using real PNGs at `/public/icons/icon-192.png` and `/public/icons/icon-512.png`.


### Black-Screen Isolation
- Run dev: `pnpm dev`
- Visit `http://localhost:5173/?safe=1` → If shell shows, the issue is inside the chart.
- Visit without `?safe=1` → If it breaks, check the on-screen red **Runtime Error** panel and DevTools console.
- No PWA in this build; zero SW/CSP impact.
