import type { NextApiRequest, NextApiResponse } from "next";
import { getPlacesFromBookAndChapter } from "@/data/getPlacesInBookAndChapter";

type Result = unknown;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { book, chapter } = req.query;
  const [places, status] = await getPlacesFromBookAndChapter(book, chapter);
  res.status(status).json(places);
}
