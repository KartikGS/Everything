# Folder Structure — Everything

## Why These Folders Exist

```
Everything/                          # The Everything platform project
├── code/                            # Application source (CLI tools)
│   ├── scripts/
│   │   └── init.js                  # Project initialization CLI
│   └── package.json                 # CLI dependencies (inquirer)
│
├── context/                         # Agent context injection layer (stable, read by agents)
│   ├── AGENTS.md                    # Entry point for all agents (load first)
│   ├── product/                     # What the platform IS (vision, principles)
│   ├── stack/                       # How the platform is BUILT (tech, tooling, structure)
│   └── agents/                      # How agents OPERATE in Everything
│       ├── workflow.md              # Everything CR workflow (path conventions, phases)
│       ├── keep-in-mind.md          # Recent constraints and warnings
│       ├── council-forum-instance.md # Council forum instantiation for Everything
│       ├── coordination/            # Protocol extensions (handoff, feedback, meta)
│       ├── roles/                   # Role extensions (tech-lead, ba)
│       └── conversations/           # Active CR handoff/report files (single-CR artifacts)
│
├── agent-work/                      # Operational CR lifecycle artifacts (produced by agents)
│   ├── project-log.md               # Running project state & priorities
│   ├── requirements/                # CR requirement documents (CR-XXX-<slug>.md). Owned by BA.
│   ├── plans/                       # Tech Lead execution plans (CR-XXX-plan.md)
│   ├── reports/                     # Investigation & analysis reports
│   ├── decisions/                   # Architecture Decision Records (ADR-NNNN-slug.md)
│   └── meta/                        # Meta-analysis artifacts (META-YYYYMMDD-<CR-ID>-*.md)
│
├── general/                         # REUSABLE agent system (shared across all projects)
│   ├── agents/
│   │   ├── coordination/            # Universal protocols
│   │   ├── roles/                   # Universal role definitions
│   │   └── workflows/               # Workflow patterns
│   ├── config/                      # Schemas (council-config-schema.md)
│   ├── development/                 # Standards and guidelines
│   ├── documentation/               # ADR guide, API registry guide
│   └── design/                      # Design tokens
│
├── human-docs/                      # Human-readable documentation
└── MANIFEST.md                      # Path registry for Everything
```

## Key Distinctions

| Directory | Contents | Who Writes It | Lifespan |
|-----------|----------|---------------|---------|
| `context/` | Stable constraints agents load to understand the environment | Human or Tech Lead (deliberate updates) | Persistent; changes rarely |
| `agent-work/` | Operational artifacts produced by running the CR workflow | Agents (BA, Tech Lead, sub-agents) | Grows indefinitely; CRs are immutable after closure |
| `code/` | Platform application source | CLI/Backend agents (under Tech Lead delegation) | Evolves with features |
| `general/` | Project-agnostic reusable agent system | Role Manager, Tech Lead | Changes infrequently; very stable |

## Rules

- **No agent docs in `code/`**: The `code/` directory is application code only. All documentation lives in `context/`, `agent-work/`, `human-docs/`, or `general/`.
- **No code in `general/`**: The general layer contains only markdown files. Executables live in project `code/` directories.
- **`context/` vs `agent-work/`**: Context files are stable references that agents read at session start. Agent-work files are operational outputs produced during execution.
- **`general/` immutability**: The general layer is project-agnostic. Adding project-specific content to `general/` is a protocol violation.
