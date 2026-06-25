'use client';

import { useState } from 'react';
import Link from 'next/link';

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function currentColor(amps: number): string {
  if (amps < 0.5) return '#60a5fa'; // blue — very low
  if (amps < 1.5) return '#a78bfa'; // purple — low
  if (amps < 3)   return '#f59e0b'; // amber — medium
  return '#f87171';                 // red — high
}

function riskLabel(amps: number): { label: string; color: string } {
  if (amps < 0.5) return { label: 'Very Low', color: 'text-blue-400' };
  if (amps < 1.5) return { label: 'Low', color: 'text-purple-400' };
  if (amps < 3)   return { label: 'Moderate', color: 'text-amber-400' };
  return { label: 'High', color: 'text-red-400' };
}

interface CircuitProps {
  voltage: number;
  resistance: number;
  current: number;
}

function OhmsLawCircuit({ voltage, resistance, current }: CircuitProps) {
  const color = currentColor(current);
  const animDuration = clamp(5 / Math.max(current, 0.05), 0.35, 14).toFixed(2);

  // Layout constants
  const W = 480, H = 290;
  const left = 80, right = 400, top = 65, bot = 225;
  const resLeft = 168, resRight = 312;
  const batMid = (top + bot) / 2; // ~145

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto" aria-label="Ohm's Law circuit diagram">
      {/* ── Static wires (dark base layer) ── */}
      {/* Top: left segment */}
      <line x1={left} y1={top} x2={resLeft} y2={top} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Top: right segment */}
      <line x1={resRight} y1={top} x2={right} y2={top} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Right side */}
      <line x1={right} y1={top} x2={right} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Bottom */}
      <line x1={left} y1={bot} x2={right} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Left side: top segment above battery */}
      <line x1={left} y1={top} x2={left} y2={batMid - 22} stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Left side: bottom segment below battery */}
      <line x1={left} y1={batMid + 22} x2={left} y2={bot} stroke="#374151" strokeWidth="4" strokeLinecap="round" />

      {/* ── Animated current (overlay on top of static wires) ── */}
      <path
        d={`M ${left},${top} H ${resLeft} H ${resRight} H ${right} V ${bot} H ${left} V ${top}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="12 10"
        strokeLinecap="round"
        style={{
          animation: `circuit-flow ${animDuration}s linear infinite`,
          opacity: 0.85,
        }}
      />

      {/* ── Battery symbol (left wire, centered) ── */}
      {/* + plate (long) */}
      <line x1={left - 18} y1={batMid - 20} x2={left + 18} y2={batMid - 20} stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* − plate (short) */}
      <line x1={left - 10} y1={batMid + 20} x2={left + 10} y2={batMid + 20} stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
      {/* + / − labels */}
      <text x={left + 26} y={batMid - 15} fill="#4ade80" fontSize="13" fontFamily="monospace" fontWeight="bold">+</text>
      <text x={left + 26} y={batMid + 25} fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="bold">−</text>
      {/* Voltage value */}
      <text x={left - 28} y={batMid - 4} fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">V</text>
      <text x={left - 28} y={batMid + 12} fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{voltage}</text>

      {/* ── Resistor (rectangle on top wire) ── */}
      <rect x={resLeft} y={top - 13} width={resRight - resLeft} height={26} rx="3"
        fill="#111827" stroke="#4b5563" strokeWidth="2" />
      {/* Zigzag inside resistor */}
      <polyline
        points={`${resLeft + 8},${top} ${resLeft + 20},${top - 8} ${resLeft + 34},${top + 8} ${resLeft + 48},${top - 8} ${resLeft + 62},${top + 8} ${resLeft + 76},${top - 8} ${resLeft + 88},${top + 8} ${resRight - 8},${top}`}
        fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* R label above */}
      <text x={(resLeft + resRight) / 2} y={top - 20} fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">R</text>
      <text x={(resLeft + resRight) / 2} y={top - 8} fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{resistance} Ω</text>

      {/* ── Ammeter (circle on right wire) ── */}
      <circle cx={right} cy={(top + bot) / 2} r="18" fill="#111827" stroke="#4b5563" strokeWidth="2" />
      <text x={right} y={(top + bot) / 2 + 4} fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">A</text>

      {/* ── Current value (bottom center) ── */}
      <text x={W / 2} y={bot + 30} fill={color} fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        I = {current.toFixed(2)} A
      </text>

      {/* ── Corner dots ── */}
      {[
        [left, top], [right, top], [right, bot], [left, bot]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#4b5563" />
      ))}
    </svg>
  );
}

export default function OhmsLawPage() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);

  const current = +(voltage / resistance).toFixed(3);
  const color = currentColor(current);
  const risk = riskLabel(current);

  function setPreset(v: number, r: number) {
    setVoltage(v);
    setResistance(r);
  }

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

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Ohm's Law</h1>
          <p className="text-gray-400 max-w-2xl">
            The single most important formula in electronics. Every current, every voltage drop,
            every fuse rating — all trace back to this relationship.
          </p>
        </div>

        {/* Formula display */}
        <div className="card-dark p-6 mb-8 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">The Formula</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-5xl font-mono font-bold text-white tracking-tight">I = V / R</p>
              <p className="text-sm text-gray-500 mt-2">Current = Voltage ÷ Resistance</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-blue-400 mb-0.5">I</p>
                <p className="text-xs">Current</p>
                <p className="text-xs text-gray-500">Amperes (A)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-green-400 mb-0.5">V</p>
                <p className="text-xs">Voltage</p>
                <p className="text-xs text-gray-500">Volts (V)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-orange-400 mb-0.5">R</p>
                <p className="text-xs">Resistance</p>
                <p className="text-xs text-gray-500">Ohms (Ω)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive section */}
        <div className="card-dark p-6 mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Interactive Circuit</p>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Circuit diagram */}
            <div className="bg-gray-950/60 rounded-xl p-4">
              <OhmsLawCircuit voltage={voltage} resistance={resistance} current={current} />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Voltage slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Voltage <span className="font-mono text-green-400">(V)</span>
                  </label>
                  <span className="text-lg font-mono font-bold text-green-400">{voltage} V</span>
                </div>
                <input
                  type="range" min="1" max="48" step="1"
                  value={voltage}
                  onChange={(e) => setVoltage(+e.target.value)}
                  className="w-full accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 V</span><span>48 V</span>
                </div>
              </div>

              {/* Resistance slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Resistance <span className="font-mono text-orange-400">(R)</span>
                  </label>
                  <span className="text-lg font-mono font-bold text-orange-400">{resistance} Ω</span>
                </div>
                <input
                  type="range" min="1" max="96" step="1"
                  value={resistance}
                  onChange={(e) => setResistance(+e.target.value)}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 Ω</span><span>96 Ω</span>
                </div>
              </div>

              {/* Calculated current */}
              <div className="rounded-xl border p-4" style={{ borderColor: color + '60', backgroundColor: color + '10' }}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Calculated Current</p>
                <p className="text-4xl font-mono font-bold mb-1" style={{ color }}>
                  {current.toFixed(2)} <span className="text-xl">A</span>
                </p>
                <p className={`text-xs font-medium ${risk.color}`}>{risk.label} current flow</p>
              </div>

              {/* Preset scenarios */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Try a scenario</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setPreset(12, 6)} className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                    <span className="font-mono text-white">12V / 6Ω</span><br />
                    <span className="text-gray-500">Baseline: 2A</span>
                  </button>
                  <button onClick={() => setPreset(24, 6)} className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                    <span className="font-mono text-white">24V / 6Ω</span><br />
                    <span className="text-gray-500">2× voltage → 4A</span>
                  </button>
                  <button onClick={() => setPreset(12, 12)} className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                    <span className="font-mono text-white">12V / 12Ω</span><br />
                    <span className="text-gray-500">2× resistance → 1A</span>
                  </button>
                  <button onClick={() => setPreset(48, 6)} className="text-xs px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-left transition-colors">
                    <span className="font-mono text-white">48V / 6Ω</span><br />
                    <span className="text-gray-500">4× voltage → 8A</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key insights */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="card-dark p-5">
            <div className="text-2xl font-mono font-bold text-green-400 mb-2">↑ V</div>
            <h3 className="text-sm font-semibold text-white mb-1">More Voltage → More Current</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Double the voltage and you double the current — as long as resistance stays the same.
              This is why higher-voltage UPS systems can deliver more power through the same wiring.
            </p>
          </div>
          <div className="card-dark p-5">
            <div className="text-2xl font-mono font-bold text-orange-400 mb-2">↑ R</div>
            <h3 className="text-sm font-semibold text-white mb-1">More Resistance → Less Current</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Double the resistance and current drops by half. Corroded terminals, undersized wire,
              or a bad connection all add resistance — and starve your load of current.
            </p>
          </div>
          <div className="card-dark p-5">
            <div className="text-2xl font-mono font-bold text-blue-400 mb-2">I = V/R</div>
            <h3 className="text-sm font-semibold text-white mb-1">Solve for Any Variable</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Rearrange the formula to find what you need:<br />
              <span className="font-mono text-gray-300">V = I × R</span><br />
              <span className="font-mono text-gray-300">R = V / I</span><br />
              On the job you'll use all three forms.
            </p>
          </div>
        </div>

        {/* UPS Context */}
        <div className="card-dark p-6 mb-10 border-indigo-900/60">
          <h3 className="text-sm font-semibold text-indigo-300 mb-3">Why This Matters in a UPS</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 leading-relaxed">
            <div>
              <p className="text-white font-medium mb-1">Battery discharge rate</p>
              <p>
                A 48V battery bank powering a load with 4Ω total resistance pushes 12A of current.
                Ohm's Law tells you exactly how hard the batteries are working.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Fuse and wire sizing</p>
              <p>
                Every fuse and wire rating is based on current. Calculate I = V/R first —
                then size your protection for that current.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Voltage drops under load</p>
              <p>
                When current flows through a wire, the wire's resistance causes a voltage drop
                (V = I × R). Too much drop means your load sees less voltage than it needs.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Troubleshooting high current alarms</p>
              <p>
                If current is too high, either voltage went up or resistance went down.
                A short circuit is resistance approaching zero — current goes to infinity.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <Link href="/training/basic-electricity" className="text-sm text-gray-400 hover:text-white transition-colors">
            &larr; Back to Basic Electricity
          </Link>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Next lesson</p>
            <p className="text-sm text-gray-500 line-through">Power Formula (P = V × I)</p>
            <p className="text-xs text-gray-600">Coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
