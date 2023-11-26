// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import BOOKS from "@/data/json/books.json";

type Result = { books: string[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  res.status(200).json({ books: BOOKS });
}
