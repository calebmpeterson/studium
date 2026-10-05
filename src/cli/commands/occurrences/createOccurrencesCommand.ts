import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

import { findOccurrences } from "./findOccurrences";
import { formatOccurrencesText } from "./formatOccurrencesText";

export const createOccurrencesCommand = (): Command =>
  new Command("occurrences")
    .description("Show every KJV verse containing a term")
    .argument("<term>", "Single word/term")
    .option("--json", "Output valid JSON")
    .addHelpText(
      "after",
      `
Examples:
  $ kjv occurrences beginning
  $ kjv occurrences faith --json
`
    )
    .action((term: string, options: CliJsonOption) => {
      try {
        const records = findOccurrences(term);

        if (records.length === 0) {
          throw new Error(`No occurrences found for term: ${term}`);
        }

        if (options.json) {
          console.log(formatRecordsAsJson(records));
          return;
        }

        console.log(formatOccurrencesText(records));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
