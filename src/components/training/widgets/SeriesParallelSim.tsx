'use client';

import { useState } from 'react';

type Mode = 'series' | 'parallel';

export default function SeriesParallelSim() {
  const [mode, setMode] = useState<Mode>('series');
  const [r1, setR1] = useState(12);
  const [r2, setR2] = useState(12);
  const [voltage] = useState(48);

  const rTotal = mode === 'series' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const iTotal = voltage / rTotal;
  const i1 = mode === 'series' ? iTotal : voltage / r1;
  const i2 = mode === 'series' ? iTotal : voltage / r2;
  const v1 = mode === 'series' ? i1 * r1 : voltage;
  const v2 = mode === 'series' ? i2 * r2 : voltage;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="rounded-xl border border-cyan-700/60 bg-cyan-950/10 overflow-hidden">
      <div className="px-5 py-3 border-b border-cyan-800/40 flex items-center gap-2">
        <span className="text-lg">🔗</span>
        <span className="text-sm font-semibold text-cyan-300">Series vs. Parallel Circuit Simulator</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          {(['series', 'parallel'] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg border text-sm font-bold capitalize transition-all ${mode === m ? 'bg-cyan-700 border-cyan-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-cyan-600'}`}>
              {m}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500">UPS battery string: {voltage}V supply · Adjust resistances (Ω) to see how current splits</p>

        <div className="grid grid-cols-2 gap-3">
          {[{ label: 'R1 (Ω)', val: r1, set: setR1 }, { label: 'R2 (Ω)', val: r2, set: setR2 }].map(({ label, val, set }) => (
            <div key={label}>
              <label className="text-xs text-gray-400 mb-1 block">{label}: <span className="text-white font-mono">{val}Ω</span></label>
              <input type="range" min={1} max={50} value={val} onChange={(e) => set(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { label: 'Total Resistance', value: fmt(rTotal), unit: 'Ω', color: 'text-cyan-300' },
            { label: 'Total Current', value: fmt(iTotal), unit: 'A', color: 'text-yellow-300' },
            { label: 'Supply Voltage', value: voltage.toString(), unit: 'V', color: 'text-green-300' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
              <p className="text-gray-500 mb-1">{label}</p>
              <p className={`text-lg font-mono font-bold ${color}`}>{value}<span className="text-xs ml-1 text-gray-400">{unit}</span></p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'R1 current', value: fmt(i1), unit: 'A' },
            { label: 'R2 current', value: fmt(i2), unit: 'A' },
            { label: 'V drop across R1', value: fmt(v1), unit: 'V' },
            { label: 'V drop across R2', value: fmt(v2), unit: 'V' },
          ].map(({ label, value, unit }) => (
            <div key={label} className="bg-gray-900 border border-gray-700 rounded px-3 py-2 flex justify-between items-center">
              <span className="text-gray-400">{label}</span>
              <span className="font-mono text-white">{value} {unit}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-900 border border-gray-700 p-3 text-xs text-gray-400 leading-relaxed">
          {mode === 'series'
            ? `Series: same current through both resistors (${fmt(iTotal)}A). Voltage splits: ${fmt(v1)}V + ${fmt(v2)}V = ${voltage}V. Total R = R1 + R2 = ${fmt(rTotal)}Ω.`
            : `Parallel: same voltage across both resistors (${voltage}V). Current splits: ${fmt(i1)}A + ${fmt(i2)}A = ${fmt(iTotal)}A. Total R = ${fmt(rTotal)}Ω (always less than smallest branch).`}
        </div>
      </div>
    </div>
  );
}
