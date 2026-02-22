# Everything Project — Manifest

This file is the path registry for the Everything project. Everything is the IDE itself — this workspace is built using Everything.

**Workspace root:** `/home/kartik/Everything/`

All paths below are workspace-root-relative (prepend the workspace root to resolve them).

---

## General Layer

The `general/` folder is the reusable agent system shared across all projects. It lives within the Everything project because Everything is the platform that provides it.

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

### Agents — Roles (General)
| Logical Name | Path |
|---|---|
| Tech Lead Role (general) | `/projects/Everything/general/agents/roles/tech-lead.md` |
| BA Role (general) | `/projects/Everything/general/agents/roles/ba.md` |
| Frontend Role (general) | `/projects/Everything/general/agents/roles/frontend.md` |
| Backend Role (general) | `/projects/Everything/general/agents/roles/backend.md` |
| Testing Role (general) | `/projects/Everything/general/agents/roles/testing.md` |
| Infra Role (general) | `/projects/Everything/general/agents/roles/infra.md` |

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

## Everything Context Layer

*To be built — Everything will have its own context, agent-work, and code as it is developed using itself.*

---

## Adding a New Project

To add a new project (e.g., `MyApp`) to this workspace:

1. Create `projects/MyApp/context/AGENTS.md` — entry point for MyApp agents
2. Create `projects/MyApp/context/stack/` — technology and tooling specifics
3. Create `projects/MyApp/context/product/` — product principles and vision
4. Create `projects/MyApp/context/agents/` — workflow, roles, conversations
5. Create `projects/MyApp/agent-work/` — operational CR artifacts
6. Create `projects/MyApp/code/` — application code ONLY
7. Create `projects/MyApp/MANIFEST.md` — path registry for MyApp's own context

General agents in `projects/Everything/general/` are immediately reusable — no modification needed.
Context extension files in `projects/MyApp/context/agents/` override project-agnostic parts with MyApp-specific file paths and conventions.
