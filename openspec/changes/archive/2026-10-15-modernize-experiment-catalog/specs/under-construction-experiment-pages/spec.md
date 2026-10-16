## Purpose

Provide honest, localized destinations for selected Evelab experiments while their functional visualizations and integrations remain unavailable.

## ADDED Requirements

### Requirement: Each planned experiment has an addressable placeholder destination
The system SHALL provide a distinct addressable destination for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer. Opening a destination directly or from the catalog SHALL identify the selected experiment and present an explicit under-construction status.

#### Scenario: Open a destination from the catalog
- **WHEN** a visitor activates the Hallucination Path card
- **THEN** the system opens the Hallucination Path destination and identifies it as under construction

#### Scenario: Open a destination directly
- **WHEN** a visitor opens a valid experiment destination URL directly
- **THEN** the system renders the matching under-construction page

### Requirement: Placeholder pages do not imply functional migration
The system SHALL explain that the selected experiment is being prepared without rendering a fake visualization, sample result, input parameter control, execution status, backend integration, or provider-specific claim. The page SHALL offer a clear way to return to the catalog.

#### Scenario: View an under-construction destination
- **WHEN** a visitor opens an experiment placeholder page
- **THEN** the page communicates that the experiment is unavailable and does not present simulated computational behavior

#### Scenario: Return to the catalog
- **WHEN** a visitor activates the return control on a placeholder page
- **THEN** the system navigates to the Evelab experiment catalog

### Requirement: Placeholder pages are localized and accessible
The system SHALL render each placeholder page in the active Portuguese (Brazil) or English locale, preserve language selection across catalog and destination navigation, and expose its title, status, and return control to keyboard and assistive-technology users. The page SHALL retain the Dark Futurism visual identity and reduced-motion behavior defined in `DESIGN_GUIDELINES.md`.

#### Scenario: Switch language on a placeholder page
- **WHEN** a visitor changes language while viewing an under-construction destination
- **THEN** the destination title, status, and return control update to the selected language while the same experiment remains selected

