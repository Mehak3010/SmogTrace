import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer, Cell } from 'recharts';
import { LAG_CORR } from '../data';
import { COLORS, mono, sans } from '../theme';
import { Bracket, SectionLabel, CustomTooltip } from '../components/Shared';

export default function SignalPage() {
  const bestLag = useMemo(() => LAG_CORR.reduce((a, b) => (b.corr > a.corr ? b : a), LAG_CORR[0]), []);

  return (
    <div style={{ marginBottom: 14 }}>
      <SectionLabel eyebrow="Signature finding" title="Smoke transport signal" />
      <Bracket>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: COLORS.textMute }}>HOW MANY DAYS AFTER A FIRE DOES DELHI'S PM2.5 RESPOND?</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: mono, fontSize: 12, color: COLORS.ember }}>
            <span style={{ width: 9, height: 9, background: COLORS.ember, display: 'inline-block', borderRadius: 2 }} />
            STRONGEST LINK: {bestLag.lag === 0 ? 'SAME DAY' : `+${bestLag.lag} DAY${bestLag.lag > 1 ? 'S' : ''}`}
          </span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 11, color: COLORS.textDim, marginBottom: 8 }}>
          Each bar is the correlation between fire activity on a given day and Delhi's PM2.5 that many days later. Taller = stronger link.
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={LAG_CORR} margin={{ top: 10, right: 10, left: 10, bottom: 22 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={COLORS.hair} vertical={false} />
            <XAxis dataKey="lag" tickFormatter={v => v === 0 ? 'Same day' : `+${v}d`} tick={{ fill: COLORS.textMute, fontSize: 11, fontFamily: mono }} axisLine={{ stroke: COLORS.hair }} tickLine={false}>
              <Label value="DAYS AFTER THE FIRE" position="bottom" offset={4} style={{ fill: COLORS.textDim, fontFamily: mono, fontSize: 10, letterSpacing: '0.06em' }} />
            </XAxis>
            <YAxis tick={{ fill: COLORS.textMute, fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} domain={[0, 0.6]}>
              <Label value="CORRELATION STRENGTH" angle={-90} position="insideLeft" offset={10} style={{ fill: COLORS.textDim, fontFamily: mono, fontSize: 10, letterSpacing: '0.06em', textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip formatter={(v) => v.toFixed(3)} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="corr" name="Correlation" radius={[3, 3, 0, 0]}>
              {LAG_CORR.map((d, i) => (
                <Cell key={i} fill={d.lag === bestLag.lag ? COLORS.ember : COLORS.emberDim} stroke={d.lag === bestLag.lag ? COLORS.ember : 'transparent'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ fontFamily: sans, fontSize: 13, color: COLORS.textMute, marginTop: 10, lineHeight: 1.5 }}>
          Correlation is strongest same-day and next-day, then decays &mdash; consistent with a roughly 12&ndash;36 hour smoke transport window from Punjab to Delhi under typical northwesterly winds.
        </div>
      </Bracket>
    </div>
  );
}
