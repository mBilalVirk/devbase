import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Search, X, Code, FileText, Layers, Hash, ArrowRight, CornerDownLeft } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    htmlElements,
    cssProperties,
    languages,
    snippets,
    articles,
    learningPaths,
    navigateTo
  } = useDevBase();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: {
      id: string;
      title: string;
      subtitle: string;
      category: 'html' | 'css' | 'language' | 'snippet' | 'article' | 'path';
      action: () => void;
    }[] = [];

    // Search HTML
    if (filterType === 'all' || filterType === 'html') {
      htmlElements.forEach((el) => {
        if (
          el.tag.toLowerCase().includes(q) ||
          el.name.toLowerCase().includes(q) ||
          el.summary.toLowerCase().includes(q)
        ) {
          results.push({
            id: `html_${el.tag}`,
            title: `${el.tag} — ${el.name}`,
            subtitle: el.summary,
            category: 'html',
            action: () => {
              navigateTo('html', { htmlTag: el.tag });
              setSearchOpen(false);
            }
          });
        }
      });
    }

    // Search CSS
    if (filterType === 'all' || filterType === 'css') {
      cssProperties.forEach((prop) => {
        if (
          prop.name.toLowerCase().includes(q) ||
          prop.description.toLowerCase().includes(q) ||
          prop.syntax.toLowerCase().includes(q)
        ) {
          results.push({
            id: `css_${prop.name}`,
            title: prop.name,
            subtitle: prop.description,
            category: 'css',
            action: () => {
              navigateTo('css', { cssProp: prop.name });
              setSearchOpen(false);
            }
          });
        }
      });
    }

    // Search Languages
    if (filterType === 'all' || filterType === 'language') {
      languages.forEach((lang) => {
        if (
          lang.name.toLowerCase().includes(q) ||
          lang.summary.toLowerCase().includes(q) ||
          lang.ecosystem.toLowerCase().includes(q)
        ) {
          results.push({
            id: `lang_${lang.id}`,
            title: lang.name,
            subtitle: lang.summary,
            category: 'language',
            action: () => {
              navigateTo('languages');
              setSearchOpen(false);
            }
          });
        }
      });
    }

    // Search Snippets
    if (filterType === 'all' || filterType === 'snippet') {
      snippets.forEach((snip) => {
        if (
          snip.title.toLowerCase().includes(q) ||
          snip.description.toLowerCase().includes(q) ||
          snip.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          results.push({
            id: `snip_${snip.id}`,
            title: snip.title,
            subtitle: snip.description,
            category: 'snippet',
            action: () => {
              navigateTo('snippets');
              setSearchOpen(false);
            }
          });
        }
      });
    }

    // Search Articles
    if (filterType === 'all' || filterType === 'article') {
      articles.forEach((art) => {
        if (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          results.push({
            id: `art_${art.id}`,
            title: art.title,
            subtitle: art.excerpt,
            category: 'article',
            action: () => {
              navigateTo('article-detail', { articleId: art.id });
              setSearchOpen(false);
            }
          });
        }
      });
    }

    // Search Learning Paths
    if (filterType === 'all' || filterType === 'path') {
      learningPaths.forEach((path) => {
        if (
          path.title.toLowerCase().includes(q) ||
          path.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: `path_${path.id}`,
            title: path.title,
            subtitle: path.description,
            category: 'path',
            action: () => {
              navigateTo('paths', { pathId: path.id });
              setSearchOpen(false);
            }
          });
        }
      });
    }

    return results;
  }, [query, filterType, htmlElements, cssProperties, languages, snippets, articles, learningPaths, navigateTo, setSearchOpen]);

  if (!searchOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      searchResults[selectedIndex].action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Top search input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search HTML tags, CSS properties, snippets, articles, paths..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white border border-slate-800 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Filter bar (functional button tabs, not static pills) */}
        <div className="px-4 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs bg-slate-950/40">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'html', label: 'HTML' },
            { id: 'css', label: 'CSS' },
            { id: 'snippet', label: 'Snippets' },
            { id: 'article', label: 'Articles' },
            { id: 'path', label: 'Learning Paths' },
            { id: 'language', label: 'Languages' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filterType === tab.id
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-2 flex-1">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 space-y-3">
              <p className="text-sm">Type any keyword or tag name to search the entire DevBase knowledge graph.</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-400">
                <span>Try searching:</span>
                <button onClick={() => setQuery('<dialog>')} className="underline hover:text-indigo-400">&lt;dialog&gt;</button>
                <span aria-hidden="true">&middot;</span>
                <button onClick={() => setQuery('debounce')} className="underline hover:text-indigo-400">debounce</button>
                <span aria-hidden="true">&middot;</span>
                <button onClick={() => setQuery('flexbox')} className="underline hover:text-indigo-400">flexbox</button>
                <span aria-hidden="true">&middot;</span>
                <button onClick={() => setQuery('postgresql')} className="underline hover:text-indigo-400">postgresql</button>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-10 text-center text-slate-400 space-y-1">
              <p className="font-medium text-slate-300">No matching resources found</p>
              <p className="text-xs text-slate-500">We couldn't find anything matching "{query}". Try checking your spelling or selecting "All Results".</p>
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((res, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={res.id}
                    onClick={res.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/15 border border-indigo-500/30'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                          {res.category}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-100 truncate">
                          {res.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {res.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 pt-1 text-slate-500">
                      {isSelected ? (
                        <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-medium">
                          <span>Open</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </div>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono">&uarr;</kbd> <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono">&darr;</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono">&crarr;</kbd> to select</span>
          </div>
          <span>DevBase Unified Search</span>
        </div>
      </div>
    </div>
  );
};
