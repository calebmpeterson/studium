import Fuse, { FuseIndex } from "fuse.js";
import _, { isArray } from "lodash";
import KJV from "@/data/json/kjv.json";
import KJV_INDEX from "@/data/json/kjv-search-index.json";
import { normalizeQuery } from "./normalizeQuery";

type Options = {
  limit: string | string[] | undefined;
};

const DEFAULT_LIMIT = "50";

export const getTextSearchResults = (
  query: string | string[] | undefined,
  { limit = DEFAULT_LIMIT }: Options
) => {
  if (_.isUndefined(query)) {
    return [];
  }

  const normalizedQuery = normalizeQuery(query);
  const parsedLimit = parseInt(_.get(_.flatten([limit]), 0), 10);

  const allVerses = _.flatMap(KJV, (chapters) =>
    _.flatMap(chapters, (verses) => verses)
  ).filter(_.isObject);

  const kjvIndex = Fuse.parseIndex(KJV_INDEX);

  const fuse = new Fuse(
    allVerses,
    {
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 3,
      threshold: 0.33,
    },
    kjvIndex
  );

  const results = fuse.search(
    { text: normalizedQuery },
    { limit: parsedLimit }
  );

  return results;
};
