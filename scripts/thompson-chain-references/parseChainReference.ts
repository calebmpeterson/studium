import { ChainReference } from "./types";

export const parseChainReference = ($reference: Element): ChainReference => {
  const $anchor = $reference.querySelector("a");
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

  return {
    type: "chain",
    id: href?.split("#")[1],
    label,
  };
};
