import { describe, expect, it, vi } from "vitest";

const { listCategoriesMock } = vi.hoisted(() => ({
  listCategoriesMock: vi.fn(),
}));

vi.mock("./listCategories", () => ({
  listCategories: listCategoriesMock,
}));

import { createCategoriesCommand } from "./createCategoriesCommand";

describe("createCategoriesCommand", () => {
  const categories = [
    {
      testament: "New Testament",
      category: "Gospels",
      books: ["Matthew", "Mark", "Luke", "John"],
      label: "Gospels",
    },
  ];

  it("prints category labels by default", async () => {
    listCategoriesMock.mockReturnValue(categories);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createCategoriesCommand().parseAsync([], { from: "user" });

    expect(logSpy).toHaveBeenCalledWith("Gospels");
    logSpy.mockRestore();
  });

  it("prints category records as JSON", async () => {
    listCategoriesMock.mockReturnValue(categories);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createCategoriesCommand().parseAsync(["--json"], { from: "user" });

    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(categories, null, 2));
    logSpy.mockRestore();
  });
});
