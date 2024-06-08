import { isError, isString } from "lodash";

import KJV from "@/data/json/kjv.json";
import { Verse } from "@/types";

type DataResult = {
  book: string;
  chapter: string;
  verses: Verse[];
};

type ErrorResult = {
  message: string;
};

type Result = DataResult | ErrorResult;

type ReturnValue = [Result, number];

export const getBookAndChapter = (
  book: unknown,
  chapter: unknown
): ReturnValue => {
  try {
    if (isString(book) && isString(chapter)) {
      // @ts-expect-error KJV data is not typed
      const { title } = KJV[book];
      // @ts-expect-error KJV data is not typed
      const verses = KJV[book][chapter] as Verse[];

      return [{ book: title, chapter, verses }, 200];
    } else {
      return [{ message: "Invalid book or chapter" }, 400];
    }
  } catch (error: unknown) {
    if (isError(error)) {
      return [{ message: error.message }, 500];
    } else {
      return [{ message: "Unknown error" }, 500];
    }
  }
};
