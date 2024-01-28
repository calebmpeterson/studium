import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme
      highlightColor="var(--skeleton-highlight-color)"
      baseColor="var(--skeleton-base-color)"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </SkeletonTheme>
  );
}
