import _ from "lodash";

import { log } from "../utils/log";
import { parseChainReference } from "./parseChainReference";
import { parseVerseReference } from "./parseVerseReference";
import { Entry } from "./types";

export const parseMultipleChains = (
  id: string,
  name: string,
  $entry: Element
): Entry => {
  // If there is a description, it's the first <li>
  const $description = $entry.querySelector("ul li:first-of-type");
  const descriptionHTML = $description?.innerHTML;
  const description = descriptionHTML?.includes("href")
    ? undefined
    : descriptionHTML;

  const $chains = $entry.querySelectorAll("li + ul");

  log(`${id} has ${$chains.length} chains`);

  for (const $chain of $chains) {
    const $label = $chain.previousElementSibling;

    const $references = $chain.querySelectorAll("li:has(a)");

    const references = _.map($references, ($reference) => {
      if ($reference.innerHTML.startsWith("SEE")) {
        return parseChainReference($reference);
      }

      const reference = $reference.querySelector("a")!.innerHTML;
      return parseVerseReference(reference);
    });

    log($label?.innerHTML, references);
  }

  const entry = {
    id,
    name,
    description,
    chains: [],
  };

  return entry;
};
