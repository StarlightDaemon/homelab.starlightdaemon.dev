# homelab.starlightdaemon.dev

The standalone static site https://homelab.starlightdaemon.dev/, documenting the owner's homelab. GitHub Pages serves only the `docs/` folder of `main`. The repo is meant to stay portable: it must be movable and redeployable without depending on any parent workspace. It is a public GitHub repository (StarlightDaemon/homelab.starlightdaemon.dev).

## Run and test

No install or build step.

- Standalone check: `bash scripts/verify-standalone.sh` (needs `bash` and ripgrep `rg`). It confirms required files, the `CNAME` value, no parent-workspace references, no unexpected outbound URLs and the CI least-privilege settings.
- Preview: `python3 -m http.server 8123 --bind 127.0.0.1 --directory docs`, then open `http://127.0.0.1:8123/`.

CI (`.github/workflows/verify-standalone.yml`) runs the standalone check on every push and pull request. On Windows with Git's `core.autocrlf` on, the script's workflow-permissions step fails because files are checked out with CRLF line endings; run it in a clone made with `-c core.autocrlf=false`, or on Linux.

## Layout

- `docs/`: the published site (`index.html`, `css/homelab.css`, `js/homelab.js`, `assets/`, `CNAME`, `.nojekyll`, `robots.txt`). Nothing outside `docs/` is served.
- `network-map/`: unpublished workspace for network topology drafts
- `scripts/verify-standalone.sh`: the standalone check
- `agent-docs/`: `OPERATOR_LOCK.md` (the lock rule, current) and `MIGRATION.md` (move or rebuild checklist). `STARTUP_NOTE.md` and `NEXT_AGENT_PROMPT.md` are older hand-over notes; this file supersedes them.
- `.raiden/state/`: the project records (see below)

## Key rules

- **The live site is locked.** Don't change `docs/index.html`, `docs/css/homelab.css`, `docs/js/homelab.js` or anything under `docs/assets/` unless the owner explicitly approves that change (`agent-docs/OPERATOR_LOCK.md`, D-003).
- Draft and exploratory work, including the network map, goes in `network-map/` until the owner asks for integration (OL-001).
- Keep every runtime asset local and relative. The only intended outbound runtime URL is the site's own canonical URL; a new third-party script or style is a portability regression.
- Never add references to a parent workspace path.
- Main branch is `main`. Agent work goes on `<agent>/<task>` branches in their own worktrees. Pushing to `main` redeploys the site: ask the owner first.
- No `Co-Authored-By` or other agent attribution lines in commits; the `commit-msg` hook enforces this. Never bypass it.
- Don't edit `.raiden/writ/` or `.raiden/instance/`. They're historical RAIDEN v2 text kept for the old tooling. Where they, `.raiden/README.md` or `.raiden/local/` disagree with this file, this file wins.

## Project records

This file and `.raiden/state/` are authoritative for this repo. Read in this order and stop when you have what you need:
1. `.raiden/state/CURRENT_STATE.md`: deployment, the locked files and known constraints.
2. The `## Active` section at the top of `.raiden/state/OPEN_LOOPS.md`: open, deferred and held items (statuses: `open`, `deferred`, `held: <who>`, `no-action`, `accepted`, `closed`).
3. Only when needed: `DECISIONS.md` (IDs `D-0xx`) and `WORK_LOG.md` (history and evidence).

Current picture: one item held for the owner. OL-001 (integrating the network map into the live site) waits for the owner to review `network-map/`; an agent can do the work once it's approved. OL-002 is closed.

Update `CURRENT_STATE.md` and `OPEN_LOOPS.md` when you finish or pause work. Keep one home per fact and link evidence; don't paste it in. Never renumber or reuse a loop or decision ID. Medium+ audit findings become loops.

## Working in parallel

One agent per worktree. Before starting, read the Claims section of `../../HANDOFF.md` (the workspace folder two levels above the repo or worktree root, outside Git, so every worktree sees the same file) and `git worktree list`, then add your claim line there; mark it done when you finish. Separate tasks may run in parallel only when both claims are listed there and they don't touch the same files. The owner (or the agent they assign) merges branches and updates `.raiden/state/`. Deployments, the hook and Git config are one-at-a-time work.

This repository is public: don't commit personal names, absolute local paths or details of the owner's private tooling.
