## Why

The Token Visualizer is reachable from the Evelab catalog but currently stops at an under-construction page, while the separated EveLab API already exposes its generation and token-probability contract. Implementing the frontend now makes that backend capability usable as a focused, inspectable learning instrument.

## What Changes

- Replace the Token Visualizer placeholder with a localized experiment workspace for submitting a prompt using the legacy-compatible fixed generation settings.
- Call the existing `POST /token-visualizer` API through a configurable frontend base URL, without exposing provider credentials to the browser.
- Render returned prompt tokens as both a quick-reading token strip and an inspectable detailed list, alongside the generated word, selected output tokens, and their ranked alternatives.
- Provide explicit idle, loading, successful, and safe failure states; preserve the current catalog and all other experiment placeholders.
- Update the Token Visualizer destination requirement so it is no longer specified as an under-construction page.

## Capabilities

### New Capabilities

- `token-visualizer-workspace`: A localized, accessible token-probability experiment workspace backed by the EveLab API.

### Modified Capabilities

- `under-construction-experiment-pages`: Token Visualizer becomes functional while the remaining experiment destinations retain their honest placeholder behavior.

## Impact

- Affected frontend areas: routing, the experiment page composition, localization messages, styles, and a small API client/configuration boundary.
- Consumes the existing EveLab API contract at `POST /token-visualizer`; no backend endpoint or response migration is required.
- Adds no provider SDK or browser-side credential handling. Local deployment requires the backend to allow the frontend origin through its configured CORS list.
