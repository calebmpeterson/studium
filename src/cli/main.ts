#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { Command } from "commander";

import { createDefineCommand } from "./commands/define/createDefineCommand";
import { createListCommand } from "./commands/list/createListCommand";
import { createOccurrencesCommand } from "./commands/occurrences/createOccurrencesCommand";
import { createShowCommand } from "./commands/show/createShowCommand";
import packageJson from "./package.json";

const program = new Command();
const skillPath = path.join(__dirname, "skill", "SKILL.md");

program.name("kjv").description("KJV CLI").version(packageJson.version);
program.option("--skill", "Print AI agent instructions for this CLI");
program.addHelpText(
  "after",
  `
Examples:
  $ kjv list
  $ kjv show John 3:16
  $ kjv show Genesis 1:3-10
  $ kjv define Aaron
  $ kjv occurrences beginning --json

Run "kjv <command> --help" for command-specific examples.
`
);
program.addCommand(createListCommand());
program.addCommand(createShowCommand());
program.addCommand(createDefineCommand());
program.addCommand(createOccurrencesCommand());

if (process.argv.slice(2).includes("--skill")) {
  process.stdout.write(readFileSync(skillPath, "utf8"));
} else {
  program.parse();
}
