import { Entry } from "@/types/chain-reference";

import { getThompsonChainReferences } from "./getThompsonChainReferences";

export const getThompsonChainReference = (id: string): Entry | undefined => {
  const entries = getThompsonChainReferences();

  return entries[id];
};
