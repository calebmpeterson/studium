import { memoize } from "lodash";

import FIRST_MENTION_INDEX from "@/data/json/kjv-first-mention-index.json";
import { FirstMentionIndex } from "@/schemas/first-mention-index";

export const getFirstMentionIndex = memoize(
  (): FirstMentionIndex => FIRST_MENTION_INDEX
);
