# Work Log

## 2026-05-15 — RAIDEN state population

- State files populated from README, git history, and CI configuration.
- Session-startup prompt seeded to `.raiden/local/prompts/` (D-0039 one-off seed; prompt was already present from 2026-05-15 incident resolution).

## 2026-05-15 — RAIDEN Edict v0.2.0 → v0.4.0 install

- RAIDEN Instance installed and migrated to v0.4.0; WORKSPACE_AUDIT_PROTOCOL.md in Writ.

## 2026-06-04 — Edict v0.6.0 upgrade

- Added managed `AGENTS.md` entry point (`docs/AGENTS.md` redirect).
- Applied Edict v0.6.0: installed managed `AGENTS.md` in `.raiden/writ/`.

## 2026-06-07 — Edict v0.6.1 upgrade

- Applied Edict v0.6.1: corrected macOS path in `.raiden/writ/AGENTS.md`.

## 2026-06-07 — WSL→macOS migration remediation

- Remediated paths, `mapfile` portability, and state drift introduced by WSL-to-macOS environment move.
- Updated `CURRENT_STATE.md` to reflect post-remediation state.

## 2026-06-12 — Edict v1.0.0 upgrade

- Applied Edict v1.0.0: updated RAIDEN Instance managed core to v1.0.0.

## 2026-06-22 — Audit and remediation pass

- Security hardening, accessibility improvements, portability fixes, and dead-code removal across site runtime files.

## 2026-07-09 — Live-exposure scrub: absolute machine paths in tracked docs

- Audit found tracked files under `.raiden/local/` (README.md and two prompts) contained an operator's absolute machine paths, live-served by this repo's Pages deployment (`.nojekyll`, root-served). Replaced with a generic `<workspace>/...` placeholder.
- Verified a repo-wide machine-path grep and a separate personal-identifier grep both return zero hits post-fix.
- Content scrub only; Pages/structural exposure itself is a separate follow-up.

## 2026-07-09 — Edict v2.0.0 + state normalization

- Applied Edict v2.0.0: added managed `ROUTING_POLICY.md`, removed managed `MODEL_TIERS.md` (`managed_file_removal`, expected); hook unchanged.
- Stamped `state_schema_version: 2` into `.raiden/instance/metadata.json`.
- Replaced local overlay `MODEL_MAP.md` with `ROUTING.md` (routing ladder, R1-R4 plus offload pool).
- Normalized state files per the Fact-Home Rule: removed hand-written "Last updated" footer and the restated Edict-version claim from `CURRENT_STATE.md`; converted its loop-status restatement to a bare `OL-001` citation.

## 2026-07-09 — Pages source moved to /docs; repo-internal paths de-published

- Restructured the repo so GitHub Pages serves `docs/` instead of the repo root, so `.raiden/` and other repo-internal paths stop being live-served alongside the site.
- Moved live runtime files into `docs/`: `index.html`, `CNAME`, `.nojekyll`, `robots.txt`, `css/`, `js/`, `assets/`.
- Found a pre-existing, unrelated `docs/` directory containing repo-internal agent handoff notes (`MIGRATION.md`, `NEXT_AGENT_PROMPT.md`, `OPERATOR_LOCK.md`, `STARTUP_NOTE.md`) that collided with the new site directory. Relocated it to `agent-docs/` and updated all cross-references (`README.md`, the relocated files themselves, `CURRENT_STATE.md`).
- Deliberately did **not** move `network-map/` into `docs/`, despite it being named as site content in the dispatch instructions: D-003 and OL-001 both gate `network-map/` integration into the live site on explicit operator approval, which has not been given. Moving it into the published tree would have completed that integration without the required approval. Left it at repo root, unpublished, as before.
- Updated `scripts/verify-standalone.sh` (and implicitly its CI workflow) to check `docs/index.html`, `docs/css/`, `docs/js/`, `docs/assets/`, `docs/CNAME`, `docs/.nojekyll` instead of the old root-level paths.
- Flipped the Pages API config (`source.branch=main`, `source.path=/docs`) and verified the change via `gh api .../pages`.

## Pre-RAIDEN notable events

- Repo decoupled from starlightdaemon.dev submodule; standalone deployment established.
- Standalone portability hardened: `verify-standalone.sh` CI workflow added.
- FlareSolverr leaf, pixel-mapped layout, and side column improvements shipped.
- Operator lock and agent guidance documented in README.
