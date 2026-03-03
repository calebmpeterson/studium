import { describe, expect, it } from "vitest";

import { resolveBookTitle } from "./resolveBookTitle";

describe("resolveBookTitle", () => {
  it("resolves full names and abbreviations case-insensitively", () => {
    expect(resolveBookTitle("Genesis")).toBe("genesis");
    expect(resolveBookTitle("gE")).toBe("genesis");
  });

  it("throws for unknown books", () => {
    expect(() => resolveBookTitle("NotABook")).toThrow(
      "Unknown book or abbreviation: NotABook"
    );
  });
});
