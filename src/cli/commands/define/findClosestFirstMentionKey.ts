import { levenshteinDistance } from "./levenshteinDistance";

export const findClosestFirstMentionKey = (
  keys: string[],
  query: string,
): string => {
  if (keys.length === 0) {
    throw new Error("First mention index is empty.");
  }

  let closest = keys[0];
  let closestDistance = levenshteinDistance(query, closest);

  for (let index = 1; index < keys.length; index += 1) {
    const key = keys[index];
    const distance = levenshteinDistance(query, key);

    if (distance < closestDistance) {
      closest = key;
      closestDistance = distance;
    }
  }

  return closest;
};
