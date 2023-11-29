import { Place } from "@/types";

import BIBLICAL_SITES_1 from "./geojson/biblical-sites-1.json";
import BIBLICAL_SITES_2 from "./geojson/biblical-sites-2.json";
import { compact, isArray, isEmpty, isString, pick, uniqueId } from "lodash";

type Feature = {
  geometry:
    | {
        type: "Point";
        coordinates: [number, number, number];
      }
    | {
        type: string;
      };
  properties: {
    name: string;
    description: string;
  };
};

const findFeatures = (features: Feature[], query: string, source: string) =>
  features
    .filter((feature) => feature.geometry.type === "Point")
    .filter((feature) =>
      feature.properties.name.toLowerCase().includes(query.toLowerCase())
    )
    .map(({ geometry, properties }) => ({
      id: uniqueId(),
      source,
      coordinates: geometry.coordinates,
      ...pick(properties, "name", "description"),
    }));

const enhancePlace = (place: unknown) => {
  if (isString(place)) {
    const features = [
      // ...findFeatures(BIBLICAL_SITES_1.features, place, "sites-1"),
      ...findFeatures(BIBLICAL_SITES_2.features, place, "sites-2"),
    ];

    return { id: uniqueId(), name: place, features };
  }
};

export const enhancePlaces = (places: unknown) => {
  if (isArray(places)) {
    return compact(places.map((place) => enhancePlace(place))).filter(
      ({ features }) => !isEmpty(features)
    );
  }

  return [];
};
