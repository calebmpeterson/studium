import CROSS_REFERENCES from "@/data/json/cross-references.json";
import {
  CrossReferences,
  CrossReferencesForBookAndChapter,
  Verse,
} from "@/types";
import { slugifyReference } from "@/utils/slugifyReference";
import { isError, isString } from "lodash";

export const getCrossReferences = (
  book: unknown,
  chapter: unknown
): CrossReferencesForBookAndChapter => {
  try {
    if (isString(book) && isString(chapter)) {
      const slug = slugifyReference({ book, chapter });

      const crossReferences = (CROSS_REFERENCES as CrossReferences)[slug];

      return crossReferences;
    } else {
      console.warn(`Invalid book/chapter provided`, { book, chapter });
      return {};
    }
  } catch (error: unknown) {
    console.error(`Failed to get cross references for ${book} ${chapter}`);
    return {};
  }
};
