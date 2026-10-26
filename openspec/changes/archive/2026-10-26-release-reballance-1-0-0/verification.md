## Checks

- Release-tool tests: 17 passed; installer tests: 20; context self-tests: 5; Web performance checker self-tests: 11. JavaScript and shell syntax checks passed.
- Localization: 341 Russian translations in 12 resources. ABI signatures: 92 delegates. ARM64 native physics smoke passed ABI 2304.
- Strict OpenSpec/context checks passed after the acceptance decision and release planning update.
- Final `openspec validate --all --strict --no-interactive`: 14 items passed.
  `python3 scripts/check-agent-context.py --base 3cf380a1` and `git diff --check` passed.
- Both READMEs retain identical section order and the original rights notice; LICENSE and CREDITS.md are unchanged in this release work.
- GitHub Pages was configured for Actions in iwonz/reballance. The generated environment keeps main and adds only the intended v1.0.0 tag, without changing unrelated protection rules.

## Results

The user simplified the prior publication gate on 2026-10-26. Initial delivery
uses build/package validation and available player smoke, with unfinished full
qualification disclosed. The broader feature change stays open. Release tasks
were moved into this scoped record, not duplicated or marked done prematurely.

Version 1.0.0 and Android versionCode 13 are prepared. Old dev.11 archives/checksums
were verified before deleting their unpacked platform output directories.
All five builds (macOS, Windows, Linux, Android and WebGL) completed with exit 0 and all 13 levels.
The Mac archive passed signature/round-trip/native smoke (ABI 2304); desktop archive
identities, all level lists and SHA-256 sidecars passed. Android manifest has version
1.0.0/code 13, only ARM64 native libraries, valid v2 signature and 16 KB zip alignment.
Web compilation and packaging completed with exit 0. All five SHA-256 sidecars
match their release assets. The Web archive checksum is
03fb341664ae694662d094c2b9d8962951dda09ce8a029478d670aa7c17b3c61.
Android packaged IVP loadable segments match the source plugin (excluding stripped
ELF section-table header metadata); all LOAD segments have 16 KB alignment.
All 12 uploaded GitHub files matched their local names, sizes and SHA-256 digests.
Release v1.0.0 was published from source commit a2fd2e63. Pages workflow
40344449516 succeeded, including its public identity/checksum check.
All 12 public landing, legal, identity and player Build files matched the prepared
archive byte-for-byte over HTTP. Public Chrome verification also passed: landing-to-player navigation, Russian menu,
Standard level 1, tutorial skip, held Right movement, fall and respawn (3 lives to
2), Escape pause, confirmed exit, visible menu return and the host About link back
to the landing. The test used an isolated incognito session. This was a short
functional smoke, not a frame-rate or audible-audio qualification.

The installer replaced /Applications/Reballance-dev.app with the verified
/Applications/Reballance.app 1.0.0 and removed the unpacked source app. Existing
settings were retained: the Russian main menu and level selection showed Moscow.
The native log reached level 1 GamePlayManager Start without a gameplay exception.
The snowy first-level scene and HUD were subsequently observed. CUA window/focus
errors prevented a reliable native movement/respawn observation. The app closed
normally through its native Quit menu; its log is retained with the release checks.
The exact Web archive was prepared with prepare-site.py under /reballance/.
Local Chrome checks passed: RU/EN landing, release badge/download link 1.0.0,
player navigation, Russian menu, Standard preset, level 1, tutorial skip, held
Right input, fall and recovery (three lives to two), Escape pause, exit confirmation
and visible return to the menu. Native movement remains unverified; the Web result
is separate evidence rather than a substitute for a native observation.

The final filesystem audit across /Applications, ~/Applications, ~/Desktop and
~/Downloads found exactly two game bundles: Ballance.app 1.0.12 and
Reballance.app 1.0.0. No obsolete game .app.disabled or -dev application remained.
Finder showed both canonical applications; the separate system Apps search was not
visually checked because opening Apps.app timed out. Saves and release archives were retained.

## Limitations

The 91 full playthroughs, comprehensive visual acceptance, all ball/mechanism
calibration, frame-rate replay and Full HD/QHD/4K performance qualification are
unfinished. Physical Android, Windows/Linux gameplay and the RTX 3060/i5-12400
reference machine are unavailable. Earlier directed integration cases and Apple
M3 Web observations remain historical evidence, not freshly rerun full acceptance.

The public cold-load screen still displays the legacy title BALLANCE / REMASTER
from GameGlobalIngameLoading. The subsequent main menu is branded Reballance.
This is a remaining UI branding defect, not a completed rename acceptance.

Delivery artifacts follow the planned independent version/identity contracts;
no runtime or native binaries were changed after the tagged builds. The scoped
release is complete; broader feature and qualification tasks remain active.
