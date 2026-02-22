# Handoff: Tech Lead → Backend (CLI) Agent

## Subject
`CR-XXX — [Title]`

## Status
`issued`

---

## Objective

[What the Backend/CLI agent needs to implement. Specific and bounded.]

---

## Rationale (Why)

[Why this change is needed. Help the agent understand context so they can make good micro-decisions.]

---

## Constraints

- [Technical constraint 1 — e.g., "Do not add new npm dependencies"]
- [Ownership constraint — e.g., "Only modify files listed in Scope below"]
- [Behaviour constraint — e.g., "ROOT path calculation must remain relative, not absolute"]

---

## Assumptions To Validate (Mandatory)

1. [Something the agent should verify before starting — if false, pause and report]
2. [Another assumption]

---

## Out-of-Scope But Must Be Flagged (Mandatory)

1. [Adjacent thing that might look in-scope but isn't]
2. [Another thing]

---

## Scope

### Files to Modify

**`[file path]`**

[Specific description of what to change. Include before/after where helpful.]

---

## Definition of Done

- [ ] [Specific verifiable outcome 1]
- [ ] [Specific verifiable outcome 2]
- [ ] `node scripts/init.js` runs without errors (from `projects/Everything/code/`)

---

## Clarification Loop (Mandatory)

Before implementation, post preflight note to `context/agents/conversations/backend-to-tech-lead.md`:
- Confirm assumptions above.
- Any open question that could affect scope.

If any open question changes scope — pause and wait for Tech Lead response.

---

## Verification

Run and report:
1. `node scripts/init.js` (smoke test — arrow-key menu should appear)
2. [Any other verification commands]

---

## Report Back

Write completion report to `context/agents/conversations/backend-to-tech-lead.md`.
Use template: `context/agents/conversations/TEMPLATE-backend-to-tech-lead.md`

---

## Reference Files

- Plan: `/projects/Everything/agent-work/plans/CR-XXX-plan.md`
- CR: `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md`
- CLI entry: `projects/Everything/code/scripts/init.js`

---
*Handoff created: YYYY-MM-DD*
*Tech Lead Agent*
