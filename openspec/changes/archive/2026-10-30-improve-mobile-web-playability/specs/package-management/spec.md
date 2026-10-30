## ADDED Requirements

### Requirement: Reuse startup archive download
A remote package of at most 64 MiB loaded immediately after its metadata SHALL reuse the downloaded archive instead of downloading identical bytes twice. Retention SHALL be bounded and released after content loading or failure, and existing archive validation SHALL remain in effect.

#### Scenario: Metadata followed by content
- **WHEN** a remote package within the 64 MiB retention limit is registered and immediately loaded
- **THEN** one successful archive download supplies both metadata and content

#### Scenario: Invalid remote archive
- **WHEN** metadata or content validation fails
- **THEN** the failed retained download is released and a later retry can fetch fresh bytes
