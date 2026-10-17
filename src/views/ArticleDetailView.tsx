import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { 
  ArrowLeft, 
  Clock, 
  Heart, 
  Bookmark, 
  Share2, 
  Check, 
  MessageSquare, 
  Send,
  CheckCircle2,
  List
} from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const { 
    selectedArticleId, 
    articles, 
    navigateTo, 
    likeArticle, 
    toggleBookmarkArticle, 
    user, 
    comments, 
    addComment 
  } = useDevBase();

  const article = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const [copiedShare, setCopiedShare] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState(user.name);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const isBookmarked = user.bookmarkedArticleIds.includes(article.id);

  const articleComments = comments.filter(
    (c) => c.articleId === article.id && (c.status === 'approved' || user.role === 'admin')
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(article.id, commentText.trim(), commentName);
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('articles')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* Main Grid: Article Content + Sticky Sidebar (Table of Contents & Share) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Article Body (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-indigo-400 font-semibold">{article.category}</span>
              <span aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>{article.publishedAt}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {article.subtitle}
            </p>

            {/* Author bar */}
            <div className="flex items-center justify-between pt-4 pb-4 border-y border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{article.author.name}</div>
                  <div className="text-xs text-slate-400">{article.author.role}</div>
                </div>
              </div>

              {/* Action buttons (Like, Bookmark, Share) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => likeArticle(article.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-rose-400 transition-colors"
                  title="Like article"
                >
                  <Heart className="w-4 h-4" />
                  <span className="font-mono">{article.likes}</span>
                </button>

                <button
                  onClick={() => toggleBookmarkArticle(article.id)}
                  className={`p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors ${
                    isBookmarked ? 'text-amber-400' : 'text-slate-300 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                >
                  <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Share link"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Article Text Content */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-sm italic text-slate-400">
              "{article.excerpt}"
            </div>

            <div className="whitespace-pre-line space-y-4">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Topics:</span>
            {article.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md font-mono text-[11px]">
                #{t}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <section className="pt-10 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <span>Discussion ({articleComments.length})</span>
              </h3>
            </div>

            {/* Submit Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Join the Discussion
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs mb-1">Comment</label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share constructive feedback or technical insights..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-slate-500">
                  {user.role === 'admin' ? 'Posting as Admin (Auto-approved)' : 'Subject to moderation guidelines.'}
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <span>Post Comment</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {commentSuccess && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your comment has been submitted and registered!</span>
                </div>
              )}
            </form>

            {/* Approved Comments List */}
            <div className="space-y-4">
              {articleComments.map((com) => (
                <div key={com.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 font-semibold text-xs flex items-center justify-center font-mono">
                        {com.authorName.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-200">{com.authorName}</span>
                      {com.status === 'pending' && (
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-mono">
                          Pending Moderation
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">{com.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {com.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sticky Table of Contents & Author Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Table of Contents */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <List className="w-4 h-4 text-indigo-400" />
              <span>Table of Contents</span>
            </h3>

            <div className="space-y-2 text-xs">
              {article.tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-slate-400 hover:text-white transition-colors truncate"
                  style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              About the Author
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-indigo-400">{article.author.role}</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialist in web performance engineering, system boundaries, and modern frontend architecture.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
