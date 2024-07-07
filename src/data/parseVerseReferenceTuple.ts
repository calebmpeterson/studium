import BOOK_ABBREVIATIONS_TO_TITLE from "@/data/json/cross-references/appendices/book-abbreviation-to-title.json";
import { VerseReference } from "@/types";

export const parseVerseReferenceTuple = (tuple: string): VerseReference => {
  const [bookAbbreviation, chapter, verse] = tuple.split(" ");

  const book = (BOOK_ABBREVIATIONS_TO_TITLE as Record<string, string>)[
    bookAbbreviation
  ];

  return {
    book,
    chapter,
    verse,
  };
};
