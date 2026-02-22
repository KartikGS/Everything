# Tech Lead — Everything Context Extension

> Extends: [/projects/Everything/general/agents/roles/tech-lead.md](/projects/Everything/general/agents/roles/tech-lead.md)
>
> This file adds Everything-specific configuration: feature code paths, permitted file list, handoff locations, plan locations, and verification commands. Load the general file first, then apply these overrides.

---

## Feature Code (Everything)

"Feature Code" includes ANY file under:
- `projects/Everything/code/scripts/`
- `projects/Everything/code/` (excluding `package.json` — see Permitted Direct Changes)

---

## Permitted Direct Changes (Everything — Exhaustive List)

| Category | Files | Examples |
|----------|-------|---------|
| **Project Config** | Root workspace config | `.gitignore` (workspace root) |
| **Dependency Governance** | Package manifest + lockfile | `projects/Everything/code/package.json`, `code/package-lock.json` (install/update operations only) |
| **Context & Agent Docs** | All context and agent-work files | `projects/Everything/context/**/*.md`, `projects/Everything/agent-work/**/*.md` |
| **General Layer** | General agent system files | `projects/Everything/general/**/*.md` (with Role Manager protocol for role files) |
| **MANIFEST** | Project path registry | `projects/Everything/MANIFEST.md` |
| **Human Docs** | User-facing documentation | `projects/Everything/human-docs/**/*.md` |

---

## Pre-Implementation Self-Check — Classification Table (Everything)

| If the file is in... | It is... |
|---------------------|----------|
| `projects/Everything/code/scripts/` | Feature code → DELEGATE to Backend agent |
| `projects/Everything/code/` (source files) | Feature code → DELEGATE to Backend agent |
| `projects/Everything/context/**` | Permitted → Proceed |
| `projects/Everything/agent-work/**` | Permitted → Proceed |
| `projects/Everything/general/**` | Permitted → Proceed (follow Role Manager protocol for roles) |
| `projects/Everything/code/package.json` | Permitted → Proceed (dependency changes only) |

---

## Handoff File Locations (Everything)

- **Incoming BA handoff:** `/projects/Everything/context/agents/conversations/ba-to-tech-lead.md`
- **Sub-agent handoffs:** `/projects/Everything/context/agents/conversations/tech-lead-to-<role>.md`
- **Sub-agent templates:** `/projects/Everything/context/agents/conversations/TEMPLATE-tech-lead-to-<role>.md`
- **BA completion report:** `/projects/Everything/context/agents/conversations/tech-lead-to-ba.md`

---

## Plan File Location (Everything)

- Plans: `/projects/Everything/agent-work/plans/CR-XXX-plan.md`
- Template: [CR Plan Template](/projects/Everything/agent-work/plans/TEMPLATE.md)

---

## ADR Location (Everything)

`/projects/Everything/agent-work/decisions/`

---

## Context Loading (Everything)

> [!NOTE]
> You inherit **Universal Standards** from `AGENTS.md` (general principles, project principles, reasoning, tooling, technical-context, workflow).
> Below are **additional** Tech Lead-specific readings.

### Every Task (Role-Specific)
Before planning or executing ANY task, also read:
- **Current State:** [Project Log](/projects/Everything/agent-work/project-log.md)
- **Recent Gotchas:** [Keep in Mind](/projects/Everything/context/agents/keep-in-mind.md)
- **Handoff Contracts:** [Handoff Protocol Ext](/projects/Everything/context/agents/coordination/handoff-protocol-ext.md)
- **Folder Rules:** [Folder Structure](/projects/Everything/context/stack/folder-structure.md)

### Reading Confirmation Template
Standard form for Tech Lead sessions with no skips:
> _"Context loaded per `tech-lead.md` required readings. Conditional reads: [none | list any conditional files loaded]. No skips."_

---

## General Layer Change Protocol (Everything-Specific)

When a CR involves changes to `projects/Everything/general/`:
1. **Blast radius check**: Identify all projects that consume the changed file. Document in the plan.
2. **Project-agnostic test**: Before finalizing the plan, verify every proposed sentence is true for any project.
3. **Role Manager protocol**: For any role file changes, follow the Role Manager research and review protocol defined in `general/agents/roles/role-manager.md`.
4. **Post-change validation**: After implementation, verify no project-specific content was introduced.

---

## Verification Checklist Additions (Everything)

Append these items to the general verification checklist:

- [ ] If changes touch `general/`: every modified sentence is project-agnostic (tested mentally against LLM-Journey and a hypothetical third project).
- [ ] If changes touch `code/scripts/init.js`: ROOT path calculation is correct; test by running `node scripts/init.js` from `projects/Everything/code/` with Node >=18.
- [ ] Review [Keep in Mind](/projects/Everything/context/agents/keep-in-mind.md): promote or retire any technical entries whose root causes are resolved by this CR.
- [ ] **Artifact & ADR Update**: Promote successful solutions to `/projects/Everything/agent-work/decisions/` if they change system invariants.
- [ ] **Do NOT update** [`project-log.md`](/projects/Everything/agent-work/project-log.md). Final status updates and user notification are the responsibility of the BA Agent.
