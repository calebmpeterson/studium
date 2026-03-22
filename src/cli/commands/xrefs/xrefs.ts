import { resolveBookTitle } from "../../books/resolveBookTitle";
import { crossReferenceData } from "../../data/cross-reference-data";
import { XrefGroup } from "../../types";
import { show } from "../show/show";

import { parseCrossReferenceTuple } from "./parseCrossReferenceTuple";

export const xrefs = (
  book: string,
  chapter: number,
  verses?: number[]
): XrefGroup[] => {
  const sourceRecords = show(book, chapter, verses);
  const sourceBookSlug = resolveBookTitle(book);
  const sourceCrossReferenceRecords = crossReferenceData[sourceBookSlug] ?? [];
  const sourceCrossReferenceMap = new Map<string, string[]>(
    sourceCrossReferenceRecords.map((record) => {
      const [, recordChapter, recordVerse] = record.v.split(" ");

      return [`${recordChapter}:${recordVerse}`, record.r];
    })
  );

  return sourceRecords.map((record) => {
    const tuples =
      sourceCrossReferenceMap.get(`${record.chapter}:${record.verse}`) ?? [];

    return {
      reference: {
        book: record.book,
        chapter: record.chapter,
        verse: record.verse,
      },
      text: record.text,
      xrefs: tuples.map((tuple) => {
        const crossReference = parseCrossReferenceTuple(tuple);
        const [crossReferenceRecord] = show(
          crossReference.book,
          crossReference.chapter,
          [crossReference.verse]
        );

        return {
          book: crossReferenceRecord.book,
          chapter: crossReferenceRecord.chapter,
          verse: crossReferenceRecord.verse,
          text: crossReferenceRecord.text,
        };
      }),
    };
  });
};
