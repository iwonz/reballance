## MODIFIED Requirements

### Requirement: Verified release extraction
Pages preparation SHALL accept exactly one Reballance Web archive with a matching SHA-256 sidecar, require an empty destination, reject links/special files and unsafe extraction paths, enforce the uncompressed size limit, and validate required game content. Its archive filename and embedded Web player product, application identity and version SHALL match the requested release tag. Successful preparation SHALL write a public release identity containing the tag, version, archive name, and archive checksum.

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
Every published Reballance release in iwonz/reballance SHALL trigger mandatory Pages preparation and deployment of its matching Web archive and checksum. A missing Web asset SHALL fail the workflow rather than silently skip publication. Release delivery SHALL remain incomplete until its Pages workflow succeeds. Manual dispatch SHALL allow redeploying an existing v<version> release tag. The landing SHALL come from the immutable release source. No Ballance build or manifest SHALL be required.

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

## ADDED Requirements

### Requirement: Reballance player header
The Web player SHALL expose About and Full screen controls without a full-width
divider below its header. Keyboard focus SHALL remain visible on those controls.

#### Scenario: Game canvas gains focus
- **WHEN** the loaded game receives keyboard focus
- **THEN** no focus outline appears as a line beneath the header, and Tab navigation still highlights the header controls

### Requirement: Bilingual game landing
The root SHALL show a responsive Russian/English Reballance landing with history,
materials, presets, downloads and attribution. Browser language SHALL select the
initial language with an explicit switch. A play link SHALL lead to play/ without
loading Unity on the landing. Reduced motion and keyboard navigation SHALL work.
The classic Ballance project SHALL be an external link, not a bundled player.

#### Scenario: First visit
- **WHEN** a Russian-language browser opens /reballance/
- **THEN** it sees the Russian Reballance landing and can open /reballance/play/ without downloading a Ballance player

### Requirement: Independent site and storage
Reballance SHALL use /reballance/play/ and its own application identity. Classic
Ballance SHALL remain hosted independently at /ballance/. Publication or rollback
of one repository SHALL NOT modify the other game's artifacts or player data.

#### Scenario: Publish Reballance
- **WHEN** an accepted Reballance release is deployed
- **THEN** its site contains only Reballance and the existing Ballance site and browser save directory remain unchanged
