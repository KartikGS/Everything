# Multi-Agent Workflow

> This document is project-agnostic. It defines the universal multi-agent workflow pattern (phases, invariants, delegation modes). For project-specific role names, file paths, and requirement conventions, see your project's context workflow.

**Core Guidance**: Before starting any task, review `/projects/Everything/general/agents/coordination/reasoning-principles.md`.

## Multi-Agent Workflow Phases

### Phase 1 — Requirement Analysis (Analyst Role)
1. Human User provides rough requirement.
2. Analyst clarifies through Q&A.
3. **Audience & Outcome Check (Mandatory):** Analyst explicitly identifies:
   - Human User intent (session-level request),
   - End-user audience (product persona),
   - expected outcome.
4. **Technical Sanity Check**: Analyst consults architecture docs, technical context, and decision records to identify potential conflicts or opportunities for "Product Shaping."
5. **Testing Incident Check (Conditional)**: If the task involves failing tests/lint/build or environment-specific runtime mismatches, collect at least one command-based baseline before finalizing requirement scope.
6. Analyst creates structured requirement document.
7. Analyst assesses business complexity.
8. Analyst reports back to Human User for review and approval.
9. Human User approves or requests changes.
10. **Pivot Loop**: If during Phase 2 the Lead identifies a fundamental assumption error, the Analyst must pivot the requirement, re-clarify with the Human User, and issue a revised handoff.

### Phase 2 — Technical Planning & Delegation (Lead Role)
1. Lead reads requirement from Analyst.
2. Lead assesses technical complexity and identifies required sub-agents.
3. **Execution Audit**: Lead audits existing conversation files to ensure stale context is cleared or properly updated before new handoffs are issued.
4. **MANDATORY OUTPUT:** Lead creates a plan document using the project's plan template.
5. **MANDATORY CHECK:** Lead submits the COMPLETE plan (approach + delegation) to USER for "Go/No-Go" decision.
   - **Exception (narrow):** Skip explicit Go/No-Go only for strictly doc-only work or pure discovery sessions with no execution/delegation handoff.
6. **Execution Start:** Lead formalizes task specifications + prompts for sub-agents in role-specific handoff files.
   - **Template Rule**: Use role-specific handoff templates.
   - **Requirement**: Lead MUST include the "Rationale/Why" in the handoff to ensure sub-agents understand the intent, not just the action.
7. **MANDATORY EXECUTION MODE DECISION:** Lead MUST explicitly choose one mode in the plan:
   - **Parallel Mode**: Use when tasks are independent and can run safely without upstream outputs.
   - **Sequential Mode**: Use when later tasks depend on outputs from earlier sub-agents.
8. **Architecture-Only Mode (Conditional):** If a requirement is intended as rendering-boundary/architecture-only (no product behavior redesign), Lead MUST state this explicitly in plan + handoff and include:
   - UI/copy/IA freeze statement,
   - contract preservation list (routes, test IDs, accessibility semantics),
   - required regression checks.
9. **Contract Sync Gate (Conditional):** If a requirement changes routes, test IDs, or accessibility/semantic contracts, the Lead MUST include a Testing handoff in the same cycle.

#### Testing Handoff Trigger Matrix (Mandatory)
| Change Type | Testing Handoff Required? | Minimum Testing Scope |
| :--- | :--- | :--- |
| Route path rename/add/remove | Yes | Update affected E2E navigation assertions + run impacted specs |
| Test ID add/remove/rename | Yes | Update selector-based tests + run impacted specs |
| Accessibility contract change | Yes | Update semantic assertions + run impacted specs |
| UI structure/class refactor with unchanged route/selector/semantics | Conditional | If no contract change, Lead may close without Testing handoff after documenting contract stability evidence |
| Copy-only change with stable selectors/contracts | No (default) | Existing quality gates only |
| Shared component changes | Conditional | Require route impact list + sanity checks |

Canonical rule: this matrix is the source of truth for Testing handoff decisions.

#### Delegation Mode Rules
- **Parallel Mode**
  1. Create handoffs for all independent sub-agents in one batch.
  2. Enter Wait State after issuing the batch.
  3. Review all incoming reports before integration verification.
- **Sequential Mode**
  1. Create handoff for the first required sub-agent only.
  2. Enter Wait State.
  3. After report review, issue the next handoff(s) based on validated outputs.
- **Decision Test**: If Step B requires any artifact, decision, or evidence from Step A, execution MUST be Sequential.

