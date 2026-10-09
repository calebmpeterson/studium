import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliOccurrencesOptions } from "../../types";

import { findOccurrences } from "./findOccurrences";
import { formatOccurrencesText } from "./formatOccurrencesText";

export const createOccurrencesCommand = (): Command =>
  new Command("occurrences")
    .description("Show every KJV verse containing a term")
    .argument("<term>", "Single word/term")
    .option("--json", "Output valid JSON")
    .option(
      "-c, --category <category>",
      "Limit to a category; may be repeated",
      (category: string, previous: string[] = []) => [...previous, category]
    )
    .option(
      "-b, --book <book>",
      "Limit to a book title or abbreviation; may be repeated",
      (book: string, previous: string[] = []) => [...previous, book]
    )
    .addHelpText(
      "after",
      `
Examples:
  $ kjv occurrences beginning
  $ kjv occurrences faith --json
  $ kjv occurrences faith -c Gospels -c "Pauline Epistles"
  $ kjv occurrences faith -b John -b Rom
`
    )
    .action((term: string, options: CliOccurrencesOptions) => {
      try {
        const records = findOccurrences(term, options.category, options.book);

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
