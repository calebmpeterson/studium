import { toLower } from "lodash";
import { useEffect, useState } from "react";
import slugify from "slugify";

import { CrossReferencesForBookAndChapter } from "@/types";

export const useCrossReferences = (book: string, chapter: string) => {
  const [crossReferences, setCrossReferences] =
    useState<CrossReferencesForBookAndChapter>({});

  useEffect(() => {
    setCrossReferences({});

    const load = async () => {
      try {
        const response = await fetch(
          `/api/cross-references?book=${slugify(
            toLower(book)
          )}&chapter=${chapter}`
        );
        const data =
          (await response.json()) as CrossReferencesForBookAndChapter;

        setCrossReferences(data);
      } catch (error: unknown) {
        console.error(
          `Failed to fetch cross references for ${book} ${chapter}`,
          error
        );
        setCrossReferences({});
      }
    };

    load();
  }, [book, chapter]);

  return crossReferences;
};
