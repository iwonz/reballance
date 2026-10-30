# Verification record

## Checks

Verified on 2026-10-30 with Unity 6000.6.7f1.

- `Ballance2.Editor.BuildChecks.Run` passed (`/private/tmp/reballance-mobile-release-checks-latest.log`): target modules, resource paths, localization, virtual mobile input and Android saved bindings.
- Rendered `Ballance2.Editor.MobileInputChecks.RunPrefabIntegration` passed. The final themed menu run is `/private/tmp/reballance-mobile-remaster-menu-final10.log`; earlier card/control coverage is in `/private/tmp/reballance-mobile-card-final2.log`. Real prefabs, Canvas, GraphicRaycaster and EventSystem verify Continue priority, scroll ownership, analog dispatch, release/cancel/menu cleanup and inert replacement keypads. Five saved layouts, four viewport sizes and three requested key sizes cover 48-logical-pixel targets, wrapped labels and separate card/control regions. Remaster main/level menus additionally verify all four sizes, Russian footer labels and scroll-to-first/last action hits at 320-pixel portrait and 568-pixel landscape widths.
- Rendered `Ballance2.Editor.MobileTutorialChecks.Run` passed (`/private/tmp/reballance-mobile-tutorial-lifecycle.log`, generated `Builds/checks/tutorial-*/report.txt`). The real first-level fixture uses isolated persistence, bound Continue/Skip buttons and authored extra-life/transformation callbacks. It verifies introductory progression, rapid duplicate input, exact pause snapshots, paused spawn, later Continue/Skip, camera-stage skip, fall/pause/recovery, restart during spawn and exit cleanup. Directed callbacks do not establish manual traversal of every trigger.
- Context checker and its 5 tests, localization (348 Russian strings), physics ABI (92 delegates), 18 release-tool tests, 11 Web-performance-tool tests, Node tilt/permission tests, strict OpenSpec validation and whitespace checks passed. Commands are `scripts/check-agent-context.py`, `test-agent-context.py`, `check-localization.py`, `check-physics-abi.py`, `test-release-tools.py`, `test-web-performance.py`, `node scripts/test-mobile-tilt.js`, `openspec validate --all --strict --no-interactive` and `git diff --check`. Performance-tool self-tests do not measure phone performance.
- Content-aware WebGL and all four native target builds passed. `scripts/package-build.py` produced version 1.0.2 archives and SHA-256 sidecars for all five platforms. CRC/content, identity/version, executable permissions and checksums passed. Web/native runtime-source hashes match; the later lifecycle verifier is editor-only.
- APK validation passed: 1.0.2/code 15, ARM64-only, v2 signature, `zipalign -P 16`, all six native libraries with LOAD alignment at least 16384. Windows/Linux binaries and physics plugins are x86-64. macOS packaging passed native physics smoke ABI 2304; canonical installation and startup to MenuLevel passed.

## Results

All five changed requirements have implementation and verification coverage:

| Requirement | Implementation and evidence |
| --- | --- |
| Permission-aware touch priority | MobileControls/keypad controls; prefab raycasts, touch Continue, held joystick, cancellation and paused layout changes |
| Pause and resume | GamePlayManager/lightning lifecycle; browser paused spawn/fall and directed snapshot/cancellation checks |
| Single tutorial progression | TutorialController; bound buttons share keyboard/gamepad handling, debounce, later hints and restart/exit cleanup |
| Responsive touch guidance | TutorialCardLayout/MobileUILayout; themed cards, text scrolling, fixed actions and four viewport sizes |
| Compact gameplay menu | MobileControls/MobilePauseLayout/MobileMenuList and RemasterMenuLayout; touch navigation, separate HUD space and reachable scrolled footer actions |

Actual Chrome 156 and WebKit 26.6 completed the introductory camera, overhead and movement steps through Continue without skipping or keyboard input. Chromium held the joystick long enough to move the ball off the start platform, paused during the resulting fall, resumed to a respawn with one life consumed and the joystick restored, then exercised simultaneous movement/overhead touches and cancellation. The final full-screen sensor prompt consumed an outside tap, Cancel returned to settings, and the fallback joystick/status remained available after resume. Screenshots use `/private/tmp/release-R-chrome-*`.

WebKit uses its actual engine with maxTouchPoints zero and a coarse pointer. Its mobile layout appeared, tutorial Continue and each pause round trip worked, and portrait/landscape/card/menu layouts were inspected at widths 320, 412 and 568. The final level grid scrolled to readable 64-pixel footer buttons; Back and Replay tutorial were activated by touch. Text and long-menu scrolling were also inspected using pointer drags. Earlier WebKit checks exercised center-layout selection, restart, narrow-screen camera-stage skip and exit. Screenshots use `/private/tmp/final-Reballance-webkit-*` and `/private/tmp/release-Reballance-webkit-*`. The remaster keeps its own cards, font, icons and menu grid; Ballance presentation is separate.

Earlier integration checks caught rotated-icon/control overlap, center-camera/card intersection and undersized/clipped menus. The fixes passed subsequent checks. The new menu fixture first needed the production panel theme, adequate footer-label height and an explicit offscreen Canvas refresh. Unity's offscreen rectangle test clips to the editor display, so larger sizes are checked structurally and in browsers while in-display portrait/landscape fixtures verify raycasts. Earlier Unity Analytics shutdown crashes and editor search-index exceptions were editor diagnostics; successful isolated reruns are recorded above. Generated editor/settings changes and staging meta GUIDs were restored.

The larger `build-original-and-remaster-editions` change remains open; this record accepts only the mobile blocker fix. Release delivery uses the verified five-platform archives and matching Pages player. Uploaded digests and public behavior are checked after publication; this is pre-publication source/build acceptance, not a claim that hosted CI tests Unity gameplay. Pages must be dispatched from main with the explicit version tag.

## Limitations

No physical Android/iPhone, real sensor, device ergonomics, audible-output validation or budget-phone frame-rate claim. `adb devices -l` found no device and no Android emulator was available. Browser emulation, pointer-drag scrolling and directed trigger callbacks do not certify real Safari finger gestures or full-level playthroughs. Native Windows/Linux execution and all thirteen complete levels were not tested. Android is test-signed; macOS is ad-hoc signed without notarization. Native iOS remains excluded.
