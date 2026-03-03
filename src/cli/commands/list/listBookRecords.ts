import { bookAbbreviations } from "../../data/book-abbreviations";
import { BookAbbreviationRecord } from "../../types";

export const listBookRecords = (): BookAbbreviationRecord[] =>
  Object.entries(bookAbbreviations).map(([title, abbreviation]) => ({
    title,
    abbreviation,
  }));
