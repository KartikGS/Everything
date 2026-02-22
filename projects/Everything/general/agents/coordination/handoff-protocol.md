# Handoff Protocol

> This document is project-agnostic. It defines the universal communication and documentation model for multi-agent systems. For project-specific file paths and role-specific sections, see your project's context extension.

This protocol defines the mandatory communication and documentation flow between agents to ensure process integrity and role accountability. For handling discrepancies and errors in handoffs, see the [Feedback Protocol](./feedback-protocol.md).

## Universal Handoff Status Model (MANDATORY)
Every active handoff/report should declare one status from this canonical set:
- `issued` - Handoff created, execution not started
- `in_progress` - Agent is actively working
- `blocked` - Execution cannot continue due to blocker
- `needs_environment_verification` - Blocked in constrained execution until local-equivalent verification is run
- `partial` - Some scoped work is complete; remaining work is unresolved or deferred
- `completed` - Agent finished implementation and local verification for assigned scope
- `verified` - Lead agent completed adversarial review and integration verification

Status tokens above are exact; templates and live handoffs must use this vocabulary.

## Bidirectional Clarification Loop (MANDATORY)
Handoffs are not single-message contracts by default. Iterative discussion is allowed and expected:
- `Lead handoff -> [Sub-agent concerns <-> Lead responses] (0..N rounds) -> implementation -> report -> [Lead concerns <-> Sub-agent responses] (0..N rounds)`.
- `Analyst handoff -> [Lead concerns <-> Analyst responses] (0..N rounds) -> planning/execution`.
- `Lead verification handoff -> [Analyst concerns <-> Lead responses] (0..N rounds) -> closure`.

Protocol requirements:
- Disagreement is permitted and encouraged when it improves correctness, safety, or scope clarity.
- If a concern changes scope/intent, escalate to the analyst role (or user if still unresolved).
- If a concern changes technical feasibility only, the lead role resolves and records rationale.
- Keep all rounds in the relevant conversation file to preserve traceability.

## Analyst → Lead (Requirement Handoff)
- **Trigger**: Requirement is clarified and approved by User.
- **Content**:
    - [Status] (`issued`, `in_progress`, `blocked`, or `completed`)
    - [Objective]
    - [Linked Requirement] (e.g., `requirements/REQ-XXX.md`)
    - [Acceptance Criteria]
    - [Verification Mapping] (Explicit proof required for each AC)
    - [Constraints]
    - [Rationale (The 'Why')]
    - [Risk Analysis]
- **Protocol**: Lead MUST acknowledge the handoff and confirm the task is well-defined before planning.

## Lead → Sub-Agent (Task Delegation)
- **Trigger**: Planning Gate is complete and User has given "Go".
- **Content**:
    - [Status] (`issued`)
    - [Objective]
    - [Contract Delta] (Mandatory when contracts changed)
    - [Constraints]
    - [Rationale (The 'Why')]
    - [Definition of Done]
    - [Reference Files]
- **Protocol**: Sub-agent MUST review the prompt and the linked plan before implementation.
  - **Template**: Use role-specific templates if the project defines them.

## Sub-Agent → Lead (Execution Report)
- **Trigger**: Implementation and local verification are complete.
- **Content**:
    - [Status] (`in_progress`, `completed`, `blocked`, `partial`, or `needs_environment_verification`)
    - [Changes Made]
    - [Verification Results] (Tests passed)
    - [Dependency Consumption] (Which upstream handoff/report this work depends on)
    - [Failure Classification] (Requirement-related, pre-existing, environmental, or non-blocking warning)
    - [Ready for Next Agent] (yes/no)
    - [New Artifacts]
    - [Follow-up Recommendations]
- **Protocol**: Lead MUST review this report and verify integration before Verification Phase completion.

## Lead → Analyst (Verification Completion)
- **Trigger**: Integration and verification for requirement scope are complete.
- **Required completion condition**:
    - Requirement-related failures are resolved.
    - Any pre-existing/environmental/non-blocking items are classified with concrete evidence.
- **Content**:
    - [Status] (`verified`)
    - [Technical Summary]
    - [Evidence of AC Fulfillment] (MUST include *executable* verification commands)
    - [Failure Classification Summary] (MUST classify each observed item exactly once)
    - [Technical Retrospective] (Key trade-offs, lessons learned, or new debt)
    - [Deployment Notes]
    - [Link to Updated Docs]
- **Protocol**: Lead MUST NOT update the project log. This is reserved for the Analyst in the Acceptance Phase.

## Failure Classification Rules (MANDATORY)
When reporting failures or warnings, classify each item exactly once:
- **Requirement-related**: Caused by current requirement scope and blocks closure until fixed.
- **Pre-existing**: Already existed before current requirement scope and does not invalidate closure.
- **Environmental**: Execution environment issue (sandbox/port/network/infra) not caused by code change.
- **Non-blocking warning**: Warning that does not fail required quality gates.

If classified as **environmental**, include concrete evidence (command + error line) and avoid framing it as a product regression.

## Scope Override Synchronization (MANDATORY)
When scope changes mid-requirement after handoffs are issued, do not continue implementation until artifact sync is complete:
1. Update the active requirement artifact with the approved scope delta.
2. Update the active plan with delegation/verification impact.
3. Update the active role handoff/report file with the same decision context.

Record all three fields in the synced artifacts:
- scope delta summary,
- decision owner (Lead or Human User override),
- approval evidence (in-session instruction or handoff response reference).

If approved directly by the Human User, include the exact marker: `scope extension approved by user`.
