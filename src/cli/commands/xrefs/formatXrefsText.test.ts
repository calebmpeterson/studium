import boxen from "boxen";
import { describe, expect, it } from "vitest";

import { formatXrefsText } from "./formatXrefsText";

describe("formatXrefsText", () => {
  it("formats grouped source verses with cross references", () => {
    const text = formatXrefsText([
      {
        reference: {
          book: "Genesis",
          chapter: 1,
          verse: 1,
        },
        text: "In the beginning God created the heaven and the earth.",
        xrefs: [
          {
            book: "John",
            chapter: 1,
            verse: 1,
            text: "In the beginning was the Word.",
          },
        ],
      },
    ]);

    expect(text).toBe(
      boxen(
        "Genesis 1:1\nIn the beginning God created the heaven and the earth.\n\nJohn 1:1\nIn the beginning was the Word.",
        {
          padding: { top: 0, right: 1, bottom: 0, left: 1 },
        }
      )
    );
  });

  it("formats a source verse with no cross references", () => {
    const text = formatXrefsText([
      {
        reference: {
          book: "1 Chronicles",
          chapter: 1,
          verse: 21,
        },
        text: "And Hadoram, and Uzal, and Diklah.",
        xrefs: [],
      },
    ]);

    expect(text).toBe(
      boxen("1 Chronicles 1:21\nAnd Hadoram, and Uzal, and Diklah.", {
        padding: { top: 0, right: 1, bottom: 0, left: 1 },
      })
    );
  });
});
