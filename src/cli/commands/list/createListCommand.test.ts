import { describe, expect, it, vi } from "vitest";

const { listBooksMock, listBookRecordsMock, formatRecordsAsJsonMock } =
  vi.hoisted(() => ({
    listBooksMock: vi.fn(),
    listBookRecordsMock: vi.fn(),
    formatRecordsAsJsonMock: vi.fn(),
  }));

vi.mock("./listBooks", () => ({
  listBooks: listBooksMock,
}));

vi.mock("./listBookRecords", () => ({
  listBookRecords: listBookRecordsMock,
}));

vi.mock("../../output/formatRecordsAsJson", () => ({
  formatRecordsAsJson: formatRecordsAsJsonMock,
}));

import { createListCommand } from "./createListCommand";

describe("createListCommand", () => {
  it("passes query to text listing", async () => {
    listBooksMock.mockReturnValue(["Genesis,Ge"]);

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createListCommand().parseAsync(["gen"], { from: "user" });

    expect(listBooksMock).toHaveBeenCalledWith("gen");
    expect(logSpy).toHaveBeenCalledWith("Genesis,Ge");

    logSpy.mockRestore();
  });

  it("passes query to json listing", async () => {
    listBookRecordsMock.mockReturnValue([
      { title: "Genesis", abbreviation: "Ge" },
    ]);
    formatRecordsAsJsonMock.mockReturnValue('[{"title":"Genesis","abbreviation":"Ge"}]');

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await createListCommand().parseAsync(["ge", "--json"], { from: "user" });

    expect(listBookRecordsMock).toHaveBeenCalledWith("ge");
    expect(logSpy).toHaveBeenCalledWith('[{"title":"Genesis","abbreviation":"Ge"}]');

    logSpy.mockRestore();
  });
});
