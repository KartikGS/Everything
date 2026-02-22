# General Layer

This directory contains the **reusable, project-agnostic agent system** for the Everything workspace.

## What Lives Here

- **Agent coordination protocols** — handoff, feedback, meta-improvement, conflict resolution
- **Agent role definitions** — frontend, backend, testing, infra (general patterns only)
- **Workflow patterns** — multi-agent workflow phases, delegation modes, invariants
- **Development standards** — contribution guidelines, coding practices, testing philosophy
- **Documentation templates** — ADR guide, API contract template
- **Design system** — design tokens (visual system, cross-project)

## What Does NOT Live Here

- Project-specific technology stacks (Next.js, React, etc.)
- Project-specific file paths or directory conventions
- Project names, CR IDs, or product decisions
- Any reference to a specific project

## How to Use

1. **Agents working on any project** load these documents first (Layer 0)
2. **Project context** (in `projects/<name>/context/`) then overlays project-specific extensions
3. See `/projects/Everything/MANIFEST.md` for a complete index of all general documents

## Extending for a New Project

General documents are designed to be extended, not modified:
- Role files define the general role; project `context/agents/roles/` files extend them with project-specific details
- Coordination protocols define the general pattern; project `context/agents/coordination/*-ext.md` files add project-specific file paths
- Workflow defines the general phase structure; project `context/agents/workflow.md` instantiates it with project role names and artifact paths

**Never add project-specific content here.** If something is specific to one project, it belongs in `projects/<name>/context/`.
