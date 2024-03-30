import { useShowToast } from "@/contexts/toasts";
import { isBrowser } from "@/utils/isBrowser";
import { useCallback, useEffect, useState } from "react";

export const useShare = (title: string, url: string) => {
  const showToast = useShowToast();
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
        showToast({ message: "Sharing is not supported on your device." });
      }
    }
  }, [showToast, title, url]);

  return {
    canShare,
    share,
  };
};
