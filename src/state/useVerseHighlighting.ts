import useLocalStorageState from "use-local-storage-state";

import { VerseReference } from "@/types";
import { Highlights } from "@/types/annotations";

type IsHighlighted = (reference: VerseReference) => boolean | string;

type SetHighlighted = (reference: VerseReference, update: boolean) => void;

type HookResult = [IsHighlighted, SetHighlighted];

export const useVerseHighlighting = (): HookResult => {
  const [highlights, setHighlights] = useLocalStorageState<Highlights>(
    "highlights",
    { defaultValue: {} },
  );

  const isHighlighted = ({ book, chapter, verse }: VerseReference) =>
    highlights[`${book}/${chapter}#${verse}`];

  const setHighlight = (reference: VerseReference, isHighlighted: boolean) => {
    setHighlights((currentHighlights): Highlights => {
      const slug = `${reference.book}/${reference.chapter}#${reference.verse}`;

      if (isHighlighted) {
        return {
          ...currentHighlights,
          [slug]: "highlight-1",
        };
      }

      const { [slug]: _removed, ...remainingHighlights } = currentHighlights;

      return remainingHighlights;
    });
  };

  return [isHighlighted, setHighlight];
};
