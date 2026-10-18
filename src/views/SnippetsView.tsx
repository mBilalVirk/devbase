import React, { useState } from "react";
import { useDevBase } from "../context/DevBaseContext";
import {
  Search,
  Copy,
  Check,
  Bookmark,
  Heart,
  Download,
  Plus,
  X,
  Tag,
} from "lucide-react";
import { CodeSnippet } from "../types";
import { CSS_CHEATSHEET_SECTIONS } from "../data/cssCheatsheetSections";
import { JAVASCRIPT_CHEATSHEET_SECTIONS } from "../data/javascriptCheatsheetSections";

export const SnippetsView: React.FC = () => {
  const {
    snippets,
    addSnippet,
    copySnippet,
    likeSnippet,
    toggleBookmarkSnippet,
    user,
  } = useDevBase();
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New snippet form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLanguage, setNewLanguage] = useState<
    | "html"
    | "css"
    | "javascript"
    | "typescript"
    | "python"
    | "php"
    | "sql"
    | "docker"
    | "bash"
  >("typescript");
  const [newCode, setNewCode] = useState("");
  const [newExplanation, setNewExplanation] = useState("");
  const [newTags, setNewTags] = useState("Utility, Web");
  const [newDifficulty, setNewDifficulty] = useState<
    "Beginner" | "Intermediate" | "Advanced"
  >("Intermediate");

  const languages = [
    "all",
    "html",
    "css",
    "javascript",
    "typescript",
    "python",
    "php",
    "sql",
    "docker",
    "bash",
  ];

  const filteredSnippets = snippets.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesLang = selectedLang === "all" || s.language === selectedLang;
    const matchesDiff =
      selectedDifficulty === "all" || s.difficulty === selectedDifficulty;
    return matchesSearch && matchesLang && matchesDiff;
  });

  const handleCopy = (snippet: CodeSnippet) => {
    navigator.clipboard.writeText(snippet.code);
    copySnippet(snippet.id);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (snippet: CodeSnippet) => {
    const extMap: Record<string, string> = {
      typescript: "ts",
      javascript: "js",
      css: "css",
      php: "php",
      sql: "sql",
      python: "py",
      html: "html",
    };
    const ext = extMap[snippet.language] || "txt";
    const blob = new Blob([snippet.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${snippet.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    addSnippet({
      title: newTitle.trim(),
      description: newDescription.trim(),
      language: newLanguage,
      code: newCode.trim(),
      explanation: newExplanation.trim(),
      tags: newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      author: user.name,
      difficulty: newDifficulty,
    });

    // Reset & close
    setNewTitle("");
    setNewDescription("");
    setNewCode("");
    setNewExplanation("");
    setCreateModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Reusable Code Repository
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Code Snippets & Cheat-Sheets
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Curated, verified code blocks for frontend, backend, database
            queries, and deployment.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Contribute Snippet</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets by name, tag, or function..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Language & Difficulty selectors */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 md:pb-0">
          <div className="flex items-center gap-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg uppercase text-[11px] font-mono font-medium whitespace-nowrap transition-colors ${
                  selectedLang === lang
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block mx-1"></div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Snippet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSnippets.length === 0 ? (
          <div className="lg:col-span-2 p-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
            No snippets match your filter criteria.
          </div>
        ) : (
          filteredSnippets.map((snip) => {
            const isBookmarked = user.bookmarkedSnippetIds.includes(snip.id);
            const cheatsheetSections =
              snip.id === "snip_css_cheatsheet"
                ? CSS_CHEATSHEET_SECTIONS.map((section) => ({
                    ...section,
                    title: section.property,
                  }))
                : snip.id === "snip_javascript_cheatsheet"
                  ? JAVASCRIPT_CHEATSHEET_SECTIONS
                  : [];
            return (
              <div
                key={snip.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold uppercase text-indigo-400">
                        {snip.language}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">
                        &middot;
                      </span>
                      <span className="text-xs text-slate-400">
                        {snip.difficulty}
                      </span>
                    </div>

                    {/* Bookmark and Like Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => likeSnippet(snip.id)}
                        className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs"
                        title="Like snippet"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span className="font-mono text-[11px]">
                          {snip.likes}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleBookmarkSnippet(snip.id)}
                        className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${
                          isBookmarked
                            ? "text-amber-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                        title={
                          isBookmarked ? "Remove bookmark" : "Bookmark snippet"
                        }
                      >
                        <Bookmark
                          className="w-3.5 h-3.5"
                          fill={isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {snip.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {snip.description}
                  </p>
                </div>

                {/* Code Window */}
                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>source.{snip.language}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(snip)}
                        className="flex items-center gap-1 hover:text-slate-200"
                        title="Copy code"
                      >
                        {copiedId === snip.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === snip.id ? "Copied" : "Copy"}</span>
                      </button>
                      <button
                        onClick={() => handleDownload(snip)}
                        className="hover:text-slate-200"
                        title="Download file"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {cheatsheetSections.length > 0 ? (
                    <div
                      role="region"
                      aria-label={`${snip.language} cheatsheet topics`}
                      tabIndex={0}
                      className="grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto overscroll-contain p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 xl:grid-cols-2"
                    >
                      {cheatsheetSections.map((section) => (
                        <section
                          key={`${section.category}-${section.title}`}
                          className="min-w-0 rounded-lg border border-slate-800 bg-slate-900/70 p-3"
                        >
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-mono text-sm font-semibold text-indigo-300">
                              {section.title}
                            </h4>
                            <span className="text-[10px] uppercase tracking-wide text-slate-500">
                              {section.category}
                            </span>
                          </div>
                          <p className="mb-3 text-xs leading-relaxed text-slate-400">
                            {section.definition}
                          </p>
                          <pre className="overflow-x-auto rounded-md bg-slate-950 p-2 text-[11px] leading-relaxed text-slate-200">
                            <code>{section.code}</code>
                          </pre>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-64 leading-relaxed">
                      {snip.code}
                    </pre>
                  )}
                </div>

                {/* Explanation */}
                {snip.explanation && (
                  <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                    <span className="font-semibold text-slate-300">
                      Explanation:{" "}
                    </span>
                    {snip.explanation}
                  </p>
                )}

                {/* Tags & Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2 flex-wrap">
                    {snip.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px]">
                    By {snip.author} &middot; {snip.copies} copies
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create New Snippet Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Contribute Code Snippet
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Snippet Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Robust LocalStorage with TTL Expiration"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Language
                  </label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="python">Python</option>
                    <option value="php">PHP</option>
                    <option value="sql">SQL</option>
                    <option value="bash">Bash</option>
                    <option value="docker">Docker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explains what problem this code solves..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Source Code
                </label>
                <textarea
                  required
                  rows={6}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Paste working code snippet here..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-xs placeholder-slate-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Explanation & Context
                </label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Key implementation details and edge cases..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Performance, Storage, Web"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                >
                  Publish Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
