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
        <meta name="theme-color" content="#18181b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Studium" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />

        <Footer />
      </body>
    </Html>
  );
}
