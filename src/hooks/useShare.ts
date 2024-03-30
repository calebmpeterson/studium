import { useShowToast } from "@/contexts/toasts";
import { isBrowser } from "@/utils/isBrowser";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Props {
  title?: string;
  url?: string;
}

export const useShare = ({ title, url: urlFromProps }: Props = {}) => {
  const router = useRouter();

  const url = urlFromProps ?? router.asPath;

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
          title: title ?? document.title,
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
