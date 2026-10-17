import React from "react";
import { useDevBase } from "../context/DevBaseContext";
import {
  Search,
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Compass,
  Sparkles,
  Terminal,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { InteractiveCodePlayground } from "../components/InteractiveCodePlayground";
import heroImage from "../assets/images/hero_devbase_abstract_1792209453528.jpg";

export const HomeView: React.FC = () => {
  const {
    navigateTo,
    setSearchOpen,
    snippets,
    articles,
    learningPaths,
    htmlElements,
    copySnippet,
  } = useDevBase();

  const bentoTechnologies = [
    {
      name: "HTML5",
      desc: "Semantic landmarks, forms, dialogs & WCAG standards",
      path: "html",
      color: "from-orange-500/20 to-amber-500/10",
    },
    {
      name: "Modern CSS",
      desc: "Flexbox, CSS Grid, container queries & fluid typography",
      path: "css",
      color: "from-blue-500/20 to-cyan-500/10",
    },
    {
      name: "JavaScript",
      desc: "ES2026, asynchronous patterns, event loop & DOM",
      path: "languages",
      color: "from-yellow-500/20 to-amber-500/10",
    },
    {
      name: "TypeScript",
      desc: "Strong static typing, generics, discriminated unions",
      path: "languages",
      color: "from-indigo-500/20 to-blue-500/10",
    },
    {
      name: "PostgreSQL & SQL",
      desc: "B-tree indexing, query planner analysis, ACID reliability",
      path: "languages",
      color: "from-sky-500/20 to-indigo-500/10",
    },
    {
      name: "Python",
      desc: "Clean syntax, generators, FastAPI & data ecosystem",
      path: "languages",
      color: "from-emerald-500/20 to-teal-500/10",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-slate-800/80">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Open Developer Knowledge & Education System</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Everything You Need to Grow as a Developer.
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
                Centralized, standards-compliant documentation, interactive CSS
                & code playgrounds, curated code snippets, and in-depth
                architectural guides.
              </p>

              {/* Quick Search Bar */}
              <div className="pt-2 max-w-lg">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-sm shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                    <span>
                      Search HTML, CSS properties, syntax, or articles...
                    </span>
                  </div>
                  <kbd className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700 font-mono">
                    &#8984;K
                  </kbd>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo("paths")}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Explore Learning Paths</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo("articles")}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-sm transition-colors"
                >
                  Browse Latest Articles
                </button>
              </div>

              {/* Unboxed Metadata Stats */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
                <div>
                  <span className="font-semibold text-white font-mono">
                    100+
                  </span>
                  <span className="ml-1.5">Syntax Guides</span>
                </div>
                <span aria-hidden="true">&middot;</span>
                <div>
                  <span className="font-semibold text-white font-mono">
                    WCAG 2.2
                  </span>
                  <span className="ml-1.5">Accessible</span>
                </div>
                <span aria-hidden="true">&middot;</span>
                <div>
                  <span className="font-semibold text-white font-mono">
                    100%
                  </span>
                  <span className="ml-1.5">Free & Open</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src={heroImage}
                  alt="DevBase modern developer architecture visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                  <div className="text-xs font-mono text-cyan-400 mb-1">
                    Architecture Preview
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Interactive Engineering System
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Explore real-time code execution, syntax standards, and full
                    CMS controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Core Technologies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Essential Developer Disciplines
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Structured documentation and syntax breakdowns across foundational
              languages and stacks.
            </p>
          </div>
          <button
            onClick={() => navigateTo("languages")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bentoTechnologies.map((tech) => (
            <div
              key={tech.name}
              onClick={() => navigateTo(tech.path as any)}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {tech.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Live Code Sandbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Practice in Real Time
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Edit HTML, CSS, and JavaScript with instantaneous live preview and
              exportable code.
            </p>
          </div>
          <button
            onClick={() => navigateTo("playground")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>Full Playground View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <InteractiveCodePlayground />
      </section>

      {/* Structured Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Curated Learning Paths
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Step-by-step ordered lessons designed to build deep foundational
              mastery.
            </p>
          </div>
          <button
            onClick={() => navigateTo("paths")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>All Paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => navigateTo("paths", { pathId: path.id })}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-indigo-400">
                    {path.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {path.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {path.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {path.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{path.lessons.length} structured lessons</span>
                <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                  Start Track &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular HTML & CSS References Quick Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xl font-bold text-white">
                Comprehensive HTML5 & CSS Reference
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect every tag syntax, browser compatibility notes,
                accessibility guidance, and common anti-patterns.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => navigateTo("html")}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                >
                  HTML Tags
                </button>
                <button
                  onClick={() => navigateTo("css")}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                >
                  CSS Reference
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {htmlElements.slice(0, 6).map((el) => (
                <button
                  key={el.tag}
                  onClick={() => navigateTo("html", { htmlTag: el.tag })}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
                >
                  <div className="text-xs font-mono font-bold text-indigo-400 group-hover:text-indigo-300">
                    {el.tag}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-1">
                    {el.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Code Snippets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Production Code Snippets
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Field-tested, copy-paste ready utility functions and architectural
              patterns.
            </p>
          </div>
          <button
            onClick={() => navigateTo("snippets")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>All Snippets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippets.slice(0, 2).map((snip) => (
            <div
              key={snip.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
                    {snip.language}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {snip.title}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(snip.code);
                    copySnippet(snip.id);
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700/60"
                  title="Copy snippet"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400">{snip.description}</p>

              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-40">
                {snip.code}
              </pre>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80">
                <span>By {snip.author}</span>
                <span>{snip.copies} copies</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Technical Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Technical Dispatch & Articles
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              In-depth essays on web architecture, systems design, and database
              reliability.
            </p>
          </div>
          <button
            onClick={() => navigateTo("articles")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() =>
                navigateTo("article-detail", { articleId: art.id })
              }
              className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-sm flex flex-col"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-indigo-400 font-semibold">
                      {art.category}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{art.readTimeMinutes} min read</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{art.publishedAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">
                      {art.author.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {art.author.role}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
