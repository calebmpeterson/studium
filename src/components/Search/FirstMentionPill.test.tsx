import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FirstMentionPill } from "./FirstMentionPill";

describe("FirstMentionPill", () => {
  it("renders first mention text with provided word", () => {
    const html = renderToStaticMarkup(<FirstMentionPill word="love" />);

    expect(html).toContain("First mention: love");
  });
});
