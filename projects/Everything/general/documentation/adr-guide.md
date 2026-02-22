# Architecture Decision Records (ADRs)

> This document is project-agnostic. It defines the ADR format and process for documenting significant architectural decisions.

Use ADRs to document significant architectural decisions that affect the system's structure, technology choices, or non-functional requirements.

## Template

Each ADR should contain:
- **Title**: Short imperative phrase (e.g., "Use OpenTelemetry proxy for client telemetry")
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: What is the situation and why is a decision needed?
- **Decision**: What was decided?
- **Consequences**: What becomes easier or harder as a result?

## Naming Convention

`ADR-NNNN-<short-slug>.md`

Example: `ADR-0001-telemetry-proxy.md`

## Index

Maintain an `ADR-index.md` or `README.md` in the decisions directory listing all ADRs with status.

## Process

1. Proposed ADRs are drafted and reviewed.
2. Accepted ADRs are immutable records — do not rewrite them retroactively.
3. If a decision is reversed, create a new ADR that supersedes the old one. Mark the old ADR as `Superseded by ADR-XXXX`.
