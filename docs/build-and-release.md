# Build and release

Use **Unity 6000.6.7f1**, as pinned in ProjectSettings. Do not mix Unity 2021
players or AssetBundles with current outputs. Select the correct independent
[repository clone](editions.md) before building. A new game version rebuilds the player,
core, six built-in packages, and levels 01-13 for its target.

## Local builds

Install the required Unity Hub modules: Android with SDK/NDK/OpenJDK, Web,
Linux Mono, and Windows Mono as needed. macOS uses the Apple Silicon editor.
Packaging needs Python 3.12+; macOS also needs Xcode Command Line Tools.
Close any editor instance using this project before batch builds.

```sh
bash scripts/build.sh WebGL
python3 scripts/package-build.py WebGL
```

| Target argument | Output under `Builds/` | Release asset |
| --- | --- | --- |
| `WebGL` | `WebGL/index.html`, Build, StreamingAssets | `<Product>-<version>-WebGL.tar.gz` |
| `macOS` | `macOS/<Product>.app`, ARM64, Mono | `<Product>-<version>-macOS.zip` |
| `Windows` | `Windows/<Product>.exe`, x86-64, Mono | `<Product>-<version>-Windows.zip` |
| `Linux` | `Linux/<Product>.x86_64`, x86-64, Mono | `<Product>-<version>-Linux.tar.gz` |
| `Android` | `Android/<Product>.apk`, ARM64, IL2CPP | `<Product>-<version>-Android.apk` |

Use the same target in both commands. Release assets and SHA-256 sidecars go to
`Builds/releases/`; filenames use the edition descriptor and Player Settings ->
Version. Reballance uses its own descriptor and v<version> public tags. Move previous outputs
aside before rebuilding: these tools deliberately refuse to overwrite them.
Unity logs go to `Logs/build-<platform>.log`.

`UNITY_EDITOR` can override the standard Hub executable path:

```sh
UNITY_EDITOR=/Applications/Unity/Hub/Editor/6000.6.7f1/Unity.app/Contents/MacOS/Unity bash scripts/build.sh Linux
```

In the editor, select the platform in Build Profiles and use **Ballance -> Build ->
Build current platform with game content**. Unity's default Build button does not
package the external game content. The batch entry point is
`Ballance2.Editor.PlayerBuild.Build` with the corresponding `-buildTarget`.
Target configuration persists in the project; review settings changes before committing.
Android temporarily selects Input System only because Both is unsupported there;
`AndroidInput` preserves existing bindings and touch controls, and the build restores
the previous editor input setting even on failure.

## Graphics device selection

