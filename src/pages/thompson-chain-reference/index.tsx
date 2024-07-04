import { css } from "@emotion/react";
import { mapValues } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { TopNav } from "@/components/TopNav";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";

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

export const getServerSideProps: GetServerSideProps<Result, {}> = async (
  context
) => {
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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

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
