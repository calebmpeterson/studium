import { describe, expect, it } from "vitest";

import { buildVerseSelectionLabel } from "./buildVerseSelectionLabel";

describe("buildVerseSelectionLabel", () => {
  it("compacts contiguous ranges", () => {
    expect(buildVerseSelectionLabel([1, 2, 3, 5, 7, 8])).toBe("1-3,5,7-8");
  });

  it("throws for empty input", () => {
    expect(() => buildVerseSelectionLabel([])).toThrow(
      "Cannot build verse label from empty verse selection."
    );
  });
});
