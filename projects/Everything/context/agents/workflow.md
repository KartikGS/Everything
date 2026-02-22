# Workflow — Everything

> Extends: [/projects/Everything/general/agents/workflows/multi-agent-workflow.md](/projects/Everything/general/agents/workflows/multi-agent-workflow.md)
>
> This file instantiates the general multi-agent workflow for the Everything project. It inherits all phases, invariants, and delegation rules from the general workflow and adds Everything-specific file paths, role names, and CR conventions.

**Core Guidance**: Before starting any task, review `/projects/Everything/general/agents/coordination/reasoning-principles.md`.

## Everything Role Mapping

| General Term | Everything Role |
|---|---|
| Analyst | BA (Business Analyst) Agent |
| Lead | Tech Lead Agent |
| Sub-Agents | Backend (CLI) / Version Control Agents |

## Everything File Path Conventions

| Artifact Type | Path |
|---|---|
| Requirements (CRs) | `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md` |
| Plans | `/projects/Everything/agent-work/plans/CR-XXX-plan.md` |
| Plan template | `/projects/Everything/agent-work/plans/TEMPLATE.md` |
| Reports | `/projects/Everything/agent-work/reports/` |
| Meta findings | `/projects/Everything/agent-work/meta/META-YYYYMMDD-CR-XXX-<role>-findings.md` |
| Project log | `/projects/Everything/agent-work/project-log.md` |
| Decisions (ADRs) | `/projects/Everything/agent-work/decisions/` |

## Conversation File Paths

| Direction | File |
|---|---|
| BA → Tech Lead | `/projects/Everything/context/agents/conversations/ba-to-tech-lead.md` |
| Tech Lead → BA | `/projects/Everything/context/agents/conversations/tech-lead-to-ba.md` |
| Tech Lead → Backend | `/projects/Everything/context/agents/conversations/tech-lead-to-backend.md` |
| Tech Lead → Version Control | `/projects/Everything/context/agents/conversations/tech-lead-to-vc.md` |
| Backend → Tech Lead | `/projects/Everything/context/agents/conversations/backend-to-tech-lead.md` |
| Version Control → Tech Lead | `/projects/Everything/context/agents/conversations/vc-to-tech-lead.md` |

Templates: `TEMPLATE-<direction>.md` in the same conversations directory.

## Requirement Analysis Phase (BA Agent)

1. Human User provides rough CR.
2. BA clarifies through Q&A.
3. **Platform Intent Check (Mandatory):** BA explicitly identifies:
   - Whether this is a change to the general layer, Everything's own context, or the CLI code.
   - Impact on other projects that consume the general layer (scope blast-radius check).
4. **Technical Sanity Check**: BA consults `/projects/Everything/context/stack/technical-context.md`, `/projects/Everything/context/stack/folder-structure.md`, and ADRs in `/projects/Everything/agent-work/decisions/`.
5. BA creates structured requirement document.
6. **Output:** `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md` + prompt for Tech Lead.
7. BA reports back to Human User for review and approval.

## Technical Planning & Delegation Phase (Tech Lead Agent)

1. Tech Lead reads CR from BA. Read `/projects/Everything/context/agents/conversations/ba-to-tech-lead.md`.
2. Tech Lead assesses technical complexity and identifies required sub-agents.
3. **Execution Audit**: Tech Lead audits existing conversation files to ensure stale context is cleared.
4. **MANDATORY OUTPUT:** Tech Lead creates `/projects/Everything/agent-work/plans/CR-XXX-plan.md` using the template at `/projects/Everything/agent-work/plans/TEMPLATE.md`.
5. **MANDATORY CHECK:** Tech Lead submits the COMPLETE plan to USER for "Go/No-Go" decision.
6. **Execution Start:** Tech Lead formalizes task specifications in `/projects/Everything/context/agents/conversations/tech-lead-to-<role>.md`.
7. **Execution mode decision**: Parallel or Sequential (see general workflow).

### Code Delegation Rule

Any change to `projects/Everything/code/` is **feature code** and must be delegated to the Backend (CLI) agent. The Tech Lead does not directly modify `init.js` or other CLI source files.

### General Layer Changes

Changes to `projects/Everything/general/` require special care:
- The Role Manager protocol must be followed for any role file changes.
- General layer changes affect all projects — blast radius must be documented in the plan.
- Changes must remain project-agnostic (no LLM-Journey or Everything-specific content in `general/`).

## Implementation Phase (Sub-Agents)

1. Sub-agent receives task specification from Tech Lead.
2. Sub-agent publishes **Preflight** note in `<role>-to-tech-lead.md` before implementation.
3. Sub-agent executes within role boundaries.
4. **Output:** Implementation + verification evidence + report in `/projects/Everything/context/agents/conversations/<role>-to-tech-lead.md`.

## Verification Phase (Tech Lead Agent)

1. Tech Lead reviews completed work reports.
2. Adversarial diff review.
3. Integration verification.
4. Tech Lead updates architectural docs if needed.
5. **Output:** Verified feature + completion report in `/projects/Everything/context/agents/conversations/tech-lead-to-ba.md`.

## Acceptance Phase (BA Agent)

1. BA reviews Tech Lead report and verifies AC are met with individual evidence annotation.
2. **CR Immutability Rule**: Once marked `Done`, closed CRs are historical records — immutable.
3. BA updates `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md` status to `Done`.
4. BA updates `/projects/Everything/agent-work/project-log.md` with the final entry.
5. BA notifies human of completion.

## Council Forum (Platform Deliberation)

The council forum runs **in addition to** the standard development workflow — not instead of it.

- **When to use**: Platform direction decisions, prioritization of CRs, architectural pivots, scope of the general layer.
- **Protocol**: `/projects/Everything/general/agents/workflows/council-forum.md`
- **Instantiation**: `/projects/Everything/context/agents/council-forum-instance.md`
- **Council config**: `/projects/Everything/council-config.json` (if configured)

The council produces a direction that the BA receives as **project intent**. The BA then creates CRs to implement that intent through the standard development workflow.

## General Invariants

All general workflow invariants apply. Everything identifiers:
- **Traceability**: Every CR-XXX ID in `project-log.md` MUST have a corresponding artifact in `agent-work/requirements/`, `agent-work/plans/`, etc.
- **Historical Artifact Invariant**: Closed CRs in `agent-work/requirements/` are immutable.
- **General Layer Purity**: Changes to `general/` must remain project-agnostic.
