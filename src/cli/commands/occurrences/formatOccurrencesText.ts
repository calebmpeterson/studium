import { formatBook } from "../../output/formatBook";
import { formatVerse } from "../../output/formatVerse";
import { VerseRecord } from "../../types";

export const formatOccurrencesText = (records: VerseRecord[]): string => {
  if (records.length === 0) {
    throw new Error("Cannot format empty occurrence output.");
  }

  return records
    .map((record) =>
      [
        formatBook(`${record.book} ${record.chapter}:${record.verse}`),
        "",
        formatVerse(record.verse, record.text),
      ].join("\n")
    )
    .join("\n\n");
};
