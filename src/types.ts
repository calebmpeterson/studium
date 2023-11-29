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
  description: string;
};

export type Place = {
  id: string;
  name: string;
  features: PlaceFeature[];
};

export type TableOfContents = Record<string, Record<string, string>>;
