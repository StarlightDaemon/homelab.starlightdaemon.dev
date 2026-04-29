# Startup Note

## Purpose

This repository is being prepared for a clean move into its own workspace while staying quick to recover and redeploy.

The goal is to keep `homelab.starlightdaemon.dev` self-contained so a future agent can clone it, verify it, and get it serving again with minimal rediscovery.

## Where Things Live

- Standalone homelab repo: `/mnt/e/homelab.starlightdaemon.dev`
- Main site repo: `/mnt/e/StarlightDaemonDev`
- Parent-site homepage card link: `/mnt/e/StarlightDaemonDev/index.html`
- Legacy redirect entrypoint: `/mnt/e/StarlightDaemonDev/homelab.html`

## What Was Done

- Confirmed the homelab site is already a nested standalone Git repo with its own `.git`.
- Verified runtime site files live inside this repo:
  - `index.html`
  - `css/homelab.css`
  - `js/homelab.js`
  - `assets/`
  - `CNAME`
  - `.nojekyll`
- Added `.gitignore` for editor / OS junk.
- Expanded `README.md` to define portability and separation rules.
- Added `docs/MIGRATION.md` with a move and recovery checklist.
- Added `scripts/verify-standalone.sh` to validate portability assumptions quickly.
- Updated the parent repo's `homelab.html` redirect to use `https://homelab.starlightdaemon.dev/` instead of the old `homelab/` path.

## Why These Changes Matter

- The homelab repo needs to move cleanly without depending on the parent workspace layout.
- Future work should start from clear rules instead of re-auditing every asset path.
- The verification script gives a fast sanity check before or after migration.

## Current State

- `bash scripts/verify-standalone.sh` passes.
- Runtime files do not reference `/mnt/e/StarlightDaemonDev`.
- Lucide icons are rendered locally from `js/homelab.js`; there is no third-party icon script dependency.
- The main homepage card already points to `https://homelab.starlightdaemon.dev`.
- The old redirect page now points to the custom domain.

## Known Intentional External Dependencies

- The brand link in `index.html` points back to `https://www.starlightdaemon.dev/`.

This is not a portability blocker for the repo move, but it means the site still links back to the public main site by design.

## Recommended Start For Next Agent

1. `cd /mnt/e/homelab.starlightdaemon.dev`
2. `git status`
3. `bash scripts/verify-standalone.sh`
4. `python3 -m http.server 8123`
5. Open `http://127.0.0.1:8123/`

## Good Next Steps

- Extract this nested repo into its own top-level workspace when ready.
- Decide whether to remove or keep the backlink to the main site.
- Decide whether to self-host fonts for stronger isolation.
- Optionally add CI that runs `scripts/verify-standalone.sh`.

## Caution

- The homelab repo may be extracted into its own workspace already. Treat this repo as the source of truth and touch the parent workspace only when a parent-site change is intentional.
