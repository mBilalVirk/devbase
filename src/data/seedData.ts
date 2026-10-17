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
} from "../types";

import articleAiImage from "../assets/images/article_ai_dev_workflow_1792209454176.jpg";
import articleFullstackImage from "../assets/images/article_fullstack_architecture_1792209455010.jpg";
import authorElenaAvatar from "../assets/images/avatar_author_elena_1792209455148.jpg";
export const INITIAL_USER: UserProfile = {
  id: "usr_01",
  name: "Elena Rostova",
  username: "erostova",
  email: "elena@devbase.org",
  role: "admin", // starts as Admin so user can access everything, easily toggleable in UI
  avatar: "/src/assets/images/avatar_author_elena_1792209455148.jpg",
  bio: "Full-stack staff engineer & technical educator. Specializing in high-performance web systems and developer tooling.",
  joinedDate: "Jan 2025",
  bookmarkedSnippetIds: ["snip_1", "snip_3"],
  bookmarkedArticleIds: ["art_1", "art_2"],
  completedLessonIds: ["les_html_1", "les_html_2", "les_css_1"],
  collections: [
    {
      id: "col_1",
      title: "Production Essentials",
      description:
        "Handy snippets and references for daily web app engineering",
      itemIds: ["snip_1", "snip_2", "snip_4"],
    },
    {
      id: "col_2",
      title: "Architecture & Databases",
      description: "Queries, distributed principles, and API patterns",
      itemIds: ["snip_3", "art_2"],
    },
  ],
};

export const SITE_SETTINGS: SiteSettings = {
  siteName: "DevBase",
  tagline: "Everything You Need to Grow as a Developer",
  allowRegistrations: true,
  maintenanceMode: false,
  defaultTheme: "dark",
  footerNotice:
    "Open educational knowledge platform for web developers and software engineers.",
};

