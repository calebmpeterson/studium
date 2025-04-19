import { parseFragment } from "./parseFragment";
import { serializeFragment } from "./serializeFragment";

export const removeFromFragment = (fragment: string, verse: number): string => {
  const verses = new Set(parseFragment(fragment));
  verses.delete(verse);
  return serializeFragment([...verses]);
};
