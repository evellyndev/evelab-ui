## 1. Static laboratory home page

- [x] 1.1 Initialize the React 18 + Vite JavaScript frontend foundation for the static home page; verify the Vite development server and production build run without a backend or external service, and the application source contains no TypeScript files or configuration.
- [x] 1.2 Build the Evelab home page with four informational cards for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer; verify all catalog scenarios in `experiment-catalog-and-localization` pass.
- [x] 1.3 Apply the semantic color, typography, spacing, and hierarchy rules in `DESIGN_GUIDELINES.md`; verify the page reads as a Minimalist Futuristic laboratory index rather than a generic dashboard or legacy visual clone.
- [x] 1.4 Mark each card as planned or unavailable using non-interactive semantics and clear copy; verify cards do not navigate, submit, call a network service, render demo data, or expose a fake result.

## 2. Quality validation and release

- [x] 2.1 Validate the home page on compact and wide viewports; verify card content remains readable, ordered, and free of horizontal scrolling on compact screens.
- [x] 2.2 Validate semantic markup, color contrast, focus behavior for any actual interactive element, and reduced-motion behavior; verify the acceptance checks in `DESIGN_GUIDELINES.md` pass.
- [x] 2.3 Verify build and browser network activity contain no backend, API, external-service, provider-SDK, or experiment-generation integration; verify the legacy repository remains unchanged.
