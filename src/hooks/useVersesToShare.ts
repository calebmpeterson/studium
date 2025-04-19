import { useEffect, useMemo, useState } from "react";

import { Verse } from "@/types";
import { isBrowser } from "@/utils/isBrowser";
import { isVerseInRange } from "@/utils/isVerseInRange";

export const useVersesToShare = (verses: Verse[]) => {
  const [fragment, setFragment] = useState(
    isBrowser() ? location.hash.replace("#", "") : ""
  );
  useEffect(() => {
    const onHashChange = () => {
      setFragment(location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const versesToShare = useMemo(
    () =>
      verses.filter((verse) =>
        isVerseInRange(parseInt(verse.verse, 10), fragment)
      ),
    [verses, fragment]
  );

  return { versesToShare, fragment };
};
