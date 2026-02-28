import { useEffect, useState } from "react";

import { VerseReference } from "@/types";
import { isVerseInRange } from "@/utils/isVerseInRange";
import { useVerseHighlighting } from "./useVerseHighlighting";

type HookResult = {
  isActive: boolean;
  highlight: boolean | string;
};

export const useIsVerseHighlighted = ({
  book,
  chapter,
  verse,
}: VerseReference): HookResult => {
  // Fragment-based highlighting
  const [isHighlightedByFragment, setIsHighlightedByFragment] =
    useState<boolean>(false);
  useEffect(() => {
    const verseRangeInUrl = location.hash.slice(1);
    const verseAsNumber = parseInt(verse, 10);
    setIsHighlightedByFragment(isVerseInRange(verseAsNumber, verseRangeInUrl));

    const onHashChange = () => {
      const verseInUrl = location.hash.slice(1);
      const verseAsNumber = parseInt(verse, 10);
      setIsHighlightedByFragment(isVerseInRange(verseAsNumber, verseInUrl));
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [verse]);

  // User-based highlighting
  const [isHighlighted] = useVerseHighlighting();
  const isHighlightedByUser = isHighlighted({ book, chapter, verse });
  if (isHighlightedByUser) {
    return {
      isActive: isHighlightedByFragment,
      highlight: isHighlightedByUser,
    };
  }

  // Fragment-based highlighting
  return {
    isActive: isHighlightedByFragment,
    highlight: isHighlightedByFragment ? "active" : false,
  };
};
