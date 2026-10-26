## MODIFIED Requirements

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

## ADDED Requirements

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
