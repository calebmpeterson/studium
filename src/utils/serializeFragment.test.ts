import { describe, expect, it } from "vitest";

import { serializeFragment } from "./serializeFragment";

describe("serializeFragment", () => {
  it("returns an empty string for no verses", () => {
    expect(serializeFragment([])).toBe("");
  });

  it("sorts and serializes mixed values into ranges", () => {
    expect(serializeFragment([7, 2, 1, 3, 10])).toBe("1-3,7,10");
  });

  it("serializes a single contiguous range", () => {
    expect(serializeFragment([4, 5, 6])).toBe("4-6");
  });
});
