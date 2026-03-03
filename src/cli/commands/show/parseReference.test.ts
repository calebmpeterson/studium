import { describe, expect, it } from "vitest";

import { parseReference } from "./parseReference";

describe("parseReference", () => {
  it("parses chapter-only references", () => {
    expect(parseReference("Genesis 1")).toEqual({
      book: "Genesis",
      chapter: 1,
      verses: undefined,
    });
  });

  it("parses verse selections", () => {
    expect(parseReference("ge 1:7,4,3-5")).toEqual({
      book: "ge",
      chapter: 1,
      verses: [3, 4, 5, 7],
    });
  });

  it("rejects invalid reference format", () => {
    expect(() => parseReference("Genesis one")).toThrow(
      "Invalid reference: Genesis one"
    );
  });
});