export const HTML_ELEMENTS: HtmlElementItem[] = [
  {
    tag: "<a>",
    name: "Anchor Element",
    category: "Text",
    summary:
      "Creates a hyperlink to web pages, files, email addresses, locations in the same page, or any URL scheme.",
    syntax:
      '<a href="url" target="_blank" rel="noopener noreferrer">Link text</a>',
    closingTag: "Required",
    contentModel:
      "Transparent content; can wrap flow content or phrasing content, but not interactive ancestors.",
    browserSupport:
      "Full support across all browser engines (Chrome 1+, Safari 1+, Firefox 1+, Edge 12+).",
    attributes: [
      {
        name: "href",
        description: "The URL that the hyperlink points to.",
        type: "URL",
        required: true,
      },
      {
        name: "target",
        description:
          "Where to display the linked URL (_blank, _self, _parent, _top).",
        type: "Keyword",
      },
      {
        name: "rel",
        description:
          "Relationship between current document and linked URL (noopener, noreferrer, nofollow).",
        type: "Token list",
      },
      {
        name: "download",
        description:
          "Prompts the user to save the linked URL instead of navigating to it.",
        type: "String/Filename",
      },
    ],
    accessibilityTips:
      'Always provide descriptive text. Avoid "click here" or "read more". When opening new windows with target="_blank", warn screen reader users or provide visual indication.',
    commonMistakes:
      'Using <a href="#"> or <a href="javascript:void(0)"> for actions instead of a <button>, and omitting rel="noopener" when target="_blank" is used.',
    bestPractices:
      'Use semantic buttons for actions, anchors for navigation. For phone numbers use href="tel:+1...", for emails href="mailto:...".',
    codeExample: `<!-- Accessible external link -->
<a href="https://developer.mozilla.org" 
   target="_blank" 
   rel="noopener noreferrer"
   class="text-indigo-400 underline hover:text-indigo-300">
  Read Mozilla Developer Network Documentation (opens in new tab)
</a>

<!-- Jump anchor link within page -->
<a href="#section-attributes" class="text-slate-300 hover:text-white">
  Jump to Attributes &darr;
</a>`,
    previewHtml: `<div class="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
  <p class="text-sm text-slate-300">Here is an example link rendered in browser:</p>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium text-sm underline underline-offset-4">
    Official Technical Standards &nearr;
  </a>
</div>`,
    relatedTags: ["<button>", "<nav>", "<link>"],
  },
  {
    tag: "<dialog>",
    name: "Dialog Box Element",
    category: "Interactive",
    summary:
      "Represents a modal or non-modal dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.",
    syntax:
      '<dialog id="my-modal">\n  <p>Modal content</p>\n  <button onclick="this.closest(\'dialog\').close()">Close</button>\n</dialog>',
    closingTag: "Required",
    contentModel: "Flow content.",
    browserSupport:
      "Native baseline support in all evergreen browsers (Chrome 37+, Safari 15.4+, Firefox 98+, Edge 79+).",
    attributes: [
      {
        name: "open",
        description:
          "Indicates that the dialog is active and that the user can interact with it.",
        type: "Boolean",
      },
    ],
    accessibilityTips:
      "When opened with dialog.showModal(), it natively locks inert background focus and provides built-in Esc key cancellation. Always maintain proper heading structure inside the dialog.",
    commonMistakes:
      "Using display: block directly on <dialog> instead of using dialog.showModal() in JavaScript, which fails to create the top-layer ::backdrop pseudo-element.",
    bestPractices:
      "Use native showModal() and close() methods. Leverage ::backdrop in CSS for frosted-glass overlays.",
    codeExample: `<!-- Modern Accessible Native Dialog -->
<button onclick="document.getElementById('confirm-modal').showModal()" 
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
  Open Settings Dialog
</button>

<dialog id="confirm-modal" class="p-6 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm max-w-md w-full">
  <h3 class="text-lg font-semibold mb-2">Workspace Preferences</h3>
  <p class="text-sm text-slate-400 mb-6">Choose how code snippets render across lessons and articles.</p>
  
  <div class="flex justify-end gap-3">
    <button onclick="document.getElementById('confirm-modal').close()" 
            class="px-3 py-1.5 text-xs text-slate-400 hover:text-white">
      Cancel
    </button>
    <button onclick="document.getElementById('confirm-modal').close()" 
            class="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-md">
      Save Changes
    </button>
  </div>
</dialog>`,
    previewHtml: `<div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
  <div class="border border-indigo-500/30 bg-slate-950 p-4 rounded-lg shadow-xl">
    <div class="flex items-center justify-between pb-3 border-b border-slate-800">
      <h4 class="text-sm font-semibold text-slate-100">Modal Simulation</h4>
      <span class="text-xs text-indigo-400 font-mono">::backdrop active</span>
    </div>
    <p class="text-xs text-slate-400 my-3">Native HTML5 &lt;dialog&gt; isolates keyboard tab traversal to modal elements.</p>
    <div class="flex justify-end gap-2">
      <span class="px-2.5 py-1 text-xs bg-slate-800 text-slate-300 rounded">Dismiss</span>
    </div>
  </div>
</div>`,
    relatedTags: ["<form>", "<button>", "<menu>"],
  },
  {
    tag: "<form>",
    name: "Form Element",
    category: "Forms",
    summary:
      "Represents a document section containing interactive controls for submitting information to a web server.",
    syntax:
      '<form action="/api/submit" method="POST">\n  <label for="name">Name</label>\n  <input id="name" name="name" required />\n  <button type="submit">Send</button>\n</form>',
    closingTag: "Required",
    contentModel:
      "Flow content, but no descendant <form> element can be nested.",
    browserSupport:
      "Universal support (Chrome 1+, Safari 1+, Firefox 1+, Edge 12+).",
    attributes: [
      {
        name: "action",
        description: "The URL that processes the form submission.",
        type: "URL",
      },
      {
        name: "method",
        description:
          "The HTTP method to submit the form with (GET, POST, dialog).",
        type: "Keyword",
      },
      {
        name: "enctype",
        description:
          "MIME type of the submitted content when method is POST (multipart/form-data, application/x-www-form-urlencoded).",
        type: "MIME",
      },
      {
        name: "novalidate",
        description: "Prevents the browser from native client-side validation.",
        type: "Boolean",
      },
    ],
    accessibilityTips:
      "Always associate every input control with an explicit <label> using for/id attributes. Group related fields with <fieldset> and <legend>.",
    commonMistakes:
      "Nesting a <form> inside another <form> (strictly invalid HTML), or leaving inputs without connected labels.",
    bestPractices:
      'Use type="submit" on primary buttons. Handle client-side fetch or asynchronous submit without breaking keyboard Enter submission.',
    codeExample: `<form action="/api/feedback" method="POST" class="space-y-4 max-w-sm">
  <div>
    <label for="user-email" class="block text-xs font-medium text-slate-300 mb-1">
      Email Address
    </label>
    <input type="email" id="user-email" name="email" required
           placeholder="developer@domain.com"
           class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-slate-100" />
  </div>
  <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-500">
    Subscribe to Updates
  </button>
</form>`,
    relatedTags: ["<input>", "<label>", "<fieldset>", "<button>"],
  },
  {
    tag: "<picture>",
    name: "Picture Element",
    category: "Media",
    summary:
      "Contains zero or more <source> elements and one <img> element to offer alternative versions of an image for different display/device scenarios.",
    syntax:
      '<picture>\n  <source srcset="image.webp" type="image/webp">\n  <img src="image.jpg" alt="Description">\n</picture>',
    closingTag: "Required",
    contentModel:
      "Zero or more <source> elements, followed by exactly one <img> element.",
    browserSupport:
      "Universal modern support (Chrome 38+, Safari 9.1+, Firefox 38+, Edge 13+).",
    attributes: [],
    accessibilityTips:
      "The alt text MUST always be declared on the fallback <img> tag, never on <picture> or <source>.",
    commonMistakes:
      "Omitting the mandatory <img> element inside the <picture> container; without <img> nothing renders.",
    bestPractices:
      "Combine modern image formats (AVIF, WebP) with media queries for art direction and responsive resolutions.",
    codeExample: `<picture>
  <!-- Modern high-efficiency format -->
  <source srcset="/images/diagram-dark.avif" type="image/avif" media="(prefers-color-scheme: dark)">
  <source srcset="/images/diagram-dark.webp" type="image/webp">
  <!-- Fallback standard image with descriptive alt text -->
  <img src="/images/diagram-dark.png" 
       alt="Database replication architecture cluster topology" 
       loading="lazy" 
       width="800" 
       height="450" 
       class="rounded-lg border border-slate-800" />
</picture>`,
    relatedTags: ["<img>", "<source>", "<video>", "<audio>"],
  },
  {
    tag: "<details>",
    name: "Details Disclosure Element",
    category: "Interactive",
    summary:
      "Creates a disclosure widget in which information is visible only when the widget is toggled into an open state.",
    syntax:
      "<details>\n  <summary>FAQ Question Title</summary>\n  <p>Detailed explanatory answer.</p>\n</details>",
    closingTag: "Required",
    contentModel: "One <summary> element followed by flow content.",
    browserSupport: "Universal modern support across all browser engines.",
    attributes: [
      {
        name: "open",
        description: "Indicates whether the details are currently visible.",
        type: "Boolean",
      },
      {
        name: "name",
        description:
          "Enables native accordion grouping across multiple details elements in HTML standard.",
        type: "String",
      },
    ],
    accessibilityTips:
      "Natively exposes aria-expanded and keyboard space/enter toggling without needing custom JavaScript.",
    commonMistakes:
      'Forgetting the <summary> element, which causes the browser to insert a default localized label like "Details".',
    bestPractices:
      "Style the summary cursor with cursor: pointer and customize the disclosure arrow using CSS ::marker or svg indicators.",
    codeExample: `<details class="group border border-slate-800 rounded-lg bg-slate-900/50 p-4 transition-colors">
  <summary class="font-medium text-slate-200 cursor-pointer list-none flex items-center justify-between">
    <span>What is the difference between inline and block elements?</span>
    <span class="text-xs text-slate-500 group-open:rotate-180 transition-transform">&darr;</span>
  </summary>
  <div class="mt-3 text-sm text-slate-400 border-t border-slate-800/80 pt-3">
    Block elements start on a new line and stretch to full container width. Inline elements only occupy the space bounded by their tags.
  </div>
</details>`,
    relatedTags: ["<summary>", "<dialog>", "<section>"],
  },
  {
    tag: "<article>",
    name: "Article Element",
    category: "Semantic",
    summary:
      "Represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable.",
    syntax:
      "<article>\n  <header><h2>Article Title</h2></header>\n  <p>Content...</p>\n</article>",
    closingTag: "Required",
    contentModel: "Flow content.",
    browserSupport:
      "Universal support (Chrome 6+, Safari 5+, Firefox 4+, Edge 12+).",
    attributes: [],
    accessibilityTips:
      "Assistive technologies treat <article> as a landmark region. Each article should ideally include an identifiable heading (h1-h6).",
    commonMistakes:
      "Using <article> purely as a styling container instead of a distinct syndicatable piece of content.",
    bestPractices:
      "Use for blog posts, news stories, forum threads, or independent widgets like product cards.",
    codeExample: `<article class="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
  <header>
    <div class="text-xs text-indigo-400 font-medium">System Architecture</div>
    <h2 class="text-xl font-bold text-slate-100 mt-1">Understanding Event Loops in Node.js</h2>
    <div class="text-xs text-slate-500 mt-1">Published by Elena Rostova &middot; 6 min read</div>
  </header>
  <p class="text-sm text-slate-300 leading-relaxed">
    The event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded...
  </p>
</article>`,
    relatedTags: ["<section>", "<main>", "<aside>", "<header>"],
  },
];

