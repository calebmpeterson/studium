import { FC, memo, useEffect, useState } from "react";
import PlacesDisplay from "./PlacesDisplay";
import { Place, Verse } from "@/types";
import { isEmpty, toLower } from "lodash";
import { PlacesError } from "./PlacesError";
import { PlacesLoader } from "./PlacesLoader";
import { PlacesEmpty } from "./PlacesEmpty";
import slugify from "slugify";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  book: string;
  chapter: string;
  verses: Verse[];
}

export const PlacesController: FC<Props> = ({ book, chapter, verses }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsFetching(true);
      setHasError(false);

      try {
        const response = await fetch(
          `/api/places?book=${slugify(toLower(book))}&chapter=${chapter}`,
          { method: "POST", body: JSON.stringify(verses) }
        );
        const data = (await response.json()) as Place[];

        setPlaces(data);
      } catch (error: unknown) {
        console.error(`Failed to fetch places for ${book} ${chapter}`, error);
        setPlaces([]);
        setHasError(true);
      } finally {
        setIsFetching(false);
      }
    };

    load();
  }, [book, chapter, verses]);

  if (isFetching) {
    return <PlacesLoader book={book} chapter={chapter} />;
  }

  if (hasError) {
    return <PlacesError book={book} chapter={chapter} />;
  }

  if (isEmpty(places)) {
    return <PlacesEmpty book={book} chapter={chapter} />;
  }

  return (
    <ErrorBoundary fallback={<PlacesError book={book} chapter={chapter} />}>
      <PlacesDisplay places={places} />
    </ErrorBoundary>
  );
};

export default PlacesController;
