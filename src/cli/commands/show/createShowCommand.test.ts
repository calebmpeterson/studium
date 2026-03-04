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
