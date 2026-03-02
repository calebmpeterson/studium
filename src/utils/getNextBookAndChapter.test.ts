import { describe, expect, it } from "vitest";

import { getNextBookAndChapter } from "./getNextBookAndChapter";

describe("getNextBookAndChapter", () => {
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

  it("returns the next chapter when one exists in the same book", () => {
    expect(getNextBookAndChapter(tableOfContents, "Genesis", "1")).toEqual({
      hasNext: true,
      book: "Genesis",
      chapter: "2",
      label: "Read Genesis 2",
    });
  });

  it("moves to chapter 1 of the next book at end of current book", () => {
    expect(getNextBookAndChapter(tableOfContents, "Genesis", "2")).toEqual({
      hasNext: true,
      book: "Exodus",
      chapter: "1",
      label: "Read Exodus 1",
    });
  });

  it("returns the terminal state at the end of the last book", () => {
    expect(getNextBookAndChapter(tableOfContents, "Exodus", "3")).toEqual({
      hasNext: false,
      none: true,
      label: "Exodus 3 is the end",
    });
  });
});
