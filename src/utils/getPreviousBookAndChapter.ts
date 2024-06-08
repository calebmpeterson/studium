import { last } from "lodash";

import { TableOfContents } from "@/types";

type ReturnValue =
  | {
      hasPrevious: true;
      book: string;
      chapter: string;
      label: string;
    }
  | {
      hasPrevious: false;
      none: true;
      label: string;
    };

export const getPreviousBookAndChapter = (
  tableOfContents: TableOfContents,
  book: string,
  chapter: string
): ReturnValue => {
  const chapterAsNumber = parseInt(chapter, 10);
  const previousChapter = chapterAsNumber - 1;
  const currentBook = tableOfContents[book];
  const booksAsArray = Object.keys(tableOfContents);
  const indexOfCurrentBook = booksAsArray.indexOf(book);

  if (previousChapter.toString() in currentBook) {
    return {
      hasPrevious: true,
      book,
      chapter: previousChapter.toString(),
      label: `Read ${book} ${previousChapter}`,
    };
  }

  const previousBook = booksAsArray[indexOfCurrentBook - 1];
  if (previousBook) {
    const previousChapter = last(Object.keys(tableOfContents[previousBook]))!;
    return {
      hasPrevious: true,
      book: booksAsArray[indexOfCurrentBook - 1],
      chapter: previousChapter,
      label: `Read ${previousBook} ${previousChapter}`,
    };
  }

  return {
    hasPrevious: false,
    none: true,
    label: `${book} ${chapter} is the beginning`,
  };
};
