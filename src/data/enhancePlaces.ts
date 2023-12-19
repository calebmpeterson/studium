import {
  capitalize,
  compact,
  isArray,
  isEmpty,
  isString,
  pick,
  uniqueId,
  words,
} from "lodash";
import BIBLICAL_SITES_2 from "./geojson/biblical-sites-2.json";
import BIBLICAL_SITES_3 from "./geojson/biblical-sites-3.json";
import COUNTRIES from "./json/countries.json";
import PEOPLES from "./json/peoples.json";

type PointGeometry = {
  type: "Point";
  coordinates: [number, number, number];
};

type BaseFeature = {
  properties: {
    name: string;
    description?: string;
  };
};

type PointFeature = BaseFeature & {
  geometry: PointGeometry;
};

type OtherFeature = BaseFeature & {
  geometry: {
    type: string;
  };
};

type Feature = PointFeature | OtherFeature;

const isPointFeature = (feature: Feature): feature is PointFeature =>
  feature.geometry.type === "Point";

const findFeatures = (features: Feature[], query: string, source: string) =>
  features
    .filter((feature) => isPointFeature(feature))
    .filter((feature) => words(feature.properties.name).includes(query))
    .map(({ geometry, properties }) => ({
      id: uniqueId(),
      source,
      // @ts-expect-error filter(isPointFeature) ensures this is PointGeometry
      coordinates: geometry.coordinates,
      ...pick(properties, "name", "description"),
    }));

const enhancePlace = (place: unknown) => {
  if (isString(place)) {
    const features = [
      ...findFeatures(BIBLICAL_SITES_2.features, place, "sites-2"),
      ...findFeatures(BIBLICAL_SITES_3.features, place, "sites-3"),
    ];

    return { id: uniqueId(), name: place, features };
  }
};

export const enhancePlaces = (places: unknown) => {
  if (isArray(places)) {
    return compact(
      places
        // Omit places that don't have capitalized names
        .filter((place) => place.name !== capitalize(place.name))
        // Omit countries and peoples
        .filter(
          (place) => !COUNTRIES.includes(place) && !PEOPLES.includes(place)
        )
        // Enhance place data
        .map((place) => enhancePlace(place))
    );
  }

  return [];
};
