## 1. Text generation boundary

- [x] 1.1 Add a dedicated `/text-visualizer` client with the documented payload and response validation; verify its unit tests cover success, malformed payload, request failure, and omission of `mode`.

## 2. Reading-trace workspace

- [x] 2.1 Add localized Text Visualizer copy and replace the text-experiment placeholder with a functional prompt and request-state workspace; verify route rendering and localized validation/loading/failure states.
- [x] 2.2 Render returned output tokens directly as selectable reading-trace units and preserve visible spaces, tabs, fragments, and line breaks; verify formatter and selection behavior with focused tests.
- [x] 2.3 Add the selected-token inspector and submitted-prompt context; verify keyboard selection updates the selected probability and ranked alternatives.

## 3. Presentation and regression verification

- [x] 3.1 Add responsive, focus-visible, reduced-motion-aware styles consistent with the approved reading-trace preview; verify desktop and narrow viewport rendering.
- [x] 3.2 Run the frontend test suite, production build, and OpenSpec strict validation; verify the existing Token Visualizer remains functional.
