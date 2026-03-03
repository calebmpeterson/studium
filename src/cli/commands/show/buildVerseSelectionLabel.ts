export const buildVerseSelectionLabel = (verses: number[]): string => {
  if (verses.length === 0) {
    throw new Error("Cannot build verse label from empty verse selection.");
  }

  const ranges: string[] = [];
  let start = verses[0];
  let previous = verses[0];

  for (let index = 1; index < verses.length; index += 1) {
    const current = verses[index];

    if (current === previous + 1) {
      previous = current;
      continue;
    }

    ranges.push(start === previous ? `${start}` : `${start}-${previous}`);
    start = current;
    previous = current;
  }

  ranges.push(start === previous ? `${start}` : `${start}-${previous}`);

  return ranges.join(",");
};
