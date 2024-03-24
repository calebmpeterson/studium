import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";
import { getSemanticSearchResults } from "@/data/getSemanticSearchResults";

type Result = unknown;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { query } = req.query;

  try {
    console.log(`Semantically searching for "${query}"`);

    const results = await getSemanticSearchResults(query);

    res.status(200).json({ results });
  } catch (error: unknown) {
    res.status(500).json({
      message: get(error, "message", `Failed to query for ${query}`),
    });
  }
}
