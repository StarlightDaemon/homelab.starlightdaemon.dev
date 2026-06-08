# Migration Remediation Handoff — homelab.starlightdaemon.dev — Edict v0.4.0 Pre-Migration

## Prompt ID

`raiden.shared.handoff.v1`

## Purpose

homelab.starlightdaemon.dev has two blockers for the Edict v0.4.0 migration (v0.3.0 skipped):

1. The RAIDEN v0.2.0 install (2026-05-08) was never committed — `.raiden/` and `AGENTS.md`
   are untracked.
2. Several tracked files have operator WIP modifications (README.md, docs/).

Both must be resolved (committed or stashed) before the RAIDEN central agent can write.

## Template

```text
You are continuing a bounded work package inside the current repo.

Read first:
- AGENTS.md (on disk, untracked — check if present)
- .raiden/README.md
- .raiden/instance/metadata.json
- .gitignore (if present)

Current objective:
- Resolve all dirty-tree conditions so the RAIDEN central agent can run the
  Edict v0.4.0 migration (v0.3.0 skipped). This requires: handling operator WIP
  tracked files, then committing the v0.2.0 RAIDEN install.

Known constraints:
- Do NOT modify any file under .raiden/writ/ — these are RAIDEN-managed.
- Do NOT run the workspace audit.
- Do NOT run raiden_updater.cli apply.
- Commit attribution: no Co-Authored-By or agent attribution lines.

Already true (as of step-2 halt, 2026-05-13):
- RAIDEN v0.2.0 install exists on disk but was never committed. Untracked:
  .raiden/, AGENTS.md, docs/OPERATOR_LOCK.md, network-map/.
- Operator WIP tracked files with modifications:
    M README.md
    M docs/NEXT_AGENT_PROMPT.md
    M docs/STARTUP_NOTE.md
- Current branch: main.
- installed_edict_version in metadata.json: 0.2.0.

Still open:
1. Handle the operator WIP tracked files (M README.md, M docs/NEXT_AGENT_PROMPT.md,
   M docs/STARTUP_NOTE.md):
   - If the changes are ready: commit them in a separate operator commit first.
   - If the changes are not ready: stash them (git stash).
   Do NOT include these in the RAIDEN install commit.
2. Add canonical audit-output exclusions to .gitignore if not already present
   (create .gitignore if it does not exist):
     # RAIDEN audit outputs — operational findings, not framework content
     audit-reports/
     .raiden/state/AUDIT_LOG.md
     .raiden/state/last-audit.md
3. Commit the v0.2.0 RAIDEN install. Stage RAIDEN files:
   - AGENTS.md
   - .raiden/ (entire directory)
   - .gitignore (if created or modified in step 2)
   Do NOT stage: docs/OPERATOR_LOCK.md, network-map/, or any non-RAIDEN content
   without operator confirmation.
   Suggested commit message:
   "chore: install RAIDEN Instance v0.2.0"
4. Verify clean tree: git status --porcelain should be empty (or show only
   stashed changes).
5. Signal to the operator: homelab.starlightdaemon.dev is ready for the RAIDEN central
   agent to run the v0.4.0 migration prompt from
   <workspace>/Raiden/toolkit/prompts/audit-protocol-migration-v0.4.0-prompt.md
   targeting --instance <workspace>/homelab.starlightdaemon.dev. (v0.3.0 skipped; v0.4.0 direct.)

Do not:
- reopen settled naming or architecture
- treat review artifacts as canon unless adopted
- broaden the task beyond cleaning the working tree
- run the workspace audit

Close out with:
- result: operator WIP handled, v0.2.0 RAIDEN install committed, working tree clean
- evidence checked: git log shows RAIDEN commit, git status --porcelain empty,
  .raiden/instance/metadata.json shows installed_edict_version 0.2.0
- remaining risks: stashed operator WIP should be re-applied and committed after
  the v0.4.0 migration completes
```
