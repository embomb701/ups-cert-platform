'use client';

import { useState } from 'react';
import Link from 'next/link';

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function wireColor(amps: number): string {
  if (amps < 0.5) return '#60a5fa';
  if (amps < 1.5) return '#a78bfa';
  if (amps < 3)   return '#f59e0b';
  return '#f87171';
}

interface CircuitProps {
  voltage: number;
  resistance: number;
  current: number;
}

function OhmsLawCircuit({ voltage, resistance, current }: CircuitProps) {
  const color = wireColor(current);
  const animDuration = clamp(5 / Math.max(current, 0.05), 0.35, 14).toFixed(2);

  const W = 480, H = 290;
  const left = 80, right = 400, top = 65, bot = 225;
  const resLeft = 168, resRight = 312;
  const batMid = (top + bot) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto" aria-label="Ohm's Law circuit diagram">
      <line x1={left} y1={top} x2={resLeft} y2={top} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1={resRight} y1={top} x2={right} y2={top} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1={right} y1={top} x2={right} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1={left} y1={bot} x2={right} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1={left} y1={top} x2={left} y2={batMid - 22} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1={left} y1={batMid + 22} x2={left} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />

      <path
        d={`M ${left},${top} H ${resLeft} H ${resRight} H ${right} V ${bot} H ${left} V ${top}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="12 10"
        strokeLinecap="round"
        style={{ animation: `circuit-flow ${animDuration}s linear infinite`, opacity: 0.85 }}
      />

      {/* Battery */}
      <line x1={left - 18} y1={batMid - 20} x2={left + 18} y2={batMid - 20} stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1={left - 10} y1={batMid + 20} x2={left + 10} y2={batMid + 20} stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
      <text x={left + 26} y={batMid - 15} fill="#4ade80" fontSize="13" fontFamily="monospace" fontWeight="bold">+</text>
      <text x={left + 26} y={batMid + 25} fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="bold">−</text>
      <text x={left - 28} y={batMid - 4} fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">V</text>
      <text x={left - 28} y={batMid + 12} fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{voltage}</text>

      {/* Resistor */}
      <rect x={resLeft} y={top - 13} width={resRight - resLeft} height={26} rx="3" fill="#111827" stroke="#4b5563" strokeWidth="2" />
      <polyline
        points={`${resLeft+8},${top} ${resLeft+20},${top-8} ${resLeft+34},${top+8} ${resLeft+48},${top-8} ${resLeft+62},${top+8} ${resLeft+76},${top-8} ${resLeft+88},${top+8} ${resRight-8},${top}`}
        fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <text x={(resLeft+resRight)/2} y={top-20} fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">R</text>
      <text x={(resLeft+resRight)/2} y={top-8} fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{resistance} Ω</text>

      {/* Ammeter */}
      <circle cx={right} cy={(top+bot)/2} r="18" fill="#111827" stroke="#4b5563" strokeWidth="2" />
      <text x={right} y={(top+bot)/2+4} fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">A</text>

      <text x={W/2} y={bot+30} fill={color} fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        I = {current.toFixed(2)} A
      </text>

      {[[ left, top],[right, top],[right, bot],[left, bot]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#4b5563" />
      ))}
    </svg>
  );
}

function WorkedExample({ q, given, find, steps, answer }: {
  q: string; given: string[]; find: string; steps: { label: string; expr: string }[]; answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-900/50">
        <p className="text-sm font-medium text-white mb-2">{q}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          {given.map(g => <span key={g} className="font-mono bg-gray-800 px-2 py-0.5 rounded">{g}</span>)}
          <span className="text-gray-500">Find: <span className="text-indigo-300 font-mono">{find}</span></span>
        </div>
      </div>
      <div className="border-t border-gray-800 px-4 py-2">
        <button
          onClick={() => setOpen(o => !o)}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {open ? 'Hide solution ▲' : 'Show solution ▼'}
        </button>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-xs text-gray-500 shrink-0">{i+1}.</span>
              <div>
                <span className="text-xs text-gray-400">{s.label} </span>
                <span className="text-sm font-mono text-green-400">{s.expr}</span>
              </div>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-800">
            <span className="text-xs text-gray-500">Answer: </span>
            <span className="text-sm font-mono font-bold text-white">{answer}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizQuestion({ q, choices, correct, explanation }: {
  q: string; choices: string[]; correct: number; explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="border border-gray-800 rounded-xl p-4">
      <p className="text-sm font-medium text-white mb-3">{q}</p>
      <div className="space-y-2">
        {choices.map((c, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correct;
          let cls = 'border border-gray-700 bg-gray-900 text-gray-300';
          if (selected !== null) {
            if (isCorrect) cls = 'border border-green-600 bg-green-950/40 text-green-300';
            else if (isSelected) cls = 'border border-red-700 bg-red-950/30 text-red-300';
          }
          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${cls} disabled:cursor-default`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p className={`text-xs mt-3 ${selected === correct ? 'text-green-400' : 'text-red-400'}`}>
          {selected === correct ? '✓ Correct — ' : '✗ Incorrect — '}{explanation}
        </p>
      )}
    </div>
  );
}

