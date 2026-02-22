# Technical Context — Everything

> This file is a summary of Everything's current technical configuration.
> If any rule here conflicts with policy language, `tooling-standard.md` is canonical.

## What Everything Builds

Everything is currently a **Node.js CLI tool** for initializing project structures. Future phases may add a web UI, a plugin system, or additional tooling.

## Current Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| **Runtime** | Node.js >=18.0.0 | ES Modules (`"type": "module"`) |
| **Package Manager** | npm | Lockfile: `projects/Everything/code/package-lock.json` |
| **CLI Framework** | `inquirer` v12 | Arrow-key prompts, confirmations |
| **Language** | JavaScript (ESM) | No TypeScript yet |
| **Test Framework** | None yet | Init CLI is currently untested |

## Key Paths

| What | Path |
|------|------|
| CLI entry point | `projects/Everything/code/scripts/init.js` |
| Package manifest | `projects/Everything/code/package.json` |
| Workspace root | `/home/kartik/Everything/` |
| Projects directory | `/home/kartik/Everything/projects/` |

## CLI Behavior

The `init.js` script:
1. Resolves the workspace root as 4 levels up from its own location (`__dirname/../../../..`)
2. Lists and creates projects under `projects/<name>/`
3. Generates `council-config.json`, `context/AGENTS.md`, and `context/agents/council-forum-instance.md`
4. Uses `floor(normalPOCount / 2)` to determine DA count (always 1 or 2)

## Node.js Version Note

The system may have Node.js v16 installed as default. Everything requires Node.js >=18.0.0.

**Recovery path**: Use `nvm use 18` (or `nvm use 20`) before running the CLI. If nvm is unavailable, install Node.js 18 or higher.

## Operational Invariants

- **No global side effects**: The CLI only creates files — it never modifies system state, installs global packages, or touches files outside `projects/`.
- **Idempotency**: If a project directory already exists, the CLI rejects the name and prompts again.
- **No hardcoded absolute paths**: All paths in `init.js` are derived from `__dirname` at runtime.
