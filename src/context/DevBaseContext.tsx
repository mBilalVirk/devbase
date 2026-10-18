import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  HtmlElementItem,
  CssPropertyItem,
  LanguageGuide,
  CodeSnippet,
  LearningPath,
  Article,
  ArticleComment,
  ContactMessage,
  AdminLog,
  SiteSettings,
  UserRole
} from '../types';
import {
  INITIAL_USER,
  HTML_ELEMENTS,
  CSS_PROPERTIES,
  LANGUAGES,
  CODE_SNIPPETS,
  LEARNING_PATHS,
  ARTICLES,
  INITIAL_COMMENTS,
  CONTACT_MESSAGES,
  ADMIN_LOGS,
  SITE_SETTINGS
} from '../data/seedData';

export type ActiveView = 
  | 'home'
  | 'html'
  | 'css'
  | 'languages'
  | 'snippets'
  | 'paths'
  | 'articles'
  | 'article-detail'
  | 'playground'
  | 'dashboard'
  | 'admin'
  | 'about'
  | 'contact'
  | 'faq';

interface DevBaseContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  navigateTo: (view: ActiveView, params?: { articleId?: string; htmlTag?: string; cssProp?: string; pathId?: string; lessonId?: string }) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedHtmlTag: string | null;
  setSelectedHtmlTag: (tag: string | null) => void;
  selectedCssProp: string | null;
  setSelectedCssProp: (prop: string | null) => void;
  selectedPathId: string | null;
  setSelectedPathId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;

  // Search Modal
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // User & Role
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: UserRole) => void;
  toggleBookmarkArticle: (articleId: string) => void;
  toggleBookmarkSnippet: (snippetId: string) => void;
  toggleBookmarkReference: (referenceId: string) => void;
  toggleCompleteLesson: (lessonId: string) => void;
  recordReferenceQuizScore: (id: string, score: number, total: number) => void;
  createCollection: (title: string, description: string) => void;
  addItemToCollection: (collectionId: string, itemId: string) => void;

  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Data Collections & Mutations
  htmlElements: HtmlElementItem[];
  cssProperties: CssPropertyItem[];
  referenceStorageError: string | null;
  languages: LanguageGuide[];
  snippets: CodeSnippet[];
  learningPaths: LearningPath[];
  articles: Article[];
  comments: ArticleComment[];
  contactMessages: ContactMessage[];
  adminLogs: AdminLog[];
  siteSettings: SiteSettings;
  learningProgressError: string | null;

  // Actions
  addSnippet: (snippet: Omit<CodeSnippet, 'id' | 'likes' | 'copies' | 'date'>) => void;
  copySnippet: (snippetId: string) => void;
  likeSnippet: (snippetId: string) => void;
  deleteSnippet: (snippetId: string) => void;

  addArticle: (article: Omit<Article, 'id' | 'views' | 'likes'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  likeArticle: (articleId: string) => void;

  addComment: (articleId: string, content: string, name?: string, email?: string) => void;
  updateCommentStatus: (id: string, status: 'approved' | 'rejected' | 'spam') => void;
  deleteComment: (id: string) => void;

  sendContactMessage: (name: string, email: string, subject: string, message: string) => void;
  updateContactStatus: (id: string, status: 'new' | 'replied' | 'archived') => void;

  addHtmlElement: (element: HtmlElementItem) => void;
  updateHtmlElement: (tag: string, element: Partial<HtmlElementItem>) => void;
  deleteHtmlElement: (tag: string) => void;

  addCssProperty: (property: CssPropertyItem) => void;
  updateCssProperty: (name: string, property: Partial<CssPropertyItem>) => void;
  deleteCssProperty: (name: string) => void;

  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

const DevBaseContext = createContext<DevBaseContextType | undefined>(undefined);

const readReferenceCollection = <T,>(
  key: string,
  defaults: T[],
  isValid: (value: unknown) => value is T,
): { items: T[]; error: string | null } => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return { items: defaults, error: null };
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isValid)) {
      throw new Error(`Stored reference data "${key}" has an invalid shape.`);
    }
    return { items: parsed, error: null };
  } catch (error) {
    console.error(`Unable to load reference data "${key}".`, error);
    return {
      items: defaults,
      error: `Could not load saved reference content (${key}). The saved data was left untouched.`,
    };
  }
};

type SavedLearningProgress = Pick<UserProfile, 'bookmarkedReferenceIds' | 'completedLessonIds' | 'referenceQuizScores'>;

