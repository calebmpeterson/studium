import stem from "wink-porter2-stemmer";
import { firstMentionIndex } from "../../data/first-mention-index";
import { VerseRecord } from "../../types";

import { ensureSingleTerm } from "./ensureSingleTerm";
import { findClosestFirstMentionKey } from "./findClosestFirstMentionKey";

export const getFirstMentionRecord = (term: string): VerseRecord => {
  const singleTerm = ensureSingleTerm(term);
  const normalized = stem(singleTerm.toLowerCase());

  const keys = Object.keys(firstMentionIndex);
  const key =
    firstMentionIndex[normalized] === undefined
      ? findClosestFirstMentionKey(keys, normalized)
      : normalized;

  const match = firstMentionIndex[key];

  if (!match) {
    throw new Error(`No first mention found for term: ${term}`);
  }

  return {
    book: match.book,
    chapter: parseInt(match.chapter, 10),
    verse: parseInt(match.verse, 10),
    text: match.text,
  };
};
