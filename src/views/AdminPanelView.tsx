import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { 
  Layers, 
  FileText, 
  Code, 
  MessageSquare, 
  Mail, 
  Users, 
  Settings, 
  Activity, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ShieldAlert, 
  AlertTriangle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Article, UserRole } from '../types';

export const AdminPanelView: React.FC = () => {
  const { 
    user, 
    articles, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    snippets, 
    deleteSnippet, 
    comments, 
    updateCommentStatus, 
    deleteComment, 
    contactMessages, 
    updateContactStatus, 
    adminLogs, 
    siteSettings, 
    updateSiteSettings,
    htmlElements,
    cssProperties
  } = useDevBase();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'articles' | 'snippets' | 'comments' | 'messages' | 'settings' | 'logs'
  >('analytics');

  // New Article Form State
  const [newArticleModal, setNewArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artSubtitle, setArtSubtitle] = useState('');
  const [artCategory, setArtCategory] = useState<any>('Web Development');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artStatus, setArtStatus] = useState<'published' | 'draft'>('published');

  // Authorization Gate check
  const isAuthorized = user.role === 'admin' || user.role === 'superadmin' || user.role === 'author';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">403 Unauthorized Access</h2>
        <p className="text-xs text-slate-400">
          Your current role is <strong className="text-indigo-400 capitalize">{user.role}</strong>. Administrative console requires an Author or Administrator role.
        </p>
        <p className="text-[11px] text-slate-500">
          Tip: You can switch your active role to "Admin" in the top navigation role switcher to test all features.
        </p>
      </div>
    );
  }

  const pendingComments = comments.filter((c) => c.status === 'pending');
  const unreadMessages = contactMessages.filter((m) => m.status === 'new');

  const handleCreateArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim()) return;

    const slug = artTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    addArticle({
      slug,
      title: artTitle.trim(),
      subtitle: artSubtitle.trim(),
      excerpt: artExcerpt.trim(),
      content: artContent.trim(),
      coverImage: '/src/assets/images/article_ai_dev_workflow_1792209454176.jpg',
      category: artCategory,
      tags: ['Engineering', 'Architecture'],
      author: {
        name: user.name,
        role: user.role.toUpperCase(),
        avatar: user.avatar
      },
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTimeMinutes: Math.max(3, Math.ceil(artContent.length / 400)),
      status: artStatus,
      tableOfContents: [
        { id: 'section-1', title: '1. Architectural Principles', level: 2 },
        { id: 'section-2', title: '2. Implementation Strategy', level: 2 }
      ]
    });

    setArtTitle('');
    setArtSubtitle('');
    setArtExcerpt('');
    setArtContent('');
    setNewArticleModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Management Console
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            DevBase Administration CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Publish articles, curate snippets, moderate discussions, and inspect system audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
            ● System Nominal
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-medium">
        {[
          { id: 'analytics', label: 'Dashboard & Metrics', icon: Activity },
          { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
          { id: 'snippets', label: `Code Snippets (${snippets.length})`, icon: Code },
          { id: 'comments', label: `Comments Moderation (${pendingComments.length} pending)`, icon: MessageSquare },
          { id: 'messages', label: `Inquiries (${unreadMessages.length} new)`, icon: Mail },
          { id: 'settings', label: 'Platform Settings', icon: Settings },
          { id: 'logs', label: 'Audit Trail', icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ANALYTICS / OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400">Total Registered Devs</span>
              <div className="text-3xl font-extrabold text-white font-mono">1,420</div>
              <span className="text-[11px] text-emerald-400 font-medium">+14% this month</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400">Articles Published</span>
              <div className="text-3xl font-extrabold text-white font-mono">{articles.length}</div>
              <span className="text-[11px] text-slate-400 font-mono">12.4k total reads</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400">Verified Snippets</span>
              <div className="text-3xl font-extrabold text-white font-mono">{snippets.length}</div>
              <span className="text-[11px] text-indigo-400 font-mono">1.8k copy events</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400">Pending Moderation</span>
              <div className="text-3xl font-extrabold text-white font-mono">{pendingComments.length}</div>
              <span className="text-[11px] text-amber-400 font-medium">{pendingComments.length > 0 ? 'Requires attention' : 'All clear'}</span>
            </div>
          </div>

          {/* Quick System Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Database Entities Summary</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>HTML Tag Specifications</span>
                  <span className="font-mono">{htmlElements.length} elements</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>CSS Properties Indexed</span>
                  <span className="font-mono">{cssProperties.length} properties</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Contact Inquiries</span>
                  <span className="font-mono">{contactMessages.length} received</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Audit Trail Events</span>
                  <span className="font-mono">{adminLogs.length} events logged</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Recent Audit Actions</h3>
              <div className="space-y-2 text-xs">
                {adminLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-indigo-400 text-[11px]">{log.action}</span>
                      <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] truncate">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ARTICLES CMS */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Manage Technical Articles</h3>
            <button
              onClick={() => setNewArticleModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Title & Slug</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Reads</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="font-semibold text-white">{art.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">/{art.slug}</div>
                    </td>
                    <td className="p-4 text-slate-400">{art.category}</td>
                    <td className="p-4">
                      <button
                        onClick={() => updateArticle(art.id, { status: art.status === 'published' ? 'draft' : 'published' })}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                          art.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {art.status}
                      </button>
                    </td>
                    <td className="p-4 font-mono">{art.views}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => deleteArticle(art.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-slate-800"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* New Article Modal */}
          {newArticleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Create Technical Article</h3>
                  <button onClick={() => setNewArticleModal(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateArticleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">Headline Title</label>
                    <input
                      type="text"
                      required
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      placeholder="e.g. Modern Web APIs You Should Be Using in 2026"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={artSubtitle}
                      onChange={(e) => setArtSubtitle(e.target.value)}
                      placeholder="A comprehensive overview of View Transitions, CSS Scope, and Popover API."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1">Category</label>
                      <select
                        value={artCategory}
                        onChange={(e) => setArtCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend & Cloud">Backend & Cloud</option>
                        <option value="Databases">Databases</option>
                        <option value="Security">Security</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Publication State</label>
                      <select
                        value={artStatus}
                        onChange={(e) => setArtStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Executive Excerpt</label>
                    <textarea
                      rows={2}
                      value={artExcerpt}
                      onChange={(e) => setArtExcerpt(e.target.value)}
                      placeholder="1-2 sentences summarizing the article..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Article Body (Markdown)</label>
                    <textarea
                      rows={8}
                      required
                      value={artContent}
                      onChange={(e) => setArtContent(e.target.value)}
                      placeholder="Write your article in Markdown format..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-xs placeholder-slate-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setNewArticleModal(false)}
                      className="px-4 py-2 text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CODE SNIPPETS CMS */}
      {activeTab === 'snippets' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Manage Code Snippets</h3>
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Language</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Copies</th>
                  <th className="p-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {snippets.map((snip) => (
                  <tr key={snip.id} className="hover:bg-slate-800/50">
                    <td className="p-4 font-semibold text-white">{snip.title}</td>
                    <td className="p-4 font-mono uppercase text-indigo-400">{snip.language}</td>
                    <td className="p-4 text-slate-400">{snip.author}</td>
                    <td className="p-4 font-mono">{snip.copies}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteSnippet(snip.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. COMMENTS MODERATION */}
      {activeTab === 'comments' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Comment Moderation Queue</h3>
          {comments.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
              No comments to moderate.
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((com) => (
                <div key={com.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs">{com.authorName}</span>
                      <span className="text-[11px] text-slate-500">({com.authorEmail})</span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        com.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                        com.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        {com.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {com.status !== 'approved' && (
                        <button
                          onClick={() => updateCommentStatus(com.id, 'approved')}
                          className="px-2.5 py-1 text-xs bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 rounded border border-emerald-500/30 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      )}
                      {com.status !== 'rejected' && (
                        <button
                          onClick={() => updateCommentStatus(com.id, 'rejected')}
                          className="px-2.5 py-1 text-xs bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 rounded border border-amber-500/30 flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          <span>Reject</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteComment(com.id)}
                        className="p-1 text-rose-400 hover:text-rose-300"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                    "{com.content}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. CONTACT INQUIRIES */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Contact Submissions Inbox</h3>
          {contactMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
              Inbox is empty.
            </div>
          ) : (
            <div className="space-y-3">
              {contactMessages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{msg.subject}</div>
                      <div className="text-[11px] text-slate-400">From {msg.name} ({msg.email}) &middot; {msg.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        msg.status === 'new' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                      {msg.status === 'new' && (
                        <button
                          onClick={() => updateContactStatus(msg.id, 'replied')}
                          className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                        >
                          Mark Replied
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Global Platform Configuration</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Platform Name</label>
              <input
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Hero Tagline</label>
              <input
                type="text"
                value={siteSettings.tagline}
                onChange={(e) => updateSiteSettings({ tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-y border-slate-800">
              <div>
                <span className="text-slate-200 font-semibold block">Allow User Registrations</span>
                <span className="text-[11px] text-slate-500">Permit developers to create free accounts</span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.allowRegistrations}
                onChange={(e) => updateSiteSettings({ allowRegistrations: e.target.checked })}
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <span className="text-slate-200 font-semibold block">Maintenance Mode</span>
                <span className="text-[11px] text-slate-500">Temporarily lock public write routes</span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.maintenanceMode}
                onChange={(e) => updateSiteSettings({ maintenanceMode: e.target.checked })}
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. AUDIT TRAIL */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">System Administrative Audit Trail</h3>
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Action</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {adminLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-mono font-bold text-indigo-400">{log.action}</td>
                    <td className="p-4 text-slate-300">{log.actor}</td>
                    <td className="p-4 text-slate-400">{log.details}</td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
