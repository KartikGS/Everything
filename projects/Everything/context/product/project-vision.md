# Project Vision — Everything

> "An agentic IDE where AI agents build projects the way a disciplined engineering team would — with clear roles, structured handoffs, and a permanent record of every decision."

## The Problem Everything Solves

Before Everything, working with AI agents on a real project had two critical problems:

**1. No separation between context and code.**
Agent documentation lived inside the project's code folder (`agent-docs/`). Every session mixed reading context, writing code, and updating docs — there was no clean line between "what agents need to know" and "what agents are building."

**2. Agent knowledge was not portable.**
The role definitions, workflow protocols, and coordination patterns were tightly coupled to one specific project (LLM-Journey). Moving to a new project meant rebuilding all of that from scratch.

## What Everything Is

Everything is a **structured, portable multi-agent framework** for building software projects with AI. It provides:

- **A general layer** (`general/`) — reusable, project-agnostic agent roles, workflows, coordination protocols, and development standards. Every project can consume this layer without modification.
- **A project context layer** (`projects/<name>/context/`) — project-specific configuration that tells agents *how to operate within this specific project*: the stack, the workflows instantiated, the file paths, and the team conventions.
- **An operational artifacts layer** (`projects/<name>/agent-work/`) — the immutable record of all decisions, requirements, plans, and deliverables produced while building the project.
- **An initialization CLI** (`code/scripts/init.js`) — a tool for spinning up new projects with the correct structure and an optional council of Project Owners.

## The Self-Governing Principle

Everything is built using Everything. The same agent system that helps teams build products is the system used to evolve the platform itself. This means:

- When a problem with the general layer is found, a CR is raised and the multi-agent workflow is used to fix it.
- When a new role is needed, the Role Manager protocol is followed.
- When a platform direction needs deliberation, the council forum is used.

## End Goal

A developer should be able to:
1. Clone the Everything repository.
2. Run `node scripts/init.js` to create their project with the appropriate context structure.
3. Open a Claude Code session and immediately have agents that know their roles, understand the project, and can execute structured work.
4. Build any kind of project — web app, API, CLI tool, data pipeline — with the same reliable agent framework underneath.
