import { compact, isArray, isEmpty, isString, pick, uniqueId } from "lodash";
import BIBLICAL_SITES_2 from "./geojson/biblical-sites-2.json";
import { Point } from "leaflet";

type PointGeometry = {
  type: "Point";
  coordinates: [number, number, number];
};

type BaseFeature = {
  properties: {
    name: string;
    description: string;
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
    .filter((feature) =>
      feature.properties.name.toLowerCase().includes(query.toLowerCase())
    )
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