export const CSS_PROPERTIES: CssPropertyItem[] = [
  {
    name: "display",
    category: "Layout",
    syntax:
      "display: block | inline | flex | grid | none | inline-block | contents;",
    acceptedValues: [
      "flex",
      "grid",
      "block",
      "inline",
      "inline-block",
      "none",
      "inline-flex",
      "inline-grid",
    ],
    initialValue: "inline",
    inherited: false,
    description:
      "Sets whether an element is treated as a block or inline box and the layout used for its children, such as grid or flex.",
    codeExample: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}`,
    interactiveType: "flexbox",
    commonMistakes:
      "Setting display: flex without understanding how flex-direction and flex-shrink alter item sizing.",
    browserSupport:
      "Universal (Flex & Grid supported in 99%+ global browsers).",
    relatedProperties: [
      "flex-direction",
      "justify-content",
      "grid-template-columns",
    ],
  },
  {
    name: "grid-template-columns",
    category: "Grid & Flex",
    syntax:
      "grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) | 1fr 2fr 1fr | 200px auto;",
    acceptedValues: [
      "repeat(auto-fit, minmax(250px, 1fr))",
      "repeat(3, 1fr)",
      "200px 1fr",
      "1fr 1fr 1fr",
    ],
    initialValue: "none",
    inherited: false,
    description:
      "Defines the line names and track sizing functions of the grid columns in a CSS Grid container.",
    codeExample: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}`,
    interactiveType: "grid",
    commonMistakes:
      "Confusing auto-fill with auto-fit. auto-fit stretches existing tracks while auto-fill preserves empty tracks.",
    browserSupport:
      "Full support across all browsers (Chrome 57+, Safari 10.1+, Firefox 52+, Edge 16+).",
    relatedProperties: ["grid-template-rows", "gap", "grid-column"],
  },
  {
    name: "position",
    category: "Layout",
    syntax: "position: static | relative | absolute | fixed | sticky;",
    acceptedValues: ["static", "relative", "absolute", "fixed", "sticky"],
    initialValue: "static",
    inherited: false,
    description:
      "Sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location.",
    codeExample: `.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
}`,
    commonMistakes:
      "Trying to use position: sticky when an ancestor has overflow: hidden, which breaks sticky anchoring.",
    browserSupport: "Universal modern browser support.",
    relatedProperties: ["top", "left", "z-index", "inset"],
  },
  {
    name: "box-shadow",
    category: "Colors & Effects",
    syntax: "box-shadow: none | [inset? && <length>{2,4} && <color>?]#",
    acceptedValues: [
      "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
      "0 1px 3px rgba(0,0,0,0.1)",
      "inset 0 2px 4px rgba(0,0,0,0.06)",
    ],
    initialValue: "none",
    inherited: false,
    description:
      "Adds shadow effects around an element frame. You can set multiple effects separated by commas.",
    codeExample: `.elevated-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 
              0 2px 4px -2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
}`,
    interactiveType: "shadow",
    commonMistakes:
      "Over-saturating shadows or using pure black #000 at high opacity instead of subtle translucent layers.",
    browserSupport: "Universal support in all browsers.",
    relatedProperties: ["border", "filter", "drop-shadow()"],
  },
  {
    name: "clamp()",
    category: "Modern CSS",
    syntax: "font-size: clamp(min, preferred, max);",
    acceptedValues: ["clamp(1.5rem, 4vw, 3rem)", "clamp(300px, 50%, 800px)"],
    initialValue: "N/A (Function)",
    inherited: false,
    description:
      "Clamps a value between an upper and lower bound, enabling fluid typography and responsive layouts without endless media queries.",
    codeExample: `.hero-title {
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
  line-height: 1.1;
  text-wrap: balance;
}`,
    commonMistakes:
      "Forgetting units on zero values or putting the min value higher than the max value.",
    browserSupport: "Chrome 79+, Safari 13.1+, Firefox 75+, Edge 79+.",
    relatedProperties: ["min()", "max()", "calc()"],
  },
];

