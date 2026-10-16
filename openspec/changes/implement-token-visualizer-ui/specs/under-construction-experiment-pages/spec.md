## MODIFIED Requirements

### Requirement: Each planned experiment has an addressable placeholder destination
The system SHALL provide a distinct addressable destination for Token Visualizer, Text Visualizer, Hallucination Path, and Image Visualizer. Opening Token Visualizer directly or from the catalog SHALL render its functional workspace. Opening any of the remaining experiment destinations directly or from the catalog SHALL identify the selected experiment and present an explicit under-construction status.

#### Scenario: Open a destination from the catalog
- **WHEN** a visitor activates the Hallucination Path card
- **THEN** the system opens the Hallucination Path destination and identifies it as under construction

#### Scenario: Open Token Visualizer from the catalog
- **WHEN** a visitor activates the Token Visualizer card
- **THEN** the system opens the Token Visualizer workspace instead of an under-construction page

#### Scenario: Open a destination directly
- **WHEN** a visitor opens a valid experiment destination URL directly
- **THEN** the system renders the Token Visualizer workspace for its route or the matching under-construction page for every other experiment route
