# Project Log — Everything

## Scope Tags

Each active or completed entry should include a scope tag:

### Allowed Tags
- `[S]` — Small, single-session change
- `[M]` — Multi-step, single-phase change
- `[L]` — Multi-phase or long-running change
- `[ADR]` — Architectural decision involved
- `[DOC]` — Documentation-only change
- `[PLATFORM]` — Change to the general layer (affects all projects)

### Entry Lifecycle
- When adding a new completion entry, label it `Recent Focus`.
- Demote the previous `Recent Focus` entry to `Previous`.
- Keep at most **3** `Previous` entries visible. Move older entries to `## Archive`.
- Use consistent prefix labels: `Recent Focus` (1 entry max), `Previous` (up to 3).

---

## Current State

- **Status**: Platform foundation established. Context structure complete. Ready for first CRs.
- **Recent Focus**: [M][DOC] **Everything Project Context Setup**: Established full project context mirroring LLM-Journey's structure — product vision, principles, stack context, role extensions (tech-lead, BA), coordination protocol extensions, conversation templates, agent-work templates, and human-docs. Moved CLI code from repo root to `projects/Everything/code/`. — **Completed**.

## Next Priorities

- [ ] [S] **Node.js runtime upgrade**: System Node.js v16.20.1 is below documented minimum (>=18.0.0). Upgrade system Node or ensure nvm default is set to 18+. (Captured in `keep-in-mind.md`.)
- [ ] [S] **ESLint / Prettier setup**: No linter is configured for the CLI code. Add ESLint + Prettier to `projects/Everything/code/` as a quality gate.
- [ ] [S] **init.js smoke test**: Add a basic test that verifies the ROOT path calculation and project directory creation logic without running the interactive CLI.
- [ ] [M] **Version Control context extension**: Create `context/agents/roles/vc.md` extending the general VC role with Everything-specific paths and git conventions.
- [ ] [L] **Platform UI**: Design and implement a web-based UI for the council forum and project management (future phase; design tokens already exist in `general/design/design-tokens.md`).

## Archive

*(No archived entries yet — archive grows as priorities complete.)*
