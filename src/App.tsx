/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { DevBaseProvider } from "./context/DevBaseContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { GlobalSearchModal } from "./components/GlobalSearchModal";

// Views
import { HomeView } from "./views/HomeView";
import { HtmlReferenceView } from "./views/HtmlReferenceView";
import { CssReferenceView } from "./views/CssReferenceView";
import { LanguagesView } from "./views/LanguagesView";
import { SnippetsView } from "./views/SnippetsView";
import { LearningPathsView } from "./views/LearningPathsView";
import { ArticlesView } from "./views/ArticlesView";
import { ArticleDetailView } from "./views/ArticleDetailView";
import { PlaygroundView } from "./views/PlaygroundView";
import { UserDashboardView } from "./views/UserDashboardView";
import { AdminPanelView } from "./views/AdminPanelView";
import { AboutView } from "./views/AboutView";
import { ContactView } from "./views/ContactView";
import { FaqView } from "./views/FaqView";

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/html" element={<HtmlReferenceView />} />
          <Route path="/html/:slug" element={<HtmlReferenceView />} />
          <Route path="/css" element={<CssReferenceView />} />
          <Route path="/css/:slug" element={<CssReferenceView />} />
          <Route path="/languages" element={<LanguagesView />} />
          <Route path="/snippets" element={<SnippetsView />} />
          <Route path="/learning-paths" element={<LearningPathsView />} />
          <Route path="/articles" element={<ArticlesView />} />
          <Route path="/articles/:articleId" element={<ArticleDetailView />} />
          <Route path="/playground" element={<PlaygroundView />} />
          <Route path="/dashboard" element={<UserDashboardView />} />
          <Route path="/admin" element={<AdminPanelView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/faq" element={<FaqView />} />

          {/* Redirect unknown URLs to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <DevBaseProvider>
        <MainContent />
      </DevBaseProvider>
    </BrowserRouter>
  );
}
