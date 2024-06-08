import { Global } from "@emotion/react";
import { Head, Html, Main, NextScript } from "next/document";

import { Footer } from "@/components/Footer";
import { globalCss } from "@/styles/globalCss";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Global styles={globalCss} />

        <meta name="description" content="Bible study" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        <Footer />
      </body>
    </Html>
  );
}
