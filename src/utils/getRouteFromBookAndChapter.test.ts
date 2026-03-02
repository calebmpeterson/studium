import { describe, expect, it } from "vitest";

import { getRouteFromBookAndChapter } from "./getRouteFromBookAndChapter";

describe("getRouteFromBookAndChapter", () => {
  it("builds a route without verse when verse is omitted", () => {
    expect(getRouteFromBookAndChapter("Genesis", "1")).toBe("/genesis/1");
  });

  it("builds a route with verse hash when verse is provided", () => {
    expect(getRouteFromBookAndChapter("Genesis", "1", "3")).toBe("/genesis/1#3");
  });

  it("slugifies and lowercases book names with spaces", () => {
    expect(getRouteFromBookAndChapter("1 Samuel", "17", "4")).toBe(
      "/1-samuel/17#4"
    );
  });
});
