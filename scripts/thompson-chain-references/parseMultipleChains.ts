import _ from "lodash";

import { log } from "../utils/log";
import { parseChainReference } from "./parseChainReference";
import { parseVerseReference } from "./parseVerseReference";
import { Entry, Reference, ReferenceChain } from "./types";

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

  log(`${id} ${name} has ${$chains.length} chains`);

  const chains: ReferenceChain[] = [];
  for (const $chain of $chains) {
    const $label = $chain.previousElementSibling;
    const label = $label?.innerHTML;

    const $references = $chain.querySelectorAll("li:has(a)");
    const references: Reference[] = _.map($references, ($reference) => {
      if ($reference.innerHTML.startsWith("SEE")) {
        return parseChainReference($reference);
      }

      const reference = $reference.querySelector("a")!.innerHTML;
      return parseVerseReference(reference);
    });

    chains.push({
      label,
      references,
    });
  }

  const entry = {
    id,
    name,
    description,
    chains,
  };

  return entry;
};
