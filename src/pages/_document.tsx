import { Footer } from "@/components/Footer";
import { globalCss } from "@/styles/globalCss";
import { Global } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Global styles={globalCss} />

        <meta name="description" content="Bible study" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
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
