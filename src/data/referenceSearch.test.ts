import assert from 'node:assert/strict';
import test from 'node:test';
import { CSS_REFERENCE_SEEDS, HTML_REFERENCE_SEEDS } from './referenceSeedData';
import { searchCssReferences, searchHtmlReferences } from './referenceSearch';
import { canAccessAdminPanel } from './adminPermissions';
import { CSS_CHEATSHEET_SECTIONS } from './cssCheatsheetSections';
import { JAVASCRIPT_CHEATSHEET_SECTIONS } from './javascriptCheatsheetSections';

test('initial reference content is substantial and complete enough to render each lesson', () => {
  assert.ok(HTML_REFERENCE_SEEDS.length >= 25);
  assert.ok(CSS_REFERENCE_SEEDS.length >= 20);
  assert.equal(new Set(HTML_REFERENCE_SEEDS.map((entry) => entry.slug)).size, HTML_REFERENCE_SEEDS.length);
  assert.equal(new Set(CSS_REFERENCE_SEEDS.map((entry) => entry.slug)).size, CSS_REFERENCE_SEEDS.length);

  for (const entry of HTML_REFERENCE_SEEDS) {
    assert.ok(entry.tag && entry.name && entry.summary && entry.syntax && entry.codeExample);
    assert.ok(entry.commonMistakes && entry.bestPractices && entry.accessibilityTips);
    assert.ok(entry.practiceExercise && entry.useCases?.length && entry.relatedTags.length);
  }

  for (const entry of CSS_REFERENCE_SEEDS) {
    assert.ok(entry.name && entry.category && entry.description && entry.syntax && entry.codeExample);
    assert.ok(entry.initialValue && entry.acceptedValues.length);
    assert.ok(entry.commonMistakes && entry.practiceExercise && entry.valueEffect);
  }
});

test('CSS cheatsheet presents each entry with a distinct property, definition, and example', () => {
  assert.ok(CSS_CHEATSHEET_SECTIONS.length >= 60);
  assert.equal(
    new Set(CSS_CHEATSHEET_SECTIONS.map((section) => `${section.category}:${section.property}`)).size,
    CSS_CHEATSHEET_SECTIONS.length,
  );
  for (const section of CSS_CHEATSHEET_SECTIONS) {
    assert.ok(section.category && section.property && section.definition && section.code);
  }
});

test('JavaScript cheatsheet presents each topic with a distinct heading, definition, and example', () => {
  assert.ok(JAVASCRIPT_CHEATSHEET_SECTIONS.length >= 30);
  assert.equal(
    new Set(JAVASCRIPT_CHEATSHEET_SECTIONS.map((section) => `${section.category}:${section.title}`)).size,
    JAVASCRIPT_CHEATSHEET_SECTIONS.length,
  );
  for (const section of JAVASCRIPT_CHEATSHEET_SECTIONS) {
    assert.ok(section.category && section.title && section.definition && section.code);
  }
  assert.ok(JAVASCRIPT_CHEATSHEET_SECTIONS.some((section) => section.title === 'async / await'));
  assert.ok(JAVASCRIPT_CHEATSHEET_SECTIONS.some((section) => section.category === 'DOM Manipulation'));
});

test('HTML search covers tag names, attributes, and lesson text while excluding drafts', () => {
  assert.equal(searchHtmlReferences(HTML_REFERENCE_SEEDS, 'datetime-local').some((entry) => entry.tag === '<input>'), true);
  assert.equal(searchHtmlReferences(HTML_REFERENCE_SEEDS, 'alternative text').some((entry) => entry.tag === '<img>'), true);
  assert.equal(searchHtmlReferences(HTML_REFERENCE_SEEDS, 'address').some((entry) => entry.tag === 'inline-text-details'), true);

  const draft = { ...HTML_REFERENCE_SEEDS[0], tag: '<draft-only>', status: 'draft' as const };
  assert.equal(searchHtmlReferences([...HTML_REFERENCE_SEEDS, draft], 'draft-only').length, 0);
  assert.ok(searchHtmlReferences(HTML_REFERENCE_SEEDS, '', 'Forms').every((entry) => entry.category === 'Forms'));
});

test('CSS search covers modern syntax and filters by category', () => {
  assert.equal(searchCssReferences(CSS_REFERENCE_SEEDS, 'oklch').some((entry) => entry.name === 'color and modern color functions'), true);
  assert.equal(searchCssReferences(CSS_REFERENCE_SEEDS, 'rgba()').some((entry) => entry.name === 'color and modern color functions'), true);
  assert.equal(searchCssReferences(CSS_REFERENCE_SEEDS, 'prefers-reduced-motion').some((entry) => entry.name === 'Dark mode, print, and accessibility'), true);
  assert.equal(searchCssReferences(CSS_REFERENCE_SEEDS, '16 / 9').some((entry) => entry.name.includes('aspect-ratio')), true);

  const draft = { ...CSS_REFERENCE_SEEDS[0], name: 'draft-only-css', status: 'draft' as const };
  assert.equal(searchCssReferences([...CSS_REFERENCE_SEEDS, draft], 'draft-only-css').length, 0);
  assert.ok(searchCssReferences(CSS_REFERENCE_SEEDS, '', 'Responsive Design').every((entry) => entry.category === 'Responsive Design'));
});

test('the existing CMS role gate allows authors and administrators only', () => {
  assert.equal(canAccessAdminPanel('guest'), false);
  assert.equal(canAccessAdminPanel('developer'), false);
  assert.equal(canAccessAdminPanel('contributor'), false);
  assert.equal(canAccessAdminPanel('editor'), false);
  assert.equal(canAccessAdminPanel('author'), true);
  assert.equal(canAccessAdminPanel('admin'), true);
  assert.equal(canAccessAdminPanel('superadmin'), true);
});
