import { TableOfContents } from "@/types";
import { last } from "lodash";

type ReturnValue =
  | {
      book: string;
      chapter: string;
      label: string;
    }
  | {
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
      book,
      chapter: previousChapter.toString(),
      label: `Read ${book} ${previousChapter}`,
    };
  }

  const previousBook = booksAsArray[indexOfCurrentBook - 1];
  if (previousBook) {
    const previousChapter = last(Object.keys(tableOfContents[previousBook]))!;
    return {
      book: booksAsArray[indexOfCurrentBook - 1],
      chapter: previousChapter,
      label: `Read ${previousBook} ${previousChapter}`,
    };
  }

  return {
    none: true,
    label: `${book} ${chapter} is the beginning`,
  };
};
