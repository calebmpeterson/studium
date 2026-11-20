#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { Command } from "commander";

import { createCategoriesCommand } from "./commands/categories/createCategoriesCommand";
import { createDefineCommand } from "./commands/define/createDefineCommand";
import { createListCommand } from "./commands/list/createListCommand";
import { createOccurrencesCommand } from "./commands/occurrences/createOccurrencesCommand";
import { createShowCommand } from "./commands/show/createShowCommand";
import packageJson from "./package.json";

declare const __KJV_STANDALONE__: boolean | undefined;

const program = new Command();
const skillPath = path.join(__dirname, "skill", "SKILL.md");

program.name("kjv").description("KJV CLI").version(packageJson.version);
program.option("--skill", "Print AI agent instructions for this CLI");
program.addHelpText(
  "after",
  `
Examples:
  $ kjv books
  $ kjv categories
  $ kjv show John 3:16
  $ kjv show Genesis 1:3-10
  $ kjv define Aaron
  $ kjv define 'eye*'
  $ kjv occurrences beginning --json

Run "kjv <command> --help" for command-specific examples.
`
);
program.addCommand(createListCommand());
program.addCommand(createCategoriesCommand());
program.addCommand(createShowCommand());
program.addCommand(createDefineCommand());
program.addCommand(createOccurrencesCommand());

if (process.argv.slice(2).includes("--skill")) {
  const skill = typeof __KJV_STANDALONE__ !== "undefined" && __KJV_STANDALONE__
    ? (require("node:sea") as typeof import("node:sea")).getAsset("skill", "utf8")
    : readFileSync(skillPath, "utf8");
  process.stdout.write(skill);
} else {
  program.parse();
}
