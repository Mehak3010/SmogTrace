export const COLORS = {
  canvas: '#12141A',
  panel: '#1B1F27',
  panel2: '#222834',
  hair: '#2E3440',
  ember: '#FF6A3D',
  emberDeep: '#C43E1C',
  emberDim: 'rgba(255,106,61,0.18)',
  haze: '#5FA8C4',
  hazeDim: 'rgba(95,168,196,0.18)',
  text: '#EDE9E0',
  textMute: '#8A8F99',
  textDim: '#5C616B',
  good: '#7FBF6F',
  moderate: '#F2C94C',
  poor: '#F2994A',
  severe: '#EB5757',
  hazardous: '#8C2F26',
};

export const mono = "'SF Mono', 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";
export const sans = "'Inter', ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif";

export function aqiColor(pm25) {
  if (pm25 <= 60) return COLORS.good;
  if (pm25 <= 90) return COLORS.moderate;
  if (pm25 <= 120) return COLORS.poor;
  if (pm25 <= 250) return COLORS.severe;
  return COLORS.hazardous;
}
export function aqiLabel(pm25) {
  if (pm25 <= 60) return 'Satisfactory';
  if (pm25 <= 90) return 'Moderate';
  if (pm25 <= 120) return 'Poor';
  if (pm25 <= 250) return 'Very poor';
  return 'Severe';
}
