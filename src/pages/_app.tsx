import "react-loading-skeleton/dist/skeleton.css";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SkeletonTheme } from "react-loading-skeleton";

import { ToastProvider } from "@/contexts/toasts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>

      <SkeletonTheme
        highlightColor="var(--skeleton-highlight-color)"
        baseColor="var(--skeleton-base-color)"
      >
        <AnimatePresence mode="wait" initial={false}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </AnimatePresence>
      </SkeletonTheme>
    </>
  );
}
