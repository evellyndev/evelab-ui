## Context

The catalog already routes to `/experiments/text-visualizer`, but the route resolves to the generic placeholder. The application has a working token-visualizer client and result contract; the configured API base is `VITE_API_BASE_URL`, where the text endpoint is `POST /text-visualizer`.

## Goals / Non-Goals

**Goals:**
- Replace the placeholder with the reading-trace workspace established in the approved preview.
- Preserve provider token boundaries and make their details inspectable.
- Reuse established request, localization, focus, and responsive patterns.

**Non-Goals:**
- Change backend request/response contracts or provider settings.
- Re-tokenize or fabricate token boundaries in the browser.
- Add response history, streaming generation, or persistence.

## Decisions

### Dedicated API client and component

Create a text-visualizer API module beside the existing token client and a dedicated React workspace, selected directly from the experiment route. The payload differs from word generation because it has no `mode` field, so overloading the word client would make the request contract less explicit.

### Provider sequence is the display model

Render `tokenProbs` directly in reading order. A formatter will make whitespace and line-break characters legible while retaining the original string for labels and contextual details. Client-side segmentation, including the preview's illustrative fragmentation, is rejected because it could misrepresent the provider output.

### Reading trace composition

Place the editable prompt and action above the result. On success, the prompt context appears above the response trace; the response is the main field and each token is a keyboard-operable button. A companion inspector shows selected-token probability and ranked alternatives. Narrow screens stack the inspector below the trace.

### State ownership and stale output

The workspace owns prompt, request status, result, and selected index. A changed prompt leaves a prior result visible but labels it as based on the submitted prompt until the next request, avoiding a false connection between unsent text and observed output. While pending, the action is disabled and text remains editable only if it does not permit duplicate submissions.

## Risks / Trade-offs

- Long responses can create a dense trace → use wrapping, preserved line breaks, and a scroll-safe inspector layout.
- A candidate token can itself be whitespace or non-printable → use the same display formatter for trace and alternatives, plus an explicit raw representation in the inspector.
- API payloads may be malformed or unavailable → validate shape at the client boundary and show a recoverable localized error.

## Migration Plan

Deploy as a frontend-only route replacement. The existing placeholder remains the rollback path by reverting the route branch and removing the new workspace/client. No API migration or stored data migration is required.
