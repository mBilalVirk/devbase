import React, { useState } from 'react';
import { Play, Copy, RotateCcw, Download, Check, Maximize2, Minimize2, Sparkles } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
}

const PRESETS: Preset[] = [
  {
    id: 'glass-card',
    name: 'Glassmorphism Card',
    html: `<div class="card">
  <div class="badge">PRO FEATURE</div>
  <h2>Next-Gen Engine</h2>
  <p>Minimalist frosted glass panel with subtle backdrop blur and refined typography.</p>
  <button id="action-btn">Explore Features</button>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 20%, #1e1b4b, #0f172a 70%);
  font-family: system-ui, sans-serif;
  color: #f8fafc;
}

.card {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #818cf8;
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.35rem;
}

p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

button {
  width: 100%;
  padding: 0.65rem 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #4f46e5;
}`,
    js: `document.getElementById('action-btn').addEventListener('click', () => {
  alert('Action triggered cleanly inside isolated sandbox!');
});`
  },
  {
    id: 'flex-nav',
    name: 'Accessible Flex Nav',
    html: `<header class="navbar">
  <div class="brand">DevBase</div>
  <nav class="nav-links">
    <a href="#" class="active">Overview</a>
    <a href="#">Guides</a>
    <a href="#">Reference</a>
  </nav>
  <button class="cta-btn">Get Started</button>
</header>`,
    css: `body {
  margin: 0;
  background: #090d16;
  font-family: system-ui, sans-serif;
  padding: 1.5rem;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 0.75rem;
}

.brand {
  font-weight: 800;
  color: #fff;
  font-size: 1.15rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-links a:hover, .nav-links a.active {
  color: #fff;
}

.cta-btn {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
}`,
    js: `console.log('Flex navigation initialized.');`
  }
];

export const InteractiveCodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [html, setHtml] = useState(PRESETS[0].html);
  const [css, setCss] = useState(PRESETS[0].css);
  const [js, setJs] = useState(PRESETS[0].js);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const loadPreset = (preset: Preset) => {
    setHtml(preset.html);
    setCss(preset.css);
    setJs(preset.js);
  };

  const handleCopy = () => {
    const fullCode = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n// JavaScript\n${js}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const combinedHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>DevBase Sandbox Export</title>
  <style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;
    const blob = new Blob([combinedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devbase-snippet.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const srcDoc = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (e) {
            console.error(e);
          }
        <\/script>
      </body>
    </html>
  `;

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all ${
      fullscreen ? 'fixed inset-4 z-50' : 'h-[620px] w-full'
    }`}>
      {/* Top Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-semibold text-slate-300">Live Code Sandbox</span>

          {/* Preset Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            <span className="text-[11px] text-slate-500">Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => loadPreset(p)}
                className="px-2 py-0.5 text-[11px] rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset(PRESETS[0])}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700"
            title="Copy all code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700"
            title="Download standalone HTML"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-900"
            title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
        
        {/* Left Side: Code Editor */}
        <div className="flex flex-col h-full bg-slate-950/70 overflow-hidden">
          {/* Tab switches */}
          <div className="flex items-center px-3 py-2 bg-slate-950 border-b border-slate-800 gap-1">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'html'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'css'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              styles.css
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'js'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              script.js
            </button>
          </div>

          {/* Textarea code editor */}
          <div className="flex-1 p-3 overflow-hidden">
            {activeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-2 resize-none focus:outline-none leading-relaxed"
                placeholder="Write HTML markup here..."
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-2 resize-none focus:outline-none leading-relaxed"
                placeholder="Write CSS styles here..."
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-2 resize-none focus:outline-none leading-relaxed"
                placeholder="Write JavaScript code here..."
              />
            )}
          </div>
        </div>

        {/* Right Side: Live Isolated Iframe Preview */}
        <div className="flex flex-col h-full bg-slate-900/50 overflow-hidden">
          <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 text-xs font-medium text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Isolated Sandbox Output
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live Render</span>
          </div>

          <div className="flex-1 bg-white/5 relative">
            <iframe
              title="Code Preview Sandbox"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0 bg-transparent"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
