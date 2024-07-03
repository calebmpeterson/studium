import _ from "lodash";

import { VerseReference } from "./types";

export const parseVerseReference = (reference: string): VerseReference => {
  const [bookAndChapter, verse] = reference.split(":");
  const bookAndChapterParts = bookAndChapter.split(" ");

  // Example: Genesis 2
  if (bookAndChapterParts.length === 2) {
    return {
      type: "verse",
      book: bookAndChapterParts[0],
      chapter: bookAndChapterParts[1],
      verse,
    };
  }
  // Example 2 Timothy 1
  else if (bookAndChapterParts.length >= 3) {
    const book = bookAndChapterParts.slice(0, -1).join(" ");
    const chapter = _.last(bookAndChapterParts);
    return {
      type: "verse",
      book: bookAndChapterParts[0] + " " + bookAndChapterParts[1],
      chapter: bookAndChapterParts[2],
      verse,
    };
  }

  throw new Error(`Unhandled verse reference format: "${reference}`);
};
