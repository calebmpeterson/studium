import { describe, expect, it } from "vitest";

import {
  bookCategories,
  formatCategoryLabel,
  resolveBookCategories,
  resolveCategoryBooks,
} from "./book-categories";

describe("bookCategories", () => {
  it("uses the web footer's category data in display order", () => {
    expect(bookCategories.slice(0, 3)).toEqual([
      expect.objectContaining({
        testament: "Old Testament",
        category: "Old Testament",
        books: expect.arrayContaining(["Genesis", "Malachi"]),
      }),
      expect.objectContaining({
        testament: "Old Testament",
        category: "Pentateuch",
        books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
      }),
      expect.objectContaining({
        testament: "Old Testament",
        category: "Historical",
      }),
    ]);
  });

  it("resolves categories case-insensitively", () => {
    expect(resolveCategoryBooks(["gOsPeLs"])).toEqual(
      new Set(["Matthew", "Mark", "Luke", "John"])
    );
  });

  it("combines duplicate category labels across Testaments", () => {
    expect(resolveBookCategories(["historical"])).toEqual([
      expect.objectContaining({
        testament: "Old Testament",
        category: "Historical",
      }),
      expect.objectContaining({
        testament: "New Testament",
        category: "Historical",
        books: ["Acts"],
      }),
    ]);
  });

  it("treats each Testament as a category", () => {
    const books = resolveCategoryBooks(["old testament"]);

    expect(books).toContain("Genesis");
    expect(books).toContain("Malachi");
    expect(books).not.toContain("Matthew");
  });

  it("reports unknown categories", () => {
    expect(() => resolveBookCategories(["Not a category"])).toThrow(
      "Unknown category: Not a category"
    );
  });

  it("unions books from repeated categories", () => {
    expect(resolveCategoryBooks(["Gospels", "Apocalyptic"])).toEqual(
      new Set(["Matthew", "Mark", "Luke", "John", "Revelation"])
    );
  });

  it("formats category labels without Testament prefixes", () => {
    expect(formatCategoryLabel(bookCategories[1])).toBe("Pentateuch");
  });
});
