import fs from "node:fs";

import { JSDOM } from "jsdom";
import _ from "lodash";
import minimist from "minimist";

import { hasMultipleChains } from "./thompson-chain-references/hasMultipleChains";
import { parseMultipleChains } from "./thompson-chain-references/parseMultipleChains";
import { parseSingleChain } from "./thompson-chain-references/parseSingleChain";
import { Entry } from "./thompson-chain-references/types";
import { abort } from "./utils/abort";
import { log } from "./utils/log";

log("Reading document");
const raw = fs.readFileSync(
  "./src/data/epub/thompson-chain-reference-study-bible/OEBPS/Text/part0000.xhtml",
  "utf8"
);

log("Parsing document");
const { document } = new JSDOM(raw).window;

log("Processing document");
const $entries = document.querySelectorAll('h3[id^="V"]');

const argv = minimist(process.argv.slice(2));
const { from, to, target } = argv;

const results: Record<string, Entry> = {};

for (const [index, $name] of $entries.entries()) {
  if (_.isNumber(from) && index < from) {
    continue;
  }

  if (_.isNumber(to) && index >= to) {
    break;
  }

  if (_.isNumber(target) && index + 1 !== target) {
    continue;
  }

  const id = $name.getAttribute("id") as unknown as string;
  const name = $name.querySelector("a")!.innerHTML.trim();

  log(`Processing ${id} / ${name}`);

  const entrySelector = `h3[id="${id}"] + ul`;
  const $entry = document.querySelector(entrySelector);

  if ($entry) {
    if (hasMultipleChains($entry)) {
      results[id] = parseMultipleChains(id, name, $entry);
    } else {
      results[id] = parseSingleChain(id, name, $entry);
    }
  } else {
    abort(`Mismatched element for ${id} / ${name} ${entrySelector}`);
  }
}

log(`Results ${_.size(results)}`);

fs.writeFileSync(
  "./src/data/json/thompson-chain-references.json",
  JSON.stringify(results, null, 2),
  "utf8"
);
