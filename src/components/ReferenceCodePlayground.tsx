import React, { useMemo, useState } from 'react';
import { Check, Clipboard, RotateCcw } from 'lucide-react';

interface ReferenceCodePlaygroundProps {
  language: 'html' | 'css';
  code: string;
  title: string;
}

type PreviewSize = 'desktop' | 'tablet' | 'mobile';

const previewWidths: Record<PreviewSize, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const highlightCode = (value: string, language: 'html' | 'css') => {
  const tokenPattern =
    /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|<\/?[\w-]+|#[\da-fA-F]{3,8}\b|--[\w-]+|[\w-]+(?=\s*:)|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|&(?:\w+|#\d+);|\/?>/g;
  const fragments: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      fragments.push(value.slice(lastIndex, match.index));
    }
    const token = match[0];
    const colorClass =
      token.startsWith('<!--') || token.startsWith('/*')
        ? 'text-slate-500'
        : token.startsWith('<') || token === '>' || token === '/>'
          ? 'text-sky-300'
          : token.startsWith('#') || token.startsWith('--')
            ? 'text-amber-300'
            : token.startsWith('"') || token.startsWith("'") || token.startsWith('&')
              ? 'text-emerald-300'
              : language === 'css'
                ? 'text-indigo-300'
                : 'text-violet-300';
    fragments.push(
      <span className={colorClass} key={`${match.index}-${token}`}>
        {token}
      </span>,
    );
    lastIndex = tokenPattern.lastIndex;
  }
  if (lastIndex < value.length) {
    fragments.push(value.slice(lastIndex));
  }
  return fragments;
};

const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'; form-action 'none'; object-src 'none'; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:">`;

const makePreview = (language: 'html' | 'css', code: string) => {
  if (language === 'html') {
    const document = code.trim().startsWith('<!doctype') || code.trim().startsWith('<!DOCTYPE');
    if (document) {
      const withViewport = /name=["']viewport["']/i.test(code)
        ? code
        : code.replace(/<head([^>]*)>/i, '<head$1><meta name="viewport" content="width=device-width, initial-scale=1">');
      if (/<head(?:\s[^>]*)?>/i.test(withViewport)) {
        return withViewport.replace(/<head([^>]*)>/i, `<head$1>${csp}`);
      }
      if (/<html(?:\s[^>]*)?>/i.test(withViewport)) {
        return withViewport.replace(/<html([^>]*)>/i, `<html$1><head><meta name="viewport" content="width=device-width, initial-scale=1">${csp}</head>`);
      }
      return `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1">${csp}</head><body>${withViewport}</body></html>`;
    }
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${csp}<style>
      body { margin: 0; padding: 1.25rem; color: #172033; background: #fff; font: 16px/1.5 system-ui, sans-serif; }
      img, video { max-width: 100%; height: auto; }
      table { border-collapse: collapse; } th, td { padding: .5rem; border: 1px solid #cbd5e1; }
      a { color: #4338ca; } :focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
    </style></head><body>${code}</body></html>`;
  }

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${csp}<style>
    body { margin: 0; padding: 1.25rem; color: #172033; background: #f8fafc; font: 16px/1.5 system-ui, sans-serif; }
    .demo, .card, .panel, .container, .content, .page, .toolbar, .cards, .card-grid { padding: 1rem; }
    .demo, .card, .panel { background: #fff; border: 1px solid #cbd5e1; border-radius: .75rem; }
    h1 { margin-block: 0 .5rem; font-size: 1.5rem; } p { max-width: 65ch; }
    button { padding: .5rem .75rem; font: inherit; }
    ${code}
  </style></head><body>
    <main class="demo card panel container content page toolbar cards card-grid">
      <h1>Live CSS preview</h1>
      <p>Change the example to see how the styles affect this sample content.</p>
      <button type="button">Example button</button>
      <ul><li>First item</li><li>Second item</li></ul>
    </main>
  </body></html>`;
};

export const ReferenceCodePlayground: React.FC<ReferenceCodePlaygroundProps> = ({
  language,
  code,
  title,
}) => {
  const [editedCode, setEditedCode] = useState(code);
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');
  const [message, setMessage] = useState('');
  const srcDoc = useMemo(() => makePreview(language, editedCode), [language, editedCode]);
  const highlightedCode = useMemo(
    () => highlightCode(editedCode.slice(0, 3000), language),
    [editedCode, language],
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(editedCode);
      setMessage('Code copied.');
    } catch (error) {
      console.error('Unable to copy reference code.', error);
      setMessage('Copy failed. Select the code and copy it manually.');
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6" aria-label={`${title} interactive example`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Editable {language.toUpperCase()} example</h3>
          <p className="mt-1 text-xs text-slate-400">Changes render in an isolated preview; scripts and external requests are disabled.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={copyCode} type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700">
            <Clipboard className="h-3.5 w-3.5" /> Copy
          </button>
          <button onClick={() => { setEditedCode(code); setMessage('Example reset.'); }} type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      <label className="block">
        <span className="sr-only">Edit {language.toUpperCase()} example for {title}</span>
        <textarea
          value={editedCode}
          onChange={(event) => setEditedCode(event.target.value)}
          spellCheck={false}
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
      </label>

      <details className="rounded-lg border border-slate-800 bg-slate-950">
        <summary className="cursor-pointer px-4 py-2 text-xs font-medium text-slate-300">Syntax-highlighted source</summary>
        <pre className="max-h-56 overflow-auto px-4 pb-4 font-mono text-xs leading-relaxed" aria-label={`${language.toUpperCase()} syntax highlighted example`}>
          <code>{highlightedCode}{editedCode.length > 3000 ? '\n… (highlight preview limited to 3,000 characters)' : ''}</code>
        </pre>
      </details>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rendered preview</h4>
          <div className="flex gap-1" role="group" aria-label="Preview viewport size">
            {(['desktop', 'tablet', 'mobile'] as const).map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={previewSize === size}
                onClick={() => setPreviewSize(size)}
                className={`rounded-md px-2.5 py-1.5 text-xs capitalize ${previewSize === size ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800 p-2">
          <iframe
            title={`${title} ${previewSize} live preview`}
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={srcDoc}
            className="mx-auto block min-h-[240px] rounded-lg border-0 bg-white"
            style={{ width: `min(${previewWidths[previewSize]}, 100%)` }}
          />
        </div>
      </div>
      {message && <p className="inline-flex items-center gap-1.5 text-xs text-emerald-400" role="status"><Check className="h-3.5 w-3.5" />{message}</p>}
    </section>
  );
};
