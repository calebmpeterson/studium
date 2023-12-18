import { Verse } from "@/types";
import { getBookAndChapter } from "./getBookAndChapter";
import { isNumber, isString } from "lodash";
import slugify from "slugify";

export const getVerse = (
  book: unknown,
  chapter: unknown,
  verse: string
): Verse | undefined => {
  if (isString(book) && isString(chapter)) {
    const [bookAndChapter] = getBookAndChapter(
      slugify(book.toLowerCase()),
      chapter
    );

    if ("verses" in bookAndChapter) {
      const verseAsNumber = parseInt(verse, 10);

      if (isNumber(verseAsNumber)) {
        const verseIndex = verseAsNumber - 1;
        return bookAndChapter.verses[verseIndex];
      }
    }
  }
};
