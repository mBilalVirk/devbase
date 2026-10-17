import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Search, Clock, ArrowRight, BookOpen, Heart, Bookmark } from 'lucide-react';

export const ArticlesView: React.FC = () => {
  const { articles, navigateTo, toggleBookmarkArticle, user } = useDevBase();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = [
    'All',
    'Web Development',
    'Frontend',
    'Backend & Cloud',
    'Databases',
    'Security'
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === 'All' || art.category === selectedCat;
    return matchesSearch && matchesCat && art.status === 'published';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Engineering Dispatch
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Technical Articles & Architectural Deep Dives
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Peer-reviewed essays covering distributed web systems, typography mechanics, database reliability, and asynchronous patterns.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, keyword, or tag..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors font-medium ${
                selectedCat === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
            No articles found matching your query.
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isBookmarked = user.bookmarkedArticleIds.includes(art.id);
            return (
              <article
                key={art.id}
                onClick={() => navigateTo('article-detail', { articleId: art.id })}
                className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 w-full overflow-hidden bg-slate-950 relative">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkArticle(art.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 transition-colors ${
                        isBookmarked ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-indigo-400 font-semibold">{art.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{art.readTimeMinutes} min</span>
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {art.title}
                    </h2>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-slate-300">{art.author.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium group-hover:text-indigo-400">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

    </div>
  );
};
