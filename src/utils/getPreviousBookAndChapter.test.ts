import { describe, expect, it } from "vitest";

import { getPreviousBookAndChapter } from "./getPreviousBookAndChapter";

describe("getPreviousBookAndChapter", () => {
  const tableOfContents = {
    Genesis: {
      "1": "1",
      "2": "2",
    },
    Exodus: {
      "1": "1",
      "2": "2",
      "3": "3",
    },
  };

  it("returns the previous chapter when one exists in the same book", () => {
    expect(getPreviousBookAndChapter(tableOfContents, "Exodus", "2")).toEqual({
      hasPrevious: true,
      book: "Exodus",
      chapter: "1",
      label: "Read Exodus 1",
    });
  });

  it("moves to the last chapter of previous book at chapter 1", () => {
    expect(getPreviousBookAndChapter(tableOfContents, "Exodus", "1")).toEqual({
      hasPrevious: true,
      book: "Genesis",
      chapter: "2",
      label: "Read Genesis 2",
    });
  });

  it("returns the terminal state at the beginning of the first book", () => {
    expect(getPreviousBookAndChapter(tableOfContents, "Genesis", "1")).toEqual({
      hasPrevious: false,
      none: true,
      label: "Genesis 1 is the beginning",
    });
  });
});
