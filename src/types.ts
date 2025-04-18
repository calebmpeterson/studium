export * from "./types/cross-references";

export type VerseReference = {
  book: string;
  chapter: string;
  verse: string;
};

export type Verse = {
  reference: string;
  book: string;
  chapter: string;
  verse: string;
  text: string;
};

export type Coordinate = [number, number, number];

export type PlaceFeature = {
  id: string;
  coordinates: Coordinate;
  name: string;
  description?: string;
};

export type Place = {
  id: string;
  name: string;
  features: PlaceFeature[];
};

export type TableOfContents = Record<string, Record<string, string>>;

export type ReadingHistoryEntry = {
  book: string;
  chapter: string;
};
export type ReadingHistory = ReadingHistoryEntry[];

export type SearchHistoryEntry = {
  query: string;
  timestamp: number;
};

export type SearchHistory = SearchHistoryEntry[];

export type SearchResult = Verse;

export type SearchResults = SearchResult[];

export type SearchResponse = {
  results: SearchResults;
};
