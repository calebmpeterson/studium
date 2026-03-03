import { describe, expect, it } from "vitest";

import { buildBookLookup } from "./buildBookLookup";

describe("buildBookLookup", () => {
  it("contains full-title and abbreviation mappings", () => {
    const lookup = buildBookLookup();

    expect(lookup.get("genesis")).toBe("genesis");
    expect(lookup.get("ge")).toBe("genesis");
    expect(lookup.get("1-samuel")).toBe("1-samuel");
    expect(lookup.get("1sm")).toBe("1-samuel");
  });
});
