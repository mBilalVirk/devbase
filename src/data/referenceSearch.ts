import { CssPropertyItem, HtmlElementItem } from '../types';

const containsTerm = (values: string[], term: string) =>
  values.some((value) => value.toLowerCase().includes(term));

export const searchHtmlReferences = (
  entries: HtmlElementItem[],
  searchTerm: string,
  category = 'All',
) => {
  const term = searchTerm.trim().toLowerCase();
  return entries.filter((entry) => {
    if (entry.status === 'draft' || (category !== 'All' && entry.category !== category)) return false;
    if (!term) return true;
    return containsTerm(
      [
        entry.tag, entry.name, entry.summary, entry.syntax, entry.codeExample, entry.bestPractices,
        ...(entry.tags ?? []), ...(entry.useCases ?? []),
        ...entry.attributes.flatMap((attribute) => [attribute.name, attribute.description, attribute.type]),
      ],
      term,
    );
  });
};

export const searchCssReferences = (
  entries: CssPropertyItem[],
  searchTerm: string,
  category = 'All',
) => {
  const term = searchTerm.trim().toLowerCase();
  return entries.filter((entry) => {
    if (entry.status === 'draft' || (category !== 'All' && entry.category !== category)) return false;
    if (!term) return true;
    return containsTerm(
      [
        entry.name, entry.description, entry.syntax, entry.codeExample, entry.commonMistakes,
        ...(entry.tags ?? []), ...(entry.acceptedValues ?? []), ...(entry.useCases ?? []),
      ],
      term,
    );
  });
};
