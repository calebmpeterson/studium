import { describe, expect, it } from "vitest";

import { removeFromFragment } from "./removeFromFragment";

describe("removeFromFragment", () => {
  it("removes a verse from the middle of a range and splits it", () => {
    expect(removeFromFragment("1-5", 3)).toBe("1-2,4-5");
  });

  it("returns the same fragment when the verse does not exist", () => {
    expect(removeFromFragment("1-2,4-5", 3)).toBe("1-2,4-5");
  });

  it("returns an empty string when removing the only verse", () => {
    expect(removeFromFragment("7", 7)).toBe("");
  });
});
