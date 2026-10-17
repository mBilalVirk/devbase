export type UserRole = 'guest' | 'developer' | 'contributor' | 'author' | 'editor' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  joinedDate: string;
  bookmarkedSnippetIds: string[];
  bookmarkedArticleIds: string[];
  completedLessonIds: string[];
  collections: {
    id: string;
    title: string;
    description: string;
    itemIds: string[];
  }[];
}

export interface HtmlAttribute {
  name: string;
  description: string;
  type: string;
  required?: boolean;
}

export interface HtmlElementItem {
  tag: string;
  name: string;
  category: 'Structure' | 'Text' | 'Forms' | 'Media' | 'Tables' | 'Semantic' | 'Interactive' | 'Deprecated';
  summary: string;
  syntax: string;
  closingTag: 'Required' | 'Omitted (Void)' | 'Optional';
  attributes: HtmlAttribute[];
  contentModel: string;
  accessibilityTips: string;
  commonMistakes: string;
  bestPractices: string;
  codeExample: string;
  previewHtml?: string;
  relatedTags: string[];
  browserSupport: string;
}

export interface CssPropertyItem {
  name: string;
  category: 'Layout' | 'Grid & Flex' | 'Box Model' | 'Typography' | 'Colors & Effects' | 'Animation' | 'Modern CSS';
  syntax: string;
  acceptedValues: string[];
  initialValue: string;
  inherited: boolean;
  description: string;
  codeExample: string;
  interactiveType?: 'flexbox' | 'grid' | 'boxmodel' | 'shadow' | 'border-radius';
  commonMistakes: string;
  browserSupport: string;
  relatedProperties: string[];
}

export interface LanguageTopic {
  title: string;
  code: string;
  explanation: string;
}

export interface CommonPitfall {
  error: string;
  solution: string;
}

export interface LanguageGuide {
  id: string;
  name: string;
  iconName: string;
  summary: string;
  ecosystem: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  paradigm: string;
  setupGuide: string;
  topics: LanguageTopic[];
  pitfalls: CommonPitfall[];
  bestPractices: string[];
  docsUrl: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'php' | 'sql' | 'docker' | 'bash';
  tags: string[];
  code: string;
  explanation: string;
  author: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  likes: number;
  copies: number;
}

export interface Lesson {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  content: string;
  codeExample: string;
  keyTakeaways: string[];
  practiceTask?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  audience: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  lessons: Lesson[];
}

export interface ArticleComment {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected' | 'spam';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'Web Development' | 'AI & Machine Learning' | 'Frontend' | 'Backend & Cloud' | 'Databases' | 'Security';
  tags: string[];
  publishedAt: string;
  readTimeMinutes: number;
  views: number;
  likes: number;
  status: 'draft' | 'in_review' | 'published' | 'scheduled';
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
}

export interface AdminLog {
  id: string;
  action: string;
  actor: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  allowRegistrations: boolean;
  maintenanceMode: boolean;
  defaultTheme: 'dark' | 'light' | 'system';
  footerNotice: string;
}
