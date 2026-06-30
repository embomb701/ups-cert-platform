'use client';

import { useState, useCallback } from 'react';
import type { MeterSimExercise, MeterSimTask, MeterTestPoint } from '@/data/modules';

interface Props {
  exercise: MeterSimExercise;
  onComplete: () => void;
}

type PlacingMode = 'red' | 'black' | 'line' | 'earth' | 'clamp' | null;

const DMM_DIAL = [
  { id: 'OFF',  label: 'OFF',  symbol: '○' },
  { id: 'VDC',  label: 'V DC', symbol: '─' },
  { id: 'VAC',  label: 'V AC', symbol: '~' },
  { id: 'mVDC', label: 'mV DC',symbol: 'mV─' },
  { id: 'OHM',  label: 'Ω',    symbol: 'Ω' },
  { id: 'CONT', label: 'Cont', symbol: '◄)' },
  { id: 'DIODE',label: 'Diode',symbol: '→|' },
  { id: 'CAP',  label: 'F',    symbol: '⊣⊢' },
  { id: 'ADC',  label: 'A DC', symbol: 'A─' },
  { id: 'AAC',  label: 'A AC', symbol: 'A~' },
  { id: 'Hz',   label: 'Hz',   symbol: 'Hz' },
  { id: 'NCV',  label: 'NCV',  symbol: 'V)' },
];

const CLAMP_DIAL = [
  { id: 'AAC',  label: 'A AC',  symbol: 'A~' },
  { id: 'ADC',  label: 'A DC',  symbol: 'A─' },
  { id: 'VAC',  label: 'V AC',  symbol: '~' },
  { id: 'VDC',  label: 'V DC',  symbol: '─' },
  { id: 'OHM',  label: 'Ω',     symbol: 'Ω' },
  { id: 'Hz',   label: 'Hz',    symbol: 'Hz' },
];

const MEGGER_VOLTAGES = ['500', '1000', '2500'];

function computeDisplay(task: MeterSimTask, state: ReturnType<typeof makeState>): string {
  const {
    meterType, dmmDial, redJack, redPoint, blackPoint,
    clampDial, clampPoint,
    megVoltage, megLine, megEarth, megTested,
  } = state;

  if (meterType !== task.meterType) return '- - - -';

  if (task.meterType === 'dmm') {
    const dialOk  = dmmDial  === task.correctDial;
    const jackOk  = !task.correctRedJack  || redJack   === task.correctRedJack;
    const redOk   = !task.correctRedPoint  || redPoint  === task.correctRedPoint;
    const blackOk = !task.correctBlackPoint || blackPoint === task.correctBlackPoint;

    if (dialOk && jackOk && redOk && blackOk) return task.displayReading;

    // Common instructive wrong readings
    if (redPoint && blackPoint) {
      // Probes are placed but something else is wrong
      if (!dialOk) {
        // Wrong mode for what's being measured
        const w = task.wrongReadings ?? {};
        if (w[dmmDial]) return w[dmmDial];
        if ((task.correctDial === 'VDC' || task.correctDial === 'VAC') && dmmDial === 'OHM') return 'OL';
        if (task.correctDial === 'VAC' && dmmDial === 'VDC') return '0.00 V';
        if (task.correctDial === 'VDC' && dmmDial === 'VAC') return '0.00 V';
        if (dmmDial === 'CONT') return task.correctDial?.startsWith('V') ? '---' : 'OL';
        return '- - -';
      }
      if (!jackOk) {
        // Leads in wrong jacks
        return task.correctRedJack === 'a10' ? '0.000 A' : '---';
      }
      if (!redOk || !blackOk) {
        // Leads on wrong test points
        return task.wrongReadings?.['wrongPoints'] ?? '0.00';
      }
    }
    return '_ _ _ _'; // nothing placed yet
  }

  if (task.meterType === 'clamp') {
    const dialOk  = clampDial === task.correctClampDial;
    const clampOk = clampPoint === task.correctClampAround;
    if (dialOk && clampOk) return task.displayReading;
    if (clampPoint) {
      if (!dialOk) {
        const w = task.wrongReadings ?? {};
        if (w[clampDial]) return w[clampDial];
        return '0.00';
      }
      if (!clampOk) return task.wrongReadings?.['wrongConductor'] ?? '0.00';
    }
    return '_ _ _ _';
  }

  if (task.meterType === 'megger') {
    const voltOk  = megVoltage === task.correctMeggerVoltage;
    const lineOk  = megLine === task.correctMeggerLine;
    const earthOk = megEarth === task.correctMeggerEarth;
    const testOk  = !task.requiresMeggerTest || megTested;
    if (voltOk && lineOk && earthOk && testOk) return task.displayReading;
    if (megTested) {
      if (!voltOk) return task.wrongReadings?.['wrongVoltage'] ?? '???';
      if (!lineOk || !earthOk) return task.wrongReadings?.['wrongTerminals'] ?? '0.0 MΩ';
    }
    return '_ _ _ _';
  }

  return '- - - -';
}

