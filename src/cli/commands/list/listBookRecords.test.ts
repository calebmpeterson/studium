import { describe, expect, it } from "vitest";

import { listBookRecords } from "./listBookRecords";

describe("listBookRecords", () => {
  it("returns title/abbreviation records", () => {
    const records = listBookRecords();

    expect(records[0]).toEqual({ title: "Genesis", abbreviation: "Ge" });
    expect(records.length).toBeGreaterThan(60);
  });
});
