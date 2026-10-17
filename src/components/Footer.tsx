import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Github, Twitter, Youtube, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useDevBase();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
                &lt;/&gt;
              </div>
              <span className="text-lg font-bold tracking-tight text-white">DevBase</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Open developer learning center and comprehensive syntax reference for modern web engineering, programming fundamentals, and architectural practices.
            </p>
            
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Subscribe to Technical Dispatch
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! You will receive weekly deep dives.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="developer@domain.com"
                    required
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Reference Docs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Documentation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('html')} className="hover:text-white transition-colors">
                  HTML5 Reference
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('css')} className="hover:text-white transition-colors">
                  CSS Properties & Grid
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('languages')} className="hover:text-white transition-colors">
                  Language Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('playground')} className="hover:text-white transition-colors">
                  Live Code Sandbox
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Learning & Code */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Learning & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('paths')} className="hover:text-white transition-colors">
                  Learning Paths
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('snippets')} className="hover:text-white transition-colors">
                  Code Snippet Library
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('articles')} className="hover:text-white transition-colors">
                  Technical Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-white transition-colors">
                  My Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About DevBase
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                  Administration Console
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} DevBase Project. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">WCAG 2.2 AA Compliant</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
