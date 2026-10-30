## Checks

- Unity 6000.6.7f1 `Ballance2.Editor.BuildChecks.Run`: passed after the selector fix (before the later Web capability and one-line pause callback corrections), including virtual input, mobile pointer/calibration assertions, localization, modernization, graphics policy and six installed modules. Logs: `/private/tmp/reballance-mobile-selectorchecks.log`.
- `node scripts/test-mobile-tilt.js`: passed opt-in, orientation mapping, stale/background samples, cleanup, permission denial and late grant cancellation. `InputChecks.Run` also passed non-finite sensor values, dead zones, bounded force and pointer ownership/release.
- The browser bridge additionally passed desktop (zero touch points) and phone (five touch points) capability assertions. Strict OpenSpec validation, context validation/self-tests (5), localization (348 Russian strings), native ABI checks, release-tool tests (18), performance-checker tests (11), JavaScript syntax and actionlint passed. The installed Input System 1.20.1 source confirms gravity/acceleration use CompensateDirection with screen-orientation compensation enabled by default; no project override was found. Native macOS physics smoke passed ABI 2304; native binaries were not changed.
- `bash scripts/build.sh` followed by `python3 scripts/package-build.py` passed for macOS, Windows, Linux, Android and WebGL at version 1.0.1. A temporary inspection script verified all five SHA-256 sidecars, ZIP CRCs, embedded product/version identities, Linux executable permissions and Android ARM64 contents. Platform outputs are under `Builds/releases`. All five final artifacts were rebuilt after the shared pause callback correction. The final Web archive is 333,513,277 bytes, SHA-256 `5a8e85ee5298ab36a0491247721885ef0eff2a60ffbd456322d1672b3d9d51c0`.
- Android `apksigner verify --verbose` and `zipalign -c -P 16 4`: passed. All six ARM64 native libraries have LOAD alignment of at least 16 KiB. APK version is 1.0.1, version code 14, minimum SDK 26 and target SDK 36. Windows/Linux executable and physics plugin architectures are x86-64.
- Installed the packaged macOS player through `scripts/install-macos.py --apply` and launched the canonical `/Applications/Reballance.app`. The native log reached MenuLevel with packages loaded and no managed exception; closed the smoke player afterward. Native UI capture failed in the computer-use tool, so this establishes startup, not visually verified native gameplay.
- Reviewed the connected callers and final diff: existing field names, prefab paths, layout IDs, save identity, native interfaces and asset GUIDs remain stable. New assets have distinct GUIDs. No generated build, cache or binary changes belong to this source delivery.

## Results

Mobile settings and gameplay use the same runtime touch-capability check. New profiles select the existing left joystick; saved directional/joystick IDs remain available. Pointer ownership and release checks cover immediate movement, simultaneous camera input, cancellation and control replacement. Tilt is opt-in, calibrated and smoothed, with touch override and zero force for unavailable/stale samples.

Browser evidence uses headed Chrome 156, Android UA, five emulated touches and a 915x412 viewport at device DPR 3. The Web canvas renders at mobile DPR 1. Menu/level 01/tutorial skip, joystick plus second-finger camera, touch cancellation, pause/settings/back and fall/sector respawn were exercised during acceptance. The Ballance pass additionally exercised directional layout selection, movement with a second-finger camera control and drag-out release. The Reballance pass additionally exercised free-area camera swipes, restart confirmation and menu return. Evidence screenshots and console logs are retained locally under `Builds/checks/mobile`; browser emulation is not physical-device qualification.

The mobile 1.0.1 browser build before the Web capability correction passed touch scrolling over the layout cards through to Tilt, explicit permission opt-in, Tab focus within the permission dialog, synthetic neutral/tilted sensor samples and stale-sensor fallback status. The centered pause/recenter controls no longer overlap the life HUD. An earlier acceptance pass confirmed portrait canvas 412x869 without page overflow and fullscreen on `player`.

Final browser screenshots confirm a zero-touch desktop profile has keyboard settings and no mobile overlay; a fresh one-touch phone profile has the mobile layout at a 915x364 canvas. Early pause keeps settings accessible after the delayed spawn event. Tilt selection, reload in the same profile and level 01 entry restored the recenter controls and sensor fallback (reballance-reload-before-skip.png). The reload helper incorrectly waited for a tutorial Resume log after the saved profile had already skipped the tutorial; its timeout is retained, while screenshots directly establish the running game and persisted tilt layout.

