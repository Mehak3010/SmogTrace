# Stubble Burning → Delhi Smog Dashboard

Standalone React app wrapping `StubbleDashboard.jsx`. Data (fire counts, PM2.5,
model predictions, feature importance, fire hotspots) is embedded directly in
the component — no backend or API calls needed.

## Setup

Requires Node.js 18+ (check with `node -v`).

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

Outputs static files to `dist/` — deployable to Vercel, Netlify, GitHub Pages,
or any static host.

## Updating the data

The component reads from Phase 1's `master_dashboard_data.csv` at build time —
it's already baked into `src/StubbleDashboard.jsx` as JS constants
(`DAILY`, `LAG_CORR`, `TEST_PREDS`, `IMPORTANCE`, `HOTSPOTS`, `METRICS`).
To refresh with new data, re-run `stubble_pm25_model.py` from Phase 1 and
regenerate those constants, or ask Claude to rebuild the dashboard from an
updated dataset.
