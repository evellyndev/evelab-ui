## 1. Integration boundary and localization

- [x] 1.1 Add a frontend API client that reads `VITE_API_BASE_URL`, safely constructs `POST /token-visualizer`, sends the supported word-mode payload, and normalizes non-success responses; verify it with focused request/response tests or a controlled mock.
- [ ] 1.2 Add Portuguese (Brazil) and English workspace copy for controls, validation, request states, result labels, token metadata, and safe failures; verify switching languages updates the active Token Visualizer screen without navigation.

## 2. Token Visualizer workspace

- [x] 2.1 Route only `/experiments/token-visualizer` to a dedicated workspace while retaining the existing placeholders for the other experiment routes; verify direct navigation and catalog navigation produce the correct destination in each case.
- [ ] 2.2 Implement the prompt form with fixed legacy-compatible `top_k: 5` and `temperature: 0.0`, local empty-prompt validation, and duplicate-submit prevention; verify the prompt persists through loading, success, and failure states.
- [ ] 2.3 Connect form submission to the API client and render explicit idle, loading, success, validation-error, and request-failure states; verify a successful response and an unavailable-service response in the browser.

## 3. Evidence visualization and accessibility

- [ ] 3.1 Render the generated word, ordered selected output tokens, their selected probabilities, and ranked alternatives with a pointer- and keyboard-operable selected-token inspector; verify selection remains visible and inspectable without color alone.
- [ ] 3.2 Render an ordered compact prompt-token strip above the result plus a detailed list of ids and byte sequences with a readable decoded display only when independently safe; verify an input containing non-displayable token bytes retains every distinct token boundary.
- [ ] 3.3 Apply responsive, reduced-motion, focus, and live-status styling consistent with `DESIGN_GUIDELINES.md`; verify compact viewport, keyboard navigation, and reduced-motion behavior manually.

## 4. Verification and deployment readiness

- [x] 4.1 Run `npm run build` and verify the Token Visualizer does not include provider credentials or hard-coded local API origins in its production bundle.
- [ ] 4.2 Run the EveLab API with `CORS_ORIGINS` configured for the frontend origin and verify an end-to-end word-mode request from `http://localhost:5173` succeeds.
- [ ] 4.3 Validate the completed OpenSpec change with `openspec validate implement-token-visualizer-ui --strict`.
