# Backend Development Standards

> This document is project-agnostic. It defines general backend API route conventions. For project-specific stack (Next.js, Node.js) and ownership conventions, see your project's context extension.

## Guidelines

- Default to JSON responses for product-facing APIs.
- Use the framework's response abstraction for all responses.
- Handle relevant HTTP status codes explicitly (e.g., `200`, `202`, `204`, `400`, `401`, `404`, `415`, `429`, `500`, `503`, `504`).
- Treat endpoint-level request hardening as backend scope: payload-size limits, content-length checks, and route-specific validation/auth controls.
- If a security change is global/platform-wide (middleware/header/runtime policy), coordinate via Infrastructure ownership and explicit Lead delegation.
- Document new or changed route contracts in the project's API contracts directory.
- Follow the [Development Standards](/projects/Everything/general/development/development-standards.md).
