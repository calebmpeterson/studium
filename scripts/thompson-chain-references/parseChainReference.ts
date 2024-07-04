import { ChainReference, ChainReferenceEntry } from "./types";

export const parseChainReference = ($reference: Element): ChainReference => {
  const $anchors = $reference.querySelectorAll("a");

  const entries: ChainReferenceEntry[] = [];

  for (const $anchor of $anchors) {
    if (!$anchor) {
      throw new Error(`Chain reference has no anchor: ${$reference.innerHTML}`);
    }

    const href = $anchor.getAttribute("href");

    if (!href) {
      throw new Error(`Chain reference has no href ${$reference.innerHTML}`);
    }

    const label = $anchor.innerHTML;

    if (!label) {
      throw new Error(`Chain reference has no label ${$reference.innerHTML}`);
    }

    entries.push({
      id: href?.split("#")[1],
      label,
    });
  }

  return {
    type: "chain",
    entries,
  };
};
