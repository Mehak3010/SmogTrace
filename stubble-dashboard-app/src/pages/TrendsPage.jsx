import React, { useState, useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DAILY } from '../data';
import { COLORS, mono, sans } from '../theme';
import { SectionLabel, CustomTooltip } from '../components/Shared';

const SEASONS = [2022, 2023, 2024, 2025];

export default function TrendsPage() {
  const [season, setSeason] = useState('all');

  const seasonData = useMemo(() => {
    if (season === 'all') return DAILY;
    return DAILY.filter(d => d.season === Number(season));
  }, [season]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <SectionLabel eyebrow="Season explorer" title="Fire activity and PM2.5 over time" />
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

      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: COLORS.textMute }}>FIRE COUNT (LEFT AXIS) &middot; PM2.5 (RIGHT AXIS)</span>
          <div style={{ display: 'flex', gap: 14, fontFamily: mono, fontSize: 11, color: COLORS.textMute }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: COLORS.emberDim, border: `1px solid ${COLORS.ember}`, marginRight: 6, verticalAlign: 'middle' }} />FIRES</span>
            <span><span style={{ display: 'inline-block', width: 12, height: 2, background: COLORS.haze, marginRight: 6, verticalAlign: 'middle' }} />PM2.5</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={seasonData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.ember} stopOpacity={0.45} />
                <stop offset="100%" stopColor={COLORS.ember} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke={COLORS.hair} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: COLORS.textMute, fontSize: 9, fontFamily: mono }} axisLine={{ stroke: COLORS.hair }} tickLine={false}
              interval={Math.max(Math.floor(seasonData.length / 8), 0)} />
            <YAxis yAxisId="fire" tick={{ fill: COLORS.ember, fontSize: 10, fontFamily: mono }} axisLine={false} tickLine={false} width={36} />
            <YAxis yAxisId="pm25" orientation="right" tick={{ fill: COLORS.haze, fontSize: 10, fontFamily: mono }} axisLine={false} tickLine={false} width={36} />
            <ReferenceLine yAxisId="pm25" y={250} stroke={COLORS.hazardous} strokeDasharray="3 3" strokeOpacity={0.6} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="fire" type="monotone" dataKey="fire_count" name="Fires" stroke={COLORS.ember} fill="url(#fireGrad)" strokeWidth={1.5} />
            <Line yAxisId="pm25" type="monotone" dataKey="avg_pm25" name="PM2.5" stroke={COLORS.haze} strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{ fontFamily: sans, fontSize: 11, color: COLORS.textDim, marginTop: 6 }}>Dashed line marks the CPCB &ldquo;severe&rdquo; PM2.5 threshold (250 &micro;g/m&sup3;). Axes are independently scaled &mdash; watch for shape alignment, not absolute overlap.</div>
      </div>
    </div>
  );
}
