import { RawVerseRecord, VerseRecord } from "../../types";

export const mapVerseToRecord = (verse: RawVerseRecord): VerseRecord => ({
  book: verse.book,
  chapter: parseInt(verse.chapter, 10),
  verse: parseInt(verse.verse, 10),
  text: verse.text,
});
