## Why

Reballance cannot be played from a phone browser because its touch controls are excluded from Web builds. Android also needs reliable multi-touch, interruption recovery, and optional calibrated tilt control. Reballance additionally has reported slow startup, uneven Web frames and stretched opening artwork.

## What Changes

- Enable existing configurable touch layouts on mobile Web and Android, with an analog joystick default for new profiles, camera buttons/swipe gestures and a reachable pause action.
- Reset touch state on release, cancellation, pause, focus loss, orientation changes and layout replacement; keep desktop bindings intact.
- Add opt-in tilt control in mobile settings, calibration, browser permission handling and touch fallback when sensors are unavailable.
- Correct the distorted title artwork and reduce avoidable Web startup/rendering costs using measured evidence.
- Build and package all five supported targets; publish a new version in this repository and deploy matching GitHub Pages.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `player-input`: Mobile Web controls, reliable touch lifecycle, camera gestures and optional tilt.
- `package-management`: Reuse the startup archive download between metadata and content loading.
- `web-publication`: A responsive touch-safe host with bounded pixel density. Aspect-correct opening artwork and bounded startup/presentation work.

## Impact

Touch controllers, gameplay UI/settings, existing keypad assets and localization, Web template/sensor integration, editor checks, documentation and release version. Native IVP interfaces, saved bindings and edition/storage identity remain stable. No iOS release or unrelated remaster environment qualification is included.

The older `build-original-and-remaster-editions` change retains its broad unfinished art, physics and reference-hardware qualification. This scoped regression fix does not mark those tasks complete or replace those acceptance budgets.
