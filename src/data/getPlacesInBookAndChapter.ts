import { getBookAndChapter } from "@/data/getBookAndChapter";
import { Place } from "@/types";

import { getPlacesFromVerses } from "./getPlacesFromVerses";

type Result = [Place[], number];

export const getPlacesFromBookAndChapter = async (
  book: unknown,
  chapter: unknown
): Promise<Result> => {
  const [bookAndChapter, status] = getBookAndChapter(book, chapter);

  if ("verses" in bookAndChapter) {
    return getPlacesFromVerses(bookAndChapter.verses);
  }

  console.error(`Could not get verses for ${book} ${chapter}`);

  return [[], status];
};
