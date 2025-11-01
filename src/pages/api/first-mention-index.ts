import { get } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

import { getFirstMentionIndex } from "@/data/getFirstMentionIndex";
import { FirstMentionIndex } from "@/schemas/first-mention-index";

type ErrorResult = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FirstMentionIndex | ErrorResult>
) {
  try {
    const entries = getFirstMentionIndex();

    res.status(200).json(entries);
  } catch (error: unknown) {
    res.status(500).json({
      message: get(error, "message", `Failed to fetch first mentions index`),
    });
  }
}
