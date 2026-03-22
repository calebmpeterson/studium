import { describe, expect, it, vi } from "vitest";

const {
  parseReferenceMock,
  xrefsMock,
  formatXrefsTextMock,
} = vi.hoisted(() => ({
  parseReferenceMock: vi.fn(),
  xrefsMock: vi.fn(),
  formatXrefsTextMock: vi.fn(),
}));

vi.mock("../show/parseReference", () => ({
  parseReference: parseReferenceMock,
}));

vi.mock("./xrefs", () => ({
  xrefs: xrefsMock,
}));

vi.mock("./formatXrefsText", () => ({
  formatXrefsText: formatXrefsTextMock,
}));

import { createXrefsCommand } from "./createXrefsCommand";

describe("createXrefsCommand", () => {
  it("concatenates multiple reference args before parsing", async () => {
    parseReferenceMock.mockReturnValue({
      book: "1 John",
      chapter: 1,
      verses: [1],
    });
    xrefsMock.mockReturnValue([
      {
        reference: {
          book: "1 John",
          chapter: 1,
          verse: 1,
        },
        text: "x",
        xrefs: [],
      },
    ]);
    formatXrefsTextMock.mockReturnValue("formatted");

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createXrefsCommand().parseAsync(["1", "John", "1:1"], {
      from: "user",
    });

    expect(parseReferenceMock).toHaveBeenCalledWith("1 John 1:1");
    expect(logSpy).toHaveBeenCalledWith("formatted");

    logSpy.mockRestore();
  });

  it("prints JSON when --json is passed", async () => {
    parseReferenceMock.mockReturnValue({
      book: "Genesis",
      chapter: 1,
      verses: [1],
    });
    xrefsMock.mockReturnValue([
      {
        reference: {
          book: "Genesis",
          chapter: 1,
          verse: 1,
        },
        text: "In the beginning...",
        xrefs: [],
      },
    ]);

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createXrefsCommand().parseAsync(["Genesis", "1:1", "--json"], {
      from: "user",
    });

    expect(logSpy).toHaveBeenCalledWith(
      JSON.stringify(
        [
          {
            reference: {
              book: "Genesis",
              chapter: 1,
              verse: 1,
            },
            text: "In the beginning...",
            xrefs: [],
          },
        ],
        null,
        2
      )
    );

    logSpy.mockRestore();
  });
});
