import { get } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSemanticSearchResults } from "@/data/getSemanticSearchResults";
import { getFirstMentionSearchResults } from "@/data/getFirstMentionSearchResults";
import { getTextSearchResults } from "@/data/getTextSearchResults";

type Result = unknown;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { query, limit } = req.query;

  try {
    console.log(`Searching for "${query}"`);

    const [textResults, semanticResults, firstMentionResults] = await Promise.all([
      getTextSearchResults(query, { limit }),
      getSemanticSearchResults(query),
      getFirstMentionSearchResults(query, { limit: "5" }),
    ]);

    const results = [
      ...firstMentionResults.map((result) => ({
        kind: "first-mention" as const,
        word: result.word,
        verse: result.verse,
      })),
      ...semanticResults.map((result) => ({
        kind: "verse" as const,
        verse: result,
      })),
      ...textResults.map((result) => ({
        kind: "verse" as const,
        verse: result,
      })),
    ];

    res.status(200).json({ results });
  } catch (error: unknown) {
    res.status(500).json({
      message: get(error, "message", `Failed to query for ${query}`),
    });
  }
}
