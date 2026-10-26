## Why

The verified v1.0.11 recreation needs a stable Original edition while a separately
maintained Remaster introduces modern presentation and meaningful weather. A single
player, save namespace, and Pages deployment currently couple these products.

## What Changes

- Preserve the classic baseline and maintenance history in iwonz/ballance. Move Reballance history and development to iwonz/reballance. Each repository owns its main branch, documentation, releases and Pages; transfer shared fixes selectively.
- Keep independent edition versions, application identities, saves and build trees; publish each game independently from its own repository using v<version> tags.
- Modernize Remaster materials, skies, sound, all menu/HUD/tutorial flows and scalable
  rendering while preserving level topology and the calibrated dry gameplay baseline.
- Replace Remaster startup/About promotional branding with its own generated cloud-reveal title artwork; redesign records and every remaining menu control while preserving source license notices.
- Add seven environment presets, authored profiles for all thirteen built-in levels,
  gradual runtime switching, shared visual/contact state, checkpoint restoration and
  environment-independent records. Extend native IVP rather than substituting Unity physics.
- Publish the verified Reballance player at /reballance/ with direct entry owned by the scoped hosting change. Ballance remains independently hosted at /ballance/, preserving its browser storage. Remove the combined distribution manifest and release coupling.
- Rewrite README with repository ownership, run/development instructions, each game's real screenshot gallery, direct-upstream Credits tracing Cyparade → imengyu/Ballance → iwonz/ballance → Reballance and the unchanged upstream rights notice for both editions.
- Validate all five existing release platforms, the 91 level/preset combinations,
  frame-rate independence and actual hardware performance before claiming full environment qualification. Initial publication uses the user-approved simplified release checks with explicit limitations.

## Capabilities

### New Capabilities
- `game-editions`: Immutable Original baseline and independent maintenance/release identities.
- `remaster-environment`: Authored environment presets, surface state, weather physics and presentation.

### Modified Capabilities
- `user-interface`: Modern responsive Remaster UI, tutorials and resolution/quality controls.
- `player-persistence`: Edition isolation and shared Reballance records with preservation of earlier development scores.
- `physics-runtime`: Dynamic per-contact surface profiles and reproducible native builds.
- `platform-builds`: Edition-aware identity and release asset validation.
- `web-publication`: Verified single-player publication; direct entry is owned by open-reballance-directly.

## Impact

Touches gameplay/level lifecycle, IVP C++ and managed ABI, material/shader and prefab
assets, settings/localization, high scores, player building/packaging, scripts and CI,
README and operating guides. Unity stays at 6000.6.7f1 with Built-in rendering; no paid
dependency or mandatory new rendering package. Existing GUIDs, serialized identifiers,
package IDs, legacy release files and user work remain intact. Original presentation
is unchanged. iOS, new abilities, deep deformable terrain, and automatic cross-edition
save import are outside this change. Hardware and all-level acceptance remain unfinished qualification work, not inferred
from a successful build, publication or historical tests.

The user removed the separate landing on 2026-10-26. The scoped
open-reballance-directly change owns direct entry and hosting-only deployment;
this change no longer requires a promotional landing.
