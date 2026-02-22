# API Contract Registry Guide

> This document is project-agnostic. It defines the conventions for maintaining API contract documentation.

This directory (or equivalent in your project) contains the source-of-truth descriptions for system interfaces.

## Contract Rules

- Every new or modified API endpoint must have a matching contract doc.
- Route contract docs should follow the project's `api-contract-template.md`.
- Keep contract docs provider-agnostic unless the route intentionally exposes provider-specific behavior.

## Standard Contents

- **Shared types**: Common data structures used across Frontend and Backend.
- **Route contract template**: Required structure for per-route contract docs.
- **Per-route contracts**: One file per significant endpoint.
- **OpenAPI spec (optional)**: Machine-readable API specification.

## Contract Lifecycle

- Contracts are created when a new route is introduced.
- Contracts are updated when request/response shape, status codes, or security model changes.
- Contracts are immutable as historical records for closed requirements — amendments must be logged.
