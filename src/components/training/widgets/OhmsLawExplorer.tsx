'use client';

import { useState } from 'react';

interface Scenario {
  id: string;
  title: string;
  context: string;
  given: { label: string; value: number; unit: string }[];
  solve: 'V' | 'I' | 'R';
  unit: string;
  answer: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'fuse',
    title: 'Battery String Current',
    context: 'A 48V UPS battery string feeds the DC bus through a 4Ω internal resistance path. How much current flows?',
    given: [
      { label: 'Voltage (V)', value: 48, unit: 'V' },
      { label: 'Resistance (R)', value: 4, unit: 'Ω' },
    ],
    solve: 'I',
    unit: 'A',
    answer: 12,
    explanation: 'I = V ÷ R = 48V ÷ 4Ω = 12A. This current flows through every component in series — fuses, contactors, and wiring must all be rated above 12A.',
  },
  {
    id: 'voltage-drop',
    title: 'Cable Voltage Drop',
    context: 'A 10-meter output cable has 0.5Ω resistance and carries 20A of load current. How much voltage is dropped across the cable?',
    given: [
      { label: 'Current (I)', value: 20, unit: 'A' },
      { label: 'Resistance (R)', value: 0.5, unit: 'Ω' },
    ],
    solve: 'V',
    unit: 'V',
    answer: 10,
    explanation: 'V = I × R = 20A × 0.5Ω = 10V. A 10V drop on a 120V circuit means the load receives only 110V — outside the ±2% regulation spec. This cable is undersized for this current.',
  },
  {
    id: 'fault',
    title: 'Minimum Wire Resistance',
    context: 'A 480V circuit has a 96A fuse. To ensure the fuse blows during a hard fault before the wire melts, the fault path resistance must keep current above 96A. What is the maximum resistance allowed?',
    given: [
      { label: 'Voltage (V)', value: 480, unit: 'V' },
      { label: 'Target current (I)', value: 96, unit: 'A' },
    ],
    solve: 'R',
    unit: 'Ω',
    answer: 5,
    explanation: 'R = V ÷ I = 480V ÷ 96A = 5Ω. Any fault path with resistance above 5Ω would allow less than 96A — the fuse would NOT blow and the wire could burn. This is why low-impedance grounding is critical.',
  },
];

const FORMULA: Record<string, string> = { V: 'V = I × R', I: 'I = V ÷ R', R: 'R = V ÷ I' };
const LABELS: Record<string, string> = { V: 'Voltage (V)', I: 'Current (I)', R: 'Resistance (R)' };

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export default function OhmsLawExplorer() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const s = SCENARIOS[scenarioIdx];

  const handleCheck = () => {
    const val = parseFloat(input.trim());
    if (isNaN(val)) return;
    setResult(Math.abs(val - s.answer) < 0.05 ? 'correct' : 'wrong');
  };

  const handleNext = () => {
    setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
    setInput('');
    setResult(null);
  };

  return (
    <div className="rounded-xl border border-purple-700/60 bg-purple-950/15 overflow-hidden">
      <div className="px-5 py-3 border-b border-purple-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold text-purple-300">Ohm&apos;s Law Explorer — UPS Scenarios</span>
        </div>
        <div className="flex gap-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === scenarioIdx ? 'bg-purple-400' : i < scenarioIdx ? 'bg-green-500' : 'bg-gray-600'}`} />
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Scenario */}
        <div>
          <p className="text-xs text-purple-400 font-semibold uppercase mb-1">Scenario {scenarioIdx + 1} of {SCENARIOS.length} — {s.title}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{s.context}</p>
        </div>

        {/* Given values */}
        <div className="grid grid-cols-2 gap-2">
          {s.given.map((g) => (
            <div key={g.label} className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{g.label}</p>
              <p className="text-xl font-mono font-bold text-white">{g.value} <span className="text-sm text-gray-400">{g.unit}</span></p>
            </div>
          ))}
        </div>

        {/* Formula hint */}
        <div className="rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 flex items-center gap-3">
          <span className="text-xs text-gray-500">Formula:</span>
          <span className="font-mono text-purple-300 text-sm font-bold">{FORMULA[s.solve]}</span>
        </div>

        {/* Input */}
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            Calculate {LABELS[s.solve]} in {s.unit}:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={input}
              onChange={(e) => { setInput(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder={`Enter ${s.unit}...`}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleCheck}
              disabled={!input.trim()}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:cursor-not-allowed"
            >
              Check
            </button>
          </div>
        </div>

        {/* Result */}
        {result === 'correct' && (
          <div className="rounded-lg border border-green-700 bg-green-950/30 p-4 space-y-2">
            <p className="text-green-300 font-bold text-sm">✓ Correct! {round2(s.answer)} {s.unit}</p>
            <p className="text-gray-300 text-sm">{s.explanation}</p>
            <button onClick={handleNext} className="mt-1 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-colors">
              {scenarioIdx + 1 < SCENARIOS.length ? 'Next Scenario →' : 'Start Over ↺'}
            </button>
          </div>
        )}

        {result === 'wrong' && (
          <div className="rounded-lg border border-red-700 bg-red-950/30 p-4 space-y-1">
            <p className="text-red-300 font-bold text-sm">Not quite. Check your formula: {FORMULA[s.solve]}</p>
            <p className="text-gray-400 text-xs">Hint: the answer is a round number in this scenario.</p>
          </div>
        )}
      </div>
    </div>
  );
}
