import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Terminal, Copy, Check, ExternalLink, Code2, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { LanguageGuide } from '../types';

export const LanguagesView: React.FC = () => {
  const { languages } = useDevBase();
  const [selectedLangId, setSelectedLangId] = useState<string>(languages[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const selectedLang = languages.find((l) => l.id === selectedLangId) || languages[0];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Polyglot Foundation
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Programming Languages & Engineering Runtimes
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          In-depth syntax references, memory models, asynchronous control patterns, and common pitfalls across essential web and backend technologies.
        </p>
      </div>

      {/* Language Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-900 border border-slate-800 rounded-xl">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLangId(lang.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedLangId === lang.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Language Details Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">
                {selectedLang.name}
              </h2>
              <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                {selectedLang.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Paradigm: {selectedLang.paradigm}
            </p>
          </div>

          <a
            href={selectedLang.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-start"
          >
            <span>Official Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Overview & Setup Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Overview & Ecosystem
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedLang.summary}
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Ecosystem: {selectedLang.ecosystem}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Environment Setup & Tooling
            </h3>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto">
              {selectedLang.setupGuide}
            </pre>
          </div>
        </div>

        {/* Core Topics & Syntax Highlights */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">
            Core Syntax & Architectural Topics
          </h3>

          <div className="space-y-6">
            {selectedLang.topics.map((topic, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100">
                    {topic.title}
                  </h4>
                  <button
                    onClick={() => handleCopyCode(topic.code, idx)}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded hover:border-slate-700"
                  >
                    {copiedCodeIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCodeIndex === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {topic.explanation}
                </p>

                <pre className="p-4 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  {topic.code}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Pitfalls and Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pitfalls */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Pitfalls & Mistakes</span>
            </h3>

            <div className="space-y-3 text-xs">
              {selectedLang.pitfalls.map((p, i) => (
                <div key={i} className="pb-3 border-b border-slate-900 last:border-b-0 space-y-1">
                  <div className="font-semibold text-slate-200 font-mono text-[11px]">
                    &times; {p.error}
                  </div>
                  <div className="text-slate-400 text-xs">
                    &rarr; {p.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Best Practices</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {selectedLang.bestPractices.map((bp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&check;</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
