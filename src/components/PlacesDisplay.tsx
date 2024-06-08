import "leaflet/dist/leaflet.css";

import { css } from "@emotion/react";
import L from "leaflet";
import { isEmpty, sumBy } from "lodash";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { BASE_COLOR } from "@/styles/colors";
import { Place, PlaceFeature } from "@/types";
import { MAP_TILER_KEY } from "@/utils/environment";

import { PlacesEmpty } from "./PlacesEmpty";

const icon = L.icon({
  iconUrl: "/marker-icon-2x.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface Props {
  book: string;
  chapter: string;
  places: Place[];
}

const layoutCss = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  padding-bottom: 20px;
`;

const mapCss = css`
  height: 400px;

  border-radius: var(--border-radius);
`;

const placesListContainerCss = css``;

const placesListCss = css`
  display: flex;
  justify-content: start;
  gap: 10px;
  flex-wrap: wrap;
`;

const placeCss = (hasFeatures: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background-color: ${hasFeatures ? BASE_COLOR[700] : BASE_COLOR[500]};
  color: ${BASE_COLOR[100]};
  padding: 5px 10px 3px;
  line-height: 100%;
  border-radius: 50px;
`;

const getMarkerPosition = (feature: PlaceFeature): [number, number] => [
  feature.coordinates[1],
  feature.coordinates[0],
];

const hasValidMarkerPosition = (feature: PlaceFeature) => {
  const position = getMarkerPosition(feature);
  return position.every((coordinate) => !Number.isNaN(coordinate));
};

const getMapCenter = (places: Place[]): [number, number] => {
  const allCoordinates = places.flatMap((place) =>
    place.features.map((feature) => getMarkerPosition(feature))
  );

  const x =
    sumBy(allCoordinates, (coordinate) => coordinate[0]) /
    allCoordinates.length;
  const y =
    sumBy(allCoordinates, (coordinate) => coordinate[1]) /
    allCoordinates.length;

  return [x, y];
};

export const PlacesDisplay: FC<Props> = ({ book, chapter, places }) => {
  const featuresToRender = places.flatMap((place) =>
    place.features.filter((feature) => hasValidMarkerPosition(feature))
  );

  if (isEmpty(featuresToRender)) {
    return <PlacesEmpty book={book} chapter={chapter} />;
  }

  return (
    <div css={layoutCss}>
      <div css={placesListContainerCss}>
        <div css={placesListCss}>
          {places.map((place) => (
            <div key={place.id} css={placeCss(!isEmpty(place.features))}>
              {place.name}
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        css={mapCss}
        center={getMapCenter(places)}
        zoom={6}
        scrollWheelZoom
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"'
          url={`https://api.maptiler.com/tiles/hillshade/{z}/{x}/{y}.webp?key=${MAP_TILER_KEY}`}
          tileSize={512}
          zoomOffset={-1}
          minZoom={1}
        />

        {featuresToRender.map((feature) => (
          <Marker
            key={feature.id}
            position={getMarkerPosition(feature)}
            icon={icon}
          >
            <Popup>
              <strong>{feature.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlacesDisplay;
