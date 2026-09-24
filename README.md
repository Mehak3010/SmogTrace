# 🔥 Stubble Burning → Delhi Smog

**Does Punjab/Haryana crop-residue burning predict Delhi-NCR's PM2.5?**

A data pipeline, predictive model, and interactive dashboard analyzing four
autumn burning seasons (2022–2025) of NASA satellite fire data against
Delhi-NCR air quality readings — built to answer one question with real
numbers instead of received wisdom.

---

## TL;DR

- **Yes, fires predict smog** — same-day/next-day fire activity correlates with
  Delhi PM2.5 at **r = 0.44**, decaying over the following week. That lag
  shape is consistent with a ~12–36 hour Punjab-to-Delhi smoke transport
  window, and it holds across all four seasons.
- A **Ridge regression** trained on 2022–2024 and tested on the held-out 2025
  season explains **48% of the variance** in daily PM2.5 (R² = 0.481) using
  only fire-activity features — no weather data yet.
- **2025's fire counts genuinely collapsed** (3,430 detections vs. 36,310 in
  2022) — independently corroborated by Punjab Pollution Control Board
  figures, not a data artifact. See [`PHASE1_FINDINGS.md`](./PHASE1_FINDINGS.md)
  for the full writeup, including a data-quality issue that was caught and
  corrected.

| Model | R² | MAE | RMSE |
|---|---|---|---|
| **Ridge (regularized linear)** | **0.481** | 39.0 | 52.4 |
| Random Forest | 0.462 | 41.1 | 53.3 |
| XGBoost | 0.415 | 43.2 | 55.6 |

---

## What's in here

```
.
├── PHASE1_FINDINGS.md          # Full write-up: methodology, findings, caveats
├── prepare_dashboard_data.py   # Merges NASA FIRMS fire data + OpenAQ PM2.5 into one daily table
├── stubble_pm25_model.py       # Feature engineering + Ridge / RF / XGBoost model comparison
├── dashboard/                  # Single-view React dashboard (data embedded at build time)
└── stubble-dashboard-app/      # Multi-page React app (routed: signal, trends, model, simulator)
```

Two dashboards exist because they answer different needs: `dashboard/` is a
quick embedded snapshot view, while `stubble-dashboard-app/` is a fuller,
routed exploration tool (see its own README for the page list). Both are
Vite + React and can be deployed as static sites.

## Data sources

- **Fire detections:** [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/) VIIRS,
  NOAA-20/JPSS-1 (J1V), Punjab & Haryana, Oct–Nov 2022–2025
- **Air quality:** [OpenAQ](https://openaq.org/) v3 API, Delhi-NCR PM2.5 sensors

> **Note:** The raw and processed datasets (`AQI Datasets/`, `*.csv`) are
> **not included in this repository**. They were shared under a data-use
> permission for this project and are excluded via `.gitignore`. To
> reproduce the pipeline, request access to the same FIRMS export and an
> OpenAQ API key, then run `prepare_dashboard_data.py` followed by
> `stubble_pm25_model.py`.

## Running the pipeline

```bash
pip install pandas requests scikit-learn xgboost numpy

# 1. Merge fire + air quality data into master_dashboard_data.csv
export OPENAQ_API_KEY="your-key-here"
python prepare_dashboard_data.py

# 2. Engineer features, train models, evaluate on held-out 2025 season
python stubble_pm25_model.py
```

## Running a dashboard

```bash
cd dashboard              # or stubble-dashboard-app
npm install
npm run dev
```

## Methodology notes worth knowing

- Only NOAA-20 (J1V) fire detections are used, never mixed with S-NPP (SV),
  so fire counts are comparable year over year.
- Models are evaluated on a genuine **time-based split** — trained on
  2022–2024, tested on the fully held-out 2025 season — not a random or
  interpolated split, so the reported R² reflects real forecasting skill.
- The dominant predictive features are 3-day and 7-day cumulative fire
  activity and prior-day fire count, not same-day fire count alone —
  consistent with a real atmospheric transport lag rather than a
  same-day coincidence.

## What's next

The lag-decay pattern is itself indirect evidence that wind-driven smoke
transport is the biggest missing variable. Adding meteorological data (wind
speed/direction, temperature, humidity, boundary-layer height) is the
highest-value next step toward a stronger model.

---

*Phase 1 analysis. See [`PHASE1_FINDINGS.md`](./PHASE1_FINDINGS.md) for full
detail, data-quality corrections, and season-by-season figures.*
