import { TableOfContents } from "@/types";

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

export const getNextBookAndChapter = (
  tableOfContents: TableOfContents,
  book: string,
  chapter: string
): ReturnValue => {
  const chapterAsNumber = parseInt(chapter, 10);
  const nextChapter = chapterAsNumber + 1;
  const currentBook = tableOfContents[book];
  const booksAsArray = Object.keys(tableOfContents);
  const indexOfCurrentBook = booksAsArray.indexOf(book);

  if (nextChapter.toString() in currentBook) {
    return {
      book,
      chapter: nextChapter.toString(),
      label: `Read ${book} ${nextChapter}`,
    };
  }

  const nextBook = booksAsArray[indexOfCurrentBook + 1];
  if (nextBook) {
    const nextChapter = "1";
    return {
      book: booksAsArray[indexOfCurrentBook + 1],
      chapter: nextChapter,
      label: `Read ${nextBook} ${nextChapter}`,
    };
  }

  return {
    none: true,
    label: `${book} ${chapter} is the end`,
  };
};
