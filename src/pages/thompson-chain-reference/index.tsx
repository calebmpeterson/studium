import { css } from "@emotion/react";
import { groupBy, mapValues } from "lodash";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { MouseEvent, useCallback } from "react";

import { TopNav } from "@/components/TopNav";
import { getThompsonChainReferences } from "@/data/getThompsonChainReferences";

type Result = {
  entries: Record<string, string>;
  firstIdPerLetter: Record<string, string>;
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
  gap: 5px;
`;

const firstLetterLinksContainerCss = css`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const letterCss = css`
  border-bottom: 1px solid var(--border-color);
`;

const linkCss = css`
  padding: 0 0 0 10px;
`;

export const getServerSideProps: GetServerSideProps<Result, {}> = async (
  context
) => {
  const entries = mapValues(
    getThompsonChainReferences(),
    (entry) => entry.name
  );

  const firstIdPerLetter = Object.entries(entries).reduce(
    (accum, [id, name]) => {
      const firstLetter = name[0];
      if (firstLetter in accum) {
        return accum;
      }
      return { ...accum, [firstLetter]: id };
    },
    {}
  );

  return {
    props: {
      entries,
      firstIdPerLetter,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ThompsonChainReferences({
  entries,
  firstIdPerLetter,
}: Props) {
  const onJumpToLetter = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const href = event.currentTarget.getAttribute("href");
    if (href) {
      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Thompson Chain References</title>
      </Head>

      <TopNav />

      <div css={containerCss}>
        <header>Thompson Chain References</header>

        <div css={firstLetterLinksContainerCss}>
          {Object.entries(firstIdPerLetter).map(([letter, id]) => (
            <a key={letter} href={`#${id}`} onClick={onJumpToLetter}>
              {letter}
            </a>
          ))}
        </div>

        <div css={layoutCss}>
          {Object.entries(entries).map(([id, name]) => (
            <div key={id} id={id}>
              {firstIdPerLetter[name[0]] === id && (
                <header css={letterCss}>{name[0]}</header>
              )}

              <Link href={`/thompson-chain-reference/${id}`} css={linkCss}>
                {id}&nbsp;{name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
