# interactive-experiment-catalog Specification

## Purpose

Provide Evelab’s localized laboratory index, allowing visitors to discover and open planned computational experiments through accessible, meaningful motion.

## Requirements

### Requirement: Catalog presents the planned instrument collection
The system SHALL present Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer as the initial Evelab experiment collection. Each card SHALL identify the experiment, state its intended exploration focus, and provide an explicit control to open its destination. The catalog SHALL use a laboratory-index hierarchy rather than marketing copy, product metrics, fake results, or a generic dashboard treatment.

#### Scenario: Open the Evelab home page
- **WHEN** a visitor opens the home page
- **THEN** the system presents the four planned experiments as a clear collection of computational instruments

#### Scenario: Inspect an experiment card
- **WHEN** a visitor views a catalog card
- **THEN** the system communicates the experiment name, its intended focus, and that the experiment is not yet available

### Requirement: Catalog cards are accessible navigation controls
The system SHALL make every experiment card reachable and operable using pointer, keyboard, and touch input. Activating a card SHALL navigate to the matching under-construction destination and SHALL NOT run an experiment, generate demonstration output, or send a network request. Visible focus and the selected/active state SHALL remain understandable without relying only on color or motion.

#### Scenario: Activate a card with a keyboard
- **WHEN** a keyboard user focuses and activates an experiment card
- **THEN** the system opens the matching under-construction destination and provides a visible focus treatment before activation

#### Scenario: Activate a card with a pointer or touch
- **WHEN** a visitor selects an experiment card using a pointer or touch input
- **THEN** the system opens the matching under-construction destination without starting a computation or network request

### Requirement: Card motion communicates interaction and respects preferences
The system SHALL give each catalog card a restrained experiment-specific visual response to hover, focus, and activation. The motion SHALL communicate that the card is selectable, preserve legibility, avoid layout shift, and use non-color cues. When a visitor requests reduced motion, the system SHALL replace non-essential animation with immediate static state changes while preserving the same interaction feedback.

#### Scenario: Focus a card with standard motion enabled
- **WHEN** a visitor hovers over or focuses an experiment card without a reduced-motion preference
- **THEN** the card provides a brief, localized visual response associated with its experiment motif

#### Scenario: Use the catalog with reduced motion enabled
- **WHEN** a visitor has requested reduced motion
- **THEN** card selection feedback remains visible without decorative or continuous animation

### Requirement: Catalog supports Portuguese and English
The system SHALL offer Portuguese (Brazil) and English as selectable interface languages on the catalog. All visitor-facing catalog text, including experiment titles where localized, descriptions, availability labels, navigation labels, and language-control text, SHALL be available in the active language. The system SHALL retain the visitor’s explicit language choice for a later visit in the same browser.

#### Scenario: Change the catalog language
- **WHEN** a visitor selects Portuguese or English
- **THEN** the catalog text updates to the selected language without requiring a backend request

#### Scenario: Return after choosing a language
- **WHEN** a visitor reopens Evelab in the same browser after explicitly selecting a language
- **THEN** the system uses the previously selected language

### Requirement: Catalog remains legible across viewport sizes
The system SHALL preserve the catalog’s reading order, card activation controls, text legibility, and visible focus treatment on compact and wide viewports without requiring horizontal scrolling. The visual language SHALL comply with the color, contrast, semantic-state, and responsive requirements of `DESIGN_GUIDELINES.md`.

#### Scenario: Open the catalog on a compact viewport
- **WHEN** a visitor opens the catalog on a compact viewport
- **THEN** they can read and activate every experiment card without horizontal scrolling or hover-only instructions
