import useLocalStorageState from "use-local-storage-state";

import { VerseReference } from "@/types";
import { Highlights } from "@/types/annotations";
import { slugifyReference } from "@/utils/slugifyReference";

type IsHighlighted = (reference: VerseReference) => boolean | string;

type SetHighlighted = (reference: VerseReference, update: boolean) => void;

type HookResult = [IsHighlighted, SetHighlighted];

export const useVerseHighlighting = (): HookResult => {
  const [highlights, setHighlights] = useLocalStorageState<Highlights>(
    "highlights",
    { defaultValue: {} },
  );

  const isHighlighted = ({ book, chapter, verse }: VerseReference) =>
    highlights[slugifyReference({ book, chapter, verse })];

  const setHighlight = (reference: VerseReference, isHighlighted: boolean) => {
    setHighlights((currentHighlights): Highlights => {
      const slug = slugifyReference(reference);

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
