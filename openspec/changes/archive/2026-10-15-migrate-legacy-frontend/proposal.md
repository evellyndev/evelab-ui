## Why

The legacy AI Visualizer Swiss Knife identifies four useful experiments, but their migration requires decisions about target runtime, provider contracts, and deployment that are intentionally out of scope now. Evelab needs an initial, implementation-ready laboratory entry point that establishes its identity without implying that any experiment is live.

This narrow first step creates the foundation for future incremental migrations while respecting `DESIGN_GUIDELINES.md` and avoiding placeholder integrations, invented APIs, or copied legacy styling.

## What Changes

- Create only the Evelab home page with informative cards for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer.
- Use React 18 with Vite as the required frontend and build foundation for this static home page, written in JavaScript only; TypeScript is excluded.
- Apply the Minimalist Futuristic / Dark Futurism identity from `DESIGN_GUIDELINES.md` to this entry point; legacy visual styling is not carried forward.
- Make every card explicitly represent a planned experiment, not a working tool, and do not expose a route, action, demonstration, result, or request behind it.
- **BREAKING:** No legacy Flask route, redirect, browser-global function, static demo, persisted locale key, or visual treatment is a compatibility target in this release.
- **BREAKING:** This release includes no backend, API integration, provider SDK, generation, verification, image handling, tokenization, experiment state, or localization implementation.

## Capabilities

### New Capabilities

- `experiment-catalog-and-localization`: A static, accessible Evelab home page that introduces planned experiments through non-functional cards.

### Modified Capabilities

- None. The target project has no existing OpenSpec capability specifications to modify.

## Impact

- Affected scope: one React 18/Vite JavaScript static frontend entry point and the visual design-system primitives needed to compose it.
- The legacy repository remains read-only and its observed features are migration evidence for later changes only.
- No backend, API, external service, provider credential, dependency, or deployment integration is affected or introduced.
