# Handoff Protocol — Everything Extension

> Extends: [/projects/Everything/general/agents/coordination/handoff-protocol.md](/projects/Everything/general/agents/coordination/handoff-protocol.md)
>
> This file contains Everything-specific file paths, role names, and conversation conventions. Read the general protocol first, then apply these overrides.

## Everything Role Mapping

| General Term | Everything Role |
|---|---|
| Analyst | BA (Business Analyst) Agent |
| Lead | Tech Lead Agent |
| Sub-Agent | Backend (CLI) / Version Control Agents |

## Everything File Path Conventions

| Handoff Direction | File Path |
|---|---|
| BA → Tech Lead (requirement handoff) | `/projects/Everything/context/agents/conversations/ba-to-tech-lead.md` |
| BA → Tech Lead (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-ba-to-tech-lead.md` |
| Tech Lead → BA (completion report) | `/projects/Everything/context/agents/conversations/tech-lead-to-ba.md` |
| Tech Lead → BA (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-tech-lead-to-ba.md` |
| Tech Lead → Backend (CLI) | `/projects/Everything/context/agents/conversations/tech-lead-to-backend.md` |
| Tech Lead → Backend (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-tech-lead-to-backend.md` |
| Tech Lead → Version Control | `/projects/Everything/context/agents/conversations/tech-lead-to-vc.md` |
| Tech Lead → Version Control (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-tech-lead-to-vc.md` |
| Backend → Tech Lead | `/projects/Everything/context/agents/conversations/backend-to-tech-lead.md` |
| Backend → Tech Lead (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-backend-to-tech-lead.md` |
| Version Control → Tech Lead | `/projects/Everything/context/agents/conversations/vc-to-tech-lead.md` |
| Version Control → Tech Lead (template) | `/projects/Everything/context/agents/conversations/TEMPLATE-vc-to-tech-lead.md` |

## Linked Requirement Convention

- **Requirement files**: `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md`
- **Plan files**: `/projects/Everything/agent-work/plans/CR-XXX-plan.md`
- **Plan template**: `/projects/Everything/agent-work/plans/TEMPLATE.md`

In the Sub-Agent → Tech Lead report, reference the active CR ID in the `Subject` line.

## BA Agent → User (Acceptance Notification)

- **Trigger**: Acceptance Phase complete.
- **Protocol**:
    1. Update `/projects/Everything/agent-work/requirements/CR-XXX.md` status to `Done`.
    2. Update `/projects/Everything/agent-work/project-log.md` with the closure entry.
    3. Notify User of completion with a summary of the value delivered.

## Conversation File Freshness Rule

- Conversation handoff/report files under `context/agents/conversations/` are **single-CR working artifacts**.
- For a new CR, agents MUST **replace file contents** with the current CR context. Do not append historical CR logs.
- Every conversation file MUST include the active CR ID in `Subject`.
- Historical traceability belongs in CR artifacts (`agent-work/requirements/`, `agent-work/plans/`, `agent-work/project-log.md`), not in accumulated conversation transcripts.
- **Pre-Replacement Check (Mandatory)**: Before replacing a conversation file for a new CR, confirm the prior CR's conversation content is captured in its plan, completion report, or CR artifact. Do not replace until this is verified.

## Scope Override Synchronization — Everything Paths

When scope changes mid-CR after handoffs are issued, sync these three artifacts:
1. `/projects/Everything/agent-work/requirements/CR-XXX-<slug>.md` (approved scope delta)
2. `/projects/Everything/agent-work/plans/CR-XXX-plan.md` (delegation/verification impact)
3. Active role handoff/report in `context/agents/conversations/` (decision context)
