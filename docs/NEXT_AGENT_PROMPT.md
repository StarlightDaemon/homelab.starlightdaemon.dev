# Next Agent Prompt

Use this as the opening prompt for the next agent working on the homelab separation effort.

## Recommended Prompt

You are working in `/mnt/e/homelab.starlightdaemon.dev`, which is the standalone Git repo for the `homelab.starlightdaemon.dev` site.

Your job is to continue preparing this homelab repo for a clean move into its own workspace so it can be cloned, verified, and redeployed quickly without depending on the parent repo layout.

Start by reading:

- `README.md`
- `docs/STARTUP_NOTE.md`
- `docs/MIGRATION.md`

Then do this immediately:

1. Run `git status` inside `/mnt/e/homelab.starlightdaemon.dev`
2. Run `bash scripts/verify-standalone.sh`
3. If needed, start a preview server with `python3 -m http.server 8123`

Current known state:

- The homelab site is already self-contained at the repo level.
- Runtime files are inside this repo: `index.html`, `css/`, `js/`, `assets/`, `CNAME`, `.nojekyll`.
- The verification script currently passes.
- The parent repo homepage card already links to `https://homelab.starlightdaemon.dev`.
- The old parent repo redirect file `/mnt/e/StarlightDaemonDev/homelab.html` was updated to point to the custom domain instead of the old `homelab/` path.

Constraints:

- Treat this repo as the source of truth for the homelab site.
- Do not introduce dependencies on `/mnt/e/StarlightDaemonDev`.
- Keep local asset references relative.
- Assume this repo may have been extracted from the parent workspace already.
- If you also touch the old parent workspace, do not revert unrelated changes there.

Primary next-step goals:

- Audit whether any remaining outbound references should be removed for stronger isolation.
- Decide whether the backlink to `https://www.starlightdaemon.dev/` should remain.
- Decide whether Google Fonts should be self-hosted.
- If useful, add lightweight CI or documentation that preserves the repo separation contract.

When you report back, focus on:

- What still prevents a fully clean extraction
- What can be moved as-is today
- The smallest next change that improves portability or deployment speed

## Short Version

Continue hardening the standalone `homelab.starlightdaemon.dev` repo in `/mnt/e/homelab.starlightdaemon.dev`. Read the startup docs, run `git status`, run `bash scripts/verify-standalone.sh`, preview if needed, then improve portability without introducing new parent-repo dependencies.
