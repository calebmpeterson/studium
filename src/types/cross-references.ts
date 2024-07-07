export type CrossReferenceRecord = {
  /** Verse */
  v: string;
  /** Cross references */
  r: string[];
};

export type CrossReference = {
  book: string;
  chapter: string;
  verse: string;
  slug: string;
  text?: string;
};

export type CrossReferencesForBookAndChapter = {
  [verse: string]: CrossReference[];
};

export type CrossReferences = {
  [bookAndChapterSlug: string]: CrossReferencesForBookAndChapter;
};
