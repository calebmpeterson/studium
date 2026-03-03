import { describe, expect, it } from "vitest";

import { listBooks } from "./listBooks";

describe("listBooks", () => {
  it("returns comma-delimited book lines", () => {
    const lines = listBooks();

    expect(lines[0]).toBe("Genesis,Ge");
    expect(lines.length).toBeGreaterThan(60);
  });
});
