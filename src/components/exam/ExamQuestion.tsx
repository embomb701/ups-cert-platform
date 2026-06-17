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
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
          {question.category}
        </span>
        {question.safetyCritical && (
          <span className="text-xs text-amber-400 bg-amber-950/50 border border-amber-900/50 px-2 py-0.5 rounded">
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
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-900/60 border-indigo-500 text-white'
                  : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
              } ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <span className="font-semibold text-sm mr-3 text-gray-500">{choice.id}.</span>
              <span className="text-sm">{choice.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
