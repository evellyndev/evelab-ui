## Why

The current home page correctly avoids claiming that legacy experiments are live, but its passive catalog and product-like composition do not yet convey a computational laboratory. Evelab needs an explorative entry point where people can select an experiment, receive an honest in-progress destination, and switch language—without beginning the functional migration of the legacy application.

This change modernizes the catalog experience around the visual-learning patterns of VisuAlgo and Apex: discoverable instruments, clear interaction feedback, and visual systems that make computation the subject. `DESIGN_GUIDELINES.md` remains the visual authority, so these references inform information architecture and interaction rather than being copied.

## What Changes

- Replace the passive home-page catalog with an accessible, animated experiment catalog for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer.
- Make every experiment card an explicit navigation control that opens a dedicated, localized **Under construction** route; no card starts an experiment or simulates its future result.
- Add an application-local PT-BR/English language switcher and persist the chosen locale in the browser. Both languages must cover catalog and placeholder-page interface text.
- Establish a laboratory-first composition: a concise instrument index with experiment-specific visual motifs, a clear path into each tool, and restrained interaction-led animation. Remove marketing-style introductory copy and any generic product/landing-page hierarchy.
- Use Tailwind CSS for design-token-driven styling alongside React 18, Vite, and JavaScript. TypeScript remains excluded.
- Preserve the existing no-backend boundary: no legacy Flask behavior, model/API calls, provider SDK, fake computation, or functional experiment migration is introduced.

## Capabilities

### New Capabilities

- `interactive-experiment-catalog`: A localized, keyboard-accessible, animated laboratory catalog that lets a person open each planned experiment destination.
- `under-construction-experiment-pages`: Localized placeholder routes that clearly identify the selected experiment and its unavailable status without implying a working implementation.

### Modified Capabilities

- None. The repository has no main OpenSpec capability specifications; the completed `migrate-legacy-frontend` change remains historical planning context rather than a main specification.

## Impact

- Affected application areas: React application composition, client-side navigation, locale state/persistence, catalog and placeholder presentation, responsive behavior, and motion preferences.
- Affected dependencies: Tailwind CSS is added for styling; React remains pinned to major version 18, Vite remains the build tool, and JavaScript remains the sole application source language.
- No backend, API contract, external service, legacy repository file, provider credential, or functional legacy behavior is affected.
