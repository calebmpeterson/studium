// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTableOfContents } from "@/data/getTableOfContents";

type Result = Record<string, string[]>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  res.status(200).json(getTableOfContents());
}
