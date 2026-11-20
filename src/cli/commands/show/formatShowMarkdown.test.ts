import { describe, expect, it } from "vitest";

import { formatShowMarkdown } from "./formatShowMarkdown";

const records = [
  { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning." },
  { book: "Genesis", chapter: 1, verse: 2, text: "And the earth." },
];

describe("formatShowMarkdown", () => {
  it("formats a chapter as Markdown", () => {
    expect(formatShowMarkdown(records)).toBe(
      "# Genesis 1\n\n**1** In the beginning.\n\n**2** And the earth.",
    );
  });

  it("formats a verse selection in the heading", () => {
    expect(formatShowMarkdown(records, [1, 2, 4])).toContain("# Genesis 1:1-2,4\n");
  });

  it("rejects empty output", () => {
    expect(() => formatShowMarkdown([])).toThrow("Cannot format empty verse output.");
  });
});
