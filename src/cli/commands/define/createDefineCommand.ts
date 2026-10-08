import { Command } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { formatShowText } from "../show/formatShowText";
import { CliJsonOption } from "../../types";

import { getFirstMentionRecord } from "./getFirstMentionRecord";

export const createDefineCommand = (): Command =>
  new Command("define")
    .description("Show the first mention record for a term or trailing-* prefix")
    .argument("<term>", "Single word/term or prefix ending in *")
    .option("--json", "Output valid JSON")
    .addHelpText(
      "after",
      `
Examples:
  $ kjv define Aaron
  $ kjv define faith --json
  $ kjv define 'eye*'
`
    )
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
