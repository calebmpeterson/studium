import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

import { formatShowText } from "./formatShowText";
import { parseReference } from "./parseReference";
import { show } from "./show";

export const createShowCommand = (): Command =>
  new Command("show")
    .description("Show KJV verses for a reference")
    .argument("<reference...>", "Bible reference (single chapter only)")
    .option("--json", "Output valid JSON")
    .action((referenceParts: string[], options: CliJsonOption) => {
      try {
        const reference = referenceParts.join(" ");
        const parsed = parseReference(reference);
        const records = show(parsed.book, parsed.chapter, parsed.verses);

        if (options.json) {
          console.log(formatRecordsAsJson(records));
          return;
        }

        console.log(formatShowText(records, parsed.verses));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
