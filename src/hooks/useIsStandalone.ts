import { useEffect, useState } from "react";

type StandaloneAwareNavigator = Navigator & {
  standalone?: boolean;
};

const DISPLAY_MODE_QUERIES = ["(display-mode: standalone)", "(display-mode: fullscreen)"];

export const useIsStandalone = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const computeStandalone = () => {
      const matchesDisplayMode =
        DISPLAY_MODE_QUERIES.some((query) => window.matchMedia?.(query).matches) ?? false;

      const navigatorStandalone =
        (window.navigator as StandaloneAwareNavigator).standalone === true;

      setIsStandalone(matchesDisplayMode || navigatorStandalone);
    };

    computeStandalone();

    const mediaQueries =
      DISPLAY_MODE_QUERIES.map((query) => window.matchMedia?.(query)).filter(
        Boolean
      ) as MediaQueryList[];

    mediaQueries.forEach((mediaQuery) =>
      mediaQuery.addEventListener("change", computeStandalone)
    );

    return () => {
      mediaQueries.forEach((mediaQuery) =>
        mediaQuery.removeEventListener("change", computeStandalone)
      );
    };
  }, []);

  return isStandalone;
};
