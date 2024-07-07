import { isString, mapValues } from "lodash";
import slugify from "slugify";

import {
  CrossReference,
  CrossReferenceRecord,
  CrossReferencesForBookAndChapter,
} from "@/types";
import { slugifyReference } from "@/utils/slugifyReference";

import { getCrossReferenceRecords } from "./getCrossReferenceRecords";
import { getVerseText } from "./getVerseText";
import { parseVerseReferenceTuple } from "./parseVerseReferenceTuple";

type CrossReferencePair = [string, CrossReference[]];

const loadCrossReferenceRecords = async (
  book: string
): Promise<CrossReferenceRecord[]> => {
  const { default: records } = await import(
    `@/data/json/cross-references/${slugify(book)}`
  );

  return records;
};

const getCrossReferencesFromRecord = (
  record: CrossReferenceRecord
): CrossReference[] =>
  record.r.map((crossReferenceRecord) => {
    const crossReference = parseVerseReferenceTuple(crossReferenceRecord);

    return {
      ...crossReference,
      slug: slugifyReference(crossReference),
      text: getVerseText(
        crossReference.book,
        crossReference.chapter,
        crossReference.verse
      ),
    };
  });

export const getCrossReferences = async (
  book: unknown,
  chapter: unknown
): Promise<CrossReferencesForBookAndChapter> => {
  try {
    if (isString(book) && isString(chapter)) {
      const records = await getCrossReferenceRecords(book);

      const recordsForChapter = records.filter((record) => {
        const [, recordChapter] = record.v.split(" ");
        return chapter === recordChapter;
      });

      const recordPairs: CrossReferencePair[] = recordsForChapter.map(
        (record) => {
          const reference = parseVerseReferenceTuple(record.v);

          return [reference.verse, getCrossReferencesFromRecord(record)];
        }
      );

      return Object.fromEntries(recordPairs);
    } else {
      console.warn(`Invalid book/chapter provided`, { book, chapter });
      return {};
    }
  } catch (error: unknown) {
    console.error(
      `Failed to get cross references for ${book} ${chapter}`,
      error
    );
    return {};
  }
};
