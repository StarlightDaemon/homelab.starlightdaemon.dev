You are the homelab Instance agent, operating inside /mnt/e/homelab.starlightdaemon.dev (or wherever homelab.starlightdaemon.dev is checked out).

Read first:
- AGENTS.md (on disk, currently untracked)
- .raiden/README.md
- .raiden/instance/metadata.json
- .gitignore (if present)

Current objective:
Complete the full Edict v0.4.0 migration for homelab.starlightdaemon.dev in three phases:
  Phase 1 — Clean the working tree (this agent's work)
  Phase 2 — RAIDEN central writes the migration files (operator triggers from /mnt/e/Raiden)
  Phase 3 — Verify and commit (this agent's work)

Known constraints:
- Do not modify any file under .raiden/writ/ — those are RAIDEN-managed.
- Do not run the workspace audit.
- Do not run raiden_updater.cli apply — use plan only for validation.
- No Co-Authored-By or agent attribution lines in any commit message.
- Current branch: main.

Already true (as of the 2026-05-13 halt):
- RAIDEN v0.2.0 install exists on disk (.raiden/, AGENTS.md) but was NEVER committed to git.
- .raiden/writ/ contains: OPERATING_RULES.md, OWNERSHIP_BOUNDARY.md, README.md (v0.2.0).
  No WORKSPACE_AUDIT_PROTOCOL.md yet — that is the v0.4.0 addition.
- Operator WIP tracked files (NOT RAIDEN files):
    M README.md
    M docs/NEXT_AGENT_PROMPT.md
    M docs/STARTUP_NOTE.md
- Untracked items:
    ?? .raiden/               ← v0.2.0 install, not yet committed
    ?? AGENTS.md              ← v0.2.0 install, not yet committed
    ?? docs/OPERATOR_LOCK.md  ← operator doc
    ?? network-map/           ← project content or scratch
- installed_edict_version in .raiden/instance/metadata.json: 0.2.0

─── PHASE 1: CLEAN THE WORKING TREE ───────────────────────────────────────────

Step 1 — Handle the operator WIP tracked files (README.md, docs/NEXT_AGENT_PROMPT.md,
  docs/STARTUP_NOTE.md). These are NOT RAIDEN files.
  Run: git diff README.md docs/NEXT_AGENT_PROMPT.md docs/STARTUP_NOTE.md
  If the changes are ready to commit: commit them in a separate operator commit first.
    git add README.md docs/NEXT_AGENT_PROMPT.md docs/STARTUP_NOTE.md
    git commit -m "<operator message describing the docs changes>"
  If the changes are in-progress work not ready: stash them.
    git stash push -m "wip: docs changes before RAIDEN install commit" \
      README.md docs/NEXT_AGENT_PROMPT.md docs/STARTUP_NOTE.md
  Do NOT include these in the RAIDEN install commit.

Step 2 — Check .gitignore. Ensure the canonical audit-output exclusion block is present.
  Check for all three lines:
    # RAIDEN audit outputs — operational findings, not framework content
    audit-reports/
    .raiden/state/AUDIT_LOG.md
    .raiden/state/last-audit.md
  If any are absent, append the full block. Create .gitignore if it does not exist.

Step 3 — Triage the untracked non-RAIDEN items:
  a) docs/OPERATOR_LOCK.md: operator document — commit if ready, discard if stale.
  b) network-map/: confirm with operator whether this is project content to commit
     or scratch to gitignore/discard.
  Resolve with operator guidance if disposition is unclear.

Step 4 — Commit the v0.2.0 RAIDEN install. Stage ONLY RAIDEN files:
    AGENTS.md
    .raiden/  (entire directory)
    .gitignore  (if created or modified in step 2)
  Do NOT stage: docs/OPERATOR_LOCK.md, network-map/, or any other non-RAIDEN content
  without operator confirmation.
  Suggested commit message:
    "install: RAIDEN Instance v0.2.0"

Step 5 — Verify clean tree.
  Run: git status --porcelain
  Expected: empty (or only stashed changes). If non-empty: stop and surface to operator.

─── PHASE 2: RAIDEN CENTRAL MIGRATION (operator triggers this) ─────────────────

After Phase 1 is complete and the tree is clean, signal to the operator:

  "homelab.starlightdaemon.dev working tree is clean. RAIDEN central can now run the v0.4.0
   migration. From /mnt/e/Raiden, run the batch migration prompt targeting
   --instance /mnt/e/homelab.starlightdaemon.dev. The migration will write:
   .raiden/writ/WORKSPACE_AUDIT_PROTOCOL.md, update .raiden/instance/baseline.json and
   metadata.json, append ## Workspace Audit to .raiden/README.md, and write
   .raiden/local/prompts/audit-protocol-install-handoff.md."

Wait for the operator to confirm that RAIDEN central has completed the migration before
proceeding to Phase 3. The signal is: RAIDEN central reports the plan validator confirms
"Block reason: Already up to date."

─── PHASE 3: VERIFY AND COMMIT MIGRATION FILES ─────────────────────────────────

After RAIDEN central signals completion:

Step 6 — Run: git status --porcelain
  Confirm only the migration files appear. No unexpected files.

Step 7 — Run: grep installed_edict_version .raiden/instance/metadata.json
  → expected: "0.4.0"

Step 8 — Run from /mnt/e/Raiden/toolkit/updater/:
    python3 -m raiden_updater.cli plan \
      --instance /mnt/e/homelab.starlightdaemon.dev \
      --package /mnt/e/Raiden/toolkit/updater/fixtures/sample_package
  → expected: Block reason: Already up to date — no changes needed
  If any other result: stop and surface to operator.

Step 9 — Commit migration files:
    .raiden/writ/WORKSPACE_AUDIT_PROTOCOL.md
    .raiden/instance/baseline.json
    .raiden/instance/metadata.json
    .raiden/README.md
    .raiden/local/prompts/audit-protocol-install-handoff.md
  Suggested commit message:
    "install: RAIDEN Edict v0.2.0 → v0.4.0 (WORKSPACE_AUDIT_PROTOCOL install)"

Step 10 — Run: git status --porcelain — confirm clean.

Step 11 — If operator WIP was stashed in Phase 1, re-apply it now:
    git stash pop
  Commit when ready.

Do not:
- Modify any managed file in .raiden/writ/
- Reopen settled naming or architecture
- Treat review artifacts as canon unless adopted
- Broaden the task beyond the three phases above
- Run the workspace audit

Close out with:
- result: Phase 1 commit SHA(s) (v0.2.0 install + any operator WIP), Phase 3 commit SHA
- evidence checked: git log, plan validator output, version grep
- remaining risks: docs/OPERATOR_LOCK.md and network-map/ disposition if deferred;
  stashed operator WIP to re-apply after migration
