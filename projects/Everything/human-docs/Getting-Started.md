# Getting Started with Everything

Everything is a multi-agent framework for building software projects with AI. This guide walks you through the setup and first steps.

## Prerequisites

- Node.js >=18.0.0 (use `nvm use 18` if needed)
- Claude Code (or any Claude-powered IDE)
- Git

## 1. Clone the Repository

```bash
git clone <repo-url>
cd Everything
```

## 2. Install CLI Dependencies

```bash
cd projects/Everything/code
npm install
```

## 3. Initialize a New Project

```bash
node scripts/init.js
# or: npm run init
```

The CLI will walk you through:
1. Creating a new project or opening an existing one
2. Optionally configuring a **council of Project Owners** for structured deliberation
3. Generating the project's context structure

## 4. Open a Claude Code Session

Point your Claude Code session at the workspace root (`/path/to/Everything/`).

When you start a session for a project, tell Claude which role to assume:
- `"You are the BA Agent for project MyProject"`
- `"You are the Tech Lead for project MyProject"`

Claude will load the three-layer context (general → project universal → role-specific) before starting work.

## 5. Start a Council Forum (Optional)

If you configured a council during init, you can start a forum session by telling Claude:

> "Start a council forum session for project MyProject. The topic is: [your topic]."

Claude will invoke each council member sequentially and present a summary after all members have responded.

## Project Structure

After init, your project will have:

```
projects/MyProject/
├── context/
│   ├── AGENTS.md                    # Entry point — agents read this first
│   └── agents/
│       └── council-forum-instance.md  # Forum config (if council enabled)
├── agent-work/                      # Operational artifacts (agents write here)
├── human-docs/                      # Your documentation
├── council-config.json              # Council member definitions (if council enabled)
└── (code/)                          # Your application code (add this yourself)
```

## Next Steps

- Read [About Everything](About-Everything.md) for a deeper understanding of the framework
- See the [project-log.md](/projects/Everything/agent-work/project-log.md) for current platform priorities
- Browse the general layer at [general/](/projects/Everything/general/) to understand the available roles and workflows
