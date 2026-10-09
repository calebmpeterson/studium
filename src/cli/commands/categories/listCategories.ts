import {
  bookCategories,
  formatCategoryLabel,
} from "../../data/book-categories";

export type ListedCategory = (typeof bookCategories)[number] & { label: string };

export const listCategories = (): ListedCategory[] =>
  bookCategories.map((category) => ({
    ...category,
    label: formatCategoryLabel(category),
  }));
