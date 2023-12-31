import { Place, PlaceFeature } from "@/types";
import { css } from "@emotion/react";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { isEmpty, sumBy } from "lodash";
import { ACTIVE_COLOR, BASE_COLOR } from "@/styles/colors";
import { MAP_TILER_KEY } from "@/utils/environment";

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
  places: Place[];
}

const layoutCss = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const mapCss = css`
  height: 400px;
`;

const placesListContainerCss = css`
  position: relative;
  height: 0;
`;

const placesListCss = css`
  position: absolute;
  z-index: 1000;
  left: 0;
  right: 0;
  top: calc(100% + 10px);
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const placeCss = (hasFeatures: boolean) => css`
  font-size: 12px;
  font-weight: 600;
  background-color: ${hasFeatures ? BASE_COLOR[700] : BASE_COLOR[500]};
  color: ${BASE_COLOR[100]};
  padding: 5px 10px;
  border-radius: 50px;
`;

const getMarkerPosition = (feature: PlaceFeature): [number, number] => [
  feature.coordinates[1],
  feature.coordinates[0],
];

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

export const PlacesDisplay: FC<Props> = ({ places }) => (
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

      {places.flatMap((place) =>
        place.features.map((feature) => (
          <Marker
            key={feature.id}
            position={getMarkerPosition(feature)}
            icon={icon}
          >
            <Popup>
              <strong>{feature.name}</strong>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  </div>
);

export default PlacesDisplay;
