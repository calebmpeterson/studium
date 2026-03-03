import { ParsedReference } from "../../types";

import { normalizeVerseSelection } from "./normalizeVerseSelection";

const REFERENCE_PATTERN = /^(.+?)\s+(\d+)(?::([0-9,\-\s]+))?$/;

export const parseReference = (reference: string): ParsedReference => {
  const trimmedReference = reference.trim();
  const match = trimmedReference.match(REFERENCE_PATTERN);

  if (!match) {
    throw new Error(`Invalid reference: ${reference}`);
  }

  const book = match[1];
  const chapterText = match[2];
  const versesText = match[3];
  const chapter = parseInt(chapterText, 10);

  if (chapter <= 0) {
    throw new Error(`Invalid chapter number: ${chapterText}`);
  }

  return {
    book: book.trim(),
    chapter,
    verses: versesText ? normalizeVerseSelection(versesText) : undefined,
  };
};
