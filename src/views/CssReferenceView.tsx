import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Search, Copy, Check, Sliders, Layout, Layers, Sparkles } from 'lucide-react';
import { CssFlexboxGridVisualizer } from '../components/CssFlexboxGridVisualizer';
import { CssPropertyItem } from '../types';

export const CssReferenceView: React.FC = () => {
  const { cssProperties, selectedCssProp, setSelectedCssProp } = useDevBase();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);

  const categories = ['All', 'Layout', 'Grid & Flex', 'Box Model', 'Colors & Effects', 'Modern CSS'];

  const filteredProps = cssProperties.filter((prop) => {
    const matchesSearch =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.syntax.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || prop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProp: CssPropertyItem =
    cssProperties.find((p) => p.name === selectedCssProp) ||
    filteredProps[0] ||
    cssProperties[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Style & Layout Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Modern CSS Architecture & Property Reference
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Master Flexbox, CSS Grid, container queries, and fluid typography with interactive visual controls and syntax references.
        </p>
      </div>

      {/* Interactive Visualizer Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Interactive Layout Visualizer</span>
          </h2>
          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {showVisualizer ? 'Hide Visualizer' : 'Show Visualizer'}
          </button>
        </div>
        {showVisualizer && <CssFlexboxGridVisualizer />}
      </div>

      {/* Property Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CSS properties, functions, or values..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors font-medium ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Property Index + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Property Index (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredProps.map((prop) => {
            const isSelected = selectedProp?.name === prop.name;
            return (
              <button
                key={prop.name}
                onClick={() => setSelectedCssProp(prop.name)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-indigo-400">
                    {prop.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {prop.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {prop.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Property Details (8 cols) */}
        {selectedProp && (
          <div className="lg:col-span-8 space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  {selectedProp.category}
                </span>
                <h2 className="text-2xl font-bold font-mono text-white mt-1">
                  {selectedProp.name}
                </h2>
              </div>

              <button
                onClick={() => handleCopy(selectedProp.codeExample)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors self-start"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Specification Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProp.description}
              </p>
            </div>

            {/* Syntax */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Syntax & Accepted Values
              </h3>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto">
                {selectedProp.syntax}
              </pre>
            </div>

            {/* Value Tokens Grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Common Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProp.acceptedValues.map((val) => (
                  <span
                    key={val}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Badges (Unboxed) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-6 text-xs text-slate-400">
              <div>
                <span className="text-slate-500 block">Initial Value:</span>
                <span className="font-mono text-slate-200 font-medium">{selectedProp.initialValue}</span>
              </div>
              <span aria-hidden="true">&middot;</span>
              <div>
                <span className="text-slate-500 block">Inherited:</span>
                <span className="font-mono text-slate-200 font-medium">{selectedProp.inherited ? 'Yes' : 'No'}</span>
              </div>
              <span aria-hidden="true">&middot;</span>
              <div>
                <span className="text-slate-500 block">Browser Support:</span>
                <span className="text-slate-200">{selectedProp.browserSupport}</span>
              </div>
            </div>

            {/* Pitfalls & Best Practices */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span>Avoid This Mistake</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedProp.commonMistakes}
              </p>
            </div>

            {/* Practical Example */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Practical CSS Example
              </h3>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                {selectedProp.codeExample}
              </pre>
            </div>

            {/* Related Properties */}
            {selectedProp.relatedProperties && (
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Related Properties:</span>
                {selectedProp.relatedProperties.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedCssProp(p)}
                    className="font-mono text-indigo-400 hover:text-indigo-300 underline"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
