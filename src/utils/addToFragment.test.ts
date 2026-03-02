import { describe, expect, it } from "vitest";

import { addToFragment } from "./addToFragment";

describe("addToFragment", () => {
  it("adds a verse to an empty fragment", () => {
    expect(addToFragment("", 4)).toBe("4");
  });

  it("adds and merges into a continuous range when adjacent", () => {
    expect(addToFragment("1-2,4", 3)).toBe("1-4");
  });

  it("does not duplicate an existing verse", () => {
    expect(addToFragment("1-3", 2)).toBe("1-3");
  });
});
