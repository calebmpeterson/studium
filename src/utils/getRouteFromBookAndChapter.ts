import slugify from "slugify";

export const getRouteFromBookAndChapter = (
  book: string,
  chapter: string,
  verse?: string
) =>
  verse
    ? `/${slugify(book.toLowerCase())}/${chapter}#${verse}`
    : `/${slugify(book.toLowerCase())}/${chapter}`;
