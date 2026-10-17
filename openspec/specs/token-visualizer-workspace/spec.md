# token-visualizer-workspace Specification

## Purpose

Provide an interactive, localized workspace that explains how a submitted prompt and generated word are represented as model tokens and probabilities.

## Requirements

### Requirement: Token Visualizer provides a localized generation workspace
The system SHALL render `/experiments/token-visualizer` as a functional workspace in the active Portuguese (Brazil) or English locale. It SHALL provide a labeled prompt input and a control to run word-mode generation using the legacy-compatible fixed generation settings. The workspace SHALL keep the active locale while the visitor works.

#### Scenario: Open Token Visualizer
- **WHEN** a visitor opens the Token Visualizer destination
- **THEN** the system presents localized input and an explicit action to generate a token visualization

#### Scenario: Submit invalid prompt locally
- **WHEN** a visitor attempts to generate using an empty or whitespace-only prompt
- **THEN** the system prevents the request and exposes a localized validation message associated with the prompt input

### Requirement: Token Visualizer uses the configured backend contract
The system SHALL submit valid user input to the configured API base URL at `POST /token-visualizer` with `prompt`, fixed `top_k: 5`, fixed `temperature: 0.0`, `mode: "word"`, and the active locale. Provider credentials SHALL NOT be included in browser-delivered code, configuration, or requests.

#### Scenario: Run a token visualization
- **WHEN** a visitor submits a valid prompt
- **THEN** the system sends one request using the documented word-mode contract and represents that a generation is in progress until it settles

#### Scenario: API request fails
- **WHEN** the configured service is unavailable or responds without a successful token-visualization result
- **THEN** the system presents a localized safe failure state and allows the visitor to revise input or try again

### Requirement: Token Visualizer makes returned token data inspectable
The system SHALL render a successful response's generated text, ordered selected output tokens, selected probabilities, and ranked alternatives in a readable representation. It SHALL show ordered prompt tokens in a compact reading strip above the generated result and retain an inspectable detailed prompt-token list containing token id and byte values. A visitor SHALL be able to select an output token using pointer or keyboard input and receive a persistent detail view for that token's probability and alternatives. Token boundaries and token text SHALL remain unambiguous, including token byte values that cannot be independently decoded as displayable text.

#### Scenario: Inspect a selected output token
- **WHEN** a visitor selects an output token from a successful result
- **THEN** the system exposes that token's selected probability and the ordered alternative tokens with their probabilities

#### Scenario: Review prompt tokens with non-displayable bytes
- **WHEN** the API response includes a prompt token whose byte sequence cannot be independently rendered as text
- **THEN** the system preserves an inspectable representation of its token id and byte values without merging it with adjacent tokens

### Requirement: Token Visualizer has explicit and accessible request states
The system SHALL distinguish its idle, loading, success, validation-error, and request-failure states with text and non-color cues. While a request is pending, it SHALL prevent duplicate generation submissions while preserving the entered prompt. Result and status changes SHALL be available to assistive technology without unexpectedly moving focus.

#### Scenario: Await a generation result
- **WHEN** a visitor submits a valid prompt and the request remains pending
- **THEN** the system exposes a localized loading state and prevents a duplicate submission while retaining the form values

#### Scenario: Receive a successful result
- **WHEN** the API returns a valid token-visualization response
- **THEN** the loading state ends and the result becomes available for keyboard and assistive-technology inspection
