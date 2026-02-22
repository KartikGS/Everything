# BA — Everything Context Extension

> Extends: [/projects/Everything/general/agents/roles/ba.md](/projects/Everything/general/agents/roles/ba.md)
>
> This file adds Everything-specific configuration: restricted paths, ownership rules, file naming conventions, context loading, and closure checklist. Load the general file first, then apply these overrides.

---

## Platform Scope Ownership (Everything)

For Everything CRs, the BA owns **platform intent** — what the platform should do and why.

- **General layer changes**: BA defines the intent (e.g., "the role file should clarify X"); Tech Lead owns the implementation approach.
- **Context changes**: BA may propose, but Tech Lead must verify correctness before any context file is updated to be a permanent standard.
- **CLI code changes**: BA defines functional requirements and acceptance criteria. Tech Lead owns all technical decisions about the implementation.

---

## Platform Intent vs Product Intent

Everything has two kinds of CRs:

1. **Platform CRs** — improving the framework itself (role definitions, workflow protocols, init CLI features, folder structure). The BA clarifies what the platform should do differently.
2. **Process CRs** — improving how Everything is used (documentation, guidelines, human-docs). The BA clarifies what users need to understand.

Distinguish these in every CR's Business Context section.

---

## Restricted Paths (Everything)

Must NOT write or modify:
- `/projects/Everything/agent-work/decisions/**` (Tech Lead / ADR process owns this)
- `/projects/Everything/context/stack/**` (Tech Lead owns technical context)
- `/projects/Everything/general/**` (except during explicit BA-role setup; all changes require Tech Lead verification)

---

## Context Loading (Everything)

> [!NOTE]
> You inherit **Universal Standards** from `AGENTS.md` (general principles, project principles, reasoning, tooling, technical-context, workflow).
> Below are **additional** BA-specific readings.

### Role-Specific Readings (BA)
Before working on any CR, also read:
- **Platform Vision:** [Project Vision](/projects/Everything/context/product/project-vision.md)
- **Platform Principles:** [Project Principles](/projects/Everything/context/product/project-principles.md)
- **Recent Changes:** [Project Log](/projects/Everything/agent-work/project-log.md)
- **Recent Gotchas:** [Keep in Mind](/projects/Everything/context/agents/keep-in-mind.md)
- **Folder Rules:** [Folder Structure](/projects/Everything/context/stack/folder-structure.md)

### Reading Confirmation Template
Standard form for BA sessions with no skips:
> _"Context loaded per `ba.md` required readings. Conditional reads: [none | list any conditional files loaded]. No skips."_

---

## Required Outputs — File Paths (Everything)

- **Investigation Report:** `/projects/Everything/agent-work/reports/INVESTIGATION-XXX.md`
- **CR Document:** `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md`
- **Tech Lead Prompt (handoff):** `/projects/Everything/context/agents/conversations/ba-to-tech-lead.md`
- **Tech Lead Completion Report (to review):** `/projects/Everything/context/agents/conversations/tech-lead-to-ba.md`

Closure steps:
- Update `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md` status.
- Update `/projects/Everything/agent-work/project-log.md` with closure entry.

---

## BA Closure Checklist (Everything)

Before declaring a CR closed, complete all items:
- [ ] CR status set to `Done` in `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md`
- [ ] Every AC marked with `[x]` + one-line evidence reference
- [ ] Deviations reviewed and logged in "Deviations Accepted" (`Accepted` or `Escalated`)
- [ ] Any pre-existing unrelated issues added to `project-log.md` as `Next Priorities`
- [ ] Project log lifecycle updated: exactly one `Recent Focus`, up to three `Previous`, older entries moved to `Archive`
- [ ] Human-facing closure note sent with outcome + residual risks (if any)
- [ ] Review `## Tech Lead Recommendations` in `tech-lead-to-ba.md` (if populated): for each, decide — create follow-up CR / add to project-log `Next Priority` / reject with rationale.
- [ ] Review [Keep in Mind](/projects/Everything/context/agents/keep-in-mind.md): promote or retire any content/process entries whose root causes are resolved by this CR.
