import { Command } from "commander";

import { listBooks } from "./listBooks";
import { listBookRecords } from "./listBookRecords";
import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

export const createListCommand = (): Command =>
  new Command("list")
    .description("List all books and their abbreviations")
    .argument("[query...]", "Filter by book title or abbreviation")
    .option("--json", "Output valid JSON")
    .action((queryParts: string[] | undefined, options: CliJsonOption) => {
      try {
        const query = queryParts?.join(" ").trim() || undefined;

        if (options.json) {
          console.log(formatRecordsAsJson(listBookRecords(query)));
          return;
        }

        console.log(listBooks(query).join("\n"));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
