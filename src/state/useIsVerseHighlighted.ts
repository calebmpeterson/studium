import { useEffect, useState } from "react";

import { isVerseInRange } from "@/utils/isVerseInRange";

export const useIsVerseHighlighted = (verse: string) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const verseRangeInUrl = location.hash.slice(1);
    const verseAsNumber = parseInt(verse, 10);
    setIsHighlighted(isVerseInRange(verseAsNumber, verseRangeInUrl));

    const onHashChange = () => {
      const verseInUrl = location.hash.slice(1);
      const verseAsNumber = parseInt(verse, 10);
      setIsHighlighted(isVerseInRange(verseAsNumber, verseInUrl));
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [verse]);

  return isHighlighted;
};
