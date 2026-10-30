## ADDED Requirements

### Requirement: Responsive mobile host
The published Web player SHALL fit the visible viewport, respect display cutouts and preserve canvas aspect ratio in portrait, landscape and fullscreen. Gameplay touches SHALL not scroll or zoom the page. Mobile rendering SHALL cap device pixel ratio at one by default to avoid multiplying render work on dense screens.

#### Scenario: Phone viewport changes
- **WHEN** the browser viewport changes orientation or enters fullscreen
- **THEN** the player resizes without stretching its content and controls remain inside the usable area

### Requirement: Web opening presentation
Reballance SHALL preserve the source aspect ratio of its title artwork, allow the player to skip the opening presentation once required content is ready, and avoid unbounded high-density output work with default settings.

#### Scenario: Opening artwork
- **WHEN** the opening is displayed on a wide or tall viewport
- **THEN** the title artwork retains its original proportions

#### Scenario: Skip opening
- **WHEN** the player taps the opening after required content is ready
- **THEN** the game enters the menu without waiting for the remaining animation
