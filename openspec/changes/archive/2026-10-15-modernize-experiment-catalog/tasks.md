## 1. Styling foundation

- [x] 1.1 Add Tailwind CSS to the React 18/Vite JavaScript build and verify the production build completes without changing the React major version or introducing TypeScript.
- [x] 1.2 Map Evelab semantic color, type, spacing, radius, focus, and motion tokens into the styling foundation and verify they preserve the fixed EvellynDev palette and the requirements in `DESIGN_GUIDELINES.md`.

## 2. Application state boundaries

- [x] 2.1 Create a local Portuguese (Brazil)/English translation catalog and locale state with validated browser persistence; verify every catalog and placeholder string renders in both languages and an invalid stored locale safely falls back.
- [x] 2.2 Add an isolated client-side route resolver for the catalog and four stable experiment paths; verify direct loading, browser back/forward navigation, and catalog return navigation work without a routing dependency or network request.
- [x] 2.3 Define presentation-only experiment metadata for the four stable slugs and verify it contains no computational result, parameter state, provider contract, or legacy integration behavior.

## 3. Laboratory catalog

- [x] 3.1 Recompose the home page as a localized laboratory instrument index with four semantic experiment links and verify it removes product-style slogan copy, fake output, and generic dashboard hierarchy.
- [x] 3.2 Create distinct abstract motifs for token, text, hallucination-path, and image experiments; verify each is decorative context only and does not imply that the experiment is functional.
- [x] 3.3 Add restrained hover, focus, and activation feedback to each card; verify motion preserves layout, has a non-color cue, and becomes immediate/static under `prefers-reduced-motion`.
- [x] 3.4 Verify all catalog cards are keyboard-, pointer-, and touch-operable with visible focus and navigate only to their matching placeholder paths.

## 4. Under-construction destinations

- [x] 4.1 Implement one localized, addressable under-construction destination per experiment and verify each direct path identifies the correct experiment without fake controls, results, execution state, or backend behavior.
- [x] 4.2 Add a localized, keyboard-accessible return-to-catalog control and language selector to placeholder destinations; verify locale remains active while navigating between catalog and destination.
- [x] 4.3 Apply the quiet Dark Futurism arrival/state treatment to placeholder pages and verify it has no looping decoration and respects reduced-motion preferences.

## 5. Quality and documentation

- [x] 5.1 Update the project README with React 18/Vite/JavaScript/Tailwind setup, local run instructions, catalog routes, PT-BR/English behavior, and the explicit no-backend/no-functional-migration boundary; verify the commands match `package.json`.
- [x] 5.2 Validate compact and wide layouts for reading order, no horizontal overflow, touch target usability, contrast, and visible keyboard focus; verify no required instruction depends on hover or color alone.
- [x] 5.3 Run the production build and perform a manual navigation audit of all four cards, direct paths, locale persistence, and reduced-motion behavior; verify there are no API or external-service requests.
