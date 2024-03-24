import { Verse } from "@/types";
import { getBookAndChapter } from "./getBookAndChapter";
import { isNumber, isString, toString } from "lodash";
import slugify from "slugify";

export const getVerse = (
  book: unknown,
  chapter: unknown,
  verse: string | number
): Verse | undefined => {
  if (isString(book) && (isString(chapter) || isNumber(chapter))) {
    const [bookAndChapter] = getBookAndChapter(
      slugify(book.toLowerCase()),
      toString(chapter)
    );

    if ("verses" in bookAndChapter) {
      const verseAsNumber = isString(verse) ? parseInt(verse, 10) : verse;

      if (isNumber(verseAsNumber)) {
        const verseIndex = verseAsNumber - 1;
        return bookAndChapter.verses[verseIndex];
      }
    }
  }
};
