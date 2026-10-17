## Why

Image Visualizer is the remaining Evelab experiment destination that still presents an under-construction page. The legacy-compatible backend endpoint is being migrated in parallel, so the frontend now needs a real workspace that can inspect the final image and its denoising progression without introducing a second API contract.

## What Changes

- Replace the Image Visualizer placeholder at `/experiments/image-visualizer` with a localized image-generation experiment workspace.
- Submit generation requests to `POST /image-visualizer/generate` on the configured API base URL. A normal request contains `{ "prompt": string }`; a request with stage capture additionally contains `{ "capture_steps": true, "capture_every": positive integer }`.
- Consume the backend response contract containing `prompt`, `num_inference_steps`, optional ordered `captured_steps` (`step`, `timestep`, `png_base64`), and `final_image_png_base64`.
- Present the prompt controls first, a selected image state second, and a denoising-stage carousel with selectable thumbnails last.
- Allow a visitor to enable or disable capture of denoising steps with an accessible toggle; hide step-specific controls and evidence when capture is disabled.
- Provide explicit loading, validation, failure, stale-result, and completion states, plus an accessible download action for the final image.
- Preserve the active Portuguese (Brazil) or English locale and Evelab’s dark experiment-workspace visual system.

## Capabilities

### New Capabilities

- `image-visualizer-workspace`: Localized image-generation workspace, preserved endpoint contract, inspectable denoising stages, and accessible request/result states.

### Modified Capabilities

- `under-construction-experiment-pages`: Image Visualizer no longer renders as an unavailable destination; it opens its functional workspace.

## Impact

- Affected frontend areas: route selection, localization, Image Visualizer UI, styles, request client, and automated tests.
- Affected integration: the configured backend Image Visualizer endpoint at `POST /image-visualizer/generate`, whose request and response contract remains the source of truth during its parallel migration.
- No provider credentials, provider SDKs, or new API contract are introduced in browser code.
