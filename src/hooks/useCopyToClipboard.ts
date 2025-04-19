import { useCallback, useEffect, useRef, useState } from "react";

type HookResult = {
  copy: (text: string) => Promise<boolean>;
  didCopy: boolean;
};

export function useCopyToClipboard(): HookResult {
  const [didCopy, setDidCopy] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setDidCopy(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDidCopy(false);
        timeoutRef.current = null;
      }, 5000);

      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copy, didCopy };
}
