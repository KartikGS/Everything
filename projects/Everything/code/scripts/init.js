#!/usr/bin/env node
/**
 * Everything — Project Initialization CLI
 *
 * Sets up a new project (or opens an existing one) and optionally configures
 * a council of Project Owners for structured deliberation.
 *
 * Usage (from projects/Everything/code/):
 *   node scripts/init.js
 *   npm run init
 */

import inquirer from "inquirer";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
// Workspace root: projects/Everything/code/scripts/ -> code/ -> Everything/ -> projects/ -> workspace root
const ROOT = resolve(__dirname, "../../../..");
const PROJECTS_DIR = join(ROOT, "projects");

// ─── Helpers ────────────────────────────────────────────────────────────────

function listExistingProjects() {
  if (!existsSync(PROJECTS_DIR)) return [];
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function writeFile(path, content) {
  writeFileSync(path, content, "utf8");
}

function daCount(normalPoCount) {
  return Math.floor(normalPoCount / 2);
}

function formatDate() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Default names / perspectives ───────────────────────────────────────────

const PO_DEFAULTS = [
  { name: "Alex", perspective: "user-focused" },
  { name: "Jordan", perspective: "business-focused" },
  { name: "Sam", perspective: "strategic" },
  { name: "Casey", perspective: "technical-feasibility" },
];

const DA_DEFAULTS = [
  { name: "Morgan", perspective: "risk-focused" },
  { name: "Riley", perspective: "systems-thinking" },
];

// ─── File generators ─────────────────────────────────────────────────────────

function generateCouncilConfig(projectName, normalPOs, devilsAdvocates) {
  return JSON.stringify(
    {
      project: projectName,
      created: formatDate(),
      council: {
        normal_pos: normalPOs.map((m, i) => ({
          id: `po-${i + 1}`,
          name: m.name,
          perspective: m.perspective,
        })),
        devils_advocates: devilsAdvocates.map((m, i) => ({
          id: `da-${i + 1}`,
          name: m.name,
          perspective: m.perspective,
        })),
      },
    },
    null,
    2
  );
}

function generateAgentsMd(projectName, hasCouncil, normalPOs, devilsAdvocates) {
  const councilSection = hasCouncil
    ? `
## Council of Project Owners

This project has a configured council. Load \`council-config.json\` to identify members.

When the user sends a message in the forum, invoke the council members **sequentially** in this order:

${normalPOs.map((m, i) => `${i + 1}. **${m.name}** (Normal PO — ${m.perspective})`).join("\n")}
${devilsAdvocates.map((m, i) => `${normalPOs.length + i + 1}. **${m.name}** (Devil's Advocate — ${m.perspective})`).join("\n")}

After all members have responded, present a consolidated summary to the user.

For the full sequential forum protocol, see:
\`projects/Everything/general/agents/workflows/council-forum.md\`

For this project's specific forum instantiation, see:
\`projects/${projectName}/context/agents/council-forum-instance.md\`
`
    : `
## No Council Configured

This project has no council. Deliberation happens directly between the human and the BA/Tech Lead roles.
`;

  return `# ${projectName} — Agent Context Entry Point

> This file is the entry point for Claude Code sessions operating on the ${projectName} project.
> It extends the general agent system at \`projects/Everything/general/\`.
${councilSection}
## Available Workflows

- **Multi-Agent Development**: \`projects/Everything/general/agents/workflows/multi-agent-workflow.md\`
- **Council Forum**: \`projects/Everything/general/agents/workflows/council-forum.md\`

## Role Definitions

All role definitions are in \`projects/Everything/general/agents/roles/\`.
`;
}

function generateCouncilForumInstance(projectName, normalPOs, devilsAdvocates) {
  const sequence = [
    ...normalPOs.map((m, i) => `${i + 1}. **${m.name}** — Normal Project Owner (${m.perspective})`),
    ...devilsAdvocates.map(
      (m, i) => `${normalPOs.length + i + 1}. **${m.name}** — Devil's Advocate (${m.perspective})`
    ),
  ].join("\n");

  return `# Council Forum — ${projectName} Instance

> This is the project-specific instantiation of the general council forum protocol.
> General protocol: \`projects/Everything/general/agents/workflows/council-forum.md\`
> Council config: \`projects/${projectName}/council-config.json\`

## Council Sequence

When the user sends a message, invoke members in this order:

${sequence}

## Member Personas

${normalPOs
  .map(
    (m, i) => `### ${m.name} (Normal PO ${i + 1})
- **Role**: Normal Project Owner
- **Perspective**: ${m.perspective}
- **Role definition**: \`projects/Everything/general/agents/roles/normal-project-owner.md\`
`
  )
  .join("\n")}
${devilsAdvocates
  .map(
    (m, i) => `### ${m.name} (Devil's Advocate ${i + 1})
- **Role**: Devil's Advocate Project Owner
- **Perspective**: ${m.perspective}
- **Role definition**: \`projects/Everything/general/agents/roles/devils-advocate-project-owner.md\`
`
  )
  .join("\n")}
## Project-Specific Notes

- Project name: ${projectName}
- Created: ${formatDate()}
- For deliberation phase → BA handoff rules, see the general role definitions.
`;
}

function generateNoCouncilAgentsMd(projectName) {
  return `# ${projectName} — Agent Context Entry Point

> This file is the entry point for Claude Code sessions operating on the ${projectName} project.
> It extends the general agent system at \`projects/Everything/general/\`.

## No Council Configured

This project has no council. Deliberation happens directly between the human and the BA/Tech Lead roles.

## Available Workflows

- **Multi-Agent Development**: \`projects/Everything/general/agents/workflows/multi-agent-workflow.md\`

## Role Definitions

All role definitions are in \`projects/Everything/general/agents/roles/\`.
`;
}

