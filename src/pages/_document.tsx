import { globalCss } from "@/styles/globalCss";
import { Global } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Global styles={globalCss} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
