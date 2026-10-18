import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { 
  User, 
  Bookmark, 
  FolderPlus, 
  CheckCircle, 
  Code, 
  BookOpen, 
  Shield, 
  Settings, 
  Plus, 
  Trash2, 
  ArrowRight 
} from 'lucide-react';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

export const UserDashboardView: React.FC = () => {
  const { 
    user, 
    setUser, 
    switchRole, 
    snippets, 
    articles, 
    learningPaths, 
    navigateTo, 
    toggleBookmarkArticle, 
    toggleBookmarkSnippet,
    toggleBookmarkReference,
    createCollection,
    htmlElements,
    cssProperties,
    learningProgressError,
  } = useDevBase();
  const routerNavigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'collections' | 'settings'>('overview');
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // Settings form state
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [savedSettingsFeedback, setSavedSettingsFeedback] = useState(false);

  const bookmarkedArticles = articles.filter((a) => user.bookmarkedArticleIds.includes(a.id));
  const bookmarkedSnippets = snippets.filter((s) => user.bookmarkedSnippetIds.includes(s.id));
  const referenceEntries = [
    ...htmlElements.filter((entry) => entry.status !== 'draft').map((entry) => ({
      id: `reference-html:${entry.slug ?? entry.tag}`,
      title: entry.name,
      category: `HTML · ${entry.category}`,
      description: entry.summary,
      href: `/html/${entry.slug ?? entry.tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    })),
    ...cssProperties.filter((entry) => entry.status !== 'draft').map((entry) => ({
      id: `reference-css:${entry.slug ?? entry.name}`,
      title: entry.name,
      category: `CSS · ${entry.category}`,
      description: entry.description,
      href: `/css/${entry.slug ?? entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    })),
  ];
  const bookmarkedReferences = referenceEntries.filter((entry) => user.bookmarkedReferenceIds.includes(entry.id));

  const curriculumLessonIds = [
    ...learningPaths.flatMap((path) => path.lessons.map((lesson) => lesson.id)),
    ...referenceEntries.map((entry) => entry.id),
  ];
  const totalLessonsCount = curriculumLessonIds.length;
  const completedLessonsCount = curriculumLessonIds.filter((id) => user.completedLessonIds.includes(id)).length;
  const overallProgressPct = Math.round((completedLessonsCount / Math.max(totalLessonsCount, 1)) * 100);
  const latestQuizScore = user.referenceQuizScores[user.referenceQuizScores.length - 1];

  const roles: UserRole[] = ['guest', 'developer', 'contributor', 'author', 'admin'];

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColTitle.trim()) return;
    createCollection(newColTitle.trim(), newColDesc.trim());
    setNewColTitle('');
    setNewColDesc('');
    setCollectionModalOpen(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: editName,
      bio: editBio
    }));
    setSavedSettingsFeedback(true);
    setTimeout(() => setSavedSettingsFeedback(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {learningProgressError && <p role="alert" className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">{learningProgressError}</p>}
      
      {/* User Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/40"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{user.name}</h1>
              <span className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">{user.bio}</p>
            <div className="text-[11px] text-slate-500 pt-1">
              Member since {user.joinedDate} &middot; {user.email}
            </div>
          </div>
        </div>

        {/* Quick Role Switcher */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Active Permissions Gate</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-colors font-medium ${
                  user.role === r
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-medium">
        {[
          { id: 'overview', label: 'Overview & Learning Progress' },
          { id: 'bookmarks', label: `Saved Bookmarks (${bookmarkedArticles.length + bookmarkedSnippets.length + bookmarkedReferences.length})` },
          { id: 'collections', label: `Collections (${user.collections.length})` },
          { id: 'settings', label: 'Account Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key KPI Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Curriculum Completed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">{overallProgressPct}%</span>
                <span className="text-xs text-indigo-400">({completedLessonsCount}/{totalLessonsCount} lessons)</span>
              </div>
              <div
                className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mt-3"
                role="progressbar"
                aria-label="Overall learning progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={overallProgressPct}
              >
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${overallProgressPct}%` }} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Saved Bookmarks</span>
              <div className="text-3xl font-extrabold text-white font-mono">
                {bookmarkedArticles.length + bookmarkedSnippets.length + bookmarkedReferences.length}
              </div>
              <p className="text-[11px] text-slate-500">
                {bookmarkedArticles.length} articles &middot; {bookmarkedSnippets.length} snippets &middot; {bookmarkedReferences.length} references
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Latest Reference Quiz</span>
              <div className="text-3xl font-extrabold text-white font-mono">
                {latestQuizScore ? `${latestQuizScore.score}/${latestQuizScore.total}` : '—'}
              </div>
              <p className="text-[11px] text-slate-500">{latestQuizScore ? latestQuizScore.id.toUpperCase() : 'Complete an HTML or CSS check'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Personal Collections</span>
              <div className="text-3xl font-extrabold text-white font-mono">
                {user.collections.length}
              </div>
              <p className="text-[11px] text-slate-500">
                Organized reference sets
              </p>
            </div>
          </div>

          {/* Continue Learning Paths */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Continue Active Learning Paths</h3>
              <button
                onClick={() => navigateTo('paths')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Browse All Tracks &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPaths.map((path) => {
                const done = path.lessons.filter((l) => user.completedLessonIds.includes(l.id)).length;
                const pct = Math.round((done / path.lessons.length) * 100);

                return (
                  <div
                    key={path.id}
                    onClick={() => navigateTo('paths', { pathId: path.id })}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-slate-200">{path.title}</h4>
                      <span className="font-mono text-indigo-400">{pct}%</span>
                    </div>

                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>{done} of {path.lessons.length} lessons finished</span>
                      <span className="text-indigo-400 font-medium">Resume &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Saved Technical Articles</h3>
            {bookmarkedArticles.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 bg-slate-900 rounded-xl border border-slate-800">No articles bookmarked yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => navigateTo('article-detail', { articleId: art.id })}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] text-indigo-400 font-semibold">{art.category}</span>
                      <h4 className="text-sm font-bold text-white mt-1">{art.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">{art.excerpt}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkArticle(art.id);
                      }}
                      className="p-1.5 text-amber-400 hover:text-slate-500"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4" fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white">Saved Code Snippets</h3>
            {bookmarkedSnippets.length === 0 ? (
              <p className="text-xs text-slate-500 p-4 bg-slate-900 rounded-xl border border-slate-800">No snippets bookmarked yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedSnippets.map((snip) => (
                  <div
                    key={snip.id}
                    onClick={() => navigateTo('snippets')}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase text-indigo-400 font-semibold">{snip.language}</span>
                      <h4 className="text-sm font-bold text-white mt-1">{snip.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">{snip.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkSnippet(snip.id);
                      }}
                      className="p-1.5 text-amber-400 hover:text-slate-500"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4" fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 border-t border-slate-800 pt-4">
            <h3 className="text-base font-bold text-white">Saved HTML &amp; CSS References</h3>
            {bookmarkedReferences.length === 0 ? (
              <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs text-slate-500">Save topics from the HTML or CSS reference to find them here.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {bookmarkedReferences.map((entry) => (
                  <div key={entry.id} className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
                    <button type="button" onClick={() => routerNavigate(entry.href)} className="text-left">
                      <span className="text-[11px] font-semibold text-indigo-400">{entry.category}</span>
                      <h4 className="mt-1 text-sm font-bold text-white">{entry.title}</h4>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{entry.description}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBookmarkReference(entry.id)}
                      className="rounded p-1.5 text-amber-400 hover:text-slate-500"
                      aria-label={`Remove ${entry.title} bookmark`}
                    >
                      <Bookmark className="h-4 w-4" fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: COLLECTIONS */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Custom Reference Collections</h3>
            <button
              onClick={() => setCollectionModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Collection</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.collections.map((col) => (
              <div key={col.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{col.title}</h4>
                  <span className="text-xs text-slate-500 font-mono">{col.itemIds.length} items</span>
                </div>
                <p className="text-xs text-slate-400">{col.description}</p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Contains saved resources</span>
                  <button
                    onClick={() => navigateTo('snippets')}
                    className="text-indigo-400 hover:underline"
                  >
                    View Snippets &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Collection Modal */}
          {collectionModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Create New Collection</h3>
                <form onSubmit={handleCreateCollection} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">Collection Title</label>
                    <input
                      type="text"
                      required
                      value={newColTitle}
                      onChange={(e) => setNewColTitle(e.target.value)}
                      placeholder="e.g. Distributed Systems & Docker"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newColDesc}
                      onChange={(e) => setNewColDesc(e.target.value)}
                      placeholder="Brief note on what this collection organizes..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCollectionModalOpen(false)}
                      className="px-3 py-1.5 text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Developer Profile Preferences</h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Display Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Developer Bio</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
              >
                Save Preferences
              </button>

              {savedSettingsFeedback && (
                <span className="text-xs text-emerald-400 font-semibold">
                  Saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
