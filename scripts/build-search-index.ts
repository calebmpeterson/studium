import Fuse from "fuse.js";
import _ from "lodash";
import fs from "node:fs";

const KJV = JSON.parse(fs.readFileSync("./src/data/json/kjv.json", "utf8"));

const allVerses = _.flatMap(KJV, (chapters) =>
  _.flatMap(chapters, (verses) => verses)
).filter(_.isObject);

const kjvIndex = Fuse.createIndex(["text", "book"], allVerses);

fs.writeFileSync(
  "./src/data/json/kjv-search-index.json",
  JSON.stringify(kjvIndex.toJSON(), null, 2),
  "utf8"
);

console.log(`Indexed ${allVerses.length} verses for search`);

const fuse = new Fuse(
  allVerses,
  {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.33,
  },
  kjvIndex
);

const results = fuse.search({ $and: [{ text: "iron" }] }, { limit: 10 });

results.forEach((result) => {
  console.log(result);
});
