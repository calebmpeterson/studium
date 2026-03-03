import { describe, expect, it } from "vitest";

import { findClosestFirstMentionKey } from "./findClosestFirstMentionKey";

describe("findClosestFirstMentionKey", () => {
  it("returns the first key in a distance tie", () => {
    expect(findClosestFirstMentionKey(["cat", "bat", "rat"], "hat")).toBe(
      "cat"
    );
  });

  it("throws for empty key list", () => {
    expect(() => findClosestFirstMentionKey([], "test")).toThrow(
      "First mention index is empty."
    );
  });
});
