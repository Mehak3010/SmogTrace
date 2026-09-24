import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { IMPORTANCE } from '../data';
import { COLORS, mono, sans } from '../theme';
import { SectionLabel, CustomTooltip } from '../components/Shared';

export default function DriversPage() {
  const importanceSorted = useMemo(
    () => [...IMPORTANCE].sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight)),
    []
  );

  return (
    <div style={{ marginBottom: 14 }}>
      <SectionLabel eyebrow="Interpretability" title="What drives the prediction" />
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '18px 20px' }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={importanceSorted} layout="vertical" margin={{ top: 4, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={COLORS.hair} horizontal={false} />
            <XAxis type="number" tick={{ fill: COLORS.textMute, fontSize: 10, fontFamily: mono }} axisLine={{ stroke: COLORS.hair }} tickLine={false} />
            <YAxis type="category" dataKey="feature" tick={{ fill: COLORS.textMute, fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} width={130} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <ReferenceLine x={0} stroke={COLORS.hair} />
            <Bar dataKey="weight" name="Weight" radius={[0, 3, 3, 0]}>
              {importanceSorted.map((d, i) => (
                <Cell key={i} fill={d.weight >= 0 ? COLORS.ember : COLORS.haze} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ fontFamily: sans, fontSize: 13, color: COLORS.textMute, marginTop: 10, lineHeight: 1.5 }}>
          Standardized Ridge coefficients. Ember bars push PM2.5 up, haze bars pull it down. Cumulative 7-day fire activity dampens the raw same-day spike &mdash; the model reads sustained burning differently from a single large day.
        </div>
      </div>
    </div>
  );
}
