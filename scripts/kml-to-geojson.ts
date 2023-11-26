import { KmlToGeojson } from "kml-to-geojson";
import * as fs from "fs";

const FILES = ["biblical-sites-1", "biblical-sites-2"];

const kmlToGeojson = new KmlToGeojson();

fs.mkdirSync("./src/data/geojson/");

for (const filename of FILES) {
  const kmlContent = fs.readFileSync(`./src/data/kml/${filename}.kml`, "utf-8");

  const { geojson } = kmlToGeojson.parse(kmlContent);

  fs.writeFileSync(
    `./src/data/geojson/${filename}.json`,
    JSON.stringify(geojson, null, 2),
    "utf-8"
  );
}
