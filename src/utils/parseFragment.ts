import { sortBy } from "lodash";

export const parseFragment = (fragment: string): number[] => {
  const result: Set<number> = new Set();
  if (!fragment) return [];
  fragment.split(",").forEach((part) => {
    const [start, end] = part.split("-").map(Number);
    if (!isNaN(start)) {
      if (!isNaN(end)) {
        for (let i = start; i <= end; i++) {
          result.add(i);
        }
      } else {
        result.add(start);
      }
    }
  });
  return sortBy([...result]);
};
