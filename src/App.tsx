/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DevBaseProvider, useDevBase } from './context/DevBaseContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Views
import { HomeView } from './views/HomeView';
import { HtmlReferenceView } from './views/HtmlReferenceView';
import { CssReferenceView } from './views/CssReferenceView';
import { LanguagesView } from './views/LanguagesView';
import { SnippetsView } from './views/SnippetsView';
import { LearningPathsView } from './views/LearningPathsView';
import { ArticlesView } from './views/ArticlesView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { PlaygroundView } from './views/PlaygroundView';
import { UserDashboardView } from './views/UserDashboardView';
import { AdminPanelView } from './views/AdminPanelView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FaqView } from './views/FaqView';

const MainContent: React.FC = () => {
  const { activeView } = useDevBase();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'html':
        return <HtmlReferenceView />;
      case 'css':
        return <CssReferenceView />;
      case 'languages':
        return <LanguagesView />;
      case 'snippets':
        return <SnippetsView />;
      case 'paths':
        return <LearningPathsView />;
      case 'articles':
        return <ArticlesView />;
      case 'article-detail':
        return <ArticleDetailView />;
      case 'playground':
        return <PlaygroundView />;
      case 'dashboard':
        return <UserDashboardView />;
      case 'admin':
        return <AdminPanelView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FaqView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <DevBaseProvider>
      <MainContent />
    </DevBaseProvider>
  );
}
