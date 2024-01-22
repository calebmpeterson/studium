import { FuseResult } from "fuse.js";

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
};

export type SearchHistory = SearchHistoryEntry[];

export type CrossReference = {
  book: string;
  chapter: string;
  verse: string;
  score: number;
  slug: string;
  text?: string;
};

export type CrossReferencesForBookAndChapter = {
  [verse: string]: CrossReference[];
};

export type CrossReferences = {
  [bookAndChapterSlug: string]: CrossReferencesForBookAndChapter;
};

export type SearchResult = FuseResult<Verse>;

export type SearchResults = SearchResult[];

export type SearchResponse = {
  results: SearchResults;
};
