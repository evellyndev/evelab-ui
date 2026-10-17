## 1. Endpoint contract boundary

- [x] 1.1 Add an Image Visualizer API client for `POST /image-visualizer/generate`: send `{ prompt }` for normal generation and `{ prompt, capture_steps: true, capture_every }` for captured generation, with `Content-Type: application/json`; verify request construction and absence of browser-delivered credentials with unit tests.
- [x] 1.2 Define representative response fixtures containing `prompt`, `num_inference_steps`, `final_image_png_base64`, and optional ordered `captured_steps` (`step`, `timestep`, `png_base64`); verify the client exposes ordered renderable PNG data and rejects missing, invalid, or malformed Base64/image fields.

## 2. Workspace and route

- [x] 2.1 Replace the Image Visualizer placeholder route with a localized workspace entry and verify direct navigation and catalog navigation open the workspace in Portuguese and English.
- [x] 2.2 Implement controlled prompt, capture-toggle, and positive-integer capture-interval controls; verify disabling capture hides step-only controls and sends the normal `{ prompt }` body, while enabling capture sends `capture_steps: true` and `capture_every`.
- [x] 2.3 Implement validation, loading, failure, success, and stale-result messaging and verify each state is announced and prevents duplicate or invalid requests as specified.

## 3. Result inspection

- [x] 3.1 Render the returned `final_image_png_base64` in a separately identified result frame with a download action; verify the generated PNG data URL/download uses that response value without replacing the active result.
- [x] 3.2 Implement the ordered `captured_steps` carousel, previous/next controls, selected-stage `step` and `timestep` detail, and thumbnail strip; verify pointer and keyboard selection expose a non-color selected state.
- [x] 3.3 Ensure stage evidence is absent for final-only results and verify compact layouts, focus treatments, and reduced-motion behavior against `DESIGN_GUIDELINES.md`.

## 4. Integration verification

- [ ] 4.1 Run the frontend build and automated tests, adding coverage for the Image Visualizer API client and workspace interaction paths.
- [ ] 4.2 Exercise `POST /image-visualizer/generate` against the migrated backend using normal and captured request modes; verify exact request bodies, Base64 final download, malformed-payload error handling, and ordered stage rendering end to end.
