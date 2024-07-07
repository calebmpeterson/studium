import slugify from "slugify";

import { CrossReferenceRecord } from "@/types";

type CrossReferenceRecordsModule = {
  default: CrossReferenceRecord[];
};

const RECORDS: Record<string, CrossReferenceRecordsModule> = {
  genesis: await import("./json/cross-references/genesis.json"),
  exodus: await import("./json/cross-references/exodus.json"),
  leviticus: await import("./json/cross-references/leviticus.json"),
  numbers: await import("./json/cross-references/numbers.json"),
  deuteronomy: await import("./json/cross-references/deuteronomy.json"),
  joshua: await import("./json/cross-references/joshua.json"),
  judges: await import("./json/cross-references/judges.json"),
  ruth: await import("./json/cross-references/ruth.json"),
  "1-samuel": await import("./json/cross-references/1-samuel.json"),
  "2-samuel": await import("./json/cross-references/2-samuel.json"),
  "1-kings": await import("./json/cross-references/1-kings.json"),
  "2-kings": await import("./json/cross-references/2-kings.json"),
  "1-chronicles": await import("./json/cross-references/1-chronicles.json"),
  "2-chronicles": await import("./json/cross-references/2-chronicles.json"),
  ezra: await import("./json/cross-references/ezra.json"),
  nehemiah: await import("./json/cross-references/nehemiah.json"),
  esther: await import("./json/cross-references/esther.json"),
  job: await import("./json/cross-references/job.json"),
  psalms: await import("./json/cross-references/psalms.json"),
  proverbs: await import("./json/cross-references/proverbs.json"),
  ecclesiastes: await import("./json/cross-references/ecclesiastes.json"),
  "song-of-solomon": await import(
    "./json/cross-references/song-of-solomon.json"
  ),
  isaiah: await import("./json/cross-references/isaiah.json"),
  jeremiah: await import("./json/cross-references/jeremiah.json"),
  lamentations: await import("./json/cross-references/lamentations.json"),
  ezekiel: await import("./json/cross-references/ezekiel.json"),
  daniel: await import("./json/cross-references/daniel.json"),
  hosea: await import("./json/cross-references/hosea.json"),
  joel: await import("./json/cross-references/joel.json"),
  amos: await import("./json/cross-references/amos.json"),
  obadiah: await import("./json/cross-references/obadiah.json"),
  jonah: await import("./json/cross-references/jonah.json"),
  micah: await import("./json/cross-references/micah.json"),
  nahum: await import("./json/cross-references/nahum.json"),
  habakkuk: await import("./json/cross-references/habakkuk.json"),
  zephaniah: await import("./json/cross-references/zephaniah.json"),
  haggai: await import("./json/cross-references/haggai.json"),
  zechariah: await import("./json/cross-references/zechariah.json"),
  malachi: await import("./json/cross-references/malachi.json"),
  matthew: await import("./json/cross-references/matthew.json"),
  mark: await import("./json/cross-references/mark.json"),
  luke: await import("./json/cross-references/luke.json"),
  john: await import("./json/cross-references/john.json"),
  acts: await import("./json/cross-references/acts.json"),
  romans: await import("./json/cross-references/romans.json"),
  "1-corinthians": await import("./json/cross-references/1-corinthians.json"),
  "2-corinthians": await import("./json/cross-references/2-corinthians.json"),
  galatians: await import("./json/cross-references/galatians.json"),
  ephesians: await import("./json/cross-references/ephesians.json"),
  philippians: await import("./json/cross-references/philippians.json"),
  colossians: await import("./json/cross-references/colossians.json"),
  "1-thessalonians": await import(
    "./json/cross-references/1-thessalonians.json"
  ),
  "2-thessalonians": await import(
    "./json/cross-references/2-thessalonians.json"
  ),
  "1-timothy": await import("./json/cross-references/1-timothy.json"),
  "2-timothy": await import("./json/cross-references/2-timothy.json"),
  titus: await import("./json/cross-references/titus.json"),
  philemon: await import("./json/cross-references/philemon.json"),
  hebrews: await import("./json/cross-references/hebrews.json"),
  james: await import("./json/cross-references/james.json"),
  "1-peter": await import("./json/cross-references/1-peter.json"),
  "2-peter": await import("./json/cross-references/2-peter.json"),
  "1-john": await import("./json/cross-references/1-john.json"),
  "2-john": await import("./json/cross-references/2-john.json"),
  "3-john": await import("./json/cross-references/3-john.json"),
  jude: await import("./json/cross-references/jude.json"),
  revelation: await import("./json/cross-references/revelation.json"),
};

export const getCrossReferenceRecords = async (book: string) => {
  const slug = slugify(book.toLowerCase());
  const records = RECORDS[slug].default;

  console.log({ book, slug, records: records.length });

  return records;
};
