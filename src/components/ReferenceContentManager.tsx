import React, { FormEvent, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useDevBase } from '../context/DevBaseContext';
import { CssPropertyItem, HtmlElementItem } from '../types';

const htmlCategories: HtmlElementItem['category'][] = [
  'Structure', 'Text', 'Forms', 'Media', 'Tables', 'Semantic', 'Interactive', 'Deprecated', 'Accessibility', 'Metadata',
];
const cssCategories: CssPropertyItem['category'][] = [
  'Layout', 'Grid & Flex', 'Box Model', 'Typography', 'Colors & Effects', 'Animation', 'Modern CSS', 'Selectors & Cascade', 'Backgrounds', 'Responsive Design', 'Accessibility',
];
const fieldClass = 'w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none';
const labelClass = 'block space-y-1.5 text-xs font-medium text-slate-300';

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const formatAttributes = (attributes: HtmlElementItem['attributes']) =>
  attributes.map((attribute) => `${attribute.name} | ${attribute.type} | ${attribute.description}${attribute.required ? ' | required' : ''}`).join('\n');
const parseAttributes = (value: string): HtmlElementItem['attributes'] =>
  value.split('\n').map((line) => line.split('|').map((part) => part.trim())).filter(([name, , description]) => Boolean(name && description)).map(([name, type, description, required]) => ({
    name,
    type: type || 'Text',
    description,
    required: required?.toLowerCase() === 'required',
  }));

const newHtmlEntry = (): HtmlElementItem => ({
  tag: '',
  name: '',
  category: 'Structure',
  summary: '',
  syntax: '',
  closingTag: 'Required',
  attributes: [],
  contentModel: 'Flow content.',
  accessibilityTips: '',
  commonMistakes: '',
  bestPractices: '',
  codeExample: '',
  relatedTags: [],
  browserSupport: 'Supported by current evergreen browsers.',
  difficulty: 'Beginner',
  useCases: [],
  practiceExercise: '',
  status: 'draft',
});

const newCssEntry = (): CssPropertyItem => ({
  name: '',
  category: 'Modern CSS',
  syntax: '',
  acceptedValues: [],
  initialValue: 'Depends on the property',
  inherited: false,
  description: '',
  codeExample: '',
  commonMistakes: '',
  browserSupport: 'Supported by current evergreen browsers.',
  relatedProperties: [],
  difficulty: 'Beginner',
  useCases: [],
  practiceExercise: '',
  valueEffect: '',
  status: 'draft',
});

