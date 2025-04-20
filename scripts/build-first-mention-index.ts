import fs from "node:fs";

import { isEmpty, isObject } from "lodash";
import { z } from "zod";

const VerseSchema = z.object({
  reference: z.string(),
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
  text: z.string(),
});

const ChapterSchema = z.record(z.string(), z.array(VerseSchema));
const BibleSchema = z.record(z.string(), ChapterSchema);

type Verse = z.infer<typeof VerseSchema>;
type Bible = z.infer<typeof BibleSchema>;
type FirstMentionByWord = Record<string, Verse>;

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "if",
  "in",
  "into",
  "is",
  "it",
  "no",
  "not",
  "of",
  "on",
  "or",
  "such",
  "that",
  "the",
  "their",
  "then",
  "there",
  "these",
  "they",
  "this",
  "to",
  "was",
  "will",
  "with",
  "he",
  "she",
  "his",
  "her",
  "you",
  "i",
  "we",
  "our",
  "yours",
  "them",
  "from",
  "up",
  "down",
  "over",
  "under",
]);

export const wordsByFirstMention = (bible: Bible): FirstMentionByWord => {
  const wordMap: FirstMentionByWord = {};
  const seen = new Set<string>();

  for (const book of Object.values(bible)) {
    for (const chapter of Object.values(book)) {
      if (!isObject(chapter)) {
        continue;
      }

      for (const verse of Object.values(chapter)) {
        const words = verse.text
          .toLowerCase()
          .replace(/'s/g, "")
          .replace(/[^\w\s]/g, "")
          .split(/\s+/);

        for (const word of words) {
          if (!seen.has(word) && !stopWords.has(word) && !isEmpty(word)) {
            seen.add(word);
            wordMap[word] = verse;
          }
        }
      }
    }
  }

  return wordMap;
};

const bible = JSON.parse(fs.readFileSync("./src/data/json/kjv.json", "utf8"));

const wordMap = wordsByFirstMention(bible);

// Sort the wordMap by keys
const sortedWordMap = Object.keys(wordMap)
  .sort()
  .reduce((acc, key) => {
    acc[key] = wordMap[key];
    return acc;
  }, {} as FirstMentionByWord);

fs.writeFileSync(
  "./src/data/json/kjv-first-mention-index.json",
  JSON.stringify(sortedWordMap, null, 2),
  "utf8"
);

console.log(
  `Indexed ${Object.keys(sortedWordMap).length} words for first mention`
);
