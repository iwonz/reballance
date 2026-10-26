## Checks

- `python3 scripts/test-release-tools.py`: 18 passed, including atomic failure,
  legacy/current host navigation and unchanged payload files.
- `node scripts/test-web-lifecycle.js`: save queue/error and direct-entry/exit/restart checks passed.
- `actionlint .github/workflows/github-pages.yml`: passed (local actionlint 1.7.12).
- Strict OpenSpec: 15 items passed. Repository context and `git diff --check` passed.
- Prepared v1.0.0 using the new root layout; all 27 non-index archive files matched
  byte-for-byte. Only the host HTML navigation changed; its game version and archive
  checksum remain 1.0.0 and 03fb341664ae694662d094c2b9d8962951dda09ce8a029478d670aa7c17b3c61.

## Results

The user explicitly authorized replacing the /play/ browser profile with the root
namespace, without migration. The actual Unity player is served at /reballance/.
Old bookmarks use a small redirect; no landing artwork or scripts are deployed.
About and successful exit lead to the repository README. Native installs and data
are untouched. Local Chrome loaded the Russian main menu directly at /reballance/
without navigation, and exposed the corrected About URL. Public deployment and final menu checks are pending.

## Limitations

No Unity rebuild or new binary release is required for hosting-only changes.
Gameplay/performance qualification remains unchanged from v1.0.0; this check is
limited to the host, paths, publication and basic player behavior. Old browser saves
are not imported, as requested; existing databases are not deleted.