Early acceptance exposed pause/HUD overlap, selector contrast, legacy EventTrigger drag interception and a delayed spawn event restoring the overlay over the pause menu. The callback now consults the current playing state. The final controls are centered above gameplay and the layout cards use Unity Buttons so ScrollRect receives swipes. Earlier in-flight builds were intentionally stopped (exit 143); generated staging was moved aside and the complete five-target set was rebuilt from the corrected source. A guarded retry rejected leftover staging rather than combining content. Temporary Android input settings were restored to Both; the tracked staging GUID was preserved.

`EnvironmentChecks.Run` passed title ratio 1672:941, cloud cache sizes 64/64/256 and existing environment/save fixtures. The rendered final opening retains the round ball/source proportions; tapping after readiness reached the menu 1,911 ms after intro entry. Startup resource inspection found each built-in archive once, including the 53,533,746-byte core; v1.0.0 fetched its 46,451,375-byte core twice (about 8.51 s and 5.02 s). Localhost elapsed times are not compared directly with public CDN times.

Two baseline, two interim and two final runs used `scripts/measure-web-performance.js`, Chrome 156 on Apple M3 / ANGLE Metal, the same 1280x900 viewport, DPR 2 and 2560x1703 Web canvas, 10-second warmups and 30-second menu/level captures. Final captures used fresh desktop Medium defaults, with native players closed and builds finished; screenshots confirm keyboard gameplay without mobile controls. The interim builds incorrectly selected mobile quality on desktop and are retained separately. Raw JSON and before/after screenshots remain in `Builds/checks/mobile`; all runs, including the slower second baseline, are retained.

| Version / report ID | Menu submissions/s | Menu GPU p95 ms | Level 01 submissions/s | Level 01 GPU p95 ms |
| --- | ---: | ---: | ---: | ---: |
| 1.0.0 / 1793302895465 | 59.96 | 89.04 | 59.97 | 114.59 |
| 1.0.0 / 1793306338765 | 45.16 | 236.39 | 56.7 | 111.68 |
| Interim 1.0.1 / 1793306524490 | 59.96 | 40.17 | 59.96 | 25.4 |
| Interim 1.0.1 / 1793306664801 | 59.96 | 39.94 | 59.99 | 28.76 |
| Final 1.0.1 / 1793344674879 | 59.96 | 70.43 | 59.96 | 91.76 |
| Final 1.0.1 / 1793344783950 | 59.96 | 33.07 | 59.97 | 88.34 |

The final level captures reduced GPU p95 from 111.68–114.59 ms to 88.34–91.76 ms on this machine. Menu timings vary substantially, so no universal percentage is claimed. Interim runs include a lower-quality default and cannot isolate the cloud-cache improvement. All six `check-web-performance.py` runs exited 1 because the responsive canvas differs from the strict 1920x1200 reference; GPU p95 also remains above its 16.67 ms budget. These are comparative default-setting measurements, **not a qualified 60 FPS pass**, real phone timing, or completion of the broader remaster performance task.

Completeness, correctness and coherence review found the scoped requirements implemented with matching callers, tests and operational guidance. This record describes pre-publication verification; release asset inspection, Pages identity and public browser smoke follow the archived source commit and are reported with delivery.

## Limitations

`adb devices -l` reported no connected phone. Physical Android touch, real sensor orientation/calibration/comfort, native lifecycle/audio and real mobile GPU performance remain unverified. Windows/Linux gameplay and a full thirteen-level playthrough were not run. Audible output is not established by browser capture. macOS is ad-hoc signed, not notarized; Android is a test-install APK.

The existing `GlobalGamePermissionTipDialog` missing-script warning is tracked in the source map. Blocked Unity telemetry, favicon requests and pre-gesture audio/FMOD diagnostics did not prevent the observed browser flows; this change does not claim to repair those unrelated warnings.

The broad `build-original-and-remaster-editions` change remains active; this scoped fix does not complete its art, physics or reference-hardware qualification tasks.
