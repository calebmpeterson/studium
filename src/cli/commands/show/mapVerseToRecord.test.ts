import { describe, expect, it } from "vitest";

import { mapVerseToRecord } from "./mapVerseToRecord";

describe("mapVerseToRecord", () => {
  it("maps a raw verse into a typed verse record", () => {
    expect(
      mapVerseToRecord({
        book: "Genesis",
        chapter: "1",
        verse: "1",
        text: "In the beginning...",
      })
    ).toEqual({
      book: "Genesis",
      chapter: 1,
      verse: 1,
      text: "In the beginning...",
    });
  });
});
