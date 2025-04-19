import { parseFragment } from "./parseFragment";
import { serializeFragment } from "./serializeFragment";

export const addToFragment = (fragment: string, verse: number): string => {
  const verses = new Set(parseFragment(fragment));
  verses.add(verse);
  return serializeFragment([...verses]);
};
