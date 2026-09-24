import React from 'react';
import { COLORS, mono, sans } from '../theme';

export function Bracket({ children }) {
  return (
    <div style={{ position: 'relative', padding: '18px 20px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 18, height: 18, borderTop: `2px solid ${COLORS.ember}`, borderLeft: `2px solid ${COLORS.ember}` }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderTop: `2px solid ${COLORS.ember}`, borderRight: `2px solid ${COLORS.ember}` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 18, height: 18, borderBottom: `2px solid ${COLORS.ember}`, borderLeft: `2px solid ${COLORS.ember}` }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderBottom: `2px solid ${COLORS.ember}`, borderRight: `2px solid ${COLORS.ember}` }} />
      {children}
    </div>
  );
}

export function KpiCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '16px 18px', flex: '1 1 200px', minWidth: 180 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <Icon size={12} color={accent || COLORS.textMute} />
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.07em', color: COLORS.textMute, textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 600, color: COLORS.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: sans, fontSize: 11, color: COLORS.textDim, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export function SectionLabel({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', color: COLORS.ember, textTransform: 'uppercase', marginBottom: 4 }}>{eyebrow}</div>
      <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: COLORS.text }}>{title}</div>
    </div>
  );
}

export function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: COLORS.panel2, border: `1px solid ${COLORS.hair}`, borderRadius: 4, padding: '8px 12px', fontFamily: mono, fontSize: 12 }}>
      <div style={{ color: COLORS.textMute, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || COLORS.text }}>
          {p.name}: {formatter ? formatter(p.value, p.name) : p.value}
        </div>
      ))}
    </div>
  );
}
