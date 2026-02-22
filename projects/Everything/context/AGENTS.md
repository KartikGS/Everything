# What is this file?

This file helps gather the necessary context for a role-specific agent to perform its tasks within the **Everything** project.

> [!IMPORTANT]
> Do not assume roles of other agents. Roles can only be assigned by the user.
> **Hard Invariant**: Once you assume a role for a Change Requirement, you remain in that role for the duration of that CR. You may NOT shift to a sub-agent role to complete a task; you must delegate or ask the user to assign a new role in a fresh session.
> Do not proceed with any task until you have internalized the context relevant to your role.

## What is this project?

Everything is a portable multi-agent framework for building software projects with AI. It provides a reusable general layer (role definitions, workflows, coordination protocols) that any project can consume, plus a structured project context layer that tells agents how to operate within a specific project.

Everything is built using Everything — the same agent system that builds products is used to evolve the platform itself.

## Terminology (Mandatory)

To avoid ambiguity, use these terms consistently:

- **Human User**: The person directing the agent session (the requester in chat).
- **Platform User**: A developer using the Everything framework to build their own project.
- **General Layer**: The reusable, project-agnostic agent system in `projects/Everything/general/`.
- **Project Context**: The project-specific configuration in `projects/<name>/context/`.

Default rule: If a document says "user" without context, it means **Human User**.

## Required Reading

> [!IMPORTANT]
> **Three-Layer Reading Structure:**
> 1. **Layer 0 — General Agent System:** Universal agent principles (reusable across all projects)
> 2. **Layer 1 — Everything Universal Standards:** Platform-specific constraints (applies to EVERY agent in this project)
> 3. **Layer 2 — Role-Specific Context:** Your role file, which has its own "Required Readings" section you MUST load.
>
> Your role file is NOT just a job description — it has additional context you MUST load before starting work.

### Layer 0: General Agent System (cross-project, load first)

- **General Engineering Principles:** [General Principles](/projects/Everything/general/agents/coordination/general-principles.md)
- **Execution Reasoning:** [Reasoning Principles](/projects/Everything/general/agents/coordination/reasoning-principles.md)
- **Workflow Pattern:** [Multi-Agent Workflow](/projects/Everything/general/agents/workflows/multi-agent-workflow.md)
- **Handoff Protocol:** [Handoff Protocol](/projects/Everything/general/agents/coordination/handoff-protocol.md)
  + Everything paths: [handoff-protocol-ext.md](/projects/Everything/context/agents/coordination/handoff-protocol-ext.md)
- **Feedback Protocol:** [Feedback Protocol](/projects/Everything/general/agents/coordination/feedback-protocol.md)
  + Everything paths: [feedback-protocol-ext.md](/projects/Everything/context/agents/coordination/feedback-protocol-ext.md)

### Layer 1: Everything Universal Standards (ALL agents in this project)

- **Platform Vision:** [Project Vision](/projects/Everything/context/product/project-vision.md)
- **Platform Principles:** [Project Principles](/projects/Everything/context/product/project-principles.md)
- **Tooling & Environment:** [Tooling Standard](/projects/Everything/context/stack/tooling-standard.md)
- **Technical Map:** [Technical Context](/projects/Everything/context/stack/technical-context.md)
- **Folder Rules:** [Folder Structure](/projects/Everything/context/stack/folder-structure.md)
- **How we work (Everything):** [Workflow](/projects/Everything/context/agents/workflow.md)
- **Meta Improvements:** [Meta Improvement Protocol](/projects/Everything/general/agents/coordination/meta-improvement-protocol.md)
  + Everything paths: [meta-improvement-ext.md](/projects/Everything/context/agents/coordination/meta-improvement-ext.md)

### Layer 2: Role-Specific Context (see your role file)