Rendering already uses Unity's graphics backend; gameplay and IVP physics still
run on the CPU. The content-aware builder explicitly restores Unity's
[automatic graphics API selection](https://docs.unity3d.com/6000.6/Documentation/ScriptReference/PlayerSettings.SetUseDefaultGraphicsAPIs.html)
for each target. The engine chooses among compatible APIs; this is not a benchmark
that proves one API is fastest on every driver. The current Web backend remains
WebGL 2. Enabling WebGPU requires separate compatibility/performance validation,
including Unity's [readback limitations](https://docs.unity3d.com/6000.6/Documentation/Manual/WebGPU-limitations.html).

Web builds also request [HighPerformance](https://docs.unity3d.com/6000.6/Documentation/ScriptReference/PlayerSettings.WebGL-powerPreference.html)
when creating the graphics context. This was already the project's serialized
default; the builder now enforces it after local overrides. Browsers may ignore
the hint, and a web page cannot enable a browser's disabled hardware acceleration
or override OS GPU policy. On a machine with multiple GPUs, use the OS graphics
preferences for the game or browser, enable browser graphics acceleration, and
restart the affected application. A performance GPU can increase power use.

The game's **Settings -> Graphics** page shows the reported device/API and warns
about recognized software renderers. It does not offer a CPU/GPU switch or change
saved quality settings. Compare the actual renderer and frame evidence using the
[hardware checks](validation.md#web-frame-performance), rather than treating the
high-performance request or an unfamiliar device name as proof of acceleration.

## Signing and deferred platforms

The Android APK is for installation and testing. For Google Play, configure your
own application identifier, version code, and keystore. To generate AAB, invoke
`Ballance2.Editor.PlayerBuild.Build` with `-buildTarget Android` and
`-customBuildPath Builds/Android/Ballance.aab`; the extension selects App Bundle.
Do not describe test signing as store-ready signing.

macOS packaging uses an ad-hoc signature, without notarization. Distribution signed
with Developer ID requires the maintainer's credentials and a separate notarization
step. See [macOS notes](macos-apple-silicon.md) for first launch and validation.

**iOS is deferred.** Existing `iOS` build/package arguments and the manual workflow
choice are retained for a future Xcode export, not a current release commitment.
They would produce `Builds/iOS/Unity-iPhone.xcodeproj` and an Xcode-project archive,
not an installable IPA. Provisioning, signing, Archive, and TestFlight/App Store
submission would require Xcode and the owner's Apple Developer account. No script
submits builds to a mobile store.

## GitHub Pages

Reballance releases belong to `iwonz/reballance`, independently of classic Ballance.
Each `v<version>` tag identifies matching source and five platform builds with SHA-256
sidecars. Preserve existing releases; never relabel an older player with a new version.
Release acceptance covers all five successful builds, validated archives/checksums
and available Mac/Web smoke flows. Full 91-playthrough and reference-hardware
qualification is tracked separately; disclose unfinished checks in release notes.

1. Configure **Settings → Pages → GitHub Actions** and permit release tags in the
   `github-pages` deployment environment.
2. Complete the [validation](validation.md), build and package all five targets.
   Record actual device/gameplay results and limitations. Use the matching product
   version in `ProjectSettings`, the tag and every archive.
3. Commit verified source and an annotated `v<version>` tag, then push them to this
   repository. Create a draft release with all five archives/checksums plus `LICENSE`
   and `CREDITS.md`. Inspect uploads before publishing. Existing versions are immutable.
4. Publication runs [the Pages workflow](../.github/workflows/github-pages.yml). It
   checks out the immutable workflow commit, downloads the selected release's Web
   archive and sidecar, validates content/product/version and safe extraction, and
   stages the player at the root with an old-bookmark redirect from `site/play.html`.
   No classic Ballance assets or shared manifest are needed.
5. Wait for deployment and public `release.json` tag/checksum validation. Exercise
   loading, menu, level control, save recovery and return at the public URL before
   calling delivery complete. Missing Web files or failed Pages means delivery failed.

`https://iwonz.github.io/reballance/` renders the game directly at that URL.
Old `/reballance/play/` bookmarks redirect to the root, preserving query and fragment.
The user accepted a new browser save namespace; the old /play/ profile is not imported
or deleted. Native saves are unaffected. About and successful exit lead to the
repository README; restart reloads the player. The preparer adapts those two legacy
host links for v1.0.0 without changing Build or StreamingAssets files, published
archives, checksums or version identity.

Host-only updates do not require new Unity players or replacement release assets.
Push the host change, then dispatch Pages from main with the existing release tag.
The run records its host commit separately from the selected game version.
Use a new empty output path and a directory containing only the selected Web archive
and checksum to preview the site from the intended host checkout:

```sh
python3 scripts/prepare-site.py Builds/web-release Builds/site-preview v1.0.0
python3 -m http.server 8000 --directory Builds/site-preview
```

Replace the example tag with the actual accepted release. The preparer rejects
corrupt/mismatched archives, links, traversal, nonempty destinations and sites over
1,000,000,000 bytes. It includes LICENSE and CREDITS.md and writes the public
release identity at the root.

To roll back, manually dispatch `github-pages.yml` with the earlier published tag.
The selected workflow ref supplies hosting files; the tag input selects immutable
game bytes. To roll back hosting as well, choose its earlier workflow ref. Neither
operation changes Ballance.
Releases created with `GITHUB_TOKEN` do not trigger another workflow automatically;
explicitly dispatch Pages for the same tag in that automation and verify completion.
Do not weaken identity checks or publish unaccepted builds to make deployment green.

## GitHub Actions

**Unity 6 platform builds** is manually dispatched for one platform and uploads
release files and logs. It requires a licensed **self-hosted Apple Silicon runner**
with labels `macOS`, `ARM64`, `unity-6000.6.7f1`, the needed Hub modules, and an
Actions runner supporting Node 24 (2.327.1 or newer). Setup does not install that
runner. Never run untrusted pull requests on it.

Local builds can supply release assets without a self-hosted runner. **Build checks**
runs repository/OpenSpec checks, localization, release-tool tests, and ARM64 native
physics checks on hosted runners. It does not build Unity or test all devices.

## Rebuilding native plugins

Remaster uses ABI 2304; the Original baseline retains ABI 2302 in its own worktree.
Never copy one edition's plugin set into the other. Use the same source/patch for
all five Remaster targets. `-ffp-contract=off` preserves the Original arithmetic
order; enabling fused multiply-add changed the paper-ball replay even with the
old bridge and is not an approved optimization:

```sh
python3 scripts/build-physics.py macOS
python3 scripts/build-physics.py WebGL
python3 scripts/build-physics.py Android
docker build --platform linux/amd64 -f scripts/native/Dockerfile -t ballance-native:2303 scripts/native
docker run --rm --platform linux/amd64 --network none -v "$PWD:/repo" ballance-native:2303 python3 scripts/build-physics.py Linux
docker run --rm --platform linux/amd64 --network none -v "$PWD:/repo" ballance-native:2303 python3 scripts/build-physics.py Windows
```

The script fetches pinned IVP revision `47533475e01cbff05fbc3bbe8b4edc485f292cea`
into `Library/NativePhysics/source` and applies `BallancePhysics/source-physics.patch`.
Build Web or macOS first to populate this source before running an offline container.
The Docker base digest and compiler families are pinned in `scripts/native/Dockerfile`;
exact compiler versions and bridge/header/patch/library hashes are recorded under
`BallancePhysics/provenance`. Docker on Apple Silicon executes x86-64 through the
host's emulation; Windows smoke uses Wine. These are native ABI checks, not physical
Windows/Linux player certification. MinGW permits legacy upstream diagnostic
pointer truncations; that compatibility flag is excluded from the project bridge.

macOS uses Apple clang ARM64. Web uses Unity's Emscripten and runs the Wasm smoke
under its Node runtime before installing the archive. Native Wasm longjmp and SIMD
match the Wasm 2023 player. Android uses Unity's NDK, ARM64/API 26 and 16 KB LOAD
alignment checks; it still requires device execution. Override Unity SDK paths with
`--sdk`. Native Linux x86-64 and Windows compiler hosts can also run the corresponding
platform argument directly with `CXX` configured.

The source patch supplies constraint cleanup, contact-material refresh and pointer/
header portability fixes. Follow [native instructions](../BallancePhysics/AGENTS.md)
and [validation guidance](validation.md). Preserve the measured Original dry replay
tolerance; a successful rebuild does not establish identical gameplay.

References: [Unity release](https://unity.com/releases/editor/whats-new/6000.6.7f1),
[Unity Web deployment](https://docs.unity3d.com/6000.6/Documentation/Manual/webgl-deploying.html),
[GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages),
[Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Local macOS installation

Use `/Applications/Ballance.app` and `/Applications/Reballance.app` for stable
installations. Intermediate development versions use `Ballance-dev.app` and
`Reballance-dev.app`; bundle IDs and saved-data paths remain stable. Package a
completed player before installing it.

```sh
python3 scripts/install-macos.py remaster Builds/macOS/Reballance-dev.app
python3 scripts/install-macos.py remaster Builds/macOS/Reballance-dev.app --apply
```

Use `original` and its corresponding app for the classic edition. A dry run lists
exact paths. Applying verifies identity, version, signature and copied-file hashes,
rejects downgrades and active copies, and replaces the edition's canonical app.
It then deletes obsolete matching installed/build bundles, including former
`.app.disabled` copies, and clears their stale LaunchServices registrations. Newer
work in progress is retained. Saved profiles, release archives and unrelated apps
are outside cleanup. Stable installation removes the superseded `-dev` app.

The local generated tree uses `Builds.noindex` with a `Builds` symlink; this avoids
Spotlight indexing but does not by itself stop LaunchServices discovery. Temporary
staging is hidden. After validating the canonical copy, the installer also removes
its unpacked source bundle; keep the verified release archive until publication
checks finish. It never resets the global application database.

Run `python3 scripts/test-install-macos.py` after changes. Fixtures cover replacement,
corruption/signature failure, edition isolation, downgrade refusal, retired-copy
cleanup, development filenames, newer-build preservation and catalog parsing.
