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

## Pre-RAIDEN notable events

- Repo decoupled from starlightdaemon.dev submodule; standalone deployment established.
- Standalone portability hardened: `verify-standalone.sh` CI workflow added.
- FlareSolverr leaf, pixel-mapped layout, and side column improvements shipped.
- Operator lock and agent guidance documented in README.
