import { describe, expect, it } from "vitest";

import { listBookRecords } from "./listBookRecords";

describe("listBookRecords", () => {
  it("returns title/abbreviation records", () => {
    const records = listBookRecords();

    expect(records[0]).toEqual({ title: "Genesis", abbreviation: "Ge" });
    expect(records.length).toBeGreaterThan(60);
  });

  it("filters by case-insensitive title contains", () => {
    const records = listBookRecords("sOnG");

    expect(records).toHaveLength(1);
    expect(records[0]).toEqual({
      title: "Song of Solomon",
      abbreviation: "SSol",
    });
  });

  it("filters by case-insensitive abbreviation contains", () => {
    const records = listBookRecords("ph");

    expect(records.length).toBeGreaterThan(0);
    expect(records).toContainEqual({ title: "Ephesians", abbreviation: "Eph" });
    expect(
      records.every(
        ({ title, abbreviation }) =>
          title.toLowerCase().includes("ph") ||
          abbreviation.toLowerCase().includes("ph")
      )
    ).toBe(true);
  });
});
