export type VerseReference = {
  type: "verse";
  book: string;
  chapter: string;
  verse: string;
};

export type ChainReferenceEntry = {
  id: string;
  label?: string;
};

export type ChainReference = {
  type: "chain";
  entries: ChainReferenceEntry[];
};

export type Reference = VerseReference | ChainReference;

export type ReferenceChain = {
  label?: string;
  references: Reference[];
};

export type Entry = {
  id: string;
  name: string;
  description?: string;
  chains: ReferenceChain[];
};
