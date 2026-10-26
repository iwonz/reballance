# Reballance

A personal take on the paths above the clouds.

**Reballance** is iwonz's hobby project built on
**[iwonz/ballance](https://github.com/iwonz/ballance)**, the maintained Ballance fork with
Russian localization and multiplatform support. It explores a personal vision of the familiar game
through new materials, clouds, menus and weather. Its roots lead through imengyu's
Unity recreation to Cyparade's original Ballance.

Guide wood, stone and paper balls through the 13 classic levels above the clouds.

[Play and download](#play-and-download) · [Project history](#project-history) · [Screenshots](#screenshots) · [Development](#development) · [Credits](#credits)

## Project history

1. **Ballance — Cyparade.** The original game introduced the wood, stone and paper balls and their paths above the clouds.
2. **[imengyu/Ballance](https://github.com/imengyu/Ballance) — mengyu / Happy Dreamfish.** The open-source Unity recreation provided the foundation for these projects.
3. **[iwonz/ballance](https://github.com/iwonz/ballance) — iwonz.** A maintained fork of that recreation, adding Russian localization, compatibility updates and builds for Windows, Linux, macOS, Android and the Web, while preserving the classic experience.
4. **[iwonz/reballance](https://github.com/iwonz/reballance) — iwonz.** A personal hobby project built on **iwonz/ballance**: an imaginative take on the familiar game, experimenting with materials, clouds, menus and weather.

Each step builds on the work before it. The Unity projects are community reconstructions and adaptations; Cyparade created the original game.

## Project status

**Current release: [1.0.0](https://github.com/iwonz/reballance/releases/tag/v1.0.0).**
The first public hobby-project release includes all 13 levels and seven environment
presets. Full 91-playthrough, reference-PC performance and physical Android
qualification remain unfinished. See the release notes for actual checks and the
[remaining work and acceptance record](openspec/changes/build-original-and-remaster-editions/tasks.md).

This repository's `main` owns only Reballance. Classic **Ballance** is maintained
independently in **[iwonz/ballance](https://github.com/iwonz/ballance)** and is already
[playable online](https://iwonz.github.io/ballance/). Neither project is the original
commercial Cyparade executable. Each has its own releases, application identity,
settings and saves; progress is not automatically transferred.

## Play and download

[Play Reballance in the browser](https://iwonz.github.io/reballance/) or
[download the published builds](https://github.com/iwonz/reballance/releases).

| Platform | Release asset | Requirements / launch |
| --- | --- | --- |
| Web | `Reballance-<version>-WebGL.tar.gz` | Play on GitHub Pages, or serve a local build over HTTP; WebGL 2 and WebAssembly required |
| Windows | `Reballance-<version>-Windows.zip` | x86-64, Windows 10 21H1+; extract and run `Reballance.exe` |
| Linux | `Reballance-<version>-Linux.tar.gz` | x86-64, Ubuntu 22.04/24.04; extract and run `./Reballance.x86_64` |
| macOS | `Reballance-<version>-macOS.zip` | Apple Silicon, macOS 13.1+; extract `Reballance.app` |
| Android | `Reballance-<version>-Android.apk` | ARM64, Android 8.0+; install the test-signed APK |

See [Unity player requirements](https://docs.unity3d.com/6000.6/Documentation/Manual/system-requirements.html#player)
for graphics/driver requirements. macOS is ad-hoc signed without notarization;
see [first-launch notes](docs/macos-apple-silicon.md). **iOS is deferred.** Historical
Intel macOS and Unity 2021 builds of the earlier Ballance reconstruction remain in
[imengyu’s releases](https://github.com/imengyu/Ballance/releases).

Keyboard bindings and touch layouts are under **Settings → Controls**. Choose from
Standard, Standard + Weather, Moscow, London, Sahara, Hong Kong and California in
settings. Environment is independent of graphics quality and does not partition
records or change score/timer rules. Custom levels without environment profiles
retain their authored surroundings and dry physics.

External C# DLL mods require Mono desktop builds; Web and Android need their source
compiled into the player. See the build guide for content and packaging details.

## Screenshots

Actual local Web captures, not concept images or full acceptance evidence.
[Versions and provenance](docs/images/README.md).

**Captured build: Reballance · 1.0.0-dev.11**

Work in progress: presentation, weather tuning and full gameplay acceptance remain under development.

| Main menu | Level selection |
| --- | --- |
| [![Reballance main menu above the clouds](docs/images/reballance-dev.11-menu.png)](docs/images/reballance-dev.11-menu.png) | [![Reballance level selection](docs/images/reballance-dev.11-levels.png)](docs/images/reballance-dev.11-levels.png) |
| **Level 1 · Moscow environment** | **Environment and graphics settings** |
| [![Reballance level 1 with the Moscow preset and updated HUD](docs/images/reballance-dev.11-gameplay.png)](docs/images/reballance-dev.11-gameplay.png) | [![Reballance environment, quality, resolution and interface settings](docs/images/reballance-dev.11-settings.png)](docs/images/reballance-dev.11-settings.png) |

## Development

Use **Unity 6000.6.7f1**, pinned in `ProjectSettings/ProjectVersion.txt`, with the
platform modules you need. Install Git and Python 3.12+; the [OpenSpec setup](openspec/README.md#tooling)
specifies Node and CLI requirements. The game uses Built-in rendering, uGUI and native
IVP ball physics.

```sh
git clone https://github.com/iwonz/reballance.git
cd reballance
```

Open this directory in Unity and use `Assets/Scenes/Main.unity`. Select `GameEntry`
and set **Debug Type → NoDebug** for normal play. Keep this clone's `Library`, `Temp`,
`Builds` and physics plugins separate from Ballance.

1. Read [AGENTS.md](AGENTS.md), the [source map](docs/architecture.md) and [OpenSpec workflow](openspec/README.md).
2. Develop on `main` or focused feature branches. Transfer applicable fixes between repositories as small tested commits; do not merge the complete games.
3. Run the [relevant checks](docs/validation.md), record actual results and archive the change only when complete.

Build the player **with all game content**:

```sh
bash scripts/build.sh WebGL
python3 scripts/package-build.py WebGL
python3 -m http.server 8000 --directory Builds/WebGL
# Open http://localhost:8000/
```

Other targets: `macOS`, `Windows`, `Linux`, `Android`. See the
[build guide](docs/build-and-release.md) for modules, packaging and local Mac cleanup.
Stable Mac installs use `Reballance.app`; temporary builds use `Reballance-dev.app`.

For debugging, click the About version eight times, enable developer mode and restart.
F12 opens the console; `help` lists commands. Use a test profile for commands that
change progress or scores.

## Releases and Pages

Reballance uses its own **`v<version>`** tags and GitHub Releases. Each accepted release
contains its five platform builds and checksums. Its Pages workflow validates the
matching Web archive and deploys that player with the landing from the release's
immutable source. Manual dispatch with an earlier tag rolls back only Reballance.
The landing is [iwonz.github.io/reballance](https://iwonz.github.io/reballance/), with its player
under `play/`. No Ballance build, shared manifest or combined distribution is required.

Follow the [release procedure](docs/build-and-release.md#github-pages): build and
package all five targets, verify available Mac/Web flows and disclose unrun checks.
Publication does not certify full gameplay or performance qualification. Classic
Ballance releases are unaffected.

## Documentation

| Guide | Contents |
| --- | --- |
| [Repository independence](docs/editions.md) | Source ownership, identities and shared fixes |
| [Architecture](docs/architecture.md) | Capability map and implementation boundaries |
| [Build and release](docs/build-and-release.md) | Complete player/content builds, releases and Pages |
| [Validation](docs/validation.md) | Automated checks, gameplay and device evidence |
| [OpenSpec](openspec/README.md) | Proposal through verification and archive |
| [macOS](docs/macos-apple-silicon.md) | ARM64 plugin, signing and first launch |
| [Translations](HelpTranslate.md) | Localized resources and UI checks |
| [Native physics](BallancePhysics/README.md) | C++/C# bridge and reproducible builds |

Maintained documentation is English; gameplay localization and original notices
retain their languages.

## Credits

**Direct base: [iwonz/ballance](https://github.com/iwonz/ballance)** by **iwonz**.
Reballance builds on this maintained fork, including its Russian localization,
compatibility work and multiplatform/Web support.

**Earlier upstream: [imengyu/Ballance](https://github.com/imengyu/Ballance)** by
**mengyu / Happy Dreamfish (imengyu)**, whose Unity recreation made that fork
possible. **Cyparade** created the original Ballance. **iwonz** develops Reballance
as a personal creative experiment on top of that lineage.

Native physics derives from [nillerusr/source-physics](https://github.com/nillerusr/source-physics).
Thanks also to the bundled tool, UI, compression, font and localization contributors;
[CREDITS.md](CREDITS.md) lists their projects and retained notices.

## License and original game rights

The project is maintained for learning purposes. Its code uses [GPL-3.0](LICENSE); third-party components and Ballance game data have separate rights. This applies to **both Ballance and Reballance**. New branding and generated presentation assets do not relicense inherited content. [License boundaries and component notices](CREDITS.md#license-scope).

The upstream notice is preserved verbatim:

> Note: Ballance belongs to Cyparade's work, and the copyright belongs to the original developer Cyparade. The development of this project is for learning purposes only and cannot be used for any commercial purposes. This project follows the GPL-3.0 protocol, but is limited to the code of this project. Any 3D model data, physical engine, images, audio and video, and game data related to Ballance are not within this scope. Any use of these game data for commercial activities without the permission of the copyright owner is illegal.