const readSavedLearningProgress = (): { progress: Partial<SavedLearningProgress>; error: string | null } => {
  try {
    const saved = localStorage.getItem('devbase-learning-progress-v1');
    if (!saved) return { progress: {}, error: null };
    const parsed: unknown = JSON.parse(saved);
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Saved learning progress is not an object.');
    }
    const progress = parsed as Partial<SavedLearningProgress>;
    if (
      !Array.isArray(progress.bookmarkedReferenceIds) ||
      !progress.bookmarkedReferenceIds.every((id) => typeof id === 'string') ||
      !Array.isArray(progress.completedLessonIds) ||
      !progress.completedLessonIds.every((id) => typeof id === 'string') ||
      !Array.isArray(progress.referenceQuizScores) ||
      !progress.referenceQuizScores.every((score) =>
        typeof score.id === 'string' && Number.isFinite(score.score) &&
        Number.isFinite(score.total) && typeof score.completedAt === 'string',
      )
    ) {
      throw new Error('Saved learning progress has an invalid shape.');
    }
    return { progress, error: null };
  } catch (error) {
    console.error('Unable to load saved learning progress.', error);
    return { progress: {}, error: 'Could not load saved learning progress. The saved data was left untouched.' };
  }
};

export const DevBaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedHtmlTag, setSelectedHtmlTag] = useState<string | null>(null);
  const [selectedCssProp, setSelectedCssProp] = useState<string | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [initialLearningProgress] = useState(readSavedLearningProgress);
  const [user, setUser] = useState<UserProfile>(() => ({
    ...INITIAL_USER,
    ...initialLearningProgress.progress,
  }));
  const [learningProgressError, setLearningProgressError] = useState<string | null>(initialLearningProgress.error);
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    localStorage.getItem('devbase-theme') === 'light' ? 'light' : 'dark'
  );

  const [initialHtmlReferences] = useState(() =>
    readReferenceCollection(
      'devbase-html-reference-v1',
      HTML_ELEMENTS,
      (value): value is HtmlElementItem =>
        typeof value === 'object' && value !== null &&
        typeof (value as HtmlElementItem).tag === 'string' &&
        typeof (value as HtmlElementItem).name === 'string' &&
        typeof (value as HtmlElementItem).codeExample === 'string',
    ),
  );
  const [initialCssReferences] = useState(() =>
    readReferenceCollection(
      'devbase-css-reference-v1',
      CSS_PROPERTIES,
      (value): value is CssPropertyItem =>
        typeof value === 'object' && value !== null &&
        typeof (value as CssPropertyItem).name === 'string' &&
        typeof (value as CssPropertyItem).codeExample === 'string' &&
        Array.isArray((value as CssPropertyItem).acceptedValues),
    ),
  );
  const [htmlElements, setHtmlElements] = useState<HtmlElementItem[]>(initialHtmlReferences.items);
  const [cssProperties, setCssProperties] = useState<CssPropertyItem[]>(initialCssReferences.items);
  const [referenceStorageError, setReferenceStorageError] = useState<string | null>(
    initialHtmlReferences.error ?? initialCssReferences.error,
  );
  const [languages] = useState<LanguageGuide[]>(LANGUAGES);
  const [snippets, setSnippets] = useState<CodeSnippet[]>(CODE_SNIPPETS);
  const [learningPaths] = useState<LearningPath[]>(LEARNING_PATHS);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [comments, setComments] = useState<ArticleComment[]>(INITIAL_COMMENTS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(CONTACT_MESSAGES);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(ADMIN_LOGS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(SITE_SETTINGS);

  // Apply theme to HTML root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('devbase-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (referenceStorageError) return;
    try {
      localStorage.setItem('devbase-html-reference-v1', JSON.stringify(htmlElements));
    } catch (error) {
      console.error('Unable to persist HTML reference content.', error);
      setReferenceStorageError('Could not save HTML reference changes in this browser. Check available local storage and reload before continuing.');
    }
  }, [htmlElements, referenceStorageError]);

  useEffect(() => {
    if (referenceStorageError) return;
    try {
      localStorage.setItem('devbase-css-reference-v1', JSON.stringify(cssProperties));
    } catch (error) {
      console.error('Unable to persist CSS reference content.', error);
      setReferenceStorageError('Could not save CSS reference changes in this browser. Check available local storage and reload before continuing.');
    }
  }, [cssProperties, referenceStorageError]);

  useEffect(() => {
    if (learningProgressError) return;
    const progress: SavedLearningProgress = {
      bookmarkedReferenceIds: user.bookmarkedReferenceIds,
      completedLessonIds: user.completedLessonIds,
      referenceQuizScores: user.referenceQuizScores,
    };
    try {
      localStorage.setItem('devbase-learning-progress-v1', JSON.stringify(progress));
    } catch (error) {
      console.error('Unable to save learning progress.', error);
      setLearningProgressError('Could not save learning progress in this browser.');
    }
  }, [
    learningProgressError,
    user.bookmarkedReferenceIds,
    user.completedLessonIds,
    user.referenceQuizScores,
  ]);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (
    view: ActiveView,
    params?: { articleId?: string; htmlTag?: string; cssProp?: string; pathId?: string; lessonId?: string }
  ) => {
    setActiveView(view);
    if (params?.articleId) setSelectedArticleId(params.articleId);
    if (params?.htmlTag) setSelectedHtmlTag(params.htmlTag);
    if (params?.cssProp) setSelectedCssProp(params.cssProp);
    if (params?.pathId) setSelectedPathId(params.pathId);
    if (params?.lessonId) setSelectedLessonId(params.lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'ROLE_SWITCHED',
      actor: user.name,
      details: `Switched active role to: ${role.toUpperCase()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const toggleBookmarkArticle = (articleId: string) => {
    setUser((prev) => {
      const exists = prev.bookmarkedArticleIds.includes(articleId);
      return {
        ...prev,
        bookmarkedArticleIds: exists
          ? prev.bookmarkedArticleIds.filter((id) => id !== articleId)
          : [...prev.bookmarkedArticleIds, articleId]
      };
    });
  };

  const toggleBookmarkSnippet = (snippetId: string) => {
    setUser((prev) => {
      const exists = prev.bookmarkedSnippetIds.includes(snippetId);
      return {
        ...prev,
        bookmarkedSnippetIds: exists
          ? prev.bookmarkedSnippetIds.filter((id) => id !== snippetId)
          : [...prev.bookmarkedSnippetIds, snippetId]
      };
    });
  };

  const toggleBookmarkReference = (referenceId: string) => {
    setUser((prev) => {
      const exists = prev.bookmarkedReferenceIds.includes(referenceId);
      return {
        ...prev,
        bookmarkedReferenceIds: exists
          ? prev.bookmarkedReferenceIds.filter((id) => id !== referenceId)
          : [...prev.bookmarkedReferenceIds, referenceId],
      };
    });
  };

  const toggleCompleteLesson = (lessonId: string) => {
    setUser((prev) => {
      const completed = prev.completedLessonIds.includes(lessonId);
      return {
        ...prev,
        completedLessonIds: completed
          ? prev.completedLessonIds.filter((id) => id !== lessonId)
          : [...prev.completedLessonIds, lessonId]
      };
    });
  };

  const recordReferenceQuizScore = (id: string, score: number, total: number) => {
    setUser((prev) => ({
      ...prev,
      referenceQuizScores: [
        ...prev.referenceQuizScores.filter((result) => result.id !== id),
        { id, score, total, completedAt: new Date().toISOString() },
      ],
    }));
  };

  const createCollection = (title: string, description: string) => {
    const newCol = {
      id: `col_${Date.now()}`,
      title,
      description,
      itemIds: []
    };
    setUser((prev) => ({
      ...prev,
      collections: [...prev.collections, newCol]
    }));
  };

  const addItemToCollection = (collectionId: string, itemId: string) => {
    setUser((prev) => ({
      ...prev,
      collections: prev.collections.map((col) => {
        if (col.id === collectionId && !col.itemIds.includes(itemId)) {
          return { ...col, itemIds: [...col.itemIds, itemId] };
        }
        return col;
      })
    }));
  };

  const addSnippet = (snippetData: Omit<CodeSnippet, 'id' | 'likes' | 'copies' | 'date'>) => {
    const newSnip: CodeSnippet = {
      ...snippetData,
      id: `snip_${Date.now()}`,
      likes: 0,
      copies: 0,
      date: 'Just now'
    };
    setSnippets((prev) => [newSnip, ...prev]);
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'SNIPPET_CREATED',
      actor: user.name,
      details: `Created snippet: "${newSnip.title}"`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const copySnippet = (snippetId: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === snippetId ? { ...s, copies: s.copies + 1 } : s))
    );
  };

  const likeSnippet = (snippetId: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === snippetId ? { ...s, likes: s.likes + 1 } : s))
    );
  };

  const deleteSnippet = (snippetId: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== snippetId));
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'SNIPPET_DELETED',
      actor: user.name,
      details: `Deleted snippet with ID ${snippetId}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const addArticle = (articleData: Omit<Article, 'id' | 'views' | 'likes'>) => {
    const newArt: Article = {
      ...articleData,
      id: `art_${Date.now()}`,
      views: 1,
      likes: 0
    };
    setArticles((prev) => [newArt, ...prev]);
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'ARTICLE_CREATED',
      actor: user.name,
      details: `Created article "${newArt.title}" (${newArt.status})`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'ARTICLE_UPDATED',
      actor: user.name,
      details: `Updated article ${id}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'ARTICLE_DELETED',
      actor: user.name,
      details: `Deleted article ${id}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const likeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  const addComment = (articleId: string, content: string, name?: string, email?: string) => {
    const newComment: ArticleComment = {
      id: `com_${Date.now()}`,
      articleId,
      authorName: name || user.name,
      authorEmail: email || user.email,
      authorAvatar: user.avatar,
      content,
      createdAt: 'Just now',
      status: user.role === 'admin' ? 'approved' : 'pending'
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const updateCommentStatus = (id: string, status: 'approved' | 'rejected' | 'spam') => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'COMMENT_MODERATED',
      actor: user.name,
      details: `Changed comment ${id} status to ${status}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const sendContactMessage = (name: string, email: string, subject: string, message: string) => {
    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'new'
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const updateContactStatus = (id: string, status: 'new' | 'replied' | 'archived') => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const addHtmlElement = (element: HtmlElementItem) => {
    setHtmlElements((prev) => [...prev, element]);
  };

  const updateHtmlElement = (tag: string, updates: Partial<HtmlElementItem>) => {
    setHtmlElements((prev) =>
      prev.map((el) => (el.tag === tag ? { ...el, ...updates } : el))
    );
  };

  const deleteHtmlElement = (tag: string) => {
    setHtmlElements((prev) => prev.filter((el) => el.tag !== tag));
  };

  const addCssProperty = (property: CssPropertyItem) => {
    setCssProperties((prev) => [...prev, property]);
  };

  const updateCssProperty = (name: string, updates: Partial<CssPropertyItem>) => {
    setCssProperties((prev) =>
      prev.map((prop) => (prop.name === name ? { ...prop, ...updates } : prop))
    );
  };

  const deleteCssProperty = (name: string) => {
    setCssProperties((prev) => prev.filter((prop) => prop.name !== name));
  };

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...updates }));
    const log: AdminLog = {
      id: `log_${Date.now()}`,
      action: 'SITE_SETTINGS_UPDATED',
      actor: user.name,
      details: 'Updated global site settings',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdminLogs((prev) => [log, ...prev]);
  };

  return (
    <DevBaseContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        selectedArticleId,
        setSelectedArticleId,
        selectedHtmlTag,
        setSelectedHtmlTag,
        selectedCssProp,
        setSelectedCssProp,
        selectedPathId,
        setSelectedPathId,
        selectedLessonId,
        setSelectedLessonId,
        searchOpen,
        setSearchOpen,
        user,
        setUser,
        switchRole,
        toggleBookmarkArticle,
        toggleBookmarkSnippet,
        toggleBookmarkReference,
        toggleCompleteLesson,
        recordReferenceQuizScore,
        createCollection,
        addItemToCollection,
        theme,
        setTheme,
        toggleTheme,
        htmlElements,
        cssProperties,
        referenceStorageError,
        languages,
        snippets,
        learningPaths,
        articles,
        comments,
        contactMessages,
        adminLogs,
        siteSettings,
        learningProgressError,
        addSnippet,
        copySnippet,
        likeSnippet,
        deleteSnippet,
        addArticle,
        updateArticle,
        deleteArticle,
        likeArticle,
        addComment,
        updateCommentStatus,
        deleteComment,
        sendContactMessage,
        updateContactStatus,
        addHtmlElement,
        updateHtmlElement,
        deleteHtmlElement,
        addCssProperty,
        updateCssProperty,
        deleteCssProperty,
        updateSiteSettings
      }}
    >
      {children}
    </DevBaseContext.Provider>
  );
};

export const useDevBase = () => {
  const context = useContext(DevBaseContext);
  if (!context) {
    throw new Error('useDevBase must be used within a DevBaseProvider');
  }
  return context;
};
