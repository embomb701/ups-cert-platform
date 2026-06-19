'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { ExamLevel } from '@/types';

const RULES_JR = [
  'This exam is timed. Each question has a 90-second timer.',
  'You cannot go back to a previous question.',
  'When the question timer expires, the next question advances automatically.',
  'Do not use unauthorized outside help, notes, AI tools, or other resources during the exam.',
  'Do not copy, record, photograph, or distribute exam questions in any form.',
  'Do not create multiple accounts to bypass retake rules.',
  'Suspicious activity will be logged and may be reviewed by an administrator.',
  'The Jr. FSE Exam can only be attempted once every 90 days.',
  'Failed, abandoned, expired, or incomplete attempts still trigger the 90-day cooldown.',
  'Certificates may be revoked if fraud, cheating, or misuse is discovered after the fact.',
  'You will be prompted to enter fullscreen mode. Exiting fullscreen will be logged.',
  'Copy, paste, cut, and right-click are disabled during the exam.',
  'Tab switching and browser blur events are logged.',
];

const RULES_FSE = [
  'This exam is timed. Each question has a 90-second timer (may be adjusted by your proctor).',
  'You cannot go back to a previous question.',
  'This exam is conducted under live supervision by an approved organization proctor.',
  'Your identity must be confirmed by your proctor before the exam begins.',
  'Your proctor must unlock the exam session before it will start.',
  'Do not use unauthorized outside help during the exam.',
  'Do not copy, record, photograph, or distribute exam questions.',
  'Your proctor may monitor your behavior, pause the session, or flag the attempt.',
  'Proctor notes will be recorded with your attempt.',
  'Suspicious activity will be logged and reviewed.',
  'Certificates may be revoked if fraud or misuse is discovered.',
  'Tab switching and other anti-cheat controls are active even under proctoring.',
];

export default function ExamRulesPage() {
  const params = useParams();
  const router = useRouter();
  const examType = (params?.examType as ExamLevel) ?? 'jr_fse';
  const [accepted, setAccepted] = useState(false);

  const isJr = examType === 'jr_fse';
  const rules = isJr ? RULES_JR : RULES_FSE;
  const examLabel = isJr ? 'Junior UPS Field Service Certification' : 'UPS Field Service Certification';

  const handleStart = () => {
    if (!accepted) return;
    router.push(`/exam/${examType}`);
  };

  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto">
        <p className="kicker mb-2">Before You Begin</p>
        <h1 className="text-3xl font-bold text-white mb-2">Exam Rules</h1>
        <p className="text-gray-400 text-sm mb-8">{examLabel}</p>

        <div className="card-dark p-8 mb-6">
          <h2 className="text-base font-semibold text-white mb-4">
            Read and understand the following rules before continuing.
          </h2>
          <ol className="space-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-400">
                <span className="text-gray-600 shrink-0 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card-dark hazard-stripe p-6 mb-6">
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-voltage-200">Reminder:</strong> This certification is an educational
            knowledge credential. It does not authorize energized electrical work, replace employer
            training, replace OEM qualification, replace electrical licensing, replace NFPA 70E or OSHA
            requirements, or replace site-specific procedures.
          </p>
        </div>

        <div className="flex items-start gap-3 mb-8">
          <input
            type="checkbox"
            id="accept-rules"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 accent-voltage-500 cursor-pointer"
          />
          <label htmlFor="accept-rules" className="text-sm text-gray-300 cursor-pointer">
            I have read and understand all of the rules above. I agree to take this exam under
            these conditions.
          </label>
        </div>

        <button
          onClick={handleStart}
          disabled={!accepted}
          className="btn-voltage btn-lg disabled:opacity-40"
        >
          Begin Exam &rarr;
        </button>
      </div>
    </section>
  );
}
