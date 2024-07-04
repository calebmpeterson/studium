import { css } from "@emotion/react";
import { mapValues, pick } from "lodash";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { TopNav } from "@/components/TopNav";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";
import { Entry } from "@/types/chain-reference";

type Result = {
  entries: Record<string, string>;
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
  const entries = mapValues(
    getThompsonChainReferences(),
    (entry) => entry.name
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
          {Object.entries(entries).map(([id, name]) => (
            <div key={id} id={id}>
              <Link href={`/thompson-chain-reference/${id}`}>
                {id}&nbsp;{name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
