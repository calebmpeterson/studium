import { describe, expect, it } from "vitest";

import { formatShowText } from "./formatShowText";

describe("formatShowText", () => {
  it("formats chapter output", () => {
    const text = formatShowText([
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning..." },
      {
        book: "Genesis",
        chapter: 1,
        verse: 2,
        text: "And the earth was without form...",
      },
    ]);

    expect(text).toEqual(expect.stringContaining("Genesis"));
    expect(text).toEqual(expect.stringContaining("In the beginning..."));
    expect(text).toEqual(
      expect.stringContaining("And the earth was without form..."),
    );
  });

  it("formats verse selection output", () => {
    const text = formatShowText(
      [{ book: "Genesis", chapter: 1, verse: 3, text: "Let there be light." }],
      [3],
    );

    expect(text).toBe("Genesis 1:3\n\n3 Let there be light.");
  });
});
