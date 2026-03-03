import { describe, expect, it } from "vitest";

import { show } from "./show";

describe("show", () => {
  it("returns full chapter when verses are omitted", () => {
    const records = show("Genesis", 1);

    expect(records.length).toBe(31);
    expect(records[0]).toEqual({
      book: "Genesis",
      chapter: 1,
      verse: 1,
      text: expect.stringContaining("In the beginning"),
    });
  });

  it("returns normalized selected verses", () => {
    const records = show("ge", "1", ["7", "4", 4, 3, 5]);

    expect(records.map((record) => record.verse)).toEqual([3, 4, 5, 7]);
  });

  it("throws when selected verse is out of range", () => {
    expect(() => show("Genesis", 1, [999])).toThrow(
      "Verse selection is out of range for Genesis 1."
    );
  });
});