function makeState() {
  return {
    meterType: 'dmm' as 'dmm' | 'clamp' | 'megger',
    dmmDial: 'OFF',
    redJack: null as 'vomA' | 'a10' | null,
    redPoint: null as string | null,
    blackPoint: null as string | null,
    clampDial: 'AAC',
    clampPoint: null as string | null,
    megVoltage: '1000',
    megLine: null as string | null,
    megEarth: null as string | null,
    megTested: false,
  };
}

const pointColors: Record<string, string> = {
  red:    'bg-red-700 border-red-500 text-white',
  black:  'bg-gray-800 border-gray-500 text-white',
  blue:   'bg-blue-700 border-blue-500 text-white',
  green:  'bg-green-700 border-green-500 text-white',
  orange: 'bg-orange-700 border-orange-500 text-white',
  gray:   'bg-gray-600 border-gray-400 text-white',
};

// ── Sub-components ──────────────────────────────────────────────────────────

function DMMFace({ dial, setDial, redJack, setRedJack, display }: {
  dial: string; setDial: (d: string) => void;
  redJack: 'vomA' | 'a10' | null; setRedJack: (j: 'vomA' | 'a10') => void;
  display: string;
}) {
  return (
    <div className="space-y-3">
      {/* Display */}
      <div className="bg-black rounded border-2 border-gray-500 px-4 py-3 text-center">
        <p className="text-xs text-gray-500 mb-1 font-mono">DIGITAL MULTIMETER</p>
        <p className="text-3xl font-mono font-bold text-green-400 tracking-widest">{display}</p>
      </div>

      {/* Dial */}
      <div>
        <p className="text-xs text-gray-400 mb-2 text-center">Rotary Dial — click to select</p>
        <div className="grid grid-cols-4 gap-1">
          {DMM_DIAL.map((pos) => (
            <button
              key={pos.id}
              onClick={() => setDial(pos.id)}
              className={`px-1 py-2 rounded text-center text-xs font-bold border transition-all ${
                dial === pos.id
                  ? 'bg-orange-600 border-orange-400 text-white shadow-md'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-orange-500'
              }`}
            >
              <span className="block text-base leading-none">{pos.symbol}</span>
              <span className="block text-xs mt-0.5">{pos.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input jacks */}
      <div>
        <p className="text-xs text-gray-400 mb-2 text-center">Input Jacks — select red lead jack</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setRedJack('a10')}
            className={`flex-1 py-2 rounded border text-xs font-bold transition-all ${
              redJack === 'a10'
                ? 'bg-red-700 border-red-400 text-white'
                : 'bg-gray-800 border-gray-600 text-red-400 hover:border-red-500'
            }`}
          >
            <span className="block text-base">⊙</span>
            <span>10A</span>
          </button>
          <button
            onClick={() => setRedJack('vomA')}
            className={`flex-1 py-2 rounded border text-xs font-bold transition-all ${
              redJack === 'vomA'
                ? 'bg-red-700 border-red-400 text-white'
                : 'bg-gray-800 border-gray-600 text-red-400 hover:border-red-500'
            }`}
          >
            <span className="block text-base">⊙</span>
            <span>VΩmA</span>
          </button>
          <div className="flex-1 py-2 rounded border border-gray-600 bg-gray-900 text-xs font-bold text-center text-gray-400">
            <span className="block text-base">⊙</span>
            <span>COM</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-1">Black lead always uses COM</p>
      </div>
    </div>
  );
}

function ClampFace({ dial, setDial, display }: {
  dial: string; setDial: (d: string) => void; display: string;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-black rounded border-2 border-gray-500 px-4 py-3 text-center">
        <p className="text-xs text-gray-500 mb-1 font-mono">CLAMP METER</p>
        <p className="text-3xl font-mono font-bold text-green-400 tracking-widest">{display}</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2 text-center">Function Selector</p>
        <div className="grid grid-cols-3 gap-1">
          {CLAMP_DIAL.map((pos) => (
            <button
              key={pos.id}
              onClick={() => setDial(pos.id)}
              className={`px-1 py-2 rounded text-center text-xs font-bold border transition-all ${
                dial === pos.id
                  ? 'bg-orange-600 border-orange-400 text-white shadow-md'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-orange-500'
              }`}
            >
              <span className="block text-base leading-none">{pos.symbol}</span>
              <span className="block text-xs mt-0.5">{pos.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clamp jaw visual */}
      <div className="rounded border border-gray-700 bg-gray-900 p-3 text-center">
        <div className="text-3xl">〈〉</div>
        <p className="text-xs text-gray-500 mt-1">Clamp Jaw — click a conductor below to clamp around it</p>
      </div>
    </div>
  );
}

function MeggerFace({
  voltage, setVoltage,
  display, megTested, setMegTested,
  megLine, megEarth,
}: {
  voltage: string; setVoltage: (v: string) => void;
  display: string; megTested: boolean; setMegTested: (b: boolean) => void;
  megLine: string | null; megEarth: string | null;
}) {
  return (
    <div className="space-y-3">
      <div className="bg-black rounded border-2 border-gray-500 px-4 py-3 text-center">
        <p className="text-xs text-gray-500 mb-1 font-mono">INSULATION TESTER (MEGGER)</p>
        <p className="text-3xl font-mono font-bold text-green-400 tracking-widest">{display}</p>
      </div>

      {/* Voltage selector */}
      <div>
        <p className="text-xs text-gray-400 mb-2 text-center">Test Voltage</p>
        <div className="flex gap-1">
          {MEGGER_VOLTAGES.map((v) => (
            <button
              key={v}
              onClick={() => { setVoltage(v); setMegTested(false); }}
              className={`flex-1 py-2 rounded border text-xs font-bold transition-all ${
                voltage === v
                  ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-amber-500'
              }`}
            >{v}V</button>
          ))}
        </div>
      </div>

      {/* Terminals status */}
      <div className="grid grid-cols-2 gap-2">
        <div className={`p-2 rounded border text-xs text-center ${megLine ? 'border-red-500 bg-red-950/40 text-red-300' : 'border-gray-700 bg-gray-900 text-gray-500'}`}>
          <p className="font-bold">LINE</p>
          <p className="text-xs truncate">{megLine ?? 'not connected'}</p>
        </div>
        <div className={`p-2 rounded border text-xs text-center ${megEarth ? 'border-green-500 bg-green-950/40 text-green-300' : 'border-gray-700 bg-gray-900 text-gray-500'}`}>
          <p className="font-bold">EARTH</p>
          <p className="text-xs truncate">{megEarth ?? 'not connected'}</p>
        </div>
      </div>

      {/* Test button */}
      <button
        onClick={() => setMegTested(true)}
        disabled={!megLine || !megEarth}
        className="w-full py-3 rounded border-2 text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed border-red-600 bg-red-900/30 text-red-300 hover:bg-red-900/60 active:scale-95"
      >
        ▶ TEST
      </button>
      {megTested && <p className="text-xs text-center text-amber-400">Test complete — read display</p>}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function MeterSimulator({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'task' | 'done'>('intro');
  const [taskIdx, setTaskIdx] = useState(0);
  const [placing, setPlacing] = useState<PlacingMode>(null);
  const [taskResult, setTaskResult] = useState<'pending' | 'correct' | 'incorrect'>('pending');
  const [meterState, setMeterState] = useState(makeState());

  const task = exercise.tasks[taskIdx];

  const updateMeter = useCallback(<K extends keyof ReturnType<typeof makeState>>(
    key: K, val: ReturnType<typeof makeState>[K]
  ) => {
    setMeterState((s) => ({ ...s, [key]: val }));
    // Changing meter type resets placing mode
    if (key === 'meterType') setPlacing(null);
    // Any meter change resets task result if it was incorrect
    setTaskResult('pending');
  }, []);

  const display = phase === 'task' ? computeDisplay(task, meterState) : '_ _ _ _';

  const isTaskCorrect = useCallback(() => {
    if (!task) return false;
    if (task.meterType === 'dmm') {
      return (
        meterState.meterType === 'dmm' &&
        meterState.dmmDial === task.correctDial &&
        (!task.correctRedJack || meterState.redJack === task.correctRedJack) &&
        (!task.correctRedPoint || meterState.redPoint === task.correctRedPoint) &&
        (!task.correctBlackPoint || meterState.blackPoint === task.correctBlackPoint)
      );
    }
    if (task.meterType === 'clamp') {
      return (
        meterState.meterType === 'clamp' &&
        meterState.clampDial === task.correctClampDial &&
        meterState.clampPoint === task.correctClampAround
      );
    }
    if (task.meterType === 'megger') {
      return (
        meterState.meterType === 'megger' &&
        meterState.megVoltage === task.correctMeggerVoltage &&
        meterState.megLine === task.correctMeggerLine &&
        meterState.megEarth === task.correctMeggerEarth &&
        (!task.requiresMeggerTest || meterState.megTested)
      );
    }
    return false;
  }, [task, meterState]);

  const handleCheckReading = () => {
    if (isTaskCorrect()) {
      setTaskResult('correct');
    } else {
      setTaskResult('incorrect');
    }
  };

  const handleNextTask = () => {
    if (taskIdx + 1 >= exercise.tasks.length) {
      setPhase('done');
    } else {
      setTaskIdx((i) => i + 1);
      setTaskResult('pending');
      setPlacing(null);
      setMeterState(makeState());
    }
  };

  const handleTestPointClick = (tp: MeterTestPoint) => {
    if (!placing) return;
    if (placing === 'red') {
      updateMeter('redPoint', tp.id);
      setPlacing(null);
    } else if (placing === 'black') {
      updateMeter('blackPoint', tp.id);
      setPlacing(null);
    } else if (placing === 'line') {
      updateMeter('megLine', tp.id);
      setMeterState((s) => ({ ...s, megLine: tp.id, megTested: false }));
      setPlacing(null);
    } else if (placing === 'earth') {
      updateMeter('megEarth', tp.id);
      setMeterState((s) => ({ ...s, megEarth: tp.id, megTested: false }));
      setPlacing(null);
    } else if (placing === 'clamp') {
      updateMeter('clampPoint', tp.id);
      setPlacing(null);
    }
  };

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="rounded-xl border border-blue-700 bg-blue-950/20 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔌</span>
          <div>
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest">Hands-On Lab</p>
            <h3 className="text-white font-bold text-lg">{exercise.circuitLabel}</h3>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{exercise.intro}</p>
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-3">
          <p className="text-xs text-gray-400 font-semibold mb-1">Circuit Under Test</p>
          <p className="text-sm text-gray-300">{exercise.circuitDescription}</p>
        </div>
        <p className="text-xs text-gray-500">{exercise.tasks.length} measurement tasks · Complete all to unlock the reading</p>
        <button
          onClick={() => setPhase('task')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
        >
          Start Lab →
        </button>
      </div>
    );
  }

  // ── Done ──
  if (phase === 'done') {
    return (
      <div className="rounded-xl border border-green-700 bg-green-950/20 p-6 text-center space-y-3">
        <p className="text-4xl">✓</p>
        <p className="text-green-300 font-bold text-lg">Lab Complete</p>
        <p className="text-gray-400 text-sm">All measurements taken correctly. Continue to the reading material.</p>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
        >
          Continue →
        </button>
      </div>
    );
  }

  // ── Task ──
  const currentMeter = meterState.meterType;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest">Hands-On Lab — {exercise.circuitLabel}</p>
          <p className="text-sm text-gray-400">Task {taskIdx + 1} of {exercise.tasks.length}</p>
        </div>
        <div className="flex gap-1">
          {exercise.tasks.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < taskIdx ? 'bg-green-500' : i === taskIdx ? 'bg-blue-400' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {/* Task instruction */}
      <div className="rounded-lg border border-amber-700/50 bg-amber-950/20 p-4">
        <p className="text-xs text-amber-400 font-semibold mb-1">TASK {taskIdx + 1}</p>
        <p className="text-white text-sm leading-relaxed">{task.instruction}</p>
        {task.hint && <p className="text-amber-300/70 text-xs mt-2 italic">Hint: {task.hint}</p>}
      </div>

      {/* Meter selector */}
      <div className="flex gap-1">
        {(['dmm', 'clamp', 'megger'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { updateMeter('meterType', m); setPlacing(null); }}
            className={`flex-1 py-2 rounded border text-xs font-bold transition-all ${
              currentMeter === m
                ? 'bg-gray-700 border-gray-400 text-white'
                : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-500'
            } ${task.meterType !== m ? 'opacity-50' : ''}`}
          >
            {m === 'dmm' ? '🔢 DMM' : m === 'clamp' ? '🔄 Clamp' : '⚡ Megger'}
          </button>
        ))}
      </div>

      {/* Main workbench */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Left: Circuit + test points */}
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <p className="text-xs text-gray-400 font-semibold mb-3 uppercase">Circuit: {exercise.circuitLabel}</p>

            {/* Lead placement controls */}
            {currentMeter === 'dmm' && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setPlacing(placing === 'red' ? null : 'red')}
                  className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all ${
                    placing === 'red'
                      ? 'bg-red-600 border-red-400 text-white animate-pulse'
                      : 'border-red-800 bg-red-950/30 text-red-400 hover:border-red-600'
                  }`}
                >
                  {placing === 'red' ? '→ Click test point' : '🔴 Place RED probe'}
                </button>
                <button
                  onClick={() => setPlacing(placing === 'black' ? null : 'black')}
                  className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all ${
                    placing === 'black'
                      ? 'bg-gray-500 border-gray-300 text-white animate-pulse'
                      : 'border-gray-600 bg-gray-900 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {placing === 'black' ? '→ Click test point' : '⚫ Place BLACK probe'}
                </button>
              </div>
            )}
            {currentMeter === 'clamp' && (
              <button
                onClick={() => setPlacing(placing === 'clamp' ? null : 'clamp')}
                className={`w-full mb-3 py-1.5 rounded border text-xs font-bold transition-all ${
                  placing === 'clamp'
                    ? 'bg-blue-600 border-blue-400 text-white animate-pulse'
                    : 'border-blue-800 bg-blue-950/30 text-blue-400 hover:border-blue-600'
                }`}
              >
                {placing === 'clamp' ? '→ Click a conductor' : '🔄 Clamp around conductor'}
              </button>
            )}
            {currentMeter === 'megger' && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setPlacing(placing === 'line' ? null : 'line')}
                  className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all ${
                    placing === 'line'
                      ? 'bg-red-600 border-red-400 text-white animate-pulse'
                      : 'border-red-800 bg-red-950/30 text-red-400 hover:border-red-600'
                  }`}
                >
                  {placing === 'line' ? '→ Click test point' : '🔴 Connect LINE'}
                </button>
                <button
                  onClick={() => setPlacing(placing === 'earth' ? null : 'earth')}
                  className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all ${
                    placing === 'earth'
                      ? 'bg-green-600 border-green-400 text-white animate-pulse'
                      : 'border-green-800 bg-green-950/30 text-green-400 hover:border-green-600'
                  }`}
                >
                  {placing === 'earth' ? '→ Click test point' : '🟢 Connect EARTH'}
                </button>
              </div>
            )}

            {/* Test points grid */}
            <div className="grid grid-cols-2 gap-2">
              {exercise.testPoints.map((tp) => {
                const colorClass = pointColors[tp.color ?? 'gray'];
                const isRedHere = meterState.redPoint === tp.id || meterState.megLine === tp.id;
                const isBlackHere = meterState.blackPoint === tp.id || meterState.megEarth === tp.id;
                const isClampHere = meterState.clampPoint === tp.id;
                const isClickable = placing !== null;

                return (
                  <button
                    key={tp.id}
                    onClick={() => handleTestPointClick(tp)}
                    className={`p-3 rounded border-2 text-left transition-all ${colorClass} ${
                      isClickable ? 'cursor-pointer hover:scale-105 ring-2 ring-yellow-400 ring-offset-1 ring-offset-gray-900' : 'cursor-default opacity-90'
                    } ${isRedHere ? 'ring-2 ring-red-400' : ''} ${isBlackHere ? 'ring-2 ring-gray-300' : ''} ${isClampHere ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    <p className="text-xs font-bold leading-tight">{tp.label}</p>
                    {tp.sublabel && <p className="text-xs opacity-70 mt-0.5">{tp.sublabel}</p>}
                    {isRedHere && <span className="text-xs">🔴</span>}
                    {isBlackHere && <span className="text-xs">⚫</span>}
                    {isClampHere && <span className="text-xs">〈〉</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current connection status */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-xs space-y-1">
            {currentMeter === 'dmm' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dial:</span>
                  <span className={meterState.dmmDial !== 'OFF' ? 'text-orange-400 font-bold' : 'text-gray-600'}>{meterState.dmmDial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Red jack:</span>
                  <span className={meterState.redJack ? 'text-red-400 font-bold' : 'text-gray-600'}>{meterState.redJack ?? 'not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Red probe →</span>
                  <span className={meterState.redPoint ? 'text-red-400' : 'text-gray-600'}>{meterState.redPoint ?? 'not placed'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Black probe →</span>
                  <span className={meterState.blackPoint ? 'text-gray-300' : 'text-gray-600'}>{meterState.blackPoint ?? 'not placed'}</span>
                </div>
              </>
            )}
            {currentMeter === 'clamp' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mode:</span>
                  <span className={meterState.clampDial !== 'AAC' || task.correctClampDial ? 'text-orange-400 font-bold' : 'text-gray-600'}>{meterState.clampDial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Clamped around:</span>
                  <span className={meterState.clampPoint ? 'text-blue-400' : 'text-gray-600'}>{meterState.clampPoint ?? 'nothing'}</span>
                </div>
              </>
            )}
            {currentMeter === 'megger' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Test voltage:</span>
                  <span className="text-amber-400 font-bold">{meterState.megVoltage}V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LINE connected to:</span>
                  <span className={meterState.megLine ? 'text-red-400' : 'text-gray-600'}>{meterState.megLine ?? 'none'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">EARTH connected to:</span>
                  <span className={meterState.megEarth ? 'text-green-400' : 'text-gray-600'}>{meterState.megEarth ?? 'none'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Meter face */}
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-xs text-gray-400 font-semibold mb-3 uppercase text-center">Meter Controls</p>
          {currentMeter === 'dmm' && (
            <DMMFace
              dial={meterState.dmmDial}
              setDial={(d) => updateMeter('dmmDial', d)}
              redJack={meterState.redJack}
              setRedJack={(j) => updateMeter('redJack', j)}
              display={display}
            />
          )}
          {currentMeter === 'clamp' && (
            <ClampFace
              dial={meterState.clampDial}
              setDial={(d) => updateMeter('clampDial', d)}
              display={display}
            />
          )}
          {currentMeter === 'megger' && (
            <MeggerFace
              voltage={meterState.megVoltage}
              setVoltage={(v) => updateMeter('megVoltage', v)}
              display={display}
              megTested={meterState.megTested}
              setMegTested={(b) => setMeterState((s) => ({ ...s, megTested: b }))}
              megLine={meterState.megLine}
              megEarth={meterState.megEarth}
            />
          )}
        </div>
      </div>

      {/* Result feedback */}
      {taskResult === 'correct' && (
        <div className="rounded-lg border border-green-700 bg-green-950/30 p-4 space-y-2">
          <p className="text-green-300 font-bold">✓ Correct! Display reads: <span className="font-mono">{task.displayReading}</span></p>
          <p className="text-gray-300 text-sm">{task.explanation}</p>
          <button
            onClick={handleNextTask}
            className="mt-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
          >
            {taskIdx + 1 >= exercise.tasks.length ? 'Complete Lab ✓' : 'Next Task →'}
          </button>
        </div>
      )}

      {taskResult === 'incorrect' && (
        <div className="rounded-lg border border-red-700 bg-red-950/30 p-4 space-y-2">
          <p className="text-red-300 font-bold">Not quite right.</p>
          <p className="text-gray-300 text-sm">Check your meter type, dial setting, jack selection, and probe/clamp placement. The display shows: <span className="font-mono text-yellow-400">{display}</span></p>
        </div>
      )}

      {taskResult === 'pending' && (
        <button
          onClick={handleCheckReading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
        >
          Check My Reading
        </button>
      )}
    </div>
  );
}
