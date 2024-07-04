import _ from "lodash";

import { abort } from "../utils/abort";
import { parseChainReference } from "./parseChainReference";
import { parseVerseReference } from "./parseVerseReference";
import { Entry, Reference } from "./types";

export const parseSingleChain = (
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

    const $references = $entry.querySelectorAll("li:has(a)");

    const references: Reference[] = _.map($references, ($reference) => {
      const referenceHTML = $reference.innerHTML;

      if (referenceHTML.trim().startsWith("SEE")) {
        return parseChainReference($reference);
      }

      const reference = $reference.querySelector("a")!.innerHTML;
      return parseVerseReference(reference);
    });

    const entry: Entry = {
      id,
      name,
      description,
      chains: [
        {
          references,
        },
      ],
    };

    return entry;
  } catch (error) {
    throw abort(`Failed to process ${id} / ${name}`, error);
  }
};