// ─── Council member prompts ──────────────────────────────────────────────────

async function collectMembers(label, count, defaults) {
  const members = [];
  for (let i = 0; i < count; i++) {
    const def = defaults[i] || { name: `Member${i + 1}`, perspective: "general" };
    console.log(`\n  ${label} ${i + 1}:`);
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `    Name`,
        default: def.name,
      },
      {
        type: "input",
        name: "perspective",
        message: `    Perspective`,
        default: def.perspective,
      },
    ]);
    members.push(answers);
  }
  return members;
}

// ─── Create project ──────────────────────────────────────────────────────────

async function createProject() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (v) => {
        if (!v.trim()) return "Project name cannot be empty.";
        if (!/^[a-zA-Z0-9_-]+$/.test(v.trim()))
          return "Use only letters, numbers, hyphens, and underscores.";
        const path = join(PROJECTS_DIR, v.trim());
        if (existsSync(path)) return `A project named "${v.trim()}" already exists.`;
        return true;
      },
    },
  ]);

  const name = projectName.trim();
  const projectDir = join(PROJECTS_DIR, name);

  // Council setup
  const { wantsCouncil } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantsCouncil",
      message: "Set up a council of Project Owners?",
      default: true,
    },
  ]);

  let normalPOs = [];
  let devilsAdvocates = [];

  if (wantsCouncil) {
    const { poCount } = await inquirer.prompt([
      {
        type: "list",
        name: "poCount",
        message: "Number of Normal Project Owners:",
        choices: [
          { name: "2  (+ 1 Devil's Advocate)", value: 2 },
          { name: "3  (+ 1 Devil's Advocate)", value: 3 },
          { name: "4  (+ 2 Devils' Advocates)", value: 4 },
        ],
      },
    ]);

    const daNum = daCount(poCount);
    console.log(
      `\n  Council will have ${poCount} Normal PO${poCount > 1 ? "s" : ""} and ${daNum} Devil's Advocate${daNum > 1 ? "s" : ""}.`
    );

    console.log("\n  Configure Normal Project Owners:");
    normalPOs = await collectMembers("Normal PO", poCount, PO_DEFAULTS);

    console.log("\n  Configure Devil's Advocate(s):");
    devilsAdvocates = await collectMembers("Devil's Advocate", daNum, DA_DEFAULTS);
  }

  // Create directory structure
  ensureDir(projectDir);
  ensureDir(join(projectDir, "context", "agents"));
  ensureDir(join(projectDir, "agent-work"));
  ensureDir(join(projectDir, "human-docs"));

  // Write council-config.json
  if (wantsCouncil) {
    writeFile(
      join(projectDir, "council-config.json"),
      generateCouncilConfig(name, normalPOs, devilsAdvocates)
    );
    writeFile(
      join(projectDir, "context", "AGENTS.md"),
      generateAgentsMd(name, true, normalPOs, devilsAdvocates)
    );
    writeFile(
      join(projectDir, "context", "agents", "council-forum-instance.md"),
      generateCouncilForumInstance(name, normalPOs, devilsAdvocates)
    );
  } else {
    writeFile(join(projectDir, "context", "AGENTS.md"), generateNoCouncilAgentsMd(name));
}

  // Summary
  console.log(`\n  ✓ Project created at: projects/${name}/`);
  if (wantsCouncil) {
    console.log(`\n  Council configured:`);
    console.log(
      `    Normal POs:         ${normalPOs.map((m) => `${m.name} (${m.perspective})`).join(", ")}`
    );
    console.log(
      `    Devil's Advocates:  ${devilsAdvocates.map((m) => `${m.name} (${m.perspective})`).join(", ")}`
    );
    console.log(`\n  Files generated:`);
    console.log(`    projects/${name}/council-config.json`);
    console.log(`    projects/${name}/context/AGENTS.md`);
    console.log(`    projects/${name}/context/agents/council-forum-instance.md`);
  } else {
    console.log(`\n  Files generated:`);
    console.log(`    projects/${name}/context/AGENTS.md`);
  }
  console.log(`\n  Open a Claude Code session in this directory to begin.`);
}

// ─── Open existing project ───────────────────────────────────────────────────

async function openProject() {
  const existing = listExistingProjects();
  if (existing.length === 0) {
    console.log("\n  No existing projects found. Create one first.\n");
    return;
  }

  const { projectName } = await inquirer.prompt([
    {
      type: "list",
      name: "projectName",
      message: "Select a project:",
      choices: existing,
    },
  ]);

  const projectDir = join(PROJECTS_DIR, projectName);
  const configPath = join(projectDir, "council-config.json");

  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, "utf8"));
    const { council } = config;
    console.log(`\n  Project: ${projectName}`);
    console.log(`  Council:`);
    council.normal_pos.forEach((m) =>
      console.log(`    Normal PO: ${m.name} (${m.perspective})`)
    );
    council.devils_advocates.forEach((m) =>
      console.log(`    Devil's Advocate: ${m.name} (${m.perspective})`)
    );
  } else {
    console.log(`\n  Project: ${projectName} (no council configured)`);
  }

  console.log(
    `\n  Open a Claude Code session in projects/${projectName}/ to begin.\n`
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n  Welcome to Everything!\n  " + "─".repeat(22));

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { name: "Create new project", value: "create" },
        { name: "Open existing project", value: "open" },
      ],
    },
  ]);

  if (action === "create") {
    await createProject();
  } else {
    await openProject();
  }
}

main().catch((err) => {
  console.error("\n  Error:", err.message);
  process.exit(1);
});
