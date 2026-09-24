import React, { useState, useMemo } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HOTSPOTS, TEST_PREDS } from '../data';
import { COLORS, mono } from '../theme';
import { SectionLabel, CustomTooltip } from '../components/Shared';

const SEASONS = [2022, 2023, 2024, 2025];

export default function GeoModelPage() {
  const [season, setSeason] = useState('all');
  const hotspotFiltered = useMemo(
    () => season === 'all' ? HOTSPOTS : HOTSPOTS.filter(h => h.year === Number(season)),
    [season]
  );

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <SectionLabel eyebrow="Geography / Prediction" title="Fire hotspots & model accuracy" />
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', ...SEASONS].map(s => (
            <button key={s} onClick={() => setSeason(String(s))}
              style={{
                fontFamily: mono, fontSize: 12, padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
                background: season === String(s) ? COLORS.ember : 'transparent',
                color: season === String(s) ? '#1A0D08' : COLORS.textMute,
                border: `1px solid ${season === String(s) ? COLORS.ember : COLORS.hair}`,
                fontWeight: season === String(s) ? 600 : 400,
              }}>
              {s === 'all' ? 'ALL' : s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 20 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, color: COLORS.textMute, marginBottom: 8 }}>FIRE HOTSPOTS &middot; PUNJAB / HARYANA</div>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px', position: 'relative' }}>
            {/* Compass tags instead of traditional axis titles */}
            <span style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', color: COLORS.textDim }}>N</span>
            <span style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', color: COLORS.textDim }}>S</span>
            <span style={{ position: 'absolute', left: 6, top: '46%', transform: 'translateY(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', color: COLORS.textDim }}>W</span>
            <span style={{ position: 'absolute', right: 8, top: '46%', transform: 'translateY(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', color: COLORS.textDim }}>E</span>
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart margin={{ top: 20, right: 24, left: 12, bottom: 10 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={COLORS.hair} />
                <XAxis type="number" dataKey="longitude" domain={[74.3, 76.2]} tick={{ fill: COLORS.textMute, fontSize: 10, fontFamily: mono }} axisLine={{ stroke: COLORS.hair }} tickLine={false} name="Longitude" unit="°E" />
                <YAxis type="number" dataKey="latitude" domain={[28.9, 31.6]} tick={{ fill: COLORS.textMute, fontSize: 10, fontFamily: mono }} axisLine={false} tickLine={false} name="Latitude" width={44} unit="°N" />
                <Tooltip content={<CustomTooltip formatter={(v, n) => (typeof v === 'number' ? v.toFixed(2) : v)} />} cursor={{ strokeDasharray: '3 3', stroke: COLORS.hair }} />
                <Scatter data={hotspotFiltered} fill={COLORS.ember}>
                  {hotspotFiltered.map((d, i) => (
                    <Cell key={i} fill={d.frp > 15 ? COLORS.emberDeep : COLORS.emberDim} r={d.frp > 15 ? 2.2 : 1.4} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontFamily: mono, fontSize: 11, color: COLORS.textMute }}>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: COLORS.emberDeep, marginRight: 6 }} />HIGH FRP (&gt;15MW)</span>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: COLORS.emberDim, marginRight: 6 }} />LOW FRP</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: mono, fontSize: 11, color: COLORS.textMute, marginBottom: 8 }}>HELD-OUT 2025 SEASON &middot; RIDGE MODEL</div>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px' }}>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={TEST_PREDS} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={COLORS.hair} vertical={false} />
                <XAxis dataKey="date" tick={false} axisLine={{ stroke: COLORS.hair }} />
                <YAxis tick={{ fill: COLORS.textMute, fontSize: 10, fontFamily: mono }} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="avg_pm25" name="Actual" stroke={COLORS.text} strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="pred_ridge" name="Predicted" stroke={COLORS.ember} strokeWidth={1.8} strokeDasharray="4 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontFamily: mono, fontSize: 11, color: COLORS.textMute }}>
              <span><span style={{ display: 'inline-block', width: 12, height: 2, background: COLORS.text, marginRight: 6, verticalAlign: 'middle' }} />ACTUAL</span>
              <span><span style={{ display: 'inline-block', width: 12, height: 2, background: COLORS.ember, marginRight: 6, verticalAlign: 'middle' }} />PREDICTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
