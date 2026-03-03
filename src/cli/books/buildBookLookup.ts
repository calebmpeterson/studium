import slugify from "slugify";

import { bookAbbreviations } from "../data/book-abbreviations";
import { kjvData } from "../data/kjv-data";

const normalize = (value: string): string =>
  slugify(value, { lower: true, strict: true });

export const buildBookLookup = (): Map<string, string> => {
  const lookup = new Map<string, string>();

  for (const [slug, data] of Object.entries(kjvData)) {
    lookup.set(normalize(slug), slug);
    lookup.set(normalize(data.title), slug);
  }

  for (const [book, abbreviation] of Object.entries(bookAbbreviations)) {
    const slug = normalize(book);

    lookup.set(normalize(book), slug);
    lookup.set(normalize(abbreviation), slug);
  }

  return lookup;
};
