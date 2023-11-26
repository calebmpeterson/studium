export type Verse = {
  reference: string;
  book: string;
  chapter: string;
  verse: string;
  text: string;
};

export type TableOfContents = Record<string, string[]>;
