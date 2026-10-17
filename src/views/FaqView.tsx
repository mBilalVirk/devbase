import React, { useState } from 'react';
import { FAQS } from '../data/seedData';
import { Search, ChevronDown } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Help & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Common queries regarding technical standards, content accuracy, user collections, and role-based permissions on DevBase.
        </p>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Accordion FAQ using native modern HTML5 <details> */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
            No questions match your query.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 transition-colors open:bg-slate-900/90"
            >
              <summary className="font-semibold text-sm text-white cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                {faq.answer}
              </div>
            </details>
          ))
        )}
      </div>

    </div>
  );
};
