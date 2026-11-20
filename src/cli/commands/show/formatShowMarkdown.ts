import { VerseRecord } from "../../types";
import { buildVerseSelectionLabel } from "./buildVerseSelectionLabel";

export const formatShowMarkdown = (
  records: VerseRecord[],
  verses?: number[],
): string => {
  if (records.length === 0) {
    throw new Error("Cannot format empty verse output.");
  }

  const first = records[0];
  const reference = verses
    ? `${first.book} ${first.chapter}:${buildVerseSelectionLabel(verses)}`
    : `${first.book} ${first.chapter}`;
  const lines = records.map((record) => `**${record.verse}** ${record.text}`);

  return `# ${reference}\n\n${lines.join("\n\n")}`;
};
