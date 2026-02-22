# Testing Strategy

> This document is project-agnostic. It defines the universal testing philosophy, principles, and quality standards for multi-agent development. For project-specific tooling, test paths, and command conventions, see your project's context.

The goal of the test suite is **system stability and correctness**, not model quality or performance benchmarking.

---

## Testing Philosophy

This follows a layered testing approach. **Tests are not just written to be passed; they are tools for identifying flaws in the system, validating architectural assumptions, and highlighting documentation gaps.**

- **Truth over Conformity**: If a test fails because of a false premise in the requirements or a missing dependency, the testing agent MUST report the discrepancy rather than "forcing" the test to pass.
- **Reporting > Completion**: Identifying a flaw in the system or a false environmental assumption is a more valuable outcome than a passing test.
- **Unit tests** validate isolated logic and pure functions.
- **Integration tests** validate interaction between subsystems.
- **E2E tests** validate user-critical flows in a browser environment.

### Testability as a Requirement
A feature is not "Done" unless it is testable. If a component lacks unique selectors or accessibility attributes required for robust testing, it is considered a **bug** in the implementation, not a missing feature in the test suite.

---

## Test Strategy Overview

### Unit Tests
- Focus on deterministic, isolated logic
- Fast to run, minimal mocking
- Failures should clearly identify the faulty unit

### Integration Tests
- Validate orchestration across multiple components
- Assert **behavioral outcomes**, not implementation details
- Enforce system-level guarantees (auth, observability, error handling)

### E2E Tests
- Validate real user flows in a browser environment
- Focus on critical paths
- **Production Readiness Requirements**:
    - [ ] Configurable URLs via environment variables
    - [ ] Artifact retention (screenshots/videos) for debugging
    - [ ] Tagging for smoke and critical regression runs

---

## E2E Triage (Before Declaring Blocked)

If E2E fails, classify using this sequence:
1. Re-run with the exact handoff command (no substitutions).
2. Re-run with explicit spec targeting.
3. Confirm there is no stale server/process conflict on the dev port.
4. If startup/runtime differs in constrained execution, run a local-equivalent/unsandboxed verification.
5. Inspect Playwright artifacts before classifying root cause.
6. Declare `blocked` only after at least two reproducible runs in different execution contexts.

## E2E Failure Classification Heuristics
- Process startup failure: environment/process startup class until reproduced locally.
- Selector missing while app is clearly rendered: likely contract or test regression.
- Selector missing while app is stuck on compatibility screen: environment/runtime gate.
- Browser-specific only failures: classify by browser scope; do not generalize.

## E2E Selector Reliability Ladder (Mandatory)
Use the highest reliable contract available:
1. `data-testid` or explicit test contract IDs for structural page landmarks.
2. Role + accessible name (`getByRole`) for interactive user controls.
3. Stable URL/href/state contracts for navigation and lifecycle checks.
4. Raw structural CSS selectors only when no explicit contract exists.

## Prohibited Brittle Assertions (Default)
- Hard dependency on transient loading copy (e.g., exact `"Generating..."` visibility windows).
- Strict DOM shape selectors tied to layout internals when semantic/test-id contracts exist.
- Timing-only waits without behavior/state confirmation.

---

## Command Sequencing Rule (Pipeline Verification)

For final verification evidence, run quality gates in sequence, not in parallel:
1. Tests (unit + integration)
2. Lint
3. Type check
4. Build

---

## Abuse-Protection Coverage Checklist

When testing API abuse protection, include:
- **Threshold edge**: verify allow-path up to limit N and block-path at N+1.
- **Window reset/expiry**: verify requests re-allowed after window elapses.
- **State isolation**: prevent module-level state leakage between tests.
- **Bypass and exemptions**: verify expected bypasses remain intact.

---

## Pipeline Stabilization Playbook (Regression Repair)

When a requirement objective is to restore a broken pipeline:
1. Fix test-path/module-resolution regressions first (fast signal restoration).
2. Fix feature/type regressions next (strict compile/build blockers).
3. Run full quality gates once at the end for closure evidence.

---

## Mocking & Boundary Philosophy

Mocks are applied **only at external or non-deterministic boundaries**.

### Real implementations are preferred for:
- Business logic
- Orchestration flow
- State transitions

### Mocks are used for:
- Browser/WASM dependencies
- External APIs or services beyond local control
- Observability exporters (metrics, tracing backends)

---

## Ephemeral Debugging Tools

- **Naming Convention**: Temporary tests MUST use `.debug.spec.ts` or `.debug.ts` suffix.
- **Cleanup Requirement**: All `.debug.*` files MUST be deleted before marking task "Done".
- **Log Management**: Use temporary `console.log` in debug tests only; do not merge into permanent spec files.

---

## Environmental Escalation Protocol

If the test environment prevents execution:
- **Document the Evidence**: Capture logs, screenshots, or minimal reproduction cases.
- **Escalate, Don't Fix**: The Testing Agent is NOT authorized to modify server config or framework files.
- **Report**: Use the role's report file to request environment-level changes.

---

## Coverage Guarantees (Integration Invariants)

### Observability Safety
- Failures in metrics, tracing, or logging **must not break user-facing functionality**.

### Resilience & Edge Cases
- Failures in non-critical paths must be handled gracefully.
- Tests should verify that the system fails safely and provides informative feedback.

---

## Non-goals

The following are intentionally out of scope:
- Numerical correctness of AI/LLM outputs
- Model performance benchmarking
- Observability SDK internals
