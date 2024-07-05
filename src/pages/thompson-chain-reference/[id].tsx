import { css } from "@emotion/react";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";

import { ThompsonReferenceDisplay } from "@/components/ThompsonReferenceDisplay";
import { TopNav } from "@/components/TopNav";
import { getThompsonChainReference } from "@/data/getThompsonChainReference";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";
import { Entry } from "@/types/chain-reference";
import { getKey } from "@/utils/getKey";

type Result = {
  entry?: Entry;
};

const containerCss = css`
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const layoutCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const chainsContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const chainContainerCss = css``;

const chainReferencesContainerCss = css`
  padding: 0 0 0 10px;
`;

export const getServerSideProps: GetServerSideProps<
  Result & { status: "success" | "failure" },
  { id: string }
> = async (context) => {
  const { id } = context.params ?? {};
  if (!id) {
    return {
      props: {
        status: "failure",
      },
    };
  }

  const entry = getThompsonChainReference(id);

  return {
    props: {
      status: "success",
      entry,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ChainReferencePage({ entry }: Props) {
  const title = entry
    ? `Thompson Chain Reference ${entry.id} ${entry.name}`
    : "Unknown Thompson Chain Reference";

  if (!entry) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <TopNav />

        <div css={layoutCss}>
          <em>Unknown Thompson Chain Reference</em>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <TopNav />

      <div css={containerCss}>
        <div css={layoutCss}>
          <div>
            <header>{entry.name}</header>
            {entry.description && <div>{entry.description}</div>}
          </div>

          <div css={chainsContainerCss}>
            {entry.chains.map((chain, chainIndex) => (
              <div key={getKey(entry.id, chainIndex)} css={chainContainerCss}>
                <header data-sub-header>{chain.label}</header>

                <div css={chainReferencesContainerCss}>
                  {chain.references.map((reference, referenceIndex) => (
                    <ThompsonReferenceDisplay
                      key={getKey(entry.id, chainIndex, referenceIndex)}
                      reference={reference}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
