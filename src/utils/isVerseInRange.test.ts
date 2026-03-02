import { describe, expect, it } from "vitest";

import { isVerseInRange } from "./isVerseInRange";

describe("isVerseInRange", () => {
  it("matches a single verse number", () => {
    expect(isVerseInRange(5, "5")).toBe(true);
  });

  it("matches a verse inside a hyphenated range", () => {
    expect(isVerseInRange(7, "5-9")).toBe(true);
  });

  it("matches any range in a comma-separated set", () => {
    expect(isVerseInRange(12, "1-3,8,10-15")).toBe(true);
  });

  it("returns false when the verse is outside all ranges", () => {
    expect(isVerseInRange(4, "1-3,8,10-15")).toBe(false);
  });
});
