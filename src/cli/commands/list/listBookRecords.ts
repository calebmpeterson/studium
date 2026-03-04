import { bookAbbreviations } from "../../data/book-abbreviations";
import { BookAbbreviationRecord } from "../../types";

const includesQuery = (title: string, abbreviation: string, query?: string): boolean => {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();

  return (
    title.toLowerCase().includes(normalizedQuery) ||
    abbreviation.toLowerCase().includes(normalizedQuery)
  );
};

export const listBookRecords = (query?: string): BookAbbreviationRecord[] =>
  Object.entries(bookAbbreviations)
    .map(([title, abbreviation]) => ({
      title,
      abbreviation,
    }))
    .filter(({ title, abbreviation }) =>
      includesQuery(title, abbreviation, query)
    );
