# Technical Plan - [CR-ID]: [Title]

## Technical Analysis
- [Analysis of the current state]
- [Key technical challenges]

## Discovery Findings
- [Results of pre-plan probes (grep/find/read)]
- [Validated assumptions]
- [File paths confirmed]

## General Layer Blast Radius (Mandatory if touching general/)
<!-- Delete this section if CR does not touch general/ -->
- Files in general/ affected: [list]
- Projects consuming these files: [Everything, LLM-Journey, ...]
- Every proposed change is project-agnostic: [confirmed | concerns: ...]

## Implementation Decisions (Tech Lead Owned)
<!-- Document technical choices deferred from BA scope. If none, write "none." -->
- [Decision or `none`]

## Critical Assumptions
- [Things that MUST be true for this plan to work]

## Proposed Changes
- [File-by-file changes]
- [Architectural impacts]

## Delegation & Execution Order
| Step | Agent | Task Description |
| :--- | :--- | :--- |
| 1 | [e.g., Backend] | [Description] |
| 2 | [e.g., Version Control] | [Description] |

## Delegation Graph (MANDATORY)
- **Execution Mode**: [Parallel | Sequential]
- **Dependency Map**:
  - [Step B depends on Step A? yes/no]
- **Final Verification Owner**:
  - [Which agent runs final verification and reports pass/fail]

## Operational Checklist
- [ ] **Environment**: No hardcoded absolute paths.
- [ ] **Portability**: general/ changes are project-agnostic.
- [ ] **Rollback**: How to revert this change.

## Definition of Done (Technical)
- [ ] [Technical AC 1]
- [ ] All conversation files replaced with current CR context (Freshness Rule)
