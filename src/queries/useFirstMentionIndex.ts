import { useEffect, useState } from "react";

import { FirstMentionIndex } from "@/schemas/first-mention-index";

type HookResult = {
  isLoading: boolean;
  firstMentionIndex: FirstMentionIndex;
};

export const useFirstMentionIndex = (): HookResult => {
  const [firstMentionIndex, setFirstMentionIndex] = useState<FirstMentionIndex>(
    {}
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFirstMentionIndex({});

    const load = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/first-mention-index`);
        const data = (await response.json()) as FirstMentionIndex;

        setFirstMentionIndex(data);
      } catch (error: unknown) {
        console.error(`Failed to fetch first mention index`, error);
        setFirstMentionIndex({});
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return { isLoading, firstMentionIndex };
};
