# Handoff: Tech Lead → Version Control Agent

## Subject
`CR-XXX — [Title]`

## Status
`issued`

---

## Objective

[What repository operations need to be performed: branch creation, commit, PR, tag, merge, etc.]

---

## Rationale (Why)

[Why these git operations are needed at this point in the CR lifecycle.]

---

## Constraints

- Follow `/projects/Everything/general/development/contribution-guidelines.md` for branch naming and commit conventions.
- Branch name: `[feat|fix|chore|docs]/CR-XXX-<slug>`
- Commit type: `[feat|fix|docs|chore|refactor](<scope>): <description>`
- **No force-push without explicit human approval.**
- **No destructive operations (reset --hard, branch -D, rebase -i) without explicit human approval.**

---

## Scope of Changes to Commit

Files to stage:
- `[file 1]` — [reason]
- `[file 2]` — [reason]

Files to exclude:
- `[file]` — [reason — e.g., "generated file, already in .gitignore"]

---

## Requested Operations (in order)

1. [e.g., Create branch `feat/CR-XXX-<slug>` from `main`]
2. [e.g., Stage the listed files]
3. [e.g., Commit with message: `feat(platform): <description>`]
4. [e.g., Push branch to remote]
5. [e.g., Open PR targeting `main` with title: `CR-XXX: <title>`]

---

## Definition of Done

- [ ] Branch created from correct base
- [ ] Only listed files staged (no accidental extras)
- [ ] Commit message follows Conventional Commits format
- [ ] [Any additional DoD items]

---

## Report Back

Write completion report to `context/agents/conversations/vc-to-tech-lead.md`.
Use template: `context/agents/conversations/TEMPLATE-vc-to-tech-lead.md`

---

## Reference Files

- Contribution guidelines: `/projects/Everything/general/development/contribution-guidelines.md`
- CR: `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md`

---
*Handoff created: YYYY-MM-DD*
*Tech Lead Agent*
