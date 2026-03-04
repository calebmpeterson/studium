import { describe, expect, it } from "vitest";

import { listBooks } from "./listBooks";

describe("listBooks", () => {
  it("returns comma-delimited book lines", () => {
    const lines = listBooks();

    expect(lines[0]).toBe("Genesis,Ge");
    expect(lines.length).toBeGreaterThan(60);
  });

  it("filters by case-insensitive contains for title and abbreviation", () => {
    expect(listBooks("joHn")).toEqual([
      "John,John",
      "1 John,1Jn",
      "2 John,2Jn",
      "3 John,3Jn",
    ]);

    const tiResults = listBooks("ti");

    expect(tiResults.length).toBeGreaterThan(0);
    expect(
      tiResults.every((line) => {
        const [title, abbreviation] = line.split(",");

        return (
          title.toLowerCase().includes("ti") ||
          abbreviation.toLowerCase().includes("ti")
        );
      })
    ).toBe(true);
  });
});
