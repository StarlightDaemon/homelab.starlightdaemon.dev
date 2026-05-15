You are the homelab Instance agent, operating inside /mnt/e/homelab.starlightdaemon.dev.

Read first:
- AGENTS.md
- .raiden/README.md
- .raiden/instance/metadata.json
- .raiden/writ/WORKSPACE_AUDIT_PROTOCOL.md

Current objective:
Verify and commit the Edict v0.4.0 migration files that RAIDEN central wrote into this Instance. No new writes are needed — RAIDEN central completed all file operations; your task is verification and commit only.

Known constraints:
- Do not modify CURRENT_STATE.md, OPEN_LOOPS.md, DECISIONS.md, or WORK_LOG.md.
- Do not push without explicit operator confirmation.
- No Co-Authored-By or agent attribution lines in the commit message.
- Do not run raiden_updater.cli apply — use plan only.

Already true (RAIDEN central wrote these on 2026-05-15):
- Phase 1 commits: f0c7023 and 87b4582. Working tree was clean.
- .raiden/writ/WORKSPACE_AUDIT_PROTOCOL.md — new file, v0.4.0 content.
  SHA-256: 1fa98a0ab068349d71556b142d433fe52462de0cca237d773e4e3dc2ad5bdbb0
- .raiden/instance/baseline.json — WORKSPACE_AUDIT_PROTOCOL.md entry added;
  installed_edict_version bumped 0.2.0 → 0.4.0; all managed file hashes canonical (no anomaly).
- .raiden/instance/metadata.json — installed_edict_version bumped 0.2.0 → 0.4.0.
- .raiden/README.md — ## Workspace Audit section appended.
- .gitignore — canonical audit-output exclusion block already present (added in Phase 1); no change.
- plan validator confirms: Block reason: Already up to date — no changes needed.
  No anomalies, no conflicts — fully clean.

Still open:
1. Run `git status --porcelain` — confirm only migration files appear. Stop if unexpected.
2. Run `grep installed_edict_version .raiden/instance/metadata.json` → expect "0.4.0"
3. Run from /mnt/e/Raiden/toolkit/updater/:
     python3 -m raiden_updater.cli plan \
       --instance /mnt/e/homelab.starlightdaemon.dev \
       --package /mnt/e/Raiden/toolkit/updater/fixtures/sample_package
   → expect: Block reason: Already up to date — no changes needed
4. Commit the following files:
     .raiden/writ/WORKSPACE_AUDIT_PROTOCOL.md
     .raiden/instance/baseline.json
     .raiden/instance/metadata.json
     .raiden/README.md
     .raiden/local/prompts/audit-protocol-install-handoff.md
   Suggested commit message:
     "install: RAIDEN Edict v0.2.0 → v0.4.0 (WORKSPACE_AUDIT_PROTOCOL install)"
5. Run `git status --porcelain` after commit — confirm clean.

Do not:
- Modify any managed file in .raiden/writ/
- Run the workspace audit

Close out with:
- result: commit SHA
- evidence checked: git diff output, plan validator output, version grep
- remaining risks: none
