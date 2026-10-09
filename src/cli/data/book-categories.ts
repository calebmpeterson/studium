import slugify from "slugify";

import BOOK_CATEGORIES from "../../data/json/categorized-books.json";

export type BookCategoryRecord = {
  testament: string;
  category: string;
  books: string[];
};

type BookCategories = Record<string, Record<string, string[]>>;

const normalize = (value: string): string =>
  slugify(value, { lower: true, strict: true });

export const formatCategoryLabel = ({
  category,
}: BookCategoryRecord): string => category;

export const bookCategories: BookCategoryRecord[] = Object.entries(
  BOOK_CATEGORIES as BookCategories
).flatMap(([testament, categories]) =>
  [
    {
      testament,
      category: testament,
      books: Object.values(categories).flat(),
    },
    ...Object.entries(categories).map(([category, books]) => ({
      testament,
      category,
      books,
    })),
  ]
);

const findCategoryMatches = (category: string): BookCategoryRecord[] => {
  const normalizedCategory = normalize(category);

  return bookCategories.filter(
    (record) => normalize(record.category) === normalizedCategory
  );
};

export const resolveBookCategories = (
  categories: string[]
): BookCategoryRecord[] =>
  categories.flatMap((category) => {
    const matches = findCategoryMatches(category);

    if (matches.length === 0) {
      throw new Error(`Unknown category: ${category}`);
    }

    return matches;
  });

export const resolveCategoryBooks = (categories: string[]): Set<string> =>
  new Set(resolveBookCategories(categories).flatMap(({ books }) => books));
