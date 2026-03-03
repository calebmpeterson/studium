import { bookAbbreviations } from "../../data/book-abbreviations";

export const listBooks = (): string[] =>
  Object.entries(bookAbbreviations).map(
    ([book, abbreviation]) => `${book},${abbreviation}`
  );
