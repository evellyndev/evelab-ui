# Evelab UI

Evelab is a computational experimentation laboratory. This repository currently provides its localized experiment index and four under-construction destinations; it does not migrate or simulate the legacy tools.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the Vite server:

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Build and preview

Create a production build:

```bash
npm run build
```

Preview it locally:

```bash
npm run preview
```

When deploying to static hosting, configure an application-shell fallback for the experiment paths below.

## Routes

- `/` — experiment index
- `/experiments/token-visualizer`
- `/experiments/text-visualizer`
- `/experiments/hallucination-path`
- `/experiments/image-visualizer`

Each experiment route intentionally displays an under-construction page.

## Language

The interface supports Portuguese (Brazil) and English. The language switcher persists an explicit choice locally in the browser; it does not call a translation service.

## Technology

- React 18
- Vite
- Tailwind CSS
- JavaScript only — TypeScript is intentionally not used

## Current boundary

There is no backend, API integration, provider SDK, analytics request, live model, generated result, or functional migration of the legacy repository. Cards are navigational only and lead to localized placeholders until each experiment receives its own approved implementation plan.