export const LANGUAGES: LanguageGuide[] = [
  {
    id: "javascript",
    name: "JavaScript",
    iconName: "FileCode2",
    summary:
      "The universal language of the web. High-level, single-threaded, event-driven runtime with prototype-based object orientation.",
    ecosystem: "Node.js, Deno, Bun, Chromium V8, React, Vue, Next.js",
    difficulty: "Beginner",
    paradigm: "Multi-paradigm: Event-driven, Functional, Prototype-based OOP",
    setupGuide:
      "Node.js LTS (v22+) or run directly inside any browser DevTools console.",
    topics: [
      {
        title: "Modern Asynchronous Control (async/await & Promise.allSettled)",
        code: `async function fetchUserData(userId: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(\`/api/users/\${userId}\`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('Network request timed out');
    }
    throw error;
  }
}`,
        explanation:
          "Always use AbortController to guard against hanging network requests and handle non-2xx responses explicitly.",
      },
      {
        title: "Destructuring, Optional Chaining & Nullish Coalescing",
        code: `const config = {
  theme: 'dark',
  metrics: {
    refreshRate: 0 // falsy value!
  }
};

// Nullish coalescing (??) preserves 0 and empty strings:
const rate = config.metrics?.refreshRate ?? 30; // 0, not 30!
const label = config.labels?.[0]?.toUpperCase() ?? 'DEFAULT';`,
        explanation:
          'Prefer ?? over || when 0, false, or "" are valid values. Optional chaining (?.) safely halts evaluation if null/undefined.',
      },
    ],
    pitfalls: [
      {
        error: "Treating 0 as falsy with || operator",
        solution:
          "Use ?? (nullish coalescing) so numeric zero or empty strings are not erroneously replaced by default fallback values.",
      },
      {
        error:
          "Floating point precision issues (0.1 + 0.2 === 0.30000000000000004)",
        solution:
          "For currency or exact figures, store values in smallest integer units (e.g. cents) or use BigInt / decimal libraries.",
      },
    ],
    bestPractices: [
      "Always enable strict mode or write in TypeScript.",
      "Prefer const by default; only use let when reassigning.",
      "Avoid mutating arrays in-place; use toSorted(), toReversed(), or map()/filter().",
    ],
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconName: "Code",
    summary:
      "A strongly typed superset of JavaScript that compiles to plain JavaScript, providing compile-time type safety and world-class IDE tooling.",
    ecosystem: "tsproject, Vite, Next.js, tsx, Node.js 22+ type stripping",
    difficulty: "Intermediate",
    paradigm: "Static Typing, Structural Type System, Generics",
    setupGuide: "npm install -D typescript @types/node && npx tsc --init",
    topics: [
      {
        title: "Discriminated Unions & Exhaustiveness Checking",
        code: `type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: number };

function handleApiResponse<T>(res: Result<T>) {
  if (res.success) {
    // TypeScript automatically narrows res to { success: true; data: T }
    console.log('Received:', res.data);
  } else {
    // TypeScript narrows to error branch
    console.error(\`Failed [\${res.code}]: \${res.error}\`);
  }
}`,
        explanation:
          "Discriminated unions use a common literal tag property (success) to enable safe narrowing without type casting.",
      },
    ],
    pitfalls: [
      {
        error: 'Using "any" instead of "unknown" for untyped values',
        solution:
          "Use unknown when type is uncertain, and validate with type guards or schema parsers (like Zod) before accessing properties.",
      },
    ],
    bestPractices: [
      'Enable "strict": true in tsconfig.json.',
      "Use utility types (Pick, Omit, Partial, Record) to keep models DRY.",
      "Prefer type aliases for unions/tuples, and interfaces for extensible object contracts.",
    ],
    docsUrl: "https://www.typescriptlang.org/docs/",
  },
  {
    id: "python",
    name: "Python",
    iconName: "Terminal",
    summary:
      "An interpreted, high-level, general-purpose language with emphasis on code readability, dynamic typing, and massive data & web ecosystems.",
    ecosystem: "FastAPI, Django, Flask, PyTorch, Pandas, NumPy, Poetry, uv",
    difficulty: "Beginner",
    paradigm:
      "Multi-paradigm: Object-Oriented, Imperative, Functional, Procedural",
    setupGuide:
      "Python 3.12+ via pyenv or official installer. Use uv or venv for virtual environments.",
    topics: [
      {
        title: "List Comprehensions & Generator Expressions",
        code: `# Eager memory list comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Lazy generator expression (streams items one by one)
def stream_large_dataset(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                yield line.strip().lower()`,
        explanation:
          "Generators use yield to stream data lazily, preventing high memory spikes when processing large files.",
      },
    ],
    pitfalls: [
      {
        error:
          "Mutable default arguments in functions (def add(item, items=[]))",
        solution:
          "Never use mutable defaults. Set default to None: def add(item, items=None): items = items if items is not None else [].",
      },
    ],
    bestPractices: [
      "Format code with ruff or black.",
      "Use type hints (PEP 484) and run mypy or pyright.",
      'Always use context managers ("with" statement) for file and network handles.',
    ],
    docsUrl: "https://docs.python.org/3/",
  },
  {
    id: "postgresql",
    name: "SQL & PostgreSQL",
    iconName: "Database",
    summary:
      "The world's most advanced open source relational database. ACID-compliant, extensible, with rich JSON, vector, and full-text indexing.",
    ecosystem: "PostgreSQL 16+, pgvector, Drizzle ORM, Prisma, PostGIS",
    difficulty: "Intermediate",
    paradigm: "Declarative, Relational, Set-based operations",
    setupGuide:
      "Local Docker container: docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16-alpine",
    topics: [
      {
        title: "Common Table Expressions (CTEs) & Window Functions",
        code: `WITH ranked_articles AS (
  SELECT 
    id, 
    title, 
    category_id, 
    views,
    ROW_NUMBER() OVER (
      PARTITION BY category_id 
      ORDER BY views DESC
    ) as rank_in_cat
  FROM articles
  WHERE published_at IS NOT NULL
)
SELECT id, title, category_id, views
FROM ranked_articles
WHERE rank_in_cat <= 3;`,
        explanation:
          "Window functions calculate values across a set of table rows related to the current row without collapsing the dataset like GROUP BY.",
      },
    ],
    pitfalls: [
      {
        error: "SELECT * queries in production web routes",
        solution:
          "Always explicitly select only the required columns to minimize network I/O, utilize covering indexes, and prevent schema leaks.",
      },
    ],
    bestPractices: [
      "Index foreign keys and frequent WHERE/ORDER BY columns.",
      "Use EXPLAIN (ANALYZE, BUFFERS) to verify query plan efficiency.",
      "Use transactions (BEGIN; ... COMMIT;) for multi-table mutations.",
    ],
    docsUrl: "https://www.postgresql.org/docs/",
  },
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "snip_1",
    title: "TypeScript Debounce Utility with Immediate Option",
    description:
      "A production-grade debounce implementation that limits execution frequency of rapid events like search inputs or window resizing.",
    language: "typescript",
    tags: ["Utilities", "TypeScript", "Performance", "Events"],
    difficulty: "Intermediate",
    author: "Elena Rostova",
    date: "Feb 2025",
    likes: 142,
    copies: 388,
    explanation:
      "Uses TypeScript generics to preserve function parameter types and return type signature while managing a timer reference.",
    code: `export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;
    const callNow = immediate && !timeout;

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}`,
  },
  {
    id: "snip_2",
    title: "CSS Fluid Bento Grid with Container Queries",
    description:
      "A modern, responsive card layout that automatically adjusts column distribution based on container width rather than viewport size.",
    language: "css",
    tags: ["CSS", "Responsive", "Grid", "Modern CSS"],
    difficulty: "Beginner",
    author: "DevBase Team",
    date: "Jan 2025",
    likes: 215,
    copies: 512,
    explanation:
      "Employs CSS container-type and minmax with 1fr to achieve self-adapting modularity across any parent container width.",
    code: `.bento-wrapper {
  container-type: inline-size;
  container-name: bento-board;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
}

/* Switches to 2 columns once parent exceeds 600px */
@container bento-board (min-width: 600px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-featured {
    grid-column: span 2;
  }
}

/* Switches to 3 columns once parent exceeds 980px */
@container bento-board (min-width: 980px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
  },
  {
    id: "snip_3",
    title: "Reliable Fetch with AbortController & Exponential Backoff",
    description:
      "Resilient client-side HTTP request wrapper that retries on network failures or 503 errors with exponential backoff.",
    language: "javascript",
    tags: ["Network", "API", "JavaScript", "Resilience"],
    difficulty: "Advanced",
    author: "Elena Rostova",
    date: "Feb 2025",
    likes: 189,
    copies: 420,
    explanation:
      "Guarantees that flaky network connections don't leave users hanging, while backing off to prevent server hammering.",
    code: `async function fetchWithRetry(url, options = {}, retries = 3, backoff = 500) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout || 8000);
    
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);

    if (!res.ok && res.status >= 500 && retries > 0) {
      throw new Error(\`Server error \${res.status}\`);
    }
    return res;
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(resolve => setTimeout(resolve, backoff));
    return fetchWithRetry(url, options, retries - 1, backoff * 2);
  }
}`,
  },
  {
    id: "snip_4",
    title: "Secure Password Hashing in Modern PHP 8.3+",
    description:
      "Best-practice credential hashing using Argon2id with memory cost and time cost validation.",
    language: "php",
    tags: ["PHP", "Security", "Authentication", "Backend"],
    difficulty: "Intermediate",
    author: "Marcus Vance",
    date: "Dec 2024",
    likes: 98,
    copies: 240,
    explanation:
      "Uses PHP native password_hash with PASSWORD_ARGON2ID and password_verify to protect against GPU brute-force attacks.",
    code: `<?php
declare(strict_types=1);

final class PasswordService
{
    public static function hash(string $plainPassword): string
    {
        return password_hash($plainPassword, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536, // 64 MB
            'time_cost'   => 4,
            'threads'     => 1,
        ]);
    }

    public static function verify(string $plainPassword, string $hash): bool
    {
        return password_verify($plainPassword, $hash);
    }
}`,
  },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "path_1",
    title: "HTML5 & Semantic Web Foundations",
    description:
      "Master clean, accessible, standards-compliant HTML. Learn document outline, modern semantic tags, forms, and accessibility landmarks.",
    audience: "Beginners & developers transitioning to modern web standards",
    duration: "4 Hours · 4 Lessons",
    difficulty: "Beginner",
    category: "Web Foundations",
    lessons: [
      {
        id: "les_html_1",
        title: "01. Document Structure & The Modern Viewport",
        readTime: "15 min",
        summary:
          "Understand doctypes, html lang tags, charset UTF-8, and modern viewport meta tag configurations.",
        content: `HTML documents are organized hierarchies starting with the <!doctype html> declaration. The language attribute on the root <html> element is essential for screen reader voice synthesis and translation tools.

The viewport meta tag ensures mobile browsers do not default to rendering a desktop 980px viewport and zooming out.`,
        codeExample: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accessible Web Page</title>
  </head>
  <body>
    <h1>Semantic Landmark Hierarchy</h1>
  </body>
</html>`,
        keyTakeaways: [
          "Always specify the lang attribute on <html>.",
          'Always include <meta name="viewport" content="width=device-width, initial-scale=1.0" />.',
          "UTF-8 is the standard encoding for modern web pages.",
        ],
        practiceTask:
          "Inspect any webpage header and verify that the charset, viewport, and lang attributes are present.",
      },
      {
        id: "les_html_2",
        title: "02. Semantic Landmarks & Screen Reader Navigation",
        readTime: "20 min",
        summary:
          "Explore <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.",
        content: `Screen reader users frequently navigate pages using landmark regions. Replacing generic <div> wrappers with landmark elements allows assistive technologies to skip navigation directly to primary content.`,
        codeExample: `<header>
  <a href="/" class="logo">Brand</a>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>
<main id="main-content">
  <article>
    <h2>Introduction</h2>
  </article>
</main>
<footer>
  <p>&copy; 2025 DevBase</p>
</footer>`,
        keyTakeaways: [
          "Use exactly one <main> landmark per document.",
          "Provide aria-label when multiple <nav> elements exist on the same page.",
          "Articles represent distributable content; sections group related subsections.",
        ],
      },
      {
        id: "les_html_3",
        title: "03. Modern Forms, Inputs, and Validation",
        readTime: "25 min",
        summary:
          "Building accessible forms with explicit label association, constraint validation, and custom styling.",
        content: `Forms are the primary interactive communication channel on the web. Proper input types (email, tel, url, number) trigger optimized software keyboards on mobile devices and provide built-in validation.`,
        codeExample: `<form action="/submit" method="POST">
  <div>
    <label for="full-name">Full Name</label>
    <input type="text" id="full-name" name="name" required minlength="2" />
  </div>
  <div>
    <label for="email-addr">Email Address</label>
    <input type="email" id="email-addr" name="email" required />
  </div>
  <button type="submit">Complete Registration</button>
</form>`,
        keyTakeaways: [
          'Every input must have an associated <label for="id">.',
          'Use inputmode="numeric" or type="email" to optimize mobile keyboards.',
          "Use required, pattern, and minlength for declarative baseline validation.",
        ],
      },
      {
        id: "les_html_4",
        title: "04. Dialog, Details & Native Interactive Components",
        readTime: "20 min",
        summary:
          "Master the native <dialog> element for modals and <details>/<summary> for accessible disclosures.",
        content: `Before HTML5.2, creating a modal required dozens of lines of custom JavaScript to trap keyboard focus, manage Esc dismissal, and toggle aria-hidden. The native <dialog> element solves this with showModal() and native top-layer rendering.`,
        codeExample: `<dialog id="settings-dialog">
  <form method="dialog">
    <h3>User Settings</h3>
    <button type="submit">Close</button>
  </form>
</dialog>`,
        keyTakeaways: [
          "dialog.showModal() manages inert background accessibility natively.",
          'Forms inside dialogs with method="dialog" automatically close the dialog on submit.',
        ],
      },
    ],
  },
  {
    id: "path_2",
    title: "Modern CSS & Responsive Systems",
    description:
      "Learn modern layout engineering: Flexbox, CSS Grid, container queries, logical properties, and fluid typography.",
    audience: "Frontend developers wanting to master modern layout math",
    duration: "6 Hours · 5 Lessons",
    difficulty: "Intermediate",
    category: "Styling & Design",
    lessons: [
      {
        id: "les_css_1",
        title: "01. Flexbox vs Grid: Mental Models",
        readTime: "20 min",
        summary:
          "When to choose 1-dimensional Flexbox versus 2-dimensional CSS Grid.",
        content: `Flexbox is content-first and operates on a single axis (row or column). CSS Grid is layout-first and controls both rows and columns simultaneously. Choose Flexbox for navigation bars, button rows, and component alignment; choose Grid for overall page layouts and media galleries.`,
        codeExample: `/* 1D Alignment (Flexbox) */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 2D Layout (Grid) */
.dashboard-grid {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-template-rows: auto 1fr;
}`,
        keyTakeaways: [
          "Flexbox handles 1-dimensional distribution.",
          "CSS Grid orchestrates 2-dimensional spatial rows and columns.",
          "Use gap property on both flex and grid containers.",
        ],
      },
      {
        id: "les_css_2",
        title: "02. Container Queries: Component-Centric Design",
        readTime: "25 min",
        summary:
          "Transitioning from viewport media queries (@media) to container queries (@container).",
        content: `Viewport media queries tightly couple a component to window width. Container queries empower a card to reshape itself based on its direct parent container width, whether it sits in a narrow sidebar or a wide hero banner.`,
        codeExample: `.card-container {
  container-type: inline-size;
}

@container (min-width: 450px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}`,
        keyTakeaways: [
          "container-type: inline-size enables width-based component queries.",
          "Components become truly modular and context-independent.",
        ],
      },
    ],
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art_1",
    slug: "architecting-modern-fullstack-web-applications",
    title:
      "Architecting Modern Full-Stack Web Applications with Zero-Slop Visual Systems",
    subtitle:
      "A pragmatic guide to combining typed contracts, responsive layouts, and restrained visual hierarchy.",
    excerpt:
      "Modern web engineering demands both rigorous backend fundamentals and thoughtful design craftsmanship. Learn how to structure applications that scale cleanly without visual fatigue.",
    content: `Building exceptional web software requires balancing architecture, performance, accessibility, and visual dignity. In this deep dive, we explore how to construct reliable full-stack applications that respect the user's attention.

## 1. The Typographic and Spatial Math

A polished interface doesn't happen by accident. It is governed by mathematical relationships:

- **60-30-10 Color Allocation**: Keep 60% of your canvas in quiet neutrals, 30% in structural surfaces, and reserve your 10% accent color strictly for high-intent interactive controls.
- **Outer vs Inner Padding**: Outer container padding must always equal or exceed the inner gap between children. If cards are separated by a 16px gap, the outer container must have at least 16px padding.
- **Zero-Pill Discipline**: Avoid wrapping routine metadata (dates, tags, read times) in candy-colored pill badges. Use clean, unboxed text separated by quiet middle dots (·).

## 2. Type Safety from Database to Client

When designing REST or RPC endpoints, guarantee end-to-end type safety:

\`\`\`typescript
export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}
\`\`\`

By declaring explicit schema models and validating payloads at boundaries, you eliminate runtime undefined errors before they reach your rendering layer.

## 3. Resilience and Graceful Degradation

Always provide resilient fallbacks for images, network delays, and partial API failures. No user should ever be met with an unstyled broken image frame or an unrecoverable dead end.`,
    coverImage: articleAiImage,
    author: {
      name: "Elena Rostova",
      role: "Staff Systems Engineer",
      avatar: authorElenaAvatar,
    },
    category: "Web Development",
    tags: ["Architecture", "TypeScript", "Design Systems", "Full-Stack"],
    publishedAt: "Oct 14, 2026",
    readTimeMinutes: 7,
    views: 3420,
    likes: 218,
    status: "published",
    tableOfContents: [
      {
        id: "1-the-typographic-and-spatial-math",
        title: "1. The Typographic and Spatial Math",
        level: 2,
      },
      {
        id: "2-type-safety-from-database-to-client",
        title: "2. Type Safety from Database to Client",
        level: 2,
      },
      {
        id: "3-resilience-and-graceful-degradation",
        title: "3. Resilience and Graceful Degradation",
        level: 2,
      },
    ],
  },
  {
    id: "art_2",
    slug: "mastering-relational-databases-high-throughput-queries",
    title:
      "Mastering Relational Databases: Indexes, Joins, and High-Throughput Queries",
    subtitle:
      "From B-tree indexes to recursive CTEs, understand how database query planners execute in production.",
    excerpt:
      "Demystifying SQL query planners. Learn how compound indexes work, how to identify full table scans, and how to write efficient analytical queries in PostgreSQL.",
    content: `Relational databases are the backbone of reliable software. Despite the popularity of document stores, PostgreSQL and MySQL remain the unmatched industry standards for transactional consistency.

## 1. How B-Tree Indexes Work

When you query an unindexed column, the database engine must inspect every page on disk in a sequential scan ($O(N)$ complexity). A B-tree index structures keys in balanced multi-level trees, cutting lookups down to $O(\\log N)$.

\`\`\`sql
-- Efficient compound index covering filter and sort:
CREATE INDEX idx_articles_status_published 
ON articles (status, published_at DESC);
\`\`\`

Order matters in compound indexes. Always place exact equality filter columns first, followed by range or sort columns.

## 2. Avoiding the N+1 Query Trap

The N+1 problem occurs when an application executes one initial query to fetch parent records, followed by N additional queries to fetch associated children.

In modern applications, solve this with eager loading (JOINs) or batching:

\`\`\`sql
-- Single aggregated join query
SELECT 
  a.id, 
  a.title, 
  json_agg(t.name) AS tags
FROM articles a
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
GROUP BY a.id, a.title;
\`\`\`

## 3. Conclusion

Always run EXPLAIN (ANALYZE, BUFFERS) before deploying critical queries to production to verify index usage and buffer cache hits.`,
    coverImage: articleFullstackImage,
    author: {
      name: "Marcus Vance",
      role: "Database Reliability Engineer",
      avatar: authorElenaAvatar,
    },
    category: "Databases",
    tags: ["PostgreSQL", "SQL", "Performance", "Backend"],
    publishedAt: "Oct 02, 2026",
    readTimeMinutes: 9,
    views: 4890,
    likes: 312,
    status: "published",
    tableOfContents: [
      {
        id: "1-how-b-tree-indexes-work",
        title: "1. How B-Tree Indexes Work",
        level: 2,
      },
      {
        id: "2-avoiding-the-n1-query-trap",
        title: "2. Avoiding the N+1 Query Trap",
        level: 2,
      },
      { id: "3-conclusion", title: "3. Conclusion", level: 2 },
    ],
  },
];

export const INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: "com_1",
    articleId: "art_1",
    authorName: "David Chen",
    authorEmail: "david@codelab.dev",
    authorAvatar: "",
    content:
      "The section on compound indexes and 60-30-10 color allocation is spot on. Applying container queries to modular cards made our design system significantly cleaner.",
    createdAt: "2 days ago",
    status: "approved",
  },
  {
    id: "com_2",
    articleId: "art_1",
    authorName: "Sarah Jenkins",
    authorEmail: "sarah.j@techlead.co",
    authorAvatar: "",
    content:
      "Would love a follow-up article comparing Bun and Node.js 22 built-in type stripping in production container pipelines!",
    createdAt: "1 day ago",
    status: "approved",
  },
  {
    id: "com_3",
    articleId: "art_2",
    authorName: "Alex Thorne",
    authorEmail: "alex@crypto-infra.io",
    authorAvatar: "",
    content:
      "Great breakdown of B-tree compound indexing order. Putting equality filters first is a classic tip that junior devs often overlook.",
    createdAt: "3 hours ago",
    status: "approved",
  },
];

