import slugify from "slugify";

import { buildBookLookup } from "./buildBookLookup";

const BOOK_LOOKUP = buildBookLookup();

const normalize = (value: string): string =>
  slugify(value, { lower: true, strict: true });

export const resolveBookTitle = (book: string): string => {
  const slug = BOOK_LOOKUP.get(normalize(book));

  if (!slug) {
    throw new Error(`Unknown book or abbreviation: ${book}`);
  }

  return slug;
};
