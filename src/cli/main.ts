#!/usr/bin/env node

import { Command } from "commander";

import { createDefineCommand } from "./commands/define/createDefineCommand";
import { createListCommand } from "./commands/list/createListCommand";
import { createShowCommand } from "./commands/show/createShowCommand";
import { createXrefsCommand } from "./commands/xrefs/createXrefsCommand";
import packageJson from "./package.json";

const program = new Command();

program.name("kjv").description("KJV CLI").version(packageJson.version);
program.addCommand(createListCommand());
program.addCommand(createShowCommand());
program.addCommand(createDefineCommand());
program.addCommand(createXrefsCommand());

program.parse();
