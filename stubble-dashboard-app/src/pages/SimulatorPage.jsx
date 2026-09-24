import React, { useState, useMemo } from 'react';
import { simulatePM25 } from '../data';
import { COLORS, mono, sans, aqiColor, aqiLabel } from '../theme';
import { SectionLabel } from '../components/Shared';

export default function SimulatorPage() {
  const [simFireCount, setSimFireCount] = useState(800);
  const [simDay, setSimDay] = useState(30);
  const simPred = useMemo(() => simulatePM25(simFireCount, simDay), [simFireCount, simDay]);

  return (
    <div style={{ marginBottom: 20 }}>
      <SectionLabel eyebrow="What-if" title="Predict PM2.5 from fire activity" />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.8fr)', gap: 20 }}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px' }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: COLORS.textMute, marginBottom: 16 }}>SCENARIO: SUSTAINED BURNING</div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: sans, fontSize: 13, color: COLORS.text }}>Fires per day in Punjab/Haryana</span>
              <span style={{ fontFamily: mono, fontSize: 14, color: COLORS.ember, fontWeight: 600 }}>{simFireCount.toLocaleString()}</span>
            </div>
            <input type="range" min={0} max={3000} step={50} value={simFireCount}
              onChange={e => setSimFireCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: COLORS.ember }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, color: COLORS.textDim, marginTop: 4 }}>
              <span>0 (none)</span>
              <span>3,000 (extreme)</span>
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: sans, fontSize: 13, color: COLORS.text }}>Point in the burning season</span>
              <span style={{ fontFamily: mono, fontSize: 14, color: COLORS.haze, fontWeight: 600 }}>Day {simDay}</span>
            </div>
            <input type="range" min={0} max={60} step={1} value={simDay}
              onChange={e => setSimDay(Number(e.target.value))}
              style={{ width: '100%', accentColor: COLORS.haze }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, color: COLORS.textDim, marginTop: 4 }}>
              <span>Oct 1 (season start)</span>
              <span>Nov 30 (season end)</span>
            </div>
          </div>

          <div style={{ fontFamily: sans, fontSize: 11, color: COLORS.textDim, marginTop: 16, lineHeight: 1.5, borderTop: `1px solid ${COLORS.hair}`, paddingTop: 12 }}>
            Assumes this fire level has held steady for about a week &mdash; the trained model uses cumulative 3-day and 7-day fire activity, not just a single day's count, so a one-off spike predicts differently than sustained burning.
          </div>
        </div>

        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: COLORS.textMute, marginBottom: 10, letterSpacing: '0.08em' }}>PREDICTED DELHI-NCR PM2.5</div>
          <div style={{ fontFamily: mono, fontSize: 56, fontWeight: 700, color: aqiColor(simPred), lineHeight: 1 }}>{Math.round(simPred)}</div>
          <div style={{ fontFamily: sans, fontSize: 14, color: aqiColor(simPred), fontWeight: 600, marginTop: 8 }}>{aqiLabel(simPred)}</div>
          <div style={{ width: '100%', height: 6, background: COLORS.hair, borderRadius: 3, marginTop: 18, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(simPred / 500, 1) * 100}%`, background: aqiColor(simPred), borderRadius: 3 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: mono, fontSize: 9, color: COLORS.textDim, marginTop: 4 }}>
            <span>0</span><span>250 (severe)</span><span>500+</span>
          </div>
          <div style={{ fontFamily: sans, fontSize: 11, color: COLORS.textDim, marginTop: 20, lineHeight: 1.5 }}>
            Based on the trained Ridge model (R&sup2;=0.48, tested on the held-out 2025 season). A simplified, illustrative scenario &mdash; not a substitute for the full model.
          </div>
        </div>
      </div>
    </div>
  );
}
