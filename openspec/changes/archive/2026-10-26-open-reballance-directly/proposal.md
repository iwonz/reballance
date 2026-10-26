## Why

The user wants GitHub Pages to open Reballance immediately, like classic Ballance,
without a separate promotional landing. The user explicitly accepts losing browser saves from the previous /play/ URL.

## What Changes

- Serve the Unity player directly at /reballance/; redirect old /play/ bookmarks there.
- Send About and successful game exit to the project README instead of a redirect loop.
- Allow redeploying the existing verified release with the host from the workflow commit.
- Update current guides and supersede the broad feature change's landing requirement.

## Capabilities

### Modified Capabilities
- `web-publication`: Direct game entry, retained storage path and independently versioned host deployment.

## Impact

site/index.html, Pages preparation/tests/workflow, Web template, README and guides.
No Unity player, game content, save format, native library or release archive changes.
The scoped change owns this new direct-entry decision; the broader feature work
keeps its remaining UI, graphics and gameplay acceptance tasks.
