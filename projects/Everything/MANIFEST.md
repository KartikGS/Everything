# Everything Project — Manifest

This file is the path registry for the Everything project. Everything is simultaneously the platform that provides the general agent system and a project that uses its own framework.

**Workspace root:** `/home/kartik/Everything/`

All paths below are workspace-root-relative (prepend the workspace root to resolve them).

---

## Entry Point

| Logical Name | Path |
|---|---|
| **Agent Entry Point** | `/projects/Everything/context/AGENTS.md` |

---

## Product

| Logical Name | Path |
|---|---|
| Project Vision | `/projects/Everything/context/product/project-vision.md` |
| Project Principles | `/projects/Everything/context/product/project-principles.md` |

---

## Stack

| Logical Name | Path |
|---|---|
| Technical Context | `/projects/Everything/context/stack/technical-context.md` |
| Tooling Standard | `/projects/Everything/context/stack/tooling-standard.md` |
| Folder Structure | `/projects/Everything/context/stack/folder-structure.md` |

---

## Agents

| Logical Name | Path |
|---|---|
| Workflow | `/projects/Everything/context/agents/workflow.md` |
| Keep In Mind | `/projects/Everything/context/agents/keep-in-mind.md` |
| Council Forum Instance | `/projects/Everything/context/agents/council-forum-instance.md` |
| Handoff Protocol Extension | `/projects/Everything/context/agents/coordination/handoff-protocol-ext.md` |
| Feedback Protocol Extension | `/projects/Everything/context/agents/coordination/feedback-protocol-ext.md` |
| Meta Improvement Extension | `/projects/Everything/context/agents/coordination/meta-improvement-ext.md` |

---

## Agents — Roles (Everything Extensions)

| Logical Name | Path |
|---|---|
| Tech Lead (Everything ext) | `/projects/Everything/context/agents/roles/tech-lead.md` |
| BA (Everything ext) | `/projects/Everything/context/agents/roles/ba.md` |

---

## Conversations

| Logical Name | Path |
|---|---|
| Conversations Directory | `/projects/Everything/context/agents/conversations/` |

---

## Agent-Work (Operational Artifacts)

| Logical Name | Path |
|---|---|
| Project Log | `/projects/Everything/agent-work/project-log.md` |
| Decisions / ADRs Directory | `/projects/Everything/agent-work/decisions/` |
| Requirements / CRs Directory | `/projects/Everything/agent-work/requirements/` |
| Plans Directory | `/projects/Everything/agent-work/plans/` |
| Reports Directory | `/projects/Everything/agent-work/reports/` |
| Meta-Analysis Directory | `/projects/Everything/agent-work/meta/` |

---

## Code (CLI Application)

| Logical Name | Path |
|---|---|
| Project Init CLI | `/projects/Everything/code/scripts/init.js` |
| Package Manifest | `/projects/Everything/code/package.json` |

---

## General Layer

The `general/` folder is the reusable agent system shared across all projects.

### Agents — Coordination

| Logical Name | Path |
|---|---|
| General Principles | `/projects/Everything/general/agents/coordination/general-principles.md` |
| Reasoning Principles | `/projects/Everything/general/agents/coordination/reasoning-principles.md` |
| Handoff Protocol | `/projects/Everything/general/agents/coordination/handoff-protocol.md` |
| Feedback Protocol | `/projects/Everything/general/agents/coordination/feedback-protocol.md` |
| Meta Improvement Protocol | `/projects/Everything/general/agents/coordination/meta-improvement-protocol.md` |
| Conflict Resolution | `/projects/Everything/general/agents/coordination/conflict-resolution.md` |

### Agents — Workflows

| Logical Name | Path |
|---|---|
| Multi-Agent Workflow | `/projects/Everything/general/agents/workflows/multi-agent-workflow.md` |
| Council Forum Protocol | `/projects/Everything/general/agents/workflows/council-forum.md` |

### Agents — Roles (General)

| Logical Name | Path |
|---|---|
| Tech Lead Role (general) | `/projects/Everything/general/agents/roles/tech-lead.md` |
| BA Role (general) | `/projects/Everything/general/agents/roles/ba.md` |
| Frontend Role (general) | `/projects/Everything/general/agents/roles/frontend.md` |
| Backend Role (general) | `/projects/Everything/general/agents/roles/backend.md` |
| Testing Role (general) | `/projects/Everything/general/agents/roles/testing.md` |
| Infra Role (general) | `/projects/Everything/general/agents/roles/infra.md` |
| Version Control Role (general) | `/projects/Everything/general/agents/roles/version-control.md` |
| Role Manager (general) | `/projects/Everything/general/agents/roles/role-manager.md` |
| Normal Project Owner (general) | `/projects/Everything/general/agents/roles/normal-project-owner.md` |
| Devil's Advocate Project Owner (general) | `/projects/Everything/general/agents/roles/devils-advocate-project-owner.md` |

### Config

| Logical Name | Path |
|---|---|
| Council Config Schema | `/projects/Everything/general/config/council-config-schema.md` |

### Development

| Logical Name | Path |
|---|---|
| Contribution Guidelines | `/projects/Everything/general/development/contribution-guidelines.md` |
| Development Standards | `/projects/Everything/general/development/development-standards.md` |
| Backend Standards | `/projects/Everything/general/development/backend-standards.md` |
| Testing Strategy (general) | `/projects/Everything/general/development/testing-strategy.md` |
| API Contract Template | `/projects/Everything/general/development/api-contract-template.md` |

### Documentation

| Logical Name | Path |
|---|---|
| ADR Guide | `/projects/Everything/general/documentation/adr-guide.md` |
| API Registry Guide | `/projects/Everything/general/documentation/api-registry-guide.md` |

### Design

| Logical Name | Path |
|---|---|
| Design Tokens | `/projects/Everything/general/design/design-tokens.md` |

---

## Human Docs

| Logical Name | Path |
|---|---|
| Getting Started | `/projects/Everything/human-docs/Getting-Started.md` |
| About Everything | `/projects/Everything/human-docs/About-Everything.md` |

---

## Adding a New Project

To add a new project (e.g., `MyApp`) to this workspace:

1. Run `node projects/Everything/code/scripts/init.js` to scaffold the project automatically, or:
2. Manually create `projects/MyApp/context/AGENTS.md` — entry point for MyApp agents
3. Create `projects/MyApp/context/product/` — product vision and principles
4. Create `projects/MyApp/context/stack/` — technology and tooling specifics
5. Create `projects/MyApp/context/agents/` — workflow, roles, conversations, coordination
6. Create `projects/MyApp/agent-work/` — operational CR artifacts
7. Create `projects/MyApp/code/` — application code ONLY
8. Create `projects/MyApp/MANIFEST.md` — path registry for MyApp's own context

General agents in `projects/Everything/general/` are immediately reusable — no modification needed.
Context extension files in `projects/MyApp/context/agents/` override project-agnostic parts with MyApp-specific file paths and conventions.
