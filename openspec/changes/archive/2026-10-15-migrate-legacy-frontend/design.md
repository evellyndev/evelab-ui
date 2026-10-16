## Context

See `proposal.md` for motivation. The analyzed legacy repository contains four relevant experiment concepts: token prediction, text response, Hallucination Path, and image generation. Its Flask/vanilla-JavaScript architecture, server routes, provider integrations, static demos, and localization are not in scope for this release.

The target repository currently contains the authoritative `DESIGN_GUIDELINES.md` and OpenSpec configuration only. This implementation phase is limited to the static home page and must not establish a dependency on a backend, external service, API contract, runtime provider, or demo-data source.

## Goals / Non-Goals

**Goals:**

- Establish the Evelab identity through a static home page whose four cards introduce the future experiment catalog.
- Apply the design system's dark laboratory composition, semantic palette, hierarchy, accessibility, and responsive rules to the first public surface.
- Ensure card language and interaction affordances do not imply a working experiment, a route, or live generation.

**Non-Goals:**

- Implement a backend, API integration, external service, provider SDK, network request, demonstration-data source, or experiment route.
- Implement Token Visualizer, Text Visualizer, Hallucination Path, Image Visualizer, tokenization, localization, or any interactive experiment state.
- Reproduce legacy visual styling, pages, routes, templates, CSS classes, browser-global functions, static build generator, or persisted locale keys.
- Select a state library, chart/graph library, API protocol, hosting platform, or AI provider beyond the explicit React 18 + Vite JavaScript foundation.

## Decisions

### 1. Build a catalog-only first increment

The first increment renders a single home page with four non-functional cards. A card communicates a future experiment's name, purpose, and unavailable status. It is informational content rather than a button or link, because no target route exists.

This lets the product establish a credible computational-laboratory entry point without creating false affordances or locking in runtime architecture.

Alternative considered: make cards navigate to placeholder pages. Rejected because it expands scope beyond the requested home page and implies unavailable functionality.

### 2. Use React 18, Vite, and JavaScript for the static frontend foundation

The home page SHALL use React 18 for declarative UI composition and Vite for local development and production build output. Application source files SHALL use JavaScript; TypeScript is explicitly excluded. This is a frontend-only decision: no UI library, router, state-management library, backend integration, provider SDK, or API client is needed for the catalog-only release.

React 18 provides a clear component boundary for the home page and future cards; Vite supplies a lightweight, conventional development and static-build workflow. JavaScript keeps the first increment intentionally small and avoids adding a second source-language configuration before the product has interactive complexity. The decision creates a stable starting point without prejudging future runtime or integration architecture.

Alternative considered: retain a framework-agnostic plan or add TypeScript now. Rejected because the implementation now needs a named foundation, and React 18 + Vite with JavaScript is the approved, minimal choice.

### 3. Make the catalog visually specific, not a generic dashboard

The home page follows `DESIGN_GUIDELINES.md`: a quiet Charcoal field, measured Violet emphasis, Off-white primary content, sentence-case copy, and hierarchy driven by spacing rather than a grid of interchangeable SaaS cards. Cards represent distinct experiment concepts and may vary their contained visual cue or data motif, but none has decorative glow, live metrics, or fake output.

The composition is a concise laboratory index, left-aligned on wide screens and a single clear flow on compact screens. No hero metric, dashboard chrome, artificial terminal texture, cyberpunk ornament, or animated ambient effect is introduced.

Alternative considered: use identical cards with uniform decoration. Rejected because it weakens the meaning of the catalog and reads as generic SaaS dashboard chrome.

## Risks / Trade-offs

- [Cards look actionable without destinations] → Use explicit unavailable status and non-interactive semantics; verify a card does not receive link or button behavior.
- [A generic card grid dilutes the laboratory identity] → Review against `DESIGN_GUIDELINES.md` for functional hierarchy, restrained glow, semantic color use, and experiment-specific content.
- [Future migration requirements are lost] → Preserve the legacy-analysis findings in the archived conversation and start a dedicated future proposal for each selected experiment scope.

## Migration Plan

1. Implement the static home page and its four informational cards according to the catalog specification and `DESIGN_GUIDELINES.md`.
2. Validate wide and compact layouts, semantic markup, contrast, and the absence of interactive experiment affordances.
3. Release the home page independently. Rollback consists of withdrawing this single static surface; it does not affect the legacy repository or any backend.