export const CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg_1",
    name: "Julian Vance",
    email: "julian@frontendguild.org",
    subject: "Proposing a New Learning Path on WebAssembly & Rust",
    message:
      "Hello DevBase Team! Our engineering guild would love to contribute a structured 6-lesson track on WebAssembly and Rust for high-performance audio/video web processing.",
    date: "Oct 15, 2026",
    status: "new",
  },
  {
    id: "msg_2",
    name: "Amina Al-Mansoor",
    email: "amina@edutech.io",
    subject: "Feedback on Accessible Dialog Reference",
    message:
      "Thank you for the detailed HTML <dialog> documentation! The reminder about dialog.showModal() versus direct CSS display property saved our team hours of debugging.",
    date: "Oct 12, 2026",
    status: "replied",
  },
];

export const ADMIN_LOGS: AdminLog[] = [
  {
    id: "log_1",
    action: "ARTICLE_PUBLISHED",
    actor: "Elena Rostova (Admin)",
    details:
      'Published article "Architecting Modern Full-Stack Web Applications"',
    timestamp: "2026-10-14 14:32:10",
  },
  {
    id: "log_2",
    action: "COMMENT_APPROVED",
    actor: "Elena Rostova (Admin)",
    details: "Approved comment #com_1 by David Chen on article art_1",
    timestamp: "2026-10-14 16:05:44",
  },
  {
    id: "log_3",
    action: "SNIPPET_CREATED",
    actor: "Elena Rostova (Admin)",
    details: "Added code snippet: TypeScript Debounce Utility",
    timestamp: "2026-10-15 09:12:00",
  },
];

