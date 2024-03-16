import { isBrowser } from "@/utils/isBrowser";
import { useEffect, useState } from "react";

export const useIsVerseHighlighted = (verse: string) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const verseInUrl = location.hash.slice(1);
    setIsHighlighted(verse === verseInUrl);

    const onHashChange = () => {
      const verseInUrl = location.hash.slice(1);
      setIsHighlighted(verse === verseInUrl);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [verse]);

  return isHighlighted;
};
