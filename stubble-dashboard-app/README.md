# Stubble Burning → Delhi Smog Dashboard

A real multi-page React app (client-side routed with React Router) analyzing
whether Punjab/Haryana stubble fires predict Delhi-NCR PM2.5. Each section is
a genuine route with its own URL — bookmarkable and deep-linkable, not just a
tab-switched single view.

## Pages / routes

| Route | Page |
|---|---|
| `/signal` | Smoke transport lag-correlation chart |
| `/trends` | Season explorer (fire count vs PM2.5 over time) |
| `/geo-model` | Fire hotspot map + model actual-vs-predicted |
| `/drivers` | Feature importance (what drives the prediction) |
| `/simulator` | Interactive what-if PM2.5 predictor |
| `/data-log` | Data quality / methodology notes |

## Setup

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173) — it'll redirect to
`/#/signal` by default.

## Why hash-based routing (`/#/signal` not `/signal`)

This uses `HashRouter`, so routes live after a `#`. That's deliberate: it
means the app works correctly on **any** static host (GitHub Pages, a plain
`file://` open, or a CDN) with zero server configuration. Switching to
`BrowserRouter` for clean URLs (`/signal` instead of `/#/signal`) is a
one-line change in `src/main.jsx` — but then your host needs an SPA fallback
rule (serve `index.html` for all unmatched paths), which most static hosts
require you to configure explicitly (Vercel/Netlify do this automatically;
plain `nginx`/GitHub Pages need a rewrite rule added).

## Project structure

```
src/
├── App.jsx              # Route definitions
├── main.jsx             # Entry point, wraps App in HashRouter
├── data.js               # All chart data + the simulator's model coefficients
├── theme.js              # Shared colors, fonts, AQI helpers
├── components/
│   ├── Layout.jsx         # Header, KPI strip, nav — wraps every page
│   └── Shared.jsx         # Small reusable pieces (KpiCard, SectionLabel, etc.)
└── pages/                 # One file per route
    ├── SignalPage.jsx
    ├── TrendsPage.jsx
    ├── GeoModelPage.jsx
    ├── DriversPage.jsx
    ├── SimulatorPage.jsx
    └── DataLogPage.jsx
```

## Build for deployment

```bash
npm run build
```

Outputs static files to `dist/` — deployable anywhere that serves static
files, no special server config needed (thanks to hash routing).

## Updating the data

`src/data.js` holds everything: daily fire/PM2.5 series, lag correlations,
model test predictions, feature importances, hotspot coordinates, and the
simulator's raw model coefficients. Re-run `stubble_pm25_model.py` from
Phase 1 to regenerate the underlying numbers, or ask Claude to rebuild this
file from an updated dataset.
