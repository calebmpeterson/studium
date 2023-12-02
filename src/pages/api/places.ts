import type { NextApiRequest, NextApiResponse } from "next";
import { Verse } from "@/types";
import { getPlacesFromVerses } from "@/data/getPlacesFromVerses";
import { get } from "lodash";

type Result = unknown;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { book, chapter } = req.query;

  try {
    const verses: Verse[] = JSON.parse(req.body);

    console.log(
      `Identifying places in ${book} ${chapter} using ${verses.length}`
    );

    const [places, status] = await getPlacesFromVerses(verses);

    res.status(status).json(places);
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        message: get(
          error,
          "message",
          `Failed to fetch places for ${book} ${chapter}`
        ),
      });
  }
}
