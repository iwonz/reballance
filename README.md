# Reballance

A new perspective on the paths above the clouds.

Reballance develops modern materials, dense clouds, a refreshed interface and seven
weather presets for the Unity reconstruction of Cyparade's **Ballance**. It builds
on **[imengyu/Ballance](https://github.com/imengyu/Ballance)** by Happy Dreamfish.
Wood, stone and paper retain their roles across the 13 classic levels.

[Development](#development) · [Screenshots](#screenshots) · [Releases](https://github.com/iwonz/reballance/releases) · [Credits](#credits)

## Project status

**In development: 1.0.0-dev.11.** Full gameplay acceptance is unfinished; no public
Reballance release or Pages deployment has been made. Successful builds and directed
integration checks do not stand in for complete playthroughs. See the
[remaining work and acceptance record](openspec/changes/build-original-and-remaster-editions/tasks.md).

This repository's `main` owns only Reballance. Classic **Ballance** is maintained
independently in **[iwonz/ballance](https://github.com/iwonz/ballance)** and is already
[playable online](https://iwonz.github.io/ballance/). Neither project is the original
commercial Cyparade executable. Each has its own releases, application identity,
settings and saves; progress is not automatically transferred.

## Play and build

Until the first accepted release, build locally using the instructions below.
The release targets are Web, Windows x86-64, Linux x86-64, macOS ARM64 and Android
ARM64. iOS is deferred. Published downloads will be named
`Reballance-<version>-<platform>` with SHA-256 sidecars. The future Pages landing is
`https://iwonz.github.io/reballance/`; its player will use `play/`.

Keyboard bindings and touch layouts are under **Settings → Controls**. Choose from
Standard, Standard + Weather, Moscow, London, Sahara, Hong Kong and California in
settings. Environment is independent of graphics quality and does not partition
records or change score/timer rules. Custom levels without environment profiles
retain their authored surroundings and dry physics.

## Screenshots

Actual local Web captures, not concept images or full acceptance evidence.
[Versions and provenance](docs/images/README.md).

### Reballance · 1.0.0-dev.11

Work in progress: presentation, weather tuning and full gameplay acceptance remain under development.

| Main menu | Level selection |
| --- | --- |
| [![Reballance main menu above the clouds](docs/images/reballance-dev.11-menu.png)](docs/images/reballance-dev.11-menu.png) | [![Reballance level selection](docs/images/reballance-dev.11-levels.png)](docs/images/reballance-dev.11-levels.png) |
| **Level 1 · Moscow environment** | **Environment and graphics settings** |
| [![Reballance level 1 with the Moscow preset and updated HUD](docs/images/reballance-dev.11-gameplay.png)](docs/images/reballance-dev.11-gameplay.png) | [![Reballance environment, quality, resolution and interface settings](docs/images/reballance-dev.11-settings.png)](docs/images/reballance-dev.11-settings.png) |

## Development

Use **Unity 6000.6.7f1**, pinned in `ProjectSettings/ProjectVersion.txt`, with the
required platform modules, Git and Python 3.12+. Rendering uses Built-in and uGUI;
ball physics uses native IVP. [OpenSpec setup](openspec/README.md#tooling) specifies
its Node/CLI versions.

```sh
git clone https://github.com/iwonz/reballance.git
cd reballance
```

Open this directory in Unity and use `Assets/Scenes/Main.unity`. Set `GameEntry`
to **Debug Type → NoDebug** for normal play. This clone owns its own `Library`,
`Temp`, `Builds` and native plugins; do not share them with Ballance.

1. Read [AGENTS.md](AGENTS.md), the [source map](docs/architecture.md) and [OpenSpec workflow](openspec/README.md).
2. Develop on `main` or focused feature branches. Transfer shared fixes from Ballance as small verified commits; do not merge the complete projects.
3. Run the [relevant checks](docs/validation.md), record results and archive each change only when complete.

Build the player **with all game content**:

```sh
bash scripts/build.sh WebGL
python3 scripts/package-build.py WebGL
python3 -m http.server 8000 --directory Builds/WebGL
# Open http://localhost:8000/
```

Other target arguments are `macOS`, `Windows`, `Linux` and `Android`. The
[build guide](docs/build-and-release.md) covers modules, native plugins, signing and
installation cleanup. macOS builds are ad-hoc signed, not notarized; Android builds
are test-signed. Development applications use `Reballance-dev.app`.

For debugging, click the About version eight times, enable developer mode and
restart. F12 opens the console; `help` lists commands. Use a test profile for commands
that alter progress. External DLL mods require Mono desktop builds; Web and Android
need their source compiled into the player.

## Releases and Pages

Reballance uses its own **`v<version>`** tags and GitHub Releases. Each accepted release
contains its five platform builds and checksums. Its Pages workflow validates the
matching Web archive and deploys that player with the landing from the release's
immutable source. Manual dispatch with an earlier tag rolls back only Reballance.
No Ballance build, shared manifest or combined distribution is required.

Follow the [release procedure](docs/build-and-release.md#github-pages). The first
public release still requires completion of gameplay acceptance; moving repositories
does not waive it. Classic Ballance releases are unaffected.

## Documentation

| Guide | Contents |
| --- | --- |
| [Repository independence](docs/editions.md) | Source ownership, identities and shared fixes |
| [Architecture](docs/architecture.md) | Capability map, boundaries and known gaps |
| [Build and release](docs/build-and-release.md) | Builds, single-project releases, Pages and Mac cleanup |
| [Validation](docs/validation.md) | Checks, gameplay/device acceptance and performance evidence |
| [OpenSpec](openspec/README.md) | Proposal through verification and archive |
| [Native physics](BallancePhysics/README.md) | C++/C# bridge and reproducible native builds |
| [Translations](HelpTranslate.md) | Localized resources and UI checks |

Maintained documentation is English. Gameplay localization and original notices
retain their languages.

## Credits

First, **[imengyu/Ballance](https://github.com/imengyu/Ballance)** by **mengyu / Happy Dreamfish (imengyu)**: the upstream Unity recreation this project originated from. Reballance builds on that work and its contributors' efforts.

**Cyparade** created the original Ballance. **iwonz** maintains Reballance and the separate classic [Ballance fork](https://github.com/iwonz/ballance). Native physics derives from [nillerusr/source-physics](https://github.com/nillerusr/source-physics). Thanks also to the bundled tool, UI, compression, font and localization contributors; [CREDITS.md](CREDITS.md) lists their projects and retained notices.

## License and original game rights

The project is maintained for learning purposes. Its code uses [GPL-3.0](LICENSE); third-party components and Ballance game data have separate rights. This applies to **both Ballance and Reballance**. New branding and generated presentation assets do not relicense inherited content. [License boundaries and component notices](CREDITS.md#license-scope).

The upstream notice is preserved verbatim:

> Note: Ballance belongs to Cyparade's work, and the copyright belongs to the original developer Cyparade. The development of this project is for learning purposes only and cannot be used for any commercial purposes. This project follows the GPL-3.0 protocol, but is limited to the code of this project. Any 3D model data, physical engine, images, audio and video, and game data related to Ballance are not within this scope. Any use of these game data for commercial activities without the permission of the copyright owner is illegal.
