# Requirements Directory Guide

## Purpose

`/projects/Everything/agent-work/requirements/` stores Change Requirement (CR) artifacts as the source of historical scope and acceptance intent.

## Naming

- Use `CR-XXX-<slug>.md` (zero-padded numeric ID), e.g. `CR-001-init-cli-setup.md`.
- IDs are strictly increasing; never reuse an existing ID.

## Status Model

- `Draft`
- `Clarified`
- `In Progress`
- `Done`
- `Blocked`

## Historical Integrity Rule

- Closed CRs (`Done`) are historical records and are **immutable** by default.
- Do not retrofit older CRs to match new template structure or formatting.

## Allowed Post-Closure Edits

- Typo or formatting corrections
- Broken link corrections
- Factual corrections that do not alter historical intent

When applying any allowed post-closure edit, append an `Amendment Log` entry in the CR:
- Date, reason, what was changed.

## Traceability

- Every CR referenced in `project-log.md` MUST exist as a file in this directory.
- BA handoffs and closure evidence should reference the CR ID explicitly.
