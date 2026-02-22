# About Everything

## Origin

Everything grew out of a problem encountered while building LLM-Journey with AI agents.

The initial approach worked: markdown files described the project, roles gave agents specific responsibilities, and structured handoffs kept the work organized. But two problems emerged:

1. **No separation between context and code.** Agent documentation lived inside the project code folder (`agent-docs/`). Sessions mixed reading context, writing code, and updating docs with no clean boundary.

2. **Not portable.** All the role definitions, workflows, and coordination patterns were tightly coupled to LLM-Journey. Starting a new project meant rebuilding all of it from scratch.

Everything solves both problems.

## How It Works

Everything separates concerns into distinct layers:

**General Layer** (`general/`)
Project-agnostic role definitions, workflow patterns, coordination protocols, and development standards. This is the reusable foundation. Every new project gets this for free.

**Project Context** (`projects/<name>/context/`)
Project-specific configuration that tells agents *how to operate within this specific project*. Which files exist where, how CRs are named, what the tech stack is, what the team conventions are.

**Operational Artifacts** (`projects/<name>/agent-work/`)
Everything agents produce — requirements, plans, decisions, meta-analyses. Immutable after closure. A permanent record.

**Application Code** (`projects/<name>/code/`)
The actual software being built. Completely separate from agent context.

## The Self-Governing Principle

Everything is built using itself. When the platform needs improvement, the same BA → Tech Lead → sub-agent workflow is used. When platform direction needs deliberation, the council forum is used. The platform never gets "hotfixed" by skipping steps.

## The Council Forum

Everything introduces an optional council of Project Owners — a structured deliberation mechanism for deciding platform direction. When a user initializes a new project, they can configure:

- 2, 3, or 4 **Normal Project Owners** (constructive stakeholders)
- 1 or 2 **Devil's Advocate Project Owners** (stress-testers who always pair a risk with an alternative)

In a forum session, the user sends a message and each council member responds in sequence. Normal POs build the proposal; DAs challenge it. The human reviews and approves the majority position before any action is taken.

## What Everything Is Not

- A replacement for good engineering judgment
- A system that works without human oversight
- Complete or finished — it's actively evolving using its own workflow
