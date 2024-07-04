import { memoize } from "lodash";

import THOMPSON_CHAIN_REFERENCES from "@/data/json/thompson-chain-references.json";
import { Entry } from "@/types/chain-reference";

export const getThompsonChainReferences = memoize(
  (): Record<string, Entry> =>
    THOMPSON_CHAIN_REFERENCES as Record<string, Entry>
);
