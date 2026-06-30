'use client';

import { useState } from 'react';

type WaveType = 'ac-sine' | 'dc-flat' | 'dc-ripple' | 'modified-sine';

const WAVES: { id: WaveType; label: string; desc: string; color: string }[] = [
  { id: 'ac-sine',       label: 'AC Sine Wave',        desc: 'Pure 60 Hz sine wave from utility or online UPS inverter. V and I alternate direction. RMS = Peak ÷ √2.',  color: '#60a5fa' },
  { id: 'dc-flat',       label: 'DC (Ideal)',           desc: 'Perfect DC — battery or regulated DC bus. Constant polarity, zero ripple. Voltage does not change over time.',        color: '#4ade80' },
  { id: 'dc-ripple',     label: 'DC with Ripple',       desc: 'DC bus with filter capacitor degradation. AC ripple riding on DC. Causes heat, component stress, noise.',       color: '#fb923c' },
  { id: 'modified-sine', label: 'Modified Sine (UPS)',  desc: 'Stepped approximation of a sine wave from cheaper UPS inverters. Works for resistive loads but harms motors and sensitive electronics.', color: '#c084fc' },
];

function getPath(type: WaveType, w: number, h: number): string {
  const mid = h / 2;
  const pts: string[] = [];
  const steps = 200;

  for (let x = 0; x <= steps; x++) {
    const t = (x / steps) * 2 * Math.PI * 2; // 2 cycles
    let y: number;
    if (type === 'ac-sine') {
      y = mid - Math.sin(t) * (mid * 0.8);
    } else if (type === 'dc-flat') {
      y = mid - mid * 0.3;
    } else if (type === 'dc-ripple') {
      y = mid - mid * 0.3 - Math.sin(t * 6) * (mid * 0.15);
    } else {
      // modified sine
      const phase = t % (Math.PI);
      if (phase < 0.2) y = mid;
      else if (phase < 0.5) y = mid - mid * 0.75;
      else if (phase < 0.7) y = mid;
      else if (phase < 1.0) y = mid + mid * 0.75;
      else y = mid;
    }
    const px = (x / steps) * w;
    pts.push(`${x === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

export default function WaveformViewer() {
  const [active, setActive] = useState<WaveType>('ac-sine');
  const wave = WAVES.find((w) => w.id === active)!;
  const W = 400;
  const H = 120;

  return (
    <div className="rounded-xl border border-blue-700/60 bg-blue-950/10 overflow-hidden">
      <div className="px-5 py-3 border-b border-blue-800/40 flex items-center gap-2">
        <span className="text-lg">📈</span>
        <span className="text-sm font-semibold text-blue-300">Waveform Viewer — AC vs DC</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {WAVES.map((w) => (
            <button key={w.id} onClick={() => setActive(w.id)}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all text-left ${active === w.id ? 'border-current text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
              style={active === w.id ? { borderColor: w.color, color: w.color, backgroundColor: w.color + '15' } : {}}>
              {w.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg bg-gray-950 border border-gray-700 p-3 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
            {/* Grid lines */}
            <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1={H * 0.2} x2={W} y2={H * 0.2} stroke="#1f2937" strokeWidth="1" />
            <line x1="0" y1={H * 0.8} x2={W} y2={H * 0.8} stroke="#1f2937" strokeWidth="1" />
            {/* Axis labels */}
            <text x="4" y={H / 2 - 4} fill="#6b7280" fontSize="9">0V</text>
            <text x="4" y={H * 0.2 - 2} fill="#6b7280" fontSize="9">+V</text>
            <text x="4" y={H * 0.8 + 10} fill="#6b7280" fontSize="9">−V</text>
            {/* Waveform */}
            <path d={getPath(active, W, H)} fill="none" stroke={wave.color} strokeWidth="2" />
          </svg>
        </div>

        <div className="rounded-lg bg-gray-900 border border-gray-700 p-4">
          <p className="text-sm font-semibold mb-1" style={{ color: wave.color }}>{wave.label}</p>
          <p className="text-gray-400 text-sm">{wave.desc}</p>
        </div>
      </div>
    </div>
  );
}
