## Context

See `proposal.md` for the motivation. The current Image Visualizer route is a localized placeholder, while the frontend already has route, locale, API-client, workspace, and request-state patterns used by Token Visualizer and Text Visualizer. The configured backend contract is `POST /image-visualizer/generate`: normal generation sends `{ prompt }`, while captured generation sends `{ prompt, capture_steps: true, capture_every }`.

## Goals / Non-Goals

**Goals:**

- Establish one client boundary for `POST /image-visualizer/generate` and validate its documented response before rendering it.
- Make the chosen design sequence explicit: prompt controls, selected/final image, then an inspectable stage carousel with thumbnail navigation.
- Retain locale, accessibility, stale-result, reduced-motion, and dark-instrument behavior already established by the application.

**Non-Goals:**

- Redesigning or versioning the backend contract.
- Calling an image provider from the browser, retaining generated images remotely, or adding history/comparison across separate runs.
- Migrating the static `.design-preview` prototypes into production as-is.

## Decisions

### Preserve a dedicated API adapter around the documented contract

The workspace will call a focused Image Visualizer client, following the existing API-module pattern. The client sends `Content-Type: application/json` to `POST /image-visualizer/generate`: `{ prompt }` when capture is disabled, or `{ prompt, capture_steps: true, capture_every }` when it is enabled. It accepts a response with `prompt`, `num_inference_steps`, `final_image_png_base64`, and optional ordered `captured_steps`; each captured item contains `step`, `timestep`, and `png_base64`.

The adapter validates the final PNG Base64 value and every returned stage before exposing a UI-ready result. It derives PNG data URLs only at the rendering/download boundary, preserving response order and source values. Missing or invalid Base64, a non-positive/non-integer `capture_every`, or malformed response fields are recoverable API errors rather than values rendered by the workspace. This keeps backend migration details out of the UI and makes transport errors distinct from malformed results.

Alternative considered: send requests directly from the React component. Rejected because it duplicates request parsing and weakens the existing boundary between experiment UI and endpoint behavior.

### Use controlled generation parameters and derived stale state

Prompt, capture enablement, and capture interval will be controlled state. The last successful request snapshot will be retained and compared with current parameters to derive a stale marker. A disabled capture setting removes the interval and stage inspector from the task flow.

Alternative considered: automatically regenerate on parameter edits. Rejected because image generation is potentially expensive and would obscure the causal relationship between an intentional run and the result.

### Use the Contact Sheet prototype for final image and stage inspection

The production workspace SHALL implement the `.design-preview/03-contato.html` Contact Sheet composition: controls span the workspace first, the selected/final result sits in a dedicated two-column focus panel, and returned stages occupy one wide carousel with thumbnails below. The prior multi-proposal picker is prototype-only and SHALL NOT appear in the production workspace.

The final image gets a separate result frame and download control. If stages are returned, the lower observation field offers one large selected item, previous/next actions, and a thumbnail strip; selection is represented by both a label and persistent state styling. This preserves the Contact Sheet prototype's comparison-oriented reading without making every stage equally large.

Alternative considered: a full contact sheet only. Rejected because it limits inspection of noisy intermediate images at useful size.

### Keep browser interaction accessible without adding a carousel dependency

Carousel navigation will use native buttons, a focusable scroll region, keyboard navigation, and `aria` state. CSS scroll snapping is sufficient for the visual track; reduced-motion users receive immediate scroll/selection updates. No carousel package is required.

Alternative considered: introduce a gallery library. Rejected because the needed interaction surface is small and package behavior would need substantial accessibility adaptation.

## Risks / Trade-offs

- [Backend response differs during parallel migration] → Keep `POST /image-visualizer/generate` and its documented request/response fields as the sole adapter expectation; test against representative payloads and show a recoverable failure for invalid responses.
- [Base64 or stage-image payloads increase page memory] → Render only the selected full stage and use appropriately sized thumbnail sources when the preserved response supplies them; avoid retaining additional transformed copies.
- [A long stage sequence makes the thumbnail strip dense] → Keep ordered horizontal scrolling, explicit selected metadata, and previous/next navigation.
- [A completed result can be mistaken for current settings] → Derive and announce stale state whenever a generation parameter changes.

## Migration Plan

1. Land the backend endpoint migration at `POST /image-visualizer/generate` with the documented request and response contract.
2. Deploy the frontend workspace with its adapter targeting the configured endpoint.
3. Verify a successful normal `{ prompt }` run, a captured `{ prompt, capture_steps: true, capture_every }` run, validation/failure states, locale switching, keyboard navigation, and download behavior against the migrated backend.
4. Roll back by restoring the Image Visualizer route to its placeholder if the endpoint is unavailable or contract verification fails; no data migration is needed.
