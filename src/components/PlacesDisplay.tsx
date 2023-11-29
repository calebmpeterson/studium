import { Place, PlaceFeature } from "@/types";
import { css } from "@emotion/react";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { sumBy } from "lodash";
import { ACTIVE_COLOR, BASE_COLOR } from "@/styles/colors";

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
`;

const placeCss = css`
  font-size: 12px;
  font-weight: 600;
  background-color: ${BASE_COLOR[700]};
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
          <div key={place.id} css={placeCss}>
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
