// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isError, isString } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

import { getBookAndChapter } from "@/data/getBookAndChapter";
import KJV from "@/data/json/kjv.json";
import { Verse } from "@/types";

type DataResult = {
  book: string;
  chapter: string;
  verses: Verse[];
};

type ErrorResult = {
  message: string;
};

type Result = DataResult | ErrorResult;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { book, chapter } = req.query;
  const [result, status] = getBookAndChapter(book, chapter);
  res.status(status).json(result);
}
