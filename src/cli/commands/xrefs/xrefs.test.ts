import { describe, expect, it } from "vitest";

import { xrefs } from "./xrefs";

describe("xrefs", () => {
  it("returns one grouped result with source verse and cross references", () => {
    const groups = xrefs("Genesis", 1, [1]);

    expect(groups).toHaveLength(1);
    expect(groups[0]).toEqual(
      expect.objectContaining({
        reference: {
          book: "Genesis",
          chapter: 1,
          verse: 1,
        },
        text: expect.stringContaining("In the beginning"),
      })
    );
    expect(groups[0].xrefs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          book: "John",
          chapter: 1,
          verse: 1,
          text: expect.stringContaining("In the beginning was the Word"),
        }),
      ])
    );
  });

  it("returns results in ascending verse order with duplicates removed", () => {
    const groups = xrefs("Genesis", 1, [3, 1, 3, 2]);

    expect(groups.map((group) => group.reference.verse)).toEqual([1, 2, 3]);
  });

  it("returns an empty xref list when a source verse has no cross references", () => {
    const groups = xrefs("1 Chronicles", 1, [21]);

    expect(groups).toEqual([
      expect.objectContaining({
        reference: {
          book: "1 Chronicles",
          chapter: 1,
          verse: 21,
        },
        xrefs: [],
      }),
    ]);
  });

  it("throws when the selected verse is out of range", () => {
    expect(() => xrefs("Genesis", 1, [999])).toThrow(
      "Verse selection is out of range for Genesis 1."
    );
  });
});
