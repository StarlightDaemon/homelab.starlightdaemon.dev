# Current State

**Site version:** v1.0.0
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

## Open Items

- OL-001

## Known Constraints

- Operator lock on live runtime files (`index.html`, `css/homelab.css`, `js/homelab.js`, `assets/`). No changes without explicit operator instruction.
- All local assets must load from this repo only (no third-party runtime scripts); new external dependencies are portability regressions.
- Repo must remain independently deployable without changes to external workspace paths.
