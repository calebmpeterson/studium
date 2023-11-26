import Head from "next/head";
import { css } from "@emotion/react";

const layoutCss = css``;

export default function Home() {
  return (
    <>
      <Head>
        <title>Studium</title>
        <meta name="description" content="Bible study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={layoutCss}></main>
    </>
  );
}
