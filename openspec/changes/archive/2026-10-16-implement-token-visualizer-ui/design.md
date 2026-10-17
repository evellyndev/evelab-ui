## Context

See `proposal.md` for motivation and `specs/token-visualizer-workspace/spec.md` for behavior. The React/Vite application currently has a custom client-side router and one generic experiment placeholder. The separate EveLab API is a FastAPI service with CORS support for the Vite origin and a stable `POST /token-visualizer` contract. It returns camel-cased `tokenProbs` and `promptTokens` response properties and supports only `mode: "word"`.

## Goals / Non-Goals

**Goals:**

- Establish a bounded frontend API boundary whose base URL is supplied through a Vite public environment variable.
- Give the Token Visualizer a laboratory workspace in which input, execution state, and token evidence have distinct visual roles.
- Preserve local language selection, custom routing, and the placeholders for the other three experiments.

**Non-Goals:**

- Changing the backend request/response contract, provider configuration, CORS policy, or generation behavior.
- Adding a routing, state-management, charting, or component-library dependency.
- Persisting runs, adding accounts, or implementing the other experiments.

## Decisions

### 1. Use a small, explicit API client with a Vite base URL

The frontend will derive its API origin from `VITE_API_BASE_URL`, defaulting only to same-origin requests when absent. It will construct the fixed `/token-visualizer` path and normalize safe failure information for the UI. This keeps local development able to point to the separately run service without hard-coding a port or copying the backend contract across components.

Alternative considered: a Vite development proxy. Rejected as the sole integration mechanism because a production deployment still needs an explicit service origin; it could be added later as a convenience without changing the client boundary.

### 2. Replace only the Token Visualizer branch of the placeholder

`App` will render a dedicated workspace for the `token-visualizer` slug and retain `ExperimentPlaceholder` for all other valid experiment routes. This minimizes regression risk and directly models the incremental rollout already implied by the catalog.

Alternative considered: generalizing all experiment pages now. Rejected because their API contracts and interaction models do not yet exist.

### 3. Keep form and request state local to the workspace

React component state will own the prompt, request status, response, selected output-token index, and error message. The client will always send the legacy-compatible `top_k: 5` and `temperature: 0.0` values. A single submit path validates the prompt before calling the API, disables duplicate submission while pending, and retains the prompt on every result state.

Alternative considered: a global store. Rejected because no other route consumes this short-lived session state.

### 4. Pair a compact context strip with technical token evidence

The observation area will place a compact, ordered context-token strip above the generated word, preserving the quick reading model of the legacy visualizer. The detailed prompt-token list will remain below the result for investigation, exposing id and byte sequence alongside a decoded display when safe. Selecting an output token exposes a stable inspector of selected probability and ranked alternatives. This follows the design guidance that a visualization needs an explicit mapping from marks to meaning and an accessible linear representation.

Alternative considered: a probability-only bar chart. Rejected because it obscures token order and cannot faithfully represent the API's byte-level prompt metadata.

### 5. Localize all visitor-facing workspace and failure copy

Workspace labels, validation messages, request states, result labels, and byte fallbacks will join the existing `pt-BR` and `en` message map. API errors will be displayed as a safe, localized generic message rather than provider or transport details.

Alternative considered: rendering server error text. Rejected because it creates inconsistent localization and weakens the API's safe-error boundary.

## Risks / Trade-offs

- [The API is not running or does not permit the deployed frontend origin] → Document the required `CORS_ORIGINS` and show a retryable safe failure state; verify the integration against a locally running backend.
- [A configured API URL has an unexpected trailing slash] → Normalize joining the base URL and endpoint in the API client.
- [Raw prompt-token bytes cannot form standalone UTF-8 text] → Render id and numeric bytes as the authoritative fallback; never concatenate or discard boundaries.
- [Network latency encourages duplicate submissions] → Disable the submit control only during the pending state and retain all entered values.

## Migration Plan

1. Deploy the frontend with `VITE_API_BASE_URL` set to the EveLab API origin, or use same-origin routing where the deployment supplies it.
2. Configure the API's `CORS_ORIGINS` with the exact deployed frontend origin.
3. Verify a real word-mode request and keyboard inspection of its result before releasing broadly.
4. Roll back by redeploying the prior frontend bundle; the backend contract and stored data are unaffected.
