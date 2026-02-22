# Project Principles — Everything

These principles govern how the Everything platform is designed, extended, and operated.

## 1) Separation of Concerns

Agent context and application code must never live in the same folder.

- `context/` = stable constraints agents load to understand their environment
- `agent-work/` = operational artifacts produced by running workflows
- `code/` = application source code
- None of these may contain the other.

## 2) Portability of the General Layer

The `general/` folder must remain project-agnostic. Every sentence in every file under `general/` must be true for any project — not just Everything, not just LLM-Journey.

If a rule is specific to one project, it belongs in that project's `context/` layer.

## 3) Explicit Role Boundaries

Every agent knows what it owns and what it does not own. Role boundaries are hard invariants, not suggestions. Violating a boundary — even to complete a task faster — degrades the entire system.

## 4) Permanent Record of Decisions

Closed requirements (CRs), plans, ADRs, and meta-analysis files are immutable historical records. They are not edited to match new templates. This preserves the ability to understand *why* the system is the way it is.

## 5) Self-Improvement Through the Same Process

Improvements to Everything use the Everything workflow. A platform improvement is a CR like any other — it gets clarified by the BA, planned by the Tech Lead, implemented by a sub-agent, and verified before closure. The platform does not get "hotfixed" by skipping steps.

## 6) Council Deliberation for Platform Direction

Platform-level directional decisions (what Everything should do next, which CRs to prioritize, architectural pivots) go through the council forum when a council is configured. The human has the final vote.

## 7) Agent Context Is a Living Document

Context files (`context/`) are updated as the project evolves. They are not allowed to become stale. The "Keep In Mind" file captures recent constraints that haven't yet been promoted to permanent docs.
