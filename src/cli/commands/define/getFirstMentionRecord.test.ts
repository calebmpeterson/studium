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

  it("does not stem exact terms", () => {
    expect(getFirstMentionRecord("running")).toEqual({
      book: "Leviticus",
      chapter: 14,
      verse: 5,
      text: expect.stringContaining("running water"),
    });
  });

  it("falls back to the closest term by Levenshtein distance", () => {
    expect(getFirstMentionRecord("aaronitee")).toEqual({
      book: "1 Chronicles",
      chapter: 12,
      verse: 27,
      text: expect.stringContaining("Aaronites"),
    });
  });

  it("returns the earliest first mention for a trailing wildcard prefix", () => {
    expect(getFirstMentionRecord("EYE*")).toEqual({
      book: "Genesis",
      chapter: 3,
      verse: 5,
      text: expect.stringContaining("then your eyes shall be opened"),
    });
  });

  it("does not fall back to fuzzy matching for an unmatched wildcard prefix", () => {
    expect(() => getFirstMentionRecord("zzzzz*")).toThrow(
      "No first mention found for prefix: zzzzz"
    );
  });

  it("only accepts non-empty trailing wildcard prefixes", () => {
    expect(() => getFirstMentionRecord("*")).toThrow(
      "Wildcard prefix cannot be empty."
    );
    expect(() => getFirstMentionRecord("ey*e")).toThrow(
      "The define command only supports a trailing * wildcard."
    );
  });
});
