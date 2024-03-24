import { Verse, VerseReference } from "@/types";
import { isArray, isObject } from "lodash";
import { getVerse } from "./getVerse";

const isValidReference = (reference: unknown): reference is VerseReference =>
  isObject(reference) &&
  "book" in reference &&
  "chapter" in reference &&
  "verse" in reference;

export const normalizeVerseReferences = (verses: unknown): Verse[] => {
  if (isArray(verses)) {
    return verses
      .filter((reference) => isValidReference(reference))
      .map((reference) =>
        getVerse(reference.book, reference.chapter, reference.verse)
      )
      .filter(Boolean) as Verse[];
  }

  return [];
};