export const ReferenceContentManager: React.FC = () => {
  const {
    htmlElements, cssProperties,
    addHtmlElement, updateHtmlElement, deleteHtmlElement,
    addCssProperty, updateCssProperty, deleteCssProperty,
    referenceStorageError,
  } = useDevBase();
  const [type, setType] = useState<'html' | 'css'>('html');
  const [htmlDraft, setHtmlDraft] = useState<HtmlElementItem | null>(null);
  const [cssDraft, setCssDraft] = useState<CssPropertyItem | null>(null);
  const [htmlOriginalTag, setHtmlOriginalTag] = useState<string | null>(null);
  const [cssOriginalName, setCssOriginalName] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const sortedHtml = useMemo(() => [...htmlElements].sort((a, b) => a.name.localeCompare(b.name)), [htmlElements]);
  const sortedCss = useMemo(() => [...cssProperties].sort((a, b) => a.name.localeCompare(b.name)), [cssProperties]);

  const beginHtml = (entry = newHtmlEntry()) => {
    setHtmlOriginalTag(htmlElements.some((current) => current.tag === entry.tag) ? entry.tag : null);
    setHtmlDraft({ ...entry, attributes: [...entry.attributes], tags: [...(entry.tags ?? [])], relatedTags: [...entry.relatedTags] });
    setCssDraft(null);
    setMessage('');
  };
  const beginCss = (entry = newCssEntry()) => {
    setCssOriginalName(cssProperties.some((current) => current.name === entry.name) ? entry.name : null);
    setCssDraft({
      ...entry,
      acceptedValues: [...entry.acceptedValues],
      relatedProperties: [...entry.relatedProperties],
      tags: [...(entry.tags ?? [])],
    });
    setHtmlDraft(null);
    setMessage('');
  };

  const saveHtml = (event: FormEvent) => {
    event.preventDefault();
    if (!htmlDraft) return;
    const tag = htmlDraft.tag.trim();
    const name = htmlDraft.name.trim();
    if (!tag || !name || !htmlDraft.codeExample.trim()) {
      setMessage('Tag, title, and code example are required.');
      return;
    }
    if (htmlOriginalTag && tag !== htmlOriginalTag) {
      setMessage('The tag key cannot be changed while editing an entry.');
      return;
    }
    if (!htmlOriginalTag && htmlElements.some((entry) => entry.tag === tag)) {
      setMessage('An HTML entry with that tag already exists.');
      return;
    }
    if (htmlDraft.status === 'published' && (
      !htmlDraft.summary.trim() || !htmlDraft.syntax.trim() || !htmlDraft.accessibilityTips.trim() ||
      !htmlDraft.commonMistakes.trim() || !htmlDraft.bestPractices.trim() ||
      !htmlDraft.practiceExercise?.trim() || !htmlDraft.useCases?.length || !htmlDraft.relatedTags.length
    )) {
      setMessage('Add a definition, syntax, accessibility guidance, common mistakes, best practices, use cases, related topics, and an exercise before publishing.');
      return;
    }
    const slug = htmlDraft.slug?.trim() || slugify(tag);
    if (htmlElements.some((entry) => entry.tag !== htmlOriginalTag && (entry.slug ?? slugify(entry.tag)) === slug)) {
      setMessage('That slug is already in use.');
      return;
    }
    const record = {
      ...htmlDraft,
      tag,
      name,
      slug,
      summary: htmlDraft.summary.trim(),
      syntax: htmlDraft.syntax.trim(),
      codeExample: htmlDraft.codeExample,
      status: htmlDraft.status ?? 'draft',
      tags: htmlDraft.tags ?? [],
      useCases: htmlDraft.useCases ?? [],
      relatedTags: htmlDraft.relatedTags ?? [],
    };
    if (htmlOriginalTag) {
      updateHtmlElement(tag, record);
      setMessage(`Updated ${tag}.`);
    } else {
      addHtmlElement(record);
      setMessage(`Created ${tag}.`);
    }
    setHtmlDraft(null);
    setHtmlOriginalTag(null);
  };

  const saveCss = (event: FormEvent) => {
    event.preventDefault();
    if (!cssDraft) return;
    const name = cssDraft.name.trim();
    if (!name || !cssDraft.codeExample.trim()) {
      setMessage('Property/topic name and code example are required.');
      return;
    }
    if (cssOriginalName && name !== cssOriginalName) {
      setMessage('The property/topic key cannot be changed while editing an entry.');
      return;
    }
    if (!cssOriginalName && cssProperties.some((entry) => entry.name === name)) {
      setMessage('A CSS entry with that name already exists.');
      return;
    }
    if (cssDraft.status === 'published' && (
      !cssDraft.description.trim() || !cssDraft.syntax.trim() || !cssDraft.acceptedValues.length ||
      !cssDraft.codeExample.trim() || !cssDraft.commonMistakes.trim() ||
      !cssDraft.practiceExercise?.trim() || !cssDraft.valueEffect?.trim() ||
      !cssDraft.useCases?.length || !cssDraft.relatedProperties.length
    )) {
      setMessage('Add a definition, syntax, values, code example, common mistakes, value effect, use cases, related topics, and an exercise before publishing.');
      return;
    }
    const slug = cssDraft.slug?.trim() || slugify(name);
    if (cssProperties.some((entry) => entry.name !== cssOriginalName && (entry.slug ?? slugify(entry.name)) === slug)) {
      setMessage('That slug is already in use.');
      return;
    }
    const record = {
      ...cssDraft,
      name,
      slug,
      description: cssDraft.description.trim(),
      syntax: cssDraft.syntax.trim(),
      status: cssDraft.status ?? 'draft',
      acceptedValues: cssDraft.acceptedValues,
      relatedProperties: cssDraft.relatedProperties,
    };
    if (cssOriginalName) {
      updateCssProperty(name, record);
      setMessage(`Updated ${name}.`);
    } else {
      addCssProperty(record);
      setMessage(`Created ${name}.`);
    }
    setCssDraft(null);
    setCssOriginalName(null);
  };

  const toggleHtmlStatus = (entry: HtmlElementItem) => {
    if (entry.status === 'draft' && (
      !entry.summary.trim() || !entry.syntax.trim() || !entry.accessibilityTips.trim() ||
      !entry.commonMistakes.trim() || !entry.bestPractices.trim() ||
      !entry.practiceExercise?.trim() || !entry.useCases?.length || !entry.relatedTags.length
    )) {
      setMessage(`Complete the required lesson fields before publishing "${entry.name}".`);
      return;
    }
    setMessage('');
    updateHtmlElement(entry.tag, { status: entry.status === 'draft' ? 'published' : 'draft' });
  };
  const toggleCssStatus = (entry: CssPropertyItem) => {
    if (entry.status === 'draft' && (
      !entry.description.trim() || !entry.syntax.trim() || !entry.acceptedValues.length ||
      !entry.codeExample.trim() || !entry.commonMistakes.trim() ||
      !entry.practiceExercise?.trim() || !entry.valueEffect?.trim() ||
      !entry.useCases?.length || !entry.relatedProperties.length
    )) {
      setMessage(`Complete the required lesson fields before publishing "${entry.name}".`);
      return;
    }
    setMessage('');
    updateCssProperty(entry.name, { status: entry.status === 'draft' ? 'published' : 'draft' });
  };

  return (
    <section className="space-y-5" aria-labelledby="reference-manager-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="reference-manager-title" className="text-lg font-bold text-white">HTML &amp; CSS reference content</h2>
          <p className="mt-1 text-xs text-slate-400">Create and maintain searchable reference entries. Changes are saved in this browser only.</p>
        </div>
        <button
          type="button"
          onClick={() => type === 'html' ? beginHtml() : beginCss()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" /> Add {type.toUpperCase()} entry
        </button>
      </div>

      {referenceStorageError && (
        <p role="alert" className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">{referenceStorageError}</p>
      )}
      {message && <p role="status" className="text-xs text-emerald-400">{message}</p>}

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {(['html', 'css'] as const).map((option) => (
          <button key={option} type="button" aria-pressed={type === option} onClick={() => setType(option)} className={`rounded-lg px-4 py-2 text-xs font-semibold ${type === option ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}>
            {option.toUpperCase()} ({option === 'html' ? htmlElements.length : cssProperties.length})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950 text-[10px] uppercase tracking-wide text-slate-500">
            <tr><th className="p-3">Name / slug</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {type === 'html' ? sortedHtml.map((entry) => (
              <tr key={entry.tag}>
                <td className="p-3"><div className="font-mono font-semibold text-indigo-300">{entry.tag}</div><div className="mt-1">{entry.name}</div><div className="mt-1 font-mono text-[10px] text-slate-500">/{entry.slug ?? slugify(entry.tag)}</div></td>
                <td className="p-3">{entry.category}</td>
                <td className="p-3"><button type="button" onClick={() => toggleHtmlStatus(entry)} className={`rounded px-2 py-1 text-[10px] uppercase ${entry.status === 'draft' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>{entry.status ?? 'published'}</button></td>
                <td className="space-x-1 p-3 text-right">
                  <button type="button" aria-label={`Edit ${entry.name}`} onClick={() => beginHtml(entry)} className="rounded p-2 text-slate-300 hover:bg-slate-800"><Pencil className="h-4 w-4" /></button>
                  <button type="button" aria-label={`Delete ${entry.name}`} onClick={() => { if (window.confirm(`Delete HTML entry "${entry.name}"?`)) deleteHtmlElement(entry.tag); }} className="rounded p-2 text-rose-300 hover:bg-slate-800"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            )) : sortedCss.map((entry) => (
              <tr key={entry.name}>
                <td className="p-3"><div className="font-mono font-semibold text-indigo-300">{entry.name}</div><div className="mt-1 font-mono text-[10px] text-slate-500">/{entry.slug ?? slugify(entry.name)}</div></td>
                <td className="p-3">{entry.category}</td>
                <td className="p-3"><button type="button" onClick={() => toggleCssStatus(entry)} className={`rounded px-2 py-1 text-[10px] uppercase ${entry.status === 'draft' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>{entry.status ?? 'published'}</button></td>
                <td className="space-x-1 p-3 text-right">
                  <button type="button" aria-label={`Edit ${entry.name}`} onClick={() => beginCss(entry)} className="rounded p-2 text-slate-300 hover:bg-slate-800"><Pencil className="h-4 w-4" /></button>
                  <button type="button" aria-label={`Delete ${entry.name}`} onClick={() => { if (window.confirm(`Delete CSS entry "${entry.name}"?`)) deleteCssProperty(entry.name); }} className="rounded p-2 text-rose-300 hover:bg-slate-800"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {htmlDraft && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="html-entry-title">
          <form onSubmit={saveHtml} className="mx-auto my-6 max-w-3xl space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <h3 id="html-entry-title" className="text-lg font-bold text-white">{htmlOriginalTag ? 'Edit HTML entry' : 'Create HTML entry'}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Tag or topic key<input required disabled={Boolean(htmlOriginalTag)} value={htmlDraft.tag} onChange={(event) => setHtmlDraft({ ...htmlDraft, tag: event.target.value })} className={fieldClass} placeholder="<picture>" /></label>
              <label className={labelClass}>Title<input required value={htmlDraft.name} onChange={(event) => setHtmlDraft({ ...htmlDraft, name: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>URL slug<input value={htmlDraft.slug ?? ''} onChange={(event) => setHtmlDraft({ ...htmlDraft, slug: event.target.value })} className={fieldClass} placeholder="generated-from-tag" /></label>
              <label className={labelClass}>Category<select value={htmlDraft.category} onChange={(event) => setHtmlDraft({ ...htmlDraft, category: event.target.value as HtmlElementItem['category'] })} className={fieldClass}>{htmlCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className={labelClass}>Difficulty<select value={htmlDraft.difficulty ?? 'Beginner'} onChange={(event) => setHtmlDraft({ ...htmlDraft, difficulty: event.target.value as HtmlElementItem['difficulty'] })} className={fieldClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
              <label className={labelClass}>Publication<select value={htmlDraft.status ?? 'published'} onChange={(event) => setHtmlDraft({ ...htmlDraft, status: event.target.value as HtmlElementItem['status'] })} className={fieldClass}><option value="draft">Draft</option><option value="published">Published</option></select></label>
              <label className={labelClass}>Tags (comma-separated)<input value={(htmlDraft.tags ?? []).join(', ')} onChange={(event) => setHtmlDraft({ ...htmlDraft, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} className={fieldClass} /></label>
              <label className={labelClass}>End tag behavior<select value={htmlDraft.closingTag} onChange={(event) => setHtmlDraft({ ...htmlDraft, closingTag: event.target.value as HtmlElementItem['closingTag'] })} className={fieldClass}><option>Required</option><option>Omitted (Void)</option><option>Optional</option></select></label>
            </div>
            <label className={labelClass}>Definition<textarea required rows={3} value={htmlDraft.summary} onChange={(event) => setHtmlDraft({ ...htmlDraft, summary: event.target.value })} className={fieldClass} /></label>
            <label className={labelClass}>Syntax<textarea rows={3} value={htmlDraft.syntax} onChange={(event) => setHtmlDraft({ ...htmlDraft, syntax: event.target.value })} className={`${fieldClass} font-mono`} /></label>
            <label className={labelClass}>Content model<input value={htmlDraft.contentModel} onChange={(event) => setHtmlDraft({ ...htmlDraft, contentModel: event.target.value })} className={fieldClass} /></label>
            <label className={labelClass}>Attributes (one per line: name | type | description | required)<textarea rows={4} value={formatAttributes(htmlDraft.attributes)} onChange={(event) => setHtmlDraft({ ...htmlDraft, attributes: parseAttributes(event.target.value) })} className={`${fieldClass} font-mono`} /></label>
            <label className={labelClass}>Code example<textarea required rows={8} value={htmlDraft.codeExample} onChange={(event) => setHtmlDraft({ ...htmlDraft, codeExample: event.target.value })} className={`${fieldClass} font-mono`} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Accessibility<textarea rows={3} value={htmlDraft.accessibilityTips} onChange={(event) => setHtmlDraft({ ...htmlDraft, accessibilityTips: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Common mistakes<textarea rows={3} value={htmlDraft.commonMistakes} onChange={(event) => setHtmlDraft({ ...htmlDraft, commonMistakes: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Best practices<textarea rows={3} value={htmlDraft.bestPractices} onChange={(event) => setHtmlDraft({ ...htmlDraft, bestPractices: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Browser support<textarea rows={3} value={htmlDraft.browserSupport} onChange={(event) => setHtmlDraft({ ...htmlDraft, browserSupport: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Use cases (one per line)<textarea rows={3} value={(htmlDraft.useCases ?? []).join('\n')} onChange={(event) => setHtmlDraft({ ...htmlDraft, useCases: event.target.value.split('\n').filter(Boolean) })} className={fieldClass} /></label>
              <label className={labelClass}>Related tags (comma-separated)<input value={htmlDraft.relatedTags.join(', ')} onChange={(event) => setHtmlDraft({ ...htmlDraft, relatedTags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} className={fieldClass} /></label>
            </div>
            <label className={labelClass}>Practice exercise<textarea rows={2} value={htmlDraft.practiceExercise ?? ''} onChange={(event) => setHtmlDraft({ ...htmlDraft, practiceExercise: event.target.value })} className={fieldClass} /></label>
            {message && <p role="alert" className="text-xs text-rose-300">{message}</p>}
            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button type="button" onClick={() => { setHtmlDraft(null); setHtmlOriginalTag(null); }} className="rounded-lg px-4 py-2 text-xs text-slate-300 hover:bg-slate-800">Cancel</button>
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">Save HTML entry</button>
            </div>
          </form>
        </div>
      )}

      {cssDraft && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="css-entry-title">
          <form onSubmit={saveCss} className="mx-auto my-6 max-w-3xl space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <h3 id="css-entry-title" className="text-lg font-bold text-white">{cssOriginalName ? 'Edit CSS entry' : 'Create CSS entry'}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Property or topic name<input required disabled={Boolean(cssOriginalName)} value={cssDraft.name} onChange={(event) => setCssDraft({ ...cssDraft, name: event.target.value })} className={fieldClass} placeholder="gap" /></label>
              <label className={labelClass}>URL slug<input value={cssDraft.slug ?? ''} onChange={(event) => setCssDraft({ ...cssDraft, slug: event.target.value })} className={fieldClass} placeholder="generated-from-name" /></label>
              <label className={labelClass}>Category<select value={cssDraft.category} onChange={(event) => setCssDraft({ ...cssDraft, category: event.target.value as CssPropertyItem['category'] })} className={fieldClass}>{cssCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className={labelClass}>Difficulty<select value={cssDraft.difficulty ?? 'Beginner'} onChange={(event) => setCssDraft({ ...cssDraft, difficulty: event.target.value as CssPropertyItem['difficulty'] })} className={fieldClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
              <label className={labelClass}>Publication<select value={cssDraft.status ?? 'published'} onChange={(event) => setCssDraft({ ...cssDraft, status: event.target.value as CssPropertyItem['status'] })} className={fieldClass}><option value="draft">Draft</option><option value="published">Published</option></select></label>
              <label className={labelClass}>Typical / initial value<input value={cssDraft.initialValue} onChange={(event) => setCssDraft({ ...cssDraft, initialValue: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Tags (comma-separated)<input value={(cssDraft.tags ?? []).join(', ')} onChange={(event) => setCssDraft({ ...cssDraft, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} className={fieldClass} /></label>
              <label className="flex items-center gap-2 pt-6 text-xs font-medium text-slate-300"><input type="checkbox" checked={cssDraft.inherited} onChange={(event) => setCssDraft({ ...cssDraft, inherited: event.target.checked })} /> Inherited by default</label>
            </div>
            <label className={labelClass}>Definition<textarea required rows={3} value={cssDraft.description} onChange={(event) => setCssDraft({ ...cssDraft, description: event.target.value })} className={fieldClass} /></label>
            <label className={labelClass}>Syntax<textarea rows={3} value={cssDraft.syntax} onChange={(event) => setCssDraft({ ...cssDraft, syntax: event.target.value })} className={`${fieldClass} font-mono`} /></label>
            <label className={labelClass}>Valid/common values (comma-separated)<textarea rows={2} value={cssDraft.acceptedValues.join(', ')} onChange={(event) => setCssDraft({ ...cssDraft, acceptedValues: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} className={`${fieldClass} font-mono`} /></label>
            <label className={labelClass}>Code example<textarea required rows={8} value={cssDraft.codeExample} onChange={(event) => setCssDraft({ ...cssDraft, codeExample: event.target.value })} className={`${fieldClass} font-mono`} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>How values change output<textarea rows={3} value={cssDraft.valueEffect ?? ''} onChange={(event) => setCssDraft({ ...cssDraft, valueEffect: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Common mistakes<textarea rows={3} value={cssDraft.commonMistakes} onChange={(event) => setCssDraft({ ...cssDraft, commonMistakes: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Browser support<textarea rows={3} value={cssDraft.browserSupport} onChange={(event) => setCssDraft({ ...cssDraft, browserSupport: event.target.value })} className={fieldClass} /></label>
              <label className={labelClass}>Use cases (one per line)<textarea rows={3} value={(cssDraft.useCases ?? []).join('\n')} onChange={(event) => setCssDraft({ ...cssDraft, useCases: event.target.value.split('\n').filter(Boolean) })} className={fieldClass} /></label>
              <label className={labelClass}>Related properties/topics (comma-separated)<input value={cssDraft.relatedProperties.join(', ')} onChange={(event) => setCssDraft({ ...cssDraft, relatedProperties: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} className={fieldClass} /></label>
            </div>
            <label className={labelClass}>Practice exercise<textarea rows={2} value={cssDraft.practiceExercise ?? ''} onChange={(event) => setCssDraft({ ...cssDraft, practiceExercise: event.target.value })} className={fieldClass} /></label>
            {message && <p role="alert" className="text-xs text-rose-300">{message}</p>}
            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button type="button" onClick={() => { setCssDraft(null); setCssOriginalName(null); }} className="rounded-lg px-4 py-2 text-xs text-slate-300 hover:bg-slate-800">Cancel</button>
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">Save CSS entry</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
