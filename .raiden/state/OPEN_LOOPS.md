# Open Loops

## OL-001

- Title: Network map integration into live site
- Status: Open
- Gate: operator
- Why it matters: `network-map/` contains topology drafts that represent the intended live state of the site's network section, but they have not yet been reviewed and approved for integration.
- Owner: operator review required before integration; agent can do the work once approved.
- Success condition: operator reviews `network-map/` content, approves integration, and the live site is updated and CI passes.

## OL-002

- Title: Pages/structural exposure follow-up from the 2026-07-09 live-exposure scrub
- Status: **Closed 2026-07-26 — resolved (verified, not assumed).**
- Origin: the 2026-07-09 live-exposure scrub recorded in `WORK_LOG.md` ended
  with "Content scrub only; Pages/structural exposure itself is a separate
  follow-up." That follow-up was tracked in no loop and no decision — the
  2026-07-25 fleet probe named it as a finding that had rotted with nowhere to
  live. Filed and dispositioned here per framework decision `Raiden:D-0058`.
- Disposition — **resolved**: the follow-up was in fact completed the same day,
  by the "Pages source moved to /docs; repo-internal paths de-published" work
  logged immediately after it. Only the tracking was missing, not the work.
- Evidence re-verified on disk 2026-07-26: `docs/` holds the served site
  (`index.html`, `CNAME`, `.nojekyll`, `robots.txt`, `css/`, `js/`, `assets/`);
  the repo root carries neither `CNAME` nor `.nojekyll`, so it is no longer the
  Pages root; `.raiden/` and `agent-docs/` are therefore no longer live-served.
  `CURRENT_STATE.md` states the same, and `scripts/verify-standalone.sh` was
  updated to assert the `docs/`-rooted layout.
- Gate: none (closed)
- Not in scope of this closure: `network-map/` remains deliberately unpublished
  at repo root, gated on operator approval by D-003 and OL-001. That is a
  separate live loop and is untouched here.
