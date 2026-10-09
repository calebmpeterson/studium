import { describe, expect, it } from "vitest";

import { findOccurrences } from "./findOccurrences";

describe("findOccurrences", () => {
  it("returns every case-insensitive whole-word match in canonical order", () => {
    const records = findOccurrences("BEGINNING");

    expect(records).toHaveLength(104);
    expect(records.slice(0, 2)).toEqual([
      expect.objectContaining({ book: "Genesis", chapter: 1, verse: 1 }),
      expect.objectContaining({ book: "Genesis", chapter: 10, verse: 10 }),
    ]);
    expect(records).toContainEqual(
      expect.objectContaining({ book: "John", chapter: 1, verse: 1 })
    );
  });

  it("does not match a term within another word", () => {
    expect(findOccurrences("beginn")).toEqual([]);
  });

  it("filters results by one or more case-insensitive categories", () => {
    const records = findOccurrences("beginning", ["gospels", "APOCALYPTIC"]);

    expect(records.length).toBeGreaterThan(0);
    expect(records.every(({ book }) => ["Matthew", "Mark", "Luke", "John", "Revelation"].includes(book))).toBe(true);
    expect(records).toContainEqual(
      expect.objectContaining({ book: "John", chapter: 1, verse: 1 })
    );
  });

  it("filters results by repeated full book names and abbreviations", () => {
    const records = findOccurrences("beginning", undefined, ["JOHN", "rev"]);

    expect(records.length).toBeGreaterThan(0);
    expect(records.every(({ book }) => ["John", "Revelation"].includes(book))).toBe(true);
  });

  it("intersects category and book filters", () => {
    const records = findOccurrences("beginning", ["Gospels"], ["John", "Revelation"]);

    expect(records.length).toBeGreaterThan(0);
    expect(records.every(({ book }) => book === "John")).toBe(true);
  });

  it("validates every category and book filter", () => {
    expect(() => findOccurrences("beginning", ["not a category"])).toThrow(
      "Unknown category: not a category"
    );
    expect(() => findOccurrences("beginning", undefined, ["not a book"])).toThrow(
      "Unknown book or abbreviation: not a book"
    );
  });

  it("requires one non-empty term", () => {
    expect(() => findOccurrences("two words")).toThrow(
      "The occurrences command accepts a single term only."
    );
    expect(() => findOccurrences("  ")).toThrow("Term cannot be empty.");
  });
});
