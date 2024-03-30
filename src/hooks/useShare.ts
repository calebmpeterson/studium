import { isBrowser } from "@/utils/isBrowser";
import { useCallback, useEffect, useState } from "react";

export const useShare = (title: string, url: string) => {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const isSharingPossible =
      isBrowser() && navigator.canShare && navigator.canShare({ url });

    setCanShare(isSharingPossible);
  }, [url]);

  const share = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // TODO
      }
    }
  }, [title, url]);

  return {
    canShare,
    share,
  };
};
