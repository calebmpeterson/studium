export const normalizeVerseSelection = (input: string): number[] => {
  const selections = input
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (selections.length === 0) {
    throw new Error("Verse selection cannot be empty.");
  }

  const verses = new Set<number>();

  for (const selection of selections) {
    const exactMatch = selection.match(/^\d+$/);
    if (exactMatch) {
      verses.add(parseInt(selection, 10));
      continue;
    }

    const rangeMatch = selection.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);

      if (start > end) {
        throw new Error(`Invalid verse range: ${selection}`);
      }

      for (let verse = start; verse <= end; verse += 1) {
        verses.add(verse);
      }

      continue;
    }

    throw new Error(`Invalid verse selection token: ${selection}`);
  }

  const normalized = Array.from(verses).sort((a, b) => a - b);

  if (normalized.some((verse) => verse <= 0)) {
    throw new Error("Verse numbers must be positive integers.");
  }

  return normalized;
};
