## Context

See `proposal.md` for motivation and the accompanying capability specifications for observable behavior. The existing React 18/Vite JavaScript application has a static, non-actionable four-card home page. The prior `migrate-legacy-frontend` change deliberately completed without routes, localization, Tailwind, or functional migration; it remains a historical record and is not edited by this change.

`DESIGN_GUIDELINES.md` is the design authority. Visualgo is used as an interaction reference for an index of clearly named visual explorations, direct entry into a chosen tool, and a learning-oriented relationship between control and result. Apex is a secondary reference for treating visualizations as the subject. Neither site’s visual identity, code, or functionality is copied.

## Goals / Non-Goals

**Goals:**

- Recast the home screen as a compact laboratory instrument index where choosing an experiment is the primary activity.
- Establish a small client-side navigation and localization boundary that future experiments can reuse without coupling them to presentation.
- Use Tailwind CSS to express Evelab’s existing semantic tokens, responsive layout, states, and motion rules consistently.
- Make card animation causally tied to selection and concept-specific motifs rather than ambient decoration.

**Non-Goals:**

- Migrate, emulate, or expose any legacy experiment, Flask endpoint, provider integration, tokenization, image generation, static demo, or algorithm visualization.
- Add a backend, API request, analytics, account system, external localization service, or language-detection request.
- Add a router, state-management, component-library, charting, or internationalization dependency.
- Reproduce Visualgo, Apex, or the legacy site’s visual design, layout, copy, or implementation.

## Decisions

### 1. Use addressable client-side routes with a minimal route resolver

The application will recognize the catalog root and four stable experiment destinations. A small route resolver built on browser location/history will render the catalog or the matching placeholder and handle return navigation. Unknown paths will resolve to the catalog or an explicit local not-found state, decided during implementation without broadening the capability contract.

This preserves direct linking to a chosen instrument while avoiding a routing dependency before real experiment modules introduce nested layouts, loaders, or route-level data needs. Route paths will use stable experiment slugs and must not encode locale, provider, or implementation status.

Alternative considered: use non-addressable dialogs. Rejected because a chosen experiment needs a shareable, reload-safe destination. Alternative considered: add a routing library. Rejected because the five-route static boundary does not yet justify one and the project must remain React-first and lightweight.

### 2. Use a local translation catalog and explicit locale persistence

Portuguese (Brazil) and English strings will live in a single application-local translation catalog keyed by interface meaning, not duplicated per component. A small locale provider/hook will expose the active locale and selection action. The explicit locale selection will be stored in browser local storage; initial selection can use a safe local default and must not require a network call. Missing translation keys must fail visibly during development rather than silently falling back to mixed-language UI.

This gives the initial interface coherent language coverage and an easy seam for future experiments, while keeping all presentation language separate from computational logic.

Alternative considered: hard-code bilingual strings inside cards or add an i18n library. Hard-coded strings make consistency and future expansion error-prone; a library is not warranted until message formatting, pluralization, or additional locales create a demonstrated need.

### 3. Compose catalog cards as instrument links, not decorative product tiles

The catalog will have a quiet contextual header, a language control, and a responsive experiment collection. Each card is one semantic link-sized target with a named experiment, brief factual purpose, explicit unavailable state, and an experiment-specific abstract diagram. There is no slogan such as “Evelab is a place,” hero metric, feature list, or fake output.

On a wide view, the index balances concise context with an observation-led card field. On compact viewports, it becomes one ordered column with generous touch targets. The card field—not introductory copy—has visual dominance. This keeps the interaction model closer to a lab library than a commercial product landing page.

Alternative considered: retain the split hero with cards as secondary content. Rejected because it delays access to the instruments and was perceived as product-oriented.

### 4. Express the established design system through Tailwind tokens

Tailwind CSS will be installed and configured as a styling compiler only. Its theme will map Evelab’s semantic color, spacing, radius, type, shadow, and motion tokens from `DESIGN_GUIDELINES.md`; utility usage must not bypass semantic intent with arbitrary one-off colors or generic utility-card recipes. Component-specific CSS is permitted only when necessary for unique diagrams, keyframes, or selectors that utilities cannot express cleanly.

Tailwind improves token consistency and responsive/state composition without selecting a component framework. React 18 remains the rendering runtime, Vite remains the build tool, and all application files remain JavaScript.

Alternative considered: retain only hand-authored global CSS. Rejected because the next iteration benefits from a constrained, reusable token vocabulary. Alternative considered: adopt a component library. Rejected because it would introduce a generic visual language at odds with the specified identity.

### 5. Treat motion as localized interaction feedback

Each card’s motif will respond briefly to hover, keyboard focus, and activation: for example, a token sequence advances, a text path resolves, a graph edge brightens, or image-grid cells sharpen. The motion begins from the interacted card, does not move surrounding layout, uses Violet/Lavender only for related context, and settles promptly. Under `prefers-reduced-motion`, state changes become immediate and retain visible structural/focus cues.

The placeholder destination can use a single short arrival transition to establish context; it must not use looping particles, scans, neon pulsing, or simulated execution.

Alternative considered: perpetual background animation or sequential card entrances. Rejected because these are decorative, conflict with the guidelines, and falsely suggest live computation.

### 6. Keep experiment logic absent and module boundaries ready

The catalog data defines only presentation metadata: stable slug, localized label/summary keys, and motif identity. It must not contain generated results, parameter state, execution logic, or service contracts. Presentation components own card and placeholder rendering; locale and route state remain independent application concerns. A future functional experiment will enter behind its route and provide its own computational module without changing catalog localization or navigation contracts.

## Risks / Trade-offs

- [Tailwind produces a familiar utility-first appearance] → Map utilities to existing semantic tokens, keep diagrams/component anatomy intentional, and review screens against the anti-patterns in `DESIGN_GUIDELINES.md`.
- [A minimal custom route resolver becomes insufficient] → Keep route parsing isolated; introduce a routing library only in a future proposal once nested routes, data loading, or shared transition requirements justify it.
- [Local storage is unavailable or contains invalid data] → Validate the stored locale and fall back to the local default without blocking the interface.
- [Motion looks like decorative futurism] → Tie every animation to hover, focus, activation, or page arrival; inspect reduced-motion behavior and eliminate perpetual effects.
- [Placeholder pages are mistaken for feature delivery] → Repeat the unavailable state in the page title/status and omit all fake controls and outputs.
- [Direct-path deployment returns a server 404] → Verify the chosen static hosting deployment supports application fallback before release; this is a deployment prerequisite, not a backend dependency.

## Migration Plan

1. Add Tailwind’s build integration and map the existing Evelab tokens before changing application composition.
2. Introduce isolated locale and route state, then validate direct navigation, browser navigation, and malformed stored locale recovery.
3. Replace the static catalog with localized instrument links and interaction-led motifs.
4. Add the four localized under-construction destinations and return affordance.
5. Verify keyboard operation, focus visibility, reduced motion, text contrast, compact layout, direct URL loading, build output, and the absence of network/API behavior.
6. Deploy only to static hosting configured for client-side path fallback. Rollback is a static asset rollback; no data, backend, or legacy system changes are involved.

## Open Questions

- Static-hosting fallback behavior is not yet selected. This can be resolved at deployment time, provided the selected host serves the application shell for valid experiment paths.
