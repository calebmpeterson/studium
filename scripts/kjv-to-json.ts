import * as fs from "fs";
import _, { groupBy } from "lodash";
import { BOOK_TITLES } from "./kjv-book-titles";
import slugify from "slugify";

type Verse = {
  reference: string;
  book: string;
  chapter: string;
  verse: string;
  text: string;
};

const parseVerse = (rawVerse: string): Verse => {
  const splitIndex = rawVerse.indexOf(" ");
  const reference = rawVerse.substring(0, splitIndex);
  const text = rawVerse.substring(splitIndex + 1);

  const [bookAndChapter, verse] = reference.split(":");

  const [, bookAbbreviation, chapter] =
    bookAndChapter.match(/^(.*?)(\d+)$/) ?? [];

  if (!BOOK_TITLES[bookAbbreviation]) {
    console.error(`No book title found for "${bookAbbreviation}"`);
  }

  return {
    reference,
    book: BOOK_TITLES[bookAbbreviation],
    chapter,
    verse,
    text,
  };
};

const raw = fs.readFileSync(`./src/data/txt/kjv.txt`, "utf-8");

const rawVerses = _.filter(raw.split("\n"), Boolean);

const parsedVerses = _.map(rawVerses, parseVerse);

const groupedByBook = _.groupBy(parsedVerses, "book");

const groupedByBookAndChapter = _.mapValues(
  groupedByBook,
  (versesInBook, title) => ({ title, ...groupBy(versesInBook, "chapter") })
);

const slugified = _.mapKeys(groupedByBookAndChapter, (_book, title) =>
  slugify(title.toLowerCase())
);

fs.writeFileSync(
  "./src/data/json/kjv.json",
  JSON.stringify(slugified, null, 2),
  "utf-8"
);
