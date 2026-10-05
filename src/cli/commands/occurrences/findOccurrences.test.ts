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

  it("requires one non-empty term", () => {
    expect(() => findOccurrences("two words")).toThrow(
      "The occurrences command accepts a single term only."
    );
    expect(() => findOccurrences("  ")).toThrow("Term cannot be empty.");
  });
});
