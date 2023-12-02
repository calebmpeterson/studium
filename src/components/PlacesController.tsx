import { FC, useEffect, useState } from "react";
import PlacesDisplay from "./PlacesDisplay";
import { Place } from "@/types";
import { isEmpty, toLower } from "lodash";
import { PlacesError } from "./PlacesError";
import { PlacesLoader } from "./PlacesLoader";
import { PlacesEmpty } from "./PlacesEmpty";

interface Props {
  book: string;
  chapter: string;
}

export const PlacesController: FC<Props> = ({ book, chapter }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsFetching(true);
      setHasError(false);

      try {
        const response = await fetch(
          `/api/places?book=${toLower(book)}&chapter=${chapter}`
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
  }, [book, chapter]);

  if (isFetching) {
    return <PlacesLoader book={book} chapter={chapter} />;
  }

  if (hasError) {
    return <PlacesError book={book} chapter={chapter} />;
  }

  if (isEmpty(places)) {
    return <PlacesEmpty book={book} chapter={chapter} />;
  }

  return <PlacesDisplay places={places} />;
};

export default PlacesController;
