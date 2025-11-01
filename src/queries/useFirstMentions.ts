import { isEmpty, toLower, words } from "lodash";

import { FirstMention } from "@/schemas/first-mention-index";

import { useFirstMentionIndex } from "./useFirstMentionIndex";

type ResultEntry = {
  word: string;
  firstMention: FirstMention | undefined;
};

type HookResult = {
  firstMentions: ResultEntry[];
  isLoading: boolean;
};

export const useFirstMentions = (text: string): HookResult => {
  const { firstMentionIndex: index, isLoading } = useFirstMentionIndex();

  if (isEmpty(index)) {
    return { firstMentions: [], isLoading };
  }

  return {
    firstMentions: words(text).map((word) => ({
      word,
      firstMention: index[toLower(word)],
    })),
    isLoading,
  };
};
