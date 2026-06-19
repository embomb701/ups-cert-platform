'use client';

import type { QuestionForExam, AnswerChoice } from '@/types';

interface ExamQuestionProps {
  question: QuestionForExam;
  questionNumber: number;
  totalQuestions: number;
  choiceOrder: string[]; // randomized choice ids
  selectedChoiceId: string | null;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
}

export function ExamQuestion({
  question,
  questionNumber,
  totalQuestions,
  choiceOrder,
  selectedChoiceId,
  onSelect,
  disabled,
}: ExamQuestionProps) {
  const choiceMap: Record<string, AnswerChoice> = {};
  for (const c of question.choices) choiceMap[c.id] = c;

  return (
    <div className="w-full">
      {/* Progress */}
      <p className="text-xs text-gray-500 mb-4">
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-wide text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          {question.category}
        </span>
        {question.safetyCritical && (
          <span className="text-xs font-semibold text-voltage-300 bg-voltage-500/10 border border-voltage-500/30 px-2 py-0.5 rounded">
            Safety-Related
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="text-base sm:text-lg text-white leading-relaxed mb-8">
        {question.questionText}
      </p>

      {/* Choices */}
      <div className="space-y-3">
        {choiceOrder.map((choiceId) => {
          const choice = choiceMap[choiceId];
          if (!choice) return null;

          const isSelected = selectedChoiceId === choiceId;

          return (
            <button
              key={choiceId}
              onClick={() => !disabled && onSelect(choiceId)}
              disabled={disabled}
              className={`group w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 ${
                isSelected
                  ? 'bg-voltage-500/10 border-voltage-500/60 text-white shadow-voltage'
                  : 'bg-white/[0.02] border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white'
              } ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <span className={`font-mono font-bold text-sm mr-3 ${isSelected ? 'text-voltage-400' : 'text-gray-500'}`}>{choice.id}.</span>
              <span className="text-sm">{choice.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
