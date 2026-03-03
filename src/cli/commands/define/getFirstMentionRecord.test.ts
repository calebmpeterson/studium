import { describe, expect, it } from "vitest";

import { getFirstMentionRecord } from "./getFirstMentionRecord";

describe("getFirstMentionRecord", () => {
  it("returns the indexed first mention for an exact term", () => {
    expect(getFirstMentionRecord("Aaron")).toEqual({
      book: "Exodus",
      chapter: 4,
      verse: 14,
      text: expect.stringContaining("Is not Aaron the Levite thy brother"),
    });
  });

  it("falls back to closest term by Levenshtein distance", () => {
    expect(getFirstMentionRecord("aaronitee")).toEqual({
      book: "1 Chronicles",
      chapter: 12,
      verse: 27,
      text: expect.stringContaining("Aaronites"),
    });
  });
});
