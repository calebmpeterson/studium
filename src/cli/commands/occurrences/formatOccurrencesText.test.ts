import { describe, expect, it } from "vitest";

import { formatOccurrencesText } from "./formatOccurrencesText";

describe("formatOccurrencesText", () => {
  it("prints each matching verse with its complete reference", () => {
    expect(
      formatOccurrencesText([
        { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning..." },
        { book: "John", chapter: 1, verse: 1, text: "In the beginning..." },
      ])
    ).toBe(
      "Genesis 1:1\n\n1 In the beginning...\n\nJohn 1:1\n\n1 In the beginning..."
    );
  });

  it("rejects empty output", () => {
    expect(() => formatOccurrencesText([])).toThrow(
      "Cannot format empty occurrence output."
    );
  });
});
