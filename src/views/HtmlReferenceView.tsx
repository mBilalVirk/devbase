import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Search, Copy, Check, ExternalLink, AlertCircle, Sparkles, Code2, ArrowLeft } from 'lucide-react';
import { HtmlElementItem } from '../types';

export const HtmlReferenceView: React.FC = () => {
  const { htmlElements, selectedHtmlTag, setSelectedHtmlTag } = useDevBase();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Semantic', 'Forms', 'Interactive', 'Media', 'Text', 'Tables'];

  const filteredElements = htmlElements.filter((el) => {
    const matchesSearch =
      el.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || el.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedElement: HtmlElementItem =
    htmlElements.find((el) => el.tag === selectedHtmlTag) ||
    filteredElements[0] ||
    htmlElements[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Documentation Reference
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          HTML5 Living Specification Reference
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Comprehensive, standards-compliant guide to modern HTML elements, semantic landmark models, accessibility requirements, and browser support.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter tags by name, syntax, or purpose..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Functional Category Button Filter */}
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

      {/* Main 2-Column Split: Tag Catalog Sidebar + Deep Reference Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Tag List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-1">
          {filteredElements.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
              No HTML elements match your query.
            </div>
          ) : (
            filteredElements.map((el) => {
              const isSelected = selectedElement?.tag === el.tag;
              return (
                <button
                  key={el.tag}
                  onClick={() => setSelectedHtmlTag(el.tag)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-indigo-400">
                      {el.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {el.category}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {el.name}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {el.summary}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Right Side: Deep Reference Detail View (8 cols) */}
        {selectedElement && (
          <div className="lg:col-span-8 space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* Top Bar for Selected Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-indigo-400">
                    {selectedElement.tag}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedElement.closingTag}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  {selectedElement.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(selectedElement.codeExample)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Example'}</span>
                </button>
              </div>
            </div>

            {/* Purpose & Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Purpose & Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedElement.summary}
              </p>
            </div>

            {/* Syntax definition */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Syntax & Structure
              </h3>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto">
                {selectedElement.syntax}
              </pre>
            </div>

            {/* Attributes Table */}
            {selectedElement.attributes && selectedElement.attributes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Element Attributes
                </h3>
                <div className="overflow-x-auto border border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Attribute</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {selectedElement.attributes.map((attr) => (
                        <tr key={attr.name} className="hover:bg-slate-800/40">
                          <td className="p-3 font-mono font-semibold text-indigo-400">
                            {attr.name} {attr.required && <span className="text-rose-400">*</span>}
                          </td>
                          <td className="p-3 font-mono text-slate-400">{attr.type}</td>
                          <td className="p-3 text-slate-300">{attr.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Accessibility and Best Practices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span>Accessibility & WCAG Guidance</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedElement.accessibilityTips}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <span>Common Pitfalls to Avoid</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedElement.commonMistakes}
                </p>
              </div>
            </div>

            {/* Code Example */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Working Implementation Example
              </h3>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                {selectedElement.codeExample}
              </pre>
            </div>

            {/* Rendered Preview if available */}
            {selectedElement.previewHtml && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Rendered Browser Output
                </h3>
                <div
                  className="rounded-xl border border-slate-800 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: selectedElement.previewHtml }}
                />
              </div>
            )}

            {/* Related Tags */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Related Tags:</span>
                {selectedElement.relatedTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedHtmlTag(t)}
                    className="font-mono text-indigo-400 hover:text-indigo-300 underline"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                {selectedElement.browserSupport}
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
