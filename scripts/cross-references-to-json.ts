import * as fs from "fs";
import _ from "lodash";
import { BOOK_TITLES } from "./cross-reference-book-titles";

import { slugifyReference } from "../src/utils/slugifyReference";

type Reference = {
  book: string;
  chapter: string;
  verse: string;
};

type CrossReference = {
  key: string;
  from: Reference;
  to: Reference;
  score: number;
};

type CrossReferenceTarget = Reference & {
  score: number;
  slug: string;
};

type ProcessedCrossReferences = {
  [bookAndChapterSlug: string]: {
    [verse: string]: CrossReferenceTarget[];
  };
};

const parseReference = (raw: string) => {
  const [bookAbbreviation, chapter, verse] = raw
    .split("-")[0]
    .split(".")
    .map(_.trim);

  if (!BOOK_TITLES[bookAbbreviation]) {
    console.error(`No book title found for "${bookAbbreviation}"`);
  }

  return { book: BOOK_TITLES[bookAbbreviation], chapter, verse };
};

const parseCrossReference = (raw: string): CrossReference => {
  const [from, to, score] = raw.split(/\s/g);

  const fromReference = parseReference(from);

  const key = slugifyReference(_.pick(fromReference, "book", "chapter"));

  return {
    key,
    from: parseReference(from),
    to: parseReference(to),
    score: parseInt(score, 10),
  };
};

const raw = fs.readFileSync(`./src/data/txt/cross-references.txt`, "utf-8");
const rawReferences = _.filter(raw.split("\n"), Boolean);
const parsedReferences = _.map(rawReferences, parseCrossReference);
const groupedByKey = _.groupBy(parsedReferences, "key");

const processed: ProcessedCrossReferences = _.mapValues(
  groupedByKey,
  (references) =>
    _.mapValues(_.groupBy(references, "from.verse"), (references) =>
      _.map(references, (reference) => ({
        ...reference.to,
        score: reference.score,
        slug: slugifyReference(reference.to),
      }))
    )
);

fs.writeFileSync(
  "./src/data/json/cross-references.json",
  JSON.stringify(processed, null, 2),
  "utf-8"
);
