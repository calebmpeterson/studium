import type { NextApiRequest, NextApiResponse } from "next";

import { getTableOfContents } from "@/data/getTableOfContents";
import { TableOfContents } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TableOfContents>
) {
  res.status(200).json(getTableOfContents());
}
