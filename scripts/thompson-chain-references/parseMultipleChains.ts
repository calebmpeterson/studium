import _ from "lodash";

import { abort } from "../utils/abort";
import { log } from "../utils/log";
import { parseChainReference } from "./parseChainReference";
import { parseVerseReference } from "./parseVerseReference";
import { Entry, Reference, ReferenceChain } from "./types";

export const parseMultipleChains = (
  id: string,
  name: string,
  $entry: Element
): Entry => {
  try {
    // If there is a description, it's the first <li>
    const $description = $entry.querySelector("ul li:first-of-type");
    const descriptionHTML = $description?.innerHTML;
    const description = descriptionHTML?.includes("href")
      ? undefined
      : descriptionHTML;

    const $chains = $entry.querySelectorAll("li + ul");

    const chains: ReferenceChain[] = [];
    for (const $chain of $chains) {
      const $label = $chain.previousElementSibling;
      const label = $label?.innerHTML;

      const $references = $chain.querySelectorAll("li:has(a)");
      const references: Reference[] = _.filter(
        $references,
        ($reference) => $reference.parentElement === $chain
      ).map(($reference) => {
        const referenceHTML = $reference.innerHTML;

        if (referenceHTML.trim().startsWith("SEE")) {
          return parseChainReference($reference);
        }

        const reference = $reference.querySelector("a")!.innerHTML;
        return parseVerseReference(reference);
      });

      if (!_.isEmpty(references)) {
        chains.push({
          label,
          references,
        });
      }
    }

    const entry = {
      id,
      name,
      description,
      chains,
    };

    return entry;
  } catch (error) {
    throw abort(`Failed to process ${id} / ${name}`, error);
  }
};