export const FAQS = [
  {
    question: "What is DevBase and who is it designed for?",
    answer:
      "DevBase is an open, comprehensive developer education platform tailored for beginner to intermediate developers, engineering students, and software practitioners looking for trustworthy documentation, practical code snippets, structured learning paths, and interactive playgrounds.",
  },
  {
    question: "Are the HTML and CSS reference specifications up to date?",
    answer:
      "Yes. All element semantics, CSS properties, browser compatibility tables, and accessibility notes are verified against modern W3C/WHATWG specifications and evergreen browser implementations.",
  },
  {
    question: "Can I bookmark articles, save snippets, and track my progress?",
    answer:
      "Yes! DevBase includes a comprehensive User Dashboard where you can save bookmarks, organize snippets into custom collections, track completed lessons across learning paths, and customize your developer preferences.",
  },
  {
    question: "How does the Administration panel work?",
    answer:
      "DevBase includes a full CMS administration suite with role-based access control. You can switch roles (Guest, Developer, Contributor, Author, Admin) right from the top navigation to test all permission gates, publish articles, moderate comments, and inspect audit logs.",
  },
  {
    question: "Is DevBase accessible and keyboard-navigable?",
    answer:
      "DevBase follows WCAG 2.2 AA standards with visible focus indicators, screen reader landmarks, high-contrast themes, and global keyboard shortcuts (such as Cmd/Ctrl+K for global search).",
  },
];
