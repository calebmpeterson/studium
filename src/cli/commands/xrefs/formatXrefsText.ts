import boxen from "boxen";

import { formatBook } from "../../output/formatBook";
import { XrefGroup } from "../../types";

const formatReference = (book: string, chapter: number, verse: number): string =>
  formatBook(`${book} ${chapter}:${verse}`);

export const formatXrefsText = (groups: XrefGroup[]): string => {
  if (groups.length === 0) {
    throw new Error("Cannot format empty cross reference output.");
  }

  return groups
    .map((group) => {
      const lines = [
        formatReference(
          group.reference.book,
          group.reference.chapter,
          group.reference.verse
        ),
        group.text,
      ];

      for (const xref of group.xrefs) {
        lines.push("", formatReference(xref.book, xref.chapter, xref.verse), xref.text);
      }

      return boxen(lines.join("\n"), {
        padding: { top: 0, right: 1, bottom: 0, left: 1 },
      });
    })
    .join("\n\n");
};