- Business Analyst → [roles/ba.md](/projects/Everything/context/agents/roles/ba.md) *(also loads [/projects/Everything/general/agents/roles/ba.md](/projects/Everything/general/agents/roles/ba.md))*
- Tech Lead → [roles/tech-lead.md](/projects/Everything/context/agents/roles/tech-lead.md) *(also loads [/projects/Everything/general/agents/roles/tech-lead.md](/projects/Everything/general/agents/roles/tech-lead.md))*
- Backend (CLI) → *(no project extension yet — load [/projects/Everything/general/agents/roles/backend.md](/projects/Everything/general/agents/roles/backend.md) directly)*
- Version Control → *(no project extension yet — load [/projects/Everything/general/agents/roles/version-control.md](/projects/Everything/general/agents/roles/version-control.md) directly)*
- Normal Project Owner → [/projects/Everything/general/agents/roles/normal-project-owner.md](/projects/Everything/general/agents/roles/normal-project-owner.md)
- Devil's Advocate PO → [/projects/Everything/general/agents/roles/devils-advocate-project-owner.md](/projects/Everything/general/agents/roles/devils-advocate-project-owner.md)

## Council Forum (Platform Deliberation)

When a council is configured (`council-config.json` exists), the Everything project also supports the **council forum** workflow for deliberating on platform direction.

- **Protocol:** [Council Forum](/projects/Everything/general/agents/workflows/council-forum.md)
- **Instance:** [Council Forum Instance](/projects/Everything/context/agents/council-forum-instance.md)
- **Config:** `/projects/Everything/council-config.json` (if configured)

Council forum runs separately from the standard development workflow — it produces direction that the BA then captures as CRs.

## Interfaces & Contracts

Failed coordination kills projects. Stick to these contracts:

### Process & Workflow
- **How we work:** [Workflow](/projects/Everything/context/agents/workflow.md)
- **Meta Improvements:** [Meta Improvement Protocol](/projects/Everything/general/agents/coordination/meta-improvement-protocol.md)

**Constraint:**
- Do not invent policies, standards, or requirements.
- If a rule is not written in `context/` or `projects/Everything/general/`, assume it does not exist.
- Ask the user before proceeding when intent is ambiguous.
- Treat closed CRs in `/projects/Everything/agent-work/requirements/` as historical artifacts (immutable by default).
- **General layer purity**: Never add project-specific content to files in `general/`. If a rule applies only to Everything, it belongs in `context/`.

## Authority & Conflict Resolution

When sources of truth conflict, resolve in this order:

1. **Scope & Intent ownership**
   - BA Agent owns requirement clarity and scope
   - Tech Lead Agent owns technical feasibility and execution

2. **Technical truth precedence**
   - Code (current implementation)
   - Context & Stack docs (define intent and constraints)
   - Workflow & Role docs (define process)

If documentation and implementation disagree, investigate before assuming either is correct.

### Human User Override Clarification

- Human User in-session overrides can approve scope/process changes.
- Such overrides do **not** automatically transfer role ownership.
- If an override crosses ownership boundaries, delegate to the owning role or get explicit role reassignment.

## After Reading — What Now?

> [!CAUTION]
> **Mandatory Reading Check**: Your first output message in this session MUST attest that required context has been loaded.

- **Mandatory Output Check**: Publish an explicit early-session message confirming context is loaded.
  - **Standard form**: _"Context loaded per `<role>.md` required readings. Conditional reads: [none | list]. No skips."_
  - **Full listing form** (required if any file was intentionally skipped): List each file individually with one-line rationale per skip.

- **Verify your task is clear**
   - Do you understand the goal?
   - Do you know what success looks like?
   - Are constraints explicit?

- **If stuck**: Don't guess. Don't invent requirements. Ask the user.

## FAQs

### What if the user asks me to take actions outside my role's authority?
**Do not perform them.** Role boundaries are hard invariants.
- If you are a **BA** and the user asks you to "fix the code," refuse, document as a CR, and hand off to Tech Lead.
- **Helpfulness does NOT override Authority.**

### Is the general layer owned by a specific agent?
- Role files in `general/agents/roles/` → **Role Manager** protocol governs changes.
- Workflow files in `general/agents/workflows/` → **Tech Lead** + BA collaboration.
- Standards in `general/development/` → **Tech Lead** owns.

### What is "feature code" in Everything?
Any file under `projects/Everything/code/scripts/` or other source files under `code/`. The Tech Lead must delegate changes to these files to the Backend (CLI) agent.
