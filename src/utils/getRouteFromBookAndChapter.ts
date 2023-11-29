import slugify from "slugify";

export const getRouteFromBookAndChapter = (book: string, chapter: string) =>
  `/${slugify(book.toLowerCase())}/${chapter}`;
