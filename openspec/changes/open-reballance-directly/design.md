## Context

The user wants the actual player at the repository root, with no landing or
intermediate redirect. They explicitly accept losing the prior /play/ browser
profile; no save migration is required. Native application data is unaffected.

## Decisions

Extract the verified player directly into the Pages root. Keep only a small
/play/ bookmark redirect, preserving query and fragment. Remove unused landing
assets and presentation scripts. README and CREDITS retain project history and rights.

Point the Web template's About and post-save exit to the repository README. For the
already-published archive, preparation narrowly replaces the two legacy host links
in its HTML only; Build and StreamingAssets bytes and archive checksum stay unchanged.
Restart still reloads the current player and save synchronization remains untouched.

Check out the immutable workflow SHA for hosting tools/entry/notices; the explicit
release tag still selects and validates the game archive. Manual dispatch from main
can publish this host change without republishing five binary players.
Workflow provenance records the host SHA; release.json continues to identify the game.

## Risks / Validation

Unity's browser save namespace changes from /reballance/play/ to /reballance/ as
authorized. No browser databases are deleted; old data is simply not imported.
Test root rendering, legacy bookmark navigation, About and restart/exit handling.
Retain archive safety, no-overwrite and total-size checks. Compare all game payload
bytes to the archive, dispatch v1.0.0, verify public identity and exercise the game.

## Migration

Push main and dispatch Pages for v1.0.0. Roll back the host by selecting its previous
workflow ref; select the game version with the tag input. No tag moves, new release,
save import or native installation is needed.
