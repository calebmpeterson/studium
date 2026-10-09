import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

import { listCategories } from "./listCategories";

export const createCategoriesCommand = (): Command =>
  new Command("categories")
    .description("List Bible book categories")
    .option("--json", "Output valid JSON")
    .addHelpText(
      "after",
      `
Examples:
  $ kjv categories
  $ kjv categories --json
`
    )
    .action((options: CliJsonOption) => {
      try {
        const categories = listCategories();

        if (options.json) {
          console.log(formatRecordsAsJson(categories));
          return;
        }

        console.log(categories.map(({ label }) => label).join("\n"));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
