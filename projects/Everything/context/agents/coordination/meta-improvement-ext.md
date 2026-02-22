# Meta Improvement Protocol — Everything Extension

> Extends: [/projects/Everything/general/agents/coordination/meta-improvement-protocol.md](/projects/Everything/general/agents/coordination/meta-improvement-protocol.md)
>
> This file contains Everything-specific file paths and session prompts. Read the general protocol first, then apply these overrides.

## Everything File Path Conventions

- **Findings files**: `/projects/Everything/agent-work/meta/META-YYYYMMDD-<CR-ID>-<role>-findings.md`
- **Synthesis file**: `/projects/Everything/agent-work/meta/META-YYYYMMDD-<CR-ID>-synthesis.md`
- **Meta directory**: `/projects/Everything/agent-work/meta/` (create if not exists)
- **Project log**: `/projects/Everything/agent-work/project-log.md`

## Standard Session Prompt — Phase 1 (Per-Agent Findings)

Use verbatim when starting each Phase 1 agent session:

```
You are a <Role> Agent operating in meta-improvement mode for the Everything project.

This is a resumed session. You have full context of your <CR-ID> execution.

Your task: produce your findings file at:
`/projects/Everything/agent-work/meta/META-YYYYMMDD-<CR-ID>-<role>-findings.md`

Follow Phase 1 of `/projects/Everything/general/agents/coordination/meta-improvement-protocol.md` for the required
file format. Create the `/projects/Everything/agent-work/meta/` directory if it does not yet exist.

[Include the following block for every agent except the first:]
Prior findings to review and assess (carry-forward — mandatory):
- @/projects/Everything/agent-work/meta/META-YYYYMMDD-<CR-ID>-<prior-role>-findings.md
[Add one line per prior findings file in execution order]
```

## Standard Session Prompt — Phase 2 (Synthesis)

Use verbatim when starting the synthesis session:

```
You are a Tech Lead operating in meta-improvement mode for the Everything project.

Attached are per-agent findings files from a <CR-ID> meta-analysis:
- [list findings files with paths under /projects/Everything/agent-work/meta/]

Your task:
1. De-duplicate overlapping findings across agents.
2. Prioritize each finding: High / Medium / Low.
3. For each finding, decide: Fix | Defer | Reject — with a one-line rationale.
4. For Fix items: propose specific, minimal before/after wording for the affected doc and section.

Output: /projects/Everything/agent-work/meta/META-YYYYMMDD-<CR-ID>-synthesis.md

This is NOT a CR execution session. Do not write plans, handoffs, or code.
Do not fix items by duplicating policy text across files; resolve by updating one source-of-truth location and cross-referencing.
```

## Phase 3 — Everything Implementation

- Doc-only changes are implemented as a `CR-XXX-<slug>.md` under `/projects/Everything/agent-work/requirements/`.
- Implemented changes are logged in `/projects/Everything/agent-work/project-log.md`.

## Special Note: General Layer Changes

When meta-improvement findings affect `general/` files, extra care is required:
- Changes must remain project-agnostic.
- The Role Manager protocol must be followed for role file changes.
- The blast radius across all projects consuming `general/` must be assessed before implementation.
