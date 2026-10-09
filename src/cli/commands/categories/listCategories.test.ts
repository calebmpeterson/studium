import { describe, expect, it } from "vitest";

import { listCategories } from "./listCategories";

describe("listCategories", () => {
  it("lists Testaments and categories in footer order without prefixes", () => {
    expect(listCategories().slice(0, 3)).toEqual([
      expect.objectContaining({ label: "Old Testament" }),
      expect.objectContaining({ label: "Pentateuch" }),
      expect.objectContaining({ label: "Historical" }),
    ]);
  });
});
