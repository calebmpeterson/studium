import { resolveBookTitle } from "../../books/resolveBookTitle";
import { resolveCategoryBooks } from "../../data/book-categories";
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

const resolveSelectedBooks = (books?: string[]): Set<string> | undefined =>
  books && books.length > 0
    ? new Set(books.map((book) => kjvData[resolveBookTitle(book)].title))
    : undefined;

export const findOccurrences = (
  term: string,
  categories?: string[],
  books?: string[]
): VerseRecord[] => {
  const singleTerm = ensureSingleTerm(term, "occurrences");
  const pattern = escapeForRegex(singleTerm);
  const matcher = new RegExp(`(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`, "iu");
  const categoryBooks =
    categories && categories.length > 0
      ? resolveCategoryBooks(categories)
      : undefined;
  const selectedBooks = resolveSelectedBooks(books);

  return allVerses()
    .filter(
      ({ book, text }) =>
        matcher.test(text) &&
        (!categoryBooks || categoryBooks.has(book)) &&
        (!selectedBooks || selectedBooks.has(book))
    )
    .map(mapVerseToRecord);
};
