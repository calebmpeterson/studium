import { describe, expect, it } from "vitest";

import { parseFragment } from "./parseFragment";

describe("parseFragment", () => {
  it("returns an empty array for an empty fragment", () => {
    expect(parseFragment("")).toEqual([]);
  });

  it("parses singles and ranges into sorted verse numbers", () => {
    expect(parseFragment("3,1-2,6-7")).toEqual([1, 2, 3, 6, 7]);
  });

  it("deduplicates overlapping or repeated values", () => {
    expect(parseFragment("1-3,2,3,3-4")).toEqual([1, 2, 3, 4]);
  });

  it("ignores invalid parts that do not start with a number", () => {
    expect(parseFragment("foo,2,bar-4")).toEqual([2]);
  });
});
