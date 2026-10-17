## Purpose

Provide a localized Evelab workspace for generating an image and inspecting the denoising states recorded during that same experiment run.

## ADDED Requirements

### Requirement: Image Visualizer provides a localized generation workspace

The system SHALL render `/experiments/image-visualizer` as a functional workspace in the active Portuguese (Brazil) or English locale. The workspace SHALL present an image-description input, an explicit image-generation action, a capture-steps toggle, and a capture interval when step capture is enabled.

#### Scenario: Open Image Visualizer

- **WHEN** a visitor opens the Image Visualizer destination
- **THEN** the system presents the localized image-generation controls and no under-construction status

#### Scenario: Disable step capture

- **WHEN** a visitor disables capture of denoising steps
- **THEN** the capture interval and step-specific output controls are unavailable while final-image generation remains available

### Requirement: Image Visualizer preserves the configured backend contract

The system SHALL send a valid generation request to `POST /image-visualizer/generate` on the configured API base URL using `Content-Type: application/json`. When stage capture is disabled, the request body SHALL be `{ "prompt": string }`. When stage capture is enabled, it SHALL be `{ "prompt": string, "capture_steps": true, "capture_every": positive integer }`. The browser SHALL NOT send provider credentials or redefine the endpoint contract.

The browser SHALL accept a successful response containing `prompt`, `num_inference_steps`, and `final_image_png_base64`, plus an optional `captured_steps` array. Each captured stage SHALL contain `step`, `timestep`, and `png_base64`; returned stages SHALL retain their response order. The client SHALL reject a response whose final image or any returned stage has absent, non-string, or unusable PNG Base64 data, or whose required structural fields are malformed, and SHALL expose a recoverable failure instead of rendering it.

#### Scenario: Generate with captured stages

- **WHEN** a visitor submits a valid prompt with step capture enabled
- **THEN** the system sends `{ "prompt", "capture_steps": true, "capture_every" }` and renders the final image with the returned stages in their response order

#### Scenario: Generate without captured stages

- **WHEN** a visitor submits a valid prompt with step capture disabled
- **THEN** the system sends `{ "prompt" }` and renders the returned final image without a denoising-stage inspector

#### Scenario: Receive malformed image data

- **WHEN** the endpoint returns a successful response with a missing or invalid final PNG Base64 value, or malformed captured-stage fields
- **THEN** the system does not render partial image evidence and presents its localized recoverable failure state

### Requirement: Image Visualizer makes denoising stages inspectable

When the generation response contains denoising stages, the system SHALL show an explicit selected stage and an ordered stage carousel with selectable thumbnails. Visitors SHALL be able to select a stage using pointer, keyboard, or the previous and next controls; the selected state SHALL be communicated without relying only on color. The interface SHALL identify the selected stage's `step` and `timestep`. The final image SHALL remain separately identifiable and downloadable using only the returned `final_image_png_base64`.

#### Scenario: Select a recorded stage

- **WHEN** a visitor selects a stage thumbnail or moves through the carousel controls
- **THEN** the corresponding stage becomes the selected carousel item and the interface identifies its step and state

#### Scenario: Download the final image

- **WHEN** a visitor activates the final-image download control after a successful generation
- **THEN** the browser initiates a PNG download constructed from the returned `final_image_png_base64` without replacing the visible experiment state

### Requirement: Image Visualizer exposes explicit request and stale-result states

The system SHALL validate an empty prompt before sending a request and SHALL communicate loading, failure, and successful-completion states through accessible text. If a visitor changes any generation parameter after a successful request, the system SHALL mark the visible result as based on the previous parameters until another request completes.

#### Scenario: Submit an empty prompt

- **WHEN** a visitor activates image generation without a prompt
- **THEN** the system identifies the prompt as invalid and does not send a request

#### Scenario: Change parameters after generation

- **WHEN** a visitor changes the prompt, capture toggle, or capture interval after a successful generation
- **THEN** the system marks the existing result as stale and offers the same explicit generation action

