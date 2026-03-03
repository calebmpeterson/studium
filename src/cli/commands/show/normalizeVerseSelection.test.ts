import { describe, expect, it } from "vitest";

import { normalizeVerseSelection } from "./normalizeVerseSelection";

describe("normalizeVerseSelection", () => {
  it("normalizes, sorts, and deduplicates numbers and ranges", () => {
    expect(normalizeVerseSelection("7,4,4,3-5")).toEqual([3, 4, 5, 7]);
  });

  it("throws for invalid token", () => {
    expect(() => normalizeVerseSelection("1,abc")).toThrow(
      "Invalid verse selection token: abc"
    );
  });
});
