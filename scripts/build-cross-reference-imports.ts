import fs from "node:fs";

import slugify from "slugify";

const BOOK_ABBREVIATION_TO_TITLE = JSON.parse(
  fs.readFileSync(
    "./src/data/json/cross-references/appendices/book-abbreviation-to-title.json",
    "utf8"
  )
);

Object.values(BOOK_ABBREVIATION_TO_TITLE as Record<string, string>).forEach(
  (book: string) => {
    const key = slugify(book.toLowerCase());

    console.log(
      `"${key}": await import("./json/cross-references/${key}.json"),`
    );
  }
);
