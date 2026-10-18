import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';

interface ReferenceKnowledgeCheckProps {
  subject: 'HTML' | 'CSS';
}

const questions = {
  HTML: {
    prompt: 'Which attribute provides a text alternative for an informative image?',
    options: ['title', 'alt', 'caption'],
    answer: 'alt',
    explanation: 'The alt attribute provides the image text alternative; use an empty alt for a purely decorative image.',
  },
  CSS: {
    prompt: 'Which selector matches an element with class="card"?',
    options: ['#card', '.card', 'card'],
    answer: '.card',
    explanation: 'A leading dot selects a class; # selects an id, while a bare name selects an element type.',
  },
};

export const ReferenceKnowledgeCheck: React.FC<ReferenceKnowledgeCheckProps> = ({ subject }) => {
  const { recordReferenceQuizScore } = useDevBase();
  const question = questions[subject];
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer === question.answer;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6" aria-labelledby={`${subject.toLowerCase()}-knowledge-check`}>
      <h2 id={`${subject.toLowerCase()}-knowledge-check`} className="text-base font-bold text-white">Quick knowledge check</h2>
      <fieldset className="mt-4 space-y-3">
        <legend className="text-sm text-slate-300">{question.prompt}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {question.options.map((option) => (
            <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${answer === option ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
              <input
                type="radio"
                name={`${subject}-reference-question`}
                value={option}
                checked={answer === option}
                onChange={() => { setAnswer(option); setSubmitted(false); }}
                className="accent-indigo-500"
              />
              <code>{option}</code>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!answer}
          onClick={() => {
            setSubmitted(true);
            recordReferenceQuizScore(`${subject.toLowerCase()}-reference-check`, isCorrect ? 1 : 0, 1);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check answer
        </button>
        {submitted && (
          <p role="status" className={`text-sm ${isCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
            {isCorrect ? 'Correct. ' : 'Not quite. '}{question.explanation}
          </p>
        )}
      </div>
    </section>
  );
};
