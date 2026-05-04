import { flatten, isUndefined, keys, take } from "lodash";

import { getFirstMentionIndex } from "@/data/getFirstMentionIndex";
import { Verse } from "@/types";
import { stemWord } from "@/utils/stemWord";

import { normalizeQuery } from "./normalizeQuery";

type Options = {
  limit: string | string[] | undefined;
};

type Result = {
  word: string;
  verse: Verse;
};

const DEFAULT_LIMIT = "5";

export const getFirstMentionSearchResults = (
  query: string | string[] | undefined,
  { limit = DEFAULT_LIMIT }: Options
): Result[] => {
  if (isUndefined(query)) {
    return [];
  }

  const normalizedQuery = normalizeQuery(query);
  if (normalizedQuery.length === 0) {
    return [];
  }

  const index = getFirstMentionIndex();
  const queryWords = normalizedQuery.split(" ").map(stemWord);
  const parsedLimit = parseInt(flatten([limit])[0] ?? DEFAULT_LIMIT, 10);

  const matchingKeys = keys(index).filter((key) =>
    queryWords.some((word) => key.includes(word))
  );

  return take(matchingKeys, parsedLimit).map((word) => ({
    word,
    verse: index[word],
  }));
};
