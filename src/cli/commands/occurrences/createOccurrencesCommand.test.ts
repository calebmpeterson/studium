import { describe, expect, it, vi } from "vitest";

const { findOccurrencesMock, formatOccurrencesTextMock } = vi.hoisted(() => ({
  findOccurrencesMock: vi.fn(),
  formatOccurrencesTextMock: vi.fn(),
}));

vi.mock("./findOccurrences", () => ({
  findOccurrences: findOccurrencesMock,
}));

vi.mock("./formatOccurrencesText", () => ({
  formatOccurrencesText: formatOccurrencesTextMock,
}));

import { createOccurrencesCommand } from "./createOccurrencesCommand";

describe("createOccurrencesCommand", () => {
  it("prints every result as JSON when --json is passed", async () => {
    const records = [{ book: "Genesis", chapter: 1, verse: 1, text: "In the beginning..." }];
    findOccurrencesMock.mockReturnValue(records);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createOccurrencesCommand().parseAsync(["beginning", "--json"], {
      from: "user",
    });

    expect(findOccurrencesMock).toHaveBeenCalledWith("beginning", undefined, undefined);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(records, null, 2));

    logSpy.mockRestore();
  });

  it("uses text formatting by default", async () => {
    const records = [{ book: "Genesis", chapter: 1, verse: 1, text: "In the beginning..." }];
    findOccurrencesMock.mockReturnValue(records);
    formatOccurrencesTextMock.mockReturnValue("formatted");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createOccurrencesCommand().parseAsync(["beginning"], { from: "user" });

    expect(formatOccurrencesTextMock).toHaveBeenCalledWith(records);
    expect(logSpy).toHaveBeenCalledWith("formatted");

    logSpy.mockRestore();
  });

  it("passes repeated category and book filters", async () => {
    const records = [{ book: "John", chapter: 1, verse: 1, text: "In the beginning..." }];
    findOccurrencesMock.mockReturnValue(records);
    formatOccurrencesTextMock.mockReturnValue("formatted");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createOccurrencesCommand().parseAsync(
      ["beginning", "-c", "Gospels", "--category", "Apocalyptic", "-b", "John", "--book", "Rev"],
      { from: "user" }
    );

    expect(findOccurrencesMock).toHaveBeenCalledWith(
      "beginning",
      ["Gospels", "Apocalyptic"],
      ["John", "Rev"]
    );

    logSpy.mockRestore();
  });
});
