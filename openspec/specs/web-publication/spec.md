# web-publication Specification

## Purpose

Publish a verified Web release to GitHub Pages and load game content correctly from a repository subpath. See the [source map](/docs/architecture.md#web-publication) for implementation and validation boundaries.

## Requirements

### Requirement: Static hosting compatibility
The Web player SHALL use gzip with decompression fallback, single-threaded WebAssembly physics, and relative content paths so GitHub Pages does not require custom compression or cross-origin-isolation headers.

#### Scenario: Repository Pages URL
- **WHEN** the game is opened at a repository subpath such as /ballance/
- **THEN** its loader, Wasm, core packages, and level bundles resolve under that deployment

### Requirement: Verified release extraction
Pages preparation SHALL accept exactly one Web archive with a matching SHA-256 sidecar, require an empty destination, reject links/special files and unsafe extraction paths, enforce the uncompressed size limit, and validate required game content. Its archive filename and embedded Web player version SHALL match the requested release tag. Successful preparation SHALL write a public release identity containing the tag, version, archive name, and archive checksum.

#### Scenario: Corrupt archive
- **WHEN** the archive checksum differs from its sidecar
- **THEN** publication fails before extraction or deployment

#### Scenario: Unsafe archive member
- **WHEN** an archive contains a link, special file, or a path escaping the destination
- **THEN** preparation rejects it

#### Scenario: Wrong player version
- **WHEN** the requested release tag differs from the archive name or embedded Web player version
- **THEN** preparation fails instead of deploying that player under the requested identity

### Requirement: Release-triggered deployment
Every published release SHALL trigger mandatory Pages preparation and deployment of its matching Web archive and checksum. A missing Web asset SHALL fail the workflow rather than silently skip publication. Release delivery SHALL remain incomplete until its Pages workflow succeeds. Manual dispatch SHALL allow redeploying an existing release tag. Hosting files SHALL come from the immutable commit of the selected workflow run; the explicit release tag SHALL select the verified game archive independently. This SHALL allow host-only updates without replacing release assets or changing game identity.

#### Scenario: Publish Web release
- **WHEN** a release is published with its Web archive and checksum
- **THEN** the hosted workflow downloads, validates, and deploys those files without requiring a Unity license

#### Scenario: Missing Web asset
- **WHEN** a release is published without its required Web archive or checksum
- **THEN** the Pages workflow fails visibly and that release is not reported as completely delivered

#### Scenario: Redeploy older version
- **WHEN** the workflow is manually dispatched with a valid older release tag
- **THEN** that release's verified Web content becomes the deployed site

### Requirement: Deployment permissions and browser verification
Pages setup SHALL use the GitHub Actions source and permit the intended release tags in its deployment environment. After deployment, the workflow SHALL verify that the served release identity matches the requested tag and fail if it cannot observe that identity within a bounded wait. Release verification SHALL include an HTTP-served menu and level gameplay check; opening index.html as a local file SHALL NOT count as browser verification.

#### Scenario: Release readiness
- **WHEN** a Web release is declared verified
- **THEN** its record identifies the served URL and actual menu, level-loading, and control checks performed

#### Scenario: Stale deployed site
- **WHEN** deployment completes but the public site continues to report a different release tag
- **THEN** the verification step fails instead of reporting a successful rollout

### Requirement: Direct Reballance entry
Opening /reballance/ SHALL render the game directly at that URL without a landing
or a redirect. Old /reballance/play/ bookmarks SHALL redirect to the root. Previous
browser data SHALL NOT be imported or deleted; the new root uses its own browser
save namespace as explicitly authorized. Native saves SHALL remain untouched.
About and successful game exit SHALL lead to the project README; exit SHALL NOT
automatically restart the game. Restart SHALL reload the current player after
successful save synchronization. Attribution and rights notices SHALL remain available.

#### Scenario: Root visit
- **WHEN** a user opens /reballance/
- **THEN** the Unity player loads at that URL without promotional content or another navigation

#### Scenario: Old bookmark
- **WHEN** a user opens /reballance/play/ with a query or fragment
- **THEN** the browser opens /reballance/ with the query and fragment, without importing the old profile

#### Scenario: About or exit
- **WHEN** a user chooses the host About control or completes an in-game exit
- **THEN** the browser opens the repository README rather than a removed landing or a new game instance

### Requirement: Responsive mobile host
The published Web player SHALL fit the visible viewport, respect display cutouts and preserve canvas aspect ratio in portrait, landscape and fullscreen. Gameplay touches SHALL not scroll or zoom the page. Mobile rendering SHALL cap device pixel ratio at one by default to avoid multiplying render work on dense screens.

#### Scenario: Phone viewport changes
- **WHEN** the browser viewport changes orientation or enters fullscreen
- **THEN** the player resizes without stretching its content and controls remain inside the usable area

### Requirement: Web opening presentation
Reballance SHALL preserve the source aspect ratio of its title artwork, allow the player to skip the opening presentation once required content is ready, and avoid unbounded high-density output work with default settings.

#### Scenario: Opening artwork
- **WHEN** the opening is displayed on a wide or tall viewport
- **THEN** the title artwork retains its original proportions

#### Scenario: Skip opening
- **WHEN** the player taps the opening after required content is ready
- **THEN** the game enters the menu without waiting for the remaining animation
