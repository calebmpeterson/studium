import { describe, expect, it } from "vitest";

import { slugifyReference } from "./slugifyReference";

describe("slugifyReference", () => {
  it("creates a URL slug with chapter and verse", () => {
    expect(slugifyReference({ book: "1 Samuel", chapter: "17", verse: 4 })).toBe(
      "/1-samuel/17#4"
    );
  });

  it("omits verse when it is not provided", () => {
    expect(slugifyReference({ book: "Genesis", chapter: "1" })).toBe("/genesis/1");
  });
});
