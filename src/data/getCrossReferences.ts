import { isString, mapValues } from "lodash";

import CROSS_REFERENCES from "@/data/json/cross-references.json";
import { CrossReferences, CrossReferencesForBookAndChapter } from "@/types";
import { slugifyReference } from "@/utils/slugifyReference";

import { getVerseText } from "./getVerseText";

export const getCrossReferences = (
  book: unknown,
  chapter: unknown
): CrossReferencesForBookAndChapter => {
  try {
    if (isString(book) && isString(chapter)) {
      const slug = slugifyReference({ book, chapter });

      const crossReferences = (CROSS_REFERENCES as CrossReferences)[slug];

      return mapValues(crossReferences, (crossReferencesForVerse) =>
        crossReferencesForVerse.map((crossReference) => ({
          ...crossReference,
          text: getVerseText(
            crossReference.book,
            crossReference.chapter,
            crossReference.verse
          ),
        }))
      );
    } else {
      console.warn(`Invalid book/chapter provided`, { book, chapter });
      return {};
    }
  } catch (error: unknown) {
    console.error(`Failed to get cross references for ${book} ${chapter}`);
    return {};
  }
};
