import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";
import { getTextSearchResults } from "@/data/getTextSearchResults";
import { getSemanticSearchResults } from "@/data/getSemanticSearchResults";

type Result = unknown;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { query, limit } = req.query;

  try {
    console.log(`Searching for "${query}"`);

    const [textResults, semanticResults] = await Promise.all([
      getTextSearchResults(query, { limit }),
      getSemanticSearchResults(query),
    ]);

    const results = [...semanticResults, ...textResults];

    res.status(200).json({ results });
  } catch (error: unknown) {
    res.status(500).json({
      message: get(error, "message", `Failed to query for ${query}`),
    });
  }
}
