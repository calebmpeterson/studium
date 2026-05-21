import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SearchResultDisplay } from "./SearchResultDisplay";

describe("SearchResultDisplay", () => {
  it("renders top-right first-mention pill for first-mention results", () => {
    const html = renderToStaticMarkup(
      <SearchResultDisplay
        onClick={() => {}}
        result={{
          kind: "first-mention",
          word: "faith",
          verse: {
            reference: "Gen15:6",
            book: "Genesis",
            chapter: "15",
            verse: "6",
            text: "And he believed in the LORD; and he counted it to him for righteousness.",
          },
        }}
      />
    );

    expect(html).toContain("First mention: faith");
    expect(html).toContain("Genesis 15:6");
  });

  it("does not render first-mention pill for verse results", () => {
    const html = renderToStaticMarkup(
      <SearchResultDisplay
        onClick={() => {}}
        result={{
          kind: "verse",
          verse: {
            reference: "John3:16",
            book: "John",
            chapter: "3",
            verse: "16",
            text: "For God so loved the world...",
          },
        }}
      />
    );

    expect(html).not.toContain("First mention:");
    expect(html).toContain("John 3:16");
  });
});
