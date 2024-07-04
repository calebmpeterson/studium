import { css } from "@emotion/react";
import { mapValues, pick } from "lodash";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { TopNav } from "@/components/TopNav";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";
import { Entry } from "@/types/chain-reference";

type Result = {
  entries: Pick<Entry, "id" | "name">[];
};

const containerCss = css`
  max-width: 800px;
  margin: 20px auto;
`;

const layoutCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const getStaticProps: GetStaticProps<Result, {}> = async (context) => {
  const entries = Object.values(getThompsonChainReferences()).map((entry) =>
    pick(entry, "id", "name")
  );

  return {
    props: {
      entries,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ChainReferences({ entries }: Props) {
  return (
    <>
      <Head>
        <title>Thompson Chain References</title>
      </Head>

      <TopNav />

      <div css={containerCss}>
        <header>Thompson Chain References</header>
        <div css={layoutCss}>
          {entries.map((entry) => (
            <div key={entry.id} id={entry.id}>
              <Link href={`/thompson-chain-reference/${entry.id}`}>
                {entry.id}&nbsp;{entry.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
