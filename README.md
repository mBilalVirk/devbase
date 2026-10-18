# DevBase

DevBase is a React, TypeScript, and Vite learning platform. Its `/html` and `/css`
routes provide searchable reference lessons, category filters, editable examples,
copy/reset controls, syntax-highlighted source, and isolated responsive previews.
The `/admin` route includes the existing content console and an HTML/CSS reference
manager for editing, categorizing, and publishing entries.

## Run locally

```sh
npm install
npm run dev
```

## Validate changes

```sh
npm test
npm run lint
npm run build
```

## Reference content and previews

Initial documentation is repeatably seeded from `src/data/referenceSeedData.ts`
and merged into the established collections in `src/data/seedData.ts`. Reference
edits made through the demo admin console are stored in the current browser's
local storage. HTML/CSS bookmarks, completed topics, and the latest reference
quiz scores are also saved there as minimal learning-progress data; this frontend
does not include a database or server-backed CMS.
The admin role switch is likewise a client-side demo and is not a security
boundary for production administration.

Interactive reference previews render in sandboxed iframes without script,
form-submission, or external-resource permissions. Use the existing full
playground when a lesson requires JavaScript execution.

Demo site: <https://devbase101.netlify.app/>
