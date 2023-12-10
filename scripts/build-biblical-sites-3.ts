import _ from "lodash";
import { v4 as uuid4 } from "uuid";
import fs from "node:fs";
import SITES from "./biblical-sites-3";

type WikipediaCoordinates = {
  lat: number;
  lon: number;
};

type WikipediaPageData = {
  title: string;
  coordinates: WikipediaCoordinates[];
};

type WikipediaCoordinatesResponse = {
  query: {
    pages: Record<string, WikipediaPageData>;
  };
};

const process = async () => {
  const features = await Promise.all(
    _.map(SITES, async (query, name) => {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates&titles=${query}`
      );
      const data = (await response.json()) as WikipediaCoordinatesResponse;
      console.log(data.query.pages);

      try {
        const {
          query: { pages },
        } = data;

        const { coordinates } = _.values(pages)[0];

        return {
          type: "Feature",
          id: uuid4(),
          properties: {
            name,
          },
          geometry: {
            type: "Point",
            coordinates: [coordinates[0].lon, coordinates[0].lat, 0],
          },
        };
      } catch (error: unknown) {
        console.warn(`Failed to process coordinates for ${name}`, error, data);
      }
    })
  );

  const featureCollection = {
    type: "FeatureCollection",
    features,
  };

  fs.writeFileSync(
    "./src/data/geojson/biblical-sites-3.json",
    JSON.stringify(featureCollection, null, 2),
    "utf8"
  );
};

process();
