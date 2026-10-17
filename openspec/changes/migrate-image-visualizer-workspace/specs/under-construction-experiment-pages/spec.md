## MODIFIED Requirements

### Requirement: Addressable destinations for available and preparing experiments

The system SHALL provide a distinct addressable destination for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer. Opening Token Visualizer, Text Visualizer, or Image Visualizer directly or from the catalog SHALL render its functional workspace. Opening Hallucination Path directly or from the catalog SHALL identify the selected experiment and present an explicit under-construction status.

#### Scenario: Open Hallucination Path from the catalog

- **WHEN** a visitor activates the Hallucination Path card
- **THEN** the system opens the Hallucination Path destination and identifies it as under construction

#### Scenario: Open Token Visualizer from the catalog

- **WHEN** a visitor activates the Token Visualizer card
- **THEN** the system opens the Token Visualizer workspace instead of an under-construction page

#### Scenario: Open Image Visualizer from the catalog

- **WHEN** a visitor activates the Image Visualizer card
- **THEN** the system opens the Image Visualizer workspace instead of an under-construction page

#### Scenario: Open a valid experiment destination URL directly

- **WHEN** a visitor opens a valid experiment destination URL directly
- **THEN** the system renders the Token Visualizer, Text Visualizer, or Image Visualizer workspace for its matching route, or the Hallucination Path under-construction page for its matching route
