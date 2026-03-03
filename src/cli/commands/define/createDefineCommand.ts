import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { formatShowText } from "../show/formatShowText";
import { CliJsonOption } from "../../types";

import { getFirstMentionRecord } from "./getFirstMentionRecord";

export const createDefineCommand = (): Command =>
  new Command("define")
    .description("Show the first mention record for a term")
    .argument("<term>", "Single word/term")
    .option("--json", "Output valid JSON")
    .action((term: string, options: CliJsonOption) => {
      try {
        const record = getFirstMentionRecord(term);

        if (options.json) {
          console.log(formatRecordsAsJson([record]));
          return;
        }

        console.log(formatShowText([record], [record.verse]));
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
