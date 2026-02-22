# Keep In Mind (Temporary)

> [!WARNING]
> Entries here are temporary constraints or warnings derived from recent mistakes or active constraints not yet promoted to permanent documentation.
> **Lifecycle**: Add here → Fix root cause → Move to permanent doc → Delete from here.
> **Promotion ownership**: Tech Lead promotes technical warnings (during Verification Phase). BA promotes product/process warnings (during Acceptance Phase). Both roles should review entries at each CR and retire any whose root causes are resolved.

## Format (follow this for all entries)

### [Date Added: YYYY-MM-DD] Short Title
**Issue**: What happened or what is the risk.
**Constraint**: The rule to follow to avoid it.
**Root Cause**: Why the permanent docs don't yet capture this.
**Action**: What needs to happen to retire this entry.

---

## Active Warnings

### [Date Added: 2026-02-22] Node.js Runtime Mismatch
**Issue**: System Node.js is v16.20.1, below the documented minimum of >=18.0.0. The CLI (`init.js`) uses ES Module syntax and `inquirer` v12, both of which require Node >=18.
**Constraint**: Always run `nvm use 18` (or `nvm use 20`) before executing `node scripts/init.js` or any verification commands. Node.js v18.19.0 is available via nvm at `~/.nvm/versions/node/v18.19.0`.
**Root Cause**: System Node not upgraded; nvm version is available but not set as default.
**Action**: Upgrade system Node.js to >=18.0.0 and update `/projects/Everything/context/stack/tooling-standard.md` to confirm resolution.

### [Date Added: 2026-02-22] init.js ROOT Path Is Critical
**Issue**: `init.js` calculates the workspace root by traversing 4 directories up from its own location (`__dirname/../../../..`). If the file is moved, this calculation breaks and projects will be created in the wrong location.
**Constraint**: Do not move `init.js` without updating the ROOT calculation. Current location: `projects/Everything/code/scripts/init.js`.
**Root Cause**: The path is hardcoded via relative traversal — there is no config file that specifies the workspace root independently.
**Action**: Add a `everything.config.json` at workspace root or use an environment variable for ROOT. Create a CR when this becomes a problem.

### [Date Added: 2026-02-22] General Layer Must Remain Project-Agnostic
**Issue**: Early sessions occasionally added project-specific content (Everything or LLM-Journey references) to files under `general/`. This violates portability.
**Constraint**: Before modifying any file under `general/`, verify that every sentence remains true for any project, not just Everything. If a rule is Everything-specific, it belongs in `context/`.
**Root Cause**: The distinction between `general/` and `context/` is clear in principle but easy to violate under time pressure.
**Action**: Role Manager to add an explicit check to the role file authoring protocol. Once that's added, this entry can be retired.
