import Head from "next/head";
import { css } from "@emotion/react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getBookAndChapter } from "@/data/getBookAndChapter";
import { TableOfContents, Verse } from "@/types";
import { getTableOfContents } from "@/data/getTableOfContents";

const layoutCss = css``;

type DataResult = {
  book: string;
  chapter: string;
  verses: Verse[];
};

type ErrorResult = {
  message: string;
};

type Result = (DataResult | ErrorResult) & { tableOfContents: TableOfContents };

export const getServerSideProps = (async (context) => {
  const { book, chapter } = context.query;
  const [result, status] = getBookAndChapter(book, chapter);
  const tableOfContents = getTableOfContents();
  return {
    props: {
      ...result,
      tableOfContents,
      status: status === 200 ? "success" : "failure",
    },
  };
}) satisfies GetServerSideProps<Result & { status: "success" | "failure" }>;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function BookAndChapter(props: Props) {
  return (
    <>
      <Head>
        <title>Studium</title>
        <meta name="description" content="Bible study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={layoutCss}>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </main>
    </>
  );
}