export default function OhmsLawPage() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);
  const current = +(voltage / resistance).toFixed(3);
  const color = wireColor(current);
  const animDuration = clamp(5 / Math.max(current, 0.05), 0.35, 14).toFixed(2);

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/training" className="hover:text-gray-300">Training</Link>
          <span>/</span>
          <Link href="/training/basic-electricity" className="hover:text-gray-300">Basic Electricity</Link>
          <span>/</span>
          <span className="text-gray-300">Ohm's Law</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Ohm's Law</h1>
          <p className="text-gray-400 max-w-2xl">
            The single most important formula in electronics. Every current, every voltage drop,
            every fuse rating — all trace back to this relationship.
          </p>
        </div>

        {/* Formula + Triangle */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card-dark p-6 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">The Formula</p>
            <p className="text-5xl font-mono font-bold text-white mb-3">I = V / R</p>
            <p className="text-sm text-gray-400 mb-6">Current = Voltage ÷ Resistance</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-blue-400 mb-0.5">I</p>
                <p className="text-xs text-gray-400">Current (A)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-green-400 mb-0.5">V</p>
                <p className="text-xs text-gray-400">Voltage (V)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-orange-400 mb-0.5">R</p>
                <p className="text-xs text-gray-400">Resistance (Ω)</p>
              </div>
            </div>
          </div>

          {/* VIR Triangle */}
          <div className="card-dark p-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">The VIR Triangle</p>
            <p className="text-xs text-gray-400 mb-4">
              Cover the unknown quantity — what remains is the formula to solve for it.
            </p>
            <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto">
              {/* Triangle outline */}
              <polygon points="130,10 10,165 250,165" fill="#111827" stroke="#374151" strokeWidth="2" />
              {/* Dividing line */}
              <line x1="10" y1="115" x2="250" y2="115" stroke="#374151" strokeWidth="2" />
              {/* V at top */}
              <text x="130" y="82" fill="#4ade80" fontSize="26" fontFamily="monospace" fontWeight="bold" textAnchor="middle">V</text>
              {/* I at bottom-left */}
              <text x="72" y="148" fill="#60a5fa" fontSize="26" fontFamily="monospace" fontWeight="bold" textAnchor="middle">I</text>
              {/* R at bottom-right */}
              <text x="188" y="148" fill="#f97316" fontSize="26" fontFamily="monospace" fontWeight="bold" textAnchor="middle">R</text>
              {/* × symbol */}
              <text x="130" y="148" fill="#6b7280" fontSize="16" textAnchor="middle">×</text>
            </svg>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
              <div className="bg-gray-900 rounded-lg p-2">
                <p className="text-gray-500 mb-1">Cover <span className="text-blue-400 font-mono">I</span></p>
                <p className="font-mono text-white">V / R</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-2">
                <p className="text-gray-500 mb-1">Cover <span className="text-green-400 font-mono">V</span></p>
                <p className="font-mono text-white">I × R</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-2">
                <p className="text-gray-500 mb-1">Cover <span className="text-orange-400 font-mono">R</span></p>
                <p className="font-mono text-white">V / I</p>
              </div>
            </div>
          </div>
        </div>

        {/* Three rearranged forms */}
        <div className="card-dark p-5 mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Three Equivalent Forms</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { formula: 'I = V / R', desc: 'How much current flows', color: 'text-blue-400', use: 'You know voltage and resistance' },
              { formula: 'V = I × R', desc: 'Voltage across a component', color: 'text-green-400', use: 'You know current and resistance' },
              { formula: 'R = V / I', desc: 'Resistance of a component', color: 'text-orange-400', use: 'You know voltage and current' },
            ].map(f => (
              <div key={f.formula} className="bg-gray-900/60 rounded-xl p-4 text-center">
                <p className={`text-2xl font-mono font-bold mb-1 ${f.color}`}>{f.formula}</p>
                <p className="text-xs text-white mb-1">{f.desc}</p>
                <p className="text-xs text-gray-500">When: {f.use}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive circuit */}
        <div className="card-dark p-6 mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Interactive Circuit</p>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-950/60 rounded-xl p-4">
              <OhmsLawCircuit voltage={voltage} resistance={resistance} current={current} />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Voltage <span className="font-mono text-green-400">(V)</span></label>
                  <span className="text-lg font-mono font-bold text-green-400">{voltage} V</span>
                </div>
                <input type="range" min="1" max="48" step="1" value={voltage}
                  onChange={e => setVoltage(+e.target.value)} className="w-full accent-green-500" />
                <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1 V</span><span>48 V</span></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Resistance <span className="font-mono text-orange-400">(R)</span></label>
                  <span className="text-lg font-mono font-bold text-orange-400">{resistance} Ω</span>
                </div>
                <input type="range" min="1" max="96" step="1" value={resistance}
                  onChange={e => setResistance(+e.target.value)} className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1 Ω</span><span>96 Ω</span></div>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: color + '60', backgroundColor: color + '10' }}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Calculated Current</p>
                <p className="text-4xl font-mono font-bold mb-1" style={{ color }}>
                  {current.toFixed(2)} <span className="text-xl">A</span>
                </p>
                <p className="text-xs text-gray-400 font-mono">{voltage}V ÷ {resistance}Ω = {current.toFixed(2)}A</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Try a scenario</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '12V / 6Ω', sub: 'Baseline: 2A', v: 12, r: 6 },
                    { label: '24V / 6Ω', sub: '2× voltage → 4A', v: 24, r: 6 },
                    { label: '12V / 12Ω', sub: '2× resistance → 1A', v: 12, r: 12 },
                    { label: '48V / 6Ω', sub: '4× voltage → 8A', v: 48, r: 6 },
                  ].map(p => (
                    <button key={p.label} onClick={() => { setVoltage(p.v); setResistance(p.r); }}
                      className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                      <span className="font-mono text-white block">{p.label}</span>
                      <span className="text-gray-500">{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is resistance? */}
        <div className="card-dark p-6 mb-8">
          <h3 className="text-base font-semibold text-white mb-4">What Is Resistance?</h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Resistance is opposition to current flow — think of it like friction for electrons. Every material has it,
            and four factors control how much:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { factor: 'Material', icon: '⚗️', detail: 'Silver conducts better than copper, copper better than aluminum, aluminum better than iron. Wire material choice is a cost vs. conductivity tradeoff.' },
              { factor: 'Length', icon: '📏', detail: 'Longer wire = more resistance. Double the wire length, double the resistance. This is why long cable runs cause voltage drop.' },
              { factor: 'Cross-section (gauge)', icon: '🔩', detail: 'Thicker wire has lower resistance. AWG 4 carries far more current than AWG 18. Undersized wire = heat = fire risk.' },
              { factor: 'Temperature', icon: '🌡️', detail: 'Most metals increase in resistance as they heat up. A wire carrying too much current heats up, its resistance rises, it gets hotter — a dangerous feedback loop.' },
            ].map(f => (
              <div key={f.factor} className="bg-gray-900/60 rounded-xl p-4">
                <p className="text-sm font-semibold text-white mb-1">{f.icon} {f.factor}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Worked examples */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-white mb-4">Worked Examples</h3>
          <div className="space-y-3">
            <WorkedExample
              q="A 12V battery is connected to a 470Ω resistor. How much current flows?"
              given={['V = 12V', 'R = 470Ω']}
              find="I = ?"
              steps={[
                { label: 'Formula:', expr: 'I = V / R' },
                { label: 'Substitute:', expr: 'I = 12 / 470' },
                { label: 'Calculate:', expr: 'I = 0.0255 A = 25.5 mA' },
              ]}
              answer="25.5 milliamps flow through the resistor"
            />
            <WorkedExample
              q="A wire carries 8A of current and has 0.3Ω resistance. What is the voltage drop across it?"
              given={['I = 8A', 'R = 0.3Ω']}
              find="V = ?"
              steps={[
                { label: 'Formula:', expr: 'V = I × R' },
                { label: 'Substitute:', expr: 'V = 8 × 0.3' },
                { label: 'Calculate:', expr: 'V = 2.4V' },
              ]}
              answer="2.4V is lost across the wire — the load sees 2.4V less than the source"
            />
            <WorkedExample
              q="A 48V UPS battery bank pushes 6A through a load. What is the load's resistance?"
              given={['V = 48V', 'I = 6A']}
              find="R = ?"
              steps={[
                { label: 'Formula:', expr: 'R = V / I' },
                { label: 'Substitute:', expr: 'R = 48 / 6' },
                { label: 'Calculate:', expr: 'R = 8Ω' },
              ]}
              answer="The load has 8Ω of resistance"
            />
          </div>
        </div>

        {/* UPS context */}
        <div className="card-dark p-6 mb-8 border-indigo-900/60">
          <h3 className="text-sm font-semibold text-indigo-300 mb-3">Why This Matters in a UPS</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 leading-relaxed">
            <div>
              <p className="text-white font-medium mb-1">Battery discharge rate</p>
              <p>A 48V battery bank powering a load with 4Ω total resistance pushes 12A of current. Ohm's Law tells you exactly how hard the batteries are working.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Fuse and wire sizing</p>
              <p>Every fuse and wire rating is based on current. Calculate I = V/R first — then size your protection for that current.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Voltage drops under load</p>
              <p>When current flows through a wire, resistance causes a voltage drop (V = I × R). Too much drop means your load sees less voltage than it needs.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Troubleshooting high current alarms</p>
              <p>If current is too high, voltage went up or resistance dropped. A short circuit is resistance approaching zero — current spikes toward infinity.</p>
            </div>
          </div>
        </div>

        {/* Key insights */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '↑ V', color: 'text-green-400', title: 'More Voltage → More Current', body: 'Double the voltage and you double the current — as long as resistance stays the same. Higher-voltage UPS systems can deliver more power through the same wiring.' },
            { icon: '↑ R', color: 'text-orange-400', title: 'More Resistance → Less Current', body: 'Double the resistance and current drops by half. Corroded terminals, undersized wire, or a bad connection all add resistance — and starve your load of current.' },
            { icon: 'I → 0', color: 'text-red-400', title: 'Short Circuit: R ≈ 0', body: 'When resistance approaches zero, current approaches infinity. This is a short circuit — the reason fuses exist. I = V/R with R near zero is a very large number.' },
          ].map(k => (
            <div key={k.icon} className="card-dark p-5">
              <div className={`text-2xl font-mono font-bold mb-2 ${k.color}`}>{k.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1">{k.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{k.body}</p>
            </div>
          ))}
        </div>

        {/* Self-check quiz */}
        <div className="mb-10">
          <h3 className="text-base font-semibold text-white mb-4">Self-Check</h3>
          <div className="space-y-4">
            <QuizQuestion
              q="A 24V source is connected to a 12Ω resistor. How much current flows?"
              choices={['1A', '2A', '0.5A', '288A']}
              correct={1}
              explanation="I = V/R = 24/12 = 2A"
            />
            <QuizQuestion
              q="You measure 5A flowing through a 10Ω load. What is the voltage across it?"
              choices={['2V', '15V', '50V', '0.5V']}
              correct={2}
              explanation="V = I × R = 5 × 10 = 50V"
            />
            <QuizQuestion
              q="If you double the resistance in a circuit while keeping voltage the same, what happens to current?"
              choices={['It doubles', 'It stays the same', 'It halves', 'It quadruples']}
              correct={2}
              explanation="I = V/R — if R doubles and V stays fixed, I is cut in half."
            />
            <QuizQuestion
              q="A short circuit means resistance is very:"
              choices={['High', 'Low', 'Stable', 'Unpredictable']}
              correct={1}
              explanation="A short circuit occurs when resistance approaches zero, causing current to spike — this is why fuses blow."
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <Link href="/training/basic-electricity" className="text-sm text-gray-400 hover:text-white transition-colors">
            &larr; Back to Basic Electricity
          </Link>
          <Link href="/training/basic-electricity/power-formula" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            Next: Power Formula →
          </Link>
        </div>
      </div>
    </section>
  );
}
