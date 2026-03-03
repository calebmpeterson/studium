import { describe, expect, it } from "vitest";

import { ensureSingleTerm } from "./ensureSingleTerm";

describe("ensureSingleTerm", () => {
  it("trims valid terms", () => {
    expect(ensureSingleTerm("  faith  ")).toBe("faith");
  });

  it("throws for empty term", () => {
    expect(() => ensureSingleTerm("   ")).toThrow("Term cannot be empty.");
  });

  it("throws for multi-word term", () => {
    expect(() => ensureSingleTerm("two words")).toThrow(
      "The define command accepts a single term only."
    );
  });
});
