import BOOK_ABBREVIATIONS_TO_TITLE from "../../../data/json/cross-references/appendices/book-abbreviation-to-title.json";
import { XrefRecord } from "../../types";

type ParsedCrossReferenceTuple = Omit<XrefRecord, "text">;

export const parseCrossReferenceTuple = (
  tuple: string
): ParsedCrossReferenceTuple => {
  const [bookAbbreviation, chapterText, verseText] = tuple.split(" ");
  const book = (BOOK_ABBREVIATIONS_TO_TITLE as Record<string, string>)[
    bookAbbreviation
  ];
  const chapter = parseInt(chapterText, 10);
  const verse = parseInt(verseText, 10);

  if (!book || !Number.isInteger(chapter) || !Number.isInteger(verse)) {
    throw new Error(`Invalid cross reference tuple: ${tuple}`);
  }

  return {
    book,
    chapter,
    verse,
  };
};
