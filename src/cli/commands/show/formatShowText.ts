import { formatBook } from "../../output/formatBook";
import { formatVerse } from "../../output/formatVerse";
import { VerseRecord } from "../../types";
import { buildVerseSelectionLabel } from "./buildVerseSelectionLabel";

export const formatShowText = (
  records: VerseRecord[],
  verses?: number[],
): string => {
  if (records.length === 0) {
    throw new Error("Cannot format empty verse output.");
  }

  const first = records[0];

  const header = verses
    ? `${first.book} ${first.chapter}:${buildVerseSelectionLabel(verses)}`
    : `${first.book} ${first.chapter}`;

  const lines = records.map((record) => formatVerse(record.verse, record.text));

  return `${formatBook(header)}\n\n${lines.join("\n\n")}`;
};
