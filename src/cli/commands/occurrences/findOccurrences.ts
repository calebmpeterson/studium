import { kjvData } from "../../data/kjv-data";
import { RawVerseRecord, VerseRecord } from "../../types";
import { ensureSingleTerm } from "../define/ensureSingleTerm";
import { mapVerseToRecord } from "../show/mapVerseToRecord";

const escapeForRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const allVerses = (): RawVerseRecord[] =>
  Object.values(kjvData).flatMap((book) =>
    Object.values(book).flatMap((chapter) =>
      Array.isArray(chapter) ? (chapter as RawVerseRecord[]) : []
    )
  );

export const findOccurrences = (term: string): VerseRecord[] => {
  const singleTerm = ensureSingleTerm(term, "occurrences");
  const pattern = escapeForRegex(singleTerm);
  const matcher = new RegExp(`(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`, "iu");

  return allVerses()
    .filter(({ text }) => matcher.test(text))
    .map(mapVerseToRecord);
};
