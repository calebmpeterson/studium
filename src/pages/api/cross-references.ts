import type { NextApiRequest, NextApiResponse } from "next";
import { CrossReferencesForBookAndChapter } from "@/types";
import { get } from "lodash";
import { getCrossReferences } from "@/data/getCrossReferences";

type ErrorResult = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CrossReferencesForBookAndChapter | ErrorResult>
) {
  const { book, chapter } = req.query;

  try {
    const crossReferences = getCrossReferences(book, chapter);

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
