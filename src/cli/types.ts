export type VerseRecord = {
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

export type ParsedReference = {
  book: string;
  chapter: number;
  verses?: number[];
};

export type CliJsonOption = {
  json?: boolean;
};

export type BookAbbreviationRecord = {
  title: string;
  abbreviation: string;
};

export type RawVerseRecord = {
  book: string;
  chapter: string;
  verse: string;
  text: string;
};

export type KJVBookData = {
  title: string;
  [chapter: string]: unknown;
};

export type KJVData = Record<string, KJVBookData>;

export type FirstMentionIndexEntry = {
  reference: string;
  book: string;
  chapter: string;
  verse: string;
  text: string;
};

export type FirstMentionIndex = Record<string, FirstMentionIndexEntry>;
