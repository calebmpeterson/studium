import slugify from "slugify";

import { CrossReferenceRecord } from "@/types";

import _1Corinthians from "./json/cross-references/1-corinthians.json";
import BOOK_ABBREVIATION_TO_TITLE from "./json/cross-references/appendices/book-abbreviation-to-title.json";
import _Genesis from "./json/cross-references/genesis.json";

const RECORDS: Record<string, { default: CrossReferenceRecord[] }> = {
  joshua: await import("./json/cross-references/joshua.json"),
};

export const getCrossReferenceRecords = async (book: string) => {
  const slug = slugify(book);
  const records = RECORDS[slug].default;

  console.log({ book, slug, records: records.length });

  return records;
};
