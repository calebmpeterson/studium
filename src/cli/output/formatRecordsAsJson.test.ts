import { describe, expect, it } from "vitest";

import { formatRecordsAsJson } from "./formatRecordsAsJson";

describe("formatRecordsAsJson", () => {
  it("serializes records with pretty indentation", () => {
    const json = formatRecordsAsJson([
      { title: "Genesis", abbreviation: "Ge" },
      { title: "Exodus", abbreviation: "Exo" },
    ]);

    expect(json).toBe(`[
  {
    "title": "Genesis",
    "abbreviation": "Ge"
  },
  {
    "title": "Exodus",
    "abbreviation": "Exo"
  }
]`);
  });
});
