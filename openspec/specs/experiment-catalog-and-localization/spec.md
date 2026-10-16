# experiment-catalog-and-localization Specification

## Purpose

Provide a static Evelab entry point that introduces planned computational experiments without suggesting that any legacy feature or live integration is already available.

## Requirements

### Requirement: React 18, Vite, and JavaScript provide the home-page foundation
The system SHALL deliver the static Evelab home page as a React 18 application built and served through Vite using JavaScript source files only. TypeScript, a backend, API integration, provider SDK, and external-service dependencies SHALL NOT be introduced.

#### Scenario: Build the home page
- **WHEN** the project build is run
- **THEN** Vite produces a static production build of the React 18 JavaScript home page without requiring a backend or external service

### Requirement: Home page introduces the planned experiment catalog
The system SHALL provide an Evelab home page with four clearly named cards: Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer. Each card SHALL explain the experiment's intended learning purpose and identify it as planned or unavailable. The cards SHALL NOT initiate an experiment, navigate to an experiment route, render demonstration data, or send a network request.

#### Scenario: Open the laboratory
- **WHEN** a person opens Evelab
- **THEN** the system presents the four planned-experiment cards without a generated result, demonstration result, or experiment workspace

#### Scenario: Inspect a planned experiment card
- **WHEN** a person reads or focuses a card
- **THEN** the system communicates its name, intended purpose, and unavailable status without presenting it as an actionable launch control

### Requirement: Dark laboratory design authority is applied
The system SHALL present the home page according to `DESIGN_GUIDELINES.md`: Dark Mode is canonical; Charcoal, Violet, Lavender, Coral, Yellow, and Off-white retain their documented semantic roles; and the experiment cards establish an intentional hierarchy without reproducing legacy styling.

#### Scenario: Open the home page
- **WHEN** a person opens Evelab
- **THEN** the page presents a quiet Minimalist Futuristic laboratory index without cyberpunk decoration, generic dashboard chrome, or fake visualization output

### Requirement: Home page is responsive and accessible
The system SHALL keep card content readable and logically ordered across compact and wide screens. It SHALL meet the color, contrast, semantic-token, and motion constraints in `DESIGN_GUIDELINES.md`. A card that is not actionable SHALL not receive button or link semantics.

#### Scenario: View cards on a compact screen
- **WHEN** a person opens the home page on a compact screen
- **THEN** the cards remain readable without requiring horizontal scrolling and preserve their planned-experiment status
