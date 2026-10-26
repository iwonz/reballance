## Checks

- Release-tool tests: 17 passed; installer tests: 20; context self-tests: 5; Web performance checker self-tests: 11. JavaScript and shell syntax checks passed.
- Localization: 341 Russian translations in 12 resources. ABI signatures: 92 delegates. ARM64 native physics smoke passed ABI 2304.
- Strict OpenSpec/context checks passed after the acceptance decision and release planning update.
- Both READMEs retain identical section order and the original rights notice; LICENSE and CREDITS.md are unchanged in this release work.
- GitHub Pages was configured for Actions in iwonz/reballance. The generated environment keeps main and adds only the intended v1.0.0 tag, without changing unrelated protection rules.

## Results

The user simplified the prior publication gate on 2026-10-26. Initial delivery
uses build/package validation and available player smoke, with unfinished full
qualification disclosed. The broader feature change stays open. Release tasks
were moved into this scoped record, not duplicated or marked done prematurely.

Version 1.0.0 and Android versionCode 13 are prepared. Old dev.11 archives/checksums
were verified before deleting their unpacked platform output directories. New
All five builds (macOS, Windows, Linux, Android and WebGL) completed with exit 0 and all 13 levels.
The Mac archive passed signature/round-trip/native smoke (ABI 2304); desktop archive
identities, all level lists and SHA-256 sidecars passed. Android manifest has version
1.0.0/code 13, only ARM64 native libraries, valid v2 signature and 16 KB zip alignment.
Web compilation and packaging completed with exit 0. All five SHA-256 sidecars
match their release assets. The Web archive checksum is
03fb341664ae694662d094c2b9d8962951dda09ce8a029478d670aa7c17b3c61.
Android packaged IVP loadable segments match the source plugin (excluding stripped
ELF section-table header metadata); all LOAD segments have 16 KB alignment.
Site/browser checks and public release/Pages remain pending.

The installer replaced /Applications/Reballance-dev.app with the verified
/Applications/Reballance.app 1.0.0 and removed the unpacked source app. Existing
settings were retained: the Russian main menu and level selection showed Moscow.
The native log reached level 1 GamePlayManager Start without a gameplay exception.
The snowy first-level scene and HUD were subsequently observed. CUA window/focus
errors prevented a reliable native movement/respawn observation. The app closed
normally through its native Quit menu; its log is retained with the release checks.
Browser interaction is being checked separately.

## Limitations

The 91 full playthroughs, comprehensive visual acceptance, all ball/mechanism
calibration, frame-rate replay and Full HD/QHD/4K performance qualification are
unfinished. Physical Android, Windows/Linux gameplay and the RTX 3060/i5-12400
reference machine are unavailable. Earlier directed integration cases and Apple
M3 Web observations remain historical evidence, not freshly rerun full acceptance.
