# Tooling Standard — Everything

## Runtime

- **Node.js**: >=18.0.0 (ES Modules required)
- **Recommended**: Node.js 20.x LTS for full compatibility

### Runtime Preflight (Mandatory)

Run `node -v` once per execution session before any verification commands.

If runtime is below 18.0.0, classify as **environmental mismatch** in the role report.

**Recovery path**: `nvm use 18` (or `nvm use 20`). If nvm is unavailable, report as a blocker — do not proceed with a mismatched runtime.

## Package Management

- **Manager**: `npm`
- **Install location**: `projects/Everything/code/` (run `npm install` from there)
- **Lockfile**: `projects/Everything/code/package-lock.json`

## Running the CLI

From the workspace root:
```bash
cd projects/Everything/code
npm install        # first time only
node scripts/init.js
# or: npm run init
```

## Dependency Governance

Sub-agents are **NOT** permitted to install new npm packages. Package additions require:
1. A CR documenting the need
2. Tech Lead approval
3. Tech Lead executing the install (or explicitly delegating to Backend agent)

## No Linter or Formatter Yet

ESLint and Prettier are not configured for this project yet. Code style is maintained manually.

When a linter is added, this file will be updated with the canonical commands.

## Git

See `/projects/Everything/general/development/contribution-guidelines.md` for branching strategy and commit conventions.

Standard preflight for any git-touching session:
- Confirm current branch before making changes
- Never force-push without explicit human approval
