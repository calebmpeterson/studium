import { getVerse } from "./getVerse";

export const getVerseText = (
  book: unknown,
  chapter: unknown,
  verse: string
): string | undefined => {
  const data = getVerse(book, chapter, verse);
  return data?.text;
};
