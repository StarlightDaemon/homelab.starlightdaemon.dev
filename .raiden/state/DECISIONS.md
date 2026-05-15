# Decisions

## D-001

- Date: 2026-05-08 (pre-RAIDEN)
- Status: Active
- Decision: homelab.starlightdaemon.dev is a standalone repo, fully decoupled from the parent starlightdaemon.dev portfolio repo.
- Rationale: submodule coupling (prior approach) was fragile; standalone repo allows independent versioning and deployment without coordinating with the portfolio site.

## D-002

- Date: 2026-05-08 (pre-RAIDEN)
- Status: Active
- Decision: live runtime files (`index.html`, `css/homelab.css`, `js/homelab.js`, `assets/`) are operator-locked. Agents must not modify them without explicit operator approval on each change.
- Rationale: the live site is a production deployment; unreviewed agent modifications introduce deployment risk on a publicly visible site.

## D-003

- Date: 2026-05-08 (pre-RAIDEN)
- Status: Active
- Decision: `network-map/` is the designated workspace for topology drafts. Draft work stays in `network-map/` until the operator explicitly approves integration into the live site.
- Rationale: keeps exploratory and draft work clearly separated from the live site runtime.
