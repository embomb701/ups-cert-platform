'use client';

import { useState } from 'react';
import type {
  PracticalExercise,
  PracticalStep,
  PracticalMeter,
  PracticalDialMode,
  PracticalChoice,
} from '@/data/modules';

interface Props {
  exercise: PracticalExercise;
  onComplete: () => void;
}

type Phase = 'intro' | 'step' | 'done';
type StepResult = 'pending' | 'correct' | 'incorrect';

export default function PracticalActivity({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [stepResult, setStepResult] = useState<StepResult>('pending');

  const [selectedMeter, setSelectedMeter] = useState<string | null>(null);
  const [selectedDial, setSelectedDial] = useState<string | null>(null);
  const [selectedRed, setSelectedRed] = useState<string | null>(null);
  const [selectedBlack, setSelectedBlack] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const step = exercise.steps[currentStep];

  const resetSelections = () => {
    setSelectedMeter(null);
    setSelectedDial(null);
    setSelectedRed(null);
    setSelectedBlack(null);
    setSelectedScenario(null);
    setStepResult('pending');
  };

  const checkAnswer = () => {
    if (!step) return;
    let correct = false;
    switch (step.type) {
      case 'meter_select':
        correct = selectedMeter === step.correctMeter;
        break;
      case 'dial_select':
        correct = selectedDial === step.correctDial;
        break;
      case 'lead_placement':
        correct = selectedRed === step.correctRed && selectedBlack === step.correctBlack;
        break;
      case 'scenario':
        correct = selectedScenario === step.correctScenario;
        break;
    }
    setStepResult(correct ? 'correct' : 'incorrect');
  };

  const nextStep = () => {
    if (currentStep + 1 >= exercise.steps.length) {
      setPhase('done');
    } else {
      setCurrentStep(currentStep + 1);
      resetSelections();
    }
  };

  const canCheck = () => {
    if (!step) return false;
    switch (step.type) {
      case 'meter_select': return selectedMeter !== null;
      case 'dial_select': return selectedDial !== null;
      case 'lead_placement': return selectedRed !== null && selectedBlack !== null;
      case 'scenario': return selectedScenario !== null;
    }
  };

  if (phase === 'intro') {
    return (
      <div className="rounded-xl bg-indigo-950/40 border border-indigo-700/50 p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-2xl">🔧</span>
          <h3 className="text-lg font-bold text-white">Practical Exercise</h3>
          <span className="text-xs px-2 py-0.5 bg-indigo-600 text-white rounded-full font-semibold">
            {exercise.steps.length} steps
          </span>
        </div>
        <p className="text-gray-300 leading-relaxed text-sm">{exercise.intro}</p>
        <button
          onClick={() => setPhase('step')}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
        >
          Begin Practical Exercise →
        </button>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="rounded-xl bg-green-950/40 border border-green-700 p-6 space-y-4 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="text-xl font-bold text-green-300">Exercise Complete!</h3>
        <p className="text-gray-300 text-sm">
          All {exercise.steps.length} practical steps completed correctly. Read the material below to
          reinforce what you just practiced, then take the section quiz.
        </p>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
        >
          Continue to Reading Material →
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gray-800/80 border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-900/50 border-b border-indigo-700/50 px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-indigo-400 font-semibold text-sm shrink-0">🔧 Practical</span>
          <span className="text-gray-600 text-sm">•</span>
          <span className="text-white text-sm font-medium truncate">{step?.title}</span>
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {currentStep + 1} / {exercise.steps.length}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {exercise.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentStep ? 'bg-green-500' : i === currentStep ? 'bg-indigo-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Prompt */}
        <p className="text-gray-200 leading-relaxed">{step?.prompt}</p>

        {/* Step-type UI */}
        {step?.type === 'meter_select' && (
          <MeterSelectUI
            meters={step.meters ?? []}
            selected={selectedMeter}
            onSelect={setSelectedMeter}
            disabled={stepResult !== 'pending'}
          />
        )}
        {step?.type === 'dial_select' && (
          <DialSelectUI
            modes={step.dialModes ?? []}
            selected={selectedDial}
            onSelect={setSelectedDial}
            disabled={stepResult !== 'pending'}
          />
        )}
        {step?.type === 'lead_placement' && (
          <LeadPlacementUI
            redOptions={step.redOptions ?? []}
            blackOptions={step.blackOptions ?? []}
            selectedRed={selectedRed}
            selectedBlack={selectedBlack}
            onSelectRed={setSelectedRed}
            onSelectBlack={setSelectedBlack}
            disabled={stepResult !== 'pending'}
          />
        )}
        {step?.type === 'scenario' && (
          <ScenarioUI
            options={step.scenarioOptions ?? []}
            selected={selectedScenario}
            onSelect={setSelectedScenario}
            disabled={stepResult !== 'pending'}
          />
        )}

        {/* Hint */}
        {step?.hint && stepResult === 'pending' && (
          <p className="text-sm text-indigo-300/80 italic">
            💡 <span className="font-medium">Hint:</span> {step.hint}
          </p>
        )}

        {/* Feedback */}
        {stepResult === 'correct' && (
          <div className="rounded-lg bg-green-900/40 border border-green-600 p-4 space-y-1">
            <p className="text-green-300 font-semibold">✓ Correct!</p>
            <p className="text-gray-300 text-sm leading-relaxed">{step?.correctFeedback}</p>
          </div>
        )}
        {stepResult === 'incorrect' && (
          <div className="rounded-lg bg-red-900/40 border border-red-600 p-4 space-y-1">
            <p className="text-red-300 font-semibold">✗ Not quite.</p>
            <p className="text-gray-300 text-sm leading-relaxed">{step?.incorrectFeedback}</p>
          </div>
        )}

        {/* Action button */}
        {stepResult === 'pending' && (
          <button
            onClick={checkAnswer}
            disabled={!canCheck()}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Check Answer
          </button>
        )}
        {stepResult === 'correct' && (
          <button
            onClick={nextStep}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
          >
            {currentStep + 1 < exercise.steps.length ? 'Next Step →' : 'Complete Exercise ✓'}
          </button>
        )}
        {stepResult === 'incorrect' && (
          <button
            onClick={resetSelections}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function MeterSelectUI({
  meters,
  selected,
  onSelect,
  disabled,
}: {
  meters: PracticalMeter[];
  selected: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {meters.map((m) => (
        <button
          key={m.id}
          onClick={() => !disabled && onSelect(m.id)}
          disabled={disabled}
          className={`p-4 rounded-xl border text-left transition-all ${
            selected === m.id
              ? 'border-indigo-500 bg-indigo-900/40 ring-2 ring-indigo-500'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
          } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <div className="text-3xl mb-2">{m.icon}</div>
          <p className="text-white font-semibold text-sm mb-1.5">{m.label}</p>
          <p className="text-gray-400 text-xs leading-relaxed">{m.detail}</p>
        </button>
      ))}
    </div>
  );
}

function DialSelectUI({
  modes,
  selected,
  onSelect,
  disabled,
}: {
  modes: PracticalDialMode[];
  selected: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
}) {
  const selectedMode = modes.find((m) => m.id === selected);
  return (
    <div className="space-y-4">
      {/* Meter display preview */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-4 flex flex-col items-center">
        <p className="text-xs text-gray-500 tracking-widest mb-3 uppercase">Digital Multimeter — Mode Selected</p>
        <div className="bg-black border border-gray-700 rounded-lg px-10 py-3 mb-2 min-w-40 text-center">
          <span className={`font-mono text-3xl font-bold ${selectedMode ? 'text-green-400' : 'text-gray-700'}`}>
            {selectedMode ? selectedMode.symbol : '- - -'}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          {selectedMode ? selectedMode.label : 'Select a mode below'}
        </p>
      </div>

      {/* Mode grid — looks like a dial face */}
      <div>
        <p className="text-xs text-gray-500 mb-2 text-center">Tap the correct measurement mode:</p>
        <div className="grid grid-cols-3 gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => !disabled && onSelect(mode.id)}
              disabled={disabled}
              className={`p-3 rounded-lg border text-center transition-all ${
                selected === mode.id
                  ? 'border-indigo-500 bg-indigo-900/60 ring-1 ring-indigo-500'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
              } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="text-white font-bold text-xl leading-tight">{mode.symbol}</div>
              <div className="text-gray-400 text-xs mt-1 leading-tight">{mode.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadPlacementUI({
  redOptions,
  blackOptions,
  selectedRed,
  selectedBlack,
  onSelectRed,
  onSelectBlack,
  disabled,
}: {
  redOptions: PracticalChoice[];
  blackOptions: PracticalChoice[];
  selectedRed: string | null;
  selectedBlack: string | null;
  onSelectRed: (id: string) => void;
  onSelectBlack: (id: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-5">
      {/* Meter jack visual */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
        <p className="text-center text-xs text-gray-500 tracking-widest mb-4 uppercase">
          Meter Input Jacks
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {redOptions.map((opt) => {
            const isRed = selectedRed === opt.id;
            const isBlack = selectedBlack === opt.id;
            return (
              <div
                key={opt.id}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border transition-colors ${
                  isRed
                    ? 'border-red-500 bg-red-900/30'
                    : isBlack
                    ? 'border-gray-500 bg-gray-700/60'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 ${
                    isRed
                      ? 'bg-red-500 border-red-300'
                      : isBlack
                      ? 'bg-gray-800 border-gray-400'
                      : 'bg-gray-700 border-gray-600'
                  }`}
                />
                <span className="text-white text-xs font-bold">{opt.label}</span>
                {opt.sublabel && (
                  <span className="text-gray-500 text-xs text-center max-w-20 leading-tight">
                    {opt.sublabel}
                  </span>
                )}
                {isRed && <span className="text-red-400 text-xs font-bold">● RED</span>}
                {isBlack && !isRed && <span className="text-gray-300 text-xs font-bold">● BLK</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* RED lead */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-2.5 rounded-full bg-red-500" />
          <span className="text-red-400 font-semibold text-sm">RED LEAD — Which jack?</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {redOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !disabled && onSelectRed(opt.id)}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                selectedRed === opt.id
                  ? 'border-red-500 bg-red-900/40 text-red-300 ring-1 ring-red-500'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600'
              } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* BLACK lead */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-2.5 rounded-full bg-gray-400 border border-gray-500" />
          <span className="text-gray-300 font-semibold text-sm">BLACK LEAD — Which jack?</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {blackOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !disabled && onSelectBlack(opt.id)}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                selectedBlack === opt.id
                  ? 'border-gray-400 bg-gray-600 text-white ring-1 ring-gray-400'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600'
              } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScenarioUI({
  options,
  selected,
  onSelect,
  disabled,
}: {
  options: PracticalChoice[];
  selected: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => !disabled && onSelect(opt.id)}
          disabled={disabled}
          className={`w-full p-4 rounded-lg border text-left transition-all ${
            selected === opt.id
              ? 'border-indigo-500 bg-indigo-900/30 ring-1 ring-indigo-500'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
          } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <p className="text-gray-200 text-sm leading-relaxed">{opt.label}</p>
          {opt.sublabel && <p className="text-gray-500 text-xs mt-1">{opt.sublabel}</p>}
        </button>
      ))}
    </div>
  );
}
