import React from 'react';
import AntiCheatText from './AntiCheatText';

const QuestionCard = ({ question, index, onSelectOption, onCodeChange, saving }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-slate-500">
          Question {index + 1} • {question.marks} mark{question.marks === 1 ? '' : 's'}
        </span>
        {saving && <span className="text-[10px] sm:text-xs text-slate-400">Saving...</span>}
      </div>

      <AntiCheatText as="p" className="mb-4 whitespace-pre-wrap text-sm sm:text-base text-slate-800 leading-relaxed">
        {question.text}
      </AntiCheatText>

      {question.type === 'MCQ' ? (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition ${
                question.selectedOptionId === opt.id
                  ? 'border-brand bg-orange-50/70'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={question.selectedOptionId === opt.id}
                onChange={() => onSelectOption(opt.id)}
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-orange-600 shrink-0"
              />
              <AntiCheatText as="span" className="leading-snug">{opt.text}</AntiCheatText>
            </label>
          ))}
        </div>
      ) : (
        <textarea
          rows={8}
          value={question.codeAnswer || ''}
          onChange={(e) => onCodeChange(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          placeholder="Write your code here..."
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 sm:p-3 font-mono text-xs sm:text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100"
        />
      )}
    </div>
  );
};

export default QuestionCard;
