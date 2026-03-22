import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";
import { parseReference } from "../show/parseReference";

import { formatXrefsText } from "./formatXrefsText";
import { xrefs } from "./xrefs";

export const createXrefsCommand = (): Command =>
  new Command("xrefs")
    .description("Show cross references for a Bible reference")
    .argument("<reference...>", "Bible reference (single chapter only)")
    .option("--json", "Output valid JSON")
    .action((referenceParts: string[], options: CliJsonOption) => {
      try {
        const reference = referenceParts.join(" ");
        const parsed = parseReference(reference);
        const groups = xrefs(parsed.book, parsed.chapter, parsed.verses);

        if (options.json) {
          console.log(formatRecordsAsJson(groups));
          return;
        }

        console.log(formatXrefsText(groups));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