### 🛑 The Delegation Invariant (Anti-Loop Measures)
- **The Lead writes the Handoff**: This is the final action of the Lead for a specific sub-task.
- **The "Wait" State**:
  - **Parallel Mode**: Once all permitted direct changes and the full planned handoff batch are complete in the same execution turn, the Lead MUST stop and report back to the User.
  - **Sequential Mode**: Once permitted direct changes and the current step handoff are complete in the same execution turn, the Lead MUST stop and report back to the User.
- **No Self-Implementation**: Do NOT attempt to perform the sub-agent's task in the same turn or session while claiming to be the Lead.
- **The "Shift" Refusal**: If you feel the urge to "just do it" to be efficient, you are violating the Lead role. Stop. Wait for the User.

#### Wait State Output
When entering the Wait State, the Lead MUST inform the user:
1. Execution mode selected (`Parallel` or `Sequential`)
2. Which sub-agent role(s) need to execute next
3. The handoff file location(s)
4. Clear instruction: *"Start a new session and assign the [Role] to execute this handoff."*

### Phase 3 — Implementation (Sub-Agents)
1. Sub-agent receives task specification from Lead in role-specific handoff file.
2. **Initial Verification**: Before starting code changes, verify environmental assumptions and contract availability.
3. **Preflight Clarification (Mandatory)**: Before implementation, publish a concise preflight note including:
   - assumptions being made,
   - adjacent risks not covered by current scope,
   - open questions that could affect implementation validity.
4. **Pause vs Proceed Decision Rule (Mandatory)**:
   - **Proceed** when assumptions are testable locally and implementation does not change scope/contracts/ownership.
   - **Pause** when any open question can change route/API/test-id contracts, accessibility semantics, ownership boundaries, or expected behavior with two or more plausible implementations.
5. **Halt on Blocker**: If a blocker is identified, STOP, report via feedback protocol, and wait for resolution.
6. Sub-agent executes within role boundaries.
   - **Scope Extension Rule**: If feedback introduces changes outside the approved handoff scope, mark as scope extension and get explicit Lead or user confirmation before implementing.
   - **Artifact Sync Rule**: Before continuing after scope extension approval, sync all active artifacts.
7. Sub-agent completes and verifies work.

#### Clarification Loop Protocol (Mandatory)
- The execution model explicitly supports iterative loops, not one-shot handoffs:
  - `Lead handoff -> [Sub-agent concerns <-> Lead responses] (0..N rounds) -> Sub-agent execution -> report -> [Lead concerns <-> Sub-agent responses] (0..N rounds)`.

### Phase 4 — Verification (Lead)
1. Lead reviews completed work reports.
2. **Diff Review**: Lead inspects the code diffs for logic errors or missing edge cases (Adversarial Review).
3. Lead ensures integration works.
4. **Contract Closure Check (Conditional)**: For requirements touching routes/page structure/test IDs, Lead verifies matching test assertion updates are present.
5. Lead updates architectural docs if needed.
6. **Post-Verification Drift Check (Mandatory):** Before issuing the Analyst handoff, confirm that verified files have not been modified after verification was recorded.

### Phase 5 — Acceptance (Analyst)
1. Analyst reviews the Lead's report and verifies acceptance criteria are met.
2. **AC Evidence Annotation**: For each AC in the requirement, mark `[x]` with a one-line evidence reference.
3. **Requirement Immutability Rule**: Once a requirement is marked `Done`, treat it as a historical record.
4. **Deviation Handling**: Analyst must explicitly acknowledge deviations reported in the Lead's handoff using the Deviation Severity Rubric.
5. Analyst updates requirement status.
6. Analyst updates project log.
7. Analyst notifies the human of completion.

#### Deviation Severity Rubric (Canonical)
| Severity | Classification Signal | Required Action |
| :--- | :--- | :--- |
| Minor | No AC intent change; no route/API/test-id/accessibility contract change; no security/architecture invariant impact | Accept and log with rationale/evidence |
| Major | Changes AC intent/semantics, or changes route/API/test-id/accessibility contracts, or affects security/architecture constraints | Escalate to Human User before closure |

---

## General Invariants

### 1. Traceability Invariant
Every ID mentioned in the project log MUST have a corresponding artifact in the relevant directory. Do not reference identifiers that do not exist as files.

### 2. Contract Sync Invariant
When a requirement modifies routes, test IDs, or accessibility/semantic contracts, the Lead MUST include a Testing task to update affected tests.

### 3. Historical Artifact Invariant
Closed requirements are immutable records and must not be normalized retroactively.

### 4. Scope Extension Invariant
When execution feedback expands work beyond the approved handoff, implementation must pause until `scope extension approved` is explicitly recorded.

### 5. Shared Component Blast-Radius Invariant
If a requirement modifies shared UI components:
- The implementing agent MUST list impacted routes in preflight.
- The completion report MUST include a regression sanity check for each impacted route.
