import { firstMentionIndex } from "../../data/first-mention-index";
import { kjvData } from "../../data/kjv-data";
import { VerseRecord } from "../../types";

import { ensureSingleTerm } from "./ensureSingleTerm";
import { findClosestFirstMentionKey } from "./findClosestFirstMentionKey";

const bookOrder = new Map(
  Object.values(kjvData).map(({ title }, index) => [title, index] as const)
);

const findFirstMentionKeyByPrefix = (prefix: string): string | undefined => {
  const matches = Object.keys(firstMentionIndex).filter((key) =>
    key.startsWith(prefix)
  );

  return matches.reduce<string | undefined>((firstKey, key) => {
    if (!firstKey) {
      return key;
    }

    const first = firstMentionIndex[firstKey];
    const match = firstMentionIndex[key];
    const bookDifference =
      (bookOrder.get(match.book) ?? Infinity) -
      (bookOrder.get(first.book) ?? Infinity);

    if (bookDifference !== 0) {
      return bookDifference < 0 ? key : firstKey;
    }

    const chapterDifference =
      parseInt(match.chapter, 10) - parseInt(first.chapter, 10);

    if (chapterDifference !== 0) {
      return chapterDifference < 0 ? key : firstKey;
    }

    return parseInt(match.verse, 10) < parseInt(first.verse, 10)
      ? key
      : firstKey;
  }, undefined);
};

export const getFirstMentionRecord = (term: string): VerseRecord => {
  const singleTerm = ensureSingleTerm(term);
  const normalized = singleTerm.toLowerCase();
  const wildcardIndex = normalized.indexOf("*");

  if (wildcardIndex !== -1) {
    if (wildcardIndex !== normalized.length - 1) {
      throw new Error("The define command only supports a trailing * wildcard.");
    }

    const prefix = normalized.slice(0, -1);

    if (prefix.length === 0) {
      throw new Error("Wildcard prefix cannot be empty.");
    }

    const key = findFirstMentionKeyByPrefix(prefix);

    if (!key) {
      throw new Error(`No first mention found for prefix: ${prefix}`);
    }

    const match = firstMentionIndex[key];

    return {
      book: match.book,
      chapter: parseInt(match.chapter, 10),
      verse: parseInt(match.verse, 10),
      text: match.text,
    };
  }

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
