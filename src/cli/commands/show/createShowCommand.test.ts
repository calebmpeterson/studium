import { describe, expect, it, vi } from "vitest";

const {
  parseReferenceMock,
  showMock,
  formatShowTextMock,
} = vi.hoisted(() => ({
  parseReferenceMock: vi.fn(),
  showMock: vi.fn(),
  formatShowTextMock: vi.fn(),
}));

vi.mock("./parseReference", () => ({
  parseReference: parseReferenceMock,
}));

vi.mock("./show", () => ({
  show: showMock,
}));

vi.mock("./formatShowText", () => ({
  formatShowText: formatShowTextMock,
}));

import { createShowCommand } from "./createShowCommand";

describe("createShowCommand", () => {
  it("concatenates multiple reference args before parsing", async () => {
    parseReferenceMock.mockReturnValue({
      book: "1 John",
      chapter: 1,
      verses: [1],
    });
    showMock.mockReturnValue([{ book: "1 John", chapter: 1, verse: 1, text: "x" }]);
    formatShowTextMock.mockReturnValue("formatted");

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createShowCommand().parseAsync(["1", "John", "1:1"], {
      from: "user",
    });

    expect(parseReferenceMock).toHaveBeenCalledWith("1 John 1:1");
    expect(logSpy).toHaveBeenCalledWith("formatted");

    logSpy.mockRestore();
  });
});

describe("show Markdown option", () => {
  it.each(["-m", "--markdown"])("formats output with %s", async (flag) => {
    parseReferenceMock.mockReturnValue({ book: "Genesis", chapter: 1, verses: [1] });
    showMock.mockReturnValue([{ book: "Genesis", chapter: 1, verse: 1, text: "In the beginning." }]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createShowCommand().parseAsync([flag, "Genesis", "1:1"], { from: "user" });

    expect(logSpy).toHaveBeenCalledWith("# Genesis 1:1\n\n**1** In the beginning.");
    logSpy.mockRestore();
  });

  it("rejects Markdown and JSON together", async () => {
    const command = createShowCommand().exitOverride().configureOutput({ writeErr: () => undefined });
    await expect(command.parseAsync(["Genesis", "1:1", "--json", "-m"], { from: "user" }))
      .rejects.toMatchObject({ code: "commander.conflictingOption" });
  });
});
