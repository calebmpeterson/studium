import { describe, expect, it } from "vitest";

import { levenshteinDistance } from "./levenshteinDistance";

describe("levenshteinDistance", () => {
  it("returns zero for identical strings", () => {
    expect(levenshteinDistance("same", "same")).toBe(0);
  });

  it("returns expected edit distance", () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });
});
