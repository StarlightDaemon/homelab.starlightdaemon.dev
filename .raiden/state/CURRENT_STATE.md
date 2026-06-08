# Current State

**Last updated:** 2026-06-07
**Branch:** main
**Deployment:** Live at https://homelab.starlightdaemon.dev/ via GitHub Pages

---

## Project

homelab.starlightdaemon.dev is a standalone static site documenting the Starlight homelab infrastructure. Independently deployable; intentionally decoupled from the parent starlightdaemon.dev portfolio repo.

**Status:** Active — operator-locked live files; network-map workspace active.

---

## Confirmed Current State

- Site published from repository root via GitHub Pages (CNAME configured, `.nojekyll` present).
- Live files: `index.html`, `css/homelab.css`, `js/homelab.js`, `assets/` — operator-locked (do not modify without explicit approval).
- CI: standalone verification workflow (`.github/workflows/verify-standalone.yml`) runs `scripts/verify-standalone.sh` on push/PR.
- `network-map/` workspace is active for network topology drafts — separate from the live site.
- `docs/MIGRATION.md` provides a quick-move/rebuild checklist if the repo needs to relocate.
- RAIDEN Instance installed at Edict v0.6.1.

## In Progress

- Network map drafts in `network-map/` (staging; not yet integrated into live site).
- macOS migration remediation — addressing stale WSL/Linux paths identified in the 2026-06-07 migration audit (22 stale `/mnt/e/` path occurrences across 6 files).

## Not Yet Done

- Network topology integration into live site — pending operator approval for each change.

## Known Constraints

- Operator lock on live runtime files (`index.html`, `css/homelab.css`, `js/homelab.js`, `assets/`). No changes without explicit operator instruction.
- All local assets must load from this repo only (no third-party runtime scripts); new external dependencies are portability regressions.
- Repo must remain independently deployable without changes to external workspace paths.
