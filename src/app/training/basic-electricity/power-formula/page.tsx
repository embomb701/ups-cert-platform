'use client';

import { useState } from 'react';
import Link from 'next/link';

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function powerColor(watts: number): string {
  if (watts < 20)  return '#60a5fa'; // blue — cool
  if (watts < 100) return '#a78bfa'; // purple
  if (watts < 400) return '#f59e0b'; // amber — warm
  return '#f87171';                  // red — hot
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
        <button onClick={() => setOpen(o => !o)} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          {open ? 'Hide solution ▲' : 'Show solution ▼'}
        </button>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-xs text-gray-500 shrink-0">{i + 1}.</span>
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
            <button key={i} onClick={() => selected === null && setSelected(i)} disabled={selected !== null}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${cls} disabled:cursor-default`}>
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

interface BulbProps { watts: number; maxWatts: number; }

function Lightbulb({ watts, maxWatts }: BulbProps) {
  const ratio = clamp(watts / maxWatts, 0, 1);
  const color = powerColor(watts);

  // Filament glow: dim gray at low power, bright at high
  const filamentOpacity = 0.2 + ratio * 0.8;
  const glowRadius = 18 + ratio * 44;
  const glowOpacity = ratio * 0.55;
  const bulbFill = ratio < 0.05 ? '#1f2937' : color;

  return (
    <svg viewBox="0 0 200 240" className="w-full max-w-[160px] mx-auto" aria-label="Power lightbulb indicator">
      <defs>
        <radialGradient id="bulb-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={glowOpacity * 1.2} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bulb-fill" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity={0.15 + ratio * 0.5} />
          <stop offset="100%" stopColor="#111827" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Outer glow halo */}
      <ellipse cx="100" cy="88" rx={glowRadius} ry={glowRadius * 0.95}
        fill={color} opacity={glowOpacity * 0.4} />

      {/* Bulb glass */}
      <path d="M 65,105 Q 55,75 65,55 Q 80,30 100,28 Q 120,30 135,55 Q 145,75 135,105 Q 125,125 100,130 Q 75,125 65,105 Z"
        fill="url(#bulb-fill)" stroke="#374151" strokeWidth="2" />

      {/* Inner glow fill */}
      <ellipse cx="100" cy="80" rx={28} ry={28}
        fill={color} opacity={ratio * 0.3} />

      {/* Filament */}
      <polyline
        points="84,100 88,85 93,95 98,80 103,95 108,85 112,100"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        opacity={filamentOpacity}
      />

      {/* Base (neck) */}
      <rect x="84" y="128" width="32" height="10" rx="2" fill="#374151" />
      {/* Base rings */}
      <rect x="82" y="138" width="36" height="8" rx="2" fill="#4b5563" />
      <rect x="84" y="146" width="32" height="8" rx="2" fill="#374151" />
      <rect x="86" y="154" width="28" height="8" rx="2" fill="#4b5563" />

      {/* Screw thread lines */}
      {[139, 143, 147, 151, 155, 159].map(y => (
        <line key={y} x1="82" y1={y} x2="118" y2={y} stroke="#374151" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Watt label */}
      <text x="100" y="195" fill={color} fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        {watts < 1 ? watts.toFixed(1) : Math.round(watts)}W
      </text>
      <text x="100" y="213" fill="#6b7280" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
        {watts < 10 ? 'Very Low' : watts < 60 ? 'Low' : watts < 300 ? 'Moderate' : 'High'} Power
      </text>
    </svg>
  );
}

export default function PowerFormulaPage() {
  const [voltage, setVoltage] = useState(120);
  const [resistance, setResistance] = useState(60);

  const current = +(voltage / resistance).toFixed(4);
  const power = +(voltage * current).toFixed(2);
  const color = powerColor(power);
  const maxWatts = 1200;

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/training" className="hover:text-gray-300">Training</Link>
          <span>/</span>
          <Link href="/training/basic-electricity" className="hover:text-gray-300">Basic Electricity</Link>
          <span>/</span>
          <span className="text-gray-300">Power Formula</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">The Power Formula</h1>
          <p className="text-gray-400 max-w-2xl">
            Power is the rate at which energy is used or dissipated. In electrical systems,
            power is measured in Watts and determines heat generation, wire sizing, and UPS capacity ratings.
          </p>
        </div>

        {/* Formula display */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card-dark p-6 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">The Primary Formula</p>
            <p className="text-5xl font-mono font-bold text-yellow-400 mb-3">P = V × I</p>
            <p className="text-sm text-gray-400 mb-6">Power = Voltage × Current</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-yellow-400 mb-0.5">P</p>
                <p className="text-xs text-gray-400">Power (W)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-green-400 mb-0.5">V</p>
                <p className="text-xs text-gray-400">Voltage (V)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-blue-400 mb-0.5">I</p>
                <p className="text-xs text-gray-400">Current (A)</p>
              </div>
            </div>
          </div>

          {/* Three forms */}
          <div className="card-dark p-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Three Equivalent Forms</p>
            <p className="text-xs text-gray-400 mb-4">Combine with Ohm's Law (V = IR) to eliminate any unknown:</p>
            <div className="space-y-3">
              {[
                { f: 'P = V × I', when: 'You know voltage and current', color: 'text-yellow-400' },
                { f: 'P = I² × R', when: 'You know current and resistance', color: 'text-orange-400' },
                { f: 'P = V² / R', when: 'You know voltage and resistance', color: 'text-red-400' },
              ].map(row => (
                <div key={row.f} className="flex items-center gap-4 bg-gray-900/60 rounded-xl px-4 py-3">
                  <span className={`text-xl font-mono font-bold ${row.color} w-36 shrink-0`}>{row.f}</span>
                  <span className="text-xs text-gray-400">{row.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive section */}
        <div className="card-dark p-6 mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Interactive Power Calculator</p>
          <div className="grid lg:grid-cols-3 gap-8 items-center">

            {/* Lightbulb */}
            <div className="bg-gray-950/60 rounded-xl p-6 flex flex-col items-center justify-center min-h-[280px]">
              <Lightbulb watts={power} maxWatts={maxWatts} />
            </div>

            {/* Sliders */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Voltage <span className="font-mono text-green-400">(V)</span></label>
                  <span className="text-lg font-mono font-bold text-green-400">{voltage} V</span>
                </div>
                <input type="range" min="1" max="480" step="1" value={voltage}
                  onChange={e => setVoltage(+e.target.value)} className="w-full accent-green-500" />
                <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1 V</span><span>480 V</span></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Resistance <span className="font-mono text-orange-400">(R)</span></label>
                  <span className="text-lg font-mono font-bold text-orange-400">{resistance} Ω</span>
                </div>
                <input type="range" min="1" max="480" step="1" value={resistance}
                  onChange={e => setResistance(+e.target.value)} className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1 Ω</span><span>480 Ω</span></div>
              </div>

              {/* Readout grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-900/60 rounded-xl p-3 text-center border border-gray-800">
                  <p className="text-xs text-gray-500 mb-1">Current (I)</p>
                  <p className="text-xl font-mono font-bold text-blue-400">{current < 0.01 ? (current * 1000).toFixed(1) + 'mA' : current.toFixed(2) + 'A'}</p>
                  <p className="text-xs text-gray-600 font-mono mt-1">{voltage}÷{resistance}</p>
                </div>
                <div className="bg-gray-900/60 rounded-xl p-4 text-center border-2" style={{ borderColor: color + '60' }}>
                  <p className="text-xs text-gray-500 mb-1">Power (P)</p>
                  <p className="text-2xl font-mono font-bold" style={{ color }}>{power < 1 ? power.toFixed(2) : Math.round(power)}W</p>
                  <p className="text-xs text-gray-600 font-mono mt-1">V × I</p>
                </div>
                <div className="bg-gray-900/60 rounded-xl p-3 text-center border border-gray-800">
                  <p className="text-xs text-gray-500 mb-1">V² / R check</p>
                  <p className="text-xl font-mono font-bold text-gray-300">{Math.round(voltage * voltage / resistance)}W</p>
                  <p className="text-xs text-gray-600 font-mono mt-1">V²÷R</p>
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Real-world scenarios</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: '60W bulb', sub: '120V / 240Ω', v: 120, r: 240 },
                    { label: '1000W load', sub: '120V / 14.4Ω', v: 120, r: 14 },
                    { label: '100W UPS load', sub: '240V / 576Ω', v: 240, r: 576 },
                    { label: 'Wire heating', sub: '48V / 0.3Ω — high!', v: 48, r: 1 },
                  ].map(p => (
                    <button key={p.label} onClick={() => { setVoltage(p.v); setResistance(p.r); }}
                      className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                      <span className="font-medium text-white block">{p.label}</span>
                      <span className="text-gray-500 font-mono">{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is a Watt? */}
        <div className="card-dark p-6 mb-8">
          <h3 className="text-base font-semibold text-white mb-4">What Is a Watt?</h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            One Watt equals one Joule of energy consumed per second. It doesn't care whether that energy is doing useful work
            (spinning a motor) or being wasted as heat in a resistor — power is power.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { device: 'LED indicator light', watts: '0.1–0.5W', color: 'text-blue-400' },
              { device: 'UPS internal fan', watts: '5–20W', color: 'text-indigo-400' },
              { device: 'Desktop computer', watts: '150–300W', color: 'text-amber-400' },
              { device: 'Data center server', watts: '500–1,000W', color: 'text-red-400' },
            ].map(d => (
              <div key={d.device} className="bg-gray-900/60 rounded-xl p-4 text-center">
                <p className={`text-lg font-mono font-bold mb-1 ${d.color}`}>{d.watts}</p>
                <p className="text-xs text-gray-400">{d.device}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Power = Heat */}
        <div className="card-dark p-6 mb-8 border-orange-900/50">
          <h3 className="text-sm font-semibold text-orange-300 mb-3">Power Dissipated = Heat Generated</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 leading-relaxed">
            <div>
              <p className="text-white font-medium mb-1">Resistive losses in wiring</p>
              <p>Every wire has resistance. P = I²R tells you exactly how many watts are being converted to heat in that wire.
                A 10A current through 0.5Ω of wire dissipates 50W as heat — that's a serious fire risk if the wire isn't rated for it.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">UPS efficiency and heat</p>
              <p>A 90% efficient UPS delivering 1,000W to the load consumes 1,111W from the utility —
                the extra 111W becomes heat inside the cabinet. This is why UPS rooms need proper cooling.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Battery internal resistance</p>
              <p>Batteries have internal resistance. Under heavy discharge, P = I²R inside the battery
                heats the cells — reducing capacity and lifespan. High-rate discharge kills batteries faster.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Fuse sizing</p>
              <p>Fuses are rated by the current at which their element melts. Since P = I²R, a small
                increase in current causes a disproportionate increase in heat — which is exactly what makes fuses effective.</p>
            </div>
          </div>
        </div>

        {/* Worked examples */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-white mb-4">Worked Examples</h3>
          <div className="space-y-3">
            <WorkedExample
              q="A UPS is powering a 240V load that draws 5A. How much power is the load consuming?"
              given={['V = 240V', 'I = 5A']}
              find="P = ?"
              steps={[
                { label: 'Formula:', expr: 'P = V × I' },
                { label: 'Substitute:', expr: 'P = 240 × 5' },
                { label: 'Calculate:', expr: 'P = 1,200W = 1.2 kW' },
              ]}
              answer="The load consumes 1,200 watts (1.2 kW)"
            />
            <WorkedExample
              q="A cable has 0.4Ω resistance and carries 8A. How much power is wasted as heat in the cable?"
              given={['I = 8A', 'R = 0.4Ω']}
              find="P = ?"
              steps={[
                { label: 'Formula:', expr: 'P = I² × R  (we don\'t know V)' },
                { label: 'Substitute:', expr: 'P = 8² × 0.4' },
                { label: 'Calculate:', expr: 'P = 64 × 0.4 = 25.6W' },
              ]}
              answer="25.6 watts are wasted as heat in the cable"
            />
            <WorkedExample
              q="A 120V circuit feeds a 24Ω resistive load. What power does it dissipate? (No current given.)"
              given={['V = 120V', 'R = 24Ω']}
              find="P = ?"
              steps={[
                { label: 'Formula:', expr: 'P = V² / R  (no I needed)' },
                { label: 'Substitute:', expr: 'P = 120² / 24' },
                { label: 'Calculate:', expr: 'P = 14,400 / 24 = 600W' },
              ]}
              answer="The load dissipates 600 watts"
            />
          </div>
        </div>

        {/* Self-check */}
        <div className="mb-10">
          <h3 className="text-base font-semibold text-white mb-4">Self-Check</h3>
          <div className="space-y-4">
            <QuizQuestion
              q="A 120V outlet supplies a device drawing 10A. What is the power consumption?"
              choices={['12W', '1,200W', '120W', '10W']}
              correct={1}
              explanation="P = V × I = 120 × 10 = 1,200W"
            />
            <QuizQuestion
              q="You double the current through a resistor while keeping resistance the same. What happens to the power dissipated?"
              choices={['It doubles', 'It quadruples', 'It halves', 'It stays the same']}
              correct={1}
              explanation="P = I²R — current is squared, so doubling I multiplies power by 4."
            />
            <QuizQuestion
              q="A wire dissipating excessive power as heat is most likely a sign of:"
              choices={['Correct wire sizing', 'Too much resistance in the load', 'Undersized wire or excessive current', 'Low voltage']}
              correct={2}
              explanation="P = I²R — high current through a wire with resistance generates heat. Undersized wire can't safely carry the current."
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <Link href="/training/basic-electricity/ohms-law" className="text-sm text-gray-400 hover:text-white transition-colors">
            &larr; Ohm's Law
          </Link>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Next lesson</p>
            <p className="text-sm text-gray-500 line-through">Series vs. Parallel Circuits</p>
            <p className="text-xs text-gray-600">Coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
