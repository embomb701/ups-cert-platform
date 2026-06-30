'use client';

import { useState } from 'react';

const SCENARIOS = [
  {
    title: 'UPS Output Load',
    context: 'A 120V UPS output carries 15A of load current. What is the power delivered?',
    given: [{ label: 'Voltage', value: 120, unit: 'V' }, { label: 'Current', value: 15, unit: 'A' }],
    solve: 'P', unit: 'W', answer: 1800,
    formula: 'P = V × I',
    explanation: 'P = 120V × 15A = 1800W. This UPS is delivering 1.8 kW — a typical small rack UPS output capacity.',
  },
  {
    title: 'Battery Charger Current',
    context: 'A 48V charger delivers 200W to a battery string. What current is flowing?',
    given: [{ label: 'Voltage', value: 48, unit: 'V' }, { label: 'Power', value: 200, unit: 'W' }],
    solve: 'I', unit: 'A', answer: 4.17,
    formula: 'I = P ÷ V',
    explanation: 'I = 200W ÷ 48V ≈ 4.17A charge current. At this rate a 100Ah battery would fully recharge in about 24 hours.',
  },
  {
    title: 'UPS Input Voltage Check',
    context: 'A UPS draws 25A at 2000W from the utility. What is the input voltage?',
    given: [{ label: 'Power', value: 2000, unit: 'W' }, { label: 'Current', value: 25, unit: 'A' }],
    solve: 'V', unit: 'V', answer: 80,
    formula: 'V = P ÷ I',
    explanation: 'V = 2000W ÷ 25A = 80V. This is far below normal 120V — the utility voltage is severely sagged. The UPS should switch to battery.',
  },
];

export default function PowerTriangle() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const s = SCENARIOS[idx];

  const check = () => {
    const val = parseFloat(input);
    if (isNaN(val)) return;
    setResult(Math.abs(val - s.answer) < 0.1 ? 'correct' : 'wrong');
  };

  const next = () => { setIdx((i) => (i + 1) % SCENARIOS.length); setInput(''); setResult(null); };

  return (
    <div className="rounded-xl border border-green-700/60 bg-green-950/10 overflow-hidden">
      <div className="px-5 py-3 border-b border-green-800/40 flex items-center gap-2">
        <span className="text-lg">⚡</span>
        <span className="text-sm font-semibold text-green-300">Power Formula (P = IV) — UPS Scenarios</span>
        <div className="ml-auto flex gap-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === idx ? 'bg-green-400' : i < idx ? 'bg-gray-400' : 'bg-gray-600'}`} />
          ))}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-xs text-green-400 font-semibold uppercase">{s.title}</p>
        <p className="text-gray-300 text-sm">{s.context}</p>
        <div className="grid grid-cols-2 gap-2">
          {s.given.map((g) => (
            <div key={g.label} className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{g.label}</p>
              <p className="text-xl font-mono font-bold text-white">{g.value} <span className="text-sm text-gray-400">{g.unit}</span></p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 flex items-center gap-3">
          <span className="text-xs text-gray-500">Formula:</span>
          <span className="font-mono text-green-300 text-sm font-bold">{s.formula}</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder={`Calculate in ${s.unit}...`}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-green-500"
          />
          <button onClick={check} disabled={!input.trim()} className="px-5 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white font-semibold rounded-lg text-sm transition-colors">Check</button>
        </div>
        {result === 'correct' && (
          <div className="rounded-lg border border-green-700 bg-green-950/30 p-4 space-y-2">
            <p className="text-green-300 font-bold text-sm">✓ Correct!</p>
            <p className="text-gray-300 text-sm">{s.explanation}</p>
            <button onClick={next} className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg">{idx + 1 < SCENARIOS.length ? 'Next →' : 'Restart ↺'}</button>
          </div>
        )}
        {result === 'wrong' && (
          <div className="rounded-lg border border-red-700 bg-red-950/30 p-4">
            <p className="text-red-300 font-bold text-sm">Not quite — try the formula: {s.formula}</p>
          </div>
        )}
      </div>
    </div>
  );
}
