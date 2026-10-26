## Checks

- `python3 scripts/test-release-tools.py`: 18 passed, including atomic failure,
  legacy/current host navigation and unchanged payload files.
- `node scripts/test-web-lifecycle.js`: save queue/error and direct-entry/exit/restart checks passed.
- `actionlint .github/workflows/github-pages.yml`: passed (local actionlint 1.7.12).
- Strict OpenSpec before archive: 15 items passed; after synchronization/archive: 14 passed.
  Repository context including delivery base `b8e28451` and `git diff --check` passed.
- Prepared v1.0.0 using the new root layout; all 27 non-index archive files matched
  byte-for-byte. Only the host HTML navigation changed; its game version and archive
  checksum remain 1.0.0 and 03fb341664ae694662d094c2b9d8962951dda09ce8a029478d670aa7c17b3c61.

## Results

The user explicitly authorized replacing the /play/ browser profile with the root
namespace, without migration. The actual Unity player is served at /reballance/.
Old bookmarks use a small redirect; no landing artwork or scripts are deployed.
About and successful exit lead to the repository README. Native installs and data
are untouched. Local Chrome loaded the Russian main menu directly at /reballance/
without navigation, exposed the corrected About URL, and completed an in-game exit
to the README after save synchronization.

Hosting commit: `69e29289a1f4d8950d2489da0d2b7cae78d8c4f6`.
[Pages run 40360066144](https://github.com/iwonz/reballance/actions/runs/40360066144)
succeeded. Public root HTML, legacy bookmark HTML and release.json matched the
prepared site byte-for-byte; the public Unity loader also matched its archive file.
Public Chrome verified /play/ redirecting to /reballance/, direct root loading,
the Russian main menu and the About link navigating to the repository README.
A first tab remained blank; a fresh tab completed loading. Native automation
reported intermittent window-capture errors. The console showed refused Unity
telemetry connections and audio waiting for a user gesture, without a game-content
path error in the inspected messages. Local in-game exit was checked separately
as described above. No new release, moved tag or replacement archive was needed.

## Limitations

No Unity rebuild or new binary release is required for hosting-only changes.
Gameplay/performance qualification remains unchanged from v1.0.0; this check is
limited to the host, paths, publication and basic player behavior. A repeat of
public level control and save recovery was not completed: coordinate input repeatedly
failed with macOS `noWindowsAvailable`, despite working host accessibility actions.
The unchanged v1.0.0 gameplay qualification is not extended by this hosting change.
Old browser saves
are not imported, as requested; existing databases are not deleted.
