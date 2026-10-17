import React from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Shield, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useDevBase();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Platform Mission
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About DevBase
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          DevBase is an open technical knowledge base and education system built for beginner and intermediate software engineers seeking reliable, verified, and standards-compliant documentation.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-base font-bold text-white">Trustworthy Standards</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every HTML tag specification, CSS property, and language pitfall is derived directly from W3C, WHATWG, and official technical RFC specifications.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-base font-bold text-white">Zero-Slop Design</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We adhere to disciplined design principles: no candy pill badge noise, no fake telemetry tickers, and strict 60-30-10 color balance.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-base font-bold text-white">Interactive Pedagogy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Learning through experimentation is proven to build deep mental models. Our playgrounds provide immediate feedback without configuration overhead.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="text-base font-bold text-white">Accessible by Default</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tested against WCAG 2.2 AA standards, ensuring keyboard operability, screen reader landmark navigation, and robust color contrast.
          </p>
        </div>
      </div>

      {/* Community Section */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Built for the Global Developer Community</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Whether you are a computer science student writing your first semantic HTML form or a junior engineer debugging a PostgreSQL query plan, DevBase is designed to be your constant desk companion.
        </p>

        <div className="pt-2 flex gap-4">
          <button
            onClick={() => navigateTo('paths')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
          >
            Start Learning
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
          >
            Contact Team
          </button>
        </div>
      </div>

    </div>
  );
};
