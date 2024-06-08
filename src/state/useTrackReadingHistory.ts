import { first, isEqual } from "lodash";
import { useEffect } from "react";

import { useReadingHistory } from "./useReadingHistory";

export const useTrackReadingHistory = (
  currentBook: string,
  currentChapter: string
) => {
  const [, setReadingHistory] = useReadingHistory();

  useEffect(() => {
    const entryForCurrentBookAndChapter = {
      book: currentBook,
      chapter: currentChapter,
    };

    setReadingHistory((history) =>
      isEqual(entryForCurrentBookAndChapter, first(history))
        ? history
        : [entryForCurrentBookAndChapter, ...history]
    );
  }, [currentBook, currentChapter, setReadingHistory]);
};
