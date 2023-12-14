import ABBREVIATIONS from "./json/book-abbreviations.json";

export const getBookAbbreviation = (book: string) =>
  (ABBREVIATIONS as Record<string, string>)[book] ?? book;
