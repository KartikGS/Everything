# Meta Improvement Protocol

> This document is project-agnostic. It defines the universal framework for structured multi-agent meta-analysis. For project-specific file paths and session prompts, see your project's context extension.

## Purpose
Standardize how agents capture, synthesize, and implement documentation/process improvement feedback through a structured multi-agent meta-analysis flow.

## When To Use
Use this protocol when the user asks for:
- feedback on agent docs after a completed requirement cycle,
- instruction-conflict audits,
- process clarity or governance improvements,
- template/role-doc consistency cleanup.

---

## The Three-Phase Flow

### Phase 1 — Per-Agent Findings

**Execution order: downstream-first.**
Sub-agents run first (closest to implementation friction), then Lead, then Analyst.

For requirement-triggered meta-analysis, the typical order is:
`Sub-agents (Backend / Frontend / Infra / Testing) → Lead → Analyst`

**Session type:** The same session that executed the requirement cycle, or a resumed session with full context. Execution context makes findings concrete and grounded — an agent that just ran the handoff will identify friction that a cold session would miss.

**Carry-forward rule (mandatory):** Each subsequent agent's session prompt must include all prior agents' findings files as context. Each agent:
- Validates, refutes, or extends prior findings from their own role's perspective.
- Adds findings specific to their own role experience.

This layered approach means upstream agents (Lead, Analyst) do not need to re-discover what downstream agents already found — they evaluate and build on it.

**Analyst entry-point check**: Before beginning Analyst findings, verify that downstream sub-agent and Lead findings files exist. If they do not exist, pause and request the missing agent meta sessions before proceeding. Analyst findings without carry-forward context are incomplete per this protocol.

**Output per agent:** A findings file named with date, requirement ID, and role.

#### Per-Agent Findings File Format

```markdown
# Meta Findings: <Role> — <REQ-ID>

**Date:** YYYY-MM-DD
**Requirement Reference:** <REQ-ID>
**Role:** <role>
**Prior findings reviewed:** [list files, or "none" if first agent]

---

## Conflicting Instructions
- [Finding or "none"]

## Redundant Information
- [Finding or "none"]

## Missing Information
- [Finding or "none"]

## Unclear Instructions
- [Finding or "none"]

## Responsibility / Scope Concerns
- [Finding or "none"]

## Engineering Philosophy Concerns
- [Finding or "none"]

## Redundant Workflow Steps
- [Finding or "none"]

## Other Observations
- [Finding or "none"]

## Prior Findings: Assessment
(Only present if prior findings files were provided)
- [Prior finding ID or summary] → Validated / Refuted / Extended — [one-line rationale]
```

Use these 8 categories to guide analysis:
1. Conflicting Instructions — did any two doc sections give contradictory guidance?
2. Redundant Information — is the same rule written in multiple places without a declared canonical source?
3. Missing Information — what would have made a specific decision easier or removed a judgment call?
4. Unclear Instructions — what wording created hesitation, ambiguity, or two plausible readings?
5. Responsibility / Scope Concerns — are any role boundaries wrong, missing, or friction-producing?
6. Engineering Philosophy Concerns — does any doc reflect an unacknowledged trade-off or undocumented position?
7. Redundant Workflow Steps — which steps produced no value relative to their ceremony cost?
8. Other Observations — anything else worth capturing for process improvement.

Ground every finding in a specific moment from execution (file read, decision made, judgment call required). Avoid generic observations.

---

### Phase 2 — Synthesis

**Session type: New session — NOT the agent that executed the requirement cycle.**

Synthesis requires editorial judgment without ownership bias over prior implementation decisions. The findings files carry sufficient context forward.

**Synthesis owner:** Lead role for technical/coordination findings. Analyst role for findings about requirement clarity, templates, and workflow scope. For a combined synthesis, use Lead — they can flag Analyst-scoped items for Analyst review.

**Output:** A synthesis file naming findings sources, date, and requirement ID.

#### Synthesis File Format

```markdown
# Meta Synthesis: <REQ-ID>

**Date:** YYYY-MM-DD
**Findings sources:** [list findings files]
**Synthesis agent:** Lead (meta-improvement mode)

---

## Summary
(1–3 sentences on the overall doc health signal from this meta-analysis)

---

## High Priority
| # | Finding Summary | Source Role(s) | Affected Doc + Section | Decision | Proposed Change |
|---|---|---|---|---|---|

## Medium Priority
| # | Finding Summary | Source Role(s) | Affected Doc + Section | Decision | Proposed Change |
|---|---|---|---|---|---|

## Low Priority
| # | Finding Summary | Source Role(s) | Decision | Rationale |
|---|---|---|---|---|

## Deferred / Rejected
| # | Finding Summary | Decision | Rationale |
|---|---|---|---|

---

## Decision Needed
Items requiring Human User input before doc changes can proceed.
- [Item or "none"]
```

Synthesis priorities: High (blocks agent effectiveness) / Medium (causes friction or confusion) / Low (polish).
For each finding, decide: Fix | Defer | Reject — with a one-line rationale.
For Fix items: propose specific, minimal before/after wording for the affected doc and section.

---

### Phase 3 — Human Approval + Implementation

1. Human User reviews the synthesis doc and marks each item: **approved** / **rejected** / **deferred**.
2. Approved changes are implemented as:
   - A doc-only requirement for multi-file or structurally significant changes.
   - Inline edits by Lead for small, isolated wording fixes.
3. Analyst validates closure if changes touch requirement templates, workflow phase definitions, or role authority boundaries.
4. Implemented changes are logged in the project log.

---

## Decision Ownership

| Finding Category | Synthesis Owner | Final Approver |
|---|---|---|
| Handoff template gaps, coordination protocol issues | Lead | User |
| Role boundary ambiguities, ownership matrix gaps | Lead | User |
| Requirement template gaps, requirement clarity, scope definition | Analyst | User |
| Workflow step redundancy, phase sequencing | Lead proposes, Analyst ratifies | User |
| Cross-cutting policy (affects multiple roles) | Lead + Analyst jointly | User |

---

## Guardrails

- Do not silently mutate role authority boundaries.
- Do not rewrite historical closed requirements to retrofit new policy wording.
- If two docs conflict, resolve by updating one source-of-truth section and adding a cross-reference — never duplicate policy text.
- Synthesis agent must NOT treat prior implementation decisions as correct by default. Evaluate each finding on its merits.
- Findings files are role-scoped artifacts. Keep them separate during Phase 1 — do not merge per-agent findings into a single file. Attribution and independent validation depend on this separation.
- A meta-analysis session is not a requirement execution session. Synthesis agents must not produce plans, handoffs, or code. Output is doc change proposals only.
