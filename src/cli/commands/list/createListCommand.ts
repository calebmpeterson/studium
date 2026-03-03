import { Command } from "commander";

import { listBooks } from "./listBooks";
import { listBookRecords } from "./listBookRecords";
import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

export const createListCommand = (): Command =>
  new Command("list")
    .description("List all books and their abbreviations")
    .option("--json", "Output valid JSON")
    .action((options: CliJsonOption) => {
      try {
        if (options.json) {
          console.log(formatRecordsAsJson(listBookRecords()));
          return;
        }

        console.log(listBooks().join("\n"));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
