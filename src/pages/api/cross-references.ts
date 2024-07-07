import { get } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

import { getCrossReferences } from "@/data/getCrossReferences";
import { CrossReferencesForBookAndChapter } from "@/types";

type ErrorResult = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CrossReferencesForBookAndChapter | ErrorResult>
) {
  const { book, chapter } = req.query;

  try {
    const crossReferences = await getCrossReferences(book, chapter);

    res.status(200).json(crossReferences);
  } catch (error: unknown) {
    res.status(500).json({
      message: get(
        error,
        "message",
        `Failed to fetch cross references for ${book} ${chapter}`
      ),
    });
  }
}
