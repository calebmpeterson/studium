import { resolveBookTitle } from "../../books/resolveBookTitle";
import { kjvData } from "../../data/kjv-data";
import { RawVerseRecord, VerseRecord } from "../../types";

import { mapVerseToRecord } from "./mapVerseToRecord";

export function show(
  book: string,
  chapter: string | number,
  verses?: Array<string | number>
): VerseRecord[] {
  const slug = resolveBookTitle(book);
  const chapterNumber =
    typeof chapter === "string" ? parseInt(chapter, 10) : chapter;

  if (!Number.isInteger(chapterNumber) || chapterNumber <= 0) {
    throw new Error(`Invalid chapter: ${chapter}`);
  }

  const chapterKey = `${chapterNumber}`;
  const chapterData = kjvData[slug]?.[chapterKey];

  if (!Array.isArray(chapterData)) {
    throw new Error(`Chapter not found: ${book} ${chapterNumber}`);
  }

  const records = chapterData.map((entry) =>
    mapVerseToRecord(entry as RawVerseRecord)
  );

  if (!verses) {
    return records;
  }

  const normalizedVerses = Array.from(
    new Set(
      verses.map((verse) =>
        typeof verse === "string" ? parseInt(verse, 10) : verse
      )
    )
  )
    .filter((verse) => Number.isInteger(verse) && verse > 0)
    .sort((a, b) => a - b);

  if (normalizedVerses.length === 0) {
    throw new Error("No valid verse numbers were provided.");
  }

  const maxVerse = records.length;

  if (normalizedVerses.some((verse) => verse > maxVerse)) {
    throw new Error(
      `Verse selection is out of range for ${records[0]?.book ?? book} ${chapterNumber}.`
    );
  }

  const selected = records.filter((record) =>
    normalizedVerses.includes(record.verse)
  );

  if (selected.length === 0) {
    throw new Error(`No verses found for ${book} ${chapterNumber}.`);
  }

  return selected;
}
