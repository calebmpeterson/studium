import { Command, Option } from "commander";

import { formatRecordsAsJson } from "../../output/formatRecordsAsJson";
import { outputError } from "../../output/outputError";
import { CliJsonOption } from "../../types";

import { formatShowMarkdown } from "./formatShowMarkdown";
import { formatShowText } from "./formatShowText";
import { parseReference } from "./parseReference";
import { show } from "./show";

export const createShowCommand = (): Command =>
  new Command("show")
    .description("Show KJV verses for a reference")
    .argument("<reference...>", "Bible reference (single chapter only)")
    .addOption(new Option("--json", "Output valid JSON").conflicts("markdown"))
    .addOption(new Option("-m, --markdown", "Output Markdown").conflicts("json"))
    .addHelpText(
      "after",
      `
Reference formats:
  $ kjv show Genesis 1:1       Single verse
  $ kjv show Genesis 1:3-10    Verse range
  $ kjv show Genesis 1:3,4,7   Verse selection
  $ kjv show Genesis 1         Whole chapter
  $ kjv show 1 John 1:1        Multi-word book title

Book titles and abbreviations are case-insensitive. Use --json for JSON output or --markdown for Markdown output.
`
    )
    .action((referenceParts: string[], options: CliJsonOption & { markdown?: boolean }) => {
      try {
        const reference = referenceParts.join(" ");
        const parsed = parseReference(reference);
        const records = show(parsed.book, parsed.chapter, parsed.verses);

        if (options.json) {
          console.log(formatRecordsAsJson(records));
          return;
        }

        console.log(
          options.markdown
            ? formatShowMarkdown(records, parsed.verses)
            : formatShowText(records, parsed.verses),
        );
      } catch (error: unknown) {
        outputError(error);
        process.exitCode = 1;
      }
    });
